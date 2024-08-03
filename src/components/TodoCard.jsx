import React, { useState, useContext } from "react";
import { TbEdit } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import { RenderCheck } from "../context/RenderContext";
import { todoRestApi } from "../common";
import { BsSendPlusFill } from "react-icons/bs";

const TodoCard = (props) => {
  const { isRendered, setRender } = useContext(RenderCheck);
  const [updatedData, setUpdatedData] = useState({
    id: props.id,
    content: props.content,
    completed: props.completed,
  });

  const todoDelete = async (todoId) => {
    try {
      const response = await todoRestApi.delete(`/todos/${todoId}`);
      if (response.status >= 200 && response.status < 300) {
        toast.success("😊 Todo deleted successfully!");
        setRender(!isRendered); // Trigger a re-render
      } else {
        toast.error(`Error deleting todo: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const todoUpdate = async (todoId) => {
    try {
      const response = await todoRestApi.get(`/todos/${todoId}`);
      if (response.status >= 200 && response.status < 300) {
        setUpdatedData(response.data);
      } else {
        toast.error(`Error fetching todo: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateData = async (e) => {
    e.preventDefault();
    try {
      const response = await todoRestApi.put(`/todos/${updatedData.id}`, updatedData);
      if (response.status >= 200 && response.status < 300) {
        toast.success("🤗 Todo updated successfully!");
        setRender(!isRendered); // Trigger a re-render
      } else {
        toast.error(`Error updating todo: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="todo-card d-flex justify-content-between align-items-center mx-auto bg-dark p-4 mb-2">
        <p className="m-0 text-white w-75">{props.content}</p>
        <div className="edit-remove">
          <button
            className="edit border-0 bg-success text-white rounded-circle me-2"
            onClick={() => todoUpdate(props.id)}
            data-bs-toggle="modal"
            data-bs-target="#updateModal"
          >
            <TbEdit />
          </button>
          <button
            className="edit border-0 bg-danger text-white rounded-circle"
            onClick={() => todoDelete(props.id)}
          >
            <MdDeleteForever />
          </button>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="updateModal"
        tabIndex={-1}
        aria-labelledby="updateModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateModalLabel">Update Todo</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form onSubmit={updateData} className="input-group">
                <input
                  type="text"
                  className="form-control shadow-none border-dark"
                  placeholder="Update your task"
                  value={updatedData.content}
                  onChange={(e) => setUpdatedData({ ...updatedData, content: e.target.value })}
                />
                <button type="submit" className="btn btn-dark fw-bolder fs-5">
                  UPDATE
                  <BsSendPlusFill className="ms-2" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ToastContainer component to render toasts */}
      <ToastContainer />
    </>
  );
};

export default TodoCard;
