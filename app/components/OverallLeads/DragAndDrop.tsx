// // // src/microComponents/LeadCardDnD.tsx
import { useDrag, useDrop } from 'react-dnd';
import { LeadCard } from '../../microComponents/LeadCard';
import { LeadCardDnDProps } from './OverallLeadsData'; 
import { useRef, useState } from 'react';
import useOverallLeadsData, { updateTaskAPI } from '../../api/apiService/OverallLeadApiService';




const ItemType = 'LEAD_CARD';

// const LeadCardDnD: React.FC<LeadCardDnDProps> = ({ id, title, subtitle,  columnId, moveCard }) => {
//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: ItemType,
//     item: { id, columnId },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   }));
 
  
//   // const [, drop] = useDrop(() => ({
//   //   accept: ItemType,
//   //   drop: (item: { id: string; columnId: string }) => {
//   //     if (item.columnId !== columnId) {
//   //       moveCard(item.id, item.columnId, columnId);
//   //     }
//   //   },
//   // }));

//   const [, drop] = useDrop({
//     accept: ItemType,
//     drop: (item: { id: string; columnId: string }) => {
//       console.log('Dropped!', item);
//       if (item.columnId !== columnId) {
//         moveCard(item.id, item.columnId, columnId);
//       }
//     },
//     collect: (monitor) => ({
//       isOver: monitor.isOver(),
//     }),
//   });
  
//   const ref = useRef<HTMLDivElement>(null);
//   drag(drop(ref));
  
//   return (
//     <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
//       <LeadCard id={id} title={title} subtitle={subtitle} />
//     </div>
//   );
// };




// // const LeadCardDnD: React.FC<LeadCardDnDProps> = ({ id, title, subtitle, columnId, moveCard }) => {
// //   const [{ isDragging }, drag] = useDrag(() => ({
// //     type: ItemType,
// //     item: { id, columnId },
// //     collect: (monitor) => ({
// //       isDragging: monitor.isDragging(),
// //     }),
// //   }));
  
// //   // Now pass the columnId as the leadStage parameter
// //   const { leads, loading, error } = useOverallLeadsData(1, 10, columnId);
  
// //   const [, drop] = useDrop(() => ({
// //     accept: ItemType,
// //     drop: (item: { id: string; columnId: string }) => {
// //       if (item.columnId !== columnId) {
// //         moveCard(item.id, item.columnId, columnId);
// //       }
// //     },
// //   }));

// //   return (
// //     <div ref={(node) => { if (node) drag(drop(node)); }} style={{ opacity: isDragging ? 0.5 : 1 }}>
// //       <LeadCard id={id} title={title} subtitle={subtitle} />
// //     </div>
// //   );
// // };
// // const LeadCardDnD: React.FC<LeadCardDnDProps> = ({ id, title, subtitle, columnId, moveCard }) => {
// //   const [{ isDragging }, drag] = useDrag(() => ({
// //     type: ItemType,
// //     item: { id, columnId },
// //     collect: (monitor) => ({
// //       isDragging: monitor.isDragging(),
// //     }),
// //   }));
  
// //   // Fetch leads data filtered by columnId (leadStage)
// //   const { leads, loading, error } = useOverallLeadsData(1, 10, columnId);
  
// //   const [, drop] = useDrop(() => ({
// //     accept: ItemType,
// //     drop: (item: { id: string; columnId: string }) => {
// //       if (item.columnId !== columnId) {
// //         moveCard(item.id, item.columnId, columnId);
// //       }
// //     },
// //   }));

// //   return (
// //     <div ref={(node) => { if (node) drag(drop(node)); }} style={{ opacity: isDragging ? 0.5 : 1 }}>
// //       {loading ? (
// //         <div>Loading leads...</div>
// //       ) : error ? (
// //         <div>Error loading leads: {error}</div>
// //       ) : (
// //         <div className="lead-cards-container">
// //           {leads.map((lead) => (
// //             <LeadCard 
// //               key={lead.id} 
// //               id={lead.id} 
// //               title={lead.firstName || 'Lead'} 
// //               subtitle={lead.email || lead.phone || 'No additional info'}
// //             />
// //           ))}
// //           {leads.length === 0 && <p>No leads in this stage</p>}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// export default LeadCardDnD;


const  leadStageMap: {[key: string]: string }= {
  "New Lead": "NEW",
  "Negotiation": "IN_PROGRESS",
  "Qualified": "FOLLOW_UP",
 
  "Closed Win": "CLOSED_WON",
  "Lost": "LOST",
 
};

const LeadCardDnD: React.FC<LeadCardDnDProps> = ({
  id,
  title,
  subtitle,
  columnId,
  moveCard,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id, columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

 
  const [, drop] = useDrop({
    accept: ItemType,
    drop: async (item: { id: string; columnId: string }) => {
      console.log("📌 Dropped Item:", item);
  
      // Check if ID is retrieved correctly
      if (!item.id) {
        console.error("❌ Task ID is missing!");
        return;
      }
  
      // Only proceed if the column changes
      if (item.columnId !== columnId) {
        moveCard(item.id, item.columnId, columnId);
  
        // Map the columnId to lead stage
        const newStatus = leadStageMap[columnId] || columnId; // Fallback to raw columnId if not mapped
        console.log(`Mapped Status: ${newStatus}`);
  
        try {
          console.log(` Sending updateTaskAPI with ID: ${item.id}, status: ${newStatus}`);
          const result = await updateTaskAPI(item.id, { status: newStatus });
          console.log("✅ Task updated successfully!", result);
        } catch (error) {
          console.error(" Failed to update task:", error);
        }
      }
    },
  });
  
  return (
    <div
      ref={(node) => {
        if (node) drag(drop(node));
      }}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <LeadCard id={id} title={title} subtitle={subtitle} />
    </div>
  );
};

export default LeadCardDnD;