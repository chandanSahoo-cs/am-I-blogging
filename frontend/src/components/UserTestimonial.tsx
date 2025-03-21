import React from "react";
import { motion } from "framer-motion";

interface TestimonialProps {
  quote: string;
  author: string;
  position: string;
}

const UserTestimonial: React.FC<TestimonialProps> = ({ quote, author, position }) => {
  return (
    <motion.div 
      className="flex flex-col gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="text-xl md:text-2xl lg:text-3xl text-gray-800 font-medium leading-relaxed"
      >
        "{quote}"
      </motion.div>
      
      <motion.div 
        className="flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <h3 className="text-lg font-semibold text-gray-900">{author}</h3>
        <p className="text-sm text-gray-500">{position}</p>
      </motion.div>
    </motion.div>
  );
};

export default UserTestimonial;