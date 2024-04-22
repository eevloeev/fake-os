import { StaticImageData } from "next/image"

export type DesktopIcon = {
  name: string
  image: StaticImageData
  onOpen: () => void
}
