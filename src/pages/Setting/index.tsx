import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./style.scss";
import { getUserByUid } from "../../lib/api/users";
import { AuthProvider } from "../../lib/auth";
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

  // ガジェットのアイテム名を更新
  const handleChangeItem = (e: any, i: number, category: string) => {
    const updatedUser = { ...userData };
    updatedUser.gadget.mouse_items[i] = e.target.value;
    setUserData(updatedUser);
  };

  // アイテム追加
  const addItem = (category: string) => {
    const updatedUser = { ...userData };
    updatedUser.gadget.mouse_items.push("");
    setUserData(updatedUser);
  };

  // アイテム削除
  const removeItem = (i: number, category: string) => {
    const updatedUser = { ...userData };
    updatedUser.gadget.mouse_items.splice(i, 1);
    setUserData(updatedUser);
  };

  // 空文字を除く
  const removeEmptyElements = (items: string[]) => {
    return items.filter((item) => item != '')
  }

  // 更新して保存
  const handleUpdateUser = () => {
    const updatedUser = { ...userData };
    updatedUser.gadget.mouse_items =  removeEmptyElements(updatedUser.gadget.mouse_items)
    setUserData(updatedUser)

    if (userData) {
      console.log(userData)
      updateUser(userData);
    }
  };

  if (userData) {
    const gadget = userData.gadget;
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
                    handleChangeComp(
                      e,
                      key,
                      "computer",
                      computerData,
                      setComputerData
                    )
                  }
                />
              </div>
            ))}
          </ul>
          <div>
            <h3>周辺機器</h3>
            <ul>
              {gadget.mouse_items.map((item: string, i: number) => (
                <li key={i}>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleChangeItem(e, i, "mouse_items")}
                  />
                  <Button
                    value={"削除"}
                    onClick={() => removeItem(i, "mouse_items")}
                  />
                </li>
              ))}
            </ul>
            <Button value={"新規追加する"} onClick={() => addItem("mouse_items")} />
          </div>

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
