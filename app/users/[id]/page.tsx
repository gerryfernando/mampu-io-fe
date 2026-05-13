import { notFound } from "next/navigation";
import UserDetail from "../_components/UserDetail";

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

export default async function Page({ params }: Props) {
  const { id } = await params;

  if (!id) {
    return notFound();
  }

  const res = await fetch("https://jsonplaceholder.typicode.com/users/" + id);
  const userDetail: UserDetailType = await res.json();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <UserDetail userDetail={userDetail} />
    </div>
  );
}
