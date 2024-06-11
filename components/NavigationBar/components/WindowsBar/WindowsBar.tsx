import useWindowsState from "@/components/Desktop/state/useWindowsState"
import WindowTab from "@/components/NavigationBar/components/WindowsBar/components/WindowTab/WindowTab"
import { memo } from "react"
import { useShallow } from "zustand/react/shallow"
import styles from "./WindowsBar.module.css"

function WindowsBar() {
  const windowTabs = useWindowsState(useShallow((state) => state.windowTabs))

  return (
    <div className={styles.container}>
      {windowTabs.map((tab) => (
        <WindowTab key={tab.windowId} tab={tab} />
      ))}
    </div>
  )
}

export default memo(WindowsBar)
