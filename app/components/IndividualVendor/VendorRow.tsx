import React from "react";
import { formatText } from "../../utils/formatHelpers"; 
import { getStatusColor1 } from "../../utils/colorHelpers";
import { useRouter } from "next/navigation";

interface Vendor {
  vendorID: string;
  vendor: string;
  location: string;
  resources: string;
  rating: number;
  status: string;
}

interface VendorRowProps {
  vendor: Vendor;
}

const VendorRow: React.FC<VendorRowProps> = ({ vendor }) => {
const router = useRouter();

const handleVendorClick = () => {
  if (vendor.vendorID) {
  
    console.log(`/individualvendor/${vendor.vendorID}`);
    router.push(`/individualvendor/${vendor.vendorID}`);
  } else {
    console.error("Vendor ID is missing");
    console.log(vendor);
  }
};

  return (
    <tr  className="hover:bg-gray-50">
      <td className="px-6 py-6 cursor-pointer" onClick={handleVendorClick}>{vendor.vendor}</td>
      <td className="px-6 py-6">{vendor.location}</td>
      <td className="px-6 py-6">
        <span className="px-3 py-1 rounded-lg text-sm bg-blue-shadow-color text-bg-blue-12">
          {vendor.resources}
        </span>
      </td>
      <td className="px-6 py-6 flex">
        {vendor.rating}
        <img src="/Star_icon.svg" alt="Rate" className="ml-2" />
      </td>
      <td className="px-6 py-6">
        <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${getStatusColor1(vendor.status)}`}>
          {formatText(vendor.status)}
        </span>
      </td>
      <td className="flex px-6 py-6 space-x-2">
        <img src="/edit.svg" alt="Edit" />
        <img src="/delete.svg" alt="Delete" className="px-4" />
      </td>
    </tr>
  );
};

export default VendorRow;
