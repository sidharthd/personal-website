"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Design = "modern" | "geeky"

interface DesignContextType {
  design: Design
  setDesign: (design: Design) => void
}

const DesignContext = createContext<DesignContextType | undefined>(undefined)

export function DesignProvider({ children }: { children: React.ReactNode }) {
  const [design, setDesign] = useState<Design>("modern")

  useEffect(() => {
    // Get design from localStorage or default to modern
    const savedDesign = localStorage.getItem("design") as Design
    if (savedDesign) {
      setDesign(savedDesign)
    }
  }, [])

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem("design", design)
  }, [design])

  return <DesignContext.Provider value={{ design, setDesign }}>{children}</DesignContext.Provider>
}

export function useDesign() {
  const context = useContext(DesignContext)
  if (context === undefined) {
    throw new Error("useDesign must be used within a DesignProvider")
  }
  return context
}
