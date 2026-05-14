import { PostType, TodoType, UserType } from "@/app/page";

export const getTodoTotal = (id: number, array: TodoType[]) => {
  const total = array.filter((arr) => arr.userId === id).length;
  const completed = array.filter(
    (arr) => arr.userId === id && arr.completed,
  ).length;

  return { completed, pending: total - completed, total };
};

export const getPostTotal = (id: number, array: PostType[]) => {
  const total = array.filter((arr) => arr.userId === id).length;

  return { total };
};

export const filterUserList = (
  users: UserType[],
  search: string,
  sortOrder: "asc" | "desc",
) => {
  let data = [...users];

  if (search) {
    data = data.filter(
      (val) =>
        val.name.toLowerCase().includes(search.toLowerCase()) ||
        val.username.toLowerCase().includes(search.toLowerCase()),
    );
  }

  if (sortOrder === "asc") {
    data.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortOrder === "desc") {
    data.sort((a, b) => b.name.localeCompare(a.name));
  }

  return data;
};
