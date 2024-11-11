import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";
const Signup = lazy(() => import("./pages/signup"));
const Signin = lazy(() => import("./pages/signin"));
const Blog = lazy(() => import("./pages/blog"));
const Blogs = lazy(() => import("./pages/Blogs"));
import Loader from "./components/loder";
import Navbar from "./components/Navbar";
import { RecoilRoot } from "recoil";
import { Suspense } from "react";
function App() {
  const Loading = () => (
    <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
  );
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/blogs" element={<Blogs />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
