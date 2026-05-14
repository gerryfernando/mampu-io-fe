"use client";
import { PostType, TodoType } from "@/app/page";
import { useState } from "react";

export default function UserActivity({
  posts,
  todos,
}: {
  posts: PostType[];
  todos: TodoType[];
}) {
  const [activeTab, setActiveTab] = useState<"posts" | "todos">("posts");
  const [todoFilter, setTodoFilter] = useState<"all" | "done" | "pending">(
    "all",
  );
  const [showAll, setShowAll] = useState(false);

  const filteredTodos = todos.filter((t) =>
    todoFilter === "all"
      ? true
      : todoFilter === "done"
        ? t.completed
        : !t.completed,
  );

  const visiblePosts = showAll ? posts : posts.slice(0, 5);

  return (
    <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("posts")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeTab === "posts"
              ? "bg-zinc-800 text-white"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          Posts ({posts.length})
        </button>
        <button
          onClick={() => setActiveTab("todos")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeTab === "todos"
              ? "bg-zinc-800 text-white"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          Todos ({todos.length})
        </button>
      </div>

      {/* Posts Tab */}
      {activeTab === "posts" && (
        <div className="flex flex-col gap-4">
          {visiblePosts.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-8">
              No Data Found
            </p>
          )}

          {visiblePosts.map((post) => (
            <div
              key={post.id}
              className="rounded-xl border border-gray-100 bg-gray-50 p-4"
            >
              <p className="text-xs text-gray-400 mb-1">#{post.id}</p>
              <p className="text-sm font-semibold text-gray-800 capitalize mb-2">
                {post.title}
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                {post.body}
              </p>
            </div>
          ))}

          {posts.length > 5 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-xs text-gray-400 cursor-pointer hover:text-gray-600 transition text-center"
            >
              {showAll ? "Show less" : `Show ${posts.length - 5} more posts`}
            </button>
          )}
        </div>
      )}

      {/* Todos Tab */}
      {activeTab === "todos" && (
        <div className="flex flex-col gap-3">
          {/* Filter */}
          <div className="flex gap-2 mb-2">
            {(["all", "done", "pending"] as const).map((label) => (
              <button
                key={label}
                onClick={() => setTodoFilter(label)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition capitalize ${
                  todoFilter === label
                    ? "bg-zinc-800 text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {filteredTodos.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-8">
              No Data Found
            </p>
          )}

          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3"
            >
              <div
                className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                  todo.completed
                    ? "border-green-500 bg-green-500"
                    : "border-gray-300"
                }`}
              >
                {todo.completed && (
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <p
                  className={`text-sm capitalize ${todo.completed ? "line-through text-gray-400" : "text-gray-700"}`}
                >
                  {todo.title}
                </p>
                <span
                  className={`mt-1 text-xs font-medium ${todo.completed ? "text-green-500" : "text-orange-400"}`}
                >
                  {todo.completed ? "Completed" : "Pending"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
