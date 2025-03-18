import { gql } from "@apollo/client";

export const GET_CAMPAIGNS = gql`
query GetAllCampaigns {
  getCampaigns {
    items {
      campaignID
      campaignName
      campaignCountry
    users {
        userID
        name
        email
      }
    }
    totalCount
  }
}
`