"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";

import {
  CheckCircle,
  XCircle,
  Mail,
  MapPin,
  Phone,
  Github,
  Twitter,
  Linkedin,
  MessageCircle,
  X,
  Send,
  Clock,
} from "lucide-react";

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

const contactDetails = [
  {
    icon: MapPin,
    label: "123 HealthTech Ave, Accra, Ghana",
    href: "#",
    description: "Visit our headquarters",
  },
  {
    icon: Mail,
    label: "thomaskangah18@gmail.com",
    href: "mailto:thomaskangah18@gmail.com",
    description: "Send us an email",
  },
  {
    icon: Phone,
    label: "+233 123 456 789",
    href: "tel:+233123456789",
    description: "Call us directly",
  },
  {
    icon: Clock,
    label: "Mon - Fri, 9:00 AM - 6:00 PM",
    href: "#",
    description: "Business hours",
  },
];

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/YourOrg" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/YourOrg" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/YourOrg" },
];

function ContactInfoItem({
  icon: Icon,
  label,
  description,
  href,
}: {
  icon: React.ElementType;
  label: string;
  description: string;
  href: string;
}) {
  const content = (
    <div className="flex items-start group">
      <div className="p-3 bg-[#10BCE3]/10 rounded-lg mr-4 group-hover:bg-[#10BCE3]/20 transition-colors">
        <Icon className="h-6 w-6 text-[#10BCE3]" aria-hidden="true" />
      </div>
      <div>
        <p className="text-white font-medium mb-1">{label}</p>
        <p className="text-slate-400 text-sm">{description}</p>
      </div>
    </div>
  );

  if (href === "#") {
    return (
      <li className="p-4 rounded-xl bg-[#1e293b]/50 backdrop-blur-sm border border-slate-700/30 hover:border-[#10BCE3]/30 transition-all">
        {content}
      </li>
    );
  }

  return (
    <li>
      <a 
        href={href} 
        className="block p-4 rounded-xl bg-[#1e293b]/50 backdrop-blur-sm border border-slate-700/30 hover:border-[#10BCE3]/50 hover:bg-[#1e293b]/70 transition-all"
      >
        {content}
      </a>
    </li>
  );
}

