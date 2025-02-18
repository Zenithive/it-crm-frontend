
import React, { useState } from 'react';
import { columns as initialColumns } from './OverallLeadsData';
import './overallLeads.css';
import LeadCardDnD from './DragAndDrop';
import { useDrop } from 'react-dnd';
import ColumnComponent from './KanbanColComp';

type Item = {
  id: string;
  title: string;
  subtitle: string;
};

type Column = {
  title: string;
  number: number;
  items: Item[];
};



const KanbanView: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [visibleCards, setVisibleCards] = useState<number>(3);

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
      <div className="flex gap-6 rounded-lg justify-center overflow-x-hidden scrollbar-none pb-6 w-full" style={{ width: '100%', scrollBehavior: 'smooth' }}>
        {columns.slice(0, visibleCards).map((column, columnIndex) => (
          <ColumnComponent key={columnIndex} column={column} moveCard={moveCard} cardWidth={cardWidth} />
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <button onClick={handleAddCard} className="plus_icon bg-bg-blue-12 text-white px-4 py-2 rounded-[12px] hover:bg-blue-700" aria-label="Add new item">
          +
        </button>
      </div>
    </main>
  );
};

export default KanbanView;
