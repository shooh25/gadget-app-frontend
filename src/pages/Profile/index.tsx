import React, { useEffect, useState } from "react";
import styles from "./style.scss";
import { useParams } from "react-router-dom";

import { AuthProvider, logout } from "../../lib/auth";
import { getUser } from "../../lib/api/users";
import { UserType } from "../../types";

const Profile: React.FunctionComponent = () => {
  const [currentUser, isLoading] = AuthProvider(); // ログイン状態
  const [userData, setUserData] = useState<UserType | null>(null); // プロフィールに表示されるユーザー
  const params = useParams();

  useEffect(() => {
    const handleGetUser = async () => {
      const res = await getUser(params.user_name);
      setUserData(res.data); // paramsで取得したユーザーのデータを登録
    };
    handleGetUser();
  }, []);

  return (
    <>
      <h1>プロフィールページ</h1>
      <p></p>
    </>
  );
};

export default Profile;
