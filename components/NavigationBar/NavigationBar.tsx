"use client"

import StartIcon from "@/assets/icons/48148-MC40MjcxOTUwMCAxNzEzNzk4MTAw.png"
import Datetime from "@/components/NavigationBar/components/Datetime/Datetime"
import Image from "next/image"
import styles from "./NavigationBar.module.css"

export default function NavigationBar() {
  return (
    <div className={styles.navigationBar}>
      <div className={styles.start}>
        <Image src={StartIcon} alt="Start" width={24} height={24} />
        <div>Start</div>
      </div>
      <Datetime />
    </div>
  )
}
