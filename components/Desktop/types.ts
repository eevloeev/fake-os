import { Program } from "@/programs/types"
import { StaticImageData } from "next/image"
import { ComponentType } from "react"

export type WindowType = {
  windowId: string
  zIndex: number
  icon: StaticImageData
  component: ComponentType<{ window: WindowType }>
} & Pick<Program, "id" | "name">

export type DesktopIcon = {
  name: string
  image: StaticImageData
  onOpen: () => void
}
