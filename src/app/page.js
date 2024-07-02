import Link from "next/link";

const users = [
  { id: "ji4cy5zah", name: "User 1" },
  { id: "lz7a4ypko", name: "User 2" },
  { id: "dffiyzs63", name: "User 3" },
];

export default function HomePage() {
  return (
    <div>
      <h1>Select a user to log in</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/call/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
