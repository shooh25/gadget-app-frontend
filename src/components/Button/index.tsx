import React from "react";
import styles from "./style.scss";

interface Props {
  onClick: () => void;
}

const Button: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <>
      <button onClick={props.onClick}>Twitterでログイン</button>
    </>
  );
};

export default Button;
