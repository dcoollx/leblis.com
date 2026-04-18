import { useGetProducts } from "../hooks/useGetProducts";
import { ProductCard } from "./ProductCard";


  export const ProductList = () => {
    const { data: products, isLoading } = useGetProducts();
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (!products || products.length === 0) {
      return <div>No products found.</div>;
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            name={product.Product_Name}
            price={Number(product.Unit_Price).toFixed(2)}
            image={product.Image ?? 'https://placehold.co/300x200?text=No+Image'}
            description={product.Description}
          />
        ))}
      </div>
    );
  };