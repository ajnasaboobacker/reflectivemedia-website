"use client";

import { useState } from "react";
import { Send, MapPin, Mail, Phone } from "lucide-react";

export default function ContactSection() {
  const [activeCategory, setActiveCategory] = useState<string>("Both");
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
                <span className="w-1.5 h-1.5 bg-agency-red rounded-full" />
                <span>{"// Connect"}</span>
              </div>
              <h2 className="font-heading font-black text-4xl md:text-6xl tracking-tight text-white leading-[1.1]">
                Let&apos;s Reflect.
              </h2>
              <p className="text-agency-textGrey text-sm leading-relaxed max-w-sm mt-2">
                Have a campaign to execute or a cinematic sequence to capture? Get in touch and let&apos;s build something memorable.
              </p>
            </div>

            {/* Studio Coordinates */}
            <div className="flex flex-col gap-6 font-mono text-xs text-agency-textGrey mt-8 lg:mt-0">
              <div className="flex items-center gap-4 group">
                <div className="w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white group-hover:text-agency-redGlow group-hover:border-agency-red/30 transition-colors duration-300">
                  <Mail size={14} />
                </div>
                <a href="mailto:hello@reflectivemedia.agency" className="hover:text-white transition-colors" data-cursor="pointer">
                  hello@reflectivemedia.agency
                </a>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white group-hover:text-agency-redGlow group-hover:border-agency-red/30 transition-colors duration-300">
                  <Phone size={14} />
                </div>
                <a href="tel:+13235550199" className="hover:text-white transition-colors" data-cursor="pointer">
                  +1 (323) 555-0199
                </a>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white group-hover:text-agency-redGlow group-hover:border-agency-red/30 transition-colors duration-300">
                  <MapPin size={14} />
                </div>
                <span className="leading-relaxed">
                  Studio 404, Carbon Blvd<br />Los Angeles, CA 90028
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Glassmorphic Form */}
          <div className="lg:col-span-7">
            <div className="glassmorphism p-8 md:p-12 rounded-3xl border border-white/5 shadow-glass relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-glow-gradient opacity-10 pointer-events-none" />

              {submitted ? (
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
                      {["Video Production", "Digital Marketing", "Both"].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setActiveCategory(cat)}
                          className={`px-4 py-2 rounded-full text-xs font-mono tracking-widest border transition-all duration-300 uppercase ${
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
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. director@agency.com"
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
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="e.g. We want to shoot a commercial EV campaign..."
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
              )}
            </div>
          </div>
        </div>

        {/* Footer Row */}
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-mono uppercase tracking-[0.2em] text-agency-textGrey/60">
          <div>© {new Date().getFullYear()} Reflective Media Agency. All Rights Reserved.</div>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-white transition-colors" data-cursor="pointer">Privacy</a>
            <a href="#" className="hover:text-white transition-colors" data-cursor="pointer">Terms</a>
            <a href="#" className="hover:text-white transition-colors" data-cursor="pointer">{"Studio // Los Angeles"}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
