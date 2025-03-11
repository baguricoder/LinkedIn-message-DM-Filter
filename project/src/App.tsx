import React, { useState } from'react';
import { Inbox, Briefcase, MessageSquare, Star, Archive, Search, Filter } from 'lucide-react';

type Message = {
  id: number;
  sender: string;
  content: string;
  type: 'sales' | 'general' | 'recruitment';
  priority: 'high' | 'medium' | 'low';
  hasAttachments: boolean;
  timestamp: string;
};
const sampleMessages: Message[] = [
  {
    id: 1,
    sender: "John Recruiter",
    content: "We have an exciting opportunity at our company. I've attached our job description and would love to discuss further.",
    type: "recruitment",
    priority: "high",
    hasAttachments: true,
    timestamp: "2024-03-15T10:30:00"
  },
  {
    id: 2,
    sender: "Sales Representative",
    content: "Would you be interested in our new SaaS platform that increases productivity by 300%?",
    type: "sales",
    priority: "low",
    hasAttachments: false,
    timestamp: "2024-03-15T09:15:00"
  },
  {
    id: 3,
    sender: "Tech Lead",
    content: "Hi! I saw your work on GitHub. We're building something exciting and looking for someone with your expertise. I've attached our project details.",
    type: "recruitment",
    priority: "high",
    hasAttachments: true,
    timestamp: "2024-03-14T16:45:00"
  }
];
function App() {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredMessages = messages
    .filter((message:Message)=>{
      if (filter==='all') return true;
      return message.type === filter;
    })
    .filter(message =>
      message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.sender.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sales':
        return <Briefcase className="w-5 h-5 text-blue-500" />;
      case 'recruitment':
        return <Star className="w-5 h-5 text-yellow-500" />;
      default:
        return <MessageSquare className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <><div className="min-h-screen bg-gray-50" /><div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <Inbox className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">LinkedIn Message Organizer</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Messages</option>
              <option value="recruitment">Recruitment</option>
              <option value="sales">Sales</option>
              <option value="general">General</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        {filteredMessages.map((message) => (
          <div
            key={message.id}
            className="border-b border-gray-100 p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {getTypeIcon(message.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">{message.sender}</p>
                  <div className="flex items-center space-x-2">
                    {message.hasAttachments && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        Attachment
                      </span>
                    )}
                    <span className="text-sm text-gray-500">
                      {new Date(message.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{message.content}</p>
                <div className="mt-2 flex items-center space-x-2">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${message.priority === 'high'
                        ? 'bg-red-100 text-red-800'
                        : message.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'}`}
                  >
                    {message.priority.charAt(0).toUpperCase() + message.priority.slice(1)} Priority
                  </span>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${message.type === 'recruitment'
                        ? 'bg-purple-100 text-purple-800'
                        : message.type === 'sales'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'}`}
                  >
                    {message.type.charAt(0).toUpperCase() + message.type.slice(1)}
                  </span>
                </div>
              </div>
              <button
                className="ml-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                title="Archive"
              >
                <Archive className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        {filteredMessages.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-500">No messages found matching your criteria</p>
          </div>
        )}
      </div>
    </div></>
  );
}

export default App;