"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
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

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleThemeSelect = (themeId: typeof theme) => {
    setTheme(themeId)
    setIsOpen(false)
  }

  const handleBackdropClick = () => {
    setIsOpen(false)
  }

  return (
    <>
      <div className="fixed top-20 sm:top-24 right-4 sm:right-6 z-50">
        <div className="relative">
          {/* Main Toggle Button */}
          <button
            onClick={handleToggle}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group touch-manipulation"
            aria-label="Toggle theme selector"
            aria-expanded={isOpen}
          >
            <CurrentIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform duration-200" />
          </button>

          {/* Theme Options */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -5 }}
                transition={{ duration: 0.15 }}
                className="absolute top-12 sm:top-14 right-0 w-36 sm:w-40 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden z-10"
              >
                {themes.map((themeOption) => {
                  const Icon = themeOption.icon
                  const isActive = theme === themeOption.id

                  return (
                    <button
                      key={themeOption.id}
                      onClick={() => handleThemeSelect(themeOption.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors duration-150 touch-manipulation ${
                        isActive
                          ? "bg-rose-500 text-white"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600"
                      }`}
                      aria-label={`Switch to ${themeOption.name} theme`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span>{themeOption.name}</span>
                    </button>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Click outside to close - improved for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-transparent"
            onClick={handleBackdropClick}
            onTouchStart={handleBackdropClick}
          />
        )}
      </AnimatePresence>
    </>
  )
}
