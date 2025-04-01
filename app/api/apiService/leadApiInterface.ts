export interface LeadAssignedTo {
  userID: string;
  name: string;
  email: string;
}


export interface Lead {
  leadID: string;
  leadStage: string;
  campaign?: {
    campaignCountry?: string;
  };
  leadSource: string;
  initialContactDate: string;
  leadAssignedTo?: LeadAssignedTo; 
  country: string;
  firstName: string;
  lastName:string;
  email:string;
}


export interface Deal {
    dealID: string;
    dealName: string;
    leadID: string;
    dealStartDate: string;
    dealEndDate: string;
    projectRequirements: string;
    dealAmount: string;
    dealStatus: string;
      user: {
      userID: string;
      name: string;
    };
  }


 export interface DealsResponse {
    getDeals?: {
      items?: Deal[];
      totalCount?: number;
    };
    deals?: Deal[];
  }



  export  interface TeamMember {
    name: string;
    totalLead: number;
    totalWon: number;
    totalLost: number;
    averageCloseRate: string;
    totalRevenue: string;
  }


  export interface CountryLeadStats {
    newLeads: number;
    inProgress: number;
    followUp: number;
    closedWon: number;
    closedLost: number;
    dealLeads: number;
  }


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

  export interface IntegratedMeeting {
    lead?: Lead;
    meeting: Meeting;
    attendeeEmail?: string;
  }


  export interface LeadPerformanceMetrics {
    totalSales: number;
    winRate: number;
    avgDaysToClose: number;
  }


  export function isDealsArray(data: any): data is Deal[] {
    return Array.isArray(data);
  }