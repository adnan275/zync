import { motion } from "framer-motion";
import useAuthUser from "../hooks/useAuthUser";
import { Mail, MapPin, Globe, Calendar, User } from "lucide-react";
import { getLanguageFlag } from "../components/FriendCard";
import { capitialize } from "../lib/utils";

const ProfilePage = () => {
    const { authUser } = useAuthUser();

    if (!authUser) return null;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        });
    };

    return (
        <div className="min-h-screen bg-base-100 p-4 md:p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                <div className="glass-card rounded-3xl p-8 md:p-12 mb-6 shadow-2xl">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        <div className="relative">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-primary/30 shadow-2xl bg-base-300 flex items-center justify-center">
                                {authUser.profilePic ? (
                                    <img
                                        src={authUser.profilePic}
                                        alt={authUser.fullName}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.innerHTML = '<div class="flex items-center justify-center w-full h-full bg-gradient-to-br from-primary to-secondary"><span class="text-6xl font-bold text-white">' + (authUser.fullName?.[0] || 'U').toUpperCase() + '</span></div>';
                                        }}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-primary to-secondary">
                                        <span className="text-6xl font-bold text-white">
                                            {(authUser.fullName?.[0] || 'U').toUpperCase()}
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
                            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 mb-3">
                                {authUser.fullName}
                            </h1>

                            {authUser.email && (
                                <div className="flex items-center justify-center md:justify-start gap-2 text-base-content/70 mb-4">
                                    <Mail className="size-4" />
                                    <span className="text-sm">{authUser.email}</span>
                                </div>
                            )}

                            {authUser.createdAt && (
                                <div className="flex items-center justify-center md:justify-start gap-2 text-base-content/60 mb-6">
                                    <Calendar className="size-4" />
                                    <span className="text-sm">
                                        Member since {formatDate(authUser.createdAt)}
                                    </span>
                                </div>
                            )}

                            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                <div className="px-4 py-2 bg-primary/10 rounded-xl border border-primary/20">
                                    <p className="text-xs text-base-content/60">Friends</p>
                                    <p className="text-lg font-bold text-primary">
                                        {authUser.friends?.length || 0}
                                    </p>
                                </div>
                                <div className="px-4 py-2 bg-secondary/10 rounded-xl border border-secondary/20">
                                    <p className="text-xs text-base-content/60">Status</p>
                                    <p className="text-lg font-bold text-secondary">Active</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {authUser.bio && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="glass-card rounded-2xl p-6 md:col-span-2"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <User className="size-5 text-primary" />
                                <h2 className="text-xl font-bold text-white">About Me</h2>
                            </div>
                            <p className="text-base-content/80 leading-relaxed">
                                {authUser.bio}
                            </p>
                        </motion.div>
                    )}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="glass-card rounded-2xl p-6"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Globe className="size-5 text-secondary" />
                            <h2 className="text-xl font-bold text-white">Languages</h2>
                        </div>

                        <div className="space-y-4">
                            {authUser.nativeLanguage && (
                                <div className="p-4 bg-secondary/10 rounded-xl border border-secondary/20">
                                    <p className="text-xs text-base-content/60 mb-2">
                                        Native Language
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">
                                            {getLanguageFlag(authUser.nativeLanguage)}
                                        </span>
                                        <span className="text-lg font-semibold text-secondary">
                                            {capitialize(authUser.nativeLanguage)}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {authUser.learningLanguage && (
                                <div className="p-4 bg-accent/10 rounded-xl border border-accent/20">
                                    <p className="text-xs text-base-content/60 mb-2">
                                        Learning Language
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">
                                            {getLanguageFlag(authUser.learningLanguage)}
                                        </span>
                                        <span className="text-lg font-semibold text-accent">
                                            {capitialize(authUser.learningLanguage)}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {authUser.location && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="glass-card rounded-2xl p-6"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <MapPin className="size-5 text-primary" />
                                <h2 className="text-xl font-bold text-white">Location</h2>
                            </div>

                            <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                                <div className="flex items-center gap-3">
                                    <MapPin className="size-6 text-primary" />
                                    <span className="text-lg font-medium text-white">
                                        {authUser.location}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="glass-card rounded-2xl p-6 md:col-span-2"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <User className="size-5 text-accent" />
                            <h2 className="text-xl font-bold text-white">
                                Account Information
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 bg-base-300/30 rounded-xl border border-white/5">
                                <p className="text-xs text-base-content/60 mb-1">Full Name</p>
                                <p className="text-base font-medium text-white">
                                    {authUser.fullName}
                                </p>
                            </div>

                            <div className="p-4 bg-base-300/30 rounded-xl border border-white/5">
                                <p className="text-xs text-base-content/60 mb-1">Email</p>
                                <p className="text-base font-medium text-white break-all">
                                    {authUser.email}
                                </p>
                            </div>

                            <div className="p-4 bg-base-300/30 rounded-xl border border-white/5">
                                <p className="text-xs text-base-content/60 mb-1">
                                    Account Status
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                                    <p className="text-base font-medium text-success">Online</p>
                                </div>
                            </div>

                            <div className="p-4 bg-base-300/30 rounded-xl border border-white/5">
                                <p className="text-xs text-base-content/60 mb-1">
                                    Profile Completed
                                </p>
                                <p className="text-base font-medium text-white">
                                    {authUser.isOnboarded ? "Yes" : "No"}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default ProfilePage;
