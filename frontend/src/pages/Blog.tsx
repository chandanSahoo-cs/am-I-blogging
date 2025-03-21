import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { BookOpen, Clock, User, Star, ChevronLeft, ChevronRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
}

interface BlogResponse {
  posts: BlogPost[];
}

const Blog = () => {
  const [data, setData] = useState<BlogResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<BlogResponse>("https://am-i-blogging.chandansahoo02468.workers.dev/api/v1/blog/entries/bulk",{
          headers : {
            Authorization : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQxZDgxYzM4LWJiZDgtNGQwMC05N2IyLTBkZWEyYTU2ZDU5MyJ9.c5CX4MmHKkezKVFe_5uzppFKEgnLMgxREYgH0oPMwy8'
          }
        });
        setData(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Animations config
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Generate a random read time between 3-12 minutes
  const getRandomReadTime = () => Math.floor(Math.random() * 10) + 3;
  
  // Generate a random author name


  // Generate a random date in the past 6 months


  // Generate random categories
  const getRandomCategory = () => {
    const categories = ["Technology", "Programming", "Web Development", "Design", "Business", "Side Hustle", "Docker", "Node.js"];
    return categories[Math.floor(Math.random() * categories.length)];
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error loading blog posts</h2>
        <p className="text-gray-600">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      {/* Header section */}
      <div className="border-b border-gray-200 pb-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900">Blog Posts</h1>
          <div className="flex space-x-4">
            <button className="px-4 py-2 text-sm font-medium text-gray-600 border-b-2 border-black">For you</button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500">Following</button>
          </div>
        </div>
        <p className="text-xl text-gray-600 max-w-xl">
          Discover insightful articles on technology, programming, and business.
        </p>
      </div>

      {/* Blog posts grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-lg border bg-white text-gray-800 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="p-6">
                <div className="h-6 w-2/3 mb-2 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="p-6 pt-0">
                <div className="h-24 w-full mb-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex items-center mt-4">
                  <div className="h-8 w-8 rounded-full mr-3 bg-gray-200 animate-pulse"></div>
                  <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {data?.posts.map((post) => (
            <motion.div key={post.id} variants={itemVariants}>
              <div className="rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 h-full flex flex-col bg-white">
                <div className="p-6 pb-0">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <User size={16} className="text-gray-600" />
                    </div>
                    <div>
                      <span className="text-sm font-medium">{}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold leading-tight hover:text-blue-600 transition-colors cursor-pointer">
                    {post.title }
                  </h3>
                </div>
                <div className="p-6 pt-4 flex-grow">
                  <p className="text-gray-700 line-clamp-3">
                    {post.content}
                  </p>
                </div>
                <div className="p-6 pt-0 flex items-center justify-between border-t border-gray-100 mt-auto">
                  <div className="flex items-center space-x-4">
                    <span className="inline-flex items-center text-sm text-gray-500">
                      <Clock size={16} className="mr-1" />
                      {getRandomReadTime()} min read
                    </span>
                    <span className="inline-flex items-center text-sm text-gray-500">
                      <BookOpen size={16} className="mr-1" />
                      {getRandomCategory()}
                    </span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Star size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      <div className="mt-12 flex justify-center">
        <nav className="flex items-center space-x-2" aria-label="Pagination">
          <button
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            <span>Previous</span>
          </button>
          <button
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            aria-current="page"
          >
            1
          </button>
          <button
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            2
          </button>
          <button
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            3
          </button>
          <button
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            aria-label="Next page"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4 ml-2" />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Blog;
