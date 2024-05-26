"use client"

import OfflineIcon from "@/assets/icons/offline.png"
import OnlineIcon from "@/assets/icons/online.png"
import Tooltip, { POSITION } from "@/shared/Tooltip/Tooltip"
import Image from "next/image"
import { useEffect, useState } from "react"

function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {
    setIsOnline(navigator.onLine)

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return (
    <Tooltip
      position={POSITION.TOP_LEFT}
      text={isOnline ? "The internet is online" : "The internet is offline"}
    >
      <Image
        src={isOnline ? OnlineIcon : OfflineIcon}
        alt={isOnline ? "The internet is online" : "The internet is offline"}
        width={20}
        height={20}
      />
    </Tooltip>
  )
}

export default NetworkStatus
