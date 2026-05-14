import { notFound } from "next/navigation";
import UserDetail from "../_components/UserDetail";
import { PostType, TodoType } from "@/app/page";

type Props = {
  params: Promise<{ id: string }>;
};

export type UserDetailType = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

async function getUserData(id: string) {
  const [userDetail, posts, todos] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      next: { revalidate: 60 },
    }).then((r) => r.json()),
    fetch("https://jsonplaceholder.typicode.com/posts", {
      next: { revalidate: 60 },
    }).then((r) => r.json()),
    fetch("https://jsonplaceholder.typicode.com/todos", {
      next: { revalidate: 60 },
    }).then((r) => r.json()),
  ]);

  return {
    userDetail: userDetail as UserDetailType,
    posts: posts as PostType[],
    todos: todos as TodoType[],
  };
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;
  const user = (await getUserData(id)).userDetail;

  return {
    title: `${user.name} Profile`,
    description: "Profile Detail",
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  if (!id) {
    return notFound();
  }

  const { userDetail, posts, todos } = await getUserData(id);

  return (
    <div className="flex flex-col flex-1 p-10 bg-zinc-50 font-sans">
      <UserDetail userDetail={userDetail} posts={posts} todos={todos} />
    </div>
  );
}
