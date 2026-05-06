import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Timeline from "./pages/Timeline";
import JournalEntry from "./pages/JournalEntry";
import Wishlist from "./pages/Wishlist";
import TripDetail from "./pages/TripDetail";
import TripStatistics from "./pages/TripStatistics";
import Gallery from "./pages/Gallery";
import ExpensesBreakdown from "./pages/ExpensesBreakdown";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"                element={<Timeline />} />
        <Route path="/journal"         element={<JournalEntry />} />
        <Route path="/wishlist"        element={<Wishlist />} />
        <Route path="/trip/:id"        element={<TripDetail />} />          
        <Route path="/statistics"      element={<TripStatistics />} />      
        <Route path="/gallery"         element={<Gallery />} />             
        <Route path="/expenses"        element={<ExpensesBreakdown />} />   
      </Routes>
    </BrowserRouter>
  );
}

export default App;