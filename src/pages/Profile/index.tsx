import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

import styles from "./style.module.scss";
import { AuthProvider } from "../../lib/auth";
import { getUserByName } from "../../lib/api/users";
import { UserType } from "../../types";
import { gadgetLabels } from "../../utils/datas";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Device from "../../components/Device";
import Card from "../../components/Card";

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
      
      if (res.data) {
        setUserData(res.data);
      }
      // ロード画面終了
      setIsLoading(false);
    };
    handleGetUser();
  }, []);

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
        <Container>
          <div className={styles.root}>
            <div className={styles.header}></div>
            <div className={styles.icon_wrapper}>
              {userData?.photo_url ? (<img src={userData.photo_url}></img>):(null)}
            </div>
            {userData ? (
              <>
                <section className={styles.profile}>
                  <div className={styles.contents}>
                    <h1 className={styles.profile_name}>
                      {userData.user_name}
                    </h1>
                    {isMyPage ? (
                      <div className={styles.edit_button}>
                        <Link to={"/setting"}>
                          <Button value={"編集"} onClick={() => {}} design="primary"/>
                        </Link>
                      </div>
                    ) : null}
                  </div>
                  <div className={styles.profile_desc_wrapper}>
                    <p>{userData.desc}</p>
                  </div>
                </section>

                <section className={styles.section}>
                  <h2 className={styles.section_heading}>メインデバイス</h2>
                  <Device data={userData.computer} />
                </section>

                <section className={styles.section}>
                  <h2 className={styles.section_heading}>周辺機器</h2>
                  <Card data={userData.gadget.mouse_items} heading={gadgetLabels['mouse_items']} />
                  <Card data={userData.gadget.keyboard_items} heading={gadgetLabels['keyboard_items']} />
                  <Card data={userData.gadget.monitor_items} heading={gadgetLabels['monitor_items']} />
                  <Card data={userData.gadget.audio_items} heading={gadgetLabels['audio_items']} />
                  <Card data={userData.gadget.pad_items} heading={gadgetLabels['pad_items']} />
                </section>

                <section className={styles.section}>
                <h2 className={styles.section_heading}>その他</h2>
                </section>
              </>
            ) : (
              <div>
                <h2>このアカウントは存在しません</h2>
              </div>
            )}
          </div>
        </Container>
      </>
    );
  }
};

export default Profile;
