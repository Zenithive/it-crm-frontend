// src/components/CaseStudy/hooks/useCaseStudyForm.ts

import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { CaseStudyFormData, LeadCloseFormData } from "./AddCaseStudyInterface";

export function useCaseStudyForm(initialCaseStudyData?: CaseStudyFormData) {
  const caseStudyForm = useForm<CaseStudyFormData>({
    defaultValues: initialCaseStudyData || {
      projectName: "",
      clientName: "",
      techStack: "",
      projectDuration: "",
      keyOutcomes: "",
      industryTarget: "",
      tags: [],
      document: "",
    },
  });

  return caseStudyForm;
}

export function useLeadCloseForm(initialLeadCloseData?: LeadCloseFormData) {
  const leadCloseForm = useForm<LeadCloseFormData>({
    defaultValues: initialLeadCloseData || {
      dealName: "",
      dealStartDate: "",
      projectRequirement: "",
      dealStatus: "",
    },
  });

  return leadCloseForm;
}