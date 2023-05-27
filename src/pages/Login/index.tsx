import React from "react";

import { login } from '../../lib/auth'
import styles from "./style.module.scss";
import Button from "../../components/Button";
import Container from "../../components/Container";

const Login: React.FunctionComponent = () => {
  return (
    <>
    <Container>
      <div className={styles.root}>
        <div className={styles.contents}>
          <div className={styles.heading}>
            <h1>ログインする</h1>
          </div>
          <div className={styles.btn_area}>
            <Button value="Twitterでログイン" onClick={login} design="primary"/>
          </div>
        </div>
      </div>
    </Container>
    </>
  );
};

export default Login;
