import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.create({
    data: {
      name: "Test Product",
      stock: 100,
    },
  });

  await prisma.warehouse.create({
    data: {
      name: "Main Warehouse",
      location: "NYC",
    },
  });

  console.log("Seeded successfully");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });