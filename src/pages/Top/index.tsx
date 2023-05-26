import {
  User,
  getAuth,
  TwitterAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";
import { getUserByUid } from "../../lib/api/users";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./style.scss";

import { AuthProvider, logout } from "../../lib/auth";
import Container from "../../components/Container";
import Button from "../../components/Button";

const Top: React.FunctionComponent = () => {
  const [userName, setUserName] = useState<String | undefined | null>(null); // プロフィールページ遷移の際に使用
  const { currentUser, isLoading } = AuthProvider(); // ログイン状態

  useEffect(() => {
    if (currentUser) {
      const handleGetUser = async () => {
        const res = await getUserByUid(currentUser.uid); // ログイン中のユーザー情報をdbから取得
        setUserName(res.data.user_name); // ログイン中のユーザー名をセット
      };
      handleGetUser();
    }
  }, [currentUser]);

  return (
    <>
      <Container>
        <h1>トップページ</h1>

        {currentUser ? (
          <div>
            <Button value={"ログアウト"} onClick={logout} design="primary"/>

            <Link to={`/${userName}`}>
              <Button value={"マイページ"} onClick={() => {}} design="primary"/>
            </Link>
          </div>
        ) : (
          <div>
            <Link to={"/login"}>
              <Button value={"ログイン"} onClick={() => {}} design="primary"/>
            </Link>
          </div>
        )}
      </Container>
    </>
  );
};

export default Top;
