
import React, { useEffect, useState } from 'react';



import { fetchFromAPIForKanbanView } from "../../api/apiService/OverallLeadApiService";
import { fetchFromJSONForKanbanView } from "../../api/jsonService/OverallLeadsJsonService";
import './overallLeads.css';
import {ColumnForKanbanView} from './OverallLeadsData';

import ColumnComponent from './KanbanColComp';



const KanbanView: React.FC = () => {
  const [columns, setColumns] = useState<ColumnForKanbanView[]>([]);
  const [visibleCards, setVisibleCards] = useState<number>(3);


   const useAPI = process.env.NEXT_PUBLIC_USE_API === "false";
    useEffect(() => {
      const fetchData = async () => {
        const data = useAPI ? await fetchFromAPIForKanbanView() : await fetchFromJSONForKanbanView();
        setColumns(data);
      };
  
      fetchData();
    }, [useAPI]);

  const handleAddCard = () => {
    if (visibleCards < columns.length) {
      setVisibleCards(visibleCards + 1);
    }
  };

  const moveCard = (draggedId: string, sourceColumnId: string, targetColumnId: string) => {
    setColumns((prevColumns) => {
      const sourceColumn = prevColumns.find((col) => col.title === sourceColumnId);
      const targetColumn = prevColumns.find((col) => col.title === targetColumnId);
      if (!sourceColumn || !targetColumn) return prevColumns;

      const cardToMove = sourceColumn.items.find((item) => item.id === draggedId);
      if (!cardToMove) return prevColumns;

      const updatedSource = {
        ...sourceColumn,
        items: sourceColumn.items.filter((item) => item.id !== draggedId),
      };

      const updatedTarget = {
        ...targetColumn,
        items: [...targetColumn.items, cardToMove],
      };

      return prevColumns.map((col) => {
        if (col.title === sourceColumnId) return updatedSource;
        if (col.title === targetColumnId) return updatedTarget;
        return col;
      });
    });
  };

  const cardWidth = `${80 / visibleCards}%`;

  return (
  

    <main className="p-6 rounded-lg relative">
  <div
    className="flex gap-6 rounded-lg justify-center pb-6 w-full overflow-auto scrollbar-none "
    style={{
      width: "100%",
      scrollBehavior: "smooth",
      flexDirection: window.innerWidth < 768 ? "column" : "row", // Change direction based on screen size
      maxHeight: window.innerWidth < 768 ? "80vh" : "auto", // Add max height for vertical scrolling
    }}
  >
    {Array.isArray(columns) ? columns.slice(0, visibleCards).map((column, columnIndex) => (
      <ColumnComponent key={columnIndex} column={column} moveCard={moveCard} cardWidth={cardWidth} />
    )):<p>No columns available</p>}
  </div>

  <div className="flex justify-center mt-4">
    <button
      onClick={handleAddCard}
      className="plus_icon bg-bg-blue-12 text-white px-4 py-2 rounded-[12px] hover:bg-blue-700"
      aria-label="Add new item"
    >
      +
    </button>
  </div>
</main>

  );
};

export default KanbanView;
