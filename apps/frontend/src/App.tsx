import { QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./pages/Home";
import { queryClient } from "./util/queryClient";
import { CartProvider } from 'use-shopping-cart'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { Checkout } from "./pages/Checkout";
import { Success } from "./pages/Success";


export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider shouldPersist={true} cartMode="checkout-session" stripe={import.meta.env.VITE_STRIPE_KEY_PUBLIC} currency="USD">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success/>} />
            <Route path="*" element={<Navigate to="/"/>} />
          </Routes>
        </Router>
      </CartProvider>
    </QueryClientProvider>
  );
}