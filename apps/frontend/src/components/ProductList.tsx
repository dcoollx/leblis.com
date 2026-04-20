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
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {[...products, {
    "Product_Name": "Pink Sugar",
    "Image": "https://plus.unsplash.com/premium_vector-1737035301774-79613c87d8bb?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Unit_Price": 5.00,
    "Description": "2 Oz",
    "id": "7374418000000609049"
}].map((product: ZohoProduct) => (
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