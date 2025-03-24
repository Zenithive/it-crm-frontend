import React, { useState, useEffect } from "react";
import { Steps } from "antd";
import { useMutation } from "@apollo/client";
import useOverallLeadsData from "../../api/apiService/OverallLeadApiService";
import { UPDATE_LEAD_MUTATION } from "../../../graphQl/mutation/updateLead.mutation";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

type Stage = {
  title: string;
  description?: string;
};

function PipelineStages({ leadId }: { leadId: string }) {
  const defaultStages: { [key: string]: { title: string; order: number } } = {
    NEW: { title: "Lead Created", order: 0 },
    FOLLOW_UP: { title: "Qualified", order: 1 },
    IN_PROGRESS: { title: "Negotiation", order: 2 },
    CLOSED_WON: { title: "Closed Win", order: 3 },
    CLOSED_LOST: { title: "Closed Lost", order: 4 },
  };

  const [stages, setStages] = useState<Stage[]>([]);
  const [current, setCurrent] = useState(0);
  const user = useSelector((state: RootState) => state.auth);

  const { lead, loading, error, refetch } = useOverallLeadsData(1, 100, "", "", "", "",leadId);

  const [updateLead, { loading: updateLoading, error: updateError }] = useMutation(
    UPDATE_LEAD_MUTATION,
    {
      context: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
      onCompleted: () => {
        console.log("PipelineStages - Stage update completed");
        refetch();
      },
      onError: (err) => {
        console.error("PipelineStages - Update error:", err.message);
      },
    }
  );

  useEffect(() => {
    console.log("PipelineStages - leadId:", leadId);
    console.log("PipelineStages - Lead Data:", lead);

    // Set up stages in the correct order
    const stageList = Object.keys(defaultStages)
      .sort((a, b) => defaultStages[a].order - defaultStages[b].order)
      .map((key) => ({
        title: defaultStages[key].title,
      }));
    setStages(stageList);

    // Update current stage based on backend data
    if (!loading && !error && lead) {
      const leadStage = lead.leadStage?.toUpperCase()?.trim(); // Trim to remove any whitespace
      console.log("PipelineStages - Lead stage from API (processed):", leadStage);

      const stageKeys = Object.keys(defaultStages).sort(
        (a, b) => defaultStages[a].order - defaultStages[b].order
      );
      console.log("PipelineStages - Available stage keys:", stageKeys);

      const currentIndex = stageKeys.indexOf(leadStage || "NEW");
      console.log("PipelineStages - Calculated current index:", currentIndex);

      if (currentIndex === -1) {
        console.warn(
          `PipelineStages - Lead stage "${leadStage}" not found in defaultStages. Defaulting to 0 (NEW).`
        );
        setCurrent(0); // Fallback to "NEW" if stage is invalid
      } else {
        setCurrent(currentIndex);
      }
    }
  }, [lead, loading, error, leadId]);

  const handleStageChange = async (newStageIndex: number) => {
    const stageKeys = Object.keys(defaultStages).sort(
      (a, b) => defaultStages[a].order - defaultStages[b].order
    );
    const newStage = stageKeys[newStageIndex];
    console.log("PipelineStages - Updating stage to:", newStage);

    try {
      await updateLead({
        variables: {
          leadID: leadId,
          input: {
            leadStage: newStage,
          },
        },
      });
      setCurrent(newStageIndex);
    } catch (err) {
      console.error("PipelineStages - Error updating stage:", err);
    }
  };

  const customDot = (
    dot: React.ReactNode,
    { status, index }: { status: string; index: number }
  ) => {
    const isActive = index <= current;
    return (
      <div className="relative flex items-center justify-center">
        <div
          className={`w-1 h-3 rounded-full flex items-center justify-center p-2 ${
            isActive ? "border-bg-blue-12 border-4" : "bg-gray-200 border-bg-blue-12"
          }`}
        >
          {isActive && (
            <div className="w-1 h-2 rounded-full bg-bg-blue-12 p-[5px] border-bg-blue-12" />
          )}
        </div>
      </div>
    );
  };

  if (loading) return <div>Loading pipeline stages...</div>;
  if (error) return <div>Error loading pipeline stages: {error}</div>;
  if (updateLoading) return <div>Updating stage...</div>;
  if (updateError) return <div>Error updating stage: {updateError.message}</div>;

  return (
    <div className="relative ml-6">
      <Steps
        key={current}
        current={current}
        // onChange={handleStageChange}
        direction="vertical"
        items={stages.map((item, index) => ({
          title: (
            <span
              className={`text-base leading-10 ${
                index <= current ? "text-gray-900 font-medium" : "text-gray-400"
              }`}
            >
              {item.title}
            </span>
          ),
          description: item.description,
        }))}
        progressDot={customDot}
        className="[&_.ant-steps-item-container]:flex [&_.ant-steps-item-container]:items-start [&_.ant-steps-item-container]:p-0 [&_.ant-steps-item-container]:relative
        [&_.ant-steps-item-tail]:absolute [&_.ant-steps-item-tail]:top-0 [&_.ant-steps-item-tail]:left-[2px] [&_.ant-steps-item-tail]:h-full [&_.ant-steps-item-tail]:p-0 [&_.ant-steps-item-tail]:m-0
        [&_.ant-steps-item-tail::after]:w-0.5 [&_.ant-steps-item-tail::after]:ml-0 [&_.ant-steps-item-tail::after]:h-full [&_.ant-steps-item-tail::after]:absolute
        [&_.ant-steps-item-finish_.ant-steps-item-tail::after]:bg-bg-blue-12
        [&_.ant-steps-item-process_.ant-steps-item-tail::after]:bg-bg-blue-12 [&_.ant-steps-item-wait_.ant-steps-item-tail::after]:bg-bg-blue-12
        [&_.ant-steps-item]:pb-8 [&_.ant-steps-item]:last:pb-0 [&_.ant-steps-item]:min-h-[48px]
        [&_.ant-steps-item-content]:min-h-[3px] [&_.ant-steps-item-content]:ml-4
        [&_.ant-steps-item-title]:leading-5 [&_.ant-steps-item-title]:m-0
        [&_.ant-steps-icon-dot]:m-0 [&_.ant-steps-icon-dot]:left-0
        [&_.ant-steps-item-icon]:m-0 "

/>
    </div>
  );
}

export default PipelineStages;