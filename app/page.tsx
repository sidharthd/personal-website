"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Mail, Phone, MapPin, ExternalLink, Linkedin, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// import { ContactForm } from "@/components/ContactForm" // Import ContactForm component
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <ThemeSelector />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-rose-100 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-semibold text-rose-600 dark:text-rose-400"
            >
              Sidharth Devaraj
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {["About", "Skills", "Experience", "Education", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors hover:text-rose-600 dark:hover:text-rose-400 ${
                    activeSection === item.toLowerCase()
                      ? "text-rose-600 dark:text-rose-400"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-rose-200 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl" />
        </motion.div>

        <div className="text-center z-10 px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-light text-gray-800 mb-6 dark:text-gray-200">
              Sidharth <span className="text-rose-500 dark:text-rose-400">Devaraj</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light dark:text-gray-400">
              Senior Software Engineer – Frontend Specialist
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed dark:text-gray-400">
              Frontend specialist with 7+ years of experience building exceptional user interfaces and leading
              end-to-end project delivery. I combine deep expertise in React and modern frontend technologies with
              strategic product thinking to create solutions that drive business impact and deliver outstanding user
              experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Get In Touch
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToSection("experience")}
                className="border-rose-300 text-rose-600 hover:bg-rose-50 px-8 py-3 rounded-full transition-all duration-300 dark:border-rose-600 dark:text-rose-400 dark:hover:bg-gray-700"
              >
                View My Experience
              </Button>
            </div>
          </motion.div>

          {/* Job Seeking Notice */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            onClick={() => scrollToSection("contact")}
            className="mt-8 group cursor-pointer"
          >
            <div className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-700 rounded-full shadow-sm hover:shadow-md hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 group-hover:scale-105 backdrop-blur-sm">
              <div className="w-3 h-3 bg-green-400 dark:bg-green-400 rounded-full animate-pulse group-hover:bg-green-500 dark:group-hover:bg-green-300 transition-colors flex-shrink-0" />
              <p className="text-sm font-medium text-green-800 dark:text-green-200 group-hover:text-green-900 dark:group-hover:text-green-100 transition-colors">
                Currently exploring new opportunities to collaborate with innovative teams
              </p>
            </div>
          </motion.button>

          <motion.button
            onClick={() => scrollToSection("about")}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer hover:text-rose-500 transition-colors dark:text-rose-400 dark:hover:text-rose-300"
            aria-label="Scroll to next section"
          >
            <ChevronDown className="w-6 h-6 text-rose-400 dark:text-rose-300" />
          </motion.button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light text-gray-800 mb-6 dark:text-gray-200">About Me</h2>
            <div className="w-20 h-1 bg-rose-400 mx-auto mb-8 dark:bg-rose-600" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-rose-100 dark:border-gray-700"
          >
            <p className="text-lg text-gray-700 leading-relaxed text-center dark:text-gray-300">
              I'm a frontend specialist who bridges the gap between technical excellence and product strategy. With 7+
              years of experience and a strong full-stack foundation, I focus on crafting exceptional user interfaces
              that solve real business problems. My approach combines deep frontend expertise with product
              thinking—understanding user needs, market dynamics, and business objectives to build applications that not
              only look and feel amazing but drive meaningful outcomes. I excel at leading end-to-end project delivery,
              mentoring developers, and translating complex technical concepts into strategic business value.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="py-20 px-6 bg-gradient-to-r from-blue-50 to-rose-50 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light text-gray-800 mb-6 dark:text-gray-200">Skills & Expertise</h2>
            <div className="w-20 h-1 bg-rose-400 mx-auto mb-8 dark:bg-rose-600" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-rose-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 dark:text-gray-200">Core Technologies</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 mb-2 dark:text-gray-400">Programming Languages:</p>
                      <div className="flex flex-wrap gap-2">
                        {["JavaScript (ES6+)", "TypeScript", "Python"].map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-rose-100 text-rose-700 dark:bg-rose-800 dark:text-rose-200"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2 dark:text-gray-400">Front-End:</p>
                      <div className="flex flex-wrap gap-2">
                        {["React", "HTML", "CSS", "React Native"].map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2 dark:text-gray-400">Back-End:</p>
                      <div className="flex flex-wrap gap-2">
                        {["Node.js", "Express.js", "REST API", "PostgreSQL"].map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-rose-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 dark:text-gray-200">Development Tools</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 mb-2 dark:text-gray-400">Design Systems:</p>
                      <div className="flex flex-wrap gap-2">
                        {["Material UI", "Ant Design", "Chakra UI"].map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-200"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2 dark:text-gray-400">Testing:</p>
                      <div className="flex flex-wrap gap-2">
                        {["Jest", "Vitest", "React Testing Library"].map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-orange-100 text-orange-700 dark:bg-orange-800 dark:text-orange-200"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2 dark:text-gray-400">DevOps:</p>
                      <div className="flex flex-wrap gap-2">
                        {["AWS", "DigitalOcean", "Linux", "NGINX"].map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-rose-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 dark:text-gray-200">Professional Skills</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 mb-2 dark:text-gray-400">Leadership:</p>
                      <div className="flex flex-wrap gap-2">
                        {["Project Management", "Technical Mentorship", "Code Reviews"].map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-indigo-100 text-indigo-700 dark:bg-indigo-800 dark:text-indigo-200"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2 dark:text-gray-400">Communication:</p>
                      <div className="flex flex-wrap gap-2">
                        {["Client Collaboration", "Technical Documentation"].map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-teal-100 text-teal-700 dark:bg-teal-800 dark:text-teal-200"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2 dark:text-gray-400">Methodologies:</p>
                      <div className="flex flex-wrap gap-2">
                        {["Git", "Agile", "Jira"].map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light text-gray-800 mb-6 dark:text-gray-200">Professional Experience</h2>
            <div className="w-20 h-1 bg-rose-400 mx-auto mb-8 dark:bg-rose-600" />
          </motion.div>

          <div className="space-y-8">
            {/* 1Centre */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-rose-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        Senior Front-End Engineer
                      </h3>
                      <a
                        href="https://1centre.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-rose-600 hover:text-rose-700 transition-colors inline-flex items-center gap-1 dark:text-rose-400 dark:hover:text-rose-300"
                      >
                        1Centre <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600 dark:text-gray-400">Jul 2023 – May 2025</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Remote</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 dark:text-gray-400">
                    Trade-credit consumer onboarding and compliance platform.
                  </p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Developed high-impact features based on user needs, enhancing the customer experience</li>
                    <li>
                      • Diagnosed and resolved a critical performance issue, preventing crashes and improving stability
                    </li>
                    <li>• Refactored parts of the codebase to improve reliability and maintainability</li>
                    <li>
                      • Played a key role in architecting a modern front-end with Svelte, evaluating tools and
                      trade-offs
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Relay */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-rose-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        Senior Front-End Engineer
                      </h3>
                      <a
                        href="https://relay.ai/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-rose-600 hover:text-rose-700 transition-colors inline-flex items-center gap-1 dark:text-rose-400 dark:hover:text-rose-300"
                      >
                        Relay <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600 dark:text-gray-400">Apr 2022 – Apr 2023</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Remote</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 dark:text-gray-400">
                    Platform that automated business cashflows through incentivised early invoice payments.
                  </p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Architected and built the front-end web app from the ground up</li>
                    <li>• Collaborated closely with the founders to make their vision a reality</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Firstbyte Digital Solutions */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-rose-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Co-Founder & CTO</h3>
                      <a
                        href="https://www.firstbytedigital.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-rose-600 hover:text-rose-700 transition-colors inline-flex items-center gap-1 dark:text-rose-400 dark:hover:text-rose-300"
                      >
                        Firstbyte Digital Solutions <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600 dark:text-gray-400">Nov 2017 – Mar 2022</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Thiruvananthapuram, India</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 dark:text-gray-400">
                    Full-stack development studio that served small businesses and startups.
                  </p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Managed a small cross-functional team, overseeing design and development</li>
                    <li>• Oversaw project lifecycle: scoping, development, QA, and deployment</li>
                    <li>• Established code review culture</li>
                    <li>• Mentored other developers and initiated team building activities</li>
                    <li>• Handled React Native workshops for college students and professionals</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Freelance */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-rose-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        Freelance Web Developer
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600 dark:text-gray-400">Jan 2016 – Oct 2017</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Thiruvananthapuram, India</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Led a team of freelance developers to develop web applications</li>
                    <li>• Took ownership of end-to-end project delivery</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section
        id="education"
        className="py-20 px-6 bg-gradient-to-r from-rose-50 to-blue-50 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light text-gray-800 mb-6 dark:text-gray-200">Education</h2>
            <div className="w-20 h-1 bg-rose-400 mx-auto mb-8 dark:bg-rose-600" />
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-rose-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        M.Tech in Information Security
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        College of Engineering, Thiruvananthapuram, India
                      </p>
                    </div>
                    <p className="text-gray-600 mt-2 md:mt-0 dark:text-gray-400">2018</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-rose-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        B.Tech in Computer Science
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">College of Engineering, Chengannur, India</p>
                    </div>
                    <p className="text-gray-600 mt-2 md:mt-0 dark:text-gray-400">2015</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 bg-rose-300 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-300 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light text-gray-800 mb-6 dark:text-gray-200">Let's Work Together</h2>
            <div className="w-20 h-1 bg-rose-400 mx-auto mb-8 dark:bg-rose-600" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-gray-400">
              Ready to bring your ideas to life? I'm always excited about new opportunities and collaborations. Let's
              create something amazing together!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6 dark:text-gray-200">Get in touch</h3>
                <p className="text-gray-600 mb-8 dark:text-gray-400">
                  I'm currently available for new opportunities where I can leverage my frontend expertise and product
                  mindset. Whether you need help building exceptional user experiences, leading frontend architecture
                  decisions, scaling an existing product, or want to discuss how great frontend engineering can drive
                  business growth, I'd love to hear from you.
                </p>
              </div>

              <div className="space-y-6">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="group">
                  <a
                    href="mailto:sidharth@sidh.dev"
                    className="flex items-center space-x-4 p-4 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-rose-100 dark:border-gray-700 hover:border-rose-300 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-rose-400 to-rose-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wide dark:text-gray-400">Email</p>
                      <p className="text-lg font-medium text-gray-800 group-hover:text-rose-600 transition-colors dark:text-gray-200 dark:group-hover:text-rose-400">
                        sidharth@sidh.dev
                      </p>
                    </div>
                  </a>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="group">
                  <a
                    href="tel:+919746163694"
                    className="flex items-center space-x-4 p-4 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-blue-100 dark:border-blue-700 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Phone className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wide dark:text-gray-400">Phone</p>
                      <p className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors dark:text-gray-200 dark:group-hover:text-blue-400">
                        +91-97461 63694
                      </p>
                    </div>
                  </a>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="group">
                  <a
                    href="https://en.wikipedia.org/wiki/Thiruvananthapuram"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-green-100 dark:border-green-700 hover:border-green-300 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 uppercase tracking-wide dark:text-gray-400">Location</p>
                      <p className="text-lg font-medium text-gray-800 group-hover:text-green-600 transition-colors flex items-center gap-2 dark:text-gray-200 dark:group-hover:text-green-400">
                        Thiruvananthapuram, India
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </p>
                    </div>
                  </a>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="group">
                  <a
                    href="https://linkedin.com/in/sidharth/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-purple-100 dark:border-purple-700 hover:border-purple-300 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Linkedin className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 uppercase tracking-wide dark:text-gray-400">LinkedIn</p>
                      <p className="text-lg font-medium text-gray-800 group-hover:text-purple-600 transition-colors flex items-center gap-2 dark:text-gray-200 dark:group-hover:text-purple-400">
                        linkedin.com/in/sidharth/
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </p>
                    </div>
                  </a>
                </motion.div>
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-rose-50 to-blue-50 border border-rose-100 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Available for new projects</p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Currently accepting opportunities for frontend development and product-focused engineering roles.
                  Response time: Usually within 24 hours.
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            {/* <ContactForm /> */}
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-rose-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Send me a message</h3>

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
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all duration-300 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm disabled:opacity-50 text-gray-900 dark:text-gray-100"
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
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all duration-300 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm disabled:opacity-50 text-gray-900 dark:text-gray-100"
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
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all duration-300 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm disabled:opacity-50 text-gray-900 dark:text-gray-100"
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
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all duration-300 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm resize-none disabled:opacity-50 text-gray-900 dark:text-gray-100"
                        placeholder="Tell me about your project or just say hello!"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending...</span>
                        </div>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                      Prefer email? Drop me a line at{" "}
                      <a
                        href="mailto:sidharth@sidh.dev"
                        className="text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 font-medium transition-colors"
                      >
                        sidharth@sidh.dev
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-rose-100 to-blue-100 rounded-full dark:from-gray-900 dark:to-gray-800">
              <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Let's build something extraordinary together
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-50 border-t border-rose-100 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Sidharth Devaraj. Crafted with care and attention to detail.
          </p>
        </div>
      </footer>
    </div>
  )
}
