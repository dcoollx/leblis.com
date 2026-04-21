import { ZohoProduct } from "../api/zoho/Zoho.types";
import { useGetProducts } from "../hooks/useGetProducts";
import { ProductCard } from "./ProductCard";
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'
import { Skeleton } from "./ui/skeleton";


  export const ProductList = () => {
    let { data: products, isLoading } = useGetProducts();
    const { addItem } = useShoppingCart();
    if (isLoading) {
      return <Skeleton className="w-full h-64" />;
    }
    if (!products || products.length === 0) {
      products = []
    }
    console.log(products, 'products');
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {products.map((product: ZohoProduct) => (
        <a role="button"  key={product.id} onClick={(_)=>{
          addItem({
            id: product.id,
            name: product.Product_Name,
            price: Number(product.Unit_Price) * 100, // use-shopping-cart expects price in cents
            description: product.Description,
            sku: product.id,
            currency: 'USD',
          })
        }}>
          <ProductCard
            name={product.Product_Name}
            price={formatCurrencyString({ value: product.Unit_Price * 100, currency: 'USD' })}
            image={product.Image ?? 'https://placehold.co/300x200?text=No+Image'}
            description={product.Description}
          />
          </a>
        ))}
      </div>
    );
  };