import { createPortal } from "react-dom";
import { X, MapPin, MessageCircle, Video, UserPlus, Mail } from "lucide-react";
import { getLanguageFlag } from "./FriendCard";
import { capitialize } from "../lib/utils";

const UserProfileModal = ({ user, onClose, onSendRequest, onMessage, onStartCall, isFriend = false }) => {
    console.log('UserProfileModal rendering with user:', user);

    if (!user) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
            onClick={handleBackdropClick}
        >
            <div className="glass-card rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/10">
                <div className="sticky top-0 bg-base-200/95 backdrop-blur-xl border-b border-white/5 p-6 flex justify-between items-center z-10">
                    <h2 className="text-2xl font-bold text-white">Profile Details</h2>
                    <button
                        onClick={onClose}
                        className="btn btn-ghost btn-circle hover:bg-white/10 transition-colors"
                    >
                        <X className="size-6" />
                    </button>
                </div>

                <div className="p-8">
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="avatar size-32 rounded-full ring-4 ring-primary/20 mb-4 shadow-xl">
                            <img src={user.profilePic} alt={user.fullName} className="rounded-full object-cover" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">{user.fullName}</h3>
                        {user.email && (
                            <div className="flex items-center gap-2 text-base-content/60 mb-4">
                                <Mail className="size-4" />
                                <span className="text-sm">{user.email}</span>
                            </div>
                        )}
                    </div>

                    {user.bio && (
                        <div className="mb-6 p-4 bg-base-300/30 rounded-2xl border border-white/5">
                            <h4 className="text-sm font-semibold text-base-content/60 mb-2">About</h4>
                            <p className="text-base-content/90 leading-relaxed">{user.bio}</p>
                        </div>
                    )}

                    <div className="mb-6">
                        <h4 className="text-sm font-semibold text-base-content/60 mb-3">Language</h4>
                        <div className="p-4 bg-secondary/10 rounded-2xl border border-secondary/20">
                            <p className="text-xs text-base-content/60 mb-2">Native Language</p>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">{getLanguageFlag(user.nativeLanguage)}</span>
                                <span className="font-semibold text-secondary">{capitialize(user.nativeLanguage)}</span>
                            </div>
                        </div>
                    </div>

                    {user.location && (
                        <div className="mb-8 p-4 bg-base-300/30 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-2 text-base-content/80">
                                <MapPin className="size-5 text-primary" />
                                <span className="font-medium">{user.location}</span>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3">
                        {!isFriend && onSendRequest && (
                            <button
                                onClick={() => {
                                    onSendRequest(user._id);
                                    onClose();
                                }}
                                className="btn btn-primary flex-1 rounded-xl shadow-lg hover:shadow-primary/30 transition-all"
                            >
                                <UserPlus className="size-5" />
                                Send Friend Request
                            </button>
                        )}
                        {isFriend && onMessage && (
                            <button
                                onClick={() => {
                                    onMessage(user._id);
                                    onClose();
                                }}
                                className="btn btn-secondary flex-1 rounded-xl shadow-lg hover:shadow-secondary/30 transition-all"
                            >
                                <MessageCircle className="size-5" />
                                Message
                            </button>
                        )}
                        {isFriend && onStartCall && (
                            <button
                                onClick={() => {
                                    onStartCall();
                                    onClose();
                                }}
                                className="btn btn-accent flex-1 rounded-xl shadow-lg hover:shadow-accent/30 transition-all"
                            >
                                <Video className="size-5" />
                                Start Call
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
        , document.body);
};

export default UserProfileModal;
