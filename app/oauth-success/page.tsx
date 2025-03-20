"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slice/authSlice';

const OAuthCallback = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    // Function to get query parameters from URL
    function getQueryParam(param: string) {
      if (typeof window === 'undefined') return null;
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    }

    // Function to decode JWT token
    function decodeJWT(token: string) {
      try {
        // Split the token and get the payload part (middle)
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
      } catch (e) {
        console.error('Error decoding JWT:', e);
        return null;
      }
    }

    // Get token from URL query parameters
    const accessToken = getQueryParam('backend_access_token');
    const googleAccessToken = getQueryParam('google_access_token');
    // Check if email is provided directly in URL (some OAuth providers might do this)

    console.log("Received callback with token:", accessToken);
    console.log("Received Google access token:", googleAccessToken);
    
    if (accessToken) {
      // Decode the JWT to get user info
      const decodedToken = decodeJWT(accessToken);
      console.log("Decoded token:", decodedToken);
      
      if (decodedToken) {
        const userId = decodedToken.user_id;
        const authProvider = decodedToken.auth_provider;
        const userName = decodedToken.name;
        const userRole = decodedToken.role;
        const userEmail = decodedToken.email; 
        
        console.log("User ID:", userId);
        console.log("Auth Provider:", authProvider);
        console.log("Conditions met for redirect:", Boolean(accessToken && userId));
        
        // Store auth data in localStorage
        localStorage.setItem('token', accessToken);
        if (googleAccessToken) localStorage.setItem('google_access_token', googleAccessToken);
        if (userId) localStorage.setItem('user_id', userId);
        if (authProvider) localStorage.setItem('auth_provider', authProvider);
        
        // Update Redux store with ALL information including Google token
        const userData = {
          id: userId,
          name: userName || '',
          email: userEmail || '',
          role: userRole || '',
          token: accessToken,
          googleAccessToken: googleAccessToken || '', // Include Google token in Redux
          authProvider: authProvider || 'Google'
        };
        
        dispatch(loginSuccess(userData));
        
        // Try multiple redirect approaches with delay
        console.log("Attempting to redirect to dashboard...");
        
        // Use a single approach for redirection to avoid multiple redirects
        setTimeout(() => {
          console.log("Executing redirect to dashboard");
          window.location.href = "/dashboard";
        }, 500);
      } else {
        // Handle invalid token
        console.error('Authentication failed: Invalid token format');
        router.push('/login');
      }
    } else {
      // Handle authentication error
      console.error('Authentication failed: Missing token');
      router.push('/login');
    }
  }, [dispatch, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Completing Login...</h1>
        <p>Please wait while we complete your authentication.</p>
        <div className="mt-4">
          <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default OAuthCallback;