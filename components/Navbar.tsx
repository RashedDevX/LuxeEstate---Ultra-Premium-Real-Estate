
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Landmark, ArrowRight, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    opened: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const linkVariants = {
    closed: { opacity: 0, x: 50 },
    opened: { opacity: 1, x: 0 }
  };

  return (
    <nav className={`fixed w-full z-[60] transition-all duration-500 ${scrolled ? 'bg-navy/90 backdrop-blur-lg py-4 shadow-2xl' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group z-[70]">
          <Landmark className="text-gold w-8 h-8 transition-transform group-hover:scale-110" />
          <span className="text-2xl font-serif font-bold text-white tracking-wider">LUXE<span className="text-gold">ESTATE</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-10 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-xs font-bold uppercase tracking-[0.2em] transition-all hover:text-gold relative group ${location.pathname === link.path ? 'text-gold' : 'text-gray-300'}`}
            >
              {link.name}
              <motion.span 
                layoutId="navUnderline"
                className={`absolute -bottom-2 left-0 w-full h-0.5 bg-gold origin-left ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 transition-transform'}`}
              />
            </Link>
          ))}
          <Link 
            to="/properties?filter=saved" 
            className="flex items-center space-x-2 bg-white/5 hover:bg-gold/20 px-4 py-2 rounded-full transition-all border border-white/10 group"
          >
            <Heart size={14} className="text-gold group-hover:fill-gold" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Saved</span>
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className="md:hidden text-white z-[70] p-2 hover:bg-white/10 rounded-full transition-colors" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X size={32} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <Menu size={32} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-navy/60 backdrop-blur-md z-[55] md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div 
              variants={menuVariants}
              initial="closed"
              animate="opened"
              exit="closed"
              className="fixed top-0 right-0 w-full sm:w-[400px] h-screen bg-navy z-[60] md:hidden shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col justify-center px-12"
            >
              <div className="space-y-8">
                {navLinks.map((link) => (
                  <motion.div key={link.name} variants={linkVariants}>
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center justify-between"
                    >
                      <span className={`text-4xl font-serif tracking-tight transition-colors ${location.pathname === link.path ? 'text-gold' : 'text-white group-hover:text-gold'}`}>
                        {link.name}
                      </span>
                      <ArrowRight className={`w-6 h-6 text-gold opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0 ${location.pathname === link.path ? 'opacity-100 translate-x-0' : ''}`} />
                    </Link>
                  </motion.div>
                ))}
                <motion.div variants={linkVariants}>
                  <Link
                    to="/properties?filter=saved"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 text-gold text-xl font-serif"
                  >
                    <Heart size={20} className="fill-gold" />
                    <span>View Saved Portfolio</span>
                  </Link>
                </motion.div>
              </div>

              <motion.div 
                variants={linkVariants}
                className="mt-16 pt-10 border-t border-white/10"
              >
                <p className="text-gray-500 uppercase tracking-widest text-xs mb-4">Inquiries</p>
                <a href="mailto:concierge@luxeestate.com" className="text-white hover:text-gold transition-colors block text-lg mb-2">concierge@luxeestate.com</a>
                <a href="tel:+1888LUXEGOLD" className="text-white hover:text-gold transition-colors block text-lg">+1 (888) LUXE-GOLD</a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
