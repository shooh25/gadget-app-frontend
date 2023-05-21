import React, { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";

import styles from "./style.scss";
import { AuthProvider } from "../../lib/auth";
import { getUserByName } from "../../lib/api/users";
import { UserType } from "../../types";
import Button from "../../components/Button";
import Device from "../../components/Device";

const Profile: React.FunctionComponent = () => {
  const pathName = useLocation().pathname; // URL末尾の文字列
  const { currentUser } = AuthProvider(); // ログイン状態を監視
  const [userData, setUserData] = useState<UserType | null>(null); // プロフィールに表示されるユーザー
  const [isLoading, setIsLoading] = useState<Boolean>(true); // ユーザー情報を読み込む間ロード
  const [isMyPage, setIsMyPage] = useState<boolean>(false); // マイページか否か

  useEffect(() => {
    const handleGetUser = async () => {
      // URL末尾の文字列でユーザーを検索
      const res = await getUserByName(pathName.slice(1));

      // 不要なフィールドを削除
      if (res.data) {
        setUserData(res.data);
      }

      // ロード画面終了
      setIsLoading(false);
    };
    handleGetUser();
  }, []);

  // console.log(userData);

  useEffect(() => {
    // マイページの判定
    if (currentUser && userData) {
      if (currentUser.uid === userData.uid) {
        setIsMyPage(true);
      }
    }
  }, [currentUser, userData]);

  if (isLoading) {
    return <></>;
  } else {
    return (
      <>
        <h1>プロフィールページ</h1>
        <div>
          {userData ? (
            <div>
              <section>
                <h2>{userData.user_name}</h2>
                {isMyPage ? (
                  <div>
                    <Link to={"/setting"}>
                      <Button value={"プロフィールを編集"} onClick={() => {}} />
                    </Link>
                  </div>
                ) : null}
              </section>

              <section>
                <Device data={userData.computer} />
              </section>
            </div>
          ) : (
            <div>
              <h2>このアカウントは存在しません</h2>
            </div>
          )}
        </div>
      </>
    );
  }
};

export default Profile;