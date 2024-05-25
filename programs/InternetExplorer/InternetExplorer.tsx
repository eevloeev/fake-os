import InternetExplorerIcon from "@/assets/icons/internet-explorer.png"
import InputText from "@/shared/InputText/InputText"
import Window from "@/shared/Window/Window"
import { ComponentProps, useCallback, useRef } from "react"
import styles from "./InternetExplorer.module.css"

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

function InternetExplorer() {
  const addressBarRef = useRef<HTMLInputElement>(null)

  const handleAddressBarKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!addressBarRef.current) {
      return
    }

    if (event.key === "Enter") {
      const iframe = document.querySelector("iframe")
      let url = addressBarRef.current.value

      if (!url.startsWith("http") && !url.startsWith("https")) {
        url = encodeURI(
          `https://oldgoogle.neocities.org/search-1998.html?q=${url}`
        )
      }

      if (iframe) {
        iframe.src = url
      }
    }
  }, [])

  const handleIframeLoad = useCallback(() => {
    if (!addressBarRef.current) {
      return
    }

    addressBarRef.current.value = ""
  }, [])

  return (
    <Window
      titleIcon={InternetExplorerIcon}
      title="Internet Explorer"
      menu={menu}
    >
      <div className={styles.container}>
        <div className={styles.navigation}>
          <div className={styles.navigationContainer}>
            <div className={styles.navigationContent}>
              <span className={styles.addressLabel}>Address</span>
              <InputText
                innerRef={addressBarRef}
                className={styles.addressBar}
                defaultValue={DEFAULT_URL}
                placeholder="Enter a URL or search term and press Enter"
                onKeyDown={handleAddressBarKeyDown}
              />
            </div>
          </div>
        </div>
        <iframe
          className={styles.iframe}
          src={DEFAULT_URL}
          onLoad={handleIframeLoad}
        ></iframe>
      </div>
    </Window>
  )
}

export default InternetExplorer
