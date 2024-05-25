"use client"

import useDesktopSelectionState from "@/components/Desktop/state/useDesktopSelectionState"
import { useEffect } from "react"

export default function DesktopSelection() {
  const {
    isSelecting,
    startX,
    startY,
    endX,
    endY,
    onMouseDown,
    onMouseUp,
    onMouseMove,
  } = useDesktopSelectionState()

  useEffect(() => {
    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mouseup", onMouseUp)
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("contextmenu", onMouseUp)

    return () => {
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("contextmenu", onMouseUp)
    }
  }, [onMouseDown, onMouseMove, onMouseUp])

  return (
    <div
      id="desktop-selection"
      style={{
        display: isSelecting ? "block" : "none",
        boxSizing: "content-box",
        pointerEvents: "none",
        position: "absolute",
        border: "1px solid rgba(0, 0, 255, 0.5)",
        backgroundColor: "rgba(0, 0, 255, 0.1)",
        left: Math.min(startX, endX),
        top: Math.min(startY, endY),
        width: Math.abs(startX - endX),
        height: Math.abs(startY - endY),
      }}
    />
  )
}
