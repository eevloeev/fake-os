export function classes(classNames: any[]) {
  return classNames.filter(Boolean).join(" ")
}

export function checkIntersection(rect1: DOMRect, rect2: DOMRect) {
  return (
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top &&
    rect1.left < rect2.right &&
    rect1.right > rect2.left
  )
}
