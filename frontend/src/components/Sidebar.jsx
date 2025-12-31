import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, UsersIcon } from "lucide-react";
import Logo from "./Logo";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-72 bg-base-100/50 backdrop-blur-xl border-r border-white/5 hidden lg:flex flex-col h-screen sticky top-0 z-40">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="size-10 rounded-xl overflow-hidden group-hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all duration-300">
            <Logo className="w-full h-full" />
          </div>
          <span className="text-2xl font-bold font-mono tracking-tighter text-white">
            Zync
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        <Link
          to="/"
          className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group ${currentPath === "/"
            ? "bg-primary text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]"
            : "text-base-content/60 hover:bg-white/5 hover:text-white"
            }`}
        >
          <HomeIcon className={`size-5 transition-transform group-hover:scale-110 ${currentPath === "/" ? "text-white" : ""}`} />
          <span className="font-medium">Home</span>
        </Link>

        <Link
          to="/friends"
          className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group ${currentPath === "/friends"
            ? "bg-primary text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]"
            : "text-base-content/60 hover:bg-white/5 hover:text-white"
            }`}
        >
          <UsersIcon className={`size-5 transition-transform group-hover:scale-110 ${currentPath === "/friends" ? "text-white" : ""}`} />
          <span className="font-medium">Friends</span>
        </Link>

        <Link
          to="/notifications"
          className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group ${currentPath === "/notifications"
            ? "bg-primary text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]"
            : "text-base-content/60 hover:bg-white/5 hover:text-white"
            }`}
        >
          <BellIcon className={`size-5 transition-transform group-hover:scale-110 ${currentPath === "/notifications" ? "text-white" : ""}`} />
          <span className="font-medium">Notifications</span>
        </Link>
      </nav>

      <div className="p-4 m-4 rounded-2xl bg-gradient-to-tr from-base-200 to-base-100 border border-white/5 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/10">
              <img src={authUser?.profilePic} alt="User Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full ring-2 ring-base-100"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-white truncate">{authUser?.fullName}</p>
            <p className="text-xs text-base-content/50 truncate">Online</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
