"use client"
import { useParams } from "next/navigation";
import Individual from "../../components/Individual"


export default function Individual_Lead() {
     const { id } = useParams() as { id: string }; 
     console.log("Lead ID in Individual_Lead:", id);
    return(
        <>
        <Individual leadId={id}/>
        </>
    )
}