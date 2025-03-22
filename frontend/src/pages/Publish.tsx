
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import Navbar from "../components/Navbar";

const Publish = () => {
  const [content, setContent] = useState("");  
  const [title, settitle] = useState("");
  const [isSubmitting,setIsSubmitting] = useState(false)

  async function submit(){
    if(!content.trim() || !title.trim()){
        toast.error("Please fill in all fields");
        return;
    }

    const blogContent = {
        title,
        content
    }
    setIsSubmitting(true)

    try{
        const accessToken = localStorage.getItem("accessToken")
        const blog = await axios.post("https://am-i-blogging.chandansahoo02468.workers.dev/api/v1/blog/create",blogContent,{
            headers : {
                Authorization : accessToken
            }
        })
        toast.success("Blog has been posted");
        setContent("");
        settitle("");
        setIsSubmitting(false);
        console.log("Response data",blog);
    }catch(error){
        toast.error("Failed to post the blog");
    }
  }

  return (
    <>
    <Navbar/>
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      <div className="border-b border-gray-200 pb-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Publish Your Blog Post</h1>
        <p className="text-xl text-gray-600 max-w-xl">
          Share your thoughts and insights with our community. Create and publish your own blog post.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              id="title"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            //   placeholder="Enter your blog post title"
              value={title}
              onChange={(e)=>settitle(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              id="content"
              rows={10}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            //   placeholder="Write your blog post content here..."
              value={content}
              onChange={(e)=>setContent(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isSubmitting ? "opacity-50 cursor-not-allowed":"opacity-100"}`}
            onClick={submit}
            disabled={isSubmitting}
            >
              {isSubmitting ? "Publishing..." : "Publish Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Publish;