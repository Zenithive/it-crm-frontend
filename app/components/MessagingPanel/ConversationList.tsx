import React, { useMemo, useState } from "react";
import Search from "../../microComponents/Search";
import { search } from "../../components/Path/TaskData";

interface Conversation {
  id: number;
  sender: string;
  time: string;
  date: string;
  subject?: string;
  snippet?: string;
  unread?: boolean;
}

interface ConversationListProps {
  conversations: Conversation[];
  activeConversation: string;
  setActiveConversation: (conversation: string) => void;
  searchText?: string;
}

const ConversationList: React.FC<ConversationListProps> = ({ 
  conversations, 
  activeConversation, 
  setActiveConversation, 
  searchText: initialSearchText = "" 
}) => {

  const [searchText, setSearchText] = useState(initialSearchText);

  // Memoized filtered conversations
  const filteredConversations = useMemo(() => {
    if (!searchText) return conversations;
    
    return conversations.filter(conv =>
      conv.sender.toLowerCase().includes(searchText.toLowerCase()) ||
      (conv.subject && conv.subject.toLowerCase().includes(searchText.toLowerCase())) ||
      (conv.snippet && conv.snippet.toLowerCase().includes(searchText.toLowerCase()))
    );
  }, [conversations, searchText]);
  
  return (
    <div className="w-4/12 border-r border-gray-200 flex flex-col">
      {/* Search Bar */}
      <div className='m-4'>
     <Search
          searchText="Search emails..."
          value={searchText}
          onChange={(value: string) => setSearchText(value)}
        />
      </div>

      {/* Conversation List */}
      <div className="flex-1 scrollbar-custom overflow-y-auto mr-2">
      {filteredConversations.length > 0 ? (
          filteredConversations.map(conv => (
            <div
              key={conv.id}
              className={`
                px-4 py-3 border-b border-gray-100 flex items-center 
                cursor-pointer transition-colors duration-200
                ${activeConversation === conv.sender 
                  ? 'bg-indigo-50 border-l-4 border-indigo-500' 
                  : 'hover:bg-gray-50'}
                ${conv.unread ? 'font-semibold' : ''}
              `}
              onClick={() => setActiveConversation(conv.sender)}
            >
              <div className="flex-1 mr-2 overflow-hidden">
                <div className="flex items-center justify-between">
                  <h3 className={`
                    text-gray-800  truncate max-w-full
                    ${conv.unread ? 'text-indigo-600' : 'text-indigo-600'}
                  `}>
                    {conv.sender}
                    {conv.unread && (
                      <span className="ml-2 bg-indigo-500 text-white text-xs px-2 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                  </h3>
                  <div className="text-indigo-600 text-xs">
                    {conv.date}
                  </div>
                </div>
                <p className="text-gray-500 text-sm truncate mt-1">
                 {conv.time}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            <p>No conversations found</p>
            <p className="text-sm mt-2">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
