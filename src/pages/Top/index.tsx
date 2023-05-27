import { getUserByUid } from "../../lib/api/users";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";

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
        <div className={styles.root}>
          <div className={styles.contents}>
            <div className={styles.heading}>
              <h1>MyGadgets</h1>
              <p>自慢のガジェットを簡単に紹介できるサービス</p>
            </div>
            {currentUser ? (
              <div className={styles.btn_area}>
                <Button value={"ログアウト"} onClick={logout} design="secondary"/>
                <Link to={`/${userName}`}>
                  <Button value={"マイページへ"} onClick={() => {}} design="primary"/>
                </Link>
              </div>
            ) : (
              <div className={styles.btn_area}>
                <Link to={"/login"}>
                  <Button value={"ログイン"} onClick={() => {}} design="primary"/>
                </Link>
              </div>
            )}
          </div>
        </div>

      </Container>
    </>
  );
};

export default Top;
