import { useMutation } from "@tanstack/react-query";
import { useZohoClient } from "./useZohoClient";
import { CartDetails } from "use-shopping-cart/core";
import { useShoppingCart } from "use-shopping-cart";

export const useShoppingCartSession = () => {
    const zohoClient = useZohoClient();
    const { redirectToCheckout } = useShoppingCart();
    // we dont want to re-use this query, we should create a new session every time
    return useMutation({ mutationKey: ['shopping-cart-session'], onSuccess: ({ sessionUrl })=> redirectToCheckout(sessionUrl), mutationFn: (cartDetails: CartDetails) => zohoClient.getShoppingCartSession(cartDetails) });
}