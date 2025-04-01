// VendorRow.tsx (updated)
import React, { useState, useEffect } from "react";
import { formatText } from "../../utils/formatHelpers";
import { getStatusColor1 } from "../../utils/colorHelpers";
import { useRouter } from "next/navigation";
import VendorForm from "./VendorForm";
import DeleteConfirmation from "../DeleteConfirmation";
import { useDeleteVendor } from "../../api/apiService/deleteVendorApiService";
import { useVendors } from "../../api/apiService/overallvendorApiService";
import { createPortal } from "react-dom";

interface Vendor {
  vendorID: string;
  vendor: string;
  location: string;
  resources: string;
  rating: number;
  status: string;
  paymentTerms?: string;
  gstOrVatDetails?: string;
  notes?: string;
  skillIDs?: string[];
  country?: string;
}

interface CompanyProfile {
  companyName: string;
  status: string;
  address: string;
  skills: Array<{ skillID: string; name: string; description?: string }>;
  paymentTerms: string;
  gstOrVatDetails?: string;
  notes?: string;
  country?: string;
  primaryContact?: {
    email: string;
    phone: string;
    location: string;
  };
}

interface VendorRowProps {
  vendor: Vendor;
  onVendorDeleted?: (vendorID: string) => void;
  refetchVendors?: () => void;
}

const VendorRow: React.FC<VendorRowProps> = ({ vendor, onVendorDeleted,refetchVendors }) => {
  const router = useRouter();
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const { deleteVendor, loading: deleteLoading, error: deleteError } = useDeleteVendor();
  const { updateVendor, loading: updateLoading, error: updateError, vendor: fetchedVendor } = useVendors({ vendorId: vendor.vendorID });

  const [fullVendorData, setFullVendorData] = useState<CompanyProfile | null>(null);

  useEffect(() => {
    if (fetchedVendor) {
      const vendorData: CompanyProfile = {
        companyName: fetchedVendor.companyName || vendor.vendor,
        status: fetchedVendor.status || vendor.status,
        address: fetchedVendor.address || vendor.location,
        skills: fetchedVendor.skills || [],
        paymentTerms: fetchedVendor.paymentTerms || vendor.paymentTerms,
        gstOrVatDetails: fetchedVendor.gstOrVatDetails || vendor.gstOrVatDetails,
        notes: fetchedVendor.notes || vendor.notes,
        country: fetchedVendor.country || vendor.country,
        primaryContact: {
          email: "",
          phone: "",
          location: fetchedVendor.country || vendor.location,
        },
      };
      setFullVendorData(vendorData);
    }
  }, [fetchedVendor, vendor]);

  const handleVendorClick = () => {
    if (vendor.vendorID) {
      console.log(`/individualvendor/${vendor.vendorID}`);
      router.push(`/individualvendor/${vendor.vendorID}`);
    } else {
      console.error("Vendor ID is missing");
      console.log(vendor);
    }
  };

  const handleEditClick = () => {
    console.log("Vendor prop in VendorRow:", vendor);
    setIsEditFormOpen(true);
  };

  const handleFormClose = () => {
    setIsEditFormOpen(false);
    if (refetchVendors) refetchVendors();
  };

  const handleDeleteClick = () => {
    setIsDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const result = await deleteVendor(vendor.vendorID);
      if (result) {
        console.log("Vendor deleted successfully:", result.companyName);
        if (onVendorDeleted) onVendorDeleted(vendor.vendorID);
        if (refetchVendors) refetchVendors();
      } else {
        console.error("Delete failed: No result returned");
      }
    } catch (err) {
      console.error("Error deleting vendor:", err);
    } finally {
      setIsDeleteConfirmOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteConfirmOpen(false);
  };

  const vendorData: CompanyProfile = {
    companyName: vendor.vendor,
    status: vendor.status,
    address: vendor.location,
    skills: [],
    paymentTerms: vendor.paymentTerms || "",
    gstOrVatDetails: vendor.gstOrVatDetails,
    notes: vendor.notes,
    country: vendor.country,
    
    primaryContact: {
      email: "",
      phone: "",
      location: vendor.location,
    },
  };

  console.log("vendorData passed to VendorForm (original):", vendorData);
  const dataToPass = fullVendorData || vendorData;


  
const getDisplayRating = () => {
  if (fetchedVendor?.performanceRatings?.length > 0) {
    
    return fetchedVendor.performanceRatings[0].rating;
    
   
  }
  return vendor.rating; 
};

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-6 cursor-pointer" onClick={handleVendorClick}>
          <div className="hover:text-bg-blue-12">{vendor.vendor}</div>
        </td>
        <td className="px-6 py-6">{vendor.location}</td>
        <td className="px-6 py-6">
          <span className="px-3 py-1 rounded-lg text-sm bg-blue-shadow-color text-bg-blue-12">
            {vendor.resources}
          </span>
        </td>
        <td className="px-6 py-6 flex">
        {fetchedVendor ? getDisplayRating() : vendor.rating}

          <img src="/Star_icon.svg" alt="Rate" className="ml-2" />
        </td>
        <td className="px-6 py-6">
          <span
            className={`px-3 py-1 rounded-lg text-sm font-semibold ${getStatusColor1(vendor.status)}`}
          >
            {formatText(vendor.status)}
          </span>
        </td>
        <td className="flex px-6 py-6 space-x-2">
          <img
            src="/edit.svg"
            alt="Edit"
            className="cursor-pointer"
            onClick={handleEditClick}
          />
          <img
            src="/delete.svg"
            alt="Delete"
            className="px-4 cursor-pointer"
            onClick={handleDeleteClick}
          />
        </td>
      </tr>

      {typeof document !== "undefined" &&
        isEditFormOpen &&
        createPortal(
          <VendorForm
            onClose={handleFormClose}
            vendorData={dataToPass}
            vendorId={vendor.vendorID}
          />,
          document.body
        )}

      {typeof document !== "undefined" &&
        isDeleteConfirmOpen &&
        createPortal(
          <DeleteConfirmation
            isOpen={isDeleteConfirmOpen}
            onClose={handleDeleteCancel}
            onConfirm={handleDeleteConfirm}
          />,
          document.body
        )}
    </>
  );
};

export default VendorRow;