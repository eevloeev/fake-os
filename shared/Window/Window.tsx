import CloseIcon from "@/assets/icons/close.png"
import MaximizeIcon from "@/assets/icons/maximize.png"
import MinimizeIcon from "@/assets/icons/minimize.png"
import useWindowsState from "@/components/Desktop/state/useWindowsState"
import { WindowType } from "@/components/Desktop/types"
import { useProgramIcon } from "@/programs/hooks/useHelpers"
import { Program } from "@/programs/types"
import Button from "@/shared/Button/Button"
import DragBar from "@/shared/Window/components/DragBar/DragBar"
import ResizeBorder, {
  POSITION as borderPositions,
} from "@/shared/Window/components/ResizeBorder/ResizeBorder"
import ResizeCorner, {
  POSITION as cornerPositions,
} from "@/shared/Window/components/ResizeCorner/ResizeCorner"
import useWindowPlacement from "@/shared/Window/hooks/useWindowPlacement"
import { classNames } from "@/utils/helpers"
import Image from "next/image"
import { useCallback } from "react"
import styles from "./Window.module.css"

export type MenuItem = {
  label: string
  onClick?: () => void
  submenu?: MenuItem[]
}

type Props = {
  children: React.ReactNode
  window: WindowType
  program: Program
  menu?: MenuItem[]
}

function Window(props: Props) {
  const { children, program, window, menu } = props

  const placement = useWindowPlacement(window)
  const { focusedWindow, closeWindow, focusWindow, toggleMinimizeWindow } =
    useWindowsState()
  const icon = useProgramIcon(program)

  const handleClose = useCallback(() => {
    closeWindow(window.windowId)
  }, [closeWindow, window.windowId])

  const handleMinimize = useCallback(() => {
    toggleMinimizeWindow(window.windowId)
  }, [toggleMinimizeWindow, window.windowId])

  const handleMaximize = useCallback(() => {
    placement.maximize()
  }, [placement])

  return (
    <div
      id={"window-" + window.windowId}
      style={{
        display: placement.display,
        position: placement.position,
        top: placement.top,
        left: placement.left,
        width: placement.width,
        height: placement.height,
        transition: placement.transition,
        transform: placement.transform,
        transformOrigin: placement.transformOrigin,
        zIndex: window.zIndex,
      }}
      onFocus={() => focusWindow(window.windowId)}
      onMouseDown={() => focusWindow(window.windowId)}
    >
      <div
        className={classNames(
          styles.container,
          focusedWindow?.windowId === window.windowId && styles.focused
        )}
      >
        <div className={styles.titleBar}>
          <DragBar windowPlacement={placement} />
          {icon && <Image src={icon.src} width={16} height={16} alt="" />}
          <div className={styles.title}>{program.name}</div>
          <div className={styles.titleButtons}>
            <Button onClick={handleMinimize} className={styles.titleButton}>
              <Image
                className={styles.titleButtonIcon}
                src={MinimizeIcon.src}
                width={12}
                height={12}
                alt="Minimize"
              />
            </Button>
            <Button onClick={handleMaximize} className={styles.titleButton}>
              <Image
                className={styles.titleButtonIcon}
                src={MaximizeIcon.src}
                width={12}
                height={12}
                alt="Maximize"
              />
            </Button>
            <Button onClick={handleClose} className={styles.titleButton}>
              <Image
                className={styles.titleButtonIcon}
                src={CloseIcon.src}
                width={12}
                height={12}
                alt="Close"
              />
            </Button>
          </div>
        </div>
        {menu && (
          <div className={styles.menu}>
            {menu.map((item, index) => (
              <div key={index} className={styles.menuItem}>
                {item.label}
              </div>
            ))}
          </div>
        )}
        <div className={styles.windowContent}>{children}</div>
      </div>
      {Object.values(cornerPositions).map((position) => (
        <ResizeCorner
          key={position}
          position={position}
          windowPlacement={placement}
        />
      ))}
      {Object.values(borderPositions).map((position) => (
        <ResizeBorder
          key={position}
          position={position}
          windowPlacement={placement}
        />
      ))}
    </div>
  )
}

export default Window
