import React from "react";
import styles from "./style.scss";

interface Props {
  value: string;
  onClick: () => void;
}

const Button: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <>
      <button onClick={props.onClick}>{props.value}</button>
    </>
  );
};

export default Button;
