const { PrismaClient } = require("@prisma/client");

// Test the updated connection string
const connectionString =
  "postgresql://postgres:2ZZ9VtFQhQ0OCIlx@db.udjinvktyznollzmufhn.supabase.co:5432/postgres?sslmode=require";

console.log("🔍 Testing updated Supabase PostgreSQL connection...");
console.log(`URL: ${connectionString}`);

const prisma = new PrismaClient({
  datasources: {
    db: { url: connectionString },
  },
});

async function testConnection() {
  try {
    console.log("\nAttempting to connect...");
    await prisma.$connect();
    console.log("✅ SUCCESS! Connection established!");

    // Test a simple query
    const result = await prisma.$queryRaw`SELECT version() as version`;
    console.log("✅ Query test successful:", result);

    console.log("\n🎉 Your database connection is working!");
    console.log("You can now run: npm run db:push");
  } catch (error) {
    console.log("\n❌ Connection failed:", error.message);

    if (error.message.includes("Can't reach database server")) {
      console.log("\n🔧 This means:");
      console.log("1. Your Supabase project is PAUSED/SUSPENDED");
      console.log("2. The project has been DELETED");
      console.log("3. Network connectivity issues");
      console.log("\n💡 Solution: Check your Supabase dashboard!");
    } else if (error.message.includes("authentication failed")) {
      console.log("\n🔧 This means:");
      console.log("1. Password is incorrect");
      console.log("2. User credentials have changed");
      console.log(
        "\n💡 Solution: Get fresh credentials from Supabase dashboard"
      );
    } else if (error.message.includes("SSL")) {
      console.log("\n🔧 This means:");
      console.log("1. SSL configuration issue");
      console.log("2. Certificate problems");
      console.log("\n💡 Solution: Check SSL settings in Supabase");
    }
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
