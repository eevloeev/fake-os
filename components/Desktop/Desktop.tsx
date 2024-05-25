"use client"

import RecycleBin from "@/assets/icons/48159-MC4yMTI0MjkwMCAxNzEzNzk4MTAw.png"
import MyComputerIcon from "@/assets/icons/48177-MC44ODE5MTQwMCAxNzEzNzk4MDk5.png"
import NetworkIcon from "@/assets/icons/48181-MC44MzIwMzAwMCAxNzEzNzk4MDk5.png"
import InternetExplorerIcon from "@/assets/icons/internet-explorer.png"
import DesktopIcon from "@/components/Desktop/components/DesktopIcon/DesktopIcon"
import DesktopSelection from "@/components/Desktop/components/DesktopSelection/DesktopSelection"
import InternetExplorer from "@/programs/InternetExplorer/InternetExplorer"
import styles from "./Desktop.module.css"
import type { DesktopIcon as DesktopIconType } from "./types"

const icons: DesktopIconType[] = [
  {
    name: "My Computer",
    image: MyComputerIcon,
    onOpen: () => {
      console.log("Open My Computer")
    },
  },
  {
    name: "Recycle Bin",
    image: RecycleBin,
    onOpen: () => {
      console.log("Open Recycle Bin")
    },
  },
  {
    name: "Network",
    image: NetworkIcon,
    onOpen: () => {
      console.log("Open Network")
    },
  },
  {
    name: "Internet Explorer",
    image: InternetExplorerIcon,
    onOpen: () => {
      console.log("Open Internet Explorer")
    },
  },
]

export default function Desktop() {
  return (
    <div id="desktop" className={styles.desktop}>
      {icons.map((icon, index) => (
        <DesktopIcon desktopIcon={icon} key={index} />
      ))}
      <DesktopSelection />
      <InternetExplorer />
    </div>
  )
}
