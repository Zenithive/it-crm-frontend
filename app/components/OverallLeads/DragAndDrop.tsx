// import { useDrag, useDrop } from "react-dnd";
// import { LeadCard } from "../../microComponents/LeadCard";
// import { LeadCardDnDProps } from "./OverallLeadsData";

// import useOverallLeadsData, {
//   useUpdateLead,
// } from "../../api/apiService/OverallLeadApiService";
// import { ApolloError } from "@apollo/client";

// const ItemType = "LEAD_CARD";

// const leadStageMap: { [key: string]: string } = {
//   "New Lead": "NEW",
//   Negotiation: "IN_PROGRESS",
//   Qualified: "FOLLOW_UP",

//   "Closed Win": "CLOSED_WON",
//   "Closed Lost": "CLOSED_LOST",
// };

// const LeadCardDnD: React.FC<LeadCardDnDProps> = ({
//   id,
//   title,
//   subtitle,
//   data,
//   columnId,
//   moveCard,
// }) => {
//   const { refetch } = useOverallLeadsData(1, 117);
//   const { updateLead } = useUpdateLead();
//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: ItemType,
//     item: { id, columnId, email: subtitle, ...data },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   }));

//   const [, drop] = useDrop({
//     accept: ItemType,
//     drop: async (item: {
//       id: string;
//       columnId: string;
//       email: string;
//       firstName: string;
//       lastName: string;
//       linkedIn: string;
//       country: string;
//       phone: string;
//       leadSource: string;
//       initialContactDate: string;
//       leadAssignedTo: string;
//       leadPriority: string;
//       organizationID: string;
//       campaignID: string;
//       leadNotes: string;
//       leadType: string;
//     }) => {
//       console.log("Dropped Item:", item);

//       // Check if ID is retrieved correctly
//       if (!item.id) {
//         console.error(" lead ID is missing!");
//         return;
//       }

//       // Only proceed if the column changes
//       if (item.columnId !== columnId) {
//         moveCard(item.id, item.columnId, columnId);

//         // Map the columnId to lead stage

//         let formattedDate = item.initialContactDate;
//         if (formattedDate && !formattedDate.endsWith("Z")) {
//           // Format the date if it's not already in ISO format with Z
//           const date = new Date(formattedDate);
//           formattedDate = date.toISOString(); // This gives format like "2024-02-24T12:00:00.000Z"
//         }
//         const newStatus = leadStageMap[columnId] || columnId; // Fallback to raw columnId if not mapped
//         console.log(`Mapped Status: ${newStatus}`);
//         const leadUpdatePayload = {
//           firstName: item.firstName,
//           lastName: item.lastName,
//           email: item.email,
//           linkedIn: item.linkedIn,
//           country: item.country,
//           phone: item.phone,
//           leadSource: item.leadSource,
//           leadType: "SMALL",
//           initialContactDate: formattedDate,
//           leadAssignedTo: item.leadAssignedTo,
//           leadStage: newStatus,
//           leadNotes: item?.leadNotes || "good",
//           leadPriority: item.leadPriority,
//           organizationID: item.organizationID,
//           campaignID: item.campaignID,
//         };

//         try {
          
//           const result = await updateLead(item.id, leadUpdatePayload);
//           refetch();
//           if (!result) {
//             throw new Error("Update returned null");
//           }

//           // console.log("Lead updated successfully!", result);
//         } catch (error) {
//           console.error(" Failed to update Lead:", error);
//           if (error instanceof ApolloError) {
//             console.error(" Apollo Error:", error.message);
//           }
//         }
//       }
//     },
//   });

//   return (
//     <div
//       ref={(node) => {
//         if (node) drag(drop(node));
//       }}
//       style={{ opacity: isDragging ? 0.5 : 1 }}
//     >
//       <LeadCard id={id} title={title} subtitle={subtitle} />
//     </div>
//   );
// };

