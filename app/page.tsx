"use client"

import BootLoader from "@/components/BootLoader/BootLoader"
import Desktop from "@/components/Desktop/Desktop"
import NavigationBar from "@/components/NavigationBar/NavigationBar"

export default function Home() {
  return (
    <>
      <BootLoader />
      <Desktop />
      <NavigationBar />
    </>
  )
}
