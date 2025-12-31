import { LoaderIcon } from "lucide-react";

function ChatLoader() {
  return (
    <div className="h-screen flex flex-col items-center justify-center p-4 bg-base-100 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-base-100 to-base-200 opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center">
        <LoaderIcon className="animate-spin size-12 text-primary drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
        <p className="mt-4 text-center text-lg font-medium text-base-content/70 animate-pulse">Initializing Secure Chat...</p>
      </div>
    </div>
  );
}

export default ChatLoader;
