import Image from "next/image"
import { ComponentProps } from "react"

function PreloadImage(props: ComponentProps<typeof Image>) {
  const { alt, style, priority, ...rest } = props
  return (
    <Image
      {...props}
      alt={alt}
      style={{ display: "none", ...style }}
      priority={priority ?? true}
    />
  )
}

export default PreloadImage
