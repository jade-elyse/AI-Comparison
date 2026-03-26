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

          {tasks.length === 0 ? (
            <p className="empty-state">
              No tasks yet — add one above to get started!
            </p>
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
