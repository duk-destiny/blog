import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Archive from "@/pages/Archive";
import Categories from "@/pages/Categories";
import Tags from "@/pages/Tags";
import About from "@/pages/About";
import Article from "@/pages/Article";
import Messages from "@/pages/messages";
import AllBlog from "@/pages/AllBlog";
import Resume from "@/pages/Resume";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-blog" element={<AllBlog />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/message" element={<Messages />} />
        <Route path="/about" element={<About />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/article/:id" element={<Article />} />
      </Routes>
    </Router>
  );
}
