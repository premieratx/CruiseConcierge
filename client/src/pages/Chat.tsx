import { motion } from 'framer-motion';
import logoPath from '@assets/PPC Logo LARGE_1757881944449.png';
import { Ship, Star, CheckCircle, Clock } from 'lucide-react';

interface ChatProps {
  defaultEventType?: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    y: -60,
    transition: { duration: 0.4, ease: "easeIn" }
  }
};

export default function Chat({ defaultEventType }: ChatProps = {}) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Main Content Area */}
      <div className="flex-1 flex items-start justify-center pt-4 px-4 pb-4">
        <div className="w-full max-w-6xl">
          <motion.div
            key="intro"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-8"
          >
            {/* Welcome Header */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center space-y-4"
            >
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <motion.img
                  src={logoPath}
                  alt="Premier Party Cruises"
                  className="h-24 w-auto"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                />
              </div>
              
              {/* Hero Text */}
              <div className="space-y-3">
                <motion.h1
                  className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Welcome Aboard!
                </motion.h1>
                
                <motion.p
                  className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Lake Travis's Premium Boat Charter Experience
                </motion.p>
              </div>
            </motion.div>
            
            {/* Features Row */}
            <motion.div
              className="flex items-center justify-center gap-8 flex-wrap text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Ship className="h-5 w-5 text-blue-600" />
                <span>Premium Fleet</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Star className="h-5 w-5 text-yellow-500" />
                <span>500+ 5-Star Reviews</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Clock className="h-5 w-5 text-purple-600" />
                <span>7 Years Excellence</span>
              </div>
            </motion.div>

            {/* Divider Line */}
            <div className="flex items-center justify-center">
              <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
            </div>
            
            {/* New Quote Builder Iframe */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="w-full"
            >
              <div className="w-full max-w-6xl mx-auto px-4">
                <iframe 
                  src="https://ppc-quote-builder.lovable.app/"
                  title="Premier Party Cruises Quote Builder"
                  className="w-full rounded-xl shadow-2xl"
                  style={{ 
                    minHeight: '800px',
                    height: '80vh',
                    border: 'none'
                  }}
                  allow="payment; geolocation"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}