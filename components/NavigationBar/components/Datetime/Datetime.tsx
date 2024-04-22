"use client"

import { useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import styles from "./Datetime.module.css"

export default function Datetime() {
  const [dateTime, setDateTime] = useState<Date>()
  const [isDateShown, setIsDateShown] = useState(false)

  const showDate = useDebouncedCallback(() => {
    setIsDateShown(true)
  }, 500)

  const hideDate = () => {
    showDate.cancel()
    setIsDateShown(false)
  }

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
    <div className={styles.time} onMouseOver={showDate} onMouseOut={hideDate}>
      {isDateShown && (
        <div className={styles.date}>{dateTime?.toLocaleDateString()}</div>
      )}
      {dateTime?.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }) ?? "00:00"}
    </div>
  )
}
