import React, { useEffect, useRef, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import FilterDropdown from "../CleveldashboardFilter/cleveldashboard.filter";

interface CircularProgressProps {
  value: number;
  title: string;
  isCurrency?: boolean; 
  img: string;
  onFilterChange?: (filter: string) => void;
  activeFilter?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ value, title, isCurrency = false ,img, onFilterChange,
  activeFilter}) => {

   const [showFilter, setShowFilter] = useState(false);
    // const [activeFilter, setActiveFilter] = useState("none");
    const filterRef = useRef<HTMLDivElement>(null);
  const isActiveLeads = title === "Active Leads"; 
  const safeValue = isCurrency ? value : Math.min(value, 100); 
  const dropdownRef = useRef<HTMLDivElement>(null); 
  const displayValue = isCurrency ? `$${value.toLocaleString()}` : `${safeValue}%`; 
 

  const data = [
    { name: "Completed", value: safeValue },
    { name: "Remaining", value: isCurrency ? 0 : 100 - safeValue },
  ];

  const COLORS = ["#6158FF", "#E5E7EB"];
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       filterRef.current &&
  //       !filterRef.current.contains(event.target as Node)
  //     ) {
  //       // setShowFilter(false);
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  // const handleFilterClick = (e: React.MouseEvent) => {
  //   e.stopPropagation(); // Prevent event from bubbling
   
  //   setShowFilter(prevState => !prevState);
  // };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current && !filterRef.current.contains(event.target as Node) &&
        dropdownRef.current && !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFilterClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling
    setShowFilter(prevState => !prevState);
  };

  const applyFilter = (filterType: string) => {
    console.log('Applying filter:', filterType);
    
  if (onFilterChange) {
    onFilterChange(filterType);
  }
    
    setShowFilter(false);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center ">
      <div className="flex justify-between items-center w-full mb-2 relative gap-2">
        <div className='flex justify-center items-center'ref={filterRef} >
        <img src={img} alt='Image' className="w-5 h-5 " ></img>
        <span className="text-2xl font-semibold text-bg-blue-12 ml-4">{title}</span>
        </div>
        <div  ref={dropdownRef} >
        <img 
            src="filter.svg" 
            alt="Filter" 
            className="cursor-pointer" 
            onClick={handleFilterClick} 
          />
          {showFilter && (
            <div onClick={(e) => e.stopPropagation()} > <FilterDropdown
            showFilter={showFilter}
            toggleFilter={() => setShowFilter(false)}
            applyFilter={applyFilter}
            activeFilter={activeFilter || ""}
            pageType="CircularProgress"
            /></div>
           
           
               
          
          )}
         </div>
      </div>

      <div className="relative w-[140px] h-[140px] flex items-center justify-center">
        <PieChart width={120} height={120}>
          <Pie
            data={data}
            cx={60}
            cy={60}
            innerRadius={40}
            outerRadius={55}
            paddingAngle={3}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>

      
        <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-900">
          {isActiveLeads ? value : displayValue}  
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;
