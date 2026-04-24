import { motion, rgba } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { PlusSquareIcon } from "lucide-react";

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  description: string;
}

export function ProductCard({ name, price, image, description }: ProductCardProps) {
  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="relative aspect-[3/4] overflow-hidden bg-[#f5f3f0] mb-4"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <motion.div style={{
          position: 'absolute',
          bottom: '0px',
          zIndex: 1000,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '15px',
          backgroundColor: rgba.transform({ red: 255, green: 255, blue: 255, alpha: 0.3})
        }}>
          <div>
          <h3 className="text-[#2a2825]">{name}</h3>
          <p className="text-sm text-[#6b6560]">{description}</p>
          <p className="text-[#2a2825] mt-2">{price}</p>
          </div>
          <motion.div title="add to cart">
            <PlusSquareIcon  />
          </motion.div>
        </motion.div>
      
      </motion.div>
    </motion.div>
  );
}
