import { ZohoClient } from '../api/zoho/ZohoClient'

export const useZohoClient = () => {
    const { grant_type, client_id, client_secret, refresh_token } = process.env;
    if(!grant_type || !client_id || !client_secret || !refresh_token) {
        throw new Error('Missing Zoho API credentials in environment variables');
    }
    const zohoClient = new ZohoClient({
        grant_type,
        client_id,
        client_secret,
        refresh_token,
    });
    return zohoClient;
}