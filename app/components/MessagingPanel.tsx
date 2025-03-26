"use client"
import React, { useState, useEffect } from "react";
import Sidebar from "../components/MessagingPanel/Sidebar";
import ConversationList from "../components/MessagingPanel/ConversationList";
import Message from "../components/MessagingPanel/Messages";
import { messagingpanelApi } from "../api/apiService/messagingpanelApiService";
import { messagingpanel } from "../api/jsonService/messagingpanelJsonService";
import {search} from "./Path/TaskData";

  // Channels
  const channels = [
    { id: 1, name: "Email", icon: <img src='gmail.svg' alt='Email' className='w-5 h-5' /> },
    { id: 2, name: "LinkedIn", icon: <img src='linkedin.svg' alt='Linkedin' className='w-7 h-7' /> },
    { id: 3, name: "Upwork", icon: <img src='upwork.svg' alt='Upwork' className='w-5 h-5' /> }
  ];


const useStaticData = true; // Toggle flag to switch between static and API data

const MessagingPanel: React.FC = () => {
  interface Conversation {
    id: number;
    sender: string;
    time: string;
    date: string;
  }
  
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeChannel, setActiveChannel] = useState<string>("LinkedIn");
  const [activeConversation, setActiveConversation] = useState<string>("");
  interface Message {
    id: number;
    sender: string;
    content: string;
    receiver: string;
    attachment: {
      name: string;
      size: string;
    };
  }
  
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (useStaticData) {
      const data = messagingpanel();
      setConversations(data.conversations);
      setMessages(data.messages ||[]);
    } else {
      messagingpanelApi().then((data) => {
        setConversations(data.conversations);
        setMessages(data.messages ||[]);
      });
    }
  }, []);

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
          <Sidebar channels={channels} activeChannel={activeChannel} setActiveChannel={setActiveChannel} />
          <ConversationList 
            conversations={conversations} 
            activeConversation={activeConversation} 
            setActiveConversation={setActiveConversation} 
            searchText="" // Adjust based on search logic
          />
          <Message activeConversation={activeConversation} messages={messages} />
        </div>
      </div>
    </div>
  );
};

export default MessagingPanel;
