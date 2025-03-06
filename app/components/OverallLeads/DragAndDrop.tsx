// src/microComponents/LeadCardDnD.tsx
import { useDrag, useDrop } from 'react-dnd';
import { LeadCard } from '../../microComponents/LeadCard';
import { LeadCardDnDProps } from './OverallLeadsData'; 




const ItemType = 'LEAD_CARD';

const LeadCardDnD: React.FC<LeadCardDnDProps> = ({ id, title, subtitle,  columnId, moveCard }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id, columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item: { id: string; columnId: string }) => {
      if (item.columnId !== columnId) {
        moveCard(item.id, item.columnId, columnId);
      }
    },
  }));

  return (
    <div ref={(node) => { if (node) drag(drop(node)); }} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <LeadCard id={id} title={title} subtitle={subtitle} />
    </div>
  );
};

export default LeadCardDnD;
