import React from "react";
import VendorRow from "./VendorRow";

interface Vendor {
  vendorID: string;
  vendor: string;
  location: string;
  resources: string;
  rating: number;
  status: string;
  paymentTerms?:string;
  gstOrVatDetails?:string;
  notes?:string;
  country?: string;
  skillIDs?: string[];
}

interface VendorTableProps {
  vendors: Vendor[];
}

const VendorTable: React.FC<VendorTableProps> = ({ vendors }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-custom">
      <table className="min-w-full bg-white">
        <thead className="bg-bg-blue-12 text-white">
          <tr>
            <th className="px-6 py-3 text-left">Vendor</th>
            <th className="px-6 py-3 text-left">Location</th>
            <th className="px-6 py-3 text-left">Resource</th>
            <th className="px-6 py-3 text-left">Rating</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {vendors.map((vendor) => (
            <VendorRow key={vendor.vendorID} vendor={vendor} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorTable;
