import { useGetProducts } from "../hooks/useGetProducts";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "./ui/skeleton";


  export const ProductList = () => {
    let { data: products, isLoading } = useGetProducts();
    if (isLoading) {
      return <Skeleton className="w-full h-64" />;
    }
    if (!products || products.length === 0) {
      products = []
    }
    console.log(products, 'products');
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {products.map((product) => (
        <a href={`/product/${product.id}`}  key={product.id} >
          <ProductCard product={product} />
          </a>
        ))}
      </div>
    );
  };