
interface CardProps {
    id: string;
    title: string;
    subtitle: string;
    className?: string;
  }
  
  export const LeadCard = ({ id, title, subtitle, className = '' }: CardProps) => {
    return (
      <div 
        className={`p-3 mb-3 bg-blue_shadow rounded-lg transition-shadow ${className} `}
        data-card-id={id}
      >
        <h3 className="text-indigo-500 font-medium text-[17px]">{title}</h3>
        <p className="text-black text-[12.5px] font-normal">{subtitle}</p>
      </div>
    );
  };
  