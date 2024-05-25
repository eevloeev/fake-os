import { create } from "zustand"

type SelectionState = {
  isSelecting: boolean
  startX: number
  startY: number
  endX: number
  endY: number
  set: (newState: Partial<SelectionState>) => void
  selectionListeners: (() => void)[]
  addSelectionListener: (listener: () => void) => void
  removeSelectionListener: (listener: () => void) => void
  onMouseDown: (event: MouseEvent) => void
  onMouseUp: (event: MouseEvent) => void
  onMouseMove: (event: MouseEvent) => void
}

const useDesktopSelectionState = create<SelectionState>((set, get) => ({
  isSelecting: false,
  startX: 0,
  startY: 0,
  endX: 0,
  endY: 0,
  set: (newState) => set((state) => ({ ...state, ...newState })),
  selectionListeners: [],
  addSelectionListener: (listener) => {
    const { set, selectionListeners } = get()
    set({
      selectionListeners: [...selectionListeners, listener],
    })
  },
  removeSelectionListener: (listener) => {
    const { set, selectionListeners } = get()
    set({
      selectionListeners: selectionListeners.filter((l) => l !== listener),
    })
  },
  onMouseDown: (event: MouseEvent) => {
    const { set, selectionListeners } = get()
    selectionListeners.forEach((listener) => listener())
    const root = document.getElementById("desktop")
    if (root && !root.contains(event.target as Node)) {
      return
    }
    set({
      isSelecting: true,
      startX: event.clientX,
      startY: event.clientY,
      endX: event.clientX,
      endY: event.clientY,
    })
  },
  onMouseUp: (event: MouseEvent) => {
    const { set } = get()
    set({
      isSelecting: false,
      endX: event.clientX,
      endY: event.clientY,
    })
  },
  onMouseMove: (event) => {
    const { set, selectionListeners, isSelecting } = get()
    if (!isSelecting) {
      return
    }
    set({
      endX: event.clientX,
      endY: event.clientY,
    })
    selectionListeners.forEach((listener) => listener())
  },
}))

export default useDesktopSelectionState
