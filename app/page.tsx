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
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: UserType[] = await res.json();

  const resPost = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: PostType[] = await resPost.json();

  const resTodo = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos: TodoType[] = await resTodo.json();

  return (
    <div className="flex flex-col flex-1   bg-zinc-50 font-sans">
      <UserList users={users} posts={posts} todos={todos} />
    </div>
  );
}
