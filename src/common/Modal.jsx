// TaskModal.js
import React, { useState } from "react";
import styles from  "./css/Modal.module.css" // Create a separate CSS file for modal styles

const TaskModal = ({ isOpen, onClose, onAddTask }) => {
  const [task, setTask] = useState({
    name: "",
    description: "",
    priority: "Low",
    reminder: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(task);
    setTask({
      name: "",
      description: "",
      priority: "Low",
      reminder: "",
    });
  };

  return (
    isOpen && (
      <div className={styles.modal}>
        <div className={styles.modalcontent}>
          <span className={styles.close} onClick={onClose}>
            &times;
          </span>
          <h2>Add Task</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formgroup}>
              <label htmlFor="name">Task Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={task.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formgroup}>
              <label htmlFor="description">Task Description:</label>
              <textarea
                id="description"
                name="description"
                value={task.description}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formgroup}>
              <label htmlFor="priority">Task Priority:</label>
              <select
                id="priority"
                name="priority"
                value={task.priority}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className={styles.formgroup}>
              <label htmlFor="reminder">Task Reminder:</label>
              <input
                type="time"
                id="reminder"
                name="reminder"
                value={task.reminder}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className={styles.savebutton}>
              Save
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default TaskModal;
