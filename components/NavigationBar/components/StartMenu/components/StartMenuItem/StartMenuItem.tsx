"use client"

import { StartMenuItem as StartMenuItemType } from "@/components/NavigationBar/types"
import Image from "next/image"
import styles from "./StartMenuItem.module.css"

type Props = {
  item: StartMenuItemType
}

function StartMenuItem(props: Props) {
  const { item } = props

  return (
    <div className={styles.menuItem} onClick={item.onOpen}>
      <Image src={item.image} alt={item.name} width={32} height={32} priority />
      <span>{item.name}</span>
    </div>
  )
}

export default StartMenuItem
