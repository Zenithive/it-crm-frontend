'use client';
import { useRouter } from "next/navigation";
import Login from "./components/Login";
import { useEffect } from "react";
import DashboardP from "./dashboard/page";

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