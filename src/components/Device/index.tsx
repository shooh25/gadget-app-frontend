import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { createDisplayData } from "../../utils/helpers";
import { computerLabels } from "../../utils/datas";

type Props = {
  [key: string]: any
}

const Device: React.FC<{ data: Props }> = (props) => {
  const [displayData, setDisplayData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true); // ユーザー情報を読み込む間ロード

  useEffect(() => {
    // labelsに基づいて表示するデータを作成
    setDisplayData(createDisplayData(computerLabels, props.data, true));
    setIsLoading(false);
  }, []);

  console.log(displayData)

  if (isLoading) {
    return (
      <div className={styles.root}>
        <div className={styles.inner}>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.root}>
        {displayData ? (
          <ul>
            {Object.keys(displayData).map((key) =>
              displayData[key] && displayData[key].text ? (
                <li className={styles.item} key={key} >
                  <p className={styles.label}>{displayData[key].label}</p>
                  <p className={styles.text}>{displayData[key].text}</p>
                </li>
              ) : null
            )}
          </ul>
        ) : (
          <div className={styles.inner}>
            <p className={styles.message}>
              デバイスが登録されていません
            </p>
          </div>
        )}
      </div>

    );
  }
};

export default Device;
