// App.js
// root component
// sets up routing so each URL shows a different page
// BrowserRouter → enables routing in the whole app
// Routes → container for all route definitions
// Route → maps a URL path to a component

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar      from "./components/Navbar";
import Timeline    from "./pages/Timeline";
import AddTripPage from "./pages/AddTripPage";
import Wishlist    from "./pages/Wishlist";

function App() {
  return (
    // BrowserRouter wraps everything
    // makes routing available to all child components
    <BrowserRouter>

      {/* Navbar shows on every page */}
      <Navbar />

      {/* Routes defines which component shows for which URL */}
      <Routes>

        {/* / → show Timeline page */}
        <Route path="/"         element={<Timeline />} />

        {/* /add → show AddTripPage */}
        <Route path="/add"      element={<AddTripPage />} />

        {/* /wishlist → show Wishlist page */}
        <Route path="/wishlist" element={<Wishlist />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;