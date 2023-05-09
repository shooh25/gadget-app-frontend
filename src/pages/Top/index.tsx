import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./style.scss";

import { AuthProvider, logout } from "../../lib/auth";
import { getUser, getUsers } from "../../lib/api/users";
import Button from "../../components/Button";

const Top: React.FunctionComponent = () => {
  const [currentUser, isLoading] = AuthProvider(); // ログイン状態

  return (
    <>
      <h1>トップページ</h1>
      {currentUser ? (
        <div>
          <Button value={"ログアウト"} onClick={logout} />
        </div>
      ) : (
        <div>
          <Link to={"/login"}>
            <Button value={"ログイン"} onClick={() => {}} />
          </Link>
        </div>
      )}
    </>
  );
};

export default Top;
