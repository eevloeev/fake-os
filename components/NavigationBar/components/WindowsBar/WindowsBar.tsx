import useWindowsState from "@/components/Desktop/state/useWindowsState"
import { WindowType } from "@/components/Desktop/types"
import { classNames } from "@/utils/helpers"
import Image from "next/image"
import { useCallback } from "react"
import styles from "./WindowsBar.module.css"

function WindowsBar() {
  const { runningWindows, focusedWindow, focusWindow, toggleMinimizeWindow } =
    useWindowsState()

  const getHandleClick = useCallback(
    (window: WindowType) => () => {
      if (focusedWindow?.windowId === window.windowId) {
        toggleMinimizeWindow(window.windowId)
      } else {
        focusWindow(window.windowId)
        if (window.isMinimized) {
          toggleMinimizeWindow(window.windowId)
        }
      }
    },
    [focusWindow, focusedWindow?.windowId, toggleMinimizeWindow]
  )

  return (
    <div className={styles.container}>
      {runningWindows.map((window) => (
        <div
          key={window.windowId}
          id={"windows-bar__window-" + window.windowId}
          className={classNames(
            styles.tab,
            focusedWindow?.windowId === window.windowId &&
              !window.isMinimized &&
              styles.active
          )}
          onClick={getHandleClick(window)}
        >
          <Image src={window.icon} width={16} height={16} alt="" />
          <span className={styles.name}>{window.programName}</span>
        </div>
      ))}
    </div>
  )
}

export default WindowsBar
