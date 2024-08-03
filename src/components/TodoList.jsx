import React, { useContext, useEffect, useState } from "react";
import { todoRestApi } from "../common";
import EmptyImage from "../assets/empty-list.webp";
import TodoCard from "./TodoCard";
import { RenderCheck } from "../context/RenderContext";

const TodoList = () => {
  const [todos, setToDos] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isRendered } = useContext(RenderCheck);
  console.log(isRendered);
  
  const loadTodos = async () => {
    try {
      const response = await todoRestApi.get("/todos");
      setToDos(response.data);
      setLoading(true);
    } catch (err) {
      setError("Failed to load todos");
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, [isRendered]);

  return (
    <div className="todolist-wrap container">
      {loading ? (
        <>
          {todos.length > 0 ? (
            todos.map((todo) => {
              return (
                <TodoCard
                  content={todo.content}
                  completed={todo.completed}
                  id={todo.id}
                  key={todo.id}
                />
              );
            })
          ) : (
            <div className="empty-image">
              <h1 className="border border-warning text-center mt-5 fw-bold text-warning">
                EMPTY LIST
              </h1>
              <img
                src={EmptyImage}
                alt="image"
                className="h-100 w-100"
                style={{ objectFit: "contain" }}
              />
            </div>
          )}
        </>
      ) : (
        <div className="d-flex justify-content-center flex-column align-items-center h-100">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="fs-3">LOADING...</p>
        </div>
      )}
    </div>
  );
};

export default TodoList;
