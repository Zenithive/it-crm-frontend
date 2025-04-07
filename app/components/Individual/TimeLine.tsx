import React, { useState, useEffect } from "react";
import { ChevronDown, Reply } from "lucide-react";
import { useGmailEmails } from "../../api/apiService/googleemail.service";
import leadApiService from "../../api/apiService/individualleadService";
import { useActivityLogs } from "../../api/apiService/ActivityLogApiService";
import { useSelector } from 'react-redux';
import ActivityDetailsModal from "../ActivityDetailsModal/ActivityDetailsModal";

// Define literal types explicitly
type TimelineItemType = "email" | "LEAD";

interface TimelineItem {
  type: TimelineItemType;
  date?: string;
  content?: string;
  sender?: string;
  dealNumber?: string;
  subject?: string;
  reference?: string;
  recipient?: string;
  dealTitle?: string;
  status?: string;
  isRead?: boolean;
  userName?: string;
  action?: string;
  id?: string;
  oldData?: string; 
  newData?: string;
}

interface TimeLineProps {
  leadId: string;
  refetchTrigger?: number; 
}

const TimeLine: React.FC<TimeLineProps> = ({ leadId,refetchTrigger = 0 }) => {
  const [timelineData, setTimelineData] = useState<TimelineItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { emails, isLoading: emailsLoading, error: emailError } = useGmailEmails();
  const { lead, loading: leadLoading, error: leadError } = leadApiService(leadId);
  const { activityLogs, loading: logsLoading, error: logsError,refetch } = useActivityLogs("LEAD", leadId);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<TimelineItem | null>(null);
  
  // Get the logged-in user's email from Redux state
  const auth = useSelector((state: any) => state.auth);
  const loggedInUserEmail = auth?.user?.email;

  useEffect(() => {
    // Only proceed if we have both emails and lead data
    if ((!emails || emails.length === 0 || leadLoading || !lead || !lead.email) && 
        (!activityLogs || activityLogs.length === 0)) return;

    const emailItems: TimelineItem[] = [];
    
    // Process emails if available
    if (emails && lead && lead.email) {
      // Get the lead's email address
      const leadEmail = lead.email.toLowerCase();
      
      // Filter emails that represent communication between the lead and the logged-in user
      const communicationEmails = emails.filter(email => {
        // Check if email address contains the lead's email (partial match)
        const emailAddressMatch = email.emailAddress?.toLowerCase().includes(leadEmail);
        
        // Check if sender display name contains the lead's email (partial match)
        const senderNameMatch = email.sender.toLowerCase().includes(leadEmail);
        
        // Check if the email content mentions the lead's email
        const contentMatch = email.snippet?.toLowerCase().includes(leadEmail);
        
        return emailAddressMatch || senderNameMatch || contentMatch;
      });

      // Convert Gmail emails to timeline format with explicit type casting
      emailItems.push(...communicationEmails.map(email => ({
        type: "email" as TimelineItemType, // Explicit type casting
        date: `${email.date} ${email.time}`,
        content: email.snippet,
        sender: email.sender,
        subject: email.subject,
        reference: `#${email.id}`,
        recipient: email.sender.toLowerCase().includes(leadEmail) ? loggedInUserEmail : leadEmail,
        isRead: email.isRead
      })));
    }

    // Process activity logs if available
    const logItems: TimelineItem[] = [];
    if (activityLogs && activityLogs.length > 0) {
      logItems.push(...activityLogs.map(log => ({
        type: "LEAD" as TimelineItemType, 
        date: new Date(log.changedAt).toLocaleString(),
        content: log.action,
        userName: log.user.name,
        action: log.action,
        id: log.id,
        oldData: log.oldData,
        newData: log.newData  
      })));
    }

    // Combine emails with activity logs and sort by date
    const combinedData: TimelineItem[] = [...emailItems, ...logItems].sort((a, b) => {
      return new Date(b.date || "").getTime() - new Date(a.date || "").getTime();
    });

    setTimelineData(combinedData);
  }, [emails, lead, leadLoading, loggedInUserEmail, activityLogs]);

  useEffect(() => {
    if (refetchTrigger > 0) {
      refetch();
    }
  }, [refetchTrigger, refetch]);

  // Handler for opening the modal with activity details
  const handleViewDetails = (item: TimelineItem) => {
    setSelectedActivity(item);
    setIsModalOpen(true);
  };

  // Filter timeline data based on search query
  const filteredData = timelineData.filter(item => {
    const searchLower = searchQuery.toLowerCase();
    return (
      item.content?.toLowerCase().includes(searchLower) ||
      item.sender?.toLowerCase().includes(searchLower) ||
      item.subject?.toLowerCase().includes(searchLower) ||
      item.userName?.toLowerCase().includes(searchLower) ||
      item.action?.toLowerCase().includes(searchLower)
    );
  });

  const renderTimelineItem = (item: TimelineItem) => {
    if (item.type === "email") {
      return (
        <div className={`border-b pb-6 ${item.isRead ? 'bg-gray-50' : 'bg-gray-background'} rounded-lg shadow-custom`}>
          <div className="flex items-start gap-4 p-5">
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center">
                  <img
                    src="/email.svg"
                    alt="Mail"
                    className="w-7 h-7"
                  />
                  <div className="text-bg-blue-12 font-semibold text-lg ml-2">
                    Email {!item.isRead && <span className="bg-blue-100 text-blue-800 text-xs py-1 px-2 rounded-full ml-2">New</span>}
                  </div>
                </div>
                <div className="text-sm text-gray-500">{item.date}</div>
              </div>
              <div className="mb-2">
                <span className="font-medium">{item.subject}</span>
                <span className="text-gray-500 text-sm ml-2">
                  {item.reference}
                </span>
              </div>
              <p className="text-gray-700 mb-4">{item.content}</p>
              <div className="flex items-center gap-4">
                <img
                  src="/profileLogo.svg"
                  alt={item.sender}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="font-medium">{item.sender}</p>
                  <p className="text-sm text-gray-500">to {item.recipient}</p>
                </div>
                <button className="ml-auto text-bg-blue-12 hover:text-indigo-700 flex items-center gap-1">
                  Details <ChevronDown size={16} />
                </button>
              </div>
              <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mt-4">
                <Reply size={16} />
                <span>Reply</span>
              </button>
            </div>
          </div>
        </div>
      );
    } else if (item.type === "LEAD") {
      // Only show view details button if we have both old and new data
      const hasChangeData = item.oldData && item.newData;

      return (
        <div className="border-b pb-6 bg-gray-background rounded-lg shadow-custom">
          <div className="flex items-start gap-4 p-5">
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center">
                  <img src="/deal_icon.svg" alt="Activity" className="w-7 h-7" />
                  <div className="text-bg-blue-12 font-semibold text-lg ml-2">
                   Activity
                  </div>
                </div>
                <div className="text-sm text-gray-500">{item.date}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-700">
                  {item.userName || "User"}
                </span>
                <span className="text-bg-blue-12">{item.action}</span>
                {hasChangeData && (
                  <button 
                    className="text-bg-blue-12 hover:text-indigo-700 ml-2"
                    onClick={() => handleViewDetails(item)}
                  >
                    View details
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-custom p-1 flex flex-col h-screen">
      {/* Fixed header */}
      <div className="flex justify-between items-center p-4 sticky top-0 bg-white z-10 border-b">
        <h2 className="text-2xl font-semibold text-bg-blue-12">Timeline</h2>

        <div className="relative">
          <button
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <img src="/SearchIcon.svg" alt="Search" />
          </button>
          {isSearchOpen && (
            <input
              type="text"
              placeholder="Search timeline..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-6 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="overflow-y-auto flex-1 scrollbar-custom">
        {(leadError || emailError || logsError) && (
          <div className="p-4 text-red-600 bg-red-50 rounded-md m-4">
            {leadError || emailError || logsError}
          </div>
        )}

        {(leadLoading || emailsLoading || logsLoading) ? (
          <div className="flex justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="space-y-4 p-4">
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <div key={index}>{renderTimelineItem(item)}</div>
              ))
            ) : searchQuery ? (
              <div className="text-center text-gray-500 py-8">
                No results found for "{searchQuery}"
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                No communication history or activity found with this lead.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Activity Details Modal */}
      {selectedActivity && (
        <ActivityDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          oldData={selectedActivity.oldData}
          newData={selectedActivity.newData}
          title={`Changes made by ${selectedActivity.userName}`}
        />
      )}
    </div>
  );
};

export default TimeLine;