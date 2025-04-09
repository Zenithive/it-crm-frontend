import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  dashboardRecentJson,
} from "../../api/jsonService/dashboardJsonService";

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

  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [recent, setRecent] = useState<Recent[]>([]);
  const [recentView, setRecentView] = useState("upcoming");
  const [isLoading, setIsLoading] = useState(true);
  const [needsGoogleLogin, setNeedsGoogleLogin] = useState(false);
  // Add state for toast notification
  const [showToast, setShowToast] = useState(false);

  // Get auth tokens from Redux store
  const auth = useSelector((state: any) => state.auth);
  const { googleAccessToken, isLoggedIn } = auth || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Check if user is logged in but no Google token is available
        if (isLoggedIn && !googleAccessToken) {
          // Set flag to show Google login message
          setNeedsGoogleLogin(true);
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
            // If Google Calendar fetch fails, show empty state
            setMeetings([]);
            setIsLoading(false);
            return;
          }
        } else {
          // No Google token available, set needsGoogleLogin flag
          setNeedsGoogleLogin(true);
        }
        
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
  }, [googleAccessToken, isLoggedIn]);

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

      if (!response.ok) {
        throw new Error(`Failed to fetch calendar events: ${response.status}`);
      }

      const data = await response.json();
      
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

  // Handle copying meeting link with toast notification
  const handleCopyLink = (meetingLink: string) => {
    if (meetingLink) {
      navigator.clipboard.writeText(meetingLink);
      // Show toast notification
      setShowToast(true);
      // Hide toast after 3 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  // Filter meetings for upcoming tab (today + upcoming 7 days)
  const getUpcomingMeetings = () => {
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
        return meetingDate < now && meetingDate >= sevenDaysAgo;
      })
      .sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort in descending order by date
  };

  // Get the appropriate meetings based on the selected view
  const displayMeetings = recentView === "upcoming" ? getUpcomingMeetings() : getRecentMeetings();

  // Function to handle Google login
  const handleGoogleLogin = () => {
    // Redirect to Google authentication endpoint
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
  };

  return (
    <div className="w-full h-40 md:h-56 relative">
      {/* Toast notification */}
      {showToast && (
        <div className="absolute top-2 right-2 z-50 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Link copied to clipboard!
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow-custom min-h-[370px]">
        <div className="border-b border-bg-blue-12 ">
          <div className="flex space-x-4 md:space-x-8 mb-4 overflow-x-auto ml-5">
            <button className="text-bg-blue-12 text-base md:text-lg font-semibold whitespace-nowrap mt-3">
              Meetings
            </button>
            <button
              className={`text-black text-base md:text-lg font-semibold pb-2 whitespace-nowrap mt-4 ${
                recentView === "upcoming" ? "border-b-2 border-bg-blue-12" : ""
              }`}
              onClick={() => setRecentView("upcoming")}
            >
              Upcoming
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
        ) : needsGoogleLogin ? (
          <div className="flex flex-col justify-center items-center h-48 p-6 text-center">
            <p className="text-gray-700 mb-4">Please login with your Google email to sync your meetings from Google Calendar.</p>
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="flex items-center justify-center gap-3 p-2 px-4 border border-bg-blue-12 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <img src="/google.svg" className="w-5 h-5" alt="Google" />
              <span className="text-bg-blue-12 font-medium">
                Login with Google
              </span>
            </button>
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
                        className="border shadow-sm bg-white p-2 rounded-md mr-4 hover:bg-gray-50 transition-colors"
                        onClick={() => handleCopyLink(meeting.meetingLink || "")}
                        aria-label="Copy meeting link"
                        title="Copy meeting link"
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
                {recentView === "upcoming" 
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