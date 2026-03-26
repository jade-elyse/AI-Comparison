import React, { useState } from "react";
import "./TaskForm.css";

const TaskForm = ({ addTask }) => {
  const [taskName, setTaskName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      addTask(taskName);
      setTaskName("");
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
