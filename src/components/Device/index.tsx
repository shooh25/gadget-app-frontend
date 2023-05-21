import React, { useEffect, useState } from "react";
import styles from "./style.scss";
import { createDisplayData } from "../../utils/helpers";
import { computerLabels } from "../../utils/datas";
import { gadgetType } from "../../types";

const Device: React.FC<{ data: gadgetType }> = (props) => {
  const [displayData, setDisplayData] = useState<any>(null);

  useEffect(() => {
    // labelsに基づいて表示するデータを作成
    setDisplayData(createDisplayData(computerLabels, props.data));
  }, []);

  if (displayData) {
    return (
      <>
        <ul>
          {Object.keys(displayData).map((key) =>
            displayData[key].text ? (
              <li key={key}>
                <p>{displayData[key].label}</p>
                <p>{displayData[key].text}</p>
              </li>
            ) : null
          )}
        </ul>
      </>
    );
  } else {
    return <></>;
  }
};

export default Device;
