import { StaticImageData } from "next/image"

export type MenuIcon = {
  name: string
  image: StaticImageData
  onOpen: () => void
}
