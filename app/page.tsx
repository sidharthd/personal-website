"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Mail, Phone, MapPin, ExternalLink, Linkedin, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ContactForm } from "@/components/ContactForm" // Import ContactForm component

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-semibold text-rose-600"
            >
              Sidharth Devaraj
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {["About", "Skills", "Experience", "Education", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors hover:text-rose-600 ${
                    activeSection === item.toLowerCase() ? "text-rose-600" : "text-gray-600"
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
            <h1 className="text-5xl md:text-7xl font-light text-gray-800 mb-6">
              Sidharth <span className="text-rose-500">Devaraj</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light">
              Senior Software Engineer – Frontend Specialist
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
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
                className="border-rose-300 text-rose-600 hover:bg-rose-50 px-8 py-3 rounded-full transition-all duration-300"
              >
                View My Experience
              </Button>
            </div>
          </motion.div>

          {/* Job Seeking Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8"
          >
            <div className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-full shadow-sm">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <p className="text-sm font-medium text-green-800">
                Currently exploring new opportunities to collaborate with innovative teams
              </p>
            </div>
          </motion.div>

          <motion.button
            onClick={() => scrollToSection("about")}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer hover:text-rose-500 transition-colors"
            aria-label="Scroll to next section"
          >
            <ChevronDown className="w-6 h-6 text-rose-400" />
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
            <h2 className="text-4xl font-light text-gray-800 mb-6">About Me</h2>
            <div className="w-20 h-1 bg-rose-400 mx-auto mb-8" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-rose-100"
          >
            <p className="text-lg text-gray-700 leading-relaxed text-center">
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
      <section id="skills" className="py-20 px-6 bg-gradient-to-r from-blue-50 to-rose-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light text-gray-800 mb-6">Skills & Expertise</h2>
            <div className="w-20 h-1 bg-rose-400 mx-auto mb-8" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white/60 backdrop-blur-sm border-rose-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Core Technologies</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Programming Languages:</p>
                      <div className="flex flex-wrap gap-2">
                        {["JavaScript (ES6+)", "TypeScript", "Python"].map((skill) => (
                          <Badge key={skill} variant="secondary" className="bg-rose-100 text-rose-700">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Front-End:</p>
                      <div className="flex flex-wrap gap-2">
                        {["React", "HTML", "CSS", "React Native"].map((skill) => (
                          <Badge key={skill} variant="secondary" className="bg-blue-100 text-blue-700">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Back-End:</p>
                      <div className="flex flex-wrap gap-2">
                        {["Node.js", "Express.js", "REST API", "PostgreSQL"].map((skill) => (
                          <Badge key={skill} variant="secondary" className="bg-green-100 text-green-700">
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
              <Card className="h-full bg-white/60 backdrop-blur-sm border-rose-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Development Tools</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Design Systems:</p>
                      <div className="flex flex-wrap gap-2">
                        {["Material UI", "Ant Design", "Chakra UI"].map((skill) => (
                          <Badge key={skill} variant="secondary" className="bg-purple-100 text-purple-700">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Testing:</p>
                      <div className="flex flex-wrap gap-2">
                        {["Jest", "Vitest", "React Testing Library"].map((skill) => (
                          <Badge key={skill} variant="secondary" className="bg-orange-100 text-orange-700">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">DevOps:</p>
                      <div className="flex flex-wrap gap-2">
                        {["AWS", "DigitalOcean", "Linux", "NGINX"].map((skill) => (
                          <Badge key={skill} variant="secondary" className="bg-gray-100 text-gray-700">
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
              <Card className="h-full bg-white/60 backdrop-blur-sm border-rose-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Professional Skills</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Leadership:</p>
                      <div className="flex flex-wrap gap-2">
                        {["Project Management", "Technical Mentorship", "Code Reviews"].map((skill) => (
                          <Badge key={skill} variant="secondary" className="bg-indigo-100 text-indigo-700">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Communication:</p>
                      <div className="flex flex-wrap gap-2">
                        {["Client Collaboration", "Technical Documentation"].map((skill) => (
                          <Badge key={skill} variant="secondary" className="bg-teal-100 text-teal-700">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Methodologies:</p>
                      <div className="flex flex-wrap gap-2">
                        {["Git", "Agile", "Jira"].map((skill) => (
                          <Badge key={skill} variant="secondary" className="bg-yellow-100 text-yellow-700">
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
            <h2 className="text-4xl font-light text-gray-800 mb-6">Professional Experience</h2>
            <div className="w-20 h-1 bg-rose-400 mx-auto mb-8" />
          </motion.div>

          <div className="space-y-8">
            {/* 1Centre */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/60 backdrop-blur-sm border-rose-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">Senior Front-End Engineer</h3>
                      <a
                        href="https://1centre.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-rose-600 hover:text-rose-700 transition-colors inline-flex items-center gap-1"
                      >
                        1Centre <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600">Jul 2023 – May 2025</p>
                      <p className="text-sm text-gray-500">Remote</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">Trade-credit consumer onboarding and compliance platform.</p>
                  <ul className="space-y-2 text-gray-700">
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
              <Card className="bg-white/60 backdrop-blur-sm border-rose-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">Senior Front-End Engineer</h3>
                      <a
                        href="https://relay.ai/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-rose-600 hover:text-rose-700 transition-colors inline-flex items-center gap-1"
                      >
                        Relay <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600">Apr 2022 – Apr 2023</p>
                      <p className="text-sm text-gray-500">Remote</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Platform that automated business cashflows through incentivised early invoice payments.
                  </p>
                  <ul className="space-y-2 text-gray-700">
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
              <Card className="bg-white/60 backdrop-blur-sm border-rose-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">Co-Founder & CTO</h3>
                      <a
                        href="https://www.firstbytedigital.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-rose-600 hover:text-rose-700 transition-colors inline-flex items-center gap-1"
                      >
                        Firstbyte Digital Solutions <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600">Nov 2017 – Mar 2022</p>
                      <p className="text-sm text-gray-500">Thiruvananthapuram, India</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Full-stack development studio that served small businesses and startups.
                  </p>
                  <ul className="space-y-2 text-gray-700">
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
              <Card className="bg-white/60 backdrop-blur-sm border-rose-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">Freelance Web Developer</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600">Jan 2016 – Oct 2017</p>
                      <p className="text-sm text-gray-500">Thiruvananthapuram, India</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-gray-700">
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
      <section id="education" className="py-20 px-6 bg-gradient-to-r from-rose-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light text-gray-800 mb-6">Education</h2>
            <div className="w-20 h-1 bg-rose-400 mx-auto mb-8" />
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/60 backdrop-blur-sm border-rose-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">M.Tech in Information Security</h3>
                      <p className="text-gray-600">College of Engineering, Thiruvananthapuram, India</p>
                    </div>
                    <p className="text-gray-600 mt-2 md:mt-0">2018</p>
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
              <Card className="bg-white/60 backdrop-blur-sm border-rose-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">B.Tech in Computer Science</h3>
                      <p className="text-gray-600">College of Engineering, Chengannur, India</p>
                    </div>
                    <p className="text-gray-600 mt-2 md:mt-0">2015</p>
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
            <h2 className="text-4xl font-light text-gray-800 mb-6">Let's Work Together</h2>
            <div className="w-20 h-1 bg-rose-400 mx-auto mb-8" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Get in touch</h3>
                <p className="text-gray-600 mb-8">
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
                    className="flex items-center space-x-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-rose-100 hover:border-rose-300 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-rose-400 to-rose-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wide">Email</p>
                      <p className="text-lg font-medium text-gray-800 group-hover:text-rose-600 transition-colors">
                        sidharth@sidh.dev
                      </p>
                    </div>
                  </a>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="group">
                  <a
                    href="tel:+919746163694"
                    className="flex items-center space-x-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Phone className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wide">Phone</p>
                      <p className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
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
                    className="flex items-center space-x-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-green-100 hover:border-green-300 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 uppercase tracking-wide">Location</p>
                      <p className="text-lg font-medium text-gray-800 group-hover:text-green-600 transition-colors flex items-center gap-2">
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
                    className="flex items-center space-x-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-purple-100 hover:border-purple-300 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Linkedin className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 uppercase tracking-wide">LinkedIn</p>
                      <p className="text-lg font-medium text-gray-800 group-hover:text-purple-600 transition-colors flex items-center gap-2">
                        linkedin.com/in/sidharth/
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </p>
                    </div>
                  </a>
                </motion.div>
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-rose-50 to-blue-50 border border-rose-100">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <p className="text-sm font-medium text-gray-700">Available for new projects</p>
                </div>
                <p className="text-sm text-gray-500">
                  Currently accepting opportunities for frontend development and product-focused engineering roles.
                  Response time: Usually within 24 hours.
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <ContactForm />
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-rose-100 to-blue-100 rounded-full">
              <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse" />
              <p className="text-sm font-medium text-gray-700">Let's build something extraordinary together</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-50 border-t border-rose-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} Sidharth Devaraj. Crafted with care and attention to detail.
          </p>
        </div>
      </footer>
    </div>
  )
}
