import { useState } from 'react';

export interface CalendarAttendee {
  email: string;
  responseStatus?: string;
}

export interface Meeting {
  title: string;
  time: string;
  date: Date;
  meetingLink?: string;
  attendees: CalendarAttendee[];
  organizer: string;
}

export const useGoogleCalendarService = (googleAccessToken?: string) => {
  const [googleMeetingsLoading, setGoogleMeetingsLoading] = useState(false);
  const [googleMeetingsError, setGoogleMeetingsError] = useState<string | null>(null);



  // Helper function to format event time
  const formatEventTime = (event: any): string => {
    const start = new Date(event.start?.dateTime || event.start?.date);
    const end = new Date(event.end?.dateTime || event.end?.date);
    
    if (!event.start?.dateTime) {
      return "All day";
    }
    
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
    
    const startTime = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const endTime = end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    return `${datePrefix}${startTime} - ${endTime}`;
  };

  // Helper function to extract meeting link
  const getMeetingLink = (event: any): string => {
    if (event.conferenceData && event.conferenceData.entryPoints) {
      const videoEntry = event.conferenceData.entryPoints.find(
        (entry: any) => entry.entryPointType === "video"
      );
      if (videoEntry) {
        return videoEntry.uri;
      }
    }
    
    if (event.description) {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const matches = event.description.match(urlRegex);
      if (matches && matches.length > 0) {
        return matches[0];
      }
    }
    
    return "";
  };

  // Fetch Google Calendar Events
  const fetchGoogleCalendarEvents = async (): Promise<Meeting[]> => {
    if (!googleAccessToken) return [];

    try {
      const now = new Date();
      const sevenDaysAgo = new Date(now);
      sevenDaysAgo.setDate(now.getDate() - 7);
      const sevenDaysLater = new Date(now);
      sevenDaysLater.setDate(now.getDate() + 7);

      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${sevenDaysAgo.toISOString()}&timeMax=${sevenDaysLater.toISOString()}&maxResults=50&orderBy=startTime&singleEvents=true`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${googleAccessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch calendar events: ${response.status}`);
      }

      const data = await response.json();
      
      return data.items
        .filter((event: any) => 
          event.conferenceData || 
          (event.summary && 
            (event.summary.toLowerCase().includes("meeting") || 
             event.summary.toLowerCase().includes("call")))
        )
        .map((event: any) => ({
          title: event.summary || "Untitled Meeting",
          time: formatEventTime(event),
          date: new Date(event.start?.dateTime || event.start?.date),
          meetingLink: getMeetingLink(event),
          attendees: event.attendees || [],
          organizer: event.organizer?.email || ''
        }));

    } catch (error) {
      console.error("Error fetching Google Calendar events:", error);
      return [];
    }
  };

  // Integrate Leads and Meetings
  const integrateLeadsAndMeetings = (
    meetings: Meeting[], 
    leads: any[]
  ): any[] => {
    const integrated: any[] = [];

    meetings.forEach(meeting => {
      const attendeeEmails = meeting.attendees
        .filter(attendee => attendee.email !== meeting.organizer)
        .map(attendee => attendee.email.toLowerCase());
        
      const matchedLeads = leads.filter(lead => 
        lead.email && attendeeEmails.includes(lead.email.toLowerCase())
      );

      if (matchedLeads.length > 0) {
        matchedLeads.forEach(lead => {
          integrated.push({
            lead,
            meeting: {
              title: meeting.title,
              time: meeting.time,
              date: meeting.date,
              meetingLink: meeting.meetingLink,
              attendees: meeting.attendees,
              organizer: meeting.organizer
            }
          });
        });
      }
    });

    return integrated;
  };

  return {
    fetchGoogleCalendarEvents,
    integrateLeadsAndMeetings,
    googleMeetingsLoading,
    googleMeetingsError
  };
};