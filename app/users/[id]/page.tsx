/* eslint-disable react-hooks/static-components */
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
  const { company, address } = userDetail;

  const TextLine = ({
    label,
    value,
  }: {
    label: string;
    value: string | number;
  }) => {
    return (
      <div className="flex gap-3">
        <span className="mt-1 text-xs w-20 text-zinc-400 font-medium uppercase tracking-wide">
          {label}
        </span>
        <span className="text-sm text-zinc-700">{value}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-md border border-zinc-100 p-6 font-sans">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-zinc-800 flex items-center justify-center text-white text-xl font-bold">
            {userDetail.name?.[0]}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">
              {userDetail.name}
            </h2>
            <p className="text-sm text-zinc-400">{userDetail.username}</p>
          </div>
        </div>

        <div className="border-t border-zinc-400 mb-4" />

        <div className="flex flex-col gap-3">
          <TextLine label="ID" value={userDetail.id} />
          <TextLine label="Email" value={userDetail.email} />
          <TextLine label="Website" value={userDetail.website} />
          <TextLine label="Company" value={company.name} />
          <TextLine label="" value={company.catchPhrase} />
          <TextLine
            label="Address"
            value={`${address?.street}, ${address?.suite}, ${address?.city},${address?.zipcode}`}
          />
        </div>
      </div>
    </div>
  );
}
