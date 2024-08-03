import React from "react";
import TodoForm from "./components/TodoForm";
import "./index.css";
import TodoList from "./components/TodoList";
import { RenderCheckProvider } from "./context/RenderContext";

const App = () => {
  return (
    <main>
      <RenderCheckProvider>
        <TodoForm />
        <TodoList />
      </RenderCheckProvider>
    </main>
  );
};

export default App;
