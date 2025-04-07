 import React, { useState } from "react";
import Individual_Title from "./Individual/IndividualTitle";
import LeftSide from "./Individual/LeftSide";
import TimeLine from "./Individual/TimeLine";
import RightSide from "./Individual/RightSide";


const Individual = ({ leadId }: { leadId: string}) => {

  const [refetchCount, setRefetchCount] = useState(0);
  console.log(`leadId in Individual component:`, leadId);
  
  const handleDataChanged = () => {
    setRefetchCount(prev => prev + 1);
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-50 p-4 ">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <Individual_Title leadId={leadId}    onLeadUpdated={handleDataChanged}  />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar */}
            <div className="lg:col-span-3">
              <LeftSide  leadId={leadId}/>
            </div>

            {/* Timeline Section */}
            <div className="lg:col-span-6">
              <TimeLine leadId={leadId}    refetchTrigger={refetchCount}/>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-3">
              <RightSide leadId={leadId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Individual;
