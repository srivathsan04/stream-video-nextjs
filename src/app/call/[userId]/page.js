"use client";
import Caller from "../../../components/Caller";
import Callee from "../../../components/Callee";

export default function CallPage({ params }) {
  const { userId } = params;

  if (!userId) return null;

  return (
    <div>
      <h1>User {userId}</h1>
      <Caller userId={userId} />
      <Callee userId={userId} />
    </div>
  );
}
