"use client"

import { memo } from "react"
import styles from "./BootLoader.module.css"

const NAME = "FakeOS"

function BootLoader() {
  return (
    <div className={styles.container}>
      {NAME.split("").map((char, index) => (
        <span key={index} className={styles.char}>
          {char}
        </span>
      ))}
    </div>
  )
}

export default memo(BootLoader)
