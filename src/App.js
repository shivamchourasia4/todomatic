import { useState } from "react";
import "./App.css";
import Todo from "./components/Todo";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todos, setTodos] = useState([
    {
      id: uuidv4(),
      todo: "Check Groceries",
      completed: false,
    },
  ]);

  const [todoText, setTodoText] = useState("");

  const toggleCompleted = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          const isCompleted = todo.completed;
          return { ...todo, completed: !isCompleted };
        }
        return todo;
      })
    );
  };

  const updateTodoText = (id, data) => {
    setTodos(
      todos.map((element) => {
        if (element.id === id) {
          if (data.length === 0) alert("Please add text to Todo!");
          else return { ...element, todo: data };
        }
        return element;
      })
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => id !== todo.id));
  };

  const addTodo = () => {
    if (todoText.length === 0) alert("Please add text to Todo!");
    else {
      setTodos([...todos, { id: uuidv4(), todo: todoText, completed: false }]);
      setTodoText("");
    }
  };

  return (
    <div className="center">
      <h2>TodoMatic</h2>
      <span>
        <input
          type="text"
          data-testid="input-todo"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        ></input>
        <button data-testid="add" onClick={addTodo}>
          Add Todo
        </button>
      </span>
      {todos.map(({ id, todo, completed }) => {
        return (
          <Todo
            key={id}
            id={id}
            todoData={todo}
            isCompleted={completed}
            toggleCompleted={toggleCompleted}
            updateTodoText={updateTodoText}
            deleteTodo={deleteTodo}
          />
        );
      })}
    </div>
  );
}

export default App;
