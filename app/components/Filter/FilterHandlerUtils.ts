import { FilterPayload } from "./FilterData";

export type FilterApplyParams = {
  selectedOptionsByCategory: { [category: string]: string[] };
  onFilterApply: (payload: FilterPayload) => Promise<void>;
  setShowFilter: (show: boolean) => void;
  startDate?: string;
  endDate?: string;
};

export const handleFilterApplyContact = async ({
  selectedOptionsByCategory,
  startDate,
  endDate,
  onFilterApply,
  setShowFilter
}: FilterApplyParams): Promise<void> => {
  const dateSelections = selectedOptionsByCategory["date"] || [];
  const typeSelections = selectedOptionsByCategory["type"] || [];
  const stageSelections = selectedOptionsByCategory["stage"] || [];
  const campaignSelections = selectedOptionsByCategory["campaign"] || [];

  // Create filter object
  const filterObj: Record<string, any> = {};
  
  if (startDate) {
    filterObj.startDate = startDate;
  }
  if (endDate) {
    filterObj.endDate = endDate;
  }
  
  // Only add filters if options are selected
  if (typeSelections.length > 0) {
    filterObj.type = typeSelections.join(",");
  }

  if (dateSelections.length > 0) {
    filterObj.date = dateSelections.join(",");
  }

  if (stageSelections.length > 0) {
    filterObj.stage = stageSelections.join(",");
  }
  
  if (campaignSelections.length > 0) {
    filterObj.campaign = campaignSelections.join(",");
  }
  
  const payload: FilterPayload = {
    filter: filterObj,
    pagination: {
      page: 1,
      pageSize: 10,
    },
    sort: {
      field: "createdAt",
      order: "DESC",
    },
  };

  // localStorage.setItem(
  //   "selectedFilters",
  //   JSON.stringify(selectedOptionsByCategory)
  // );
  
  await onFilterApply(payload);
  setShowFilter(false);
};




export const handleFilterApplydeal = async ({
  selectedOptionsByCategory,
  startDate,
  endDate,
  onFilterApply,
  setShowFilter
}: FilterApplyParams): Promise<void> => {
  const dateSelections = selectedOptionsByCategory["date"] || [];
  const typeSelections = selectedOptionsByCategory["type"] || [];
  
  const campaignSelections = selectedOptionsByCategory["campaign"] || [];

  // Create filter object
  const filterObj: Record<string, any> = {};
  
  if (startDate) {
    filterObj.startDate = startDate;
  }
  if (endDate) {
    filterObj.endDate = endDate;
  }
  
  // Only add filters if options are selected
  if (typeSelections.length > 0) {
    filterObj.type = typeSelections.join(",");
  }

  if (dateSelections.length > 0) {
    filterObj.date = dateSelections.join(",");
  }

 
  
  if (campaignSelections.length > 0) {
    filterObj.campaign = campaignSelections.join(",");
  }
  
  const payload: FilterPayload = {
    filter: filterObj,
    pagination: {
      page: 1,
      pageSize: 10,
    },
    sort: {
      field: "createdAt",
      order: "DESC",
    },
  };

  // localStorage.setItem(
  //   "selectedFilters",
  //   JSON.stringify(selectedOptionsByCategory)
  // );
  
  await onFilterApply(payload);
  setShowFilter(false);
};
export const handleFilterApplyCaseStudy = async ({
  selectedOptionsByCategory,
  onFilterApply,
  setShowFilter
}: FilterApplyParams): Promise<void> => {
  const industrySelections = selectedOptionsByCategory["industry"] || [];
  const technologySelections = selectedOptionsByCategory["technology"] || [];

  // Create filter object
  const filterObj: Record<string, any> = {};

  // Only add filters if options are selected
  if (industrySelections.length > 0) {
    filterObj.industryTarget = industrySelections.join(",");
  }

  if (technologySelections.length > 0) {
    filterObj.techStack = technologySelections.join(",");
  }

  const payload: FilterPayload = {
    filter: filterObj,
    pagination: {
      page: 1,
      pageSize: 10,
    },
    sort: {
      field: "createdAt",
      order: "DESC",
    },
  };

  await onFilterApply(payload);
  setShowFilter(false);
};

export const handleFilterApplyResource = async ({
  selectedOptionsByCategory,
  onFilterApply,
  setShowFilter
}: FilterApplyParams): Promise<void> => {
  const filterObj: Record<string, any> = {};
  const skillsSelections = selectedOptionsByCategory["skills"] || [];
  const experienceYearSelections =
    selectedOptionsByCategory["experienceYear"] || [];

  // Only add filters if options are selected
  if (skillsSelections.length > 0) {
    filterObj.skills = skillsSelections.join(",");
  }

  if (experienceYearSelections.length > 0) {
    filterObj.experienceYear = experienceYearSelections.join(",");
  }

  await onFilterApply({
    filter: filterObj,
    pagination: { page: 1, pageSize: 10 },
    sort: { field: "createdAt", order: "DESC" },
  });
  
  setShowFilter(false);
};

// Vendor filter handler
export const handleFilterApplyVendor = async ({
  selectedOptionsByCategory,
  onFilterApply,
  setShowFilter
}: FilterApplyParams): Promise<void> => {
  // Get the selected options by category
  const statusSelections = selectedOptionsByCategory["status"] || [];
  const locationSelections = selectedOptionsByCategory["location"] || [];
  const ratingSelections = selectedOptionsByCategory["rating"] || [];

  const filterObj: {
    status?: string;
    country?: string;
    reviewFromPerformanceRating?: string;
  } = {};

  if (statusSelections.length > 0) {
   
    const formattedStatuses = statusSelections.map((status) =>
      status.toUpperCase()
    );
    filterObj.status = formattedStatuses.join(",");
  }

  if (locationSelections.length > 0) {
    filterObj.country = locationSelections.join(",");
  }
  
  if (ratingSelections.length > 0) {
    filterObj.reviewFromPerformanceRating = ratingSelections.join(",");
  }

  await onFilterApply({
    filter: filterObj,
    pagination: { page: 1, pageSize: 10 },
    sort: { field: "createdAt", order: "DESC" },
  });

  setShowFilter(false);
};

// Todo filter handler
export const handleFilterApplyTodo = async ({
  selectedOptionsByCategory,
  startDate,
  endDate,
  onFilterApply,
  setShowFilter
}: FilterApplyParams): Promise<void> => {
  const filterObj: Record<string, any> = {};
  const statusSelections = selectedOptionsByCategory["status"] || [];
  const prioritySelections = selectedOptionsByCategory["priority"] || [];
  const dateSelections = selectedOptionsByCategory["date"] || [];

  if (startDate) {
    filterObj.startDate = startDate;
  }
  
  if (endDate) {
    filterObj.endDate = endDate;
  }

  if (statusSelections.length > 0) {
    filterObj.status = statusSelections.join(",");
  }

  if (prioritySelections.length > 0) {
    filterObj.priority = prioritySelections.join(",");
  }

  if (dateSelections.length > 0 && !startDate && !endDate) {
    filterObj.date = dateSelections.join(",");
  }

  await onFilterApply({
    filter: filterObj,
    pagination: { page: 1, pageSize: 10 },
    sort: { field: "createdAt", order: "DESC" },
  });
  
  setShowFilter(false);
};