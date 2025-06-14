// NoFriendsFound.jsx
import { Users } from "lucide-react";

const NoFriendsFound = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-8 text-center">
      <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-6 mx-auto border border-gray-100">
        <Users className="w-7 h-7 text-gray-300" />
      </div>
      <h3 className="font-medium text-lg mb-3 text-gray-900">No friends yet</h3>
      <p className="text-gray-500 leading-relaxed">
        Connect with language partners below to start practicing together!
      </p>
    </div>
  );
};

export default NoFriendsFound;