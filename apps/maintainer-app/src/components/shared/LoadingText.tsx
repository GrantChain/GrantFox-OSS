"use client"

import { memo } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface LoadingTextProps {
  text?: string
  className?: string
}

const LoadingText = ({ text = "loading...", className }: LoadingTextProps) => {
  return (
    <motion.span
      role="status"
      aria-live="polite"
      className={cn("inline-block text-lg font-medium", className)}
      animate={{ scale: [1, 1.06, 1] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
    >
      {text}
    </motion.span>
  )
}

export default memo(LoadingText)
