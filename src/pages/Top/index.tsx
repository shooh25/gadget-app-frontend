import React from "react";
import { Link } from "react-router-dom";
import styles from "./style.scss";
import { AuthProvider, logout } from "../../lib/auth";

const Top = () => {
  const [user, isLoading] = AuthProvider();

  return (
    <>
      <h1>トップページ</h1>
      {user ? (
        <div>
          <button onClick={logout}>ログアウト</button>
        </div>
      ) : (
        <div>
          <Link to={'/login'}>ログイン</Link>
        </div>
      )}
    </>
  );
};

export default Top;
