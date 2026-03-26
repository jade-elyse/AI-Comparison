import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

const FILTERS = ["All", "Active", "Completed"];

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("tasklist-pro-tasks");
      return saved
        ? JSON.parse(saved)
        : [
            { id: 1, text: "Buy groceries", completed: false },
            { id: 2, text: "Walk the dog", completed: true },
          ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("tasklist-pro-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [filter, setFilter] = useState("All");

  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const remainingCount = tasks.length - completedCount;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <div className="card">
          <TaskForm onAdd={addTask} />
        </div>

        <div className="card">
          <div className="list-header">
            <h2 className="list-title">Your Tasks</h2>
            <span className="task-count">
              {completedCount}/{tasks.length} done
            </span>
          </div>

          {tasks.length > 0 && (
            <div
              className="progress-bar-wrap"
              role="progressbar"
              aria-valuenow={Math.round((completedCount / tasks.length) * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${Math.round((completedCount / tasks.length) * 100)}% complete`}
            >
              <div
                className="progress-bar-fill"
                style={{
                  width: `${Math.round((completedCount / tasks.length) * 100)}%`,
                }}
              />
            </div>
          )}

          {/* Filter bar */}
          {tasks.length > 0 && (
            <div className="filter-bar" role="group" aria-label="Filter tasks">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  className={`filter-btn${filter === f ? " filter-btn--active" : ""}`}
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                >
                  {f}
                </button>
              ))}
            </div>
          )}

          {tasks.length === 0 ? (
            <div className="empty-state">
              <span className="empty-state-icon" aria-hidden="true">
                📋
              </span>
              <p>No tasks yet — add one above to get started!</p>
            </div>
          ) : (
            <TaskList
              tasks={filteredTasks}
              filter={filter}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          )}

          {/* Card footer bar */}
          {tasks.length > 0 && (
            <div className="card-footer-bar">
              <span className="remaining-counter">
                {remainingCount} {remainingCount === 1 ? "task" : "tasks"}{" "}
                remaining
              </span>
              {completedCount > 0 && (
                <button className="clear-btn" onClick={clearCompleted}>
                  Clear completed ({completedCount})
                </button>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        <p>TaskList Pro &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
