import { useCallback, useState } from "react";
import {
  Call,
  CallControls,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

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

export default function Caller({ userId }) {
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [calleeId, setCalleeId] = useState("");

  const userCaller = userDetails[userId];

  useState(() => {
    const myClient = new StreamVideoClient({
      apiKey: "g9wyju4jhw5h",
      user: { id: userCaller.id },
      token: userCaller.token,
    });
    setClient(myClient);
    return () => {
      myClient.disconnectUser();
      setClient(null);
    };
  }, [userId]);

  const initiateRingCall = useCallback(() => {
    if (!client) return;
    const callId = "call-" + Math.random().toString(16).substring(2);
    const myCall = client.call("default", callId);
    myCall
      .getOrCreate({
        ring: true,
        data: {
          members: [{ user_id: userCaller.id }, { user_id: calleeId }],
        },
      })
      .catch((err) => {
        console.error(`Failed to join the call`, err);
      });

    setCall(myCall);

    return () => {
      setCall(null);
      myCall.leave().catch((err) => {
        console.error(`Failed to leave the call`, err);
      });
    };
  }, [client, calleeId]);

  if (!client) return null;

  return (
    <StreamVideo client={client}>
      <StreamTheme className="my-theme-overrides">
        {call && (
          <StreamCall call={call}>
            <SpeakerLayout />
            <CallControls />
          </StreamCall>
        )}
        {!call && (
          <>
            <label>Callee user_id: </label>
            <input
              type="text"
              value={calleeId}
              onChange={(e) => setCalleeId(e.target.value)}
            />
            <button onClick={initiateRingCall}>Ring</button>
          </>
        )}
      </StreamTheme>
    </StreamVideo>
  );
}
