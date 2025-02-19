import React, { useState } from "react";
import { Steps, Button } from "antd";

type Stage = {
  title: string;
  description?: string;
};

const items: Stage[] = [
  { title: "Lead Created" },
  { title: "Qualified" },
  { title: "Negotiation" },
  { title: "Closed" },
];

function PipelineStages() {
  const [current, setCurrent] = useState(1);

  const customDot = (
    dot: React.ReactNode,
    { status, index }: { status: string; index: number }
  ) => {
    const isActive = index <= current;
    return (
      <div className="relative flex items-center justify-center w-6 h-6">
        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors
            ${
              isActive ? "bg-bg-blue-12" : "bg-white border-2 border-gray-300"
            }`}
        >
          {isActive && <div className="w-2 h-2 bg-white rounded-full" />}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Pipeline Stages */}
      <div className="relative ml-4">
        <Steps
          current={current}
          onChange={setCurrent}
          direction="vertical"
          items={items.map((item, index) => ({
            title: (
              <span
                className={`font-medium text-[16px] ml-3 mb-3 ${
                  index <= current ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {item.title}
              </span>
            ),
            description: item.description,
          }))}
          progressDot={customDot}
          className="custom-pipeline-steps"
        />
      </div>

      <style>{`


        .custom-pipeline-steps .ant-steps-item-container {
          display: flex;
          align-items: flex-start;
          padding: 0 !important;
          position: relative;
        }

        .custom-pipeline-steps .ant-steps-item-tail {
          top: -3px !important;
          left: 12px !important;
          height: 200% !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        
        .custom-pipeline-steps .ant-steps-item-tail::after {
          width: 2px !important;
          margin-left: 0 !important;
          height: calc(100% - 24px) !important;
          top: 24px !important;
          position: absolute !important;
        }
        
        .custom-pipeline-steps .ant-steps-item-finish .ant-steps-item-tail::after {
          background-color: #4f46e5 !important;
        }
        
        .custom-pipeline-steps .ant-steps-item-process .ant-steps-item-tail::after,
        .custom-pipeline-steps .ant-steps-item-wait .ant-steps-item-tail::after {
          background-color: #e5e7eb !important;
        }
        
        .custom-pipeline-steps .ant-steps-item {
          margin: 0 !important;
          padding: 12px 0 !important;
          min-height: 64px !important;
        }
        
        .custom-pipeline-steps .ant-steps-item-content {
          min-height: 40px !important;
          margin-left: 16px !important;
          margin-top: 2px;
        }
        
        .custom-pipeline-steps .ant-steps-item-title {
          font-size: 0.875rem !important;
          line-height: 1.25rem !important;
          font-weight: 500 !important;
          padding-right: 0 !important;
          margin: 0 !important;
        }
        
        .custom-pipeline-steps .ant-steps-item-wait .ant-steps-item-title {
          color: #6b7280 !important;
        }
        
        .custom-pipeline-steps .ant-steps-icon-dot {
          margin: 0 !important;
          left: 0 !important;
          top: 2px !important;
        }

        .custom-pipeline-steps .ant-steps-item-icon {
          margin: 0 !important;
          position: relative !important;
          top: 2px !important;
        }

        .ant-btn-primary {
          background-color: #4f46e5;
        }
        
        .ant-btn-primary:hover {
          background-color: #4338ca !important;
        }
      `}</style>
    </>
  );
}

export default PipelineStages;
