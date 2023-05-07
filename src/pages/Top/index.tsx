import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./style.scss";

import { AuthProvider, logout, test } from "../../lib/auth";
import { getUsers } from "../../lib/api/users";
import Button from "../../components/Button";

const Top = () => {
  const [user, isLoading] = AuthProvider();

  // テスト
  useEffect(() => {
    const res = getUsers();
    console.log(res)
  }, []);

  return (
    <>
      <h1>トップページ</h1>
      {user ? (
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
