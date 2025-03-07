import { gql } from "@apollo/client";

export const GET_DEALS = gql`
  query GetDeals {
    getDeals {
      id
      deal_name
      lead_id
      deal_start_date
      deal_end_date
      deal_amount
      deal_status
      project_requirements  
    }
  }
`;