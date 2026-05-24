"use client";

import Link from "next/link";
import {
  ShoppingCart,
  Package,
  ShieldCheck,
  Clock3,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10">
        <h1 className="text-2xl font-bold tracking-wide text-cyan-400">
          ALLO Reserve
        </h1>

        <button className="bg-cyan-500 hover:bg-cyan-400 transition px-5 py-2 rounded-xl font-semibold text-black">
          Dashboard
        </button>
      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full mb-6">
            <ShieldCheck size={18} />
            Secure Reservation System
          </div>

          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
            Smart Inventory
            <span className="text-cyan-400"> Reservation</span>
          </h1>

          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            Reserve inventory instantly with automatic expiration,
            warehouse tracking, and seamless purchase confirmation.
          </p>

          <div className="flex gap-4">
            <Link href="/reserve">
              <button className="bg-cyan-500 hover:bg-cyan-400 transition px-8 py-4 rounded-2xl font-bold text-black text-lg shadow-lg shadow-cyan-500/20">
                Start Reservation
              </button>
            </Link>

            <button className="border border-white/20 hover:border-cyan-400 transition px-8 py-4 rounded-2xl font-semibold">
              Learn More
            </button>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold">Inventory Status</h3>
              <p className="text-slate-400">Real-time reservation data</p>
            </div>

            <Package className="text-cyan-400" size={34} />
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900/70 p-5 rounded-2xl border border-white/5">
              <div className="flex justify-between mb-2">
                <span className="text-slate-400">Available Stock</span>
                <span className="font-bold text-green-400">125 Units</span>
              </div>

              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-green-400 rounded-full"></div>
              </div>
            </div>

            <div className="bg-slate-900/70 p-5 rounded-2xl border border-white/5">
              <div className="flex justify-between mb-2">
                <span className="text-slate-400">Reserved</span>
                <span className="font-bold text-yellow-400">32 Units</span>
              </div>

              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-yellow-400 rounded-full"></div>
              </div>
            </div>

            <div className="bg-slate-900/70 p-5 rounded-2xl border border-white/5">
              <div className="flex justify-between mb-2">
                <span className="text-slate-400">Confirmed Orders</span>
                <span className="font-bold text-cyan-400">87 Orders</span>
              </div>

              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <div className="w-4/5 h-full bg-cyan-400 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-5 flex items-center gap-4">
            <Clock3 className="text-cyan-400" />

            <div>
              <p className="font-semibold">Auto Expiration Enabled</p>
              <p className="text-sm text-slate-400">
                Reservations expire automatically after 15 minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
            <ShoppingCart className="text-cyan-400 mb-5" size={38} />

            <h3 className="text-2xl font-bold mb-3">
              Fast Reservations
            </h3>

            <p className="text-slate-400">
              Reserve products instantly with secure inventory locking.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
            <ShieldCheck className="text-cyan-400 mb-5" size={38} />

            <h3 className="text-2xl font-bold mb-3">
              Secure Transactions
            </h3>

            <p className="text-slate-400">
              Reliable confirmation and cancellation workflow.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
            <Clock3 className="text-cyan-400 mb-5" size={38} />

            <h3 className="text-2xl font-bold mb-3">
              Smart Expiration
            </h3>

            <p className="text-slate-400">
              Automatically releases inventory after timeout.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}