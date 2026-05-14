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

export const filterUserList = (users: UserType[], search: string) => {
  let data = [...users];

  if (search) {
    data = data.filter(
      (val) =>
        val.name.toLowerCase().includes(search.toLowerCase()) ||
        val.username.toLowerCase().includes(search.toLowerCase()),
    );
  }

  return data;
};
