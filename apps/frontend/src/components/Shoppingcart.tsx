import { ShoppingBag, Plus, Minus, X, ShoppingCart } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { useShoppingCart } from "use-shopping-cart"
import { useShoppingCartSession } from "../hooks/useShoppingCartSession"

export const Shoppingcart = () => {
    const { mutate: createShoppingCartSession } = useShoppingCartSession();
    const { cartCount, cartDetails, formattedTotalPrice, decrementItem, incrementItem, removeItem } = useShoppingCart()
    if(!cartDetails) return null;



    const items = Object.entries(cartDetails)
    const isEmpty = items.length === 0

    return (
        <Popover>
            <PopoverTrigger className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-stone-100 transition-colors">
                <ShoppingBag className="w-5 h-5 text-stone-700" />
                {cartCount !== 0 && (
                    <span className="text-sm font-medium text-stone-700">{cartCount}</span>
                )}
            </PopoverTrigger>
            <PopoverContent 
                align="end" 
                className="p-0 overflow-hidden" 
                style={{ width: "420px", maxHeight: "85vh" }}
            >
                <div className="flex flex-col h-full max-h-[85vh] bg-white">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
                        <h2 className="text-lg font-serif font-medium text-stone-900">Your Bag</h2>
                        <span className="text-sm text-stone-500">{cartCount} {cartCount === 1 ? 'item' : 'items'}</span>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto px-6 py-4">
                        {isEmpty ? (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <ShoppingCart className="w-12 h-12 text-stone-300 mb-4" />
                                <p className="text-stone-500 font-light">Your bag is empty</p>
                                <p className="text-stone-400 text-sm mt-1">Add something to get started</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {items.map(([id, item]) => (
                                    <div key={id} className="flex gap-4 group">
                                        {/* Product Image */}
                                        <div className="w-20 h-24 bg-stone-100 rounded-sm overflow-hidden flex-shrink-0">
                                            {item.image ? (
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-stone-300">
                                                    <ShoppingBag className="w-6 h-6" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-sm font-medium text-stone-900 truncate pr-2">
                                                    {item.name}
                                                </h3>
                                                <button 
                                                    onClick={() => removeItem(id)}
                                                    className="text-stone-400 hover:text-stone-600 transition-colors p-1"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <p className="text-sm text-stone-500 mt-1">{item.formattedPrice}</p>
                                            
                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3 mt-3">
                                                <div className="flex items-center border border-stone-200 rounded-full">
                                                    <button 
                                                        onClick={() => decrementItem(id)}
                                                        className="p-1.5 hover:bg-stone-50 transition-colors rounded-l-full"
                                                    >
                                                        <Minus className="w-3 h-3 text-stone-600" />
                                                    </button>
                                                    <span className="px-3 text-sm text-stone-700 min-w-[2rem] text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button 
                                                        onClick={() => incrementItem(id)}
                                                        className="p-1.5 hover:bg-stone-50 transition-colors rounded-r-full"
                                                    >
                                                        <Plus className="w-3 h-3 text-stone-600" />
                                                    </button>
                                                </div>
                                                <span className="text-sm text-stone-600">
                                                    {item.formattedValue && (
                                                        <>${(item.price * item.quantity / 100).toFixed(2)}</>
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {!isEmpty && (
                        <div className="border-t border-stone-200 px-6 py-5 space-y-4 bg-stone-50">
                            <div className="flex justify-between items-center">
                                <span className="text-stone-600">Subtotal</span>
                                <span className="text-lg font-medium text-stone-900">{formattedTotalPrice}</span>
                            </div>
                            <p className="text-xs text-stone-400">Shipping & taxes calculated at checkout</p>
                            <Button onClick={(_)=>{createShoppingCartSession(cartDetails)}} className="w-full bg-stone-900 hover:bg-stone-800 text-white h-11 rounded-full font-medium">
                                    Continue to Checkout
                            </Button>
                            <button className="w-full text-sm text-stone-500 hover:text-stone-700 transition-colors">
                                Continue Shopping
                            </button>
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    )
}