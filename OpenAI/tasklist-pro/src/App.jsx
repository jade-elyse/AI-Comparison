import { useMemo, useState } from "react";
import "./App.css";

function App() {
  const [newTaskText, setNewTaskText] = useState("");
  const [tasks, setTasks] = useState(() => [
    { id: crypto.randomUUID(), text: "Try TaskList Pro", completed: false },
  ]);

  const isAddDisabled = newTaskText.trim().length === 0;

  const remainingCount = useMemo(
    () => tasks.filter((t) => !t.completed).length,
    [tasks],
  );

  function handleSubmit(event) {
    event.preventDefault();
    const text = newTaskText.trim();
    if (!text) return;

    setTasks((prev) => [
      { id: crypto.randomUUID(), text, completed: false },
      ...prev,
    ]);
    setNewTaskText("");
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  return (
    <div className="app">
      <header className="appHeader">
        <div className="headerText">
          <h1 className="title">TaskList Pro</h1>
          <p className="subtitle">
            {tasks.length === 0
              ? "Add your first task to get started."
              : `${remainingCount} remaining • ${tasks.length} total`}
          </p>
        </div>
      </header>

      <main className="content">
        <section className="card" aria-label="Add a task">
          <form className="taskForm" onSubmit={handleSubmit}>
            <label className="srOnly" htmlFor="taskText">
              New task
            </label>
            <input
              id="taskText"
              className="taskInput"
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="What do you need to do?"
              autoComplete="off"
            />
            <button className="addButton" type="submit">
              Add Task
            </button>
          </form>
        </section>

        <section className="card" aria-label="Tasks">
          {tasks.length === 0 ? (
            <p className="emptyState">No tasks yet.</p>
          ) : (
            <ul className="taskList">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={
                    task.completed ? "taskItem taskItemDone" : "taskItem"
                  }
                >
                  <label className="taskLeft">
                    <input
                      className="taskCheckbox"
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      aria-label={`Mark ${task.text} as complete`}
                    />
                    <span className="taskText">{task.text}</span>
                  </label>

                  <button
                    className="deleteButton"
                    type="button"
                    onClick={() => deleteTask(task.id)}
                    aria-label={`Delete ${task.text}`}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
