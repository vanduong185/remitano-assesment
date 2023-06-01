import React, { useState, useEffect } from "react";
import { socket } from "../../configs/socketConfig";
import { toast } from "react-toastify";
import { AuthState, useAuth } from "../../context/AuthContext";

export type SharedMovie = {
  id: number;
  movieTitle: string;
  movieDescription: string;
  movieUrl: string;
  userId: number;
  user: { username: string };
};

const SharedMovieNoti = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  console.log("SocketIO connected: ", isConnected);

  const { user } = useAuth() as AuthState;

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onEvent(data: SharedMovie) {
      if (user) {
        toast(`${data.user.username} shared a movie ${data.movieTitle}`, {
          type: "info",
        });
      }
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("push_new_notification", onEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("push_new_notification", onEvent);
    };
  }, [user]);

  return <div></div>;
};

export default SharedMovieNoti;
