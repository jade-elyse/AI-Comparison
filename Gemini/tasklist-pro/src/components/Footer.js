import React from "react";
import "./Footer.css";

const Footer = ({ remainingTasks, filter, setFilter, clearCompleted }) => {
  return (
    <div className="footer">
      <span className="tasks-remaining">{remainingTasks} tasks remaining</span>
      <div className="filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </div>
  );
};

export default Footer;
