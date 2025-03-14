import { PostType } from "@/types/post";
import axios from "axios";

// Create
export const addTodo = async (newTodo: PostType) => {
  await axios.post("http://localhost:3000/todos", newTodo);
};

// Read
export const fetchTodos = async () => {
  const res = await axios.get("http://localhost:3000/todos");
  return res.data;
};

// Delete
export const deleteTodo = async (id: string) => {
  await axios.delete(`http://localhost:3000/todos/${id}`);
};

// Update-post
export const updateTodo = async ({
  id,
  contents,
}: {
  id: string;
  contents: string;
}) => {
  await axios.patch(`http://localhost:3000/todos/${id}`, {
    contents,
  });
};

// Update-complete
export const completeTodo = async (todo: PostType) => {
  await axios.patch(`http://localhost:3000/todos/${todo.id}`, {
    isDone: !todo.isDone,
  });
};
