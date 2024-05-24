import "@/styles/reset.css"

import "@/styles/common.css"

import localFont from "next/font/local"

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
  return (
    <html lang="en">
      <body className={FontW95FA.className}>{children}</body>
    </html>
  )
}
