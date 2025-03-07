import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

interface CaseStudy {
  caseStudyID: string;
  projectName: string;
  clientName: string;
  techStack: string;
  projectDuration: string;
  keyOutcomes: string;
  industryTarget: string;
  tags: string[];
  document: string;
}

const useOverallCaseStudyData = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post(
          "https://crmbackendapis.onrender.com/graphql",
          {
            query: `query {
              getCaseStudies(
                filter: { industryTarget: "Finance & Banking" }, 
                pagination: { page: 1, pageSize: 10 }, 
                sort: { field: createdAt, order: ASC }
              ) {
                caseStudyID
                projectName
                clientName
                techStack
                projectDuration
                keyOutcomes
                industryTarget
                tags
                document
              }
            }`,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (response.data.errors) {
          throw new Error(response.data.errors[0].message);
        }

        setCaseStudies(response?.data?.data?.getCaseStudies || []);
      } catch (err) {
        setError(err.message || "Failed to fetch case studies");
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, [user.token]); // Dependency array ensures it runs when the token changes

  return { caseStudies, loading, error };
};

export default useOverallCaseStudyData;
