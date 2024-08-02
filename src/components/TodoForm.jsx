import React from "react";
import { BsSendPlusFill } from "react-icons/bs";

const TodoForm = () => {
  return (
    <section className="todoform container text-center p-5">
      <h1 className="fw-bolder">TODO LIST</h1>
      <div className="input-group w-50 mx-auto">
        <input type="text" className="form-control shadow-none border-dark" placeholder="write something about your task"/>
        <button type="button" className="btn btn-dark fw-bolder fs-5">
          <BsSendPlusFill />
        </button>
      </div>
    </section>
  );
};

export default TodoForm;
