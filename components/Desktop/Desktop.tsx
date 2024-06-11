"use client"

import RecycleBin from "@/assets/icons/48159-MC4yMTI0MjkwMCAxNzEzNzk4MTAw.png"
import MyComputerIcon from "@/assets/icons/48177-MC44ODE5MTQwMCAxNzEzNzk4MDk5.png"
import NetworkIcon from "@/assets/icons/48181-MC44MzIwMzAwMCAxNzEzNzk4MDk5.png"
import InternetExplorerIcon from "@/assets/icons/internet-explorer.png"
import DesktopIcon from "@/components/Desktop/components/DesktopIcon/DesktopIcon"
import DesktopSelection from "@/components/Desktop/components/DesktopSelection/DesktopSelection"
import useWindowsState from "@/components/Desktop/state/useWindowsState"
import FileExplorer from "@/programs/list/FileExplorer/program"
import InternetExplorer from "@/programs/list/InternetExplorer/program"
import { useMemo } from "react"
import styles from "./Desktop.module.css"
import type { DesktopIcon as DesktopIconType } from "./types"

export default function Desktop() {
  const { runningWindows, runWindow } = useWindowsState()

  const icons: DesktopIconType[] = useMemo(
    () => [
      {
        name: "My Computer",
        image: MyComputerIcon,
        onOpen: () => {
          runWindow(FileExplorer)
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
          runWindow(InternetExplorer)
        },
      },
    ],
    [runWindow]
  )

  return (
    <div id="desktop" className={styles.desktop}>
      {icons.map((icon, index) => (
        <DesktopIcon desktopIcon={icon} key={index} />
      ))}
      <DesktopSelection />
      {runningWindows.map((window) => (
        <window.component key={window.windowId} window={window} />
      ))}
    </div>
  )
}
