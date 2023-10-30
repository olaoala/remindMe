import React from "react";
import styles from "./css/Toggle.module.css";

const ToggleSwitch = ({ label, id, isChecked, onToggle }) => {
  return (
    <div className={styles.container}>
      {label}{" "} <br />
      <div className={styles.toggleswitch}>
        <input
          type="checkbox"
          className={styles.checkbox}
          name={id} // Use the id as the name to make it unique
          id={id} // Use the id as the id attribute to make it unique
          checked={isChecked}
          onChange={onToggle}
        />
        <label className={styles.label} htmlFor={id}>
          <span className={styles.inner} />
          <span className={styles.switch} />
        </label>
      </div>
    </div>
  );
};

export default ToggleSwitch;
