import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";

export interface LeadFormData {
    firstName: string;
    lastName: string;
    linkedIn: string;
    phone: string;
    leadSource: string;
    leadStage: string;
    leadType: string;
    campaignName: string;
    initialContactDate: string;
    organizationName: string;
    city: string;
    noOfEmployees: string;
    annualRevenue: string;
    email: string;
    organizationEmail: string;
    country: string;
    orgCountry: string;
    organizationWebsite: string;
    organizationLinkedIn: string;
    organizationID: string;
    createNewOrganization?: boolean; // Added this field
  }


  export const LEAD_STAGES = [
    { value: "NEW", label: "Lead Created" },
    { value: "QUALIFIED", label: "Qualified" },
    { value: "NEGOTIATION", label: "Negotiation" },
    { value: "CLOSED_WON", label: "Closed Win" },
    { value: "CLOSED_LOST", label: "Closed Lost" },
  ];

  export interface AddLeadModalProps {
    onClose: () => void;
    leadId?: string;
   
  }


  export interface OrganizationInfoSectionProps {
    register: UseFormRegister<LeadFormData>;
    errors: FieldErrors<LeadFormData>;
    watch: UseFormWatch<LeadFormData>;
    selectedOrganization: { id: string, name: string, website: string } | null;
    onOrganizationSelect: (id: string, name: string, website: string) => void;
    onCreateNewOrganization: () => void;
    createNewOrganization: boolean;
  }