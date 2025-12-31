import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";

const FriendCard = ({ friend }) => {
  return (
    <div
      className="group glass-card rounded-2xl p-5 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="avatar size-14 rounded-full ring-2 ring-white/5 group-hover:ring-primary/50 transition-all">
              <img src={friend.profilePic} alt={friend.fullName} className="rounded-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-success rounded-full ring-2 ring-base-200"></div>
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-lg text-white truncate group-hover:text-primary transition-colors">{friend.fullName}</h3>
            <p className="text-xs text-base-content/50">Online</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <span className="badge badge-secondary/20 text-secondary border-none text-xs py-3 px-3">
            {getLanguageFlag(friend.nativeLanguage)}
            {friend.nativeLanguage}
          </span>
        </div>

        <Link
          to={`/chat/${friend._id}`}
          className="btn btn-primary btn-sm w-full rounded-xl shadow-lg hover:shadow-primary/30 transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          Message
        </Link>
      </div>
    </div>
  );
};
export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}
