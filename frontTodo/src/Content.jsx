import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";

function Content() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
export default Content;
