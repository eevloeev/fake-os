"use client"

import { MenuIcon as MenuIconType } from "@/components/NavigationBar/types"
import Image from "next/image"
import styles from "./MenuIcon.module.css"

type Props = {
  icon: MenuIconType
}

function MenuIcon(props: Props) {
  const { icon } = props

  return (
    <div className={styles.menuItem} onClick={icon.onOpen}>
      <Image src={icon.image} alt={icon.name} width={32} height={32} />
      <span>{icon.name}</span>
    </div>
  )
}

export default MenuIcon
