import { useState } from "react";
import "./TaskForm.css";

function TaskForm({ onAdd }) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      setError("Please enter a task.");
      return;
    }

    onAdd(inputValue);
    setInputValue("");
    setError("");
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (error) setError("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <label className="task-form-label" htmlFor="task-input">
        Add a new task
      </label>

      <div className="task-form-row">
        <input
          id="task-input"
          className={`task-input${error ? " task-input--error" : ""}`}
          type="text"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={handleChange}
          maxLength={200}
          aria-describedby={error ? "task-input-error" : undefined}
          aria-invalid={!!error}
        />
        <button className="add-btn" type="submit">
          Add Task
        </button>
      </div>

      {error && (
        <p id="task-input-error" className="task-form-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

export default TaskForm;
