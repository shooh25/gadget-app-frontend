import React from "react";
import { Navigate } from "react-router-dom";

import { login } from '../../lib/auth'
import styles from "./style.scss";
import Button from "../../components/Button";

const Login: React.FunctionComponent = () => {
  return (
    <>
      <Button value="Twitterでログイン" onClick={login} design="primary"/>
    </>
  );
};

export default Login;
