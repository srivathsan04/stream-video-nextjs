import { useEffect, useState } from "react";
import {
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  SpeakerLayout,
  CallControls,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

import IncomingCalls from "./IncomingCalls";

const userDetails = {
  ji4cy5zah: {
    id: "ji4cy5zah",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiamk0Y3k1emFoIn0.ouvD-g1MFqANHqI4yzqT6gSuFVEIuH8AaG4DlKCLINc",
  },
  lz7a4ypko: {
    id: "lz7a4ypko",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibHo3YTR5cGtvIn0.cUyo_rbZ9sGLGODCiGJENAgO4yCN8Eo1j8YI_3VvDPM",
  },
  dffiyzs63: {
    id: "dffiyzs63",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZGZmaXl6czYzIn0.y3AoBtxaMNJBdZ06cKxCDkmoU-k7flEs_ritpMas6L4",
  },
};

export default function Callee({ userId }) {
  const [client, setClient] = useState(null);

  const userCallee = userDetails[userId];

  useEffect(() => {
    const myClient = new StreamVideoClient({
      apiKey: "g9wyju4jhw5h",
      user: { id: userCallee.id },
      token: userCallee.token,
    });
    setClient(myClient);
    return () => {
      myClient.disconnectUser();
      setClient(null);
    };
  }, [userId]);

  if (!client) return null;

  return (
    <StreamVideo client={client}>
      <StreamTheme className="my-theme-overrides">
        <IncomingCalls />
      </StreamTheme>
    </StreamVideo>
  );
}
