import React, { useState, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { ToolbarProps } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

const localizer = momentLocalizer(moment);

const ClarivionCalendar = () => {
  const [date, setDate] = useState(new Date(2021, 1, 27)); // February 27, 2021
  const [view, setView] = useState<
    "month" | "week" | "work_week" | "day" | "agenda"
  >("week");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample events data matching the image
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Monday Wake-Up Hour",
      start: new Date(2021, 1, 22, 8, 0), // Feb 22, 2021, 8:00 AM
      end: new Date(2021, 1, 22, 9, 0),
      color: "#6366f1", // indigo
    },
    {
      id: 2,
      title: "Design Review: Acme Portal",
      start: new Date(2021, 1, 23, 9, 0), // Feb 23, 2021, 9:00 AM
      end: new Date(2021, 1, 23, 10, 0),
      color: "#8b5cf6", // violet
    },
    {
      id: 3,
      title: "All-Team Kickoff",
      start: new Date(2021, 1, 24, 8, 0), // Feb 24, 2021, 8:00 AM
      end: new Date(2021, 1, 24, 9, 0),
      color: "#6366f1", // indigo
    },
    {
      id: 4,
      title: "Webinar: Figma Techniques",
      start: new Date(2021, 1, 23, 8, 0), // Feb 23, 2021, 8:00 AM
      end: new Date(2021, 1, 23, 9, 0),
      color: "#10b981", // emerald
    },
    {
      id: 5,
      title: "Coffee Chat",
      start: new Date(2021, 1, 25, 8, 0), // Feb 25, 2021, 8:00 AM
      end: new Date(2021, 1, 25, 9, 0),
      color: "#6366f1", // indigo
    },
    {
      id: 6,
      title: "Coffee Chat",
      start: new Date(2021, 1, 26, 9, 0), // Feb 26, 2021, 9:00 AM
      end: new Date(2021, 1, 26, 10, 0),
      color: "#8b5cf6", // violet
    },
    {
      id: 7,
      title: "Financial Update",
      start: new Date(2021, 1, 22, 10, 0), // Feb 22, 2021, 10:00 AM
      end: new Date(2021, 1, 22, 11, 0),
      color: "#6366f1", // indigo
    },
    {
      id: 8,
      title: "Weekly Recap",
      start: new Date(2021, 1, 26, 10, 0), // Feb 26, 2021, 10:00 AM
      end: new Date(2021, 1, 26, 11, 0),
      color: "#8b5cf6", // violet
    },
    {
      id: 9,
      title: "Onboarding Presentation",
      start: new Date(2021, 1, 24, 11, 30), // Feb 24, 2021, 11:30 AM
      end: new Date(2021, 1, 24, 12, 30),
      color: "#8b5cf6", // violet
    },
    {
      id: 10,
      title: "New Employee Welcome Lunch",
      start: new Date(2021, 1, 22, 11, 0), // Feb 22, 2021, 11:00 AM
      end: new Date(2021, 1, 22, 12, 0),
      color: "#f59e0b", // amber
    },
    {
      id: 11,
      title: "All-Hands Company Meeting",
      start: new Date(2021, 1, 27, 8, 30), // Feb 27, 2021, 8:30 AM
      end: new Date(2021, 1, 27, 9, 0),
      color: "#6366f1", // indigo
    },
    {
      id: 12,
      title: "Quarterly review",
      start: new Date(2021, 1, 27, 9, 30), // Feb 27, 2021, 9:30 AM
      end: new Date(2021, 1, 27, 10, 0),
      color: "#6366f1", // indigo
    },
    {
      id: 13,
      title: "AI Design System Feedback Lunch",
      start: new Date(2021, 1, 24, 12, 0), // Feb 24, 2021, 12:00 PM
      end: new Date(2021, 1, 24, 13, 0),
      color: "#6366f1", // indigo
    },
    {
      id: 14,
      title: "Visit to discuss improvements",
      start: new Date(2021, 1, 28, 8, 30), // Feb 28, 2021, 8:30 AM
      end: new Date(2021, 1, 28, 9, 0),
      color: "#ef4444", // red
    },
    {
      id: 15,
      title: "Presentation of new products and cost structure",
      start: new Date(2021, 1, 28, 14, 0), // Feb 28, 2021, 2:00 PM
      end: new Date(2021, 1, 28, 15, 0),
      color: "#6366f1", // indigo
    },
    {
      id: 16,
      title: "City Sales Pitch",
      start: new Date(2021, 2, 1, 8, 30), // Mar 1, 2021, 8:30 AM
      end: new Date(2021, 2, 1, 9, 0),
      color: "#ef4444", // red
    },
    {
      id: 17,
      title: "Visit to discuss improvements",
      start: new Date(2021, 2, 2, 8, 30), // Mar 2, 2021, 8:30 AM
      end: new Date(2021, 2, 2, 9, 0),
      color: "#f59e0b", // yellow
    },
  ]);

  // Custom event component to style events
  const EventComponent = ({
    event,
  }: {
    event: { start: Date; title: string };
  }) => {
    return (
      <div className="flex flex-col h-full">
        <div className="text-xs text-gray-100">
          {moment(event.start).format("h:mm A")}
        </div>
        <div className="text-sm font-medium">{event.title}</div>
      </div>
    );
  };

  const [newEventTitle, setNewEventTitle] = useState("");

  const [eventStart, setEventStart] = useState<Date | null>(null);
  const [eventEnd, setEventEnd] = useState<Date | null>(null);

  // Handle event selection
  const handleSelectEvent = useCallback((event: any) => {
    setEventStart(event.start);
    setEventEnd(event.end);
    setNewEventTitle(event.title); // Set existing event title for editing
  }, []);

  // Handle selecting a slot on the calendar
  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      setEventStart(start);
      setEventEnd(end);
    },
    []
  );

  // Generate mini calendar days
  const generateMiniCalendarDays = () => {
    const startDate = moment(new Date(2021, 1, 1));
    const days = [];
    const daysInMonth = startDate.daysInMonth();

    // Previous month days
    const firstDay = moment(startDate).startOf("month").day();
    const prevMonthDays = firstDay === 0 ? 0 : firstDay;

    for (let i = 0; i < prevMonthDays; i++) {
      const day = moment(startDate).subtract(prevMonthDays - i, "days");
      days.push({
        date: day,
        isCurrentMonth: false,
        isToday: day.isSame(moment(), "day"),
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const day = moment(new Date(2021, 1, i));
      days.push({
        date: day,
        isCurrentMonth: true,
        isToday: day.isSame(moment(), "day"),
        isSelected: day.isSame(moment(date), "day"),
      });
    }

    // Next month days
    const lastDay = moment(startDate).endOf("month").day();
    const nextMonthDays = lastDay === 6 ? 0 : 6 - lastDay;

    for (let i = 1; i <= nextMonthDays; i++) {
      const day = moment(startDate).endOf("month").add(i, "days");
      days.push({
        date: day,
        isCurrentMonth: false,
        isToday: day.isSame(moment(), "day"),
      });
    }

    return days;
  };

  const miniCalendarDays = generateMiniCalendarDays();

  // Handle mini calendar date selection
  const handleMiniCalendarSelect = (selectedDate: moment.Moment) => {
    setDate(selectedDate.toDate());
    setView("day"); // Switch to day view when selecting a date from mini calendar
  };

  // Get upcoming events for the sidebar
  const getUpcomingEvents = () => {
    const now = moment(date);
    const upcoming = [];

    // Group events by date
    const groupedEvents: {
      [key: string]: {
        id: number;
        title: string;
        date: string;
        temp: string;
        time: string;
        color: string;
      }[];
    } = {};

    events.forEach((event) => {
      const eventDate = moment(event.start).format("YYYY-MM-DD");
      if (!groupedEvents[eventDate]) {
        groupedEvents[eventDate] = [];
      }
      groupedEvents[eventDate].push({
        id: event.id,
        title: event.title,
        date: moment(event.start).format("M/D/YYYY"),
        temp: "58°/40°", // Sample temperature
        time: `${moment(event.start).format("h:mm")} - ${moment(
          event.end
        ).format("h:mm A")}`,
        color:
          event.color === "#6366f1"
            ? "bg-indigo-500"
            : event.color === "#ef4444"
            ? "bg-red-500"
            : event.color === "#f59e0b"
            ? "bg-yellow-500"
            : "bg-indigo-500",
      });
    });

    // Sort dates and add to upcoming
    const sortedDates = Object.keys(groupedEvents).sort();
    for (const date of sortedDates) {
      if (moment(date).isSameOrAfter(now, "day")) {
        upcoming.push({
          date,
          formattedDate: moment(date).format("M/D/YYYY"),
          dayName: moment(date).format("dddd").toUpperCase(),
          events: groupedEvents[date],
        });
        if (upcoming.length >= 4) break; // Limit to 4 days
      }
    }

    return upcoming;
  };

  const upcomingEventDays = getUpcomingEvents();

  // Handle search
  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const filteredEvents = searchTerm
    ? events.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : events;

  // Custom toolbar for the Calendar
  const CustomToolbar = (
    toolbar: ToolbarProps<
      { id: number; title: string; start: Date; end: Date; color: string },
      object
    >
  ) => {
    const { date, onNavigate, onView } = toolbar;

    const goToBack = () => {
      onNavigate("PREV");
    };

    const goToNext = () => {
      onNavigate("NEXT");
    };

    const goToCurrent = () => {
      onNavigate("TODAY");
    };

    const label = () => {
      const dateFormat = "MMMM YYYY";
      return (
        <span className="text-lg font-bold">
          {moment(date).format(dateFormat)}
        </span>
      );
    };

    return (
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center shadow-custom rounded-[6px] ">
          {/* Previous Button */}
          <button
            onClick={goToBack}
            className="flex justify-center items-center space-x-2 p-2"
          >
            <FaAngleLeft />
          </button>

          {/* Today Button */}
          <button
            onClick={goToCurrent}
            className="px-3 py-1 text-sm font-normal  border-l-2 border-r-2 border-gray-300 hover:bg-gray-100"
          >
            Today
          </button>

          {/* Horizontal Line Between Buttons */}

          {/* Next Button */}
          <button
            className="flex justify-center items-center p-2 "
            onClick={goToNext}
          >
            <FaAngleRight />
          </button>
        </div>

        <div className="flex space-x-2 text-[14px] text-gray-500 font-semibold">
          <button
            onClick={() => onView("day")}
            className={`px-4 py-1 text-sm rounded-[12px] shadow-custom ${
              view === "day"
                ? "bg-indigo-500 text-white"
                : "bg-white border border-gray-300 hover:bg-gray-100"
            }`}
          >
            Day
          </button>
          <button
            onClick={() => onView("week")}
            className={`px-4 py-1 text-sm rounded-[12px] shadow-custom ${
              view === "week"
                ? "bg-indigo-500 text-white"
                : "bg-white border border-gray-300 hover:bg-gray-100"
            }`}
          >
            Week
          </button>
          <button
            onClick={() => onView("month")}
            className={`px-4 py-1 text-sm rounded-[12px] shadow-custom ${
              view === "month"
                ? "bg-indigo-500 text-white"
                : "bg-white border border-gray-300 hover:bg-gray-100"
            }`}
          >
            Month
          </button>
          <button
            onClick={() => onView("agenda")}
            className={`px-4 py-1 text-sm rounded-[12px] shadow-custom ${
              view === "agenda"
                ? "bg-indigo-500 text-white"
                : "bg-white border border-gray-300 hover:bg-gray-100"
            }`}
          >
            Year
          </button>
        </div>

        <div className="relative flex gap-4">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className="pl-8 pr-4 py-1 text-sm bg-white border border-gray-300 rounded-[12px] shadow-custom focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <img
            src="SearchIcon.svg"
            alt="Search"
            className="absolute left-2 top-2 h-4 w-4 "
          />
        </div>
      </div>
    );
  };

  // Custom event styling
  const eventStyleGetter = (event: { color?: string }) => {
    return {
      style: {
        backgroundColor: event.color || "#6366f1",
        borderRadius: "4px",
        color: "white",
        border: "none",
        padding: "2px 5px",
      },
    };
  };

  // Navigate to previous or next month in mini calendar
  const [miniCalendarMonth, setMiniCalendarMonth] = useState(
    moment(new Date(2021, 1, 1))
  );

  const navigateMiniCalendar = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setMiniCalendarMonth(moment(miniCalendarMonth).subtract(1, "month"));
    } else if (direction === "next") {
      setMiniCalendarMonth(moment(miniCalendarMonth).add(1, "month"));
    }
  };

  // Fixed formats object - These need to return strings, not React components
  const formats = {
    dayHeaderFormat: (date: Date) => {
      return moment(date).format("ddd").toUpperCase();
    },
    timeGutterFormat: (date: Date) => {
      return moment(date).format("h A");
    },
  };

  return (
    <div className="flex h-screen shadow-prim rounded-[12px] mt-[35px] border-b-2">
      {/* Main content */}
      <div className="flex w-full ">
        {/* Sidebar */}
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
            <div className="mb-4">
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

            {/* Upcoming events */}
            <div>
              {upcomingEventDays.map((day, idx) => (
                <div key={idx}>
                  <div className="text-sm  text-indigo-500 mb-2 mt-4 flex justify-between">
                    <div className="flex gap-3 justify-center items-center">
                      <span className="font-medium"> {day.dayName} </span>
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
                        className="absolute left-0  top-3 transform -translate-y-1/2 w-2.5 h-2.5 rounded-full"
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
                        <div className="text-sm  font-medium">
                          {event.title}
                        </div>
                        <div className="text-xs text-gray-500 flex flex-col">
                          <div>{event.time}</div>

                          <div>https://zoom.us/j/848473123</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              <div className="mt-4 flex justify-center">
                <button className="text-sm text-indigo-500 hover:text-indigo-700 font-medium">
                  View All Events →
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Calendar */}
        <div className="flex-1 p-4 mt-[16px] w-auto">
          <Calendar
            localizer={localizer}
            events={filteredEvents}
            startAccessor="start"
            endAccessor="end"
            defaultView="week"
            view={view}
            onView={setView}
            date={date}
            onNavigate={setDate}
            style={{ height: "calc(100vh - 4rem)" }}
            components={{
              toolbar: CustomToolbar,
              event: EventComponent,
            }}
            formats={formats}
            eventPropGetter={(event) => {
              // Assuming event.color is defined, else you can use any other property to determine the color
              const backgroundColor = event.color || "#3498db"; // Default to blue if no color is set
              return {
                style: {
                  borderLeft: `6px solid ${backgroundColor}`, // Left border with color
                  borderRadius: "4px",
                  padding: "10px", // Increase padding for a bigger box
                  overflow: "visible", // Allow content to overflow
                  whiteSpace: "normal", // Allow text wrapping
                  fontSize: "14px", // Increase font size for better readability
                  textOverflow: "ellipsis", // Prevent overflow text
                  minHeight: "50px", // Set a minimum height for each event
                  maxHeight: "auto", // Allow events to grow vertically if needed
                  boxSizing: "border-box", // Ensure padding and borders are included in the size
                },
              };
            }}
            dayPropGetter={() => ({
              className: "text-sm",
            })}
            timeslots={1}
            step={60}
            showMultiDayTimes
            min={new Date(2021, 1, 22, 7, 0)}
            max={new Date(2021, 1, 22, 18, 0)}
            selectable
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            popup
            longPressThreshold={250}
          />
        </div>
      </div>
    </div>
  );
};

export default ClarivionCalendar;
