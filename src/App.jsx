import React from 'react'
import TodoForm from './components/TodoForm'
import "./index.css"
import TodoCard from './components/TodoCard'

const App = () => {
  return (
    <main>
      <TodoForm />
      <TodoCard />
    </main>
  )
}

export default App
