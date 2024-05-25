import { classNames } from "@/utils/helpers"
import styles from "./Button.module.css"

type Props = {
  children: React.ReactNode
}

function Button(props: Props & JSX.IntrinsicElements["button"]) {
  const { children, className, ...restProps } = props

  return (
    <button className={classNames([className, styles.button])} {...restProps}>
      {children}
    </button>
  )
}

export default Button
