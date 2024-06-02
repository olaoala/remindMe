import React, {useState, useEffect} from "react";
import styles from "./css/List.module.css"
import { RiDeleteBinLine } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";  
import ToggleSwitch from "./Toggle";
import TaskModal from "./Modal";

const List = ({ tasks, onDeleteTask, onToggleStatus, onDone }) => {

    const [taskList, setTaskList] = useState(tasks);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showModal, setShowModal] = useState(false);
    // const [task, setTask] = useState({
    //   name: "",
    //   description: "",
    //   priority: "Low",
    //   reminder: "",
    //   status: '',
    //   completed:""
    // });

    // const handleToggleStatus = (index) => {
    //   // Create a new array using the spread operator and update the task's status
    //   const updatedTasks = [...taskList];
    //   updatedTasks[index].status =
    //     updatedTasks[index].status === "in-Progress" ? "pending" : "in-Progress";
    //   setTaskList(updatedTasks);
    //   localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    // }
      
    // Function to delete a task by its index
    const handleDeleteTask = (index) => {
      onDeleteTask(index);
    };
    
    // const onUpdateTask = (updatedTask) => {
    //   console.log(taskList,tasks, updatedTask)

    //   setTaskList((tasks) =>
    //   tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    //   );
   
    //   onClose();

    // };

    const markTaskAsCompleted = (selectedTask, id) => {
      const newTasks= taskList.filter((task) => task !== selectedTask);
       setTaskList(newTasks)
      onClose()  
    };

  
  
    const onClose = () => {
      setShowModal(false);
    };


 


    const handleUpdateClick = (task) => {
      console.log(tasks, task, task.priority)
      
      setSelectedTask(task);
      setShowModal(true);

    }

    const inProgress = taskList.filter((task) => task !== selectedTask);



    useEffect(() => {
      setTaskList(tasks);
    }, [tasks]);
  
  


  
 return (
<div>
<ul className={styles.listcontainer}>
  
  {taskList.map((task, index) => (
    <li className={task.completed ? "completed" : ""} key={index}
    disabled={task.completed}>
      
      <div className={styles.lists}>
        
      
        <label  htmlFor={`task-${index}`}>{task.name}</label>
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
          id={index} // Provide a unique id based on the index
          onClose={() => setShowModal(false)}
          selectedTask={selectedTask}
          modalType='confirmation'
          onConfirm={ markTaskAsCompleted}
          />
      )}
      {/* {showModal && (
        <TaskModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          selectedTask={selectedTask}
                onUpdateTask={(updatedTask) => {
                  onUpdateTask(updatedTask);
                  onUpdateTask(updatedTask); // Call the parent component's function if needed
                }}
          modalType='updateTask'
          />
      )} */}
      </div>

      <div className={styles.taskControls}>
        <span onClick={handleDeleteTask}><RiDeleteBinLine /></span>
        <span onClick={handleUpdateClick}><TbEdit /></span>
      

      {/* <ToggleSwitch
                label="Task In Progress"
                id={`toggle-${index}`} // Provide a unique id based on the index
                //onToggle={() => handleToggleStatus(index)}
                onToggle={onToggleStatus}
                isChecked={task.status === "in-Progress"}   
                disabled={task.completed}             
              />     */}

      </div>

    </li>
  ))}
</ul>
</div>
     
    );
  }

  export default List