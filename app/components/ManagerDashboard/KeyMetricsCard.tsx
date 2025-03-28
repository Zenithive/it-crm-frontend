import React, { useState, useRef, useEffect } from 'react';
import { Card } from "../../microComponents/CardForIndividualDashboard";
import { MetricCard } from "./MetricCard";


interface MetricCardData {
  title: string;
  displayValue: string;
}

interface KeyMetricsCardProps {
  keyMetrics: MetricCardData[];
}

const KeyMetricsCard: React.FC<KeyMetricsCardProps> = ({
  keyMetrics,
}) => {



  return (
    <Card className="bg-white shadow-custom rounded-xl overflow-hidden relative h-[210px]">
      <div className="justify-end items-end flex mr-4 mt-2 relative">
       
          <img
            src="filterC.svg"
            alt="filter"
            className="w-6 h-6"
          />
        
      </div>

      <div className="flex">
        {keyMetrics.map((metric, index) => (
          <div
            key={index}
            className={`relative flex-1 px-4 pb-4 ${
              index !== 0
                ? "after:content-[''] after:absolute after:top-8 after:bottom-8 after:left-0 after:w-px after:bg-content-border"
                : ""
            }`}
          >
            <MetricCard
              title={metric.title}
              displayValue={metric.displayValue}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default KeyMetricsCard;