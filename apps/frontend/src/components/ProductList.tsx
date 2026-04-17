import { useGetProducts } from "../hooks/useGetProducts";
import { ProductCard } from "./ProductCard";

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

  export const ProductList = () => {
    const temp_products = useGetProducts();
    return (
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
    );
  };