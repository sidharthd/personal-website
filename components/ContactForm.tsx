"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"

export const ContactForm = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    // Simulate a form submission (replace with your actual submission logic)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (name && email && message) {
      setStatus("success")
      setName("")
      setEmail("")
      setMessage("")
    } else {
      setStatus("error")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      viewport={{ once: true }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-rose-100"
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send us a message</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Your Email
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
              placeholder="john.doe@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="mt-1"
              placeholder="Write your message here..."
              required
            />
          </div>
        </div>
        <Button
          type="submit"
          className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full transition-all duration-300"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </Button>

        {status === "success" && <div className="mt-4 text-green-600">Thank you! Your message has been sent.</div>}
        {status === "error" && (
          <div className="mt-4 text-red-600">Oops! There was an error submitting your message.</div>
        )}
      </form>
    </motion.div>
  )
}
