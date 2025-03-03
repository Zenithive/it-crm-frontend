import { ChevronDown, ChevronUp } from "lucide-react";

// MetricCard Component
interface MetricCardProps {
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
  }

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, isPositive }) => {
    return (
      <div className="px-6 py-4">
        <h3 className="text-indigo-500 font-medium mb-2">{title}</h3>
        <div className="flex flex-col">
          <span className="text-2xl font-semibold text-gray-800">{value}</span>
          <span className={`text-sm mt-1 flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? 
              <ChevronUp className="w-3 h-3 mr-1" /> : 
              <ChevronDown className="w-3 h-3 mr-1" />
            }
            {change}
          </span>
        </div>
      </div>
    );
  };