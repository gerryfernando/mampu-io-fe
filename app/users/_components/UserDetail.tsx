"use client";
import { JSX } from "react";
import { UserDetailType } from "../[id]/page";
import { PostType, TodoType } from "@/app/page";

const TextLine = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <div className="flex gap-4">
      <span className="mt-1 text-xs w-30 text-zinc-400 font-medium uppercase tracking-wide">
        {label}
      </span>
      <span className="text-sm text-zinc-700">{value}</span>
    </div>
  );
};

export default function UserDetail({
  userDetail,
  posts,
  todos,
}: {
  userDetail: UserDetailType;
  posts: PostType[];
  todos: TodoType[];
}): JSX.Element {
  const { company, address } = userDetail;
  const userPost = posts.filter((val) => val.userId === userDetail.id);
  const userTodos = todos.filter((val) => val.userId === userDetail.id);

  console.log(userPost, userTodos);

  return (
    <div className="w-full bg-white rounded-2xl shadow-md border border-zinc-100 p-6 font-sans">
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
        <TextLine label="Email" value={userDetail.email} />
        <TextLine label="Website" value={userDetail.website} />
        <TextLine label="Company" value={company.name} />
        <TextLine label="Catch Phrase" value={company.catchPhrase} />
        <TextLine
          label="Address"
          value={`${address?.street}, ${address?.suite}, ${address?.city} (${address?.zipcode})`}
        />
      </div>
    </div>
  );
}
