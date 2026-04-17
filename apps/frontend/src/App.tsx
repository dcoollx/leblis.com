import { motion } from "motion/react";
import { ProductCard } from "./components/ProductCard";
import { ShoppingBag } from "lucide-react";

export default function App() {
  const products = [
    {
      name: "Lavender Dreams",
      price: "$24",
      image: "https://images.unsplash.com/photo-1765964492963-b0aa8c172431?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "Calming lavender body butter"
    },
    {
      name: "Citrus Bliss",
      price: "$22",
      image: "https://images.unsplash.com/photo-1693004926638-d2e47d705229?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "Refreshing citrus whipped cream"
    },
    {
      name: "Vanilla Silk",
      price: "$26",
      image: "https://images.unsplash.com/photo-1762840192336-575fba31d28c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "Rich vanilla body butter"
    },
    {
      name: "Rose Petal",
      price: "$28",
      image: "https://images.unsplash.com/photo-1626704377346-7453fc9bd17f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "Delicate rose-infused lotion"
    },
    {
      name: "Mint Refresh",
      price: "$23",
      image: "https://images.unsplash.com/photo-1655717676040-26209d5b9884?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "Cooling mint body cream"
    },
    {
      name: "Honey Glow",
      price: "$25",
      image: "https://images.unsplash.com/photo-1620740168096-d48b4ac47165?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "Nourishing honey butter"
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Header */}
      <header className="fixed top-0 w-full bg-[#faf9f7]/80 backdrop-blur-md z-50 border-b border-[#e8e5e0]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-[#2a2825] hover:text-[#6b6560] transition-colors cursor-pointer">
            Shop
          </div>
          <motion.h1
            className="absolute left-1/2 -translate-x-1/2 text-4xl"
            style={{ fontFamily: "'Cormorant', serif", fontStyle: "italic", fontWeight: 600 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            le blis
          </motion.h1>
          <button className="text-[#2a2825] hover:text-[#6b6560] transition-colors">
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-[calc(100svh-73px)] mt-[73px] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="https://images.pexels.com/photos/12516060/pexels-photo-12516060.jpeg"
            alt="Natural skincare"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#faf9f7]/40" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-3xl">
          <motion.h2
            className="text-7xl md:text-8xl lg:text-9xl mb-6 text-[#2a2825]"
            style={{ fontFamily: "'Cormorant', serif", fontStyle: "italic", fontWeight: 600 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            le blis
          </motion.h2>
          <motion.p
            className="text-xl text-[#2a2825] mb-8 tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Handcrafted lotions and butters for radiant skin
          </motion.p>
          <motion.button
            className="bg-[#2a2825] text-[#faf9f7] px-8 py-3 hover:bg-[#3d3834] transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Shop Collection
          </motion.button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-5xl md:text-6xl mb-4 text-[#2a2825]"
            style={{ fontFamily: "'Cormorant', serif", fontStyle: "italic", fontWeight: 600 }}
          >
            Our Collection
          </h2>
          <p className="text-[#6b6560] max-w-2xl mx-auto">
            Each product is carefully handcrafted with natural ingredients to nourish and pamper your skin
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              name={product.name}
              price={product.price}
              image={product.image}
              description={product.description}
            />
          ))}
        </div>
      </section>

      {/* About */}
      <section className="bg-[#f5f3f0] py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              className="text-5xl md:text-6xl mb-6 text-[#2a2825]"
              style={{ fontFamily: "'Cormorant', serif", fontStyle: "italic", fontWeight: 600 }}
            >
              Crafted with Care
            </h2>
            <p className="text-lg text-[#6b6560] max-w-3xl mx-auto leading-relaxed mb-12">
              Every jar of le blis is made by hand in small batches using only the finest natural ingredients.
              We believe in the power of pure, simple formulas that let your skin breathe and flourish.
              No harsh chemicals, no synthetic fragrances—just honest skincare that works.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
              <div>
                <h3 className="text-2xl mb-2 text-[#2a2825]" style={{ fontFamily: "'Cormorant', serif", fontStyle: "italic" }}>
                  100% Natural
                </h3>
                <p className="text-[#6b6560]">
                  Pure ingredients from nature
                </p>
              </div>
              <div>
                <h3 className="text-2xl mb-2 text-[#2a2825]" style={{ fontFamily: "'Cormorant', serif", fontStyle: "italic" }}>
                  Small Batch
                </h3>
                <p className="text-[#6b6560]">
                  Handcrafted with attention to detail
                </p>
              </div>
              <div>
                <h3 className="text-2xl mb-2 text-[#2a2825]" style={{ fontFamily: "'Cormorant', serif", fontStyle: "italic" }}>
                  Cruelty Free
                </h3>
                <p className="text-[#6b6560]">
                  Never tested on animals
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="text-5xl md:text-6xl mb-6 text-[#2a2825]"
            style={{ fontFamily: "'Cormorant', serif", fontStyle: "italic", fontWeight: 600 }}
          >
            Experience the Difference
          </h2>
          <p className="text-lg text-[#6b6560] mb-8 max-w-2xl mx-auto">
            Discover the luxury of handmade skincare. Your skin deserves the best.
          </p>
          <motion.button
            className="bg-[#2a2825] text-[#faf9f7] px-10 py-4 text-lg hover:bg-[#3d3834] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Shop Now
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e8e5e0] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p
              className="text-3xl text-[#2a2825]"
              style={{ fontFamily: "'Cormorant', serif", fontStyle: "italic", fontWeight: 600 }}
            >
              le blis
            </p>
            <div className="flex gap-8 text-[#6b6560]">
              <a href="#" className="hover:text-[#2a2825] transition-colors">About</a>
              <a href="#" className="hover:text-[#2a2825] transition-colors">Contact</a>
              <a href="#" className="hover:text-[#2a2825] transition-colors">Instagram</a>
            </div>
          </div>
          <div className="text-center mt-8 text-sm text-[#6b6560]">
            © 2026 le blis. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}