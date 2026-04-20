import { ShoppingBag } from "lucide-react"
import { motion } from "motion/react"
import { Shoppingcart } from "./Shoppingcart"

export const Header = () => {
    return (<header className="fixed top-0 w-full bg-[#faf9f7]/80 backdrop-blur-md z-50 border-b border-[#e8e5e0]">
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
            <Shoppingcart />
          </button>
        </div>
      </header>)
}