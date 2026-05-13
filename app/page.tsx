import UserTable from "./_components/UserTable";

export type User = {
  id: number;
  name: string;
  email: string;
  website: string;
  phone: string;
};

export default async function Home() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await res.json();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <UserTable users={users} />
    </div>
  );
}
