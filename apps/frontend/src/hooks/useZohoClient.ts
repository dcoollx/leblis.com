import { ZohoClient } from "../api/zoho/ZohoClient";
import { useMemo } from "react";



export const useZohoClient = () => {
    // memoize the ZohoClient instance to avoid creating a new instance on every render
    const zohoClient = useMemo(() => {
        
        const client = new ZohoClient();
        return client;
    }, []);
    return zohoClient;
} 