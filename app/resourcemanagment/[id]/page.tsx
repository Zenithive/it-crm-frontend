"use client"
import React from 'react'
import ResourceManagment from '../../components/ResourceManagment'
import { useParams } from "next/navigation";

const page = () => {
  const { id } = useParams() as { id: string }; // Get the dynamic ID from the URL
  return (
    <div>
      <ResourceManagment ResourceId={id}/>
    </div>
  )
}

export default page
