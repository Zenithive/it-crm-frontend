"use client"
import React, { useState, useEffect } from "react";
import Sidebar from "../components/MessagingPanel/Sidebar";
import ConversationList from "../components/MessagingPanel/ConversationList";
import Message from "../components/MessagingPanel/Messages";
import { messagingpanelApi } from "../api/apiService/messagingpanelApiService";
import { messagingpanel } from "../api/jsonService/messagingpanelJsonService";
import { useGmailEmails } from "../api/apiService/googleemail.service";

// Channels
const channels = [
  { id: 1, name: "Email", icon: <img src='gmail.svg' alt='Email' className='w-5 h-5' /> },
  { id: 2, name: "LinkedIn", icon: <img src='linkedin.svg' alt='Linkedin' className='w-7 h-7' /> },
  { id: 3, name: "Upwork", icon: <img src='upwork.svg' alt='Upwork' className='w-5 h-5' /> }
];

const MessagingPanel: React.FC = () => {
  interface Conversation {
    id: number;
    sender: string;
    time: string;
    date: string;
    subject?: string;
    snippet?: string;
  }
  
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeChannel, setActiveChannel] = useState<string>("Email");
  const [activeConversation, setActiveConversation] = useState<string>("");
  const [displayedConversations, setDisplayedConversations] = useState<Conversation[]>([]);

  // Fetch Gmail emails
  const { emails, isLoading, error } = useGmailEmails();

 
  useEffect(() => {
    const conversationData = emails.length > 0 
      ? emails 
      : messagingpanel().conversations;
    
    setConversations(conversationData);
    setDisplayedConversations(conversationData);
  }, [emails]);

  // Update conversations based on active channel
  useEffect(() => {
    if (activeChannel === "Email") {
      setDisplayedConversations(conversations);
    } else {
      const filteredConversations = conversations.filter(conv => 
        conv.sender.toLowerCase().includes(activeChannel.toLowerCase())
      );
      setDisplayedConversations(filteredConversations);
    }
  }, [activeChannel, conversations]);

  return (
    <div className="flex w-full h-screen bg-blue-background mb-2">
      <div className="flex flex-col w-full mx-auto shadow-lg bg-white mt-4 max-w-[1400px] rounded-xl">
        {/* Header */}
        <div className="flex bg-indigo-500 text-white rounded-t-lg">
          <div className="w-4/12 px-4 py-4 text-xl font-medium">All Messages</div>
          <div className="w-5/12 px-4 py-4 text-xl font-medium">{activeChannel}</div>
          <div className="w-7/12 px-4 py-4 text-xl font-medium">Messages</div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          <Sidebar 
            channels={channels} 
            activeChannel={activeChannel} 
            setActiveChannel={setActiveChannel} 
          />
          <ConversationList 
            conversations={displayedConversations} 
            activeConversation={activeConversation} 
            setActiveConversation={setActiveConversation} 
            searchText=""
          />
          <Message 
            activeConversation={activeConversation} 
            messages={[]} 
          />
        </div>
      </div>
    </div>
  );
};

export default MessagingPanel;