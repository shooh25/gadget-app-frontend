import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { createDisplayData } from "../../utils/helpers";
import { computerLabels } from "../../utils/datas";

type propsType = {
  data: string[];
  heading: string;
};

const Card: React.FC<propsType> = (props) => {
  const [displayData, setDisplayData] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true); // ユーザー情報を読み込む間ロード

  useEffect(() => {
    setDisplayData(props.data);
    setIsLoading(false);
  }, []);

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
        {displayData.length ? (
          <div>
            <h3 className={styles.heading}>{props.heading}</h3>
            <ul>
              {displayData.map((item) => (
                <li className={styles.item}>
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className={styles.inner}>
            <p className={styles.message}>
              {props.heading}が登録されていません
            </p>
          </div>
        )}
      </div>
    );
  }
};

export default Card;
