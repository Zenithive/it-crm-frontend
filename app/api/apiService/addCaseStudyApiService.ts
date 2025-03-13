import { message } from "antd";
import { useMutation } from "@apollo/client";
import { CREATE_CASE_STUDY } from "../../../graphQl/mutation/addCaseStudy.mutation";

export const useAddCaseStudy = () => {
    const [createCaseStudy] = useMutation(CREATE_CASE_STUDY);
  
    const addCaseStudy = async (values: any) => {
      const input = {
        projectName: values.projectName,
        clientName: values.clientName,
        techStack: values.techStack,
        projectDuration: values.projectDuration,
        keyOutcomes: values.keyOutcomes,
        industryTarget: values.industryTarget,
        tags: Array.isArray(values.tags) ? values.tags.join(", ") : values.tags,
        document: values.document,
      };
  
      try {
        const response = await createCaseStudy({ variables: { input } });
        message.success("Case Study added successfully!");
        return response.data;
      } catch (error) {
        message.error("Failed to add Case Study");
        console.error("GraphQL Error:", error);
        throw error;
      }
    };
  
    return { addCaseStudy };
  };
  