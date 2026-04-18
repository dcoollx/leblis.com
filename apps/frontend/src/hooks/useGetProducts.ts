import { useQuery } from "@tanstack/react-query";
import { useZohoClient } from "./useZohoClient";

export const useGetProducts = () => {
    const zohoClient = useZohoClient();
    return useQuery({ queryKey: ['products'], queryFn: () => zohoClient.getProducts() });
}