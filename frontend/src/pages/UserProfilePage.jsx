import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Mail, MapPin, Globe, Calendar, User, ArrowLeft, Loader } from "lucide-react";
import { getLanguageFlag } from "../components/FriendCard";
import { capitialize } from "../lib/utils";
import { getUserProfile } from "../lib/api";
import useAuthUser from "../hooks/useAuthUser";

const UserProfilePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { authUser } = useAuthUser();

    if (authUser && authUser._id === id) {
    }

    const { data: user, isLoading, isError } = useQuery({
        queryKey: ["userProfile", id],
        queryFn: () => getUserProfile(id),
        retry: false
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-base-100 flex items-center justify-center">
                <Loader className="size-10 animate-spin text-primary" />
            </div>
        );
    }

    if (isError || !user) {
        return (
            <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center p-4">
                <div className="glass-card p-8 rounded-3xl text-center max-w-md">
                    <User className="size-16 mx-auto mb-4 text-base-content/30" />
                    <h2 className="text-2xl font-bold text-white mb-2">User not found</h2>
                    <p className="text-base-content/60 mb-6">The user profile you're looking for doesn't exist or is unavailable.</p>
                    <button onClick={() => navigate(-1)} className="btn btn-primary rounded-xl">
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 p-4 md:p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-base-content/60 hover:text-white mb-6 transition-colors group"
                >
                    <ArrowLeft className="size-5 group-hover:-translate-x-1 transition-transform" />
                    <span>Back</span>
                </button>

                <div className="glass-card rounded-3xl p-8 md:p-12 mb-6 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
                        <div className="relative">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-primary/30 shadow-2xl bg-base-300 flex items-center justify-center group">
                                {user.profilePic ? (
                                    <img
                                        src={user.profilePic}
                                        alt={user.fullName}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.innerHTML = '<div class="flex items-center justify-center w-full h-full bg-gradient-to-br from-primary to-secondary"><span class="text-6xl font-bold text-white">' + (user.fullName?.[0] || 'U').toUpperCase() + '</span></div>';
                                        }}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-primary to-secondary">
                                        <span className="text-6xl font-bold text-white">
                                            {(user.fullName?.[0] || 'U').toUpperCase()}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="absolute bottom-2 right-2 flex items-center gap-2 bg-base-100 px-3 py-1.5 rounded-full ring-2 ring-white/10">
                                <div className="w-2.5 h-2.5 bg-success rounded-full animate-pulse"></div>
                                <span className="text-xs font-medium text-success">Online</span>
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                                {user.fullName}
                            </h1>

                            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6 text-base-content/60">
                                {user.location && (
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="size-4" />
                                        <span className="text-sm">{user.location}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="size-4" />
                                    <span className="text-sm">Joined {formatDate(user.createdAt)}</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                <div className="px-4 py-2 bg-base-300/50 rounded-xl border border-white/5 backdrop-blur-sm">
                                    <p className="text-xs text-base-content/60 uppercase tracking-wider mb-0.5">Native</p>
                                    <div className="flex items-center gap-2">
                                        <span>{getLanguageFlag(user.nativeLanguage)}</span>
                                        <span className="font-medium text-white capitalize">{user.nativeLanguage}</span>
                                    </div>
                                </div>
                                {user.learningLanguage && (
                                    <div className="px-4 py-2 bg-base-300/50 rounded-xl border border-white/5 backdrop-blur-sm">
                                        <p className="text-xs text-base-content/60 uppercase tracking-wider mb-0.5">Learning</p>
                                        <div className="flex items-center gap-2">
                                            <span>{getLanguageFlag(user.learningLanguage)}</span>
                                            <span className="font-medium text-white capitalize">{user.learningLanguage}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 glass-card rounded-3xl p-8 relative overflow-hidden group hover:border-primary/20 transition-colors">
                        <div className="flex items-center gap-3 mb-4 text-primary">
                            <User className="size-5" />
                            <h2 className="text-lg font-bold">About Me</h2>
                        </div>
                        <p className="text-base-content/80 leading-relaxed text-lg">
                            {user.bio || "No bio added yet."}
                        </p>
                    </div>

                    <div className="glass-card rounded-3xl p-8 flex flex-col gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-4 text-secondary">
                                <Globe className="size-5" />
                                <h2 className="text-lg font-bold">Languages</h2>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-base-300/30 rounded-xl">
                                    <span className="text-sm text-base-content/70">Native</span>
                                    <span className="font-medium capitalize">{user.nativeLanguage}</span>
                                </div>
                                {user.learningLanguage && (
                                    <div className="flex items-center justify-between p-3 bg-base-300/30 rounded-xl">
                                        <span className="text-sm text-base-content/70">Learning</span>
                                        <span className="font-medium capitalize">{user.learningLanguage}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default UserProfilePage;
