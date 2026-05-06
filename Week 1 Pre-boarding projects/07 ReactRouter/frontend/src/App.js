import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "20px", width: "100%", color: "black" }}>
          <Routes>
            <Route path="/" element={<Home />} />         # If URL is '/' show home
            <Route path="/about" element={<About />} />  # if URLl is '/about' show about
            <Route path="/contact" element={<Contact />} />  #if URL is '/contact' show contact
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;