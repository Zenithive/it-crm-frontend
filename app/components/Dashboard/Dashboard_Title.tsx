
import Title from "../../microComponents/Title";
import { ChevronDown, Settings } from "lucide-react";
import { Dashboardtitle } from "../Path/TitlePaths";


const Dashboard_Title = () => {
  return (
    <div>
      <div className="flex justify-between items-center" data-testid="dashboard-title">
        <Title title={Dashboardtitle[0].titleName} />
        
        <div className="flex items-center space-x-4">
            
        <div className="bg-white flex p-4 rounded-xl h-12 space-x-4">
          <div className="flex items-center ">
            <img src="flag_india.svg" alt="flag" className="mr-1" />
            <img src="vector(1).svg" alt="dropdown" className="h-4 w-4 text-gray-500 ml-3" />
            <div className="h-6 w-px bg-bg-blue-11 ml-3"></div>
          </div>
          <div className="text-gray-600 flex justify-center items-center">12:00 PM</div>
          </div>

          <button className="bg-[#6366F1] text-white px-4 py-1.5 rounded-lg text-sm flex items-center h-11 ">
            <img src="lead_icon.svg" alt="icon" className="p-2"></img>
            Lead
          </button>
        </div>
        </div>
      </div>
    
  );
};

export default Dashboard_Title;
