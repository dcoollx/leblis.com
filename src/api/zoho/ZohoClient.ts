import axios, { type AxiosResponse } from 'axios';
import type { ZohoContact } from './Zoho.types';

type ZohoTokenResponse = {
    accessToken: string;
    refreshToken: string;
};

type ZohoClientParams = {
    grant_type: string,
    client_id: string,
    client_secret: string,
    refresh_token: string,
}

export class ZohoClient {
    axiosInstance: import("axios").AxiosInstance;
    private grantType: string;
    private clientId: string
    private clientSecret: string;
    constructor({
        grant_type,
        client_id,
        client_secret,
        refresh_token,
        }: ZohoClientParams) {
        this.grantType = grant_type;
        this.clientId = client_id;
        this.clientSecret = client_secret;
        localStorage.setItem('refreshToken', refresh_token);


        this.axiosInstance = axios.create({
            baseURL: 'https://www.zohoapis.com/Bigin/v2',
            headers: {
                 Authorization: `Zoho-oauthtoken $`, // initial empty token, will be set by the interceptor after refreshing
                'Content-Type': 'application/json',
            }

        });
        this.axiosInstance.interceptors.response.use(
            response => response, // Directly return successful responses.
            async error => {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
            try {
               
                // Make a request to your auth server to refresh the token.
                const response = await this.getToken()
                const { accessToken, refreshToken: newRefreshToken } = response.data;
                // Store the new access and refresh tokens.
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', newRefreshToken);
                // Update the authorization header with the new access token.
                this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                return this.axiosInstance(originalRequest); // Retry the original request with the new access token.
            } catch (refreshError) {
                // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
                console.error('Token refresh failed:', refreshError);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
            }
            return Promise.reject(error); // For all other errors, return the error as is.
  }
);
    }
    async getRefreshTokens(): Promise<AxiosResponse<ZohoTokenResponse>> {
    const refreshToken = localStorage.getItem('refreshToken'); // Retrieve the stored refresh token.
    const response = await this.axiosInstance.post(`https://accounts.zoho.com/oauth/v2/token?refresh_token=${refreshToken}&client_id=${this.clientId}&client_secret=${this.clientSecret}&grant_type=refresh_token`);
    return response.data;

    }

    async getToken() {
        const refreshToken = localStorage.getItem('refreshToken');
        return this.axiosInstance.post('https://accounts.zoho.com/oauth/v2/token', {
            grant_type: this.grantType,
            client_id: this.clientId,
            client_secret: this.clientSecret,
            refresh_token: refreshToken
        });
    }

    async createContact(newContatct: ZohoContact) {
        return this.axiosInstance.post('/Contacts', newContatct);
    }

    async getProducts() {
        return this.axiosInstance.get('/Products'); // only gets first 200 products
    }
}