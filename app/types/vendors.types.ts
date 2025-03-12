export interface Contact {
    contactID: string;
    name: string;
    email: string;
    phoneNumber: string;
  }
  
  export interface Skill {
    skillID: string;
    name: string;
    description: string;
    skilltype: string;
  }
  
  export interface PerformanceRating {
    performanceRatingsID: string;
    rating: number;
    review: string;
  }
  
  export interface ResourceSkill {
    skill: Skill;
    experienceYears: number;
  }
  
  export interface PastProject {
    pastProjectID: string;
    createdAt: string;
    updatedAt: string;
    resourceProfileID: string;
    projectName: string;
    description: string;
  }
  
  export interface Resource {
    resourceProfileID: string;
    firstName: string;
    lastName: string;
    totalExperience: number;
    contactInformation: string;
    googleDriveLink: string;
    status: string;
    vendorID: string;
    resourceSkills: ResourceSkill[];
    pastProjects: PastProject[];
  }
  
  export interface Vendor {
    vendorID: string;
    createdAt: string;
    updatedAt: string;
    companyName: string;
    status: string;
    paymentTerms: string;
    address: string;
    gstOrVatDetails: string;
    notes: string;
    contactList: Contact[];
    skills: Skill[];
    performanceRatings: PerformanceRating[];
    resources: Resource[];
  }
  
  export interface GetVendorsResponse {
    getVendors: {
      items: Vendor[];
      totalCount: number;
    };
  }
  