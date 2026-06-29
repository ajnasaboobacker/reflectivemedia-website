"use client";

import { useState, useEffect } from "react";
import { Send, MapPin, Mail, Phone, Globe } from "lucide-react";

export default function ContactSection() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [activeCategory, setActiveCategory] = useState<string>("Media Production");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormState({ name: "", email: "", message: "" });
      }, 3000);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen pt-24 pb-12 px-6 md:px-12 flex flex-col justify-center items-center bg-transparent z-20"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-16 md:gap-24 justify-between min-h-[80vh]">
        {/* Core Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column - Copy and Info */}
          <div className="lg:col-span-5 flex flex-col gap-8 justify-between">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.4em] text-agency-red font-semibold">
                <span className="w-1.5 h-1.5 bg-agency-red rounded-full animate-pulse" />
                <span>{"// Connect"}</span>
              </div>
              <h2 className="font-heading font-black text-4xl md:text-6xl tracking-tight text-white leading-[1.25]">
                Let&apos;s Reflect.
              </h2>
              <p className="text-agency-textGrey text-xs md:text-sm leading-relaxed max-w-sm mt-2">
                Have a campaign to execute, branding to design, or a cinematic project to capture? Connect with us and let&apos;s build something amazing.
              </p>
            </div>

            {/* Studio Coordinates */}
            <div className="flex flex-col gap-6 font-mono text-xs text-agency-textGrey mt-8 lg:mt-0">
              {/* Email */}
              <div className="flex items-center gap-4 group">
                <div className="w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white group-hover:text-agency-redGlow group-hover:border-agency-red/30 transition-colors duration-300">
                  <Mail size={14} />
                </div>
                <a href="mailto:info@reflectivemediaproductions.com" className="hover:text-white transition-colors text-xs" data-cursor="pointer">
                  info@reflectivemediaproductions.com
                </a>
              </div>

              {/* Phones */}
              <div className="flex items-start gap-4 group">
                <div className="w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white group-hover:text-agency-redGlow group-hover:border-agency-red/30 transition-colors duration-300 mt-0.5">
                  <Phone size={14} />
                </div>
                <div className="flex flex-col gap-1">
                  <a href="tel:+971567648993" className="hover:text-white transition-colors" data-cursor="pointer">
                    +971 56 764 8993
                  </a>
                  <a href="tel:+97126418616" className="hover:text-white transition-colors" data-cursor="pointer">
                    +971 2 641 8616 (AD)
                  </a>
                </div>
              </div>

              {/* Website link */}
              <div className="flex items-center gap-4 group">
                <div className="w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white group-hover:text-agency-redGlow group-hover:border-agency-red/30 transition-colors duration-300">
                  <Globe size={14} />
                </div>
                <a href="https://www.reflectivemediaproductions.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" data-cursor="pointer">
                  www.reflectivemediaproductions.com
                </a>
              </div>

              {/* Locations */}
              <div className="flex items-start gap-4 group">
                <div className="w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white group-hover:text-agency-redGlow group-hover:border-agency-red/30 transition-colors duration-300 mt-0.5">
                  <MapPin size={14} />
                </div>
                <div className="flex flex-col gap-1 leading-relaxed">
                  <span className="text-white font-medium">Headquarters: Abu Dhabi, UAE</span>
                  <span className="text-agency-textGrey/60">Presence: Abu Dhabi • Dubai • India • Kuwait</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Glassmorphic Form */}
          <div className="lg:col-span-7">
            <div className="glassmorphism p-8 md:p-12 rounded-3xl border border-white/5 shadow-glass relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-glow-gradient opacity-10 pointer-events-none" />

              {isMounted ? (
                submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-agency-red/10 border border-agency-red/30 flex items-center justify-center text-agency-redGlow animate-bounce">
                      <Send size={24} />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-white">Transmission Sent!</h3>
                    <p className="text-xs text-agency-textGrey font-mono tracking-widest uppercase">
                      We will respond within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Category Filter Capsules */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-mono tracking-widest uppercase text-agency-textGrey/70">
                        {"// Select Service"}
                      </label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {[
                          "Media Production",
                          "Branding & Design",
                          "Digital Marketing",
                          "Podcasting",
                          "Web & App Dev",
                          "Film Production",
                        ].map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setActiveCategory(cat)}
                            className={`px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-widest border transition-all duration-300 uppercase ${
                              activeCategory === cat
                                ? "bg-agency-red border-agency-red text-white shadow-red-glow"
                                : "bg-white/5 border-white/5 text-white/60 hover:border-white/20"
                            }`}
                            data-cursor="pointer"
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name Input */}
                    <div className="flex flex-col gap-2 mt-2">
                      <label className="text-[10px] font-mono tracking-widest uppercase text-agency-textGrey/70">
                        {"// Your Name"}
                      </label>
                      <input
                        type="text"
                        required
                        suppressHydrationWarning
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Director of Marketing"
                        className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-agency-red/40 focus:ring-1 focus:ring-agency-red/20 focus:bg-white/[0.07] transition-all duration-300 font-sans"
                        data-cursor="pointer"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-mono tracking-widest uppercase text-agency-textGrey/70">
                        {"// Your Email"}
                      </label>
                      <input
                        type="email"
                        required
                        suppressHydrationWarning
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="e.g. director@company.com"
                        className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-agency-red/40 focus:ring-1 focus:ring-agency-red/20 focus:bg-white/[0.07] transition-all duration-300 font-sans"
                        data-cursor="pointer"
                      />
                    </div>

                    {/* Message Input */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-mono tracking-widest uppercase text-agency-textGrey/70">
                        {"// Tell Us About Your Project"}
                      </label>
                      <textarea
                        required
                        suppressHydrationWarning
                        rows={4}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="e.g. We want to shoot a corporate film..."
                        className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-agency-red/40 focus:ring-1 focus:ring-agency-red/20 focus:bg-white/[0.07] transition-all duration-300 font-sans resize-none"
                        data-cursor="pointer"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full mt-4 bg-agency-red hover:bg-agency-redGlow text-white font-mono tracking-widest text-xs uppercase py-4 rounded-2xl hover:shadow-red-glow border border-agency-red/10 transition-all duration-300 flex items-center justify-center gap-2"
                      data-cursor="pointer"
                    >
                      <span>Send Inquiry</span>
                      <Send size={12} />
                    </button>
                  </form>
                )
              ) : (
                <div className="form-skeleton flex flex-col gap-6 animate-pulse" aria-hidden="true" style={{ minHeight: '522px' }}>
                  {/* Category Filter Capsules Placeholder */}
                  <div className="flex flex-col gap-2">
                    <div className="text-[10px] font-mono tracking-widest uppercase text-agency-textGrey/70">
                      {"// Select Service"}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {[
                        "Media Production",
                        "Branding & Design",
                        "Digital Marketing",
                        "Podcasting",
                        "Web & App Dev",
                        "Film Production",
                      ].map((cat) => (
                        <div
                          key={cat}
                          className="px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-widest border bg-white/5 border-white/5 text-transparent select-none uppercase"
                        >
                          {cat}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Name Input Placeholder */}
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="text-[10px] font-mono tracking-widest uppercase text-agency-textGrey/70">
                      {"// Your Name"}
                    </div>
                    <div className="w-full bg-white/5 border border-white/5 rounded-2xl h-[54px]" />
                  </div>

                  {/* Email Input Placeholder */}
                  <div className="flex flex-col gap-2">
                    <div className="text-[10px] font-mono tracking-widest uppercase text-agency-textGrey/70">
                      {"// Your Email"}
                    </div>
                    <div className="w-full bg-white/5 border border-white/5 rounded-2xl h-[54px]" />
                  </div>

                  {/* Message Input Placeholder */}
                  <div className="flex flex-col gap-2">
                    <div className="text-[10px] font-mono tracking-widest uppercase text-agency-textGrey/70">
                      {"// Tell Us About Your Project"}
                    </div>
                    <div className="w-full bg-white/5 border border-white/5 rounded-2xl h-[120px]" />
                  </div>

                  {/* Submit Button Placeholder */}
                  <div className="w-full mt-4 bg-agency-red/30 border border-agency-red/10 rounded-2xl h-[50px] flex items-center justify-center text-transparent font-mono text-[10px] tracking-widest uppercase py-4">
                    Send Inquiry
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Row */}
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-mono uppercase tracking-[0.2em] text-agency-textGrey/60">
          <div suppressHydrationWarning>© {new Date().getFullYear()} Reflective Media Productions LLC. All Rights Reserved.</div>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-white transition-colors" data-cursor="pointer">Privacy</a>
            <a href="#" className="hover:text-white transition-colors" data-cursor="pointer">Terms</a>
            <a href="#" className="hover:text-white transition-colors" data-cursor="pointer">{"HQ // Abu Dhabi"}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
