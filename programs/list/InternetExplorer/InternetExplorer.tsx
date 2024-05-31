import { WindowType } from "@/components/Desktop/types"
import InputText from "@/shared/InputText/InputText"
import Window from "@/shared/Window/Window"
import { ComponentProps, useCallback, useRef } from "react"
import styles from "./InternetExplorer.module.css"
import program from "./program"

const DEFAULT_URL = "https://oldgoogle.neocities.org/1998/"

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

  const addressBarRef = useRef<HTMLInputElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleAddressBarKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!addressBarRef.current) {
      return
    }

    if (event.key === "Enter") {
      let url = addressBarRef.current.value

      if (!url) {
        return
      }

      if (!url.startsWith("http") && !url.startsWith("https")) {
        url = encodeURI(
          `https://oldgoogle.neocities.org/search-1998.html?q=${url}`
        )
      }

      if (iframeRef.current) {
        iframeRef.current.src = url
      }
      addressBarRef.current.value = ""
      addressBarRef.current.blur()
    }
  }, [])

  const handleIframeLoad = useCallback(() => {
    if (!addressBarRef.current) {
      return
    }

    addressBarRef.current.value = ""
  }, [])

  return (
    <Window window={window} program={program} menu={menu}>
      <div className={styles.container}>
        <div className={styles.navigation}>
          <div className={styles.navigationContainer}>
            <div className={styles.navigationContent}>
              <span className={styles.addressLabel}>Address</span>
              <InputText
                innerRef={addressBarRef}
                className={styles.addressBar}
                placeholder="Enter a URL or search term and press Enter"
                onKeyDown={handleAddressBarKeyDown}
              />
            </div>
          </div>
        </div>
        <div className={styles.iframeContainer}>
          <iframe
            ref={iframeRef}
            className={styles.iframe}
            src={DEFAULT_URL}
            onLoad={handleIframeLoad}
          />
        </div>
      </div>
    </Window>
  )
}

export default InternetExplorer
