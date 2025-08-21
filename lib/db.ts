import { prisma } from "./prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export interface CreateSessionData {
  mode: "single" | "compare";
  title?: string;
}

export interface CreateMessageData {
  sessionId: string;
  model: string;
  role: "user" | "assistant";
  content: string;
  tokensIn?: number;
  tokensOut?: number;
  latencyMs?: number;
}

export interface CreateUsageLogData {
  sessionId: string;
  provider: string;
  model: string;
  tokens: number;
  cost: number;
}

export class DatabaseService {
  // Get current user from session
  static async getCurrentUser() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }
    return session.user;
  }

  // Session management
  static async createSession(data: CreateSessionData) {
    const user = await this.getCurrentUser();

    return await prisma.session.create({
      data: {
        ...data,
        userId: user.id,
      },
      include: {
        messages: true,
        usageLogs: true,
      },
    });
  }

  static async getSession(sessionId: string) {
    const user = await this.getCurrentUser();

    return await prisma.session.findFirst({
      where: {
        id: sessionId,
        userId: user.id,
      },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
        usageLogs: true,
      },
    });
  }

  static async getUserSessions(limit: number = 10) {
    const user = await this.getCurrentUser();

    return await prisma.session.findMany({
      where: {
        userId: user.id,
      },
      include: {
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
        _count: {
          select: { messages: true },
        },
      },
      orderBy: { updatedAt: "desc" },
      take: limit,
    });
  }

  static async updateSession(
    sessionId: string,
    data: Partial<CreateSessionData>
  ) {
    const user = await this.getCurrentUser();

    return await prisma.session.updateMany({
      where: {
        id: sessionId,
        userId: user.id,
      },
      data,
    });
  }

  static async deleteSession(sessionId: string) {
    const user = await this.getCurrentUser();

    return await prisma.session.deleteMany({
      where: {
        id: sessionId,
        userId: user.id,
      },
    });
  }

  // Message management
  static async createMessage(data: CreateMessageData) {
    const user = await this.getCurrentUser();

    // Verify session belongs to user
    const session = await prisma.session.findFirst({
      where: {
        id: data.sessionId,
        userId: user.id,
      },
    });

    if (!session) {
      throw new Error("Session not found or access denied");
    }

    return await prisma.message.create({
      data,
    });
  }

  static async getSessionMessages(sessionId: string) {
    const user = await this.getCurrentUser();

    // Verify session belongs to user
    const session = await prisma.session.findFirst({
      where: {
        id: sessionId,
        userId: user.id,
      },
    });

    if (!session) {
      throw new Error("Session not found or access denied");
    }

    return await prisma.message.findMany({
      where: { sessionId },
      orderBy: { createdAt: "asc" },
    });
  }

  // Usage logging
  static async createUsageLog(data: CreateUsageLogData) {
    const user = await this.getCurrentUser();

    // Verify session belongs to user
    const session = await prisma.session.findFirst({
      where: {
        id: data.sessionId,
        userId: user.id,
      },
    });

    if (!session) {
      throw new Error("Session not found or access denied");
    }

    return await prisma.usageLog.create({
      data,
    });
  }

  // Analytics and statistics
  static async getUserStats(timeRange: "7d" | "30d" | "90d" = "30d") {
    const user = await this.getCurrentUser();

    const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const [totalMessages, totalCost, activeSessions, avgLatency] =
      await Promise.all([
        // Total messages
        prisma.message.count({
          where: {
            session: {
              userId: user.id,
              createdAt: { gte: startDate },
            },
          },
        }),

        // Total cost
        prisma.usageLog.aggregate({
          where: {
            session: {
              userId: user.id,
              createdAt: { gte: startDate },
            },
          },
          _sum: { cost: true },
        }),

        // Active sessions
        prisma.session.count({
          where: {
            userId: user.id,
            createdAt: { gte: startDate },
          },
        }),

        // Average latency
        prisma.message.aggregate({
          where: {
            session: {
              userId: user.id,
              createdAt: { gte: startDate },
            },
            latencyMs: { not: null },
          },
          _avg: { latencyMs: true },
        }),
      ]);

    return {
      totalMessages,
      totalCost: totalCost._sum.cost || 0,
      activeSessions,
      avgLatency: avgLatency._avg.latencyMs || 0,
    };
  }

  static async getModelUsageStats(timeRange: "7d" | "30d" | "90d" = "30d") {
    const user = await this.getCurrentUser();

    const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return await prisma.usageLog.groupBy({
      by: ["model", "provider"],
      where: {
        session: {
          userId: user.id,
          createdAt: { gte: startDate },
        },
      },
      _sum: {
        tokens: true,
        cost: true,
      },
      _count: true,
    });
  }

  static async getRecentMessages(limit: number = 50) {
    const user = await this.getCurrentUser();

    return await prisma.message.findMany({
      where: {
        session: {
          userId: user.id,
        },
      },
      include: {
        session: {
          select: { id: true, title: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }

  // Cleanup old data (for maintenance)
  static async cleanupOldData(daysOld: number = 90) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    // Delete old sessions and related data
    const deletedSessions = await prisma.session.deleteMany({
      where: {
        createdAt: { lt: cutoffDate },
      },
    });

    return { deletedSessions: deletedSessions.count };
  }
}
