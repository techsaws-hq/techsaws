"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";

import Logo from "../../../public/favicons/logo.svg";

function HeaderNotch({ collapsed }: { collapsed: boolean }) {
  const path = usePathname();

  const EXPANDED_WIDTH = 720;
  const COLLAPSED_WIDTH = 56;

  return (
    <motion.div
      animate={{ width: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH }}
      transition={{ type: "spring", stiffness: 120, damping: 22 }}
      className="pointer-events-auto relative h-[56px] rounded-full overflow-hidden bg-black dark:bg-[#0A0A0A] backdrop-blur-xl dark:backdrop-blur-2xl shadow-[0_12px_30px_rgba(0,0,0,0.22)] dark:shadow-[0_10px_26px_rgba(0,0,0,0.9)] before:absolute before:inset-0 before:rounded-full before:content-[''] before:pointer-events-none before:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] dark:before:shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] dark:text-heading text-white font-heading max-md:hidden"
    >
      {collapsed ? (
        <motion.div
          animate={{ scale: collapsed ? 1 : 1.06 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="absolute inset-0 flex-center pointer-events-none"
        >
          <Link passHref href={"/"}>
            <Image
              src={Logo}
              alt="TechSaws – We Build. We Brand. We Break Boundaries."
              width={55}
              height={55}
              priority
              className="animate-pulse"
            />
          </Link>
        </motion.div>
      ) : (
        <div className="flex items-center justify-between h-full px-8">
          <div className="flex gap-2 text-sm font-medium">
            <Link
              href="/"
              className={cn(
                "p-2 rounded-md",
                path === "/"
                  ? "bg-primary text-primary-foreground"
                  : "text-[#ffffff] hover:bg-[#2a2b2e]"
              )}
            >
              Home
            </Link>
            <Link
              href="/services"
              className={cn(
                "p-2 rounded-md",
                path === "/services"
                  ? "bg-primary text-primary-foreground"
                  : "text-[#ffffff] hover:bg-[#2a2b2e]"
              )}
            >
              Services
            </Link>
            <Link
              href="/work"
              className={cn(
                "p-2 rounded-md",
                path === "/work"
                  ? "bg-primary text-primary-foreground"
                  : "text-[#ffffff] hover:bg-[#2a2b2e]"
              )}
            >
              Work
            </Link>
          </div>

          <Link passHref href={"/"}>
            <Image
              src={Logo}
              alt="TechSaws – We Build. We Brand. We Break Boundaries."
              width={55}
              height={55}
              priority
              className="animate-ts-breathe"
            />
          </Link>

          <div className="flex gap-2 text-sm font-medium">
            <Link
              href="/about-us"
              className={cn(
                "p-2 rounded-md",
                path === "/about-us"
                  ? "bg-primary text-primary-foreground"
                  : "text-[#ffffff] hover:bg-[#2a2b2e]"
              )}
            >
              About
            </Link>
            <Link
              href="/plans"
              className={cn(
                "p-2 rounded-md",
                path === "/plans"
                  ? "bg-primary text-primary-foreground"
                  : "text-[#ffffff] hover:bg-[#2a2b2e]"
              )}
            >
              Plans
            </Link>
            <Link
              href="/contact-us"
              className={cn(
                "p-2 rounded-md",
                path === "/contact-us"
                  ? "bg-primary text-primary-foreground"
                  : "text-[#ffffff] hover:bg-[#2a2b2e]"
              )}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default HeaderNotch;
