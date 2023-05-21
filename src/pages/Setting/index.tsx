import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./style.scss";
import { getUserByUid } from "../../lib/api/users";
import { AuthProvider } from "../../lib/auth";
import { UserType } from "../../types";
import { updateUser } from "../../lib/api/users";
import { createDisplayData } from "../../utils/helpers";
import { computerLabels } from "../../utils/datas";
import Button from "../../components/Button";

const Setting: React.FunctionComponent = () => {
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
            createDisplayData(computerLabels, { ...res.data.computer })
          );
        }
      };
      handleGetUser();
    }
  }, [currentUser]);

  // 入力した値にデータを更新
  const handleChange = (
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

  // 更新して保存
  const handleUpdateUser = () => {
    if (userData) {
      updateUser(userData)
    }
  };

  if (userData) {
    return (
      <>
        <h1>設定</h1>
        <h2>{userData.user_name}</h2>
        <div>
          <h3>メインデバイス</h3>
          <ul>
            {Object.keys(computerData).map((key) => (
              <div key={key}>
                <p>{computerData[key].label}</p>
                <input
                  type="text"
                  value={computerData[key].text}
                  onChange={(e) =>
                    handleChange(e, key, "computer", computerData, setComputerData)
                  }
                />
              </div>
            ))}
          </ul>
          <Button value={"保存"} onClick={() => handleUpdateUser()} />
          <Link to={`/${userData.user_name}`}>
            <Button value={"戻る"} onClick={() => {}} />
          </Link>

        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default Setting;
