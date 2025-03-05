
// MetricCard Component
interface MetricCardProps {
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
  }

  export const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, isPositive }) => {
    return (
    
      <div className="px-6 py-4 justify-center items-center flex flex-col">
        <h3 className="text-bg-blue-12 font-semibold mb-2 text-2xl">{title}</h3>
        <div className="flex flex-col justify-center items-center">
          <span className="text-2xl text-gray-800">{value}</span>
          <span className={`text-sm mt-1 flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {change}
          </span>
        </div>
      </div>
    
    );
  };
  