import { StaticImageData } from "next/image"

export type StartMenuItem = {
  name: string
  image: StaticImageData
  onOpen: () => void
}
