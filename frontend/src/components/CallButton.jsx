import { VideoIcon } from "lucide-react";

function CallButton({ handleVideoCall }) {
  return (
    <div className="p-3 bg-base-100/30 backdrop-blur-md border-b border-white/5 flex items-center justify-end w-full absolute top-0 z-10">
      <button onClick={handleVideoCall} className="btn btn-circle btn-primary shadow-lg hover:shadow-primary/40 transition-all hover:scale-105 border-none bg-gradient-to-r from-primary to-indigo-600">
        <VideoIcon className="size-5 text-white" />
      </button>
    </div>
  );
}

export default CallButton;
