import "./TaskItem.css";

function TaskItem({ task, onToggle, onDelete }) {
  const { id, text, completed } = task;

  return (
    <li className={`task-item${completed ? " task-item--completed" : ""}`}>
      <label className="task-item-label" htmlFor={`task-${id}`}>
        <input
          id={`task-${id}`}
          className="task-checkbox"
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
          aria-label={`Mark "${text}" as ${completed ? "incomplete" : "complete"}`}
        />
        <span className="task-checkbox-custom" aria-hidden="true" />
        <span className="task-text">{text}</span>
      </label>

      <button
        className="delete-btn"
        onClick={() => onDelete(id)}
        aria-label={`Delete task: ${text}`}
        title="Delete task"
      >
        <span aria-hidden="true">&#x2715;</span>
      </button>
    </li>
  );
}

export default TaskItem;
