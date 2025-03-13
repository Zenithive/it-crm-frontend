"use client";
import React from 'react'
import IndividualVendorProfile from "../../components/IndividualVendorProfile"
import ResourceList from '../../components/ResourceList'
import { useParams } from 'next/navigation';

const page = () => {

   const { id } = useParams() as { id: string }; // Get the dynamic ID from the URL
  return (
    <div>
      <IndividualVendorProfile vendorId={id} />
      {/* <ResourceList></ResourceList> */}
    </div>
  )
}

export default page
