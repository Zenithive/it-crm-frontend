export interface CaseStudyFormData {
    projectName: string;
    clientName: string;
    // clientLocation: string;
    techStack: string;
    projectDuration: string;
    keyOutcomes: string;
    industryTarget: string;
    tags: string[];
    document: string;
    // details: string;
  }


  export interface FormModalProps {
    children: React.ReactNode;
    title: string;
    onClose: () => void;
  }


  export interface LeadCloseFormData {
    dealName: string;
    dealStartDate: string;
    projectRequirement: string;
    dealStatus: string;
  }



  export interface CaseStudyPageProps {
    initialData?: CaseStudyFormData | LeadCloseFormData;
    onSubmit: (
      data: CaseStudyFormData | LeadCloseFormData,
      formType: FormType
    ) => Promise<void>;
    onClose: () => void;
    refetchCaseStudies?: () => void;
  }

  export type FormType = "caseStudy" | "leadClose";
  