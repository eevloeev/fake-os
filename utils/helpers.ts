export function classNames(classNames: any[]) {
  return classNames.filter(Boolean).join(" ")
}

export function disableIframePointerEvents() {
  document.querySelectorAll("iframe").forEach((iframe) => {
    iframe.style.pointerEvents = "none"
  })
}

export function enableIframePointerEvents() {
  document.querySelectorAll("iframe").forEach((iframe) => {
    iframe.style.pointerEvents = "auto"
  })
}
