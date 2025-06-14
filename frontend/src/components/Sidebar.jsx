import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon } from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-64 bg-white border-r border-gray-100 hidden lg:flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-gray-100">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white rounded-full"></div>
          </div>
          <span className="text-2xl font-light text-gray-900 tracking-wide">
            LinguaConnect
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-6 space-y-2">
        <Link
          to="/"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
            currentPath === "/" 
              ? "bg-gray-900 text-white" 
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          <HomeIcon className="w-5 h-5" />
          <span>Home</span>
        </Link>

        {/* <Link
          to="/friends"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
            currentPath === "/friends" 
              ? "bg-gray-900 text-white" 
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          <UsersIcon className="w-5 h-5" />
          <span>Friends</span>
        </Link> */}

        <Link
          to="/notifications"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
            currentPath === "/notifications" 
              ? "bg-gray-900 text-white" 
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          <BellIcon className="w-5 h-5" />
          <span>Notifications</span>
        </Link>
      </nav>

      {/* USER PROFILE SECTION */}
      <div className="p-6 border-t border-gray-100 mt-auto">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img 
              src={authUser?.profilePic} 
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm text-gray-900">{authUser?.fullName}</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <p className="text-xs text-gray-500">Online</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;