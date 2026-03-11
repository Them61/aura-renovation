/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Menu, X, ArrowRight, MapPin, Phone, Mail, Instagram, Linkedin, Facebook } from 'lucide-react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax effect for hero
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Services', href: '#services' },
    { name: 'Story', href: '#story' },
    { name: 'Contact', href: '#contact' },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-ink font-sans overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-ink/90 backdrop-blur-md py-4 shadow-lg shadow-black/50' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#" className="text-2xl font-serif tracking-widest text-white z-50">
            AURA<span className="text-gold">.</span>
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm uppercase tracking-[0.15em] text-gray-300 hover:text-gold transition-colors duration-300">
                {link.name}
              </a>
            ))}
            <a href="#contact" className="border border-gold text-gold px-6 py-2 text-sm uppercase tracking-widest hover:bg-gold hover:text-ink transition-all duration-500">
              Consultation
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <motion.div 
        className={`fixed inset-0 bg-ink z-40 flex flex-col items-center justify-center space-y-8 ${mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
        animate={{ 
          opacity: mobileMenuOpen ? 1 : 0,
          clipPath: mobileMenuOpen ? 'circle(150% at 100% 0)' : 'circle(0% at 100% 0)'
        }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href} 
            onClick={() => setMobileMenuOpen(false)}
            className="text-3xl font-serif text-white hover:text-gold transition-colors"
          >
            {link.name}
          </a>
        ))}
      </motion.div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-ink z-10" />
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop" 
            alt="Luxury Home Exterior" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto mt-20">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gold uppercase tracking-[0.3em] text-xs md:text-sm mb-6"
          >
            Quebec's Premier Design & Build Firm
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-tight mb-8"
          >
            Elevating the Art of <br className="hidden md:block" />
            <span className="italic text-gray-300">Living Spaces.</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <a href="#portfolio" className="inline-flex items-center space-x-3 text-sm uppercase tracking-widest border-b border-gold pb-1 hover:text-gold transition-colors">
              <span>View Our Work</span>
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Intro / Story Section */}
      <section id="story" className="py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <p className="text-gold uppercase tracking-[0.2em] text-xs mb-6">Our Philosophy</p>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
              We transform houses into <span className="italic text-gray-400">masterpieces</span> of modern living.
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8 font-light">
              Based in Quebec, Aura brings a refined, architectural approach to home renovations. We believe that true luxury lies in the details—the perfect alignment of a shadow gap, the tactile quality of natural stone, and the seamless flow of light through a space.
            </p>
            <a href="#contact" className="inline-block border border-white/20 px-8 py-3 text-sm uppercase tracking-widest hover:bg-white hover:text-ink transition-all duration-500">
              Discover Our Process
            </a>
          </motion.div>
          <motion.div 
            className="relative h-[600px]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
              alt="Architectural Details" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-charcoal border border-white/10 flex items-center justify-center p-6 hidden md:flex">
              <p className="text-center font-serif text-xl">
                <span className="block text-gold text-4xl mb-2">15+</span>
                Years of Excellence
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects (Portfolio) */}
      <section id="portfolio" className="py-24 bg-charcoal">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-end mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div>
              <p className="text-gold uppercase tracking-[0.2em] text-xs mb-4">Selected Works</p>
              <h2 className="text-4xl md:text-5xl font-serif">Featured Projects</h2>
            </div>
            <a href="#" className="hidden md:inline-flex items-center space-x-2 text-sm uppercase tracking-widest hover:text-gold transition-colors">
              <span>View All Projects</span>
              <ArrowRight size={16} />
            </a>
          </motion.div>

          <div className="space-y-32">
            {/* Project 1 */}
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <div className="lg:col-span-8 overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop" 
                  alt="The Laurentian Estate" 
                  className="w-full h-[50vh] md:h-[70vh] object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="lg:col-span-4 lg:pl-12">
                <p className="text-gold text-xs uppercase tracking-[0.2em] mb-4">01 — Complete Renovation</p>
                <h3 className="text-3xl font-serif mb-4">The Laurentian Estate</h3>
                <p className="text-gray-400 font-light mb-8">A complete interior gut and redesign of a mid-century modern home, focusing on natural light and premium materials.</p>
                <a href="#" className="text-sm uppercase tracking-widest border-b border-white/30 pb-1 hover:border-gold hover:text-gold transition-colors">Explore Project</a>
              </div>
            </motion.div>

            {/* Project 2 */}
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <div className="lg:col-span-4 lg:pr-12 order-2 lg:order-1">
                <p className="text-gold text-xs uppercase tracking-[0.2em] mb-4">02 — Kitchen & Living</p>
                <h3 className="text-3xl font-serif mb-4">Westmount Penthouse</h3>
                <p className="text-gray-400 font-light mb-8">Elevating an urban penthouse with bespoke millwork, imported marble, and integrated smart home technology.</p>
                <a href="#" className="text-sm uppercase tracking-widest border-b border-white/30 pb-1 hover:border-gold hover:text-gold transition-colors">Explore Project</a>
              </div>
              <div className="lg:col-span-8 overflow-hidden group order-1 lg:order-2">
                <img 
                  src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop" 
                  alt="Westmount Penthouse" 
                  className="w-full h-[50vh] md:h-[70vh] object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Before / After Section */}
      <section className="py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <p className="text-gold uppercase tracking-[0.2em] text-xs mb-4">Transformations</p>
          <h2 className="text-4xl md:text-5xl font-serif">Vision Realized</h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="relative group overflow-hidden">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop" 
              alt="Before" 
              className="w-full h-[400px] object-cover grayscale"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-6 left-6 z-20 bg-ink/80 backdrop-blur-sm px-4 py-1">
              <span className="text-xs uppercase tracking-widest">Before</span>
            </div>
          </motion.div>
          <motion.div variants={fadeInUp} className="relative group overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2070&auto=format&fit=crop" 
              alt="After" 
              className="w-full h-[400px] object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-6 left-6 z-20 bg-gold text-ink px-4 py-1">
              <span className="text-xs uppercase tracking-widest font-medium">After</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-surface border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="text-gold uppercase tracking-[0.2em] text-xs mb-4">Expertise</p>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Our Services</h2>
            <p className="text-gray-400 font-light">Comprehensive design and build solutions tailored to the most discerning clients.</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {[
              {
                title: "Full Home Renovation",
                desc: "Complete structural and aesthetic transformations of luxury properties, managed end-to-end."
              },
              {
                title: "Custom Kitchens & Baths",
                desc: "Bespoke culinary and wellness spaces featuring premium imported materials and custom millwork."
              },
              {
                title: "Architectural Design",
                desc: "Collaborative spatial planning and interior architecture that maximizes flow and natural light."
              }
            ].map((service, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                className="p-10 border border-white/5 bg-ink hover:border-gold/30 transition-colors duration-500 group"
              >
                <span className="text-gold font-serif text-2xl mb-6 block">0{idx + 1}</span>
                <h3 className="text-xl font-serif mb-4 group-hover:text-gold transition-colors">{service.title}</h3>
                <p className="text-gray-400 font-light text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-32 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="text-gold mb-8 flex justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.017 21L16.41 14.596C16.666 13.921 16.8 13.208 16.8 12.484V3H24V12.484C24 14.861 23.36 17.18 22.14 19.234L19.96 23H14.017ZM0 21L2.393 14.596C2.649 13.921 2.783 13.208 2.783 12.484V3H9.983V12.484C9.983 14.861 9.343 17.18 8.123 19.234L5.943 23H0Z" />
            </svg>
          </div>
          <h3 className="text-2xl md:text-4xl font-serif leading-relaxed mb-8">
            "Aura didn't just renovate our home; they completely reimagined how we live. The attention to detail and craftsmanship is simply unparalleled in Quebec."
          </h3>
          <p className="uppercase tracking-[0.2em] text-xs text-gray-400">
            <span className="text-white font-medium">Marie & Laurent</span> — Outremont
          </p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-charcoal relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-surface hidden lg:block" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="py-12"
            >
              <p className="text-gold uppercase tracking-[0.2em] text-xs mb-4">Start Your Project</p>
              <h2 className="text-4xl md:text-6xl font-serif mb-8">Let's discuss your vision.</h2>
              <p className="text-gray-400 font-light mb-12 max-w-md">
                Schedule a private consultation with our lead architects to explore the possibilities for your property.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <MapPin className="text-gold" size={20} />
                  <span className="text-sm font-light text-gray-300">1250 Boulevard René-Lévesque O, Montréal, QC</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="text-gold" size={20} />
                  <span className="text-sm font-light text-gray-300">+1 (514) 555-0198</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="text-gold" size={20} />
                  <span className="text-sm font-light text-gray-300">inquiries@aurarenovation.ca</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-surface p-8 md:p-12 border border-white/5 lg:border-none"
            >
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-400">First Name</label>
                    <input type="text" className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-gold transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-400">Last Name</label>
                    <input type="text" className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-gold transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400">Email Address</label>
                  <input type="email" className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-gold transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400">Project Details</label>
                  <textarea rows={4} className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-gold transition-colors resize-none" />
                </div>
                <button className="w-full bg-gold text-ink py-4 text-sm uppercase tracking-widest font-medium hover:bg-white transition-colors duration-300">
                  Submit Inquiry
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink pt-20 pb-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <a href="#" className="text-3xl font-serif tracking-widest text-white mb-6 block">
                AURA<span className="text-gold">.</span>
              </a>
              <p className="text-gray-500 font-light text-sm max-w-sm">
                Elevating the art of living spaces through uncompromising design and master craftsmanship in Quebec.
              </p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-white mb-6">Navigation</h4>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-500 hover:text-gold text-sm transition-colors">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-white mb-6">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-colors">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-xs mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Aura Architecture & Renovation. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-white text-xs transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-white text-xs transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
