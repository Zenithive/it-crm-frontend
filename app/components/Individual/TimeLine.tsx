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

interface TimelineItem {
  type: "email" | "deal";
  date?: string;
  content?: string;
  sender?: string;
  dealNumber?: string;
}

const TimeLine = () => {
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
      <div className="">
        <div className="bg-white rounded-lg shadow-custom p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-bg-blue-12">Timeline</h2>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <img src="/SearchIcon.svg" alt="Search"></img>
            </button>
          </div>

          <div className="space-y-6">
            {timelineData.map((item, index) => (
              <div key={index} className="border-b pb-6">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <img src="/individual_icon_4.svg" alt="Mail"></img>
                      <div className="text-sm text-gray-500">{item.date}</div>
                    </div>
                    <p className="text-gray-700 mb-4">{item.content}</p>
                    <div className="flex items-center gap-4">
                      <img
                        src="https://i.pravatar.cc/40"
                        alt={item.sender}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{item.sender}</p>
                        <p className="text-sm text-gray-500">
                          to ClarVision@firm.co
                        </p>
                      </div>
                      <button className="ml-auto text-indigo-600 hover:text-indigo-700">
                        Details <ChevronDown size={16} className="inline" />
                      </button>
                    </div>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mt-4">
                      <Reply size={16} />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
