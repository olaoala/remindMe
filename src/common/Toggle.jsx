import React from "react";
import styles from "./css/Toggle.module.css";

const ToggleSwitch = ({ label, id, isChecked, onToggle }) => {
  return (
    <div className={styles.container}>
      {label}{" "} <br />
      <div className={styles.toggleswitch}>
        <label className={styles.switch} >
          <input  type="checkbox" 
          name={id} 
          id={id} 
          onChange={onToggle}/>
          <span className={styles.slider}></span>
        </label>
      </div>
    </div>
  );
};

export default ToggleSwitch;
