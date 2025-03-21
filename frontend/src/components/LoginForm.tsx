import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { SigninInput } from "@chandansahoo/am-i-blogging";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if ( !email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    // Simulate form submission
    setIsSubmitting(true);

    const postInputs: SigninInput = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "https://am-i-blogging.chandansahoo02468.workers.dev/api/v1/user/signin",
        postInputs
      );

      console.log("Response Data:", response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }

    setTimeout(() => {
      toast.success("Account created successfully!");
      setIsSubmitting(false);
      setEmail("");
      setPassword("");
      navigate("/blog")
    }, 1500);
  };

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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-md"
    >
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
        <p className="text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary hover:underline transition-all">
            Sign up
          </Link>
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div variants={itemVariants} className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="name@example.com"
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field pr-10"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="flex justify-end">
            <a href="#" className="text-xs text-primary hover:underline">
              Forgot password?
            </a>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="button-primary relative overflow-hidden group"
          >
            <span className={`${isSubmitting ? 'opacity-0' : 'opacity-100'} transition-opacity flex items-center justify-center gap-2`}>
              <LogIn size={18} />
              Login
            </span>
            {isSubmitting && (
              <span className="absolute inset-0 flex items-center justify-center">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                    fill="none"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </span>
            )}
            <div className="absolute inset-0 -z-10 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </motion.div>
      </form>
      
      <motion.div 
        variants={itemVariants}
        className="mt-6 text-center text-sm text-muted-foreground"
      >
        By logging in, you agree to our{" "}
        <a href="#" className="text-primary hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-primary hover:underline">
          Privacy Policy
        </a>
      </motion.div>
    </motion.div>
  );
};

export default LoginForm;