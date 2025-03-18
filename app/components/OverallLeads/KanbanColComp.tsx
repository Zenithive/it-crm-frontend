import { useDrop } from "react-dnd";
import "./overallLeads.css";

import React, { useEffect, useMemo } from "react";
import LeadCardDnD from "./DragAndDrop";

import { ColumnPropsForKanban } from "./OverallLeadsData";
import useOverallLeadsData from "../../api/apiService/OverallLeadApiService";
import { IoMdCloseCircleOutline } from "react-icons/io";

const columnToStageMap: Record<string, string> = {
  "New Lead": "NEW",
  Negotiation: "IN_PROGRESS",
  Qualified: "FOLLOW_UP",

  "Closed Win": "CLOSED_WON",
  Lost: "CLOSED_LOST",
};

const ColumnComponent: React.FC<ColumnPropsForKanban> = ({
  column,
  moveCard,
  cardWidth,
  setColumns,
  minColumns,
  visibleCards,
  setVisibleCards,
}) => {
  const {
    leads: allLeads,
    loading,
    error,
    refetch,
  } = useOverallLeadsData(1, 117);

  const stageValue = columnToStageMap[column.title];

  const filteredLeads = useMemo(() => {
    if (!allLeads || allLeads.length === 0) return [];

    return allLeads.filter((lead: any) => {
      const leadStage = lead.leadStage;

      if (Array.isArray(stageValue)) {
        return stageValue.includes(leadStage);
      } else {
        // Otherwise, do a direct comparison
        return leadStage === stageValue;
      }
    });
  }, [allLeads, stageValue, column.title]);

  const [{ isOver }, drop] = useDrop({
    accept: "LEAD_CARD",
    canDrop: (item: { id: string; columnId: string }) => {
      // Prevent dropping onto the same column
      return item.columnId !== column.title;
    },
    drop: (item: { id: string; columnId: string }) => {
      if (item.columnId !== column.title) {
        moveCard(item.id, item.columnId, column.title);
        refetch();
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver() && monitor.canDrop(),
    }),
  });

  const handleRemoveColumn = () => {
    setColumns((prevColumns) => {
      return prevColumns.filter((col) => col.title !== column.title);
    });

    setVisibleCards((prev) => Math.max(minColumns, prev - 1));
  };

  const dropRef = React.useRef<HTMLDivElement>(null);
  drop(dropRef);

  return (
    <div
      ref={dropRef}
      className={`h-[500px] bg-gray-50 rounded-lg shadow-prim mx-2 mainCard ${
        isOver ? "bg-blue-300" : ""
      }`}
      style={{ flex: `0 0 ${cardWidth}` }}
    >
      <h2 className="font-semibold mb-4 text-white bg-bg-blue-12 p-3 title_set ">
        <div className="gap-3 flex justify-center items-center">
          <span className="text-xl">{column.title}</span>
          {/* <span className="text-[18px]">({column.number})</span> */}

          <span className="text-[18px]">({filteredLeads?.length || 0})</span>
        </div>
        {visibleCards > minColumns && (
          <IoMdCloseCircleOutline
            className="text-[20px] cursor-pointer"
            onClick={handleRemoveColumn}
          />
        )}
      </h2>

      <div className="space-y-2 px-1 py-2 rounded-lg custom_scrollbar h-[calc(100%-4.5rem)]">
        {filteredLeads.map((item: any) => (
          <LeadCardDnD
            key={item.leadID}
            id={item.leadID}
            title={`${item.firstName} ${item.lastName}`}
            subtitle={item.email}
            // index={column.items.indexOf(item)}
            data={{
              firstName: item.firstName,
              lastName: item.lastName,
              linkedIn: item.linkedIn,
              country: item.country,
              phone: item.phone,
              leadSource: item.leadSource,
              leadNotes: item.notes,
              leadType: item.leadType,
              initialContactDate: item.initialContactDate,
              leadAssignedTo: item.leadAssignedTo?.name,
              leadPriority: item.leadPriority,
              organizationID: item.organization?.organizationID,
              campaignID: item.campaign?.campaignID,
            }}
            index={filteredLeads.indexOf(item)}
            columnId={column.title}
            moveCard={moveCard}
          />
        ))}
      </div>
    </div>
  );
};

export default ColumnComponent;
