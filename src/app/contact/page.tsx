"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

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
} from "lucide-react";

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

const contactDetails = [
  {
    icon: MapPin,
    label: "123 HealthTech Ave, Accra, Ghana",
    href: "#",
  },
  {
    icon: Mail,
    label: "thomaskangah18@gmail.com",
    href: "mailto:thomaskangah18@gmail.com",
  },
  {
    icon: Phone,
    label: "+233 123 456 789",
    href: "tel:+233123456789",
  },
];

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/YourOrg" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/YourOrg" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/YourOrg" },
];

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function ContactInfoItem({
  icon: Icon,
  label,
  href,
}: {
  icon: React.ElementType;
  label: string;
  href: string;
}) {
  const content = (
    <>
      <Icon className="h-5 w-5 text-cyan-500 mr-3 flex-shrink-0" aria-hidden="true" />
      <span className="text-slate-800">{label}</span>
    </>
  );

  if (href === "#") {
    return <li className="flex items-center">{content}</li>;
  }

  return (
    <li>
      <a href={href} className="flex items-center group transition-colors hover:text-cyan-500">
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
      className="p-2 rounded-full text-slate-600 bg-gray-100 transition-all hover:bg-cyan-50 hover:text-cyan-500 hover:scale-110"
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}

export default function ContactPage() {
  // Main contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmissionStatus>("idle");

  // Chat widget state
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

    // TODO: Replace with a real API call
    console.log("Submitting:", formData);
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1200));
      // Simulate a random outcome
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

    // TODO: Replace with a real chat API call
    console.log("Chat message:", chatMessage);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setChatStatus("success");
      setChatMessage("");
      // Auto-close after 3 seconds
      setTimeout(() => setIsChatOpen(false), 3000);
    } catch (error) {
      console.error(error);
      setChatStatus("error");
    }
  };

  const FormContent = (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          className="text-center space-y-4"
          variants={itemVariants}
        >
          <CheckCircle className="h-12 w-12 mx-auto text-emerald-500" />
          <h3 className="text-xl font-semibold text-slate-800">Message Sent!</h3>
          <p className="text-slate-700">
            Thank you for reaching out. We'll be in touch soon.
          </p>
          <Button variant="outline" onClick={() => setStatus("idle")}>
            Send Another
          </Button>
        </motion.div>
      ) : status === "error" ? (
        <motion.div
          key="error"
          className="text-center space-y-4"
          variants={itemVariants}
        >
          <XCircle className="h-12 w-12 mx-auto text-red-500" />
          <h3 className="text-xl font-semibold text-slate-800">
            Oops, Something Went Wrong
          </h3>
          <p className="text-slate-700">Please try submitting the form again.</p>
          <Button variant="outline" onClick={() => setStatus("idle")}>
            Try Again
          </Button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          className="space-y-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Label htmlFor="name" className="text-slate-700">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-white text-slate-800"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Label htmlFor="email" className="text-slate-700">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-white text-slate-800"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Label htmlFor="subject" className="text-slate-700">
              Subject
            </Label>
            <Input
              id="subject"
              name="subject"
              type="text"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="bg-white text-slate-800"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Label htmlFor="message" className="text-slate-700">
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Write your message..."
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="bg-white text-slate-800"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <Button type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending..." : "Send Message"}
            </Button>
          </motion.div>
        </motion.form>
      )}
    </AnimatePresence>
  );

  return (
    <section
      className="bg-gray-50 text-slate-900 font-sans py-16"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d1d5db' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold tracking-tight mb-3"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed"
          >
            Have a question or project idea? Our team is ready to help. Fill out the
            form or chat with us live.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Column: Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <Card className="shadow-lg border border-gray-200 bg-white">
              <CardHeader>
                <CardTitle className="text-slate-800">Contact Information</CardTitle>
                <CardDescription className="text-slate-600">
                  Feel free to reach out via any of the channels below.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {contactDetails.map((item) => (
                    <ContactInfoItem key={item.label} {...item} />
                  ))}
                </ul>
                <Separator className="my-6" />
                <div className="flex space-x-4">
                  {socialLinks.map((link) => (
                    <SocialLink key={link.label} {...link} />
                  ))}
                </div>
              </CardContent>
            </Card>

            <motion.div variants={itemVariants} className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.718338320922!2d-0.1984286856980598!3d5.608070995932025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9b7b3d3b7f1b%3A0x4c2d4e6a0a9c8e8d!2sAccra%2C%20Ghana!5e0!3m2!1sen!2sus!4v1688588888888!5m2!1sen!2sus"
                width="100%"
                height="250"
                className="border-0"
                allowFullScreen
                loading="lazy"
                title="HealthTech Africa Office Location"
              />
            </motion.div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            variants={itemVariants}
            className="bg-white border border-gray-200 rounded-lg p-8 shadow-lg"
          >
            {FormContent}
          </motion.div>
        </div>
      </div>

      {/* Floating Chat Button & Modal */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsChatOpen((prev) => !prev);
            setChatStatus("idle");
            setChatMessage("");
          }}
          className="bg-cyan-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </motion.button>

        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              className="fixed bottom-24 right-8 w-80"
            >
              <Card className="bg-white shadow-lg border border-gray-200">
                <CardHeader className="p-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Live Chat</CardTitle>
                    <button
                      onClick={() => setIsChatOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </CardHeader>

                <CardContent className="p-4">
                  {chatStatus === "success" ? (
                    <div className="text-center space-y-4">
                      <CheckCircle className="h-12 w-12 mx-auto text-emerald-500" />
                      <p className="text-slate-600">
                        Thank you! We'll get back to you soon.
                      </p>
                    </div>
                  ) : (
                    <>
                      {chatStatus === "error" && (
                        <p className="text-red-500 text-sm mb-2">
                          Something went wrong. Please try again.
                        </p>
                      )}
                      <form onSubmit={handleChatSubmit} className="space-y-3">
                        <Textarea
                          placeholder="Type your message here..."
                          rows={3}
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          required
                        />
                        <Button
                          type="submit"
                          disabled={chatStatus === "submitting"}
                          className="w-full"
                        >
                          {chatStatus === "submitting" ? "Sending..." : "Send"}
                        </Button>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
