// CalendarHandlers.tsx
import { useState, useCallback } from "react";
import moment from "moment";
import { ToolbarProps } from "react-big-calendar";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { events  } from "./CalendarEvents";

export const useEventHandlers = () => {
  const [eventStart, setEventStart] = useState<Date | null>(null);
  const [eventEnd, setEventEnd] = useState<Date | null>(null);
  const [newEventTitle, setNewEventTitle] = useState("");

  // Handle event selection
  const handleSelectEvent = useCallback((event: any) => {
    setEventStart(event.start);
    setEventEnd(event.end);
    setNewEventTitle(event.title); // Set existing event 
  }, []);

  // Handle selecting a slot on the calendar
  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      setEventStart(start);
      setEventEnd(end);
    },
    []
  );

  return {
    eventStart,
    eventEnd,
    newEventTitle,
    setNewEventTitle,
    handleSelectEvent,
    handleSelectSlot,
  };
};

export const useMiniCalendarHandlers = (date: Date, setDate: React.Dispatch<React.SetStateAction<Date>>, setView: React.Dispatch<React.SetStateAction<"month" | "week" | "work_week" | "day" | "year">>) => {
  const [miniCalendarMonth, setMiniCalendarMonth] = useState(
    moment(new Date(2021, 1, 1))
  );

  // Generate mini calendar days
  const generateMiniCalendarDays = () => {
    const startDate = moment(miniCalendarMonth);
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
      const day = moment(new Date(miniCalendarMonth.year(), miniCalendarMonth.month(), i));
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

  // Handle mini calendar date selection
  const handleMiniCalendarSelect = (selectedDate: moment.Moment) => {
    setDate(selectedDate.toDate());
    setView("day"); // Switch to day view when selecting a date from mini calendar
  };

  // Navigate to previous or next month in mini calendar
  const navigateMiniCalendar = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setMiniCalendarMonth(moment(miniCalendarMonth).subtract(1, "month"));
    } else if (direction === "next") {
      setMiniCalendarMonth(moment(miniCalendarMonth).add(1, "month"));
    }
  };

  return {
    miniCalendarMonth,
    miniCalendarDays: generateMiniCalendarDays(),
    handleMiniCalendarSelect,
    navigateMiniCalendar,
  };
};

export const useEventFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const getFilteredEvents = () => {
    return searchTerm
      ? events.filter((event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : events;
  };

  return {
    searchTerm,
    handleSearch,
    filteredEvents: getFilteredEvents(),
  };
};

export const getUpcomingEvents = (date: Date) => {
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

  const sortedDates = Object.keys(groupedEvents).sort();
  for (const date of sortedDates) {
    if (moment(date).isSameOrAfter(now, "day")) {
      upcoming.push({
        date,
        formattedDate: moment(date).format("M/D/YYYY"),
        dayName: moment(date).format("dddd").toUpperCase(),
        events: groupedEvents[date],
      });
      if (upcoming.length >= 4) break;
    }
  }

  return upcoming;
};

export const CustomToolbar = (
  toolbar: ToolbarProps<
    { id: number; title: string; start: Date; end: Date; color: string },
    object
  >,
  view: string,
  searchTerm: string,
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
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

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center shadow-custom rounded-[6px] ">
        <button
          onClick={goToBack}
          className="flex justify-center items-center space-x-2 p-2"
        >
          <FaAngleLeft />
        </button>

        <button
          onClick={goToCurrent}
          className="px-3 py-1 text-sm font-normal border-l-2 border-r-2 border-gray-300 hover:bg-gray-100"
        >
          Today
        </button>

        <button
          className="flex justify-center items-center p-2"
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
            view === "year"
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
          className="absolute left-2 top-2 h-4 w-4"
        />
      </div>
    </div>
  );
};

export const calendarFormats = {
  dayHeaderFormat: (date: Date) => {
    return moment(date).format("ddd").toUpperCase();
  },
  timeGutterFormat: (date: Date) => {
    return moment(date).format("h A");
  },
};

export const EventComponent = ({
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



