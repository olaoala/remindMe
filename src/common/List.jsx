import React, {useState, useEffect} from "react";
import styles from "./css/List.module.css"
import {RiDeleteBin6Fill} from "react-icons/ri"
import ToggleSwitch from "./Toggle";
import TaskModal from "./Modal";

const List = ({ tasks, onDeleteTask, onToggleStatus }) => {

    const [taskList, setTaskList] = useState(tasks);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleToggleStatus = (index) => {
      // Create a new array using the spread operator and update the task's status
      const updatedTasks = [...taskList];
      updatedTasks[index].status =
        updatedTasks[index].status === "in-Progress" ? "pending" : "in-Progress";
      setTaskList(updatedTasks);
      console.log(updatedTasks)
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
      
    // Function to delete a task by its index
    const handleDeleteTask = (index) => {
      onDeleteTask(index);
    };
    


    const handleRadioClick = (task, id) => {
      console.log(tasks)
      setSelectedTask(task);
      setShowModal(true);
      handleDeleteTask(id)
    };

    useEffect(() => {
      console.log(selectedTask)
    }, [selectedTask]);
  

  useEffect(() => {
    handleToggleStatus(0)
  }, []);
    return (
<div>
<ul className={styles.listcontainer}>
  {tasks.map((task, index) => (
    <li key={index}>
      <div>
      <input id={`task-${index}`} type="radio"  onClick={() => handleRadioClick(task,index)}
              disabled={task.completed}/>
        <label htmlFor={`task-${index}`}>{task.name}</label>
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
        
      {showModal && (
        <TaskModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          selectedTask={selectedTask}
          modalType='confirmation'
          />
      )}
      </div>

      <div className={styles.taskControls}>
      <ToggleSwitch
                label="Task In Progress"
                id={`toggle-${index}`} // Provide a unique id based on the index
                onToggle={() => handleToggleStatus(index)}
                isChecked={task.status === "in-Progress"}                
              />    
      </div>
    </li>
  ))}
</ul>
</div>
     
    );
  }

  export default List