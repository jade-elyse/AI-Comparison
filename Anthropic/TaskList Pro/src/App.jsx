import { useState } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Buy groceries", completed: false },
    { id: 2, text: "Walk the dog", completed: true },
  ]);

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

  const completedCount = tasks.filter((t) => t.completed).length;

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

          {tasks.length === 0 ? (
            <div className="empty-state">
              <span className="empty-state-icon" aria-hidden="true">
                📋
              </span>
              <p>No tasks yet — add one above to get started!</p>
            </div>
          ) : (
            <TaskList
              tasks={tasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
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
