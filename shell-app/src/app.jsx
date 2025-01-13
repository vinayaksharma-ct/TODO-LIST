import React, { useState } from 'react';
import AppFromMf1 from 'mf1/App';
import AppFromMf2 from 'mf2/App';
import './style.css';

const ShellApp = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [results, setResults] = useState({ completed: 0, pending: 0 });
  const [showResults, setShowResults] = useState(false);

  // Add Task
  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { text: input, completed: false }]);
      setInput('');
    }
  };

  // Toggle Task Completion
  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Show Results
  const getResults = () => {
    const completed = tasks.filter((task) => task.completed).length;
    const pending = tasks.length - completed;
    setResults({ completed, pending });
    setShowResults(true); // Switch to results view
  };

  return (
    <div className="shell-app">
      {/* Top Bar (mf1) */}
      <div className="mf1">
        <AppFromMf1 showResults={showResults} />
      </div>

      <div className="main-content">
        {/* Sidebar (mf2) */}
        <div className="mf2">
          <AppFromMf2 />
        </div>

        {/* Main Content Area */}
        <div className="todo-list">
          {!showResults ? (
            <>
              <h2>TODO List</h2>
              <div>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Add a task"
                />
                <button onClick={addTask}>Add</button>
              </div>
              <ul>
                {tasks.map((task, index) => (
                  <li key={index}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(index)}
                    />
                    <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                      {task.text}
                    </span>
                  </li>
                ))}
              </ul>
              <button onClick={getResults}>Get Results</button>
            </>
          ) : (
            <div className="results">
              <h2>Final Result</h2>
              <p>Completed Tasks: {results.completed}</p>
              <p>Pending Tasks: {results.pending}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShellApp;
