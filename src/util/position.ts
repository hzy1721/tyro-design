export const getElementTop = (element: HTMLElement | null) => {
  if (!element) {
    return 0;
  }
  let actualTop = element.offsetTop;
  let current = element.offsetParent as HTMLElement;
  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent as HTMLElement;
  }
  return actualTop;
};

export const getElementLeft = (element: HTMLElement | null) => {
  if (!element) {
    return 0;
  }
  let actualLeft = element.offsetLeft;
  let current = element.offsetParent as HTMLElement;
  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent as HTMLElement;
  }
  return actualLeft;
};
