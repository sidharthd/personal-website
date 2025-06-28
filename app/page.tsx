"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
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

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

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

  // Fun animated text component with cycling text
  const PlayfulText = () => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const keywords = [
      { text: "AI", icon: Brain, color: "purple" },
      { text: "code", icon: Code, color: "blue" },
      { text: "curiosity", icon: Lightbulb, color: "yellow" },
    ]

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % keywords.length)
      }, 3000) // Change every 3 seconds

      return () => clearInterval(interval)
    }, [])

    const currentKeyword = keywords[currentIndex]
    const CurrentIcon = currentKeyword.icon

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="flex items-center justify-center gap-4 text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-300 leading-relaxed"
      >
        <span className="text-gray-700 dark:text-gray-300">I build with</span>

        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.8 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex items-center gap-3"
        >
          <motion.div
            className={`
            w-12 h-12 rounded-2xl flex items-center justify-center
            ${currentKeyword.color === "purple" ? "bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30" : ""}
            ${currentKeyword.color === "blue" ? "bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30" : ""}
            ${currentKeyword.color === "yellow" ? "bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30" : ""}
          `}
            animate={{
              scale: [1, 1.1, 1],
              rotate:
                currentKeyword.color === "purple"
                  ? [0, 360]
                  : currentKeyword.color === "blue"
                    ? [0, 180, 360]
                    : [0, 15, -15, 0],
            }}
            transition={{
              duration: currentKeyword.color === "purple" ? 8 : currentKeyword.color === "blue" ? 2 : 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <CurrentIcon
              className={`
              w-7 h-7
              ${currentKeyword.color === "purple" ? "text-purple-600 dark:text-purple-400" : ""}
              ${currentKeyword.color === "blue" ? "text-blue-600 dark:text-blue-400" : ""}
              ${currentKeyword.color === "yellow" ? "text-yellow-600 dark:text-yellow-400" : ""}
            `}
            />
          </motion.div>

          <motion.span
            className={`
            font-bold
            ${currentKeyword.color === "purple" ? "text-purple-700 dark:text-purple-300" : ""}
            ${currentKeyword.color === "blue" ? "text-blue-700 dark:text-blue-300" : ""}
            ${currentKeyword.color === "yellow" ? "text-yellow-700 dark:text-yellow-300" : ""}
          `}
            animate={{
              textShadow: [
                "0 0 0px rgba(0,0,0,0)",
                `0 0 10px ${currentKeyword.color === "purple" ? "rgba(168, 85, 247, 0.3)" : currentKeyword.color === "blue" ? "rgba(59, 130, 246, 0.3)" : "rgba(251, 191, 36, 0.3)"}`,
                "0 0 0px rgba(0,0,0,0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            {currentKeyword.text}
          </motion.span>
        </motion.div>

        <motion.span
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: 1,
          }}
          className="text-3xl"
        >
          ✨
        </motion.span>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 relative overflow-x-hidden">
      <ThemeSelector />

      {/* Geometric Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 border border-gray-200 dark:border-gray-800 rotate-45 opacity-30" />
        <div className="absolute bottom-40 left-10 w-64 h-64 border border-gray-300 dark:border-gray-700 rotate-12 opacity-20" />
      </div>

      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight"
            >
              <span className="text-rose-500">S</span>D
            </motion.div>
            <div className="hidden md:flex items-center space-x-12">
              {["About", "Skills", "Experience", "Education", "Contact"].map((item, index) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.toLowerCase())}
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
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section
          id="hero"
          className="min-h-screen flex items-center relative"
          itemScope
          itemType="https://schema.org/Person"
        >
          <div className="max-w-7xl mx-auto px-8 py-20 flex items-center justify-center">
            {/* Content */}
            <div className="text-center space-y-16 max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-12"
              >
                <div className="space-y-8">
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    onClick={() => scrollToSection("contact")}
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 rounded-full text-sm font-medium cursor-pointer transition-all duration-300"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="w-2 h-2 bg-rose-500 rounded-full"
                    />
                    <span>Available for new opportunities</span>
                  </motion.button>

                  <h1
                    className="text-6xl lg:text-8xl font-black text-gray-900 dark:text-white leading-none tracking-tight"
                    itemProp="name"
                  >
                    SIDHARTH
                    <br />
                    <span className="text-rose-500">DEVARAJ</span>
                  </h1>
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
                    SENIOR SOFTWARE ENGINEER
                  </h2>

                  <PlayfulText />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                  className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
                >
                  <Button
                    onClick={() => scrollToSection("contact")}
                    className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 text-lg font-medium group transition-all duration-300"
                  >
                    Let's Connect
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => scrollToSection("experience")}
                    className="border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:border-rose-500 hover:text-rose-500 px-8 py-4 text-lg font-medium transition-all duration-300"
                  >
                    View Experience
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.button
            onClick={() => scrollToSection("about")}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer hover:text-rose-500 transition-colors"
            aria-label="Scroll to next section"
          >
            <ChevronDown className="w-8 h-8 text-gray-400 dark:text-gray-600" />
          </motion.button>
        </section>

        {/* Diagonal Divider */}
        <div className="relative h-24 bg-gradient-to-r from-rose-500 to-blue-500 transform -skew-y-1 origin-top-left" />

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
                    <div className="w-12 h-1 bg-rose-500" />
                    <h2 className="text-5xl font-black text-gray-900 dark:text-white">ABOUT</h2>
                  </div>

                  <div className="w-32 h-32 bg-gradient-to-br from-rose-500/10 to-blue-500/10 rounded-3xl flex items-center justify-center">
                    <div className="w-16 h-16 bg-rose-500/20 rounded-2xl" />
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-8">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <p className="text-2xl font-light text-gray-700 dark:text-gray-300 leading-relaxed">
                    I'm a frontend specialist who bridges the gap between technical excellence and product strategy.
                  </p>

                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    With 7+ years of experience and a strong full-stack foundation, I focus on crafting exceptional user
                    interfaces that solve real business problems. My approach combines deep frontend expertise with
                    product thinking—understanding user needs, market dynamics, and business objectives to build
                    applications that not only look and feel amazing but drive meaningful outcomes.
                  </p>

                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    I excel at leading end-to-end project delivery, mentoring developers, and translating complex
                    technical concepts into strategic business value.
                  </p>
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
                <h2 className="text-5xl font-black text-gray-900 dark:text-white" itemProp="name">
                  SKILLS & EXPERTISE
                </h2>
                <div className="w-24 h-1 bg-rose-500 mx-auto" />
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 h-full">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-3 h-3 bg-rose-500 rounded-full" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{section.title}</h3>
                      </div>

                      <div className="space-y-6">
                        {section.categories.map((category) => (
                          <div key={category.name} className="space-y-3">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                              {category.name}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {category.skills.map((skill) => (
                                <Badge
                                  key={skill}
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
                                    px-3 py-1 text-xs font-medium
                                  `}
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
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
                <h2 className="text-5xl font-black text-gray-900 dark:text-white">EXPERIENCE</h2>
                <div className="w-24 h-1 bg-rose-500 mx-auto" />
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
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-gray-50 dark:bg-gray-950 p-8 rounded-3xl border-l-4 border-rose-500 hover:shadow-lg transition-all duration-300">
                    <div className="grid lg:grid-cols-12 gap-8">
                      <div className="lg:col-span-4 space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{job.title}</h3>
                          {job.company && (
                            <div className="flex items-center space-x-2">
                              {job.url ? (
                                <a
                                  href={job.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-rose-500 hover:text-rose-600 font-medium inline-flex items-center gap-2 transition-colors"
                                >
                                  {job.company}
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              ) : (
                                <span className="text-rose-500 font-medium">{job.company}</span>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                          <p className="font-medium">{job.period}</p>
                          <p>{job.location}</p>
                        </div>
                      </div>

                      <div className="lg:col-span-8 space-y-4">
                        {job.description && (
                          <p className="text-gray-700 dark:text-gray-300 font-medium">{job.description}</p>
                        )}

                        <ul className="space-y-3">
                          {job.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start space-x-3 text-gray-600 dark:text-gray-400">
                              <div className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-2 flex-shrink-0" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
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
                <h2 className="text-5xl font-black text-gray-900 dark:text-white">EDUCATION</h2>
                <div className="w-24 h-1 bg-rose-500 mx-auto" />
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-800 h-full">
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center">
                        <div className="w-6 h-6 bg-rose-500 rounded-lg" />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{edu.degree}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{edu.institution}</p>
                        <p className="text-rose-500 font-medium">{edu.year}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 bg-white dark:bg-gray-900 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-20 w-96 h-96 border border-gray-300 dark:border-gray-700 rotate-45" />
            <div className="absolute bottom-20 right-20 w-64 h-64 border border-gray-300 dark:border-gray-700 rotate-12" />
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
                <h2 className="text-5xl font-black text-gray-900 dark:text-white">LET'S CONNECT</h2>
                <div className="w-24 h-1 bg-rose-500 mx-auto" />
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Ready to bring your ideas to life? I'm always excited about new opportunities and collaborations.
                </p>
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
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Get in touch</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    I'm currently available for new opportunities where I can leverage my frontend expertise and product
                    mindset. Whether you need help building exceptional user experiences or want to discuss how great
                    frontend engineering can drive business growth, I'd love to hear from you.
                  </p>
                </div>

                <div className="grid gap-6">
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
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="group flex items-center space-x-4 p-6 bg-gray-50 dark:bg-gray-950 rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-800"
                    >
                      <div
                        className={`
                        w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300
                        ${contact.color === "rose" ? "bg-rose-500" : ""}
                        ${contact.color === "blue" ? "bg-blue-500" : ""}
                        ${contact.color === "green" ? "bg-green-500" : ""}
                        ${contact.color === "purple" ? "bg-purple-500" : ""}
                      `}
                      >
                        <contact.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          {contact.label}
                        </p>
                        <p className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-rose-500 transition-colors flex items-center gap-2">
                          {contact.value}
                          {contact.href.startsWith("http") && (
                            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Availability Status */}
                <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl border border-green-200 dark:border-green-800">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">Available for new projects</p>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Currently accepting opportunities for frontend development and product-focused engineering roles.
                    Response time: Usually within 24 hours.
                  </p>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="bg-gray-50 dark:bg-gray-950 p-8 rounded-3xl border border-gray-200 dark:border-gray-800">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Send me a message</h3>

                  {/* Success Message */}
                  {submitStatus === "success" && (
                    <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="text-green-800 dark:text-green-200 font-medium">
                          Thank you for your message! I'll get back to you soon.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {submitStatus === "error" && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                      <p className="text-red-800 dark:text-red-200">
                        Something went wrong. Please try again or contact me directly.
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 transition-all duration-300 bg-white dark:bg-gray-900 disabled:opacity-50 text-gray-900 dark:text-gray-100"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 transition-all duration-300 bg-white dark:bg-gray-900 disabled:opacity-50 text-gray-900 dark:text-gray-100"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 transition-all duration-300 bg-white dark:bg-gray-900 disabled:opacity-50 text-gray-900 dark:text-gray-100"
                        placeholder="What's this about?"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 transition-all duration-300 bg-white dark:bg-gray-900 resize-none disabled:opacity-50 text-gray-900 dark:text-gray-100"
                        placeholder="Tell me about your project or just say hello!"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-rose-500 hover:bg-rose-600 text-white py-4 text-lg font-medium rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending...</span>
                        </div>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                      Prefer email? Drop me a line at{" "}
                      <a
                        href="mailto:sidharth@sidh.dev"
                        className="text-rose-500 hover:text-rose-600 font-medium transition-colors"
                      >
                        sidharth@sidh.dev
                      </a>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="py-12 px-8 bg-gray-900 dark:bg-black border-t border-gray-800 dark:border-gray-900"
        role="contentinfo"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SD</span>
              </div>
              <p className="text-gray-400">
                © {new Date().getFullYear()} <span itemProp="name">Sidharth Devaraj</span>. Crafted with precision.
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <a href="mailto:sidharth@sidh.dev" className="text-gray-400 hover:text-rose-500 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/sidharth/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-rose-500 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