// export default LeadCardDnD;
import { useDrag, useDrop } from "react-dnd";
import { LeadCard } from "../../microComponents/LeadCard";
import { LeadCardDnDProps } from "./OverallLeadsData";
import useOverallLeadsData, {
  useUpdateLead,
} from "../../api/apiService/OverallLeadApiService";
import { ApolloError } from "@apollo/client";
import PubSub from "../../pubsub/Pubsub";
import { toast } from "react-toastify";

const ItemType = "LEAD_CARD";

const leadStageMap: { [key: string]: string } = {
  "New Lead": "NEW",
  Negotiation: "NEGOTIATION",
  Qualified: "QUALIFIED", 
  "Closed Win": "CLOSED_WON",
  "Closed Lost": "CLOSED_LOST",
};

const LeadCardDnD: React.FC<LeadCardDnDProps> = ({
  id,
  title,
  subtitle,
  data,
  columnId,
  moveCard,
}) => {
  const { refetch } = useOverallLeadsData(1, 117);
  const { updateLead } = useUpdateLead();
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id, columnId, email: subtitle, ...data },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop({
    accept: ItemType,
    drop: async (item: {
      id: string;
      columnId: string;
      email: string;
      firstName: string;
      lastName: string;
      linkedIn: string;
      country: string;
      phone: string;
      leadSource: string;
      initialContactDate: string;
      leadAssignedTo: string;
      leadPriority: string;
      organizationID: string;
      campaignID: string;
      leadNotes: string;
      leadType: string;
    }) => {
      console.log("Dropped Item:", item);

      // Check if ID is retrieved correctly
      if (!item.id) {
        console.error("Lead ID is missing!");
        PubSub.publish("LEAD_UPDATE_ERROR", { message: "Lead ID is missing!" });
        return;
      }

      // Only proceed if the column changes
      if (item.columnId !== columnId) {
        moveCard(item.id, item.columnId, columnId);

        // Publish start of lead update
        PubSub.publish("LEAD_UPDATE_START", { 
          leadId: item.id, 
          fromStage: item.columnId, 
          toStage: columnId 
        });

        // Map the columnId to lead stage
        let formattedDate = item.initialContactDate;
        if (formattedDate && !formattedDate.endsWith("Z")) {
          // Format the date if it's not already in ISO format with Z
          const date = new Date(formattedDate);
          formattedDate = date.toISOString(); // This gives format like "2024-02-24T12:00:00.000Z"
        }
        const newStatus = leadStageMap[columnId] || columnId; // Fallback to raw columnId if not mapped
        console.log(`Mapped Status: ${newStatus}`);
        const leadUpdatePayload = {
          firstName: item.firstName,
          lastName: item.lastName,
          email: item.email,
          linkedIn: item.linkedIn,
          country: item.country,
          phone: item.phone,
          leadSource: item.leadSource,
          leadType: "SMALL",
          initialContactDate: formattedDate,
          leadAssignedTo: item.leadAssignedTo,
          leadStage: newStatus,
          leadNotes: item?.leadNotes || "good",
          leadPriority: item.leadPriority,
          organizationID: item.organizationID,
          campaignID: item.campaignID,
        };

        try {
          const result = await updateLead(item.id, leadUpdatePayload);
          refetch();
          if (!result) {
            throw new Error("Update returned null");
          }

          // Publish successful lead update
          PubSub.publish("LEAD_UPDATE_SUCCESS", { 
            leadId: item.id,
            leadName: `${item.firstName} ${item.lastName}`,
            fromStage: item.columnId, 
            toStage: columnId,
            result
          });
          
          console.log("Lead updated successfully!", result);
        } catch (error) {
          console.error("Failed to update Lead:", error);
          
          // Publish lead update error
          PubSub.publish("LEAD_UPDATE_ERROR", { 
            leadId: item.id,
            fromStage: item.columnId, 
            toStage: columnId,
            error: error instanceof ApolloError ? error.message : "Unknown error"
          });
          
          if (error instanceof ApolloError) {
            console.error("Apollo Error:", error.message);
          }
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