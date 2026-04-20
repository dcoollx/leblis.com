import { useMutation } from "@tanstack/react-query";
import { useZohoClient } from "./useZohoClient";
import { CartDetails } from "use-shopping-cart/core";

export const useShoppingCartSession = () => {
    const zohoClient = useZohoClient();
    // we dont want to re-use this query, we should create a new session every time
    return useMutation({ mutationKey: ['shopping-cart-session'], mutationFn: (cartDetails: CartDetails) => zohoClient.getShoppingCartSession(cartDetails) });
}