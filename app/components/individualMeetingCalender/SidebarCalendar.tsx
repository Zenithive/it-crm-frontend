import { useState } from "react";
import {
    useEventHandlers,
    useMiniCalendarHandlers,
  
    getUpcomingEvents,
    
  } from "./CalendarHandelars";
  import {events} from "./CalendarEvents";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";


export const SidebarCalendar = () => {
     const [date, setDate] = useState(new Date(2021, 1, 27)); // February 27, 2021
      const [view, setView] = useState<
        "month" | "week" | "work_week" | "day" |"year"
      >("week");

     const {
        
        handleSelectEvent,
      
      } = useEventHandlers();
    
      const {
        miniCalendarMonth,
        miniCalendarDays,
        handleMiniCalendarSelect,
        navigateMiniCalendar,
      } = useMiniCalendarHandlers(date, setDate, setView);

        const upcomingEventDays = getUpcomingEvents(date);

return(<>

<div className="bg-bg-gray-19 ">
          <div className="w-80 mt-[16px]  border-r border-gray-200 p-4 overflow-y-auto h-[calc(100vh-4rem)] ">
            <div className="flex items-center mb-2">
              <div className="flex space-x-2 text-gray-500">
                <div className="h-[11px] w-[11px] rounded-full bg-indigo-500"></div>
                <div className="h-[11px] w-[11px] rounded-full  bg-indigo-500"></div>
                <div className="h-[11px] w-[11px] rounded-full  bg-indigo-500"></div>
              </div>
              <button className="ml-auto p-[5px] rounded hover:bg-gray-300 bg-gray-200 ">
                <svg
                  className="h-4 w-4 text-black "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
              </button>
            </div>

            {/* Mini calendar */}
            <div className="mb-4 ">
              <div className="flex items-center justify-between mb-2 pt-[15px] ">
                <div className="font-bold text-[27px]">
                  {miniCalendarMonth.format("MMMM")}{" "}
                  <span className="text-red-500 font-normal">
                    {miniCalendarMonth.format("YYYY")}
                  </span>
                </div>
                <div className="flex text-[20px]">
                  <button
                    className="p-1 text-black hover:text-gray-700 "
                    onClick={() => navigateMiniCalendar("prev")}
                  >
                    <FaAngleLeft className="opacity-60" />
                  </button>
                  <button
                    className="p-1 text-black hover:text-gray-700"
                    onClick={() => navigateMiniCalendar("next")}
                  >
                    <FaAngleRight className="opacity-60" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 text-center text-xs text-gray-500 mb-1">
                <div>SUN</div>
                <div>MON</div>
                <div>TUE</div>
                <div>WED</div>
                <div>THU</div>
                <div>FRI</div>
                <div>SAT</div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {miniCalendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`h-6 w-6 flex items-center justify-center text-xs rounded-full cursor-pointer ${
                      !day.isCurrentMonth
                        ? "text-gray-400"
                        : day.isSelected
                        ? "bg-indigo-500 text-white"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => handleMiniCalendarSelect(day.date)}
                  >
                    {day.date.format("D")}
                  </div>
                ))}
              </div>
            </div>

        
            

<div>
  {upcomingEventDays.length > 0 ? (
    upcomingEventDays.map((day, idx) => (
      <div key={idx}>
        <div className="text-sm text-indigo-500 mb-2 mt-4 flex justify-between">
          <div className="flex gap-3 justify-center items-center">
            <span className="font-medium">{day.dayName}</span>
            <span>{day.formattedDate}</span>
          </div>
          <span>55°/44° ☀️</span>
        </div>

        {day.events.map((event) => (
          <div
            key={event.id}
            className="mb-2 pl-4 cursor-pointer hover:bg-gray-50 relative"
            style={{
              borderColor:
                event.color.replace("bg-", "") === "indigo-500"
                  ? "#6366f1"
                  : event.color.replace("bg-", "") === "red-500"
                  ? "#ef4444"
                  : "#f59e0b",
            }}
            onClick={() => {
              const fullEvent = events.find((e) => e.id === event.id);
              if (fullEvent) {
                setDate(fullEvent.start);
                setView("day");
                setTimeout(() => {
                  handleSelectEvent(fullEvent);
                }, 300);
              }
            }}
          >
            <div
              className="absolute left-0 top-3 transform -translate-y-1/2 w-2.5 h-2.5 rounded-full"
              style={{
                backgroundColor:
                  event.color.replace("bg-", "") === "indigo-500"
                    ? "#6366f1"
                    : event.color.replace("bg-", "") === "red-500"
                    ? "#ef4444"
                    : "#f59e0b",
              }}
            ></div>

            <div className="pl-6">
              <div className="text-xs text-gray-500 font-medium">{event.time}</div>
              <div className="flex flex-col">
                <div className="text-sm font-medium">{event.title}</div>
                <div className="text-xs text-gray-500">https://zoom.us/j/848473123</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ))
  ) : (
    // Show message if no events exist
    <div className="text-gray-500 text-center py-4">No events added.</div>
  )}

  <div className="mt-4 flex justify-center">
    <button className="text-sm text-indigo-500 hover:text-indigo-700 font-medium">
      View All Events →
    </button>
  </div>
</div>;

          </div>
        </div>
</>)
}