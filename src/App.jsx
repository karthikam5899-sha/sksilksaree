import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import TrackOrder from "./pages/TrackOrder";
import CustomerCare from "./pages/CustomerCare";
import { ShopProvider } from "./context/ShopContext";
import IntroSplash from "./components/IntroSplash";

export default function App() {
  return (
    <ThemeProvider>
      <ShopProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/track" element={<TrackOrder />} />
          <Route path="/care/:slug" element={<CustomerCare />} />
        </Routes>
        <IntroSplash />
      </ShopProvider>
    </ThemeProvider>
  );
}