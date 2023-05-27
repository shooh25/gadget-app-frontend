import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import { getUserByUid } from "../../lib/api/users";
import { AuthProvider } from "../../lib/auth";
import { updateUser } from "../../lib/api/users";
import { createDisplayData } from "../../utils/helpers";
import { computerLabels, gadgetLabels } from "../../utils/datas";
import Container from "../../components/Container";
import Button from "../../components/Button";
import SettingList from "../../components/SettingList";

const Setting: React.FC = () => {
  const { currentUser } = AuthProvider(); // ログイン状態
  const [userData, setUserData] = useState<any>(null); // ログイン中のユーザーのデータ

  // 以下ガジェット(表示用)
  const [computerData, setComputerData] = useState<any>(null);

  useEffect(() => {
    if (currentUser) {
      const handleGetUser = async () => {
        // ログイン中のユーザー情報をdbから取得
        const res = await getUserByUid(currentUser.uid);

        if (res.data) {
          // labelsに基づいて表示するデータを作成
          setUserData(res.data);
          setComputerData(
            createDisplayData(computerLabels, { ...res.data.computer }, false)
          );
        }
      };
      handleGetUser();
    }
  }, [currentUser]);

  // デバイスのパーツ名を更新
  const handleChangeComp = (
    e: any,
    key: string,
    userKey: string,
    state: any,
    func: React.Dispatch<any>
  ) => {
    // 表示用のデータ更新
    const updated = { ...state };
    updated[key].text = e.target.value;
    func(updated);

    // ユーザー情報の更新
    const updatedUser = { ...userData };
    updatedUser[userKey][key] = e.target.value;
    setUserData(updatedUser);
  };

  // 空文字を除く
  const removeEmptyElements = (items: string[]) => {
    return items.filter((item) => item !== "");
  };

  // 更新して保存
  const handleUpdateUser = () => {
    const updatedUser = { ...userData };

    for (let key in gadgetLabels) {
      updatedUser.gadget[key] = removeEmptyElements(updatedUser.gadget[key]);
    }
    if (userData) {
      updateUser(userData);
    }
  };

  if (userData) {
    return (
      <>
        <Container>
          <div className={styles.root}>
            <div className={styles.heading}>
              <h1>設定</h1>
            </div>
            <div className={styles.body}>
              <section className={styles.contents}>
                <div className={styles.heading}>
                  <h2>メインデバイス</h2>
                </div>
                <ul className={styles.computer_list}>
                  {Object.keys(computerData).map((key) => (
                    <li className={styles.item} key={key}>
                      <label htmlFor={key} className={styles.label}>
                        {computerData[key].label}
                      </label>
                      <input
                        value={computerData[key].text}
                        placeholder={`${computerData[key].label}名を入力する`}
                        type="text"
                        id={key}
                        onChange={(e) =>
                          handleChangeComp(
                            e,
                            key,
                            "computer",
                            computerData,
                            setComputerData
                          )
                        }
                      />
                    </li>
                  ))}
                </ul>
              </section>

              <section className={styles.contents}>
                <div className={styles.heading}>
                  <h2>周辺機器</h2>
                </div>

                {/* マウス */}
                <SettingList
                  label={gadgetLabels["mouse_items"]}
                  category={"mouse_items"}
                  userData={userData}
                  setUserData={setUserData}
                />

                {/* キーボード */}
                <SettingList
                  label={gadgetLabels["keyboard_items"]}
                  category={"keyboard_items"}
                  userData={userData}
                  setUserData={setUserData}
                />

                {/* モニター */}
                <SettingList
                  label={gadgetLabels["monitor_items"]}
                  category={"monitor_items"}
                  userData={userData}
                  setUserData={setUserData}
                />

                {/* オーディオ */}
                <SettingList
                  label={gadgetLabels["audio_items"]}
                  category={"audio_items"}
                  userData={userData}
                  setUserData={setUserData}
                />

                {/* コントローラー */}
                <SettingList
                  label={gadgetLabels["pad_items"]}
                  category={"pad_items"}
                  userData={userData}
                  setUserData={setUserData}
                />
              </section>

              <section className={styles.contents}>
                <div className={styles.heading}>
                  <h2>その他</h2>
                </div>

                {/* スマホ */}
                <SettingList
                  label={gadgetLabels["phone_items"]}
                  category={"phone_items"}
                  userData={userData}
                  setUserData={setUserData}
                />
              </section>

              {/* 下部のバー */}
              <section className={styles.bar}>
                <Button
                  value={"保存"}
                  onClick={() => handleUpdateUser()}
                  design="primary"
                />
                <Link to={`/${userData.user_name}`}>
                  <Button
                    value={"戻る"}
                    onClick={() => {}}
                    design="secondary"
                  />
                </Link>
              </section>
            </div>
          </div>
        </Container>
      </>
    );
  } else {
    return <></>;
  }
};

export default Setting;
