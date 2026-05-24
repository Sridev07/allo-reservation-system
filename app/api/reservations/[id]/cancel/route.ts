import { cleanupExpiredReservations } from "@/lib/cleanupExpiredReservations";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  await cleanupExpiredReservations();

  try {
    const { id } = await context.params;

    const reservation =
      await prisma.reservation.findUnique({
        where: {
          id,
        },
      });

    if (!reservation) {
      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 }
      );
    }

    // Prevent double cancellation
    if (
      reservation.status !== "PENDING"
    ) {
      return NextResponse.json(
        {
          error:
            "Reservation already processed",
        },
        { status: 400 }
      );
    }

    await prisma.$transaction(
      async (tx) => {
        // Find inventory
        const inventory =
          await tx.inventory.findFirst({
            where: {
              productId:
                reservation.productId,
              warehouseId:
                reservation.warehouseId,
            },
          });

        if (!inventory) {
          throw new Error(
            "Inventory not found"
          );
        }

        // Release stock
        await tx.inventory.update({
          where: {
            id: inventory.id,
          },
          data: {
            reservedQuantity: {
              decrement:
                reservation.quantity,
            },
          },
        });

        // Mark cancelled
        await tx.reservation.update({
          where: {
            id,
          },
          data: {
            status: "CANCELLED",
          },
        });
      }
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}