// ChatLoader.jsx
import { LoaderIcon } from "lucide-react";

function ChatLoader() {
  return (
    <div className="h-screen flex flex-col items-center justify-center p-4 bg-white">
      <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-6 border border-gray-100">
        <LoaderIcon className="animate-spin w-6 h-6 text-gray-900" />
      </div>
      <p className="text-gray-900 text-lg font-light tracking-tight">Connecting to chat...</p>
      <div className="mt-4 flex space-x-1">
        <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
}

export default ChatLoader;