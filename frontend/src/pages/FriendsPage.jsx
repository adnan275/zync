import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFriendRequests, getRecommendedUsers, getUserFriends, sendFriendRequest, acceptFriendRequest } from "../lib/api";
import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import { CheckCircleIcon, LoaderIcon, MapPinIcon, UserPlusIcon, UsersIcon, UserCheckIcon, VideoIcon } from "lucide-react";
import { useState } from "react";
import { capitialize } from "../lib/utils";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const FriendsPage = () => {
    const [activeTab, setActiveTab] = useState("friends");
    const queryClient = useQueryClient();


    const { data: friends, isLoading: loadingFriends } = useQuery({
        queryKey: ["friends"],
        queryFn: getUserFriends,
    });

    const { data: recommendedUsers, isLoading: loadingSuggestions } = useQuery({
        queryKey: ["users"],
        queryFn: getRecommendedUsers,
    });

    const { data: friendRequests, isLoading: loadingRequests } = useQuery({
        queryKey: ["friendRequests"],
        queryFn: getFriendRequests,
    });


    const { mutate: sendRequestMutation, isPending: sendingRequest } = useMutation({
        mutationFn: sendFriendRequest,
        onSuccess: () => {
            toast.success("Friend request sent!");
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Failed to send request");
        }
    });

    const { mutate: acceptRequestMutation } = useMutation({
        mutationFn: acceptFriendRequest,
        onSuccess: () => {
            toast.success("Friend request accepted!");
            queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
            queryClient.invalidateQueries({ queryKey: ["friends"] });
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Failed to accept request");
        }
    });

    const handleStartCall = () => {
        const callId = crypto.randomUUID();
        window.open(`/call/${callId}`, "_blank");
    };

    return (
        <div className="h-screen overflow-y-auto w-full p-4 md:p-8 bg-base-100 relative">


            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-7xl mx-auto relative z-10"
            >
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Connect & Grow</h1>
                        <p className="text-base-content/60">Manage your language network</p>
                    </div>

                    <button onClick={handleStartCall} className="btn btn-primary btn-lg rounded-xl shadow-lg hover:shadow-primary/30 bg-gradient-to-r from-primary to-indigo-600 border-none transition-all hover:scale-105 group">
                        <VideoIcon className="size-5 mr-2 group-hover:animate-pulse" />
                        Start Instant Call
                    </button>
                </div>

                <div className="bg-base-200/50 backdrop-blur-md p-1.5 rounded-2xl inline-flex mb-8 border border-white/5 shadow-inner">
                    <button
                        className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === "friends" ? "bg-primary text-white shadow-lg" : "text-base-content/60 hover:text-white hover:bg-white/5"}`}
                        onClick={() => setActiveTab("friends")}
                    >
                        My Friends
                    </button>
                    <button
                        className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === "suggestions" ? "bg-primary text-white shadow-lg" : "text-base-content/60 hover:text-white hover:bg-white/5"}`}
                        onClick={() => setActiveTab("suggestions")}
                    >
                        Add Friends
                    </button>
                    <button
                        className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === "requests" ? "bg-primary text-white shadow-lg" : "text-base-content/60 hover:text-white hover:bg-white/5"}`}
                        onClick={() => setActiveTab("requests")}
                    >
                        Requests
                        {friendRequests?.incomingReqs?.length > 0 && (
                            <span className="badge badge-warning badge-sm border-none text-white font-bold animate-pulse">{friendRequests.incomingReqs.length}</span>
                        )}
                    </button>
                </div>

                {activeTab === "friends" && (
                    <div className="animate-fade-in-up">
                        {loadingFriends ? (
                            <div className="flex justify-center p-20">
                                <LoaderIcon className="size-12 animate-spin text-primary" />
                            </div>
                        ) : friends?.length === 0 ? (
                            <div className="glass-card flex flex-col items-center justify-center p-16 rounded-3xl text-center border-dashed border-2 border-base-content/10">
                                <div className="p-6 bg-base-200 rounded-full mb-6 animate-bounce-slow">
                                    <UserPlusIcon className="size-12 text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">No friends yet</h2>
                                <p className="text-base-content/60 mb-8 max-w-md">
                                    Your list is looking a bit empty. Start connecting with people to build your language circle!
                                </p>
                                <button className="btn btn-primary rounded-xl" onClick={() => setActiveTab("suggestions")}>
                                    Find New Friends
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {friends?.map((friend) => (
                                    <FriendCard
                                        key={friend._id}
                                        friend={friend}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "suggestions" && (
                    <div className="animate-fade-in-up">
                        <div className="mb-8 pl-1 border-l-4 border-primary">
                            <h2 className="text-2xl font-bold text-white ml-3">Suggested for you</h2>
                            <p className="opacity-60 text-sm ml-3">Based on your languages</p>
                        </div>

                        {loadingSuggestions ? (
                            <div className="flex justify-center p-20">
                                <LoaderIcon className="size-12 animate-spin text-primary" />
                            </div>
                        ) : recommendedUsers?.length === 0 ? (
                            <div className="text-center p-12 glass-card rounded-3xl">
                                <p className="text-lg opacity-70">No new recommendations right now. Check back later!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {recommendedUsers.map((user) => (
                                    <div
                                        key={user._id}
                                        className="glass-card rounded-3xl p-6 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:border-primary/30 group"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="avatar size-14 rounded-full ring-2 ring-white/5 group-hover:ring-primary/50 transition-all">
                                                <img src={user.profilePic} alt={user.fullName} className="rounded-full object-cover" />
                                            </div>
                                            {user.location && (
                                                <div className="flex items-center text-xs px-2 py-1 rounded-full bg-base-300/50 text-base-content/60">
                                                    <MapPinIcon className="size-3 mr-1" />
                                                    {user.location}
                                                </div>
                                            )}
                                        </div>

                                        <h3 className="font-bold text-lg text-white mb-1 group-hover:text-primary transition-colors">{user.fullName}</h3>
                                        <p className="text-xs text-base-content/50 mb-4 line-clamp-2 h-8">{user.bio || "No bio available"}</p>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            <span className="badge badge-secondary/10 text-secondary border-none text-xs">
                                                {getLanguageFlag(user.nativeLanguage)} {capitialize(user.nativeLanguage)}
                                            </span>
                                        </div>

                                        <button
                                            className="btn btn-outline btn-primary btn-sm w-full rounded-xl hover:shadow-primary/20"
                                            onClick={() => sendRequestMutation(user._id)}
                                            disabled={sendingRequest}
                                        >
                                            <UserPlusIcon className="size-4 mr-2" />
                                            Add Friend
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "requests" && (
                    <div className="animate-fade-in-up">
                        <h2 className="text-2xl font-bold mb-6 text-white">Pending Requests</h2>
                        {loadingRequests ? (
                            <div className="flex justify-center p-20">
                                <LoaderIcon className="size-12 animate-spin text-primary" />
                            </div>
                        ) : (!friendRequests?.incomingReqs || friendRequests.incomingReqs.length === 0) ? (
                            <div className="text-center p-16 glass-card rounded-3xl">
                                <p className="text-lg opacity-70">You're all caught up! No pending requests.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {friendRequests.incomingReqs.map(req => (
                                    <div key={req._id} className="glass-card rounded-3xl p-6 flex items-center gap-4 hover:border-primary/40 transition-colors">
                                        <div className="avatar size-16 rounded-full ring-2 ring-white/10">
                                            <img src={req.sender?.profilePic || "/avatar.png"} alt={req.sender?.fullName || "User"} className="rounded-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-white text-lg truncate">{req.sender?.fullName || "Unknown User"}</h3>
                                            <p className="text-xs text-base-content/60 mb-3">Wants to connect with you</p>
                                            <button
                                                className="btn btn-primary btn-sm w-full rounded-lg shadow-md hover:shadow-primary/30"
                                                onClick={() => acceptRequestMutation(req._id)}
                                            >
                                                <UserCheckIcon className="size-4 mr-2" />
                                                Accept
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

            </motion.div>

        </div >
    );
};
export default FriendsPage;
