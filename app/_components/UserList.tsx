"use client";
import { JSX } from "react";
import { PostType, TodoType, UserType } from "../page";
import { useRouter } from "next/navigation";
import { getTodoTotal } from "@/src/utils/array";

export default function UserList({
  users,
  posts,
  todos,
}: {
  users: UserType[];
  posts: PostType[];
  todos: TodoType[];
}): JSX.Element {
  console.log(posts, todos);
  const router = useRouter();

  const navigateDetail = (selectedUser: UserType) => {
    router.push("/users/" + selectedUser.id);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-md border-2">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">User List</h1>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search user..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-black"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {users.map((user: UserType) => {
            const { pending, total, completed } = getTodoTotal(user.id, todos);
            return (
              <div
                key={user.id}
                className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {user.name?.[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 leading-tight">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-400">{user.username}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200" />

                <div className="flex flex-col gap-2">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 uppercase tracking-wide">
                      Email
                    </span>
                    <span className="text-xs text-blue-500 truncate">
                      {user.email}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 uppercase tracking-wide">
                      Phone
                    </span>
                    <span className="text-xs text-gray-700">{user.phone}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 uppercase tracking-wide">
                      Website
                    </span>
                    <span className="inline-block w-fit rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-700">
                      {user.website}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 uppercase tracking-wide">
                      Post
                    </span>
                    <span className="inline-block w-fit rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-700">
                      {posts.length}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 uppercase tracking-wide">
                      Todos
                    </span>
                    <span className="text-sm text-gray-700">
                      <span className="font-semibold text-gray-800">
                        {completed}
                      </span>
                      <span className="text-gray-400"> done · </span>
                      <span className="font-semibold text-orange-500">
                        {pending}
                      </span>
                      <span className="text-gray-400"> pending</span>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigateDetail(user)}
                  className="mt-auto w-full rounded-lg bg-zinc-800 py-2 text-xs font-semibold text-white hover:bg-zinc-700 transition cursor-pointer"
                >
                  Detail
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-end">
          <div className="flex gap-2">
            <button className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-100">
              Prev
            </button>
            <button className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-100">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
