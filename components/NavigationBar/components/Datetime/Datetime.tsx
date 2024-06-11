"use client"

import Tooltip, { POSITION } from "@/shared/Tooltip/Tooltip"
import { memo, useEffect, useState } from "react"
import styles from "./Datetime.module.css"

function getTime(date: Date) {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })
}

function getDate(date: Date) {
  return date.toLocaleDateString()
}

function Datetime() {
  const [time, setTime] = useState<string>()
  const [date, setDate] = useState<string>()

  useEffect(() => {
    const newDate = new Date()
    setTime(getTime(newDate))
    setDate(getDate(newDate))

    const interval = setInterval(() => {
      const newDate = new Date()
      const newTime = getTime(newDate)
      const newDateTime = getDate(newDate)

      if (newTime !== time) {
        setTime(newTime)
      }
      if (newDateTime !== date) {
        setDate(newDateTime)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [date, time])

  return (
    <Tooltip text={date} position={POSITION.TOP_LEFT}>
      <div className={styles.time}>{time ?? "00:00"}</div>
    </Tooltip>
  )
}

export default memo(Datetime)
