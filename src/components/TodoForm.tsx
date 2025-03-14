"use client";

import { PostType } from "@/app/types/post";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FormEvent, useState } from "react";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const queryClient = useQueryClient();

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:3000/todos");
    return res.data;
  };

  const {
    data: todos,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const addTodo = async (newTodo: PostType) => {
    await axios.post("http://localhost:3000/todos", newTodo);
  };

  const { mutate } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  if (isPending) {
    return <div>로딩중입니다..</div>;
  }

  if (isError) {
    return <div>조회 중 오류가 발생했습니다.</div>;
  }

  const todoList: PostType[] = todos.filter(
    (el: PostType) => el.isDone === false
  );

  const doneList: PostType[] = todos.filter(
    (el: PostType) => el.isDone === true
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      contents,
      isDone: false,
    };
    mutate(newTodo);
  };

  return (
    <div>
      <h1>Todos</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Content"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        />
        <button type="submit">추가</button>
      </form>

      <h2>해야할 일</h2>
      <ul>
        {todoList.map((todo) => {
          return (
            <li key={todo.id}>
              <h3>{todo.title}</h3>
              <p>{todo.contents}</p>
              <p>{todo.isDone ? "완료됨" : "미완료됨"}</p>
              <button>삭제</button>
              <button>완료</button>
            </li>
          );
        })}
      </ul>

      <h2>완료된 일</h2>
      <ul>
        {doneList.map((todo) => {
          return (
            <li key={todo.id}>
              <h3>{todo.title}</h3>
              <p>{todo.contents}</p>
              <p>{todo.isDone ? "완료됨" : "미완료됨"}</p>
              <button>삭제</button>
              <button>취소</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoForm;
