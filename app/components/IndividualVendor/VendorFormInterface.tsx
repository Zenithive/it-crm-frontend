export interface PerformanceRatingData {
    pastProjectsCount: number;
    rating: number;
    review: string;
  }


  export interface VendorFormData {
    companyName: string;
    address: string;
    status: string;
    vendorSkills: string;
    paymentTerms: string;
    gstOrVatDetails: string;
    performanceRatings: PerformanceRatingData[];
    notes: string;
    country: string;
    vendorDetails: VendorDetail[];
  }


  export interface VendorDetail {
    name: string;
    contact: string;
    number: string;
    designation: string;
  }


  export interface AddVendorFormProps {
    onClose: () => void;
    vendorData?: CompanyProfile | null;
    vendorId?: string;
    refetchVendors?: () => void;
  }


  export interface CompanyProfile {
    companyName: string;
    status: string;
    address: string;
    skills: Array<{ skillID: string; name: string; description?: string }>;
    paymentTerms: string;
    gstOrVatDetails?: string;
    notes?: string;
    primaryContact?: {
      email: string;
      phone: string;
      location: string;
    };
    performanceRatings?: PerformanceRatingData[];
  }