// NoNotificationsFound.jsx
import { BellIcon } from "lucide-react";

function NoNotificationsFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-6 border border-gray-100">
        <BellIcon className="w-8 h-8 text-gray-300" />
      </div>
      <h3 className="text-xl font-light text-gray-900 mb-3 tracking-tight">No notifications yet</h3>
      <p className="text-gray-500 max-w-md leading-relaxed">
        When you receive friend requests or messages, they'll appear here.
      </p>
    </div>
  );
}

export default NoNotificationsFound;