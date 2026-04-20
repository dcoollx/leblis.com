import { QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./pages/Home";
import { queryClient } from "./util/queryClient";
import { CartProvider } from 'use-shopping-cart'
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { Checkout } from "./pages/Checkout";


export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider shouldPersist={true} cartMode="checkout-session" stripe={import.meta.env.VITE_STRIPE_KEY} currency="USD">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Router>
      </CartProvider>
    </QueryClientProvider>
  );
}