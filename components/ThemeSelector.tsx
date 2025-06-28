"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sun, Moon, Monitor } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const themes = [
    { id: "light" as const, name: "Light", icon: Sun },
    { id: "dark" as const, name: "Dark", icon: Moon },
    { id: "system" as const, name: "System", icon: Monitor },
  ]

  const currentTheme = themes.find((t) => t.id === theme) || themes[2]
  const CurrentIcon = currentTheme.icon

  return (
    <div className="fixed top-24 right-6 z-50 pointer-events-auto">
      <div className="relative">
        {/* Main Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
        >
          <CurrentIcon className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform duration-200" />
        </button>

        {/* Theme Options */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute top-12 right-0 w-32 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden"
          >
            {themes.map((themeOption) => {
              const Icon = themeOption.icon
              const isActive = theme === themeOption.id

              return (
                <button
                  key={themeOption.id}
                  onClick={() => {
                    setTheme(themeOption.id)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center space-x-2 px-3 py-2 text-sm transition-colors duration-150 ${
                    isActive
                      ? "bg-rose-500 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{themeOption.name}</span>
                </button>
              )
            })}
          </motion.div>
        )}
      </div>

      {/* Click outside to close */}
      {isOpen && <div className="fixed inset-0 z-[-1]" onClick={() => setIsOpen(false)} />}
    </div>
  )
}
