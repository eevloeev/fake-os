import useWindowsState from "@/components/Desktop/state/useWindowsState"
import { WindowTab as WindowTabType } from "@/components/Desktop/types"
import TabIcon from "@/components/NavigationBar/components/WindowsBar/components/WindowTab/components/TabIcon/TabIcon"
import { classNames } from "@/utils/helpers"
import { useCallback } from "react"
import { useShallow } from "zustand/react/shallow"
import styles from "./WindowTab.module.css"

type Props = {
  tab: WindowTabType
}

function WindowTab(props: Props) {
  const { tab } = props

  const { focusedWindow, focusWindow, toggleMinimizeWindow } = useWindowsState(
    useShallow((state) => ({
      focusedWindow: state.focusedWindow,
      focusWindow: state.focusWindow,
      toggleMinimizeWindow: state.toggleMinimizeWindow,
    }))
  )

  const getHandleClick = useCallback(
    (tab: WindowTabType) => () => {
      if (focusedWindow === tab.windowId) {
        toggleMinimizeWindow(tab.windowId)
      } else {
        focusWindow(tab.windowId)
        if (tab.isMinimized) {
          toggleMinimizeWindow(tab.windowId)
        }
      }
    },
    [focusWindow, focusedWindow, toggleMinimizeWindow]
  )

  return (
    <div
      key={tab.windowId}
      id={"windows-bar__window-" + tab.windowId}
      className={classNames(
        styles.tab,
        focusedWindow === tab.windowId && !tab.isMinimized && styles.active
      )}
      onClick={getHandleClick(tab)}
    >
      <TabIcon icon={tab.icon} />
      <span className={styles.name}>{tab.programName}</span>
    </div>
  )
}

export default WindowTab
