"use client";

import { PostType } from "@/app/types/post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const TodoForm = () => {
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

  return (
    <div>
      <h1>Todos</h1>
      <form>
        <input type="text" />
        <input type="text" />
        <button>추가</button>
      </form>

      <h2>해야할 일</h2>
      <ul>
        {todoList.map((todo) => {
          return (
            <li key={todo.id}>
              <h3>{todo.title}</h3>
              <p>{todo.content}</p>
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
              <p>{todo.content}</p>
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
