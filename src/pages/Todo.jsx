import React, { useState, useEffect } from "react";
import styles from "./css/Todo.module.css"
import List from "../common/List";
import { IoAddCircle } from 'react-icons/io5'
import TaskModal from "../common/Modal";
import alarmSound from "../Asset/alarm.mp3";



const Todo = () => {
  const task = [{}];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskList, setTaskList] = useState(task);
  const [alarmAudio] = useState(new Audio(alarmSound));

  const handleAddTask = (newTask) => {
    const newTasks = [...taskList, newTask];
    localStorage.setItem("task", JSON.stringify(newTasks));
    setTaskList(newTasks);
    console.log(newTask, task, taskList, newTasks)
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
    const savedTasks = JSON.parse(localStorage.getItem("task")) || [];
    setTaskList(savedTasks);
    // console.log(taskList.length, taskList)
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
          <input
            type="text"
            id="task"
            name="task"
            value={task.name}
            placeholder="Add task"
            required
          />      
          <div className={styles.circle} onClick={() => setIsModalOpen(true)}>
            <span className={styles.plus}>+</span>
          </div>
          {/* <TaskModal
                      isOpen={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                      onAddTask={handleAddTask}
                      modalType='addTask'
                    /> */}
        </div>

        {taskList.length > 0 && (
          <List
            tasks={taskList}
            id={taskList.id}
            onDeleteTask={handleDeleteTask}
          // onToggleStatus={handleToggleStatus}
          // onDone={markDone}
          />
        )}

      </div>

    </div>

  );
}

export default Todo