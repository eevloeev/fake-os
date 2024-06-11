import { WindowTab, WindowType } from "@/components/Desktop/types"
import { Program } from "@/programs/types"
import { create } from "zustand"

type WindowsState = {
  runningWindows: WindowType[]
  windowTabs: WindowTab[]
  focusedWindow: WindowType["windowId"] | null
  runWindow: (program: Program) => Promise<WindowType["windowId"]>
  closeWindow: (windowId: string) => void
  focusWindow: (windowId: string) => void
  resetFocus: () => void
  minimizeWindow: (windowId: string) => void
  unminimizeWindow: (windowId: string) => void
  toggleMinimizeWindow: (windowId: string) => void
}

const getWindowTabs = (runningWindows: WindowType[]): WindowTab[] =>
  runningWindows.map((window) => ({
    windowId: window.windowId,
    programName: window.programName,
    icon: window.icon,
    isMinimized: window.isMinimized,
  }))

const useWindowsState = create<WindowsState>((set, get) => ({
  runningWindows: [],
  windowTabs: [],
  focusedWindow: null,
  runWindow: async (program) => {
    const windowId = Math.random().toString(36).substring(7)
    const { runningWindows } = get()
    const newWindow: WindowType = {
      windowId,
      zIndex: Math.max(...runningWindows.map((window) => window.zIndex), 0) + 1,
      isMinimized: false,
      programId: program.id,
      programName: program.name,
      icon: (await program.getIcon()).default,
      component: (await program.getComponent()).default,
    }
    set((state) => ({
      runningWindows: [...state.runningWindows, newWindow],
      windowTabs: [...state.windowTabs, ...getWindowTabs([newWindow])],
      focusedWindow: newWindow.windowId,
    }))
    return windowId
  },
  closeWindow: (windowId) => {
    set((state) => ({
      runningWindows: state.runningWindows.filter(
        (window) => window.windowId !== windowId
      ),
      windowTabs: state.windowTabs.filter((tab) => tab.windowId !== windowId),
    }))
  },
  focusWindow: (windowId) => {
    const { runningWindows } = get()
    const currentWindow = runningWindows.find(
      (window) => window.windowId === windowId
    )

    if (!currentWindow) return

    set((state) => ({
      runningWindows: state.runningWindows.map((window) => {
        const maxIndex = Math.max(
          ...state.runningWindows.map((window) => window.zIndex),
          0
        )

        if (currentWindow.zIndex === maxIndex) {
          return window
        }

        return {
          ...window,
          zIndex: window.windowId === windowId ? maxIndex + 1 : window.zIndex,
        }
      }),
      focusedWindow: currentWindow.windowId,
    }))
  },
  resetFocus: () => {
    set({ focusedWindow: null })
  },
  minimizeWindow: (windowId) => {
    set((state) => ({
      runningWindows: state.runningWindows.map((window) => ({
        ...window,
        isMinimized: window.windowId === windowId ? true : window.isMinimized,
      })),
      windowTabs: state.windowTabs.map((tab) => ({
        ...tab,
        isMinimized: tab.windowId === windowId ? true : tab.isMinimized,
      })),
    }))
  },
  unminimizeWindow: (windowId) => {
    set((state) => ({
      runningWindows: state.runningWindows.map((window) => ({
        ...window,
        isMinimized: window.windowId === windowId ? false : window.isMinimized,
      })),
      windowTabs: state.windowTabs.map((tab) => ({
        ...tab,
        isMinimized: tab.windowId === windowId ? false : tab.isMinimized,
      })),
    }))
  },
  toggleMinimizeWindow: (windowId) => {
    const { runningWindows } = get()
    const currentWindow = runningWindows.find(
      (window) => window.windowId === windowId
    )

    if (!currentWindow) return

    set((state) => ({
      runningWindows: state.runningWindows.map((window) => ({
        ...window,
        isMinimized:
          window.windowId === windowId
            ? !window.isMinimized
            : window.isMinimized,
      })),
      windowTabs: state.windowTabs.map((tab) => ({
        ...tab,
        isMinimized:
          tab.windowId === windowId ? !tab.isMinimized : tab.isMinimized,
      })),
    }))
  },
}))

export default useWindowsState
