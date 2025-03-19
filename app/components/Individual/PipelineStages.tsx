import React, { useState } from "react";
import { Steps } from "antd";

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
      <div className="relative flex items-center justify-center ">
        <div
          className={`w-1 h-2 rounded-full flex items-center justify-center p-2
            ${isActive ? "border-bg-blue-12 border-4" : "bg-gray-200 border-bg-blue-12"}`}
        >
          {isActive && (
            <div className="w-1 h-2 rounded-full bg-bg-blue-12 p-[5px] border-bg-blue-12" />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="relative ml-6">
      <Steps
        current={current}
        onChange={setCurrent}
        direction="vertical"
        items={items.map((item, index) => ({
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


{/* <style>{`


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
`}</style> */}