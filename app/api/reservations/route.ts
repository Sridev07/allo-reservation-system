import { cleanupExpiredReservations } from "@/lib/cleanupExpiredReservations";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  await cleanupExpiredReservations();

  try {
    const { productId, warehouseId, quantity } = await req.json();

    const qty = Number(quantity);

    if (!productId || !warehouseId || !qty) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({
        where: { id: productId },
      });

      if (!product) throw new Error("Product not found");

      const warehouse = await tx.warehouse.findUnique({
        where: { id: warehouseId },
      });

      if (!warehouse) throw new Error("Warehouse not found");

      const inventory = await tx.inventory.findFirst({
        where: { productId, warehouseId },
      });

      if (!inventory) throw new Error("Inventory not found");

      const available =
        inventory.totalQuantity - inventory.reservedQuantity;

      if (available < qty) {
        throw new Error("Insufficient stock");
      }

      await tx.inventory.update({
        where: { id: inventory.id },
        data: {
          reservedQuantity: {
            increment: qty,
          },
        },
      });

      const reservation = await tx.reservation.create({
        data: {
          productId,
          warehouseId,
          quantity: qty,
          status: "PENDING",
          expiresAt: new Date(Date.now() + 30 * 1000),
        },
      });

      return reservation;
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 400 }
    );
  }
}