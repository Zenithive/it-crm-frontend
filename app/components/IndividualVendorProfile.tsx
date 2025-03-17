"use client"
import React from 'react'

import VendorLayout from './IndividualVendor/VendorLayout'

const IndividualVendorProfile = ({ vendorId }: { vendorId: string }) => {
  return (
    <div>
      <VendorLayout vendorId={vendorId}/>
    </div>
  )
}

export default IndividualVendorProfile
