import { useNavigate, useParams } from "react-router"
import { useGetProducts } from "../hooks/useGetProducts"
import { Skeleton } from "../components/ui/skeleton"
import { useShoppingCart } from "use-shopping-cart"
import { Button } from "../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useState } from "react"
import { ImageWithFallback } from "../components/figma/ImageWithFallback"
import { Star, Truck, MapPin, ChevronRight } from "lucide-react"
import { Card, CardContent } from "../components/ui/card"

export const Product = () =>{
    const { productId } = useParams()
    const nav = useNavigate()
    const { data: products, isLoading } = useGetProducts();
    const { addItem } = useShoppingCart()
    const [selectedSize, setSelectedSize] = useState<string>("")
    const [quantity, setQuantity] = useState(1)
    const [email, setEmail] = useState("")
    const [subscribed, setSubscribed] = useState(false)
    const [activeTab, setActiveTab] = useState("overview")

    if(!productId){
       nav('/')
       return null
    }
    if(isLoading){
        return (<Skeleton className="h-96 w-full" />)
    }
    const product = (products ?? []).find(p => p.id === productId)
    if(!product) {
        nav('/')
        return null
    }

    const sizes = ["Small", "Medium", "Large", "Extra Large"] // Assuming predefined sizes
    const inventory = product.Inventory ?? 10 // Default inventory if not set
    const isOutOfStock = inventory === 0

    // Mock related products - in real app, fetch similar products
    const relatedProducts = products?.filter(p => p.id !== product.id).slice(0, 4) ?? []

    const handleAddToCart = () => {
        if (!selectedSize) return
        addItem({
            id: `${product.id}-${selectedSize}`,
            image: product.Image,
            name: `${product.Product_Name} - ${selectedSize}`,
            price: Number(product.Unit_Price) * 100,
            description: product.Description,
            sku: product.id,
            currency: 'USD',
            product_data: {
                zoho_product_id: product.id,
                size: selectedSize
            },
            metadata: {
                zoho_product_id: product.id,
                size: selectedSize
            }
        }, {
            count: quantity,
            product_metadata: {
                zoho_product_id: product.id,
                size: selectedSize
            }
        })
    }

    const handleSubscribe = () => {
        // For now, just set subscribed. In real app, send to backend
        setSubscribed(true)
    }

    return (
        <div className="min-h-screen bg-[#f5f3f0] text-[#2a2825]">
            {/* Header */}
            <header className="border-b border-[#e6e1dc] bg-white/95 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <button onClick={() => nav('/')} className="text-xl font-semibold tracking-tight text-[#2a2825] hover:text-[#2a2825]/80">
                            Leblis
                        </button>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-[#2a2825]">
                        <button onClick={() => nav('/')} className="hover:text-[#2a2825]/80">Home</button>
                        <button className="hover:text-[#2a2825]/80">Cart</button>
                    </div>
                </div>
            </header>

            {/* Breadcrumb */}
            <div className="max-w-6xl mx-auto px-4 py-6">
                <nav className="flex items-center space-x-2 text-sm text-[#2a2825]/70">
                    <button onClick={() => nav('/')} className="hover:text-[#2a2825]">Home</button>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-[#2a2825] font-medium">{product.Product_Name}</span>
                </nav>
            </div>

            <main className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-white rounded-[28px] overflow-hidden shadow-[0_25px_80px_rgba(42,40,37,0.08)]">
                            <ImageWithFallback
                                src={product.Image}
                                alt={product.Product_Name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-semibold tracking-tight leading-tight text-[#2a2825] mb-4">{product.Product_Name}</h1>
                            <div className="inline-flex items-center rounded-full bg-[#f5f3f0] px-4 py-2 text-sm font-medium text-[#2a2825]/90">
                                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                                4.6 • 304 reviews
                            </div>
                        </div>

                        <div className="rounded-[28px] bg-white p-8 shadow-[0_20px_60px_rgba(42,40,37,0.08)]">
                            <div className="mb-6">
                                <span className="text-3xl font-bold text-[#2a2825]">${product.Unit_Price}</span>
                                {product.Product_Code && (
                                    <p className="text-sm text-[#2a2825]/70 mt-2">SKU: {product.Product_Code}</p>
                                )}
                            </div>

                            <div className="mb-6">
                                <Label className="text-sm font-semibold text-[#2a2825] mb-3 block">Size</Label>
                                <Select value={selectedSize} onValueChange={setSelectedSize}>
                                    <SelectTrigger className="w-full h-12 border-[#d8d3cd] rounded-2xl bg-[#f5f3f0] text-[#2a2825]">
                                        <SelectValue placeholder="Select a size" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {sizes.map(size => (
                                            <SelectItem key={size} value={size} className="h-10">{size}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="mb-6">
                                <p className={`text-sm font-medium ${isOutOfStock ? 'text-red-600' : 'text-[#2a2825]'}`}>
                                    {isOutOfStock ? "Out of stock" : `${inventory} in stock`}
                                </p>
                            </div>

                            {!isOutOfStock && (
                                <div className="mb-8">
                                    <Label className="text-sm font-semibold text-[#2a2825] mb-3 block">Quantity</Label>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center border border-[#d8d3cd] rounded-2xl bg-[#f5f3f0]">
                                            <button 
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="px-4 py-3 text-[#2a2825] hover:bg-[#e9e6e2] rounded-l-2xl"
                                            >
                                                -
                                            </button>
                                            <span className="px-5 text-center text-[#2a2825]">{quantity}</span>
                                            <button 
                                                onClick={() => setQuantity(Math.min(inventory, quantity + 1))}
                                                className="px-4 py-3 text-[#2a2825] hover:bg-[#e9e6e2] rounded-r-2xl"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mb-8">
                                {isOutOfStock ? (
                                    <div className="space-y-4">
                                        {subscribed ? (
                                            <div className="rounded-3xl bg-[#eaf7ef] p-4 border border-[#cde6d3]">
                                                <p className="text-sm font-semibold text-[#2a2825]">You'll be notified when this item is back in stock.</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                <Label className="text-sm font-semibold text-[#2a2825]">Get notified when back in stock</Label>
                                                <div className="flex flex-col gap-3 sm:flex-row">
                                                    <Input
                                                        type="email"
                                                        placeholder="Enter your email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="flex-1 h-12 rounded-2xl bg-[#f5f3f0] border-[#d8d3cd] text-[#2a2825]"
                                                    />
                                                    <Button 
                                                        onClick={handleSubscribe} 
                                                        disabled={!email}
                                                        className="h-12 px-6 rounded-2xl bg-[#2a2825] text-white hover:bg-[#1f1c1a]"
                                                    >
                                                        Notify Me
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Button 
                                        onClick={handleAddToCart} 
                                        className="w-full h-14 text-lg font-semibold rounded-2xl bg-[#2a2825] text-white hover:bg-[#1f1c1a] mb-8"
                                        disabled={!selectedSize}
                                    >
                                        Add to Bag
                                    </Button>
                                )}

                                <div className="space-y-4 border-t border-[#d8d3cd] pt-8">
                                    <div className="flex items-center gap-3">
                                        <Truck className="w-5 h-5 text-[#2a2825]" />
                                        <div>
                                            <p className="font-semibold text-[#2a2825]">Shipping</p>
                                            <p className="text-sm text-[#2a2825]/80">Free shipping on orders over $50</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin className="w-5 h-5 text-[#2a2825]" />
                                        <div>
                                            <p className="font-semibold text-[#2a2825]">Pickup</p>
                                            <p className="text-sm text-[#2a2825]/80">Check availability at nearby stores</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Information Tabs */}
                <section className="mt-16 border-t border-[#d8d3cd] pt-12">
                    <div className="flex flex-col gap-4 sm:flex-row sm:gap-8 mb-8">
                        {[
                            { id: 'overview', label: 'Overview' },
                            { id: 'usage', label: 'Usage' },
                            { id: 'ingredients', label: 'Ingredients' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`pb-2 font-semibold transition-colors ${
                                    activeTab === tab.id 
                                        ? 'text-[#2a2825] border-b-2 border-[#2a2825]' 
                                        : 'text-[#2a2825]/70 hover:text-[#2a2825]'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="rounded-[28px] bg-white p-8 shadow-[0_20px_60px_rgba(42,40,37,0.08)]">
                        {activeTab === 'overview' && (
                            <div>
                                <p className="text-[#2a2825] text-lg leading-relaxed mb-6">
                                    {product.Full_Description || product.Description}
                                </p>
                                {product.Size && (
                                    <p className="text-[#2a2825]/80">Size: {product.Size} units</p>
                                )}
                            </div>
                        )}
                        {activeTab === 'usage' && (
                            <div>
                                <p className="text-[#2a2825]">Light the wick and enjoy the fragrance for up to 45 hours of burn time.</p>
                            </div>
                        )}
                        {activeTab === 'ingredients' && (
                            <div>
                                <p className="text-[#2a2825]">Contains fragrance oils, wax, and essential oils for a natural scent experience.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="mt-16 border-t border-[#d8d3cd] pt-12">
                        <h2 className="text-2xl font-semibold text-[#2a2825] mb-8">More You'll Love</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map(related => (
                                <Card key={related.id} className="group cursor-pointer hover:shadow-xl transition-shadow rounded-[28px] overflow-hidden">
                                    <CardContent className="p-0">
                                        <div className="aspect-square bg-[#f5f3f0] overflow-hidden">
                                            <ImageWithFallback
                                                src={related.Image}
                                                alt={related.Product_Name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                            />
                                        </div>
                                        <div className="p-4 bg-white">
                                            <h3 className="font-semibold text-[#2a2825] mb-2 line-clamp-2">{related.Product_Name}</h3>
                                            <p className="text-lg font-semibold text-[#2a2825]/90">${related.Unit_Price}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <footer className="border-t border-[#e6e1dc] bg-white py-12">
                <div className="max-w-6xl mx-auto px-4 grid gap-12 md:grid-cols-3">
                    <div>
                        <p className="text-lg font-semibold text-[#2a2825] mb-3">About Leblis</p>
                        <p className="text-sm text-[#2a2825]/80 leading-relaxed">
                            Curated home essentials with a clean, elevated aesthetic. Find charming pieces designed for daily comfort.
                        </p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-[#2a2825] mb-3">Customer Care</p>
                        <ul className="space-y-2 text-sm text-[#2a2825]/80">
                            <li className="hover:text-[#2a2825] cursor-pointer">Shipping</li>
                            <li className="hover:text-[#2a2825] cursor-pointer">Returns</li>
                            <li className="hover:text-[#2a2825] cursor-pointer">Contact</li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-[#2a2825] mb-3">Get in touch</p>
                        <p className="text-sm text-[#2a2825]/80">Sign up for offers, new arrivals, and exclusive deals.</p>
                        <div className="mt-4 flex flex-col sm:flex-row gap-3">
                            <Input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 h-12 rounded-2xl bg-[#f5f3f0] border-[#d8d3cd] text-[#2a2825]"
                            />
                            <Button className="h-12 rounded-2xl bg-[#2a2825] text-white hover:bg-[#1f1c1a]">Subscribe</Button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}