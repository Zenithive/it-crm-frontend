const API_URL = process.env.NEXT_PUBLIC_API_URL;
const STATIC_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDI0NDg1MjMsIm5hbWUiOiJkZW1vIiwicm9sZSI6IkFETUlOIiwidXNlcl9pZCI6IjljYjA3YmFmLWI2OGItNDY4MC1iY2E3LTA3NWQ3Y2E2ZDFhOSJ9.5LrwEngmYGIvrP2-e_8UfDxqF7twhLyB9kj61-B1PW0"; // 🔹 Replace this with your actual token

const fetchFromAPI = async (page: number, pageSize: number, viewType: "list" | "kanban") => {
  try {
    if (!API_URL) {
      throw new Error("API URL is missing from environment variables");
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STATIC_TOKEN}`,
      },
      body: JSON.stringify({
        query: `query GetLeads($filter: LeadFilter, $pagination: PaginationInput, $sort: LeadSortInput) {
          getLeads(filter: $filter, pagination: $pagination, sort: $sort) {
            items {
              firstName
              lastName
              email
              phone
              country
              leadSource
              leadStage
              leadPriority
              linkedIn
              initialContactDate
              leadCreatedBy {
                userID
                name
                email
              }
              leadAssignedTo {
                userID
                name
                email
              }
              organization {
                organizationID
                organizationName
              }
              campaign {
                campaignID
                campaignName
                campaignCountry
                campaignRegion
                industryTargeted
              }
            }
            totalCount
          }
        }`,
        variables: {
          pagination: {
            page,
            pageSize,
          },
          sort: {
            field: "EMAIL",
            order: "ASC",
          },
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const result = await response.json();
    return {
      data: result.data?.getLeads?.items || [],
      totalCount: result.data?.getLeads?.totalCount || 0,
    };
  } catch (error) {
    console.error(`API Fetch Error (${viewType}):`, error);
    return { data: [], totalCount: 0 };
  }
};

export const fetchFromAPIForListView = async (page: number, pageSize: number) => fetchFromAPI(page, pageSize, "list");
export const fetchFromAPIForKanbanView = async (page: number, pageSize: number) => fetchFromAPI(page, pageSize, "kanban");



