import { classNames } from "@/utils/helpers"
import styles from "./InputText.module.css"

type Props = {
  innerRef?: React.Ref<HTMLInputElement>
}

function InputText(props: Props & JSX.IntrinsicElements["input"]) {
  const { className, type, innerRef, ...restProps } = props

  return (
    <input
      ref={props.innerRef}
      type={type ?? "text"}
      className={classNames(className, styles.input)}
      {...restProps}
    />
  )
}

export default InputText
