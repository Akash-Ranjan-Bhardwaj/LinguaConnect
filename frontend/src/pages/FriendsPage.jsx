import { useState } from "react";
import { 
  Search, 
  UserPlus, 
  MessageCircle, 
  Phone, 
  MoreHorizontal,
  Users,
  UserCheck,
  Clock,
  X
} from "lucide-react";

const FriendsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFriend, setSelectedFriend] = useState(null);

  // Mock data - replace with actual data from your API
  const [friends] = useState([
    {
      id: 1,
      name: "Sarah Chen",
      username: "@sarahc",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      status: "online",
      lastSeen: "2 min ago",
      mutualFriends: 5,
      isOnline: true
    },
    {
      id: 2,
      name: "Marcus Williams",
      username: "@marcusw",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      status: "offline",
      lastSeen: "1 hour ago",
      mutualFriends: 3,
      isOnline: false
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      username: "@elenar",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      status: "online",
      lastSeen: "Just now",
      mutualFriends: 8,
      isOnline: true
    },
    {
      id: 4,
      name: "David Park",
      username: "@davidp",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      status: "away",
      lastSeen: "15 min ago",
      mutualFriends: 2,
      isOnline: false
    }
  ]);

  const [friendRequests] = useState([
    {
      id: 5,
      name: "Alex Thompson",
      username: "@alext",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      mutualFriends: 4,
      requestedAt: "2 days ago"
    },
    {
      id: 6,
      name: "Maya Patel",
      username: "@mayap",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      mutualFriends: 1,
      requestedAt: "1 week ago"
    }
  ]);

  const tabs = [
    { id: "all", label: "All Friends", count: friends.length },
    { id: "online", label: "Online", count: friends.filter(f => f.isOnline).length },
    { id: "requests", label: "Requests", count: friendRequests.length }
  ];

  const filteredFriends = friends.filter(friend => {
    const matchesSearch = friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         friend.username.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "online") {
      return matchesSearch && friend.isOnline;
    }
    
    return matchesSearch;
  });

  const handleAcceptRequest = (requestId) => {
    console.log("Accepting request:", requestId);
  };

  const handleDeclineRequest = (requestId) => {
    console.log("Declining request:", requestId);
  };

  const handleStartChat = (friendId) => {
    console.log("Starting chat with:", friendId);
  };

  const handleStartCall = (friendId) => {
    console.log("Starting call with:", friendId);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-light text-gray-900 tracking-tight">Friends</h1>
              <p className="text-gray-500 mt-1">Manage your connections</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors">
              <UserPlus className="w-4 h-4" />
              Add Friend
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
            />
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-50 rounded-xl p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
                <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {activeTab === "requests" ? (
          // Friend Requests
          <div className="space-y-4">
            {friendRequests.length === 0 ? (
              <div className="text-center py-12">
                <UserCheck className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No pending requests</h3>
                <p className="text-gray-500">You're all caught up!</p>
              </div>
            ) : (
              friendRequests.map((request) => (
                <div key={request.id} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={request.avatar}
                          alt={request.name}
                          className="w-14 h-14 rounded-full object-cover"
                        />
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <UserPlus className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{request.name}</h3>
                        <p className="text-sm text-gray-500">{request.username}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-gray-400">
                            {request.mutualFriends} mutual friends
                          </span>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {request.requestedAt}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAcceptRequest(request.id)}
                        className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleDeclineRequest(request.id)}
                        className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          // Friends List
          <div className="grid gap-4">
            {filteredFriends.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchQuery ? "No friends found" : "No friends yet"}
                </h3>
                <p className="text-gray-500">
                  {searchQuery ? "Try adjusting your search" : "Start connecting with people!"}
                </p>
              </div>
            ) : (
              filteredFriends.map((friend) => (
                <div key={friend.id} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-sm transition-shadow group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={friend.avatar}
                          alt={friend.name}
                          className="w-14 h-14 rounded-full object-cover"
                        />
                        <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                          friend.isOnline ? "bg-green-500" : "bg-gray-300"
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{friend.name}</h3>
                        <p className="text-sm text-gray-500">{friend.username}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-gray-400">
                            {friend.mutualFriends} mutual friends
                          </span>
                          <span className={`text-xs flex items-center gap-1 ${
                            friend.isOnline ? "text-green-600" : "text-gray-400"
                          }`}>
                            <div className={`w-2 h-2 rounded-full ${
                              friend.isOnline ? "bg-green-500" : "bg-gray-300"
                            }`} />
                            {friend.isOnline ? "Online" : friend.lastSeen}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleStartChat(friend.id)}
                        className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        title="Start Chat"
                      >
                        <MessageCircle className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleStartCall(friend.id)}
                        className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        title="Start Call"
                      >
                        <Phone className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => setSelectedFriend(friend)}
                        className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        title="More Options"
                      >
                        <MoreHorizontal className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Friend Options Modal */}
      {selectedFriend && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Friend Options</h3>
              <button
                onClick={() => setSelectedFriend(null)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <img
                src={selectedFriend.avatar}
                alt={selectedFriend.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-medium text-gray-900">{selectedFriend.name}</h4>
                <p className="text-sm text-gray-500">{selectedFriend.username}</p>
              </div>
            </div>

            <div className="space-y-2">
              <button className="w-full px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors text-gray-700">
                View Profile
              </button>
              <button className="w-full px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors text-gray-700">
                Mute Notifications
              </button>
              <button className="w-full px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors text-gray-700">
                Block User
              </button>
              <button className="w-full px-4 py-3 text-left hover:bg-red-50 rounded-lg transition-colors text-red-600">
                Remove Friend
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendsPage;