import { Program, ProgramComponent } from "@/programs/types"
import { useEffect, useState } from "react"

export default function useProgramComponent(program: Program) {
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
