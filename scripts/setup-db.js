#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");

console.log("🚀 Setting up NeuroChat database...\n");

try {
  // Check if Prisma is installed
  console.log("📦 Checking Prisma installation...");
  execSync("npx prisma --version", { stdio: "inherit" });

  // Generate Prisma client
  console.log("\n🔧 Generating Prisma client...");
  execSync("npx prisma generate", { stdio: "inherit" });

  // Push schema to database
  console.log("\n🗄️  Pushing database schema...");
  execSync("npx prisma db push", { stdio: "inherit" });

  // Seed database with initial data (optional)
  console.log("\n🌱 Seeding database...");
  try {
    execSync("npx prisma db seed", { stdio: "inherit" });
  } catch (error) {
    console.log("⚠️  No seed script found, skipping...");
  }

  console.log("\n✅ Database setup complete!");
  console.log("\nNext steps:");
  console.log("1. Copy env.local.example to .env.local");
  console.log("2. Update DATABASE_URL with your PostgreSQL connection string");
  console.log("3. Add your OPENROUTER_API_KEY");
  console.log("4. Configure OAuth providers (optional)");
  console.log('5. Run "npm run dev" to start the application');
} catch (error) {
  console.error("\n❌ Database setup failed:", error.message);
  console.log("\nTroubleshooting:");
  console.log("1. Make sure PostgreSQL is running");
  console.log("2. Check your DATABASE_URL in .env.local");
  console.log("3. Ensure you have the required dependencies installed");
  process.exit(1);
}
