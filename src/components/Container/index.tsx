import React, { ReactNode, FC, ReactElement } from 'react'
import styles from "./style.module.scss";

type Props = {
  children: ReactNode
}

const Container: React.FC<Props> = ({children}) => {
  return (
    <div className={styles.root}>{children}</div>
  )
}

export default Container