import { WindowType } from "@/components/Desktop/types"
import AuthScreen from "@/programs/list/FileExplorer/components/AuthScreen/AuthScreen"
import Window from "@/shared/Window/Window"
import useGoogleApiState from "@/state/useGoogleApiState"
import { ComponentProps } from "react"
import program from "./program"

const menu: ComponentProps<typeof Window>["menu"] = [
  {
    label: "File",
  },
  {
    label: "Edit",
  },
  {
    label: "View",
  },
  {
    label: "Go",
  },
  {
    label: "Favorites",
  },
  {
    label: "Help",
  },
]

type Props = {
  window: WindowType
}

function InternetExplorer(props: Props) {
  const { window } = props

  const { accessToken } = useGoogleApiState()

  return (
    <Window window={window} program={program} menu={menu}>
      {accessToken ? accessToken : <AuthScreen />}
    </Window>
  )
}

export default InternetExplorer
