import { Program, ProgramComponent } from "@/programs/types"
import { StaticImageData } from "next/image"
import { useEffect, useState } from "react"

export function useProgramIcon(program: Program) {
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

export function useProgramComponent(program: Program) {
  const [component, setComponent] = useState<ProgramComponent>()

  useEffect(() => {
    async function fetchComponent() {
      const component = await program.getComponent()
      setComponent(component.default)
    }

    fetchComponent()
  }, [program, setComponent])

  return component
}
