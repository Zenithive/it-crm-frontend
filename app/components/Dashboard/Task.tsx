import React ,{useState} from "react";
import "./Dashboard.css";

const Task = ({tasks= [],followup=[]}) => {
  const [activeView, setActiveView] = useState("today"); // 'today' or 'followup'

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
        <div className="border-b">
          <div className="flex space-x-4 md:space-x-8 mb-4 overflow-x-auto">
            <button 
              className={`text-black text-base md:text-lg font-semibold whitespace-nowrap pb-2 ${
                activeView === "today" ? "border-b-2 border-[#6366F1]" : ""
              }`}
              onClick={() => setActiveView("today")}
            >
              Today Task
            </button>
            <button 
              className={`text-black text-base md:text-lg font-semibold whitespace-nowrap pb-2 ${
                activeView === "followup" ? "border-b-2 border-[#6366F1]" : ""
              }`}
              onClick={() => setActiveView("followup")}
            >
              Follow-Ups
            </button>
          </div>
        </div>

        {activeView === "today" ? (
          // Today's Tasks View
          <div className="scrollable_view">
            {tasks.map((task, index) => (
              <div
                key={index}
                className={`flex items-center justify-between pb-4 ${
                  index !== tasks.length - 1 ? "border-b border-gray-300" : ""
                }`}
              >
                <div className="min-w-0 flex-1 pr-4">
                  <h3 className="task_title">
                    {task.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500">{task.dueTime}</p>
                </div>
                <input
                  type="checkbox"
                  className="task_checkbox"
                />
              </div>
            ))}
          </div>
        ) : (
          // Follow-ups View
          <div className="scrollable_view">
            {followup.map((msg, index) => (
              <div
                key={index}
                className={`flex items-center justify-between pb-4 ${
                  index !== followup.length - 1
                    ? "border-b border-gray-300"
                    : ""
                }`}
              >
                <img
                  src="image.svg"
                  alt={msg.name}
                  className="w-8 h-8 md:w-10 md:h-10 mt-1 flex-shrink-0"
                />
                <div className="flex-1 min-w-0 mx-3">
                  <h4 className="font-medium text-gray-800 text-sm md:text-base truncate">
                    {msg.name}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-500 truncate">
                    {msg.message}
                  </p>
                </div>
                <></>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;