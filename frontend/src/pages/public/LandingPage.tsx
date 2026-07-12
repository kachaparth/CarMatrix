import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, ChevronRight, CheckCircle, ShieldCheck, Clock, Mail, Sun, Moon } from 'lucide-react';

import { useTheme } from '../../context/ThemeContext';

const LandingPage = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const bgColor = isDark ? 'bg-[#0F0F11]' : 'bg-[#FFFFFF]';
  const textColor = isDark ? 'text-[#EEEEF1]' : 'text-[#111111]';
  const mutedText = isDark ? 'text-[#B4B6C1]' : 'text-[#6E717F]';
  const borderColor = isDark ? 'border-[#262629]' : 'border-[#E2E4E9]';
  const surfaceColor = isDark ? 'bg-[#161618]' : 'bg-[#F7F8FA]';

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} font-sans selection:bg-[#cba365] selection:text-white`}>
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 bg-transparent border-b border-white/10`}>
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Car className="text-white w-8 h-8" strokeWidth={1} />
            <span className="font-light text-2xl tracking-[0.2em] uppercase text-white">CarMatrix</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {['Fleet', 'Services', 'Membership'].map(item => (
              <a key={item} href="#" className="text-sm font-light tracking-widest uppercase text-white/80 hover:text-white transition-colors">{item}</a>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <button onClick={toggleTheme} className="text-white/80 hover:text-white transition-colors">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link to="/login" className="text-sm font-light tracking-widest uppercase text-white/80 hover:text-white transition-colors">Sign In</Link>
          </div>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2070&auto=format&fit=crop" 
            alt="Flagship Luxury Car" 
            className="w-full h-full object-cover scale-105 transform origin-center animate-[pulse_25s_ease-in-out_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className={`absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t ${isDark ? 'from-[#0F0F11]' : 'from-[#FFFFFF]'} to-transparent`} />
        </div>

        <div className="relative z-10 w-full px-6 max-w-7xl mx-auto flex flex-col justify-center h-full pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h2 className="text-xs font-semibold tracking-[0.3em] text-[#cba365] uppercase mb-6">The Pinnacle of Mobility</h2>
            <h1 className="text-6xl md:text-8xl font-light text-white mb-8 tracking-tighter leading-[1.1]">
              Drive the <br/><span className="font-serif italic">Extraordinary</span>
            </h1>
            
            <Link to="/inventory">
              <button className="mt-8 bg-[#cba365] hover:bg-[#b89154] transition-colors text-white h-14 px-10 font-medium tracking-wider uppercase text-sm">
                Explore Fleet
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. CURATED COLLECTIONS */}
      <section className={`py-32 ${bgColor}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16 border-b border-[#cba365]/30 pb-8">
            <div>
              <h2 className="text-xs font-semibold tracking-[0.3em] text-[#cba365] uppercase mb-4">Curated Collections</h2>
              <h3 className={`text-4xl md:text-5xl font-light tracking-tight ${textColor}`}>Masterpieces in Motion</h3>
            </div>
            <Link to="/inventory" className="hidden md:flex items-center gap-2 text-sm font-medium tracking-widest uppercase hover:text-[#cba365] transition-colors group">
              View Entire Fleet <span className="transform group-hover:translate-x-1 transition-transform"><ChevronRight size={16} /></span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {[
              { img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2070&auto=format&fit=crop', title: 'The Executive Suite', desc: 'Unparalleled comfort and prestige.' },
              { img: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070&auto=format&fit=crop', title: 'Performance & Supercars', desc: 'Engineered for the driving purist.' },
              { img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop', title: 'Luxury SUVs', desc: 'Commanding presence, infinite capability.' },
            ].map((collection, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2, ease: "easeOut" }}
                className="group cursor-pointer overflow-hidden relative"
              >
                <div className="h-[500px] overflow-hidden">
                  <img 
                    src={collection.img} 
                    alt={collection.title} 
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[1.5s] ease-out opacity-90 group-hover:opacity-100"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-[#0F0F11]/90' : 'from-[#FFFFFF]/90'} via-transparent to-transparent opacity-80`} />
                </div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h4 className={`text-2xl font-light mb-2 ${textColor}`}>{collection.title}</h4>
                  <p className={`text-sm ${mutedText} mb-6`}>{collection.desc}</p>
                  <div className="w-0 group-hover:w-full h-px bg-[#cba365] transition-all duration-700 ease-out" />
                  <span className={`inline-block mt-4 text-xs font-semibold tracking-[0.2em] uppercase ${textColor} group-hover:text-[#cba365] transition-colors`}>
                    Explore Collection
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE EXPERIENCE / VALUE PROP */}
      <section className={`py-32 ${surfaceColor} ${borderColor} border-y`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <h2 className={`text-4xl md:text-5xl font-serif italic ${textColor} mb-6`}>The CarMatrix Experience</h2>
            <p className={`text-lg font-light ${mutedText} leading-relaxed`}>
              We believe that renting a luxury vehicle should be as flawless as the car itself. From the moment of booking to the final handover, experience absolute perfection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            {[
              { icon: CheckCircle, title: 'Concierge Delivery', desc: 'Your vehicle delivered directly to your home, office, or private terminal. Seamless, discreet, and perfectly timed.' },
              { icon: ShieldCheck, title: 'Pristine Fleet Maintenance', desc: 'Every vehicle undergoes a meticulous 150-point inspection and detailing before every single handover.' },
              { icon: Clock, title: '24/7 Dedicated Support', desc: 'A dedicated lifestyle manager is available around the clock to assist with routing, recommendations, or extensions.' },
            ].map((value, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <value.icon className="w-8 h-8 text-[#cba365] mb-8" strokeWidth={1} />
                <h4 className={`text-xl font-light tracking-wide uppercase mb-4 ${textColor}`}>{value.title}</h4>
                <p className={`${mutedText} font-light leading-relaxed max-w-sm`}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED FLEET SHOWCASE */}
      <section className={`py-32 ${bgColor}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className={`flex flex-col md:flex-row items-center border ${borderColor}`}>
            <div className="w-full md:w-3/5 h-[400px] md:h-[600px] relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2070&auto=format&fit=crop" 
                alt="Featured Vehicle" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-2/5 p-12 md:p-20 flex flex-col justify-center">
              <span className="text-xs font-semibold tracking-[0.3em] text-[#cba365] uppercase mb-4">Featured</span>
              <h3 className={`text-4xl font-serif italic ${textColor} mb-2`}>Mercedes-Benz</h3>
              <h4 className={`text-3xl font-light tracking-tight ${textColor} mb-8`}>S-Class Maybach</h4>
              
              <div className="space-y-4 mb-12">
                <div className={`flex justify-between border-b ${borderColor} pb-2`}>
                  <span className={`${mutedText} font-light`}>Engine</span>
                  <span className={`${textColor} font-medium tracking-wide`}>V12 Biturbo</span>
                </div>
                <div className={`flex justify-between border-b ${borderColor} pb-2`}>
                  <span className={`${mutedText} font-light`}>Horsepower</span>
                  <span className={`${textColor} font-medium tracking-wide`}>621 hp</span>
                </div>
                <div className={`flex justify-between border-b ${borderColor} pb-2`}>
                  <span className={`${mutedText} font-light`}>0-60 mph</span>
                  <span className={`${textColor} font-medium tracking-wide`}>4.4s</span>
                </div>
              </div>

              <Link to="/inventory">
                <button className={`w-full h-14 border ${borderColor} ${textColor} hover:border-[#cba365] hover:text-[#cba365] transition-colors font-medium tracking-widest uppercase text-sm`}>
                  Reserve Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className={`${surfaceColor} pt-24 pb-12 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Car className={`${textColor} w-6 h-6`} strokeWidth={1} />
                <span className={`font-light text-xl tracking-[0.2em] uppercase ${textColor}`}>CarMatrix</span>
              </div>
              <p className={`${mutedText} font-light leading-relaxed max-w-sm mb-8`}>
                The premier destination for luxury vehicle rentals and exclusive automotive experiences.
              </p>
              <div className="flex items-center gap-4">
                <input 
                  type="email" 
                  placeholder="Subscribe to our Newsletter" 
                  className={`bg-transparent border-b ${borderColor} outline-none ${textColor} placeholder:${mutedText} w-64 pb-2 font-light`}
                />
                <button className="text-[#cba365] hover:text-[#b89154] transition-colors"><Mail size={20} strokeWidth={1.5} /></button>
              </div>
            </div>
            
            <div>
              <h5 className={`text-xs font-semibold tracking-[0.2em] uppercase ${textColor} mb-6`}>Fleet</h5>
              <ul className={`space-y-4 ${mutedText} font-light`}>
                <li><a href="#" className="hover:text-[#cba365] transition-colors">Executive</a></li>
                <li><a href="#" className="hover:text-[#cba365] transition-colors">Supercars</a></li>
                <li><a href="#" className="hover:text-[#cba365] transition-colors">SUVs</a></li>
                <li><a href="#" className="hover:text-[#cba365] transition-colors">Classics</a></li>
              </ul>
            </div>

            <div>
              <h5 className={`text-xs font-semibold tracking-[0.2em] uppercase ${textColor} mb-6`}>Company</h5>
              <ul className={`space-y-4 ${mutedText} font-light`}>
                <li><a href="#" className="hover:text-[#cba365] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[#cba365] transition-colors">Concierge</a></li>
                <li><a href="#" className="hover:text-[#cba365] transition-colors">Locations</a></li>
                <li><a href="#" className="hover:text-[#cba365] transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className={`flex flex-col md:flex-row justify-between items-center pt-8 border-t ${borderColor} ${mutedText} text-xs font-light tracking-wide`}>
            <p>© {new Date().getFullYear()} CarMatrix Luxury Dealership. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-[#cba365] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#cba365] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
