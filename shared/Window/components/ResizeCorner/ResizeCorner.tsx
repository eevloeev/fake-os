import useWindowPlacement, {
  MIN_HEIGHT,
  MIN_WIDTH,
} from "@/shared/Window/hooks/useWindowPlacement"
import {
  disableIframePointerEvents,
  enableIframePointerEvents,
} from "@/utils/helpers"
import { useCallback, useEffect, useState } from "react"
import styles from "./ResizeCorner.module.css"

export enum POSITION {
  TOP_LEFT = "top-left",
  TOP_RIGHT = "top-right",
  BOTTOM_LEFT = "bottom-left",
  BOTTOM_RIGHT = "bottom-right",
}

type Props = {
  position: POSITION
  windowPlacement: ReturnType<typeof useWindowPlacement>
}

function ResizeCorner(props: Props) {
  const { position, windowPlacement } = props

  const [isResizing, setIsResizing] = useState(false)

  const handleMouseDown = useCallback(() => {
    setIsResizing(true)
    disableIframePointerEvents()
    document.body.style.cursor =
      position === POSITION.TOP_LEFT || position === POSITION.BOTTOM_RIGHT
        ? "nwse-resize"
        : "nesw-resize"
  }, [position, setIsResizing])

  const handleMouseUp = useCallback(() => {
    setIsResizing(false)
    enableIframePointerEvents()
    document.body.style.cursor = ""
  }, [setIsResizing])

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isResizing) {
        return
      }

      const { clientX, clientY } = event

      const desktop = document.getElementById("desktop") as HTMLElement

      let newWidth = windowPlacement.width
      let newHeight = windowPlacement.height
      let newTop = windowPlacement.top
      let newLeft = windowPlacement.left

      switch (position) {
        case POSITION.TOP_LEFT:
          newWidth = windowPlacement.width + windowPlacement.left - clientX
          newHeight = windowPlacement.height + windowPlacement.top - clientY
          newTop = clientY
          newLeft = clientX

          if (newWidth < MIN_WIDTH) {
            newWidth = MIN_WIDTH
            newLeft = windowPlacement.left + windowPlacement.width - MIN_WIDTH
          }

          if (newHeight < MIN_HEIGHT) {
            newHeight = MIN_HEIGHT
            newTop = windowPlacement.top + windowPlacement.height - MIN_HEIGHT
          }

          if (newTop < 0) {
            newHeight += newTop
            newTop = 0
          }

          if (newLeft < 0) {
            newWidth += newLeft
            newLeft = 0
          }
          break
        case POSITION.TOP_RIGHT:
          newWidth = clientX - windowPlacement.left
          newHeight = windowPlacement.height + windowPlacement.top - clientY
          newTop = clientY

          if (newWidth < MIN_WIDTH) {
            newWidth = MIN_WIDTH
          }

          if (newHeight < MIN_HEIGHT) {
            newHeight = MIN_HEIGHT
            newTop = windowPlacement.top + windowPlacement.height - MIN_HEIGHT
          }

          if (newTop < 0) {
            newHeight += newTop
            newTop = 0
          }

          if (newWidth + windowPlacement.left > desktop.clientWidth) {
            newWidth = desktop.clientWidth - windowPlacement.left
          }
          break
        case POSITION.BOTTOM_LEFT:
          newWidth = windowPlacement.width + windowPlacement.left - clientX
          newHeight = clientY - windowPlacement.top
          newLeft = clientX

          if (newWidth < MIN_WIDTH) {
            newWidth = MIN_WIDTH
            newLeft = windowPlacement.left + windowPlacement.width - MIN_WIDTH
          }

          if (newHeight < MIN_HEIGHT) {
            newHeight = MIN_HEIGHT
          }

          if (newLeft < 0) {
            newWidth += newLeft
            newLeft = 0
          }

          if (newHeight + windowPlacement.top > desktop.clientHeight) {
            newHeight = desktop.clientHeight - windowPlacement.top
          }
          break
        case POSITION.BOTTOM_RIGHT:
          newWidth = clientX - windowPlacement.left
          newHeight = clientY - windowPlacement.top

          if (newWidth < MIN_WIDTH) {
            newWidth = MIN_WIDTH
          }

          if (newHeight < MIN_HEIGHT) {
            newHeight = MIN_HEIGHT
          }

          if (newWidth + windowPlacement.left > desktop.clientWidth) {
            newWidth = desktop.clientWidth - windowPlacement.left
          }

          if (newHeight + windowPlacement.top > desktop.clientHeight) {
            newHeight = desktop.clientHeight - windowPlacement.top
          }
          break
      }

      windowPlacement.setWidth(newWidth)
      windowPlacement.setHeight(newHeight)
      windowPlacement.setTop(newTop)
      windowPlacement.setLeft(newLeft)
    },
    [isResizing, position, windowPlacement]
  )

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
      className={styles.corner}
      onMouseDown={handleMouseDown}
      style={{
        top: position.startsWith("top") ? 0 : undefined,
        left: position.endsWith("left") ? 0 : undefined,
        right: position.endsWith("right") ? 0 : undefined,
        bottom: position.startsWith("bottom") ? 0 : undefined,
        cursor:
          position === POSITION.TOP_LEFT || position === POSITION.BOTTOM_RIGHT
            ? "nwse-resize"
            : "nesw-resize",
        transform: `translate(${position.endsWith("right") ? "50%" : "-50%"}, ${
          position.startsWith("bottom") ? "50%" : "-50%"
        })`,
      }}
    />
  )
}

export default ResizeCorner
