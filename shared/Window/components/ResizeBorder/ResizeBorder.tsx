import useWindowPlacement, {
  MIN_HEIGHT,
  MIN_WIDTH,
} from "@/shared/Window/hooks/useWindowPlacement"
import {
  disableIframePointerEvents,
  enableIframePointerEvents,
} from "@/utils/helpers"
import { CSSProperties, useCallback, useEffect, useState } from "react"
import styles from "./ResizeBorder.module.css"

export enum POSITION {
  TOP = "top",
  RIGHT = "right",
  BOTTOM = "bottom",
  LEFT = "left",
}

type Props = {
  position: POSITION
  windowPlacement: ReturnType<typeof useWindowPlacement>
}

function ResizeBorder(props: Props) {
  const { position, windowPlacement } = props

  const [isResizing, setIsResizing] = useState(false)

  let top: CSSProperties["top"] = undefined
  let right: CSSProperties["right"] = undefined
  let bottom: CSSProperties["bottom"] = undefined
  let left: CSSProperties["left"] = undefined
  let width: CSSProperties["width"] = undefined
  let height: CSSProperties["height"] = undefined

  switch (position) {
    case POSITION.TOP:
      top = -2
      left = 4
      width = "calc(100% - 8px)"
      height = 4
      break
    case POSITION.RIGHT:
      top = 4
      right = -2
      width = 4
      height = "calc(100% - 8px)"
      break
    case POSITION.BOTTOM:
      bottom = -2
      left = 4
      width = "calc(100% - 8px)"
      height = 4
      break
    case POSITION.LEFT:
      top = 4
      left = -2
      width = 4
      height = "calc(100% - 8px)"
      break
  }

  const handleMouseDown = useCallback(() => {
    setIsResizing(true)
    disableIframePointerEvents()
    document.body.style.cursor =
      position === POSITION.TOP || position === POSITION.BOTTOM
        ? "ns-resize"
        : "ew-resize"
  }, [setIsResizing, position])

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
        case POSITION.TOP:
          newHeight = windowPlacement.height + windowPlacement.top - clientY
          newTop = clientY

          if (newHeight < MIN_HEIGHT) {
            newHeight = MIN_HEIGHT
            newTop = windowPlacement.top + windowPlacement.height - MIN_HEIGHT
          }

          if (newTop < 0) {
            newHeight += newTop
            newTop = 0
          }
          break
        case POSITION.RIGHT:
          newWidth = clientX - windowPlacement.left

          if (newWidth < MIN_WIDTH) {
            newWidth = MIN_WIDTH
          }

          if (newWidth + windowPlacement.left > desktop.clientWidth) {
            newWidth = desktop.clientWidth - windowPlacement.left
          }
          break
        case POSITION.BOTTOM:
          newHeight = clientY - windowPlacement.top

          if (newHeight < MIN_HEIGHT) {
            newHeight = MIN_HEIGHT
          }

          if (newHeight + windowPlacement.top > desktop.clientHeight) {
            newHeight = desktop.clientHeight - windowPlacement.top
          }
          break
        case POSITION.LEFT:
          newWidth = windowPlacement.width + windowPlacement.left - clientX
          newLeft = clientX

          if (newWidth < MIN_WIDTH) {
            newWidth = MIN_WIDTH
            newLeft = windowPlacement.left + windowPlacement.width - MIN_WIDTH
          }

          if (newLeft < 0) {
            newWidth += newLeft
            newLeft = 0
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
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  return (
    <div
      className={styles.border}
      style={{
        top,
        right,
        bottom,
        left,
        width,
        height,
        cursor:
          position === POSITION.TOP || position === POSITION.BOTTOM
            ? "ns-resize"
            : "ew-resize",
      }}
      onMouseDown={handleMouseDown}
    />
  )
}

export default ResizeBorder
