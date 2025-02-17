
import Title from "../../microComponents/Title";
import { Dashboardtitle } from "../Path/TitlePaths";


const Dashboard_Title = ({Dashboardtitle}) => {
  return (
    <div>
      <div className="flex justify-between items-center"  data-testid="dashboard-title" >
        <Title title={Dashboardtitle[0].titleName}/>
        
        <div className="flex items-center space-x-4">
            
        <div className="bg-white flex p-4 rounded-xl h-12 space-x-4 shadow-custom">
          <div className="flex items-center ">
            <img src="flag_india.svg" alt="flag" className="mr-1" />
            <img src="vector(1).svg" alt="dropdown" className="h-4 w-4 text-gray-500 ml-3" />
            <div className="h-6 w-px bg-bg-blue-11 ml-3"></div>
          </div>
          <div className="text-gray-600 flex justify-center items-center">12:00 PM</div>
          </div>

          <button className="lead_button">
            <img src="lead_icon.svg" alt="icon" className="p-2"></img>
            Lead
          </button>
        </div>
        </div>
      </div>
    
  );
};

export default Dashboard_Title;
