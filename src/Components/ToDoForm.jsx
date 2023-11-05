import React, { useState, useRef } from "react";

const ToDoForm = ({ onFormSubmit, taskName, userName }) => {
  const taskNameRef = useRef();
  const userNameRef = useRef();
  const deadlineHoursRef = useRef();
  const deadlineMinutesRef = useRef();

  const [showDeadline, setShowDeadline] = useState(false);

  const toggleDeadline = () => {
    setShowDeadline(!showDeadline);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const taskName = taskNameRef.current.value;
    const userName = userNameRef.current.value;
    const deadlineHours = showDeadline ? deadlineHoursRef.current.value : "";
    const deadlineMinutes = showDeadline
      ? deadlineMinutesRef.current.value
      : "";

    const deadline = showDeadline
      ? `${deadlineHours}:${deadlineMinutes}`
      : false;

    onFormSubmit(taskName, userName, deadline);
  };

  return (
    <form onSubmit={onSubmit} className="todo-form">
      <input
        type="text"
        placeholder="Enter Task"
        ref={taskNameRef}
        defaultValue={taskName}
        className="input-field"
      />
      <input
        type="text"
        placeholder="User's Name"
        ref={userNameRef}
        defaultValue={userName}
        className="input-field"
      />
      <label className="checkbox-label">
        Show Deadline:
        <input
          type="checkbox"
          checked={showDeadline}
          onChange={toggleDeadline}
          className="checkbox-input"
        />
      </label>
      {showDeadline && (
        <div className="deadline-section">
          <label className="deadline-label">Deadline:</label>
          <select ref={deadlineHoursRef} className="select-box">
            <option value="" disabled>
              Hours
            </option>
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={i.toString().padStart(2, "0")}>
                {i.toString().padStart(2, "0")}
              </option>
            ))}
          </select>

          <select ref={deadlineMinutesRef} className="select-box">
            <option value="" disabled>
              Minutes
            </option>
            {Array.from({ length: 60 }, (_, i) => (
              <option key={i} value={i.toString().padStart(2, "0")}>
                {i.toString().padStart(2, "0")}
              </option>
            ))}
          </select>
        </div>
      )}
      <button className="submit-button">Submit</button>
    </form>
  );
};

export default ToDoForm;
