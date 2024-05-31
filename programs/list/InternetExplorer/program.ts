import { Program } from "@/programs/types"

const program: Program = {
  id: "internet-explorer",
  name: "Internet Explorer",
  getIcon: () => import("@/assets/icons/internet-explorer.png"),
  getComponent: () =>
    import("@/programs/list/InternetExplorer/InternetExplorer"),
}

export default program
