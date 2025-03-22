import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blog from "./pages/Blog";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import { Toaster } from "sonner";
import BlogContent from "./pages/BlogContent";
import Landing from "./pages/Landing";

function App() {
  return (
    <>
      <Toaster position="bottom-right" richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/blog/:id" element={<BlogContent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
