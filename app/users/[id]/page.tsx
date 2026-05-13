import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export type UserDetail = {
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
  const userDetail: UserDetail = await res.json();

  return (
    <div>
      <div>User ID: {userDetail.id}</div>
      User Name: {userDetail.name}
    </div>
  );
}
