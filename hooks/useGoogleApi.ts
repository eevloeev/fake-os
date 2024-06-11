import useGoogleApiState from "@/state/useGoogleApiState"

function useGoogleApi() {
  const googleApiState = useGoogleApiState()

  const authorize = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      const client = google.accounts.oauth2.initTokenClient({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
        scope: "https://www.googleapis.com/auth/drive",
        callback: (tokenResponse) => {
          if (tokenResponse && tokenResponse.access_token) {
            alert("success")
            googleApiState.setAccessToken(tokenResponse.access_token)
            resolve()
          } else {
            reject(new Error("Could not get access token from Google API"))
          }
        },
        error_callback: (error) => {
          reject(error)
        },
      })
      client.requestAccessToken()
    })
  }

  return { authorize }
}

export default useGoogleApi
