import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Product
  const product =
    await prisma.product.create({
      data: {
        name: "Test Product",
      },
    });

  // Warehouse
  const warehouse =
    await prisma.warehouse.create({
      data: {
        name: "Main Warehouse",
      },
    });

  // Inventory
  await prisma.inventory.create({
    data: {
      productId: product.id,
      warehouseId: warehouse.id,
      totalQuantity: 100,
      reservedQuantity: 0,
    },
  });

  console.log(
    "Seeded successfully"
  );
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });