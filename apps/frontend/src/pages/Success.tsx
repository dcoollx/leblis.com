import { useEffect } from "react"
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart"
import { Button } from "../components/ui/button"

// page thanking customer for their order and showing order summary
export const Success = () => {
    const { formattedTotalPrice, clearCart, cartDetails } = useShoppingCart()
    useEffect(()=>{
        // add unload event
        const unload = (e: BeforeUnloadEvent)=>{
            e.preventDefault()
            clearCart();
        }
         window.addEventListener('beforeunload', unload)
        return window.removeEventListener('beforeunload', unload);
    }, [])
    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h1 className="text-2xl font-bold text-center text-stone-900">Thank you for your order!</h1>
                    <p className="text-stone-600 text-center mt-2">Your order has been received and is being processed.</p>
                </div>
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-lg font-medium text-stone-900 mb-4">Order Summary</h2>
                    <ul className="divide-y divide-stone-200">
                        <li className="py-2">
                            <span className="text-stone-600">Order ID:</span>
                            <span className="font-medium">1</span>
                        </li>
                        <li className="flex flex-row justify-between">
                            <span>Item</span>
                            <span>Price</span>
                            <span>Quantity</span>
                        </li>
                            {Object.entries(cartDetails!).map(([_, item])=>{
                                return (
                                <li key={item.id} className="flex flex-row justify-between">
                                   <span> {item.name}</span>
                                    <span>{formatCurrencyString({ value: item.price, currency: 'USD' })}</span>
                                    <span>{item.quantity}</span>
                                </li>)
                            })}
                        <li className="py-2">
                            <span className="text-stone-600">Total:</span>
                            <span className="font-medium">{formattedTotalPrice}</span>
                        </li>
                    </ul>
                </div>

            </div>

            <Button onClick={(_)=>{window.location.href = '/'}} className="fixed bottom-2 right-2">Return To Shop</Button>
        </div>
    )
}