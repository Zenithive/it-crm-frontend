
// MetricCard Component
interface MetricCardProps {
  title: string;
  displayValue: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  displayValue, 
}) => {
  return (
    <div className="px-6 py-4 justify-center items-center flex flex-col">
      <h3 className="text-bg-blue-12 font-semibold mb-2 text-2xl">{title}</h3>
      <div className="flex flex-col justify-center items-center">
        <span className="text-2xl text-gray-800">{displayValue}</span>
      </div>
    </div>
  );
};
  