const Logo = ({ className }) => {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                <linearGradient id="logo_gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4f46e5" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
            </defs>

            <rect width="100" height="100" rx="20" fill="url(#logo_gradient)" fillOpacity="0.1" />

            <circle cx="70" cy="30" r="10" fill="url(#logo_gradient)" />
            <circle cx="30" cy="70" r="10" fill="url(#logo_gradient)" />

            <path
                d="M30 70 L70 30 M30 30 L70 30 L30 70 L70 70"
                stroke="url(#logo_gradient)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <circle cx="50" cy="50" r="35" stroke="url(#logo_gradient)" strokeWidth="4" strokeOpacity="0.4" strokeDasharray="10 5" />
        </svg>
    );
};

export default Logo;