function SocialLink({
  icon: Icon,
  label,
  href,
}: {
  icon: React.ElementType;
  label: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="p-3 rounded-full text-[#10BCE3] bg-[#10BCE3]/10 hover:bg-[#10BCE3]/20 hover:scale-110 transition-all"
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatStatus, setChatStatus] = useState<SubmissionStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      if (Math.random() > 0.1) {
        setStatus("success");
      } else {
        throw new Error("Server error!");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const handleChatSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setChatStatus("submitting");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setChatStatus("success");
      setChatMessage("");
      setTimeout(() => setIsChatOpen(false), 3000);
    } catch (error) {
      console.error(error);
      setChatStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/medic-team.jpg"
            alt="Medical team background"
            fill
            quality={100}
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-[#0D1117]" />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 z-1">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#10BCE3]/10 rounded-full blur-[100px]"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 4 }}
          />
          <motion.div 
            className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px]"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ repeat: Infinity, duration: 6, delay: 1 }}
          />
        </div>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 text-center px-6 md:px-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-[#10BCE3] bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Ready to revolutionize healthcare with AI? Let&apos;s start a conversation about the future of medical diagnostics.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#10BCE3] to-blue-600 hover:from-[#0EA5E9] hover:to-blue-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Send className="mr-2 h-5 w-5" />
              Start Conversation
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#10BCE3]"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">SCROLL TO CONTACT</span>
            <div className="w-px h-8 bg-gradient-to-b from-[#10BCE3] to-transparent"></div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact-form" className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Let&apos;s Build the Future Together
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Whether you&apos;re a healthcare provider, researcher, or innovator, we&apos;re here to help you harness the power of AI.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6 text-[#10BCE3]">Contact Information</h3>
                <ul className="space-y-4">
                  {contactDetails.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <ContactInfoItem {...item} />
                    </motion.div>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-4 text-white">Follow Us</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((link, index) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <SocialLink {...link} />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <motion.div 
                className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700/30"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.718338320922!2d-0.1984286856980598!3d5.608070995932025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9b7b3d3b7f1b%3A0x4c2d4e6a0a9c8e8d!2sAccra%2C%20Ghana!5e0!3m2!1sen!2sus!4v1688588888888!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  className="border-0 filter grayscale hover:grayscale-0 transition-all duration-500"
                  allowFullScreen
                  loading="lazy"
                  title="HealthTech Africa Office Location"
                />
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-[#1e293b]/30 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-8 shadow-2xl"
            >
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    className="text-center space-y-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-10 w-10 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Message Sent Successfully!</h3>
                    <p className="text-slate-400">
                      Thank you for reaching out. Our team will get back to you within 24 hours.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setStatus("idle")}
                      className="border-[#10BCE3] text-[#10BCE3] hover:bg-[#10BCE3] hover:text-white"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : status === "error" ? (
                  <motion.div
                    key="error"
                    className="text-center space-y-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-20 h-20 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
                      <XCircle className="h-10 w-10 text-red-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      Something Went Wrong
                    </h3>
                    <p className="text-slate-400">Please try submitting the form again or contact us directly.</p>
                    <Button 
                      variant="outline" 
                      onClick={() => setStatus("idle")}
                      className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                    >
                      Try Again
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-slate-300">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="bg-[#1e293b]/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-[#10BCE3] focus:ring-[#10BCE3]/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-slate-300">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-[#1e293b]/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-[#10BCE3] focus:ring-[#10BCE3]/20"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-slate-300">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="What's this about?"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="bg-[#1e293b]/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-[#10BCE3] focus:ring-[#10BCE3]/20"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-slate-300">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your project, questions, or how we can help..."
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="bg-[#1e293b]/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-[#10BCE3] focus:ring-[#10BCE3]/20"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={status === "submitting"}
                      className="w-full bg-gradient-to-r from-[#10BCE3] to-blue-600 hover:from-[#0EA5E9] hover:to-blue-700 text-white py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                    >
                      {status === "submitting" ? (
                        <>
                          <motion.div 
                            className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full mr-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Floating Chat Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setIsChatOpen((prev) => !prev);
            setChatStatus("idle");
            setChatMessage("");
          }}
          className="bg-gradient-to-r from-[#10BCE3] to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </motion.button>

        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              className="fixed bottom-24 right-8 w-80"
            >
              <div className="bg-[#1e293b]/95 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl">
                <div className="p-4 border-b border-slate-700/50">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white">Quick Chat</h3>
                    <button
                      onClick={() => setIsChatOpen(false)}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">Get instant support</p>
                </div>

                <div className="p-4">
                  {chatStatus === "success" ? (
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-green-400" />
                      </div>
                      <p className="text-slate-300">
                        Thanks! We&apos;ll get back to you soon.
                      </p>
                    </div>
                  ) : (
                    <>
                      {chatStatus === "error" && (
                        <p className="text-red-400 text-sm mb-3 p-2 bg-red-500/10 rounded-lg border border-red-500/20">
                          Something went wrong. Please try again.
                        </p>
                      )}
                      <form onSubmit={handleChatSubmit} className="space-y-4">
                        <Textarea
                          placeholder="Type your message here..."
                          rows={4}
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          required
                          className="bg-[#0D1117] border-slate-600 text-white placeholder:text-slate-400 focus:border-[#10BCE3] focus:ring-[#10BCE3]/20"
                        />
                        <Button
                          type="submit"
                          disabled={chatStatus === "submitting"}
                          className="w-full bg-gradient-to-r from-[#10BCE3] to-blue-600 hover:from-[#0EA5E9] hover:to-blue-700 text-white"
                        >
                          {chatStatus === "submitting" ? "Sending..." : "Send"}
                        </Button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}
