"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export function Logo({ className = "" }: { className?: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="/"
      className={`inline-flex items-baseline font-display text-2xl font-bold tracking-tight ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <motion.span
        className="text-foreground"
        animate={{ y: hovered ? -2 : 0 }}
        transition={{ type: "spring", stiffness: 600, damping: 22 }}
      >
        P
      </motion.span>
      <motion.span
        className="text-accent"
        animate={{ y: hovered ? 2 : 0 }}
        transition={{ type: "spring", stiffness: 600, damping: 22 }}
      >
        D
      </motion.span>
    </Link>
  );
}
