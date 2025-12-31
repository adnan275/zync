import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon } from "lucide-react";
import useLogout from "../hooks/useLogout";
import Logo from "./Logo";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-base-100/50 backdrop-blur-lg border-b border-white/5 sticky top-0 z-50 h-16 flex items-center transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          {(isChatPage) && (
            <div className="mr-auto lg:hidden">
              <Link to="/" className="flex items-center gap-2">
                <div className="size-9 rounded-lg overflow-hidden">
                  <Logo className="w-full h-full" />
                </div>
                <span className="text-xl font-bold font-mono tracking-tighter text-white">
                  Zync
                </span>
              </Link>
            </div>
          )}


          <div className="flex items-center gap-4">
            <Link to={"/notifications"} className="relative group">
              <div className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <BellIcon className="size-5 text-base-content/70 group-hover:text-primary transition-colors" />

              </div>
            </Link>

            <div className="h-8 w-px bg-white/10 mx-1"></div>

            <div className="flex items-center gap-3 pl-1">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-white leading-none">{authUser?.fullName}</p>
                <p className="text-xs text-base-content/50 mt-1">Online</p>
              </div>
              <div className="relative group cursor-pointer">
                <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-primary/50 transition-all">
                  <img src={authUser?.profilePic} alt="User Avatar" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <button
              className="p-2 rounded-full hover:bg-error/10 text-base-content/70 hover:text-error transition-all ml-2"
              onClick={logoutMutation}
              title="Logout"
            >
              <LogOutIcon className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
