import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create a sample user (for development only)
  const user = await prisma.user.upsert({
    where: { email: "demo@neurochat.com" },
    update: {},
    create: {
      email: "demo@neurochat.com",
      name: "Demo User",
    },
  });

  console.log("✅ Created demo user:", user.email);

  // Create sample sessions
  const session1 = await prisma.session.create({
    data: {
      userId: user.id,
      mode: "single",
      title: "Getting Started with AI",
    },
  });

  const session2 = await prisma.session.create({
    data: {
      userId: user.id,
      mode: "compare",
      title: "Model Comparison Test",
    },
  });

  console.log("✅ Created sample sessions");

  // Create sample messages
  await prisma.message.createMany({
    data: [
      {
        sessionId: session1.id,
        model: "gpt-4o",
        role: "user",
        content: "Hello! Can you help me understand how AI models work?",
        tokensIn: 12,
        tokensOut: 0,
      },
      {
        sessionId: session1.id,
        model: "gpt-4o",
        role: "assistant",
        content:
          "Of course! AI models are computer programs trained on large amounts of data to recognize patterns and generate human-like responses. They work by processing input through multiple layers of mathematical operations called neural networks.",
        tokensIn: 0,
        tokensOut: 45,
        latencyMs: 1200,
      },
      {
        sessionId: session2.id,
        model: "multi-model",
        role: "user",
        content: "What are the benefits of renewable energy?",
        tokensIn: 10,
        tokensOut: 0,
      },
    ],
  });

  console.log("✅ Created sample messages");

  // Create sample usage logs
  await prisma.usageLog.createMany({
    data: [
      {
        sessionId: session1.id,
        provider: "openai",
        model: "gpt-4o",
        tokens: 57,
        cost: 0.0003,
      },
      {
        sessionId: session2.id,
        provider: "multi",
        model: "multi-model",
        tokens: 10,
        cost: 0.0001,
      },
    ],
  });

  console.log("✅ Created sample usage logs");

  console.log("\n🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
