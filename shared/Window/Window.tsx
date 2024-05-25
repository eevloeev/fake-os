import CloseIcon from "@/assets/icons/close.png"
import MaximizeIcon from "@/assets/icons/maximize.png"
import MinimizeIcon from "@/assets/icons/minimize.png"
import Button from "@/shared/Button/Button"
import DragBar from "@/shared/Window/components/DragBar/DragBar"
import ResizeBorder, {
  POSITION as borderPositions,
} from "@/shared/Window/components/ResizeBorder/ResizeBorder"
import ResizeCorner, {
  POSITION as cornerPositions,
} from "@/shared/Window/components/ResizeCorner/ResizeCorner"
import useWindowPlacement from "@/shared/Window/hooks/useWindowPlacement"
import Image, { StaticImageData } from "next/image"
import { useCallback } from "react"
import styles from "./Window.module.css"

export type MenuItem = {
  label: string
  onClick?: () => void
  submenu?: MenuItem[]
}

type Props = {
  children: React.ReactNode
  titleIcon?: StaticImageData
  title?: string
  onClose?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
  menu?: MenuItem[]
}

function Window(props: Props) {
  const { children, titleIcon, title, onClose, onMinimize, onMaximize, menu } =
    props

  const placement = useWindowPlacement()

  const handleClose = useCallback(() => {
    onClose?.()
  }, [onClose])

  const handleMinimize = useCallback(() => {
    onMinimize?.()
  }, [onMinimize])

  const handleMaximize = useCallback(() => {
    onMaximize?.()
    placement.maximize()
  }, [onMaximize, placement])

  return (
    <div
      style={{
        position: "absolute",
        top: placement.top,
        left: placement.left,
        width: placement.width,
        height: placement.height,
        transition: placement.transition,
      }}
    >
      <div className={styles.container}>
        <div className={styles.titleBar}>
          <DragBar windowPlacement={placement} />
          {titleIcon && (
            <Image src={titleIcon.src} width={16} height={16} alt="" />
          )}
          <div className={styles.title}>{title}</div>
          <div className={styles.titleButtons}>
            <Button onClick={handleMinimize}>
              <Image
                style={{ display: "block" }}
                src={MinimizeIcon.src}
                width={12}
                height={12}
                alt="Minimize"
              />
            </Button>
            <Button onClick={handleMaximize}>
              <Image
                style={{ display: "block" }}
                src={MaximizeIcon.src}
                width={12}
                height={12}
                alt="Maximize"
              />
            </Button>
            <Button onClick={handleClose}>
              <Image
                style={{ display: "block" }}
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
