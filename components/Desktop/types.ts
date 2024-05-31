import { Program } from "@/programs/types"
import { StaticImageData } from "next/image"
import { ComponentType } from "react"

export type WindowType = {
  windowId: string
  zIndex: number
  isMinimized: boolean
  icon: StaticImageData
  component: ComponentType<{ window: WindowType }>
  programId: Program["id"]
  programName: Program["name"]
}

export type DesktopIcon = {
  name: string
  image: StaticImageData
  onOpen: () => void
}
