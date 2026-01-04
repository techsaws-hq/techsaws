"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import HyperSpaceBackground from "@/components/partials/hyper-space-background";

export default function Error404Page() {
  return (
    <main className="relative min-h-svh overflow-hidden bg-black text-white">
      <HyperSpaceBackground />

      <div className="relative z-30 flex-center min-h-svh flex-col text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="layout-standard flex-center flex-col gap-4"
        >
          <h1 className="text-[clamp(3.5rem,10vw,7rem)] font-semibold leading-none tracking-tight text-white/90">
            Lost? Good.
          </h1>

          <p className="text-sm text-white/70 md:text-base max-md:mt-4">
            Great systems don&apos;t always start where they&apos;re supposed
            to.
            <br />
            The page you&apos;re looking for doesn&apos;t exist — but the
            platform is running exactly as designed.
          </p>

          <div className="mt-4 flex gap-4 items-center justify-center md:flex-row flex-col max-md:w-full">
            <Link
              href="/"
              className="max-md:w-full inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-white/15"
            >
              Go Back to Home
            </Link>

            <Link
              href="/services"
              className="max-md:w-full inline-flex items-center justify-center rounded-full border border-white/20 bg-primary px-6 py-3 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-primary-hover"
            >
              View Our Services
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
