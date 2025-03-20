import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  dashboardMeetingsJson,
  dashboardRecentJson,
} from "../../api/jsonService/dashboardJsonService";
import {
  dashboardMeetingsApi,
  dashboardRecentApi,
} from "../../api/apiService/dashboardApiService";

const Meetings = () => {
  interface Meeting {
    title: string;
    time: string;
    meetingLink?: string;
    date: Date; // Added date field for sorting
  }

  interface Recent {
    name: string;
    message: string;
  }

  // Define types for API data structure
  interface ApiMeeting {
    title: string;
    time: string;
    meetingLink?: string;
  }

  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [recent, setRecent] = useState<Recent[]>([]);
  const [recentView, setRecentView] = useState("today");
  const [isLoading, setIsLoading] = useState(true);

  // Get auth tokens from Redux store
  const auth = useSelector((state: any) => state.auth);
  const { googleAccessToken } = auth || {};

  const useDummyData =
    process.env.NEXT_PUBLIC_USE_DUMMY_DATA?.trim().toLowerCase() === "true";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch dummy data if flag is set
        if (useDummyData) {
          const [meetingsData, recentData] = await Promise.all([
            dashboardMeetingsApi(),
            dashboardRecentApi(),
          ]);
          
          // Convert API meetings to our Meeting type with date
          const convertedMeetings = convertApiMeetingsToMeetings(meetingsData?.meetings ?? []);
          setMeetings(convertedMeetings);
          setRecent(recentData?.recent ?? []);
          setIsLoading(false);
          return;
        }
        
        // Try to fetch Google Calendar data if we have a token
        if (googleAccessToken) {
          try {
            // Get today's date at midnight
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            // Calculate date 7 days from now
            const sevenDaysFromNow = new Date(today);
            sevenDaysFromNow.setDate(today.getDate() + 7);
            
            // Calculate date 7 days ago
            const sevenDaysAgo = new Date(today);
            sevenDaysAgo.setDate(today.getDate() - 7);
            
            // Fetch all events from 7 days ago to 7 days from now
            const calendarEvents = await fetchGoogleCalendarEvents(
              googleAccessToken,
              sevenDaysAgo.toISOString(),
              sevenDaysFromNow.toISOString()
            );
            
            if (calendarEvents && calendarEvents.length > 0) {
              setMeetings(calendarEvents);
              
              // Still fetch recent data from local source
              const recentData = dashboardRecentJson();
              setRecent(recentData ?? []);
              
              setIsLoading(false);
              return;
            }
          } catch (calendarError) {
            console.error("Error fetching Google Calendar events:", calendarError);
            // Fall back to dummy data if Google Calendar fetch fails
          }
        }
        
        // Fallback to local JSON data
        const meetingsData = dashboardMeetingsJson();
        const recentData = dashboardRecentJson();
        
        // Convert the JSON meetings to our Meeting type with date
        const convertedMeetings = convertApiMeetingsToMeetings(meetingsData ?? []);
        setMeetings(convertedMeetings);
        setRecent(recentData ?? []);
        
      } catch (error) {
        console.error("Error fetching data:", error);
        // If all else fails, set empty arrays
        setMeetings([]);
        setRecent([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [useDummyData, googleAccessToken]);

  // Helper function to convert API meetings to our Meeting type
  const convertApiMeetingsToMeetings = (apiMeetings: ApiMeeting[]): Meeting[] => {
    return apiMeetings.map(meeting => {
      // Parse time string to extract date information if possible
      // Assuming format like "March 20, 10:00 AM - 11:00 AM" or just "10:00 AM - 11:00 AM"
      let meetingDate = new Date();
      
      // Try to parse the date from the time string
      if (meeting.time && meeting.time.includes(",")) {
        const datePart = meeting.time.split(",")[0];
        try {
          meetingDate = new Date(`${datePart}, ${new Date().getFullYear()}`);
        } catch (e) {
          console.error("Failed to parse date from time string:", e);
        }
      }
      
      // If time contains "Tomorrow", set date to tomorrow
      if (meeting.time && meeting.time.toLowerCase().includes("tomorrow")) {
        meetingDate = new Date();
        meetingDate.setDate(meetingDate.getDate() + 1);
      }
      
      return {
        ...meeting,
        date: meetingDate
      };
    });
  };

  // Helper function to fetch Google Calendar events
  const fetchGoogleCalendarEvents = async (
    accessToken: string,
    timeMin: string,
    timeMax: string
  ): Promise<Meeting[]> => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&timeMax=${timeMax}&maxResults=50&orderBy=startTime&singleEvents=true`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", response);

      if (!response.ok) {
        throw new Error(`Failed to fetch calendar events: ${response.status}`);
      }

      const data = await response.json();
      console.log("data", data);
      
      // Format and filter events to get only meetings
      const formattedMeetings = data.items
        .filter((event: any) => {
          // Filter for events that are meetings (has conferenceData or contains meeting keywords)
          return (
            event.conferenceData ||
            (event.summary &&
              (event.summary.toLowerCase().includes("meeting") ||
                event.summary.toLowerCase().includes("call") ||
                event.summary.toLowerCase().includes("conference")))
          );
        })
        .map((event: any) => ({
          title: event.summary || "Untitled Meeting",
          time: formatEventTime(event),
          meetingLink: getMeetingLink(event),
          date: new Date(event.start?.dateTime || event.start?.date), 
        }));

      console.log("formattedMeetings", formattedMeetings);
      return formattedMeetings;
    } catch (error) {
      console.error("Error in fetchGoogleCalendarEvents:", error);
      throw error;
    }
  };
  
  // Helper function to format event time
  const formatEventTime = (event: any): string => {
    const start = new Date(event.start?.dateTime || event.start?.date);
    const end = new Date(event.end?.dateTime || event.end?.date);
    
    // Check if it's an all-day event
    if (!event.start?.dateTime) {
      return "All day";
    }
    
    // Format date and time
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const startDate = new Date(start);
    startDate.setHours(0, 0, 0, 0);
    
    let datePrefix = "";
    if (startDate.getTime() === today.getTime()) {
      datePrefix = "Today, ";
    } else if (startDate.getTime() === tomorrow.getTime()) {
      datePrefix = "Tomorrow, ";
    } else {
      datePrefix = start.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ", ";
    }
    
    // Format time
    const startTime = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const endTime = end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    return `${datePrefix}${startTime} - ${endTime}`;
  };

  // Helper function to get meeting link
  const getMeetingLink = (event: any): string => {
    if (event.conferenceData && event.conferenceData.entryPoints) {
      const videoEntry = event.conferenceData.entryPoints.find(
        (entry: any) => entry.entryPointType === "video"
      );
      if (videoEntry) {
        return videoEntry.uri;
      }
    }
    
    // Look for URLs in the description
    if (event.description) {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const matches = event.description.match(urlRegex);
      if (matches && matches.length > 0) {
        return matches[0];
      }
    }
    
    return "";
  };

  // Handle joining a meeting
  const handleJoinMeeting = (meetingLink: string) => {
    if (meetingLink) {
      window.open(meetingLink, '_blank');
    }
  };

  // Handle copying meeting link
  const handleCopyLink = (meetingLink: string) => {
    if (meetingLink) {
      navigator.clipboard.writeText(meetingLink);
    }
  };

  // Filter meetings for today tab (today + upcoming 7 days)
  const getTodayMeetings = () => {
    const now = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(now.getDate() + 7);
    
    return meetings
      .filter(meeting => {
        const meetingDate = new Date(meeting.date);
        return meetingDate >= now && meetingDate <= sevenDaysLater;
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  // Filter meetings for recent tab (past 7 days)
  const getRecentMeetings = () => {
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);
    
    return meetings
      .filter(meeting => {
        const meetingDate = new Date(meeting.date);
        console.log("meetingDate",meetingDate);
        console.log("meetingDate < now && meetingDate >= sevenDaysAgo",meetingDate < now && meetingDate >= sevenDaysAgo);
        return meetingDate < now && meetingDate >= sevenDaysAgo;
      })
      .sort((a, b) => b.date.getTime() - a.date.getTime()); 
  };

  // Get the appropriate meetings based on the selected view
  const displayMeetings = recentView === "today" ? getTodayMeetings() : getRecentMeetings();

  return (
    <div className="w-full h-40 md:h-56">
      <div className="bg-white rounded-xl shadow-custom">
        <div className="border-b border-bg-blue-12 ">
          <div className="flex space-x-4 md:space-x-8 mb-4 overflow-x-auto ml-5">
            <button className="text-bg-blue-12 text-base md:text-lg font-semibold whitespace-nowrap mt-3">
              Meetings
            </button>
            <button
              className={`text-black text-base md:text-lg font-semibold pb-2 whitespace-nowrap mt-4 ${
                recentView === "today" ? "border-b-2 border-bg-blue-12" : ""
              }`}
              onClick={() => setRecentView("today")}
            >
              Today
            </button>
            <button
              className={`text-black text-base md:text-lg font-semibold whitespace-nowrap pb-2 mt-4 ${
                recentView === "recent" ? "border-b-2 border-bg-blue-12" : ""
              }`}
              onClick={() => setRecentView("recent")}
            >
              Recent
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <p>Loading...</p>
          </div>
        ) : (
          <div className="scrollbar-custom overflow-y-auto max-h-[300px] pl-6 pr-6 pb-6">
            {displayMeetings.length > 0 ? (
              displayMeetings.map((meeting, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between pb-4 mr-4 ${
                    index !== displayMeetings.length - 1 ? "border-b border-content-border" : ""
                  }`}
                >
                  <div className="flex items-center space-x-3 md:space-x-4 min-w-0 mt-4">
                    <div className="clock_icon">
                      <img src="clock.svg" alt="Clock" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-gray-800 text-sm md:text-base truncate ">
                        {meeting.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-500">
                        {meeting.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex mt-4">
                    {meeting.meetingLink && (
                      <button 
                        className="border shadow-sm bg-white p-2 rounded-md mr-4"
                        onClick={() => handleCopyLink(meeting.meetingLink || "")}
                      >
                        <img src="/link.svg" alt="Link" />
                      </button>
                    )}
                    <button 
                      className="join_button"
                      onClick={() => handleJoinMeeting(meeting.meetingLink || "")}
                      disabled={!meeting.meetingLink}
                    >
                      Join
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center h-32 text-gray-500">
                {recentView === "today" 
                  ? "No upcoming meetings found for the next 7 days" 
                  : "No meetings found from the past 7 days"}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Meetings;