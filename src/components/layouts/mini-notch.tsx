"use client";

import { ReactNode, useState } from "react";
import { motion } from "framer-motion";

function MiniNotch({
  icon,
  expandedWidth,
  children,
  visible,
}: {
  icon: string | ReactNode;
  expandedWidth: number;
  children: ReactNode;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const MINI_COLLAPSED = 40;

  return (
    <motion.div
      animate={{
        width: hovered ? expandedWidth : MINI_COLLAPSED,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="pointer-events-auto relative h-[40px] px-4 rounded-full overflow-hidden flex items-center bg-black dark:bg-[#0A0A0A] backdrop-blur-xl dark:backdrop-blur-2xl shadow-[0_12px_30px_rgba(0,0,0,0.22)] dark:shadow-[0_10px_26px_rgba(0,0,0,0.9)] before:absolute before:inset-0 before:rounded-full before:content-[''] before:pointer-events-none before:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] dark:before:shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] dark:text-heading text-white font-heading max-md:hidden"
    >
      <motion.div
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {icon}
      </motion.div>

      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2, delay: hovered ? 0.05 : 0 }}
        className="absolute inset-0 px-4 flex items-center w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default MiniNotch;
