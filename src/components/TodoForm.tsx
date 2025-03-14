"use client";

import {
  addTodo,
  completeTodo,
  deleteTodo,
  fetchTodos,
  updateTodo,
} from "@/api/apiInstance";
import { PostType } from "@/types/post";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";

const TodoForm = () => {
  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const queryClient = useQueryClient();
  const commonInputCSS =
    "border border-solid border-black rounded-[4px] px-[8px] py-[2px]";
  const commonBtnCSS =
    "border border-solid border-black rounded-[4px] px-[8px] py-[2px] cursor-pointer hover:text-white hover:bg-black transition duration-300";

  const {
    data: todos,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  // ADD
  const { mutate: addFunc } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // DELETE
  const { mutate: deleteFunc } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // UPDATE
  const { mutate: updateFunc } = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setEditingId(null);
      setEditContent("");
    },
  });

  // COMPLETE
  const { mutate: completeFunc } = useMutation({
    mutationFn: completeTodo,
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

  // 해야할 일
  const todoList: PostType[] = todos.filter(
    (el: PostType) => el.isDone === false
  );

  // 완료된 일
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
    addFunc(newTodo);
    setTitle("");
    setContents("");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-[20px]">
      <h1 className="text-[36px] font-bold">Todos</h1>
      <form onSubmit={handleSubmit} className="flex gap-[16px] max-sm:flex-col">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={commonInputCSS}
        />
        <input
          type="text"
          placeholder="Content"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
          className={commonInputCSS}
        />
        <button type="submit" className={commonBtnCSS}>
          추가
        </button>
      </form>

      <h2 className="text-[24px] font-bold">해야할 일</h2>
      <ul className="w-full flex justify-center items-center flex-wrap gap-[32px] max-sm:flex-col">
        {todoList.map((todo) => {
          return (
            <li
              key={todo.id}
              className="w-[20%] max-lg:w-[40%] border border-solid border-black rounded-[4px] p-[8px] flex flex-col gap-[8px] break-words"
            >
              <div className="flex justify-between">
                <h3 className="block font-bold break-words whitespace-normal overflow-hidden">
                  {todo.title}
                </h3>
                <p className="text-[14px]">{todo.isDone ? "완료" : "미완료"}</p>
              </div>
              <p className="text-[14px]">
                {editingId === todo.id ? (
                  <textarea
                    defaultValue={todo.contents}
                    className={commonInputCSS}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                ) : (
                  todo.contents
                )}
              </p>
              <div className="flex justify-start items-center gap-[4px]">
                <button
                  onClick={() => deleteFunc(todo.id)}
                  className={commonBtnCSS}
                >
                  삭제
                </button>

                {editingId === todo.id ? (
                  <button
                    onClick={() =>
                      updateFunc({ id: todo.id, contents: editContent })
                    }
                    className={commonBtnCSS}
                  >
                    저장
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(todo.id);
                      setEditContent(todo.contents);
                    }}
                    className={commonBtnCSS}
                  >
                    수정
                  </button>
                )}

                <button
                  onClick={() => completeFunc(todo)}
                  className={commonBtnCSS}
                >
                  완료
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <h2 className="text-[24px] font-bold">완료된 일</h2>
      <ul className="w-full flex justify-center items-center flex-wrap gap-[32px] max-sm:flex-col">
        {doneList.map((todo) => {
          return (
            <li
              key={todo.id}
              className="w-[20%] max-lg:w-[40%] border border-solid border-black rounded-[4px] p-[8px] flex flex-col gap-[8px]"
            >
              <div className="flex justify-between">
                <h3 className="block font-bold break-words whitespace-normal overflow-hidden">
                  {todo.title}
                </h3>
                <p className="text-[14px]">{todo.isDone ? "완료" : "미완료"}</p>
              </div>
              <p className="text-[14px]">
                {editingId === todo.id ? (
                  <textarea
                    defaultValue={todo.contents}
                    className={commonInputCSS}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                ) : (
                  todo.contents
                )}
              </p>
              <div className="flex justify-start items-center gap-[4px]">
                <button
                  onClick={() => deleteFunc(todo.id)}
                  className={commonBtnCSS}
                >
                  삭제
                </button>

                {editingId === todo.id ? (
                  <button
                    onClick={() =>
                      updateFunc({ id: todo.id, contents: editContent })
                    }
                    className={commonBtnCSS}
                  >
                    저장
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(todo.id);
                      setEditContent(todo.contents);
                    }}
                    className={commonBtnCSS}
                  >
                    수정
                  </button>
                )}

                <button
                  onClick={() => completeFunc(todo)}
                  className={commonBtnCSS}
                >
                  취소
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoForm;
