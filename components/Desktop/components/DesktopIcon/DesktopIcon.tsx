"use client"

import useDesktopSelectionState from "@/components/Desktop/state/useDesktopSelectionState"
import { classNames } from "@/utils/helpers"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useShallow } from "zustand/react/shallow"
import type { DesktopIcon as DesktopIconType } from "../../types"
import styles from "./DesktopIcon.module.css"

type Props = {
  desktopIcon: DesktopIconType
}

function checkIntersection(rect1: DOMRect, rect2: DOMRect) {
  return (
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top &&
    rect1.left < rect2.right &&
    rect1.right > rect2.left
  )
}

export default function DesktopIcon(props: Props) {
  const { desktopIcon } = props

  const { addSelectionListener, removeSelectionListener } =
    useDesktopSelectionState(
      useShallow((state) => ({
        addSelectionListener: state.addSelectionListener,
        removeSelectionListener: state.removeSelectionListener,
      }))
    )
  const iconRef = useRef<HTMLDivElement>(null)
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    const handleSelection = () => {
      const selectionRef = document.getElementById("desktop-selection")

      if (!iconRef.current || !selectionRef) {
        return
      }

      setIsSelected(
        checkIntersection(
          iconRef.current.getBoundingClientRect(),
          selectionRef.getBoundingClientRect()
        )
      )
    }

    addSelectionListener(handleSelection)

    return () => {
      removeSelectionListener(handleSelection)
    }
  }, [addSelectionListener, removeSelectionListener])

  return (
    <div
      ref={iconRef}
      onClick={() => {
        setIsSelected(true)
      }}
      className={classNames([styles.icon, isSelected && styles.selected])}
    >
      <Image
        src={desktopIcon.image}
        alt={desktopIcon.name}
        width={32}
        height={32}
        style={{ pointerEvents: "none" }}
        priority
      />
      <div className={styles.name}>{desktopIcon.name}</div>
    </div>
  )
}
