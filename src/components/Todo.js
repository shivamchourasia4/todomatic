import React, { useState } from "react";

function Todo(props) {
  const {
    id,
    todoData,
    isCompleted,
    toggleCompleted,
    updateTodoText,
    deleteTodo,
  } = props;

  const [editView, setEditView] = useState(false);
  const [todoText, setTodoText] = useState(todoData);

  const handleCheck = () => {
    toggleCompleted(id);
  };

  const cancelEditView = (e) => {
    setTodoText(todoData);
    setEditView(false);
  };

  const save = () => {
    if (todoText.length === 0) {
      alert("Please add text to Todo!");
    } else {
      updateTodoText(id, todoText);
      setEditView(false);
    }
  };

  return (
    <div>
      {editView ? (
        <div data-testid="edit-view" className="row">
          <input
            type="text"
            data-testid="edit-text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          ></input>
          <span>
            <button onClick={save}>Save</button>
            <button data-testid="cancel" onClick={cancelEditView}>
              Cancel
            </button>
          </span>
        </div>
      ) : (
        <div data-testid="check-view" className="row">
          <span className="row">
            <input
              type="checkbox"
              className="checkbox"
              data-testid="check"
              checked={isCompleted}
              onChange={handleCheck}
            />
            <label
              className={isCompleted ? "strike" : "non-strike"}
              data-testid="todo-text"
            >
              {todoData}
            </label>
          </span>
          <span>
            <button data-testid="edit" onClick={() => setEditView(true)}>
              Edit
            </button>
            <button data-testid="delete" onClick={() => deleteTodo(id)}>
              Delete
            </button>
          </span>
        </div>
      )}
    </div>
  );
}

export default Todo;
