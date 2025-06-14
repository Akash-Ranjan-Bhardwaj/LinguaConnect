import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          {/* LOGO - ONLY IN THE CHAT PAGE */}
          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white rounded-full"></div>
                </div>
                <span className="text-2xl font-light text-gray-900 tracking-wide">
                  LinguaConnect
                </span>
              </Link>
            </div>
          )}
          
          <div className="flex items-center gap-2 ml-auto">
            {/* Notifications */}
            <Link to={"/notifications"}>
              <button className="w-10 h-10 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors">
                <BellIcon className="h-5 w-5 text-gray-600" />
              </button>
            </Link>

            {/* Theme Selector */}
            {/* <div className="hidden sm:block">
              <ThemeSelector />
            </div> */}

            {/* User Avatar */}
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-100">
              <img 
                src={authUser?.profilePic} 
                alt="User Avatar" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Logout button */}
            <button 
              className="w-10 h-10 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors" 
              onClick={logoutMutation}
            >
              <LogOutIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;