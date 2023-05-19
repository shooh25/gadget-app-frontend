import React, { useState, useEffect } from "react";

import styles from "./style.scss";
import { getUserByUid } from "../../lib/api/users";
import { AuthProvider } from "../../lib/auth";
import { UserType } from "../../types";
import Button from "../../components/Button";

const Setting: React.FunctionComponent = () => {
  const { currentUser } = AuthProvider(); // ログイン状態
  const [userData, setUserData] = useState<UserType | null>(null); // ログイン中のユーザーのデータ

  useEffect(() => {
    if (currentUser) {
      const handleGetUser = async () => {
        const res = await getUserByUid(currentUser.uid); // ログイン中のユーザー情報をdbから取得
        setUserData(res.data);
      };
      handleGetUser();
    }
  }, [currentUser]);

  if (userData) {
    return (
      <>
        <h1>設定</h1>
        <h2>{userData.user_name}</h2>
      </>
    );
  } else {
    return <></>;
  }
};

export default Setting;
