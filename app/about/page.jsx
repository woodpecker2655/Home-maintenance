"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Target, 
  Award, 
  ShieldCheck, 
  Clock, 
  Heart, 
  ThumbsUp,
  Briefcase
} from "lucide-react";
import Image from "next/image";

const stats = [
  { label: "Happy Clients", value: "50k+", icon: <Users className="w-6 h-6" /> },
  { label: "Completed Projects", value: "120k+", icon: <Briefcase className="w-6 h-6" /> },
  { label: "Expert Workers", value: "500+", icon: <Award className="w-6 h-6" /> },
  { label: "Years Experience", value: "15+", icon: <Clock className="w-6 h-6" /> },
];

const values = [
  {
    title: "Quality First",
    desc: "We never compromise on the quality of materials and workmanship in every service we provide.",
    icon: <ShieldCheck className="w-8 h-8" />
  },
  {
    title: "Customer Centric",
    desc: "Your satisfaction is our top priority. We listen, adapt, and deliver exactly what you need.",
    icon: <Heart className="w-8 h-8" />
  },
  {
    title: "Reliability",
    desc: "Count on us to be there on time, every time. Our professionals are vetted and highly dependable.",
    icon: <ThumbsUp className="w-8 h-8" />
  }
];

export default function About() {
  return (
    <main className="min-h-screen bg-white font-sans overflow-hidden">
      {/* 1. Hero Section */}
      <section className="pt-32 sm:pt-48 pb-24 bg-[#cee2d7] relative">
        <div className="max-w-[1280px] mx-auto px-8 sm:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl sm:text-7xl font-extrabold text-[#000000] leading-tight mb-8">
                Redefining <span className="text-[#598c76]">Home</span> Maintenance
              </h1>
              <p className="text-[#000000]/70 text-xl leading-relaxed mb-10 max-w-xl">
                We are more than just a service provider. We are your partners in creating a safer, 
                cleaner, and more comfortable home environment with our VIP maintenance solutions.
              </p>
              <div className="flex gap-4">
                <button className="bg-[#598c76] text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all hover:-translate-y-1">
                  Our Services
                </button>
                <button className="bg-white text-[#598c76] border border-[#598c76] px-8 py-4 rounded-2xl font-bold hover:bg-[#f8faf9] transition-all">
                  Contact Us
                </button>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <div className="w-full h-[500px] bg-[#598c76] rounded-[3rem] relative overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-8 rounded-3xl border border-white/20">
                  <p className="text-[#598c76] font-bold text-2xl italic">"Bringing excellence to every corner of your home."</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Decor */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#598c76]/5 -skew-x-12 transform translate-x-1/2" />
      </section>

      {/* 2. Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-8 sm:px-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-[#f8faf9] border border-[#cee2d7] text-center group hover:bg-[#598c76] transition-colors duration-300"
              >
                <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#598c76] shadow-sm">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-extrabold text-[#000000] mb-2 group-hover:text-white">{stat.value}</h3>
                <p className="text-[#000000]/50 font-medium group-hover:text-white/70">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-[1280px] mx-auto px-8 sm:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-[#cee2d7] text-[#598c76] px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase mb-6">
                <Target className="w-4 h-4" /> Our Purpose
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#000000] mb-8 leading-tight">
                Our Mission is to Provide Seamless Maintenance Solutions
              </h2>
              <p className="text-[#000000]/60 text-lg leading-relaxed mb-8">
                We started with a simple idea: making home maintenance as easy as booking a ride. 
                Today, we are the leading platform connecting homeowners with elite professionals 
                who care about the details.
              </p>
              <ul className="space-y-4">
                {['Unmatched Professionalism', 'Transparent Pricing', 'Verified Experts', '24/7 Support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#000000] font-semibold">
                    <div className="w-6 h-6 bg-[#598c76] rounded-full flex items-center justify-center text-white text-xs">✓</div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="space-y-6">
                <div className="h-64 bg-[#cee2d7] rounded-3xl" />
                <div className="h-80 bg-[#598c76] rounded-3xl" />
              </div>
              <div className="space-y-6 pt-12">
                <div className="h-80 bg-[#598c76] rounded-3xl" />
                <div className="h-64 bg-[#cee2d7] rounded-3xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Core Values */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-8 sm:px-20 text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#000000] mb-6">Our Core Values</h2>
          <p className="text-[#000000]/50 text-lg max-w-2xl mx-auto">
            The principles that guide everything we do, from the first call to the final inspection.
          </p>
        </div>
        <div className="max-w-[1280px] mx-auto px-8 sm:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {values.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-12 rounded-[2.5rem] bg-white border border-[#f0f0f0] hover:border-[#598c76] transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(89,140,118,0.1)] group"
              >
                <div className="text-[#598c76] mb-8 group-hover:scale-110 transition-transform duration-300">
                  {val.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#000000] mb-4">{val.title}</h3>
                <p className="text-[#000000]/60 leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="py-24 px-8 sm:px-20">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-[1280px] mx-auto bg-[#598c76] rounded-[3rem] p-12 sm:p-24 text-center text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-6xl font-bold mb-8">Ready to Experience <br/> the VIP Treatment?</h2>
            <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto font-medium">
              Join thousands of homeowners who trust us for their daily maintenance needs. 
              Let's make your home better together.
            </p>
            <button className="bg-white text-[#598c76] px-12 py-5 rounded-2xl font-extrabold text-lg hover:shadow-2xl hover:scale-105 transition-all">
              Book Your Service Now
            </button>
          </div>
          {/* Decor */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </motion.div>
      </section>
    </main>
  );
}
