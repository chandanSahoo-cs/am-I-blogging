import { useEffect } from "react";
import { motion } from "framer-motion";
import LoginForm from "../components/LoginForm";
import UserTestimonial from "../components/UserTestimonial";

const Login = () => {
  // Add subtle parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      const rightPanel = document.querySelector('.right-panel');
      const leftPanel = document.querySelector('.left-panel');
      
      if (rightPanel && leftPanel) {
        rightPanel.setAttribute(
          'style',
          `transform: translate(${x * 10}px, ${y * 10}px)`
        );
        
        leftPanel.setAttribute(
          'style',
          `transform: translate(${x * -5}px, ${y * -5}px)`
        );
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left Panel */}
      <motion.div 
        className="left-panel w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white z-10"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="glass-panel p-8 w-full max-w-md">
          <LoginForm />
        </div>
      </motion.div>
      
      {/* Right Panel */}
      <motion.div 
        className="right-panel w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="max-w-lg">
          <UserTestimonial 
            quote="The platform's user experience is exceptional. It's intuitive, fast, and beautifully designed."
            author="Mia Wallace"
            position="Creative Director, Big Kahuna Burger"
          />
        </div>
      </motion.div>
      
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-purple-50 opacity-60"
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
          className="absolute top-[60%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-50 opacity-40"
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
    </div>
  );
};

export default Login;
