import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { events as externalEvents, Event as CalendarEvent } from "./CalendarEvents";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calender.css";

import {
  useEventHandlers,
  useEventFilter,
  CustomToolbar,
  calendarFormats,
  EventComponent
} from "./CalendarHandelars";
import { SidebarCalendar } from "./SidebarCalendar";
const localizer = momentLocalizer(moment);



const ClarivionCalendar = () => {
  const [date, setDate] = useState(new Date(2021, 1, 27)); // February 27, 2021
  const [view, setView] = useState<
    "month" | "week" | "work_week" | "day" |"agenda"
  >("week");

  const [events, setEvents] = useState<CalendarEvent[]>(externalEvents);
 

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [eventData, setEventData] = useState({ title: "", start: new Date(), end: new Date() });


  // Handle adding a new event
  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setSelectedEvent(null);
    setShowModal(true);
    setEventData({ title: "", start, end });
  };

  // Handle selecting an event for editing
  const handleSelectEvent = (event:any) => {
    setSelectedEvent(event);
    setShowModal(true);
    setEventData(event);
  };


  const handleSaveEvent = () => {
    if (!eventData.title.trim()) {
      alert("Event title cannot be empty!");
      return;
    }
  
    // Check if eventData has the necessary fields
    console.log("Saving Event: ", eventData);
  
    if (selectedEvent) {
      // Editing an existing event
      setEvents(events.map((e) => (e.id === selectedEvent.id ? { ...e, ...eventData } : e)));
    } else {
      // Adding a new event
      const newEvent = { id: events.length + 1, ...eventData, color: "#3498db" };
      setEvents([...events, newEvent]);
    }
  
    // Close the modal
    setShowModal(false);
  
    // Verify that the state is updated correctly
    console.log("Updated Events: ", events);
  };
  

  const handleDeleteEvent = () => {
    if (!selectedEvent) return;
    
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents((prevEvents) =>
        prevEvents.filter((e) => e.id !== selectedEvent.id)
      );
      setShowModal(false);
      setSelectedEvent(null);
    }
  };
  

  
  

  const {
    eventStart,
    eventEnd,
    newEventTitle,
    setNewEventTitle,
    // handleSelectEvent,
    // handleSelectSlot,
  } = useEventHandlers();

  const dayPropGetter = (date:any) => {
    if (date.getDay() === 4) { // Thursday
      return {
        className: 'thursday-column',
        style: {
          backgroundColor: '#f0f5ff',
        }
      };
    }
    return {};
  };

  const { searchTerm, handleSearch, filteredEvents } = useEventFilter();


  

  const toolbarWrapper = (toolbarProps: any) => 
    CustomToolbar(toolbarProps, view, searchTerm, handleSearch);

  return (
    <div className="flex h-screen shadow-prim rounded-[12px] mt-[35px] border-b-2">
      {/* Main content */}
      <div className="flex w-full ">
        {/* Sidebar */}
      <SidebarCalendar/>
        {/* Calendar */}
        <div className="flex-1 p-4 mt-[16px] w-auto">
          <Calendar
            localizer={localizer}
            // events={filteredEvents}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultView="week"
            view={view}
            onView={setView}
            date={date}
            onNavigate={setDate}
            style={{ height: "calc(100vh - 4rem)" }}
            components={{
              // toolbar: CustomToolbar,
              toolbar: toolbarWrapper,
              event: EventComponent,
            }}
            // formats={formats}
            formats={calendarFormats}
            eventPropGetter={(event) => {
              
              const backgroundColor = event.color || "#3498db"; 
              const opacity=0.5;
              const padding="5px";
              const isAgendaView = view === "agenda";
              return {
                style: {
                  borderRadius: "4px",
                  backgroundColor: isAgendaView ? "transparent" : `${backgroundColor}${Math.floor(opacity * 255).toString(16)}`,
                  borderLeft: isAgendaView ? "none" : `6px solid ${backgroundColor}`,
                  // padding: "10px",
                  padding: `${padding} ${padding}`,
                  overflow: "visible", 
                  whiteSpace: "normal", 
                  fontSize: "14px",
                  textOverflow: "ellipsis",
                  minHeight: "70px",
                  maxHeight: "auto", 
                  boxSizing: "border-box", 
                position:"relative",
                        marginTop: "5px", // Adds space on top of the event
                  marginBottom: "5px", // Adds space on the bottom of the event
                  marginLeft: "5px", // Adds space on the left side of the event
                  marginRight: "5px",
                },

             className: "event-container"
                
              };
            }}
 
            
            dayPropGetter={dayPropGetter}
            step={60}

            timeslots={1} 
           selectable
            showMultiDayTimes
            min={new Date(2021, 1, 22, 7, 0)}
            max={new Date(2021, 1, 22, 16, 0)}
            // selectable
            onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
            popup
            longPressThreshold={250}
          />



{showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">{selectedEvent ? "Edit Event" : "Add Event"}</h2>
            <input
              type="text"
              placeholder="Event Title"
              value={eventData.title}
              onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
              className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-between">
              <button
                onClick={handleSaveEvent}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                {selectedEvent ? "Update" : "Add"}
              </button>
              {selectedEvent && (
                <button
                  onClick={handleDeleteEvent}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              )}
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );


};

export default ClarivionCalendar;
