"use client"

import Datetime from "@/components/NavigationBar/components/Datetime/Datetime"
import NetworkStatus from "@/components/NavigationBar/components/NetworkStatus/NetworkStatus"
import StartMenu from "@/components/NavigationBar/components/StartMenu/StartMenu"
import WindowsBar from "@/components/NavigationBar/components/WindowsBar/WindowsBar"
import styles from "./NavigationBar.module.css"

export default function NavigationBar() {
  return (
    <div className={styles.navigationBar}>
      <StartMenu />
      <WindowsBar />
      <div className={styles.icons}>
        <NetworkStatus />
      </div>
      <Datetime />
    </div>
  )
}
