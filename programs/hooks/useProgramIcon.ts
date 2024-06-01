import { Program } from "@/programs/types"
import { StaticImageData } from "next/image"
import { useEffect, useState } from "react"

export default function useProgramIcon(program: Program) {
  const [icon, setIcon] = useState<StaticImageData>()

  useEffect(() => {
    async function fetchIcon() {
      const icon = await program.getIcon()
      setIcon(icon.default)
    }

    fetchIcon()
  }, [program, setIcon])

  return icon
}
