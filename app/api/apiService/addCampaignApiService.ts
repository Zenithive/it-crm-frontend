import { useMutation } from "@apollo/client";
import { message } from "antd";
import { CREATE_CAMPAIGN } from "../../../graphQl/mutation/addCampaign.mutation"; 

export const useCreateCampaign = () => {
  const [createCampaignMutation, { loading, error }] = useMutation(CREATE_CAMPAIGN);

  const createCampaign = async (values: any) => {
    const input = {
      campaignName: values.campaignName,
      campaignCountry: values.campaignCountry,
      campaignRegion: values.campaignRegion,
      industryTargeted: values.industryTargeted,
    };

    try {
      const { data } = await createCampaignMutation({
        variables: { input },
      });
      message.success("Campaign created successfully!");
      return data;
    } catch (err) {
      message.error("Failed to create campaign");
      console.error("GraphQL Error:", err);
      throw err;
    }
  };

  return { createCampaign, loading, error };
};
