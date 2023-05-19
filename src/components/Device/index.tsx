import React, { useEffect, useState } from "react";
import styles from "./style.scss";

const Device: React.FC<{ data: object }> = (props) => {
  const [displayData, setDisplayData] = useState<string[][]>([]);

  const labels = {
    cpu_name: "CPU",
    gpu_name: "GPU",
  };

  useEffect(() => {
    for (const [key, value] of Object.entries(props.data)) {
      if (key in labels && value) {
        const label = labels[key as keyof typeof labels];
        setDisplayData([...displayData, [label, value]]);
      }
    }
  }, []);

  if (displayData.length) {
    return (
      <>
        <ul>
          {displayData.map(([label, value], i) => (
            <li key={i}>
              <p>{label}</p>
              <p>{value}</p>
            </li>
          ))}
        </ul>
      </>
    );
  } else {
    return <></>;
  }
};

export default Device;
