"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ShoppingCart,
  Clock3,
  CheckCircle2,
  XCircle,
  Package,
} from "lucide-react";

function ReserveContent() {
  const searchParams = useSearchParams();

  const productId = searchParams.get("productId");
  const warehouseId = searchParams.get("warehouseId");

  const [loading, setLoading] = useState(true);
  const [reservation, setReservation] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    async function createReservation() {
      try {
        const res = await fetch("/api/reservations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            productId:
              productId ||
              "cmpju8sew0002uliopvbbnrww",

            warehouseId:
              warehouseId ||
              "cmpju8rts0000ulio0ieghhjq",

            quantity: 1,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setMessage(
            data.error || "Failed to reserve"
          );
          setLoading(false);
          return;
        }

        setReservation(data);
        setLoading(false);

        const expiresAt = new Date(
          data.expiresAt
        ).getTime();

        const interval = setInterval(() => {
          const remaining = Math.floor(
            (expiresAt - Date.now()) / 1000
          );

          if (remaining <= 0) {
            clearInterval(interval);
            setMessage("Reservation expired");
            setTimeLeft(0);
            return;
          }

          setTimeLeft(remaining);
        }, 1000);

        return () => clearInterval(interval);
      } catch (error) {
        console.error(error);

        setMessage("Something went wrong");
        setLoading(false);
      }
    }

    createReservation();
  }, [productId, warehouseId]);

  async function confirmPurchase() {
    try {
      const res = await fetch(
        `/api/reservations/${reservation.id}/confirm`,
        {
          method: "POST",
        }
      );

      const text = await res.text();

      let data: any = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {
          error: text || "Invalid server response",
        };
      }

      if (res.ok) {
        setMessage("Purchase confirmed!");
      } else {
        setMessage(
          data.error ||
            "Failed to confirm purchase"
        );
      }
    } catch (error) {
      setMessage("Something went wrong");
    }
  }

  async function cancelReservation() {
    try {
      const res = await fetch(
        `/api/reservations/${reservation.id}/cancel`,
        {
          method: "POST",
        }
      );

      const text = await res.text();

      let data: any = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {
          error: text || "Invalid server response",
        };
      }

      if (res.ok) {
        setMessage("Reservation cancelled");
      } else {
        setMessage(
          data.error ||
            "Failed to cancel reservation"
        );
      }
    } catch (error) {
      setMessage("Something went wrong");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-10 text-white">
        
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-cyan-500/20 p-4 rounded-2xl">
            <ShoppingCart
              className="text-cyan-400"
              size={32}
            />
          </div>

          <div>
            <h1 className="text-4xl font-black">
              Reservation Checkout
            </h1>

            <p className="text-slate-400 mt-1">
              Secure your inventory reservation
            </p>
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="bg-white/5 rounded-2xl p-8 text-center border border-white/10">
            <div className="animate-pulse">
              <Package
                size={40}
                className="mx-auto text-cyan-400 mb-4"
              />

              <p className="text-xl font-semibold">
                Creating reservation...
              </p>
            </div>
          </div>
        )}

        {/* RESERVATION CARD */}
        {reservation && (
          <div className="space-y-6">
            
            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
              <div className="flex justify-between items-center">
                
                <div>
                  <p className="text-slate-400 text-sm mb-1">
                    Reservation ID
                  </p>

                  <h2 className="text-2xl font-bold break-all">
                    {reservation.id}
                  </h2>
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/20 px-5 py-3 rounded-2xl flex items-center gap-3">
                  <Clock3 className="text-cyan-400" />

                  <div>
                    <p className="text-sm text-slate-400">
                      Time Remaining
                    </p>

                    <p className="font-bold text-xl text-cyan-400">
                      {timeLeft}s
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="grid md:grid-cols-2 gap-5">
              
              <button
                onClick={confirmPurchase}
                className="bg-green-500 hover:bg-green-400 transition-all duration-200 rounded-2xl py-5 font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-green-500/20"
              >
                <CheckCircle2 size={24} />
                Confirm Purchase
              </button>

              <button
                onClick={cancelReservation}
                className="bg-red-500 hover:bg-red-400 transition-all duration-200 rounded-2xl py-5 font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-red-500/20"
              >
                <XCircle size={24} />
                Cancel Reservation
              </button>
            </div>
          </div>
        )}

        {/* MESSAGE */}
        {message && (
          <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
            <p className="text-lg font-semibold">
              {message}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default function ReservePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReserveContent />
    </Suspense>
  );
}