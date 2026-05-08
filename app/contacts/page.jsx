"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Globe,
  Headphones,
  MessageSquare
} from "lucide-react";

const contactDetails = [
  {
    icon: <Phone className="w-7 h-7" />,
    label: "Call Us",
    value: "+92 300 1234567",
    subtext: "Mon-Sat 9am to 6pm",
  },
  {
    icon: <Mail className="w-7 h-7" />,
    label: "Email Us",
    value: "support@homemaintenance.com",
    subtext: "Online support 24/7", 
  },
  {
    icon: <MapPin className="w-7 h-7" />,
    label: "Visit Us",
    value: "DHA Phase 6, Karachi",
    subtext: "Head Office, Pakistan",
  }
];

export default function Contacts() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <section className="pt-32 sm:pt-40 pb-20 bg-[#cee2d7]">
        <div className="max-w-[1280px] mx-auto px-8 sm:px-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl sm:text-6xl font-bold text-[#000000] mb-6"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#000000]/70 text-lg max-w-2xl mx-auto"
          >
            Have a question or need a professional service? Our team is here to help you 24/7.
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-8 sm:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactDetails.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="bg-white p-10 rounded-3xl shadow-[0_10px_40px_rgba(89,140,118,0.08)] border border-[#cee2d7] flex flex-col items-center text-center hover:shadow-[0_20px_50px_rgba(89,140,118,0.12)] transition-shadow"
              >
                <div className="bg-[#cee2d7] p-5 rounded-2xl mb-6 text-[#598c76]">
                  {item.icon}
                </div>
                <h3 className="text-[#598c76] font-bold uppercase tracking-widest text-xs mb-3">{item.label}</h3>
                <p className="text-xl font-bold text-[#000000] mb-2">{item.value}</p>
                <span className="text-[#000000]/50 text-sm">{item.subtext}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#fafafa]">
        <div className="max-w-[1280px] mx-auto px-8 sm:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-12 rounded-3xl shadow-[0_10px_40px_rgba(89,140,118,0.06)] border border-[#cee2d7]"
          >
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-[#000000] mb-4">Send us a Message</h2>
              <p className="text-[#000000]/60">Fill out the form below and we'll get back to you within 60 minutes.</p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#000000] ml-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-6 py-4 rounded-xl bg-[#fafafa] border-2 border-transparent focus:border-[#598c76] transition-colors outline-none text-[#000000]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#000000] ml-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-6 py-4 rounded-xl bg-[#fafafa] border-2 border-transparent focus:border-[#598c76] transition-colors outline-none text-[#000000]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#000000] ml-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+92 300 0000000"
                  className="w-full px-6 py-4 rounded-xl bg-[#fafafa] border-2 border-transparent focus:border-[#598c76] transition-colors outline-none text-[#000000]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#000000] ml-1">Subject</label>
                <select className="w-full px-6 py-4 rounded-xl bg-[#fafafa] border-2 border-transparent focus:border-[#598c76] transition-colors outline-none text-[#000000] appearance-none">
                  <option>General Inquiry</option>
                  <option>Service Booking</option>
                  <option>Technical Support</option>
                  <option>Feedback</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#000000] ml-1">Message</label>
                <textarea
                  rows="4"
                  placeholder="How can we help you today?"
                  className="w-full px-6 py-4 rounded-xl bg-[#fafafa] border-2 border-transparent focus:border-[#598c76] transition-colors outline-none text-[#000000] resize-none"
                ></textarea>
              </div>

              <button className="w-full bg-[#598c76] text-white py-5 rounded-xl font-bold text-lg hover:bg-[#4a7663] transition-colors flex items-center justify-center gap-3 group">
                Send Message
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>

          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(89,140,118,0.1)] h-[350px] border-4 border-[#cee2d7]"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115846.1969472607!2d67.01815140321277!3d24.85721869879707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e0660293eb7%3A0xad6a506195e7d589!2sDHA%20Karachi!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex gap-5"
              >
                <div className="bg-[#cee2d7] p-4 rounded-xl h-fit">
                  <Headphones className="w-6 h-6 text-[#598c76]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#000000] mb-1">Customer Support</h4>
                  <p className="text-[#000000]/60 text-sm">Dedicated team to help you with your needs.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex gap-5"
              >
                <div className="bg-[#cee2d7] p-4 rounded-xl h-fit">
                  <Globe className="w-6 h-6 text-[#598c76]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#000000] mb-1">Service Areas</h4>
                  <p className="text-[#000000]/60 text-sm">Providing services in Karachi, Lahore, & Islamabad.</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#598c76] p-8 rounded-2xl text-white"
            >
              <div className="flex items-start gap-5">
                <div className="bg-white/20 p-3 rounded-xl">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold mb-2">Quick Response Guarantee</h4>
                  <p className="text-white/80 text-sm">We respond to all inquiries within 60 minutes during business hours. For urgent matters, call us directly.</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>
    </main>
  );
}
