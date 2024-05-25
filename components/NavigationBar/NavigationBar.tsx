"use client"

import Datetime from "@/components/NavigationBar/components/Datetime/Datetime"
import StartMenu from "@/components/NavigationBar/components/StartMenu/StartMenu"
import styles from "./NavigationBar.module.css"

export default function NavigationBar() {
  return (
    <div className={styles.navigationBar}>
      <StartMenu />
      <Datetime />
    </div>
  )
}
