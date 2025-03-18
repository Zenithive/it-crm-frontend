import React from "react";
import Search from "../../microComponents/Search";
import { search } from "../../components/Path/TaskData";

interface Conversation {
  id: number;
  sender: string;
  time: string;
  date: string;
}

interface ConversationListProps {
  conversations: Conversation[];
  activeConversation: string;
  setActiveConversation: (conversation: string) => void;
  searchText: string;
}

const ConversationList: React.FC<ConversationListProps> = ({ 
  conversations, 
  activeConversation, 
  setActiveConversation, 
  searchText 
}) => {
  return (
    <div className="w-4/12 border-r border-gray-200 flex flex-col">
      {/* Search Bar */}
      <div className='m-4'>
        <Search searchText={search[4].searchText} value={""} onChange={function (value: string): void {
          throw new Error("Function not implemented.");
        } } />
      </div>

      {/* Conversation List */}
      <div className="flex-1 scrollbar-custom overflow-y-auto mr-2">
        {conversations.map(conv => (
          <div 
            key={conv.id}
            className={`px-4 py-3 border-b border-gray-100 mx-4 flex justify-between ${
              activeConversation === conv.sender ? 'bg-gray-200' : ''
            }`}
            onClick={() => setActiveConversation(conv.sender)}
          >
            <div>
              <h3 className="text-indigo-500 font-medium">{conv.sender}</h3>
              <p className="text-gray-500 text-sm">{conv.time}</p>
            </div>
            <div className="text-indigo-400 text-sm">
              {conv.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
