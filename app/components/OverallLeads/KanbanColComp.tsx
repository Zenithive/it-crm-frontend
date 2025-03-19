import { useDrop } from 'react-dnd';
import './overallLeads.css';

import React, { useEffect, useMemo } from 'react';
import LeadCardDnD from './DragAndDrop';

import {ColumnPropsForKanban} from './OverallLeadsData';
import useOverallLeadsData from '../../api/apiService/OverallLeadApiService';



const  columnToStageMap: Record<string, string> = {
  "New Lead": "NEW",
  "Negotiation": "IN_PROGRESS",
  "Qualified": "FOLLOW_UP",
 
  "Closed Win": "CLOSED_WON",
  "Lost": "CLOSED_LOST",
 
};


const ColumnComponent: React.FC<ColumnPropsForKanban> = ({ column, moveCard, cardWidth }) => {


    
  const { leads:allLeads, loading, error } = useOverallLeadsData(1, 117, '');
  
  const stageValue = columnToStageMap[column.title];

  const filteredLeads = useMemo(() => {
    if (!allLeads || allLeads.length === 0) return [];
  
    return allLeads.filter((lead: any) => {
      
      const leadStage = lead.stage || lead.leadStage || lead.status;
      console.log("lead id",lead.leadID)
      if (Array.isArray(stageValue)) {
    
        return stageValue.includes(leadStage);
      } else {
        // Otherwise, do a direct comparison
        return leadStage === stageValue;
      }
    });
  }, [allLeads, stageValue, column.title]);
  
  const [{ isOver }, drop] = useDrop({
    accept: 'LEAD_CARD',
    canDrop: (item: { id: string; columnId: string }) => {
      // Prevent dropping onto the same column
      return item.columnId !== column.title;
    },
    drop: (item: { id: string; columnId: string }) => {
      if (item.columnId !== column.title) {
        moveCard(item.id, item.columnId, column.title);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver() && monitor.canDrop(),
    }),
  });

  const dropRef = React.useRef<HTMLDivElement>(null);
  drop(dropRef);

  return (
    <div
      ref={dropRef}
      className={`h-[500px] bg-gray-50 rounded-lg shadow-prim mx-2 mainCard ${isOver ? 'bg-blue-300' : ''}`}
      style={{ flex: `0 0 ${cardWidth}` }}
    >
      <h2 className="font-semibold mb-4 text-white bg-bg-blue-12 p-3 title_set ">
        <span className="text-xl">{column.title}</span>
        {/* <span className="text-[18px]">({column.number})</span> */}
   
        <span className="text-lg">({filteredLeads?.length || 0})</span>
        
      </h2>

      
      <div className="space-y-2 px-1 py-2 rounded-lg custom_scrollbar h-[calc(100%-4.5rem)]">
        {filteredLeads.map((item:any) => (
          <LeadCardDnD
            key={item.leadID}
            id={item.leadID}
            title={`${item.firstName} ${item.lastName}`}
            subtitle={item.email}
            // index={column.items.indexOf(item)}
            index={filteredLeads.indexOf(item)} 
            columnId={column.title}
            moveCard={moveCard}
          />
        ))}

{/* {column.items.map((item) => (
          <LeadCardDnD
            key={item.id}
            id={item.id}
            title={item.title}
            subtitle={item.subtitle}
            index={column.items.indexOf(item)}
            columnId={column.title}
            moveCard={moveCard}
          />
        ))} */}
       
      </div>
    </div>
  );
};

export default ColumnComponent;
