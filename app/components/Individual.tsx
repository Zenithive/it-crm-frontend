import React from "react";
import {
  Mail,
  Phone,
  Building2,
  Users,
  Linkedin,
  ChevronDown,
  Edit,
  Search,
  Plus,
  Reply,
  ExternalLink,
} from "lucide-react";
import Navbar from "./Navbar";
import { nav } from "./Path/TaskData";
import Individual_Title from "./Individual/IndividualTitle";
import LeftSide from "./Individual/LeftSide";
import TimeLine from "./Individual/TimeLine";
import RightSide from "./Individual/RightSide";

interface TimelineItem {
  type: "email" | "deal";
  date: string;
  content: string;
  sender: string;
  dealNumber?: string;
}

const Individual = () => {
  const timelineData: TimelineItem[] = [
    {
      type: "email",
      date: "7 Feb 2020 at 4:20 AM GMT+13",
      content:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen",
      sender: "Sachin Tendu",
    },
    {
      type: "deal",
      date: "7 Feb 2020 at 4:20 AM GMT+13",
      content: "moved to integration - Won by API",
      sender: "Sachin Tendu",
      dealNumber: "#1111",
    },
  ];

  return (
    <div>
      <Navbar nav={nav[0]}></Navbar>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <Individual_Title />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar */}
            <div className="lg:col-span-3">
              <LeftSide />
            </div>

            {/* Timeline Section */}
            <div className="lg:col-span-6">
              <TimeLine />
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-3">
              <RightSide />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Individual;
