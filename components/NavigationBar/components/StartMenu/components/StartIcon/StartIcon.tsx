import Icon from "@/assets/icons/48148-MC40MjcxOTUwMCAxNzEzNzk4MTAw.png"
import Image from "next/image"
import { memo } from "react"

function StartIcon() {
  return <Image src={Icon} alt="Start" width={24} height={24} />
}

export default memo(StartIcon)
