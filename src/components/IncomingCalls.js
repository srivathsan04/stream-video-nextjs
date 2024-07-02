import {
  useCalls,
  CallingState,
  StreamCall,
  useCallStateHooks,
  RingingCall,
  SpeakerLayout,
  CallControls,
} from "@stream-io/video-react-sdk";

export default function IncomingCalls() {
  const calls = useCalls();

  const incomingCalls = calls.filter(
    (call) =>
      call.isCreatedByMe === false &&
      call.state.callingState === CallingState.RINGING
  );

  if (calls.length === 0) {
    return (
      <div>
        <br /> Awaiting incoming calls...
      </div>
    );
  }

  return incomingCalls.map((call) => (
    <StreamCall call={call} key={call.cid}>
      <MyIncomingCallUI />
    </StreamCall>
  ));
}

function MyIncomingCallUI() {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  if (callingState === CallingState.RINGING) {
    return <RingingCall />;
  }
  return (
    <>
      <SpeakerLayout />
      <CallControls />
    </>
  );
}
