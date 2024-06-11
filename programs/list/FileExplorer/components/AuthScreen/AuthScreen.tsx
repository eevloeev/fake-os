import useGoogleApi from "@/hooks/useGoogleApi"
import Button from "@/shared/Button/Button"
import useGoogleApiState from "@/state/useGoogleApiState"
import { useCallback, useState } from "react"
import styles from "./AuthScreen.module.css"

enum AuthStatus {
  AWAITING_USER,
  SUCCESS,
  ERROR,
}

function AuthScreen() {
  const { accessToken } = useGoogleApiState()
  const { authorize } = useGoogleApi()

  const [isAuthStatus, setIsAuthStatus] = useState(
    accessToken ? AuthStatus.SUCCESS : AuthStatus.AWAITING_USER
  )
  const [authError, setAuthError] = useState<any | null>(null)

  const handleAuth = useCallback(async () => {
    try {
      await authorize()
    } catch (error) {
      if (error === null || typeof error !== "object" || !("type" in error)) {
        return
      }

      switch (error.type) {
        case "popup_closed":
          // User closed the popup, do nothing
          break
        case "popup_failed_to_open":
          setIsAuthStatus(AuthStatus.ERROR)
          setAuthError(
            new Error("Please allow showing popups for this site and try again")
          )
          break
        default:
          setIsAuthStatus(AuthStatus.ERROR)
          setAuthError(error)
      }
    }
  }, [authorize])

  return (
    <>
      {accessToken}
      {isAuthStatus === AuthStatus.AWAITING_USER && (
        <div className={styles.authAwaitingUser}>
          <>File Explorer will request access to your Google Drive. Continue?</>
          <Button className={styles.button} onClick={handleAuth}>
            OK
          </Button>
        </div>
      )}
      {isAuthStatus === AuthStatus.ERROR && (
        <div className={styles.authError}>
          Error: {authError?.message || "Unknown error"}
        </div>
      )}
    </>
  )
}

export default AuthScreen
