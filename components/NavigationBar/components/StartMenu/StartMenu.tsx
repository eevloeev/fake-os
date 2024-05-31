"use client"

import StartIcon from "@/assets/icons/48148-MC40MjcxOTUwMCAxNzEzNzk4MTAw.png"
import DocumentsIcon from "@/assets/icons/documents.png"
import FindIcon from "@/assets/icons/find.png"
import HelpIcon from "@/assets/icons/help.png"
import ProgramsIcon from "@/assets/icons/programs.png"
import RunIcon from "@/assets/icons/run.png"
import SettingsIcon from "@/assets/icons/settings.png"
import ShutdownIcon from "@/assets/icons/shutdown.png"
import SuspendIcon from "@/assets/icons/suspend.png"
import StartMenuItem from "@/components/NavigationBar/components/StartMenu/components/StartMenuItem/StartMenuItem"
import { StartMenuItem as StartMenuItemType } from "@/components/NavigationBar/types"
import { classNames } from "@/utils/helpers"
import Image from "next/image"
import { Fragment, useEffect, useState } from "react"
import styles from "./StartMenu.module.css"

const StartMenuItems: (StartMenuItemType | { divider: true })[] = [
  {
    name: "Programs",
    image: ProgramsIcon,
    onOpen: () => {},
  },
  {
    name: "Documents",
    image: DocumentsIcon,
    onOpen: () => {},
  },
  {
    name: "Settings",
    image: SettingsIcon,
    onOpen: () => {},
  },
  {
    name: "Find",
    image: FindIcon,
    onOpen: () => {},
  },
  {
    name: "Help",
    image: HelpIcon,
    onOpen: () => {},
  },
  {
    name: "Run...",
    image: RunIcon,
    onOpen: () => {},
  },
  { divider: true },
  {
    name: "Suspend",
    image: SuspendIcon,
    onOpen: () => {},
  },
  {
    name: "Shut Down...",
    image: ShutdownIcon,
    onOpen: () => {},
  },
]

function StartMenu() {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)

  const toggleStartMenu = () => {
    setIsStartMenuOpen((prev) => !prev)
  }

  useEffect(() => {
    const outsideClickListener = (event: MouseEvent) => {
      if (isStartMenuOpen) {
        if (!(event.target as HTMLElement).closest(`.${styles.start}`)) {
          setIsStartMenuOpen(false)
        }
      }
    }

    document.addEventListener("click", outsideClickListener)

    return () => {
      document.removeEventListener("click", outsideClickListener)
    }
  }, [isStartMenuOpen, setIsStartMenuOpen])

  return (
    <div
      className={classNames(styles.start, isStartMenuOpen && styles.active)}
      onClick={toggleStartMenu}
    >
      <div
        style={{
          display: isStartMenuOpen ? "flex" : "none",
        }}
        className={styles.menuContainer}
      >
        <div className={styles.logo}>FakeOS</div>
        <div className={styles.menu}>
          {StartMenuItems.map((item, index) => (
            <Fragment key={index}>
              {"divider" in item ? (
                <hr className={styles.divider} />
              ) : (
                <StartMenuItem item={item} />
              )}
            </Fragment>
          ))}
        </div>
      </div>
      <Image src={StartIcon} alt="Start" width={24} height={24} />
      <span>Start</span>
    </div>
  )
}

export default StartMenu
