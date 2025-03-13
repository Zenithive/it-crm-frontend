

export interface Event {
    id: number;
    title: string;
    start: Date;
    end: Date;
    color: string;
  }
  
  export const events: Event[] = [
    {
      id: 1,
      title: "Monday Wake-Up Hour",
      start: new Date(2021, 1, 22, 8, 0),
      end: new Date(2021, 1, 22, 9, 0),
      color: "#6366f1",
    },
    {
      id: 2,
      title: "Design Review: Acme Portal",
      start: new Date(2021, 1, 23, 9, 0),
      end: new Date(2021, 1, 23, 10, 0),
      color: "#8b5cf6",
    },
    {
      id: 3,
      title: "All-Team Kickoff",
      start: new Date(2021, 1, 24, 8, 0),
      end: new Date(2021, 1, 24, 9, 0),
      color: "#6366f1",
    },
    {
      id: 4,
      title: "Webinar: Figma Techniques",
      start: new Date(2021, 1, 23, 8, 0),
      end: new Date(2021, 1, 23, 9, 0),
      color: "#10b981",
    },
    {
      id: 5,
      title: "Coffee Chat",
      start: new Date(2021, 1, 25, 8, 0),
      end: new Date(2021, 1, 25, 9, 0),
      color: "#6366f1",
    },
    {
      id: 6,
      title: "Coffee Chat",
      start: new Date(2021, 1, 26, 9, 0),
      end: new Date(2021, 1, 26, 10, 0),
      color: "#8b5cf6",
    },
    {
      id: 7,
      title: "Financial Update",
      start: new Date(2021, 1, 22, 10, 0),
      end: new Date(2021, 1, 22, 11, 0),
      color: "#6366f1",
    },
    {
      id: 8,
      title: "Weekly Recap",
      start: new Date(2021, 1, 26, 10, 0),
      end: new Date(2021, 1, 26, 11, 0),
      color: "#8b5cf6",
    },
    {
      id: 9,
      title: "Onboarding Presentation",
      start: new Date(2021, 1, 24, 11, 30),
      end: new Date(2021, 1, 24, 12, 30),
      color: "#8b5cf6",
    },
    {
      id: 10,
      title: "New Employee Welcome Lunch",
      start: new Date(2021, 1, 22, 11, 0),
      end: new Date(2021, 1, 22, 12, 0),
      color: "#f59e0b",
    },
    {
      id: 11,
      title: "All-Hands Company Meeting",
      start: new Date(2021, 1, 27, 8, 30),
      end: new Date(2021, 1, 27, 9, 0),
      color: "#6366f1",
    },
    {
      id: 12,
      title: "Quarterly review",
      start: new Date(2021, 1, 27, 9, 30),
      end: new Date(2021, 1, 27, 10, 0),
      color: "#6366f1",
    },
    {
      id: 13,
      title: "AI Design System Feedback Lunch",
      start: new Date(2021, 1, 24, 12, 0),
      end: new Date(2021, 1, 24, 13, 0),
      color: "#6366f1",
    },
    {
      id: 14,
      title: "Visit to discuss improvements",
      start: new Date(2021, 1, 28, 8, 30),
      end: new Date(2021, 1, 28, 9, 0),
      color: "#ef4444",
    },
    {
      id: 15,
      title: "Presentation of new products and cost structure",
      start: new Date(2021, 1, 28, 14, 0),
      end: new Date(2021, 1, 28, 15, 0),
      color: "#6366f1",
    },
    {
      id: 16,
      title: "City Sales Pitch",
      start: new Date(2021, 2, 1, 8, 30),
      end: new Date(2021, 2, 1, 9, 0),
      color: "#ef4444",
    },
    {
      id: 17,
      title: "Visit to discuss improvements",
      start: new Date(2021, 2, 2, 8, 30),
      end: new Date(2021, 2, 2, 9, 0),
      color: "#f59e0b",
    },
  ];
  