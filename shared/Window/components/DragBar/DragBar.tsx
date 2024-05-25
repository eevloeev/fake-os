import useWindowPlacement from "@/shared/Window/hooks/useWindowPlacement"
import { useCallback, useEffect } from "react"
import styles from "./DragBar.module.css"

type Props = {
  windowPlacement: ReturnType<typeof useWindowPlacement>
}

function DragBar(props: Props) {
  const { windowPlacement } = props

  const handleMouseDown = useCallback(() => {
    windowPlacement.setIsDragging(true)
    document.body.style.cursor = "move"
  }, [windowPlacement])

  const handleMouseUp = useCallback(() => {
    windowPlacement.setIsDragging(false)
    document.body.style.pointerEvents = ""
    document.body.style.cursor = ""
  }, [windowPlacement])

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!windowPlacement.isDragging) {
        return
      }

      document.body.style.pointerEvents = "none"

      const { movementX, movementY } = event

      const desktop = document.getElementById("desktop") as HTMLElement

      let newTop = windowPlacement.top + movementY
      let newLeft = windowPlacement.left + movementX

      if (newTop < 0) {
        newTop = 0
      }

      if (newTop + windowPlacement.height > desktop.clientHeight) {
        newTop = desktop.clientHeight - windowPlacement.height
      }

      if (newLeft < 0) {
        newLeft = 0
      }

      if (newLeft + windowPlacement.width > desktop.clientWidth) {
        newLeft = desktop.clientWidth - windowPlacement.width
      }

      windowPlacement.setTop(newTop)
      windowPlacement.setLeft(newLeft)
    },
    [windowPlacement]
  )

  const handleDoubleClick = useCallback(() => {
    windowPlacement.maximize()
  }, [windowPlacement])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  return (
    <div
      className={styles.bar}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    />
  )
}

export default DragBar
