import UserList from "./_components/UserList";

export type UserType = {
  id: number;
  name: string;
  email: string;
  username: string;
  website: string;
  phone: string;
};

export type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type TodoType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
export default async function Home() {
  const [users, posts, todos] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/users", {
      next: { revalidate: 60 },
    }).then((r) => r.json()),
    fetch("https://jsonplaceholder.typicode.com/posts", {
      next: { revalidate: 60 },
    }).then((r) => r.json()),
    fetch("https://jsonplaceholder.typicode.com/todos", {
      next: { revalidate: 60 },
    }).then((r) => r.json()),
  ]);

  return (
    <div className="flex flex-col flex-1   bg-zinc-50 font-sans">
      <UserList users={users} posts={posts} todos={todos} />
    </div>
  );
}
