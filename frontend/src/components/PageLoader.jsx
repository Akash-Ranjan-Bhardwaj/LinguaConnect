// PageLoader.jsx
import { LoaderIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

const PageLoader = () => {
  const { theme } = useThemeStore();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white" data-theme={theme}>
      <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-6 border border-gray-100">
        <LoaderIcon className="animate-spin w-8 h-8 text-gray-900" />
      </div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white rounded-full"></div>
        </div>
        <span className="text-2xl font-light text-gray-900 tracking-wide">
          Streamify
        </span>
      </div>
      <div className="mt-6 flex space-x-2">
        <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
};

export default PageLoader;