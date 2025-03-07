import { useDrop } from 'react-dnd';
import './overallLeads.css';

import React from 'react';
import LeadCardDnD from './DragAndDrop';

import {ColumnPropsForKanban} from './OverallLeadsData';

const ColumnComponent: React.FC<ColumnPropsForKanban> = ({ column, moveCard, cardWidth }) => {

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
        <span className="text-[18px]">({column.number})</span>
      </h2>
      <div className="space-y-2 px-4 py-2 rounded-lg custom_scrollbar h-[calc(100%-4.5rem)]">
        {column.items.map((item) => (
          <LeadCardDnD
            key={item.id}
            id={item.id}
            title={item.title}
            subtitle={item.subtitle}
            index={column.items.indexOf(item)}
            columnId={column.title}
            moveCard={moveCard}
          />
        ))}
      </div>
    </div>
  );
};

export default ColumnComponent;
