import React, { useEffect, useState } from "react";
import { TbEdit } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";
import { todoRestApi } from "../common";

const TodoCard = () => {
  const [todos, setToDos] = useState([]);
  const [loading, setLoading] = useState(false);

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
  }, []);

  return (
    <div className="todolist-wrap">
      {loading ? (
        todos.map((todo) => {
          return (
            <div
              className="todo-card d-flex justify-content-between align-items-center mx-auto bg-dark p-4 mb-2"
              key={todo.id}
            >
              <p className="m-0 text-white w-75">{todo.content}</p>
              <div className="edit-remove">
                <button className="edit border-0 bg-success text-white rounded-circle me-2">
                  <TbEdit />
                </button>
                <button className="edit border-0 bg-danger text-white rounded-circle">
                  <MdDeleteForever />
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div class="d-flex justify-content-center flex-column align-items-center h-100">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p className="fs-3">LOADING...</p>
        </div>
      )}
    </div>
  );
};

export default TodoCard;
