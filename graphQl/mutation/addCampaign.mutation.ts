import { gql } from "@apollo/client";

export const CREATE_CAMPAIGN = gql`
mutation CreateCampaign($input: CreateCampaignInput!) {
    createCampaign(input: $input) {
      campaignID
      campaignName
      campaignCountry
      campaignRegion
      industryTargeted
    }
  }
`
  