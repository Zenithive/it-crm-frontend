// app/auth-check/page.tsx or pages/auth-check.tsx (depending on your Next.js structure)

"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slice/authSlice';

const AuthCheck = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const checkAuth = () => {
      // Get redirect destination
      const redirectTo = searchParams.get('redirect') || '/dashboard';
      
      console.log('AuthCheck: Checking localStorage for authentication...');
      
      // Check for token in localStorage
      const token = localStorage.getItem('token');
      const googleAccessToken = localStorage.getItem('google_access_token');
      const userId = localStorage.getItem('user_id');
      const userEmail = localStorage.getItem('user_email');
      const authProvider = localStorage.getItem('auth_provider');
      
      console.log('Token in localStorage:', token ? 'Found' : 'Not found');
      console.log('Google token in localStorage:', googleAccessToken ? 'Found' : 'Not found');
      
      if (token) {
        console.log('AuthCheck: Authentication found in localStorage');
        
        // Set cookie from localStorage for future server-side checks
        document.cookie = `token=${token}; path=/; max-age=86400; Secure; SameSite=Strict`;
        
        // Compile user data
        const userData = {
          id: userId || '',
          name: localStorage.getItem('user_name') || '',
          email: userEmail || '',
          role: localStorage.getItem('user_role') || '',
          token: token,
          googleAccessToken: googleAccessToken || '',
          authProvider: authProvider || 'Google'
        };
        
        // Store in cookie for server-side access
        document.cookie = `userData=${JSON.stringify(userData)}; path=/; max-age=86400; Secure; SameSite=Strict`;
        
        // Update Redux store
        dispatch(loginSuccess(userData));
        
        // Redirect to the originally requested page
        console.log('AuthCheck: Redirecting to', redirectTo);
        router.push(redirectTo);
      } else {
        // No auth in localStorage either, redirect to login
        console.log('AuthCheck: No authentication found, redirecting to login');
        router.push('/login');
      }
    };
    
    // Run the auth check
    checkAuth();
  }, [router, searchParams, dispatch]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Checking Authentication</h1>
        <p>Please wait while we verify your credentials...</p>
        <div className="mt-4">
          <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default AuthCheck;