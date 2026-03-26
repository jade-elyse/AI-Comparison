import TaskItem from "./TaskItem";
import "./TaskList.css";

function TaskList({ tasks, filter, onToggle, onDelete }) {
  const pending = tasks.filter((t) => !t.completed);
  const completed = tasks.filter((t) => t.completed);

  if (tasks.length === 0) {
    const messages = {
      Active: "No active tasks — everything's done! 🎉",
      Completed: "No completed tasks yet.",
      All: "",
    };
    return (
      <p className="task-list-empty">{messages[filter] || "No tasks here."}</p>
    );
  }

  return (
    <ul className="task-list" role="list">
      {pending.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}

      {completed.length > 0 && pending.length > 0 && (
        <li className="task-list-divider" role="separator">
          <span>Completed</span>
        </li>
      )}

      {completed.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;
