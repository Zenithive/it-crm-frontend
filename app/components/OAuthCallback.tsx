// app/oauth-callback/page.tsx or pages/oauth-callback.tsx (depending on your Next.js structure)

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

    // Check for error parameter first
    const error = getQueryParam('error');
    if (error) {
      console.error('OAuth error:', error);
      // Handle error case
      router.push('/login?error=' + encodeURIComponent(error));
      return;
    }

    // Check for state parameter to validate OAuth flow
    const state = getQueryParam('state');
    const code = getQueryParam('code');
    console.log('OAuth state:', state);
    console.log('OAuth code:', code);

    // If this is the OAuth callback from our backend with the token (not the Google callback)
    const accessToken = getQueryParam('backend_access_token');
    console.log('Backend access token:', accessToken);
    
    if (accessToken) {
      // We already have our backend token, process it
      processBackendToken(accessToken);
    } else if (code && state) {
      // We have the Google code but need to exchange it for a token
      // Your backend should handle this and redirect back with tokens
      console.log('Need to exchange code for token');
    } else {
      // No authentication information found
      console.error('No authentication information found in callback');
      router.push('/login');
    }
  }, [dispatch, router]);

  // Process backend token
  const processBackendToken = (token: string) => {
    try {
      // Store the token
      localStorage.setItem('token', token);
      
      // Set cookie with token
      document.cookie = `token=${token}; path=/; max-age=86400; Secure; SameSite=Strict`;
      
      // Decode JWT token
      const decodedToken = decodeJWT(token);
      
      if (decodedToken) {
        const userData = {
          id: decodedToken.user_id || decodedToken.sub,
          name: decodedToken.name || '',
          email: decodedToken.email || '',
          role: decodedToken.role || '',
          token: token,
          authProvider: 'Google'
        };
        
        // Store user data in cookie
        document.cookie = `userData=${JSON.stringify(userData)}; path=/; max-age=86400; Secure; SameSite=Strict`;
        
        // Update Redux store
        dispatch(loginSuccess(userData));
        
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        console.error('Failed to decode token');
        router.push('/login');
      }
    } catch (error) {
      console.error('Error processing token:', error);
      router.push('/login');
    }
  };

  // Function to decode JWT token
  function decodeJWT(token: string) {
    try {
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Authentication in Progress</h1>
        <p>Please wait while we complete your authentication...</p>
        <div className="mt-4">
          <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default OAuthCallback;