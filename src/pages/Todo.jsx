import React, { useState, useEffect } from "react";
import styles from "./css/Todo.module.css"
import List from "../common/List";
import {IoAddCircle} from 'react-icons/io5'
import TaskModal from "../common/Modal";
import alarmSound from "../Asset/alarm.mp3"; 



const Todo = () => {
  const task = [
    {
      id: 1,
      name: 'Task 1',
      description: 'Description for Task 1',
      priority: 'High',
      reminder: '2023-09-30 10:00 AM',
      status : 'pending',
      completed: false
      
    },
    {
      id:2,
      name: 'Task 2',
      description: 'Description for Task 2',
      priority: 'Medium',
      reminder: '2023-10-05 2:30 PM',
      status : 'pending',
      completed: false


    },
    {
      id:3,
      name: 'Task 3',
      description: 'Description for Task 3',
      priority: 'Low',
      reminder: '2023-10-10 9:15 AM',
      status : 'pending',
      completed: false


    },
    {
      id:4,
      name: 'Task 4',
      description: 'Description for Task 4',
      priority: 'High',
      reminder: '2023-10-10 9:15 AM',
      status : 'pending',
      completed: false


    },
    {
      id:5,
      name: 'Task 5',
      description: 'Description for Task 5',
      priority: 'Low',
      reminder: '2023-10-10 9:15 AM',
      status : 'pending',
      completed: false


    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskList, setTaskList] = useState(task); 
  const [alarmAudio] = useState(new Audio(alarmSound));

  const handleAddTask = (newTask) => {
    const newTasks = [...taskList, newTask];
    setTaskList(newTasks);
    localStorage.setItem("task", JSON.stringify(newTasks));
    console.log(newTask)

    setIsModalOpen(false);
  };

  const handleDeleteTask = (index) => {
    const updatedTaskList = [...taskList];
    updatedTaskList.splice(index, 1);
    setTaskList(updatedTaskList);

    // Save the updated tasks to localStorage
    localStorage.setItem("tasks", JSON.stringify(updatedTaskList));
  };

  const setTaskReminderAlarm = (reminderTime) => {
    const currentTime = new Date()
    const [hours, minutes] = reminderTime.split(':').map(Number);
    const reminderTimestamp = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), hours, minutes);
    const timeUntilReminder = reminderTimestamp - currentTime;
  
    if (timeUntilReminder > 0) {
      const alarmAudio = new Audio('path/to/your/alarm-sound.mp3');
      setTimeout(() => {
        alert("Task reminder: It's time for the task!");
      }, timeUntilReminder);
  
      // document.addEventListener('click', () => {
      //   alarmAudio.play();
      // }, { once: true }); 
  
        }
  

  };
  

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTaskList(savedTasks);
  }, []);
  
  useEffect(() => {
    taskList.forEach((task) => {
      if (task.reminder) {
        setTaskReminderAlarm(task.reminder);
      }
    });
  }, [taskList]);
  

      
    return (
        <div className={styles.container}>
            <p>RemindMe</p>

            <div className={styles.summaryContent}>
                <div className={styles.summaryText}>
                    <p>Todo Done</p>
                    <h6>Keep it up</h6>
                </div>
                <div className={styles.summary}>
                    <p>1/{taskList.length}</p>
                </div>

            </div>
            <div className={styles.todoContainer}>
                <div className={styles.addbtn}>
                <p>Add Tasks</p>
                    <div className={styles.circle} onClick={() => setIsModalOpen(true)}>
                        <span className={styles.plus}>+</span>
                    </div>
                    <TaskModal
                      isOpen={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                      onAddTask={handleAddTask}
                      modalType='addTask'
                    />
                </div>

                <List
        tasks={taskList}
        id={taskList.id}
        onDeleteTask={handleDeleteTask}
      />
            </div>

        </div>
     
    );
  }

  export default Todo