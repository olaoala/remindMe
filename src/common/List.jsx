import React, {useState} from "react";
import styles from "./css/List.module.css"
import {RiDeleteBin6Fill} from "react-icons/ri"
import ToggleSwitch from "./Toggle";

const List = ({ tasks, onDeleteTask, onToggleStatus }) => {

    const [taskList, setTaskList] = useState(tasks);

    const handleToggleStatus = (index) => {
      const updatedTasks = [...taskList];
      updatedTasks[index].status =
        updatedTasks[index].status === "In Progress" ? "Pending" : "In Progress";
        console.log(updatedTasks); // Check the updatedTasks array
      setTaskList(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

      
    // Function to delete a task by its index
    const handleDeleteTask = (index) => {
      onDeleteTask(index);
    };
  
    return (
<div>
<ul className={styles.listcontainer}>
  {tasks.map((task, index) => (
    <li key={index}>
      <div>
        <input id="tasks" type="radio" />
        <label htmlFor="tasks">{task.name}</label>
        {task.priority === "High" &&
          Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className={styles.redDot}></span>
          ))}
        {task.priority === "Medium" &&
          Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className={styles.redDot}></span>
          ))}
        {task.priority === "Low" &&
          Array.from({ length: 1 }).map((_, i) => (
            <span key={i} className={styles.redDot}></span>
          ))}
        <p>{task.description}</p>
        <p>{task.reminder}</p>
      </div>

      <div className={styles.taskControls}>
      <ToggleSwitch
                label="Task In Progress"
                id={`toggle-${index}`} // Provide a unique id based on the index
                onToggle={() => handleToggleStatus(index)}
                isChecked={task.status === "In Progress"}
              />    
      </div>
    </li>
  ))}
</ul>
</div>
     
    );
  }

  export default List