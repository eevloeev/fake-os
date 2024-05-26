"use client"

import Tooltip, { POSITION } from "@/shared/Tooltip/Tooltip"
import { useEffect, useState } from "react"
import styles from "./Datetime.module.css"

export default function Datetime() {
  const [dateTime, setDateTime] = useState<Date>()

  useEffect(() => {
    setDateTime(new Date())

    const interval = setInterval(() => {
      setDateTime(new Date())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <Tooltip text={dateTime?.toLocaleDateString()} position={POSITION.TOP_LEFT}>
      <div className={styles.time}>
        {dateTime?.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }) ?? "00:00"}
      </div>
    </Tooltip>
  )
}
