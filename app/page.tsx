"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Linkedin,
  ChevronDown,
  ArrowRight,
  Brain,
  Code,
  Lightbulb,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeSelector } from "@/components/ThemeSelector"

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const floatingAnimation = {
  y: [-10, 10, -10],
  transition: {
    duration: 6,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  },
}

// Typing animation component
const TypewriterText = ({ text, className }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 50)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
        className="inline-block w-0.5 h-8 bg-rose-500 ml-1"
      />
    </span>
  )
}

// Fun animated text component
const PlayfulText = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
      className="flex flex-wrap items-center justify-center gap-3 text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
    >
      <span>I build with</span>

      {/* AI Section */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full border border-purple-200 dark:border-purple-700 cursor-pointer"
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </motion.div>
        <span className="font-semibold text-purple-700 dark:text-purple-300">AI</span>
      </motion.div>

      <span>,</span>

      {/* Code Section */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: -5 }}
        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-full border border-blue-200 dark:border-blue-700 cursor-pointer"
      >
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
          <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </motion.div>
        <span className="font-semibold text-blue-700 dark:text-blue-300">code</span>
      </motion.div>

      <span>, and</span>

      {/* Curiosity Section */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-full border border-yellow-200 dark:border-yellow-700 cursor-pointer"
      >
        <motion.div
          animate={{
            rotate: [0, 15, -15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
        </motion.div>
        <span className="font-semibold text-yellow-700 dark:text-yellow-300">curiosity</span>
      </motion.div>

      <motion.span
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        className="text-2xl"
      >
        ✨
      </motion.span>
    </motion.div>
  )
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const springY = useSpring(y, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "experience", "education", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch("https://formspree.io/f/myzjleyw", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        setSubmitStatus("success")
        form.reset()
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 relative overflow-x-hidden" suppressHydrationWarning>
      <ThemeSelector />

      {/* Animated Geometric Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          animate={floatingAnimation}
          className="absolute top-20 right-20 w-96 h-96 border border-gray-200 dark:border-gray-800 rotate-45 opacity-30"
        />
        <motion.div
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }}
          className="absolute bottom-40 left-10 w-64 h-64 border border-gray-300 dark:border-gray-700 rotate-12 opacity-20"
        />

        {/* Ripple Animation */}
        <div className="absolute top-8 right-8">
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 1, 0], opacity: [1, 0.5, 0] }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeOut",
            }}
            className="absolute w-32 h-32 rounded-full border-2 border-rose-500/30"
          />
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 1.5, 0], opacity: [1, 0.3, 0] }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeOut",
              delay: 0.5,
            }}
            className="absolute w-32 h-32 rounded-full border border-rose-500/20"
          />
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 2, 0], opacity: [1, 0.1, 0] }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeOut",
              delay: 1,
            }}
            className="absolute w-32 h-32 rounded-full border border-rose-500/10"
          />
        </div>
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 pointer-events-auto">
          <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="flex justify-between items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight cursor-pointer"
              >
                <span className="text-rose-500">S</span>D
              </motion.div>
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="hidden md:flex items-center space-x-12"
              >
                {["About", "Skills", "Experience", "Education", "Contact"].map((item, index) => (
                  <motion.button
                    key={item}
                    variants={staggerItem}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    className={`text-sm font-medium transition-all duration-300 hover:text-rose-500 relative ${
                      activeSection === item.toLowerCase() ? "text-rose-500" : "text-gray-600 dark:text-gray-400"
                    }`}
                    aria-label={`Navigate to ${item} section`}
                  >
                    {item}
                    {activeSection === item.toLowerCase() && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-rose-500"
                      />
                    )}
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      <main className="relative z-10 pointer-events-auto">
        {/* Hero Section */}
        <section
          id="hero"
          className="min-h-screen flex items-center relative px-8 py-32"
          itemScope
          itemType="https://schema.org/Person"
        >
          <div className="max-w-7xl mx-auto w-full flex items-center justify-center">
            {/* Left Content */}
            <div className="text-center space-y-16 max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-12"
              >
                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 rounded-full text-sm font-medium cursor-pointer"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="w-2 h-2 bg-rose-500 rounded-full"
                    />
                    <span>Available for new opportunities</span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-6xl lg:text-8xl font-black text-gray-900 dark:text-white leading-none tracking-tight"
                    itemProp="name"
                  >
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                      SIDHARTH
                    </motion.span>
                    <br />
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="text-rose-500"
                    >
                      DEVARAJ
                    </motion.span>
                  </motion.h1>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="space-y-10"
                >
                  <h2
                    className="text-xl lg:text-2xl font-medium text-gray-600 dark:text-gray-400 tracking-wide"
                    itemProp="jobTitle"
                  >
                    <TypewriterText text="SENIOR SOFTWARE ENGINEER" />
                  </h2>

                  <PlayfulText />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                  className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => scrollToSection("contact")}
                      className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 text-lg font-medium group transition-all duration-300"
                    >
                      Let's Connect
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </motion.div>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      onClick={() => scrollToSection("experience")}
                      className="border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:border-rose-500 hover:text-rose-500 px-8 py-4 text-lg font-medium transition-all duration-300"
                    >
                      View Experience
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.button
            onClick={() => scrollToSection("about")}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            whileHover={{ scale: 1.2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer hover:text-rose-500 transition-colors"
            aria-label="Scroll to next section"
          >
            <ChevronDown className="w-8 h-8 text-gray-400 dark:text-gray-600" />
          </motion.button>
        </section>

        {/* Rest of sections remain the same... */}
        {/* Diagonal Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative h-24 bg-gradient-to-r from-rose-500 to-blue-500 transform -skew-y-1 origin-top-left"
        />

        {/* About Section */}
        <section
          id="about"
          className="py-32 bg-white dark:bg-gray-900"
          itemScope
          itemType="https://schema.org/AboutPage"
        >
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-4">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: 48 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="h-1 bg-rose-500"
                    />
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true }}
                      className="text-5xl font-black text-gray-900 dark:text-white"
                    >
                      ABOUT
                    </motion.h2>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    whileHover={{ rotate: 5 }}
                    className="w-32 h-32 bg-gradient-to-br from-rose-500/10 to-blue-500/10 rounded-3xl flex items-center justify-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                      className="w-16 h-16 bg-rose-500/20 rounded-2xl"
                    />
                  </motion.div>
                </motion.div>
              </div>

              <div className="lg:col-span-8">
                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <motion.p
                    variants={staggerItem}
                    className="text-2xl font-light text-gray-700 dark:text-gray-300 leading-relaxed"
                  >
                    I'm a frontend specialist who bridges the gap between technical excellence and product strategy.
                  </motion.p>

                  <motion.p variants={staggerItem} className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    With 7+ years of experience and a strong full-stack foundation, I focus on crafting exceptional user
                    interfaces that solve real business problems. My approach combines deep frontend expertise with
                    product thinking—understanding user needs, market dynamics, and business objectives to build
                    applications that not only look and feel amazing but drive meaningful outcomes.
                  </motion.p>

                  <motion.p variants={staggerItem} className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    I excel at leading end-to-end project delivery, mentoring developers, and translating complex
                    technical concepts into strategic business value.
                  </motion.p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className="py-32 bg-gray-50 dark:bg-gray-950"
          itemScope
          itemType="https://schema.org/ItemList"
        >
          <div className="max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <div className="space-y-4">
                <motion.h2
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-5xl font-black text-gray-900 dark:text-white"
                  itemProp="name"
                >
                  SKILLS & EXPERTISE
                </motion.h2>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 96 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="h-1 bg-rose-500 mx-auto"
                />
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                {
                  title: "Core Technologies",
                  categories: [
                    {
                      name: "Programming Languages",
                      skills: ["JavaScript (ES6+)", "TypeScript", "Python"],
                      color: "rose",
                    },
                    { name: "Front-End", skills: ["React", "HTML", "CSS", "React Native"], color: "blue" },
                    { name: "Back-End", skills: ["Node.js", "Express.js", "REST API", "PostgreSQL"], color: "green" },
                  ],
                },
                {
                  title: "Development Tools",
                  categories: [
                    { name: "Design Systems", skills: ["Material UI", "Ant Design", "Chakra UI"], color: "purple" },
                    { name: "Testing", skills: ["Jest", "Vitest", "React Testing Library"], color: "orange" },
                    { name: "DevOps", skills: ["AWS", "DigitalOcean", "Linux", "NGINX"], color: "gray" },
                  ],
                },
                {
                  title: "Professional Skills",
                  categories: [
                    {
                      name: "Leadership",
                      skills: ["Project Management", "Technical Mentorship", "Code Reviews"],
                      color: "indigo",
                    },
                    {
                      name: "Communication",
                      skills: ["Client Collaboration", "Technical Documentation"],
                      color: "teal",
                    },
                    { name: "Methodologies", skills: ["Git", "Agile", "Jira"], color: "yellow" },
                  ],
                },
              ].map((section, index) => (
                <motion.div
                  key={section.title}
                  variants={staggerItem}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 h-full">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                          className="w-3 h-3 bg-rose-500 rounded-full"
                        />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{section.title}</h3>
                      </div>

                      <div className="space-y-6">
                        {section.categories.map((category, catIndex) => (
                          <motion.div
                            key={category.name}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: catIndex * 0.1 }}
                            viewport={{ once: true }}
                            className="space-y-3"
                          >
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                              {category.name}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {category.skills.map((skill, skillIndex) => (
                                <motion.div
                                  key={skill}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  whileHover={{ scale: 1.1, y: -2 }}
                                  transition={{ delay: skillIndex * 0.05 }}
                                  viewport={{ once: true }}
                                >
                                  <Badge
                                    variant="secondary"
                                    className={`
                                      ${category.color === "rose" ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300" : ""}
                                      ${category.color === "blue" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" : ""}
                                      ${category.color === "green" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" : ""}
                                      ${category.color === "purple" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" : ""}
                                      ${category.color === "orange" ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300" : ""}
                                      ${category.color === "gray" ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300" : ""}
                                      ${category.color === "indigo" ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300" : ""}
                                      ${category.color === "teal" ? "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300" : ""}
                                      ${category.color === "yellow" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300" : ""}
                                      px-3 py-1 text-xs font-medium cursor-pointer
                                    `}
                                  >
                                    {skill}
                                  </Badge>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          className="py-32 bg-white dark:bg-gray-900"
          itemScope
          itemType="https://schema.org/WorkHistory"
        >
          <div className="max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <div className="space-y-4">
                <motion.h2
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-5xl font-black text-gray-900 dark:text-white"
                >
                  EXPERIENCE
                </motion.h2>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 96 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="h-1 bg-rose-500 mx-auto"
                />
              </div>
            </motion.div>

            <div className="space-y-12">
              {[
                {
                  title: "Senior Front-End Engineer",
                  company: "1Centre",
                  url: "https://1centre.com/",
                  period: "Jul 2023 – May 2025",
                  location: "Remote",
                  description: "Trade-credit consumer onboarding and compliance platform.",
                  achievements: [
                    "Developed high-impact features based on user needs, enhancing the customer experience",
                    "Diagnosed and resolved a critical performance issue, preventing crashes and improving stability",
                    "Refactored parts of the codebase to improve reliability and maintainability",
                    "Played a key role in architecting a modern front-end with Svelte, evaluating tools and trade-offs",
                  ],
                },
                {
                  title: "Senior Front-End Engineer",
                  company: "Relay",
                  url: "https://relay.ai/",
                  period: "Apr 2022 – Apr 2023",
                  location: "Remote",
                  description:
                    "Platform that automated business cashflows through incentivised early invoice payments.",
                achievements: [
                  "Architected and built the front-end web app from the ground up",
                  "Collaborated closely with the founders to make their vision a reality",
                ],
              },
              {
                title: "Co-Founder & CTO",
                company: "Firstbyte Digital Solutions",
                url: "https://www.firstbytedigital.com/",
                period: "Nov 2017 – Mar 2022",
                location: "Thiruvananthapuram, India",
                description: "Full-stack development studio that served small businesses and startups.",
                achievements: [
                  "Managed a small cross-functional team, overseeing design and development",
                  "Oversaw project lifecycle: scoping, development, QA, and deployment",
                  "Established code review culture",
                  "Mentored other developers and initiated team building activities",
                  "Handled React Native workshops for college students and professionals",
                ],
              },
              {
                title: "Freelance Web Developer",
                company: null,
                url: null,
                period: "Jan 2016 – Oct 2017",
                location: "Thiruvananthapuram, India",
                description: null,
                achievements: [
                  "Led a team of freelance developers to develop web applications",
                  "Took ownership of end-to-end project delivery",
                ],
              },
            ].map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group"
              >
                <div className="bg-gray-50 dark:bg-gray-950 p-8 rounded-3xl border-l-4 border-rose-500 hover:shadow-lg transition-all duration-300">
                  <div className="grid lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4 space-y-4">
                      <div className="space-y-2">
                        <motion.h3
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          viewport={{ once: true }}
                          className="text-2xl font-bold text-gray-900 dark:text-white"
                        >
                          {job.title}
                        </motion.h3>
                        {job.company && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            viewport={{ once: true }}
                            className="flex items-center space-x-2"
                          >
                            {job.url ? (
                              <motion.a
                                href={job.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                className="text-rose-500 hover:text-rose-600 font-medium inline-flex items-center gap-2 transition-colors"
                              >
                                {job.company}
                                <motion.div whileHover={{ rotate: 45 }} transition={{ duration: 0.2 }}>
                                  <ExternalLink className="w-4 h-4" />
                                </motion.div>
                              </motion.a>
                            ) : (
                              <span className="text-rose-500 font-medium">{job.company}</span>
                            )}
                          </motion.div>
                        )}
                      </div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                        className="space-y-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <p className="font-medium">{job.period}</p>
                        <p>{job.location}</p>
                      </motion.div>
                    </div>

                    <div className="lg:col-span-8 space-y-4">
                      {job.description && (
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          viewport={{ once: true }}
                          className="text-gray-700 dark:text-gray-300 font-medium"
                        >
                          {job.description}
                        </motion.p>
                      )}

                      <motion.ul
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="space-y-3"
                      >
                        {job.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            variants={staggerItem}
                            className="flex items-start space-x-3 text-gray-600 dark:text-gray-400"
                          >
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                              className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-2 flex-shrink-0"
                            />
                            <span>{achievement}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-32 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="space-y-4">
              <motion.h2
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-5xl font-black text-gray-900 dark:text-white"
              >
                EDUCATION
              </motion.h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="h-1 bg-rose-500 mx-auto"
              />
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {[
              {
                degree: "M.Tech in Information Security",
                institution: "College of Engineering, Thiruvananthapuram, India",
                year: "2018",
              },
              {
                degree: "B.Tech in Computer Science",
                institution: "College of Engineering, Chengannur, India",
                year: "2015",
              },
            ].map((edu, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-800 h-full">
                  <div className="space-y-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                        className="w-6 h-6 bg-rose-500 rounded-lg"
                      />
                    </motion.div>

                    <div className="space-y-2">
                      <motion.h3
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-xl font-bold text-gray-900 dark:text-white"
                      >
                        {edu.degree}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                        className="text-gray-600 dark:text-gray-400"
                      >
                        {edu.institution}
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                        className="text-rose-500 font-medium"
                      >
                        {edu.year}
                      </motion.p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-white dark:bg-gray-900 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute top-20 left-20 w-96 h-96 border border-gray-300 dark:border-gray-700 rotate-45"
          />
          <motion.div
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute bottom-20 right-20 w-64 h-64 border border-gray-300 dark:border-gray-700 rotate-12"
          />
        </div>

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="space-y-4">
              <motion.h2
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-5xl font-black text-gray-900 dark:text-white"
              >
                LET'S CONNECT
              </motion.h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="h-1 bg-rose-500 mx-auto"
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              >
                Ready to bring your ideas to life? I'm always excited about new opportunities and collaborations.
              </motion.p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="space-y-6"
              >
                <motion.h3 variants={staggerItem} className="text-3xl font-bold text-gray-900 dark:text-white">
                  Get in touch
                </motion.h3>
                <motion.p variants={staggerItem} className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  I'm currently available for new opportunities where I can leverage my frontend expertise and product
                  mindset. Whether you need help building exceptional user experiences or want to discuss how great
                  frontend engineering can drive business growth, I'd love to hear from you.
                </motion.p>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="grid gap-6"
              >
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "sidharth@sidh.dev",
                    href: "mailto:sidharth@sidh.dev",
                    color: "rose",
                  },
                  { icon: Phone, label: "Phone", value: "+91-97461 63694", href: "tel:+919746163694", color: "blue" },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: "Thiruvananthapuram, India",
                    href: "https://en.wikipedia.org/wiki/Thiruvananthapuram",
                    color: "green",
                  },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    value: "linkedin.com/in/sidharth/",
                    href: "https://linkedin.com/in/sidharth/",
                    color: "purple",
                  },
                ].map((contact, index) => (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                    rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    variants={staggerItem}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="group flex items-center space-x-4 p-6 bg-gray-50 dark:bg-gray-950 rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-800"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                      className={`
                        w-14 h-14 rounded-2xl flex items-center justify-center
                        ${contact.color === "rose" ? "bg-rose-500" : ""}
                        ${contact.color === "blue" ? "bg-blue-500" : ""}
                        ${contact.color === "green" ? "bg-green-500" : ""}
                        ${contact.color === "purple" ? "bg-purple-500" : ""}
                      `}
                    >
                      <contact.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        {contact.label}
                      </p>
                      <p className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-rose-500 transition-colors flex items-center gap-2">
                        {contact.value}
                        {contact.href.startsWith("http") && (
                          <motion.div
                            initial={{ opacity: 0, rotate: 0 }}
                            whileHover={{ opacity: 1, rotate: 45 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </motion.div>
                        )}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </motion.div>

              {/* Availability Status */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl border border-green-200 dark:border-green-800"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="w-3 h-3 bg-green-400 rounded-full flex-shrink-0"
                  />
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">Available for new projects</p>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Currently accepting opportunities for frontend development and product-focused engineering roles.
                  Response time: Usually within 24 hours.
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gray-50 dark:bg-gray-950 p-8 rounded-3xl border border-gray-200 dark:border-gray-800"
              >
                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-2xl font-bold text-gray-900 dark:text-white mb-8"
                >
                  Send me a message
                </motion.h3>

                {/* Success Message */}
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl"
                  >
                    <div className="flex items-center space-x-2">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </motion.div>
                      <p className="text-green-800 dark:text-green-200 font-medium">
                        Thank you for your message! I'll get back to you soon.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Error Message */}
                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
                  >
                    <p className="text-red-800 dark:text-red-200">
                      Something went wrong. Please try again or contact me directly.
                    </p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 gap-4"
                  >
                    <motion.div variants={staggerItem}>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Name *
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        id="name"
                        name="name"
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 transition-all duration-300 bg-white dark:bg-gray-900 disabled:opacity-50 text-gray-900 dark:text-gray-100"
                        placeholder="Your name"
                      />
                    </motion.div>
                    <motion.div variants={staggerItem}>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Email *
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="email"
                        id="email"
                        name="email"
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 transition-all duration-300 bg-white dark:bg-gray-900 disabled:opacity-50 text-gray-900 dark:text-gray-100"
                        placeholder="your.email@example.com"
                      />
                    </motion.div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Subject *
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 transition-all duration-300 bg-white dark:bg-gray-900 disabled:opacity-50 text-gray-900 dark:text-gray-100"
                      placeholder="What's this about?"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Message *
                    </label>
                    <motion.textarea
                      whileFocus={{ scale: 1.02 }}
                      id="message"
                      name="message"
                      rows={5}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 transition-all duration-300 bg-white dark:bg-gray-900 resize-none disabled:opacity-50 text-gray-900 dark:text-gray-100"
                      placeholder="Tell me about your project or just say hello!"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-rose-500 hover:bg-rose-600 text-white py-4 text-lg font-medium rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center space-x-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                          <span>Sending...</span>
                        </div>
                      ) : (
                        <>
                          Send Message
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                          >
                            <ArrowRight className="ml-2 w-5 h-5" />
                          </motion.div>
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                  className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
                >
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    Prefer email? Drop me a line at{" "}
                    <motion.a
                      href="mailto:sidharth@sidh.dev"
                      whileHover={{ scale: 1.05 }}
                      className="text-rose-500 hover:text-rose-600 font-medium transition-colors"
                    >
                      sidharth@sidh.dev
                    </motion.a>
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>

    {/* Footer */}
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-12 px-8 bg-gray-900 dark:bg-black border-t border-gray-800 dark:border-gray-900"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center space-x-4"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center"
            >
              <span className="text-white font-bold text-sm">SD</span>
            </motion.div>
            <p className="text-gray-400">
              © {new Date().getFullYear()} <span itemProp="name">Sidharth Devaraj</span>. Crafted with precision.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="flex items-center space-x-6"
          >
            <motion.a
              href="mailto:sidharth@sidh.dev"
              whileHover={{ scale: 1.2, y: -2 }}
              transition={{ duration: 0.2 }}
              className="text-gray-400 hover:text-rose-500 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/sidharth/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -2 }}
              transition={{ duration: 0.2 }}
              className="text-gray-400 hover:text-rose-500 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  </div>
)}
