import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Car, Shield, Star, Zap } from 'lucide-react';
import { Button } from 'antd';
import { useTheme } from '../../context/ThemeContext';

const LandingPage = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#0F0F11] text-[#EEEEF1]' : 'bg-[#FFFFFF] text-[#111111]'}`}>
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${theme === 'dark' ? 'bg-[#0F0F11]/80 border-[#262629]' : 'bg-[#FFFFFF]/80 border-[#E2E4E9]'} backdrop-blur-md border-b`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#5E6AD2] rounded-xl flex items-center justify-center">
              <Car className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-2xl tracking-tight">CarMatrix</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/login" className={`font-medium ${theme === 'dark' ? 'text-[#B4B6C1] hover:text-white' : 'text-[#6E717F] hover:text-[#111111]'}`}>Sign In</Link>
            <Link to="/register">
              <Button type="primary" size="large" className="bg-[#5E6AD2] hover:opacity-90 border-none shadow-none px-6 font-semibold">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop" 
            alt="Luxury Car" 
            className="w-full h-full object-cover scale-105 transform origin-center animate-[pulse_20s_ease-in-out_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F11] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-light text-white mb-6 tracking-tight leading-tight"
          >
            Experience <br/><span className="font-bold">Automotive Excellence</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Discover a curated collection of premium vehicles. We redefine the standard of luxury car ownership through uncompromising quality and service.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/register">
              <Button type="primary" size="large" className="bg-[#5E6AD2] hover:opacity-90 border-none shadow-none h-14 px-8 text-lg flex items-center gap-2">
                Explore Inventory <ArrowRight size={20} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className={`py-32 ${theme === 'dark' ? 'bg-[#0F0F11]' : 'bg-[#F7F8FA]'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold tracking-[0.2em] text-[#5E6AD2] uppercase mb-4">The Collection</h2>
            <h3 className="text-4xl md:text-5xl font-light tracking-tight">Masterpieces in Motion</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { img: 'https://images.unsplash.com/photo-1503376710356-70e68c8c2273?q=80&w=2070&auto=format&fit=crop', title: 'Performance Series', desc: 'Engineered for the driving purist.' },
              { img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2070&auto=format&fit=crop', title: 'Luxury Sedans', desc: 'Unparalleled comfort and prestige.' },
              { img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop', title: 'Executive SUVs', desc: 'Commanding presence, infinite capability.' },
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="group cursor-pointer"
              >
                <div className="relative h-96 overflow-hidden rounded-2xl mb-6">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={feature.img} 
                    alt={feature.title} 
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>
                <h4 className="text-2xl font-light mb-2">{feature.title}</h4>
                <p className={`text-sm ${theme === 'dark' ? 'text-[#B4B6C1]' : 'text-[#6E717F]'}`}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={`py-24 border-y ${theme === 'dark' ? 'border-[#262629] bg-[#161618]' : 'border-[#E2E4E9] bg-[#FFFFFF]'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Shield, title: 'Certified Authenticity', desc: 'Every vehicle passes a rigorous 150-point inspection.' },
              { icon: Zap, title: 'Seamless Acquisition', desc: 'White-glove delivery and streamlined digital paperwork.' },
              { icon: Star, title: 'Exclusive Network', desc: 'Access to off-market inventory and rare allocations.' },
            ].map((value, idx) => (
              <div key={idx} className="text-center">
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center ${theme === 'dark' ? 'bg-[#0F0F11] border border-[#262629]' : 'bg-[#F7F8FA] border border-[#E2E4E9]'}`}>
                  <value.icon className="w-8 h-8 text-[#5E6AD2]" strokeWidth={1.5} />
                </div>
                <h4 className="text-xl font-medium mb-3">{value.title}</h4>
                <p className={`${theme === 'dark' ? 'text-[#B4B6C1]' : 'text-[#6E717F]'} font-light leading-relaxed`}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 ${theme === 'dark' ? 'bg-[#0F0F11]' : 'bg-[#FFFFFF]'}`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Car className="text-[#5E6AD2] w-5 h-5" />
            <span className="font-bold text-lg">CarMatrix</span>
          </div>
          <p className={`text-sm ${theme === 'dark' ? 'text-[#B4B6C1]' : 'text-[#6E717F]'}`}>
            © {new Date().getFullYear()} CarMatrix Luxury Dealership. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
