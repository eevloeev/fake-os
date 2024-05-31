import { WindowType } from "@/components/Desktop/types"
import { Program } from "@/programs/types"
import { create } from "zustand"

type WindowsState = {
  runningWindows: WindowType[]
  runWindow: (program: Program) => Promise<WindowType["windowId"]>
  closeWindow: (windowId: string) => void
  focusWindow: (windowId: string) => void
}

const useWindowsState = create<WindowsState>((set, get) => ({
  runningWindows: [],
  runWindow: async (program) => {
    const windowId = Math.random().toString(36).substring(7)
    const { runningWindows } = get()
    const newWindow: WindowType = {
      windowId,
      zIndex: Math.max(...runningWindows.map((window) => window.zIndex), 0) + 1,
      id: program.id,
      name: program.name,
      icon: (await program.getIcon()).default,
      component: (await program.getComponent()).default,
    }
    set((state) => ({ runningWindows: [...state.runningWindows, newWindow] }))
    return windowId
  },
  closeWindow: (windowId) => {
    set((state) => ({
      runningWindows: state.runningWindows.filter(
        (window) => window.windowId !== windowId
      ),
    }))
  },
  focusWindow: (windowId) => {
    set((state) => ({
      runningWindows: state.runningWindows.map((window) => {
        const maxIndex = Math.max(
          ...state.runningWindows.map((window) => window.zIndex),
          0
        )
        const result = {
          ...window,
          zIndex:
            window.windowId === windowId
              ? window.zIndex === maxIndex
                ? maxIndex
                : maxIndex + 1
              : window.zIndex,
        }
        console.log(result)

        return result
      }),
    }))
  },
}))

export default useWindowsState
