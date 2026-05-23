const { PrismaClient } = require('@prisma/client');
const client = new PrismaClient();

async function main() {
  try {
    await client.$executeRawUnsafe('SELECT 1');
    console.log('✓ Database connection successful');
    process.exit(0);
  } catch (e) {
    console.error('✗ Database connection failed:', e.message);
    process.exit(1);
  } finally {
    await client.$disconnect();
  }
}

main();
