import React from "react";
import { gadgetLabels } from "../../utils/datas";
import styles from "./style.module.scss";
import Button from "../Button";

type Props = {
  label: string;
  userData: any;
  category: string;
  setUserData: React.Dispatch<any>;
};

const SettingList: React.FC<Props> = (props: Props) => {
  const label = props.label;
  const category = props.category;
  const userData = props.userData;
  const setUserData = props.setUserData;

  // ガジェットのアイテム名を更新
  const handleChangeItem = (e: any, i: number) => {
    const updatedUser = { ...userData };
    updatedUser.gadget[category][i] = e.target.value;
    setUserData(updatedUser);
  };

  // アイテム追加
  const addItem = () => {
    const updatedUser = { ...userData };
    updatedUser.gadget[category].push("");
    setUserData(updatedUser);
  };

  // アイテム削除
  const removeItem = (i: number) => {
    const updatedUser = { ...userData };
    updatedUser.gadget[category].splice(i, 1);
    setUserData(updatedUser);
  };
  return (
    <>
      <div className={styles.gadget_group}>
        <div className={styles.heading}>
          <h3>{label}</h3>
        </div>
        <ul className={styles.gadget_list}>
          {userData.gadget[category].map((item: string, i: number) => (
            <li className={styles.item} key={i}>
              <input
                type="text"
                value={item}
                placeholder={`${label}を入力する`}
                onChange={(e) => handleChangeItem(e, i)}
              />
              <div className={styles.btn_wrapper}>
                <Button
                  value={"削除"}
                  onClick={() => removeItem(i)}
                  design="secondary"
                />
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.btn_area}>
          <Button
            value={`${label}を追加する`}
            onClick={() => addItem()}
            design="primary"
          />
        </div>
      </div>
    </>
  );
};

export default SettingList;
