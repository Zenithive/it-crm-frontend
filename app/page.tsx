'use client';
import { useRouter } from "next/navigation";


import { useEffect } from "react";


export default function Home() {

  const router = useRouter();
  const isLoggedIn = () => {

    return !!localStorage.getItem("authToken"); 
};
    useEffect(() => {
        isLoggedIn() 
            ? router.push('/dashboard') 
            : router.push('/login');   
    }, [router]); 
    
  return (
    <>

<p>Loading...</p>; 

   
    </>
  );
}