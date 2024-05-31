import { WindowType } from "@/components/Desktop/types"
import { StaticImageData } from "next/image"
import { ComponentType } from "react"

export type Program = {
  id: string
  name: string
  getIcon: () => Promise<{ default: StaticImageData }>
  getComponent: () => Promise<{
    default: ComponentType<{ window: WindowType }>
  }>
}
