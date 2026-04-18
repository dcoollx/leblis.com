import { motion } from "motion/react"

export const Hero = () => {
    return ( 
        <section className="relative h-[calc(100svh-73px)] mt-[73px] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            style={{ maxWidth: "2500px", margin: "0 auto" }}
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
          onClick={(_)=>{
            // scroll to products section
            window.scrollTo({ behavior: 'smooth', top: 2000})
          }}
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
    )
}