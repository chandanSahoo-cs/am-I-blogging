
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { UserPlus, LogIn, BookOpen, PenSquare } from "lucide-react";

const Landing = () => {
  // Add subtle parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      const elements = document.querySelectorAll('.parallax');
      
      elements.forEach((el) => {
        const depth = parseFloat(el.getAttribute('data-depth') || '0.1');
        const moveX = x * depth * 100;
        const moveY = y * depth * 100;
        
        el.setAttribute(
          'style',
          `transform: translate(${moveX}px, ${moveY}px)`
        );
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 50 
      }
    }
  };

  const cardVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="parallax absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-50 opacity-60"
          data-depth="0.1"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.6, 0.7, 0.6]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="parallax absolute top-[60%] -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-50 opacity-40"
          data-depth="0.2"
          animate={{ 
            scale: [1, 1.03, 1],
            opacity: [0.4, 0.5, 0.4]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-12 md:py-24">
        <motion.div
          className="flex flex-col items-center text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="parallax"
            data-depth="0.05"
            variants={itemVariants}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
              animate={{ 
                scale: [1, 1.01, 1],
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            >
              Welcome to BlogWave
            </motion.h1>
          </motion.div>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mb-10"
          >
            Discover thought-provoking articles and share your own voice with the world.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/login">
              <button 
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 h-11 px-8 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md hover:shadow-xl hover:bg-blue-600 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <LogIn className="mr-1 h-5 w-5" />
                  Login
                </span>
              </button>
            </Link>
            
            <Link to="/signup">
              <button 
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 h-11 px-8 py-2 border border-blue-500 text-blue-600 bg-transparent hover:bg-blue-50 hover:text-blue-700 shadow-sm hover:shadow-lg group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <UserPlus className="mr-1 h-5 w-5" />
                  Sign Up
                </span>
              </button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="relative overflow-hidden rounded-xl glass-panel h-full"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400"></div>
            <div className="p-8">
              <div className="rounded-full bg-blue-100 w-14 h-14 flex items-center justify-center mb-6">
                <BookOpen className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Read Amazing Articles</h3>
              <p className="text-gray-600 mb-6">
                Explore a diverse collection of thought-provoking articles written by passionate writers from around the world.
              </p>
              <Link to="/blog">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700">
                  Browse Articles
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            className="relative overflow-hidden rounded-xl glass-panel h-full"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-400"></div>
            <div className="p-8">
              <div className="rounded-full bg-purple-100 w-14 h-14 flex items-center justify-center mb-6">
                <PenSquare className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Share Your Thoughts</h3>
              <p className="text-gray-600 mb-6">
                Express yourself and reach a wide audience. Write about your passions, experiences, or expertise.
              </p>
              <Link to="/publish">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 bg-purple-600 text-white hover:bg-purple-700">
                  Start Writing
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="rounded-2xl overflow-hidden glass-panel p-8 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of writers and readers today. Create an account to start sharing your stories or dive into our collection of articles.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/login">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors h-11 px-8 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                <LogIn className="mr-2 h-5 w-5" />
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors h-11 px-8 py-2 bg-blue-600 text-white hover:bg-blue-700">
                <UserPlus className="mr-2 h-5 w-5" />
                Sign Up
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;