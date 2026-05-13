import { TodoType } from "@/app/page";

export const getTodoTotal = (id: number, array: TodoType[]) => {
  const total = array.filter((arr) => arr.userId === id).length;
  const completed = array.filter(
    (arr) => arr.userId === id && arr.completed,
  ).length;

  return { completed, pending: total - completed, total };
};
