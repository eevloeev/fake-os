import { WindowTab } from "@/components/Desktop/types"
import Image from "next/image"
import { memo } from "react"

type Props = {
  icon: WindowTab["icon"]
}

function TabIcon(props: Props) {
  const { icon } = props

  return <Image src={icon} width={16} height={16} alt="" />
}

export default memo(TabIcon)
