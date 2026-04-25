import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_API_BASE_URL 
  ? import.meta.env.VITE_API_BASE_URL.replace('/api', '') 
  : (import.meta.env.MODE === "development" ? "http://localhost:5002" : "/");

// Create socket instance outside of the hook so it doesn't reconnect on every render
const socket = io(BASE_URL);

export const useSocket = () => {
    const [onlineUsersCount, setOnlineUsersCount] = useState(0);

    useEffect(() => {
        socket.on("update_online_users", (count) => {
            setOnlineUsersCount(count);
        });

        return () => {
            socket.off("update_online_users");
        };
    }, []);

    return { onlineUsersCount };
};
