import { JSX } from "react";
import { User } from "../page";

export default function UserTable({ users }: { users: User[] }): JSX.Element {
  return (
    <div className="min-h-screen p-25">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-md border-2">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">User List</h1>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search user..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-black"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-gray-50 text-left">
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                  Name
                </th>

                <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                  Email
                </th>

                <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                  Website
                </th>

                <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                  Phone
                </th>

                <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user: User) => (
                <tr
                  key={user.id}
                  className="border-b transition hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {user.name}
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-600">
                    {user.email}
                  </td>

                  <td className="px-4 py-3">
                    <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700">
                      {user.website}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span className="py-3 text-sm text-gray-600">
                      {user.phone}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <button className="text-sm font-medium text-blue-600 hover:underline">
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing 1 to {users.length} users
          </p>

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
