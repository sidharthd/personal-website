"use client"

import { motion } from "framer-motion"
import { Wand2 } from "lucide-react"
import { useDesign } from "@/contexts/DesignContext"

export function DesignToggle() {
  const { design, setDesign } = useDesign()

  const toggleDesign = () => {
    setDesign(design === "modern" ? "geeky" : "modern")
  }

  return (
    <motion.button
      onClick={toggleDesign}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center group ${
        design === "modern"
          ? "bg-rose-500 hover:bg-rose-600 text-white"
          : "bg-green-500 hover:bg-green-600 text-black terminal-border"
      }`}
      title={`Switch to ${design === "modern" ? "Geeky" : "Modern"} Design`}
    >
      <motion.div animate={{ rotate: design === "geeky" ? 360 : 0 }} transition={{ duration: 0.5 }}>
        <Wand2 className={`w-6 h-6 ${design === "geeky" ? "neon-glow" : ""}`} />
      </motion.div>
    </motion.button>
  )
}
