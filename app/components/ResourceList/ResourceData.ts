export const RESOURCE_TYPES = ["CONSULTANT", "FREELANCER", "CONTRACTOR", "EMPLOYEE"];
export const STATUS_OPTIONS = ["Available", "Not Available"];
export type SkillOption = {
  value: string;
  label: string;
};

export const STATUS_MAP = {
  frontendToBackend: {
    "Available": "ACTIVE",
    "Not Available": "INACTIVE",
  },
  backendToFrontend: {
    "ACTIVE": "Available",
    "INACTIVE": "Not Available",
  },
};

// Define interfaces
export interface Skill {
  skillID: string;
  name: string;
  description: string;
  skilltype: string;
}


export interface ResourceSkill {
  skill: Skill;
  experienceYears: number;
}

export interface ResourceProfile {
  resourceProfileID: string;
  type: string;
  status: string;
  firstName: string;
  lastName: string;
  totalExperience: number;
  contactInformation: string;
  googleDriveLink: string;
  vendorID: string;
  resourceSkills?: ResourceSkill[];
}

export interface SkillInput {
  skillID: string;
  experienceYears: string;
  
}

export interface ResourceFormData {
  type: string;
  status: string;
  firstName: string;
  lastName: string;
  totalExperience: string;
  email: string;
  phone: string;
  googleDriveLink: string;
  vendorID: string;
  skillInputs: SkillInput[];
}

export interface ResourceFormProps {
  onClose: () => void;
  resourceProfileId?: string;
  isEditMode?: boolean;
  onUpdateSuccess?: () => void;
  onSubmitSuccess?: () => void;
}
