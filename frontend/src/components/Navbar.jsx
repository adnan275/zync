import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, UsersIcon } from "lucide-react";
import useLogout from "../hooks/useLogout";
import Logo from "./Logo";
import { useSocket } from "../hooks/useSocket";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const { onlineUsersCount } = useSocket();

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
            {/* Online Users Badge (Socket.io) */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success/10 text-success text-xs font-medium border border-success/20">
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full size-2 bg-success"></span>
              </span>
              <UsersIcon className="size-3.5" />
              <span>{onlineUsersCount} Online</span>
            </div>

            <Link to={"/notifications"} className="relative group">
              <div className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <BellIcon className="size-5 text-base-content/70 group-hover:text-primary transition-colors" />

              </div>
            </Link>



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
