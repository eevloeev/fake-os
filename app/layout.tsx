"use client"

import "@/styles/reset.css"

import "@/styles/common.css"

import useGoogleApiState from "@/state/useGoogleApiState"
import localFont from "next/font/local"
import Script from "next/script"

const FontW95FA = localFont({
  src: "../assets/fonts/W95FA/w95fa.woff2",
  weight: "400",
  style: "normal",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { setApiLoaded, setGsiLoaded } = useGoogleApiState()

  return (
    <html lang="en">
      <body className={FontW95FA.className}>{children}</body>
      <Script src="https://apis.google.com/js/api.js" onLoad={setApiLoaded} />
      <Script
        src="https://accounts.google.com/gsi/client"
        onLoad={setGsiLoaded}
      />
    </html>
  )
}
