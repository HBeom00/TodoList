import { PostType } from "@/types/post";
import axios from "axios";

// Create
export const addTodo = async (newTodo: PostType) => {
  await axios.post(`${process.env.NEXT_PUBLIC_GLITCH_URL}`, newTodo);
};

// Read
export const fetchTodos = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_GLITCH_URL}`);
  return res.data;
};

// Delete
export const deleteTodo = async (id: string) => {
  await axios.delete(`${process.env.NEXT_PUBLIC_GLITCH_URL}/${id}`);
};

// Update-post
export const updateTodo = async ({
  id,
  contents,
}: {
  id: string;
  contents: string;
}) => {
  await axios.patch(`${process.env.NEXT_PUBLIC_GLITCH_URL}/${id}`, {
    contents,
  });
};

// Update-complete
export const completeTodo = async (todo: PostType) => {
  await axios.patch(`${process.env.NEXT_PUBLIC_GLITCH_URL}/${todo.id}`, {
    isDone: !todo.isDone,
  });
};
