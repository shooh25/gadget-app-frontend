import React from "react";
import styles from "./style.module.scss";

interface Props {
  value: string;
  design: string;
  onClick: () => void;
}

const Button: React.FC<Props> = (props: Props) => {
  if (props.design === "primary") {
    return (
      <>
        <button className={styles.primary_button} onClick={props.onClick}>{props.value}</button>
      </>
    );
  } else {
    return (
      <>
        <button className={styles.secondary_button} onClick={props.onClick}>{props.value}</button>
      </>
    );
  }
};

export default Button;
