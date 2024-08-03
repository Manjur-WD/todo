import React, { useContext, useState } from "react";
import { BsSendPlusFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { todoRestApi } from "../common";
import { RenderCheck } from "../context/RenderContext";

const TodoForm = () => {
  const [data, setData] = useState({
    content: "",
    completed: false,
  });

  const {isRendered, setRender } = useContext(RenderCheck);

  

  const storeData = async (e) => {
    e.preventDefault();

    try {
      const response = await todoRestApi.post("/todos", data);

      if (response.status >= 200 && response.status < 300) {
        toast.success("😊 Todo created successfully!");
        setData({ content: "", completed: false }); // Clear input after successful submission
        setRender(!isRendered);
      } else {
        toast.error(`Error creating todo: ${response.status}`);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <section className="todoform container text-center p-5">
      <h1 className="fw-bolder">TODO LIST</h1>

      <form
        action="#"
        onSubmit={storeData}
        className="input-group"
      >
        <input
          type="text"
          className="form-control shadow-none border-dark"
          placeholder="Write something about your task"
          value={data.content}
          onChange={(e) => {
            setData({ ...data, content: e.target.value });
          }}
        />
        <button type="submit" className="btn btn-dark fw-bolder fs-5">
          <BsSendPlusFill />
        </button>
      </form>

      {/* ToastContainer component to render toasts */}
      <ToastContainer />
    </section>
  );
};

export default TodoForm;
