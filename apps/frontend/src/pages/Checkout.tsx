import { loadStripe } from '@stripe/stripe-js';

const isProduction = import.meta.env.PROD
let stripeKey = '';
if(isProduction) {
    stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
}
else {
    stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY_TEST
}
const stripe = loadStripe(stripeKey)

export const Checkout = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-stone-900">
                        Checkout
                    </h2>
                    <p className="mt-2 text-center text-sm text-stone-600">
                        Please review your order before proceeding to payment.
                    </p>
                </div>
            </div>
        </div>
    )

}