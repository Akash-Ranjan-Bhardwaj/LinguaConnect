import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest, getFriendRequests } from "../lib/api";
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon, LoaderIcon, CheckCircleIcon } from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-gray-900 tracking-tight">Notifications</h1>
              <p className="text-gray-500 mt-1">Stay updated with your connections</p>
            </div>
            <div className="flex items-center gap-2">
              {(incomingRequests.length > 0 || acceptedRequests.length > 0) && (
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-6 border border-gray-100">
              <LoaderIcon className="animate-spin w-6 h-6 text-gray-900" />
            </div>
            <p className="text-gray-500">Loading notifications...</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Friend Requests Section */}
            {incomingRequests.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    <UserCheckIcon className="w-4 h-4 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-medium text-gray-900">Friend Requests</h2>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {incomingRequests.length}
                  </div>
                </div>

                <div className="space-y-4">
                  {incomingRequests.map((request) => (
                    <div
                      key={request._id}
                      className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-sm transition-all duration-200 hover:border-gray-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img 
                              src={request.sender.profilePic} 
                              alt={request.sender.fullName}
                              className="w-14 h-14 rounded-full object-cover"
                            />
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                              <UserCheckIcon className="w-3 h-3 text-white" />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 mb-2">{request.sender.fullName}</h3>
                            <div className="flex flex-wrap gap-2">
                              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                                Native: {request.sender.nativeLanguage}
                              </span>
                              <span className="border border-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                                Learning: {request.sender.learningLanguage}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          className={`px-6 py-2 rounded-lg font-medium transition-all ${
                            isPending 
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                              : "bg-gray-900 text-white hover:bg-gray-800"
                          }`}
                          onClick={() => acceptRequestMutation(request._id)}
                          disabled={isPending}
                        >
                          {isPending ? (
                            <div className="flex items-center gap-2">
                              <LoaderIcon className="w-4 h-4 animate-spin" />
                              Accepting...
                            </div>
                          ) : (
                            "Accept"
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* New Connections Section */}
            {acceptedRequests.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                    <BellIcon className="w-4 h-4 text-green-600" />
                  </div>
                  <h2 className="text-xl font-medium text-gray-900">New Connections</h2>
                </div>

                <div className="space-y-4">
                  {acceptedRequests.map((notification) => (
                    <div 
                      key={notification._id} 
                      className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <img
                            src={notification.recipient.profilePic}
                            alt={notification.recipient.fullName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircleIcon className="w-3 h-3 text-white" />
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">
                            {notification.recipient.fullName}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">
                            {notification.recipient.fullName} accepted your friend request
                          </p>
                          <div className="flex items-center text-xs text-gray-400">
                            <ClockIcon className="w-3 h-3 mr-1" />
                            Recently
                          </div>
                        </div>

                        <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full flex items-center gap-1 text-sm font-medium">
                          <MessageSquareIcon className="w-3 h-3" />
                          New Friend
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Empty State */}
            {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
              <NoNotificationsFound />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;