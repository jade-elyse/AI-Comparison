import TaskItem from "./TaskItem";
import "./TaskList.css";

function TaskList({ tasks, onToggle, onDelete }) {
  const pending = tasks.filter((t) => !t.completed);
  const completed = tasks.filter((t) => t.completed);

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
