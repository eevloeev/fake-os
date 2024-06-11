"use client"

import { create } from "zustand"

type GoogleAPIState = {
  accessToken: string | null
  isApiLoaded: boolean
  isGsiLoaded: boolean
  setAccessToken: (accessToken: string) => void
  setApiLoaded: () => void
  setGsiLoaded: () => void
}

const useGoogleApiState = create<GoogleAPIState>((set, get) => ({
  accessToken: null,
  isApiLoaded: false,
  isGsiLoaded: false,
  setAccessToken: (accessToken) => set({ accessToken }),
  setApiLoaded: () => set({ isApiLoaded: true }),
  setGsiLoaded: () => set({ isGsiLoaded: true }),
}))

export default useGoogleApiState
