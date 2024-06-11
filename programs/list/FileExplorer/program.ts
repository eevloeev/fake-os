import { Program } from "@/programs/types"

const program: Program = {
  id: "file-explorer",
  name: "File Explorer",
  getIcon: () => import("@/assets/icons/folder-empty.png"),
  getComponent: () => import("@/programs/list/FileExplorer/FileExplorer"),
}

export default program
