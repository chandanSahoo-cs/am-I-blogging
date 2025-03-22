import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Calendar, Clock, User, BookOpen, Heart, Bookmark, Share2 } from "lucide-react";
import Navbar from "../components/Navbar";

interface Author {
  name: string;
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  author: Author;
}

interface BlogContentResponse {
  post: BlogPost;
}

const BlogContent = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [readTime] = useState<number>(Math.floor(Math.random() * 10) + 3); // Random read time between 3-12 minutes

  useEffect(() => {
    const fetchBlogPost = async () => {
      const accessToken = localStorage.getItem("accessToken");  
      try {
        setIsLoading(true);
        const response = await axios.get<BlogContentResponse>(
          `https://am-i-blogging.chandansahoo02468.workers.dev/api/v1/blog/${id}`,
          {
            headers :{
                Authorization : accessToken
            }
          }
        );
        setPost(response.data.post);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        setIsLoading(false);
      }
    };

    if (id) {
      fetchBlogPost();
    }
  }, [id]);


  // Generate a random date in the past 6 months
  const getRandomDate = () => {
    const now = new Date();
    const pastDate = new Date(now.setMonth(now.getMonth() - Math.floor(Math.random() * 6)));
    return pastDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="w-3/4 h-12 bg-gray-200 rounded-lg mb-6 animate-pulse"></div>
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse mr-4"></div>
          <div>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error loading blog post</h2>
        <p className="text-gray-600 mb-6">We couldn't load the blog post you requested. Please try again later.</p>
        <p className="text-sm text-gray-500">{error.message}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Blog post not found</h2>
        <p className="text-gray-600">The blog post you're looking for doesn't seem to exist.</p>
      </div>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          {/* Author and Meta info */}
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-medium mr-4">
              {post.author.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center">
                <span className="font-medium text-gray-900">{post.author.name}</span>
                <span className="mx-2 text-gray-400">·</span>
                <span className="text-gray-600">{getRandomDate()}</span>
              </div>
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <Clock size={14} className="mr-1" />
                <span className="mr-3">{readTime} min read</span>
                <BookOpen size={14} className="mr-1" />
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Cover Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-10"
        >
        </motion.div>
        
        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="prose prose-lg max-w-none text-gray-800"
        >
          {post.content}
        </motion.div>
        
        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
        </motion.div>
        
        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex justify-between items-center mt-10 pt-6 border-t border-gray-200"
        >
          <div className="flex space-x-4">
            <button className="flex items-center text-gray-600 hover:text-red-500 transition-colors">
              <Heart size={20} className="mr-2" />
              <span>Like</span>
            </button>
            <button className="flex items-center text-gray-600 hover:text-blue-500 transition-colors">
              <Bookmark size={20} className="mr-2" />
              <span>Save</span>
            </button>
          </div>
          <button className="flex items-center text-gray-600 hover:text-green-500 transition-colors">
            <Share2 size={20} className="mr-2" />
            <span>Share</span>
          </button>
        </motion.div>
        
        {/* Related Posts (Placeholder) */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((item) => (
              <div key={item} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white">
                <div className="p-5">
                  <h4 className="font-bold text-gray-900 mb-2">
                    {item === 1 ? "10 React Patterns Every Developer Should Know" : "Building with TypeScript: A Practical Guide"}
                  </h4>
                  <div className="flex items-center text-sm text-gray-500">
                    <User size={14} className="mr-1" />
                    <span className="mr-3">{item === 1 ? "Alex Morgan" : "Sarah Chen"}</span>
                    <Calendar size={14} className="mr-1" />
                    <span>May 12, 2023</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
    </>
  );
};

export default BlogContent;