import { useEffect, useMemo, useState } from "react";
import "./App.css";

const TASKS_STORAGE_KEY = "tasklistpro.tasks.v1";

function App() {
  const [newTaskText, setNewTaskText] = useState("");
  const [filter, setFilter] = useState("all");
  const [tasks, setTasks] = useState(() => {
    const fallback = [
      { id: crypto.randomUUID(), text: "Try TaskList Pro", completed: false },
    ];

    try {
      const raw = localStorage.getItem(TASKS_STORAGE_KEY);
      if (!raw) return fallback;

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return fallback;

      const sanitized = parsed
        .filter(
          (t) =>
            t &&
            typeof t === "object" &&
            typeof t.id === "string" &&
            typeof t.text === "string" &&
            typeof t.completed === "boolean",
        )
        .map((t) => ({ id: t.id, text: t.text, completed: t.completed }));

      return sanitized.length > 0 ? sanitized : fallback;
    } catch {
      return fallback;
    }
  });

  const isAddDisabled = newTaskText.trim().length === 0;

  useEffect(() => {
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // Ignore write errors (e.g., storage full, blocked)
    }
  }, [tasks]);

  const remainingCount = useMemo(
    () => tasks.filter((t) => !t.completed).length,
    [tasks],
  );

  const completedCount = tasks.length - remainingCount;

  const filteredTasks = useMemo(() => {
    if (filter === "active") return tasks.filter((t) => !t.completed);
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks;
  }, [filter, tasks]);

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

  function clearCompleted() {
    setTasks((prev) => prev.filter((task) => !task.completed));
  }

  return (
    <div className="app">
      <header className="appHeader">
        <div className="headerText">
          <h1 className="title">TaskList Pro</h1>
          <p className="subtitle">{remainingCount} tasks remaining</p>
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
            <button
              className="addButton"
              type="submit"
              disabled={isAddDisabled}
            >
              Add Task
            </button>
          </form>
        </section>

        <section className="card" aria-label="Tasks">
          {tasks.length === 0 ? (
            <p className="emptyState">No tasks yet.</p>
          ) : (
            <>
              <div className="taskControls">
                <p className="remainingText">
                  {remainingCount} tasks remaining
                </p>

                <button
                  className="clearButton"
                  type="button"
                  onClick={clearCompleted}
                  disabled={completedCount === 0}
                >
                  Clear completed
                </button>
              </div>

              <div className="filterBar" aria-label="Task filters">
                <button
                  className={
                    filter === "all"
                      ? "filterButton filterButtonActive"
                      : "filterButton"
                  }
                  type="button"
                  onClick={() => setFilter("all")}
                  aria-pressed={filter === "all"}
                >
                  All
                </button>
                <button
                  className={
                    filter === "active"
                      ? "filterButton filterButtonActive"
                      : "filterButton"
                  }
                  type="button"
                  onClick={() => setFilter("active")}
                  aria-pressed={filter === "active"}
                >
                  Active
                </button>
                <button
                  className={
                    filter === "completed"
                      ? "filterButton filterButtonActive"
                      : "filterButton"
                  }
                  type="button"
                  onClick={() => setFilter("completed")}
                  aria-pressed={filter === "completed"}
                >
                  Completed
                </button>
              </div>

              {filteredTasks.length === 0 ? (
                <p className="emptyState">No tasks in this view.</p>
              ) : (
                <ul className="taskList">
                  {filteredTasks.map((task) => (
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
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
