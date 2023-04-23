export const getElementTop = (element: HTMLElement | null) => {
  let top = 0;
  let elem = element;
  while (elem) {
    top += elem.offsetTop;
    elem = elem.offsetParent as HTMLElement | null;
  }
  return top;
};

export const getElementLeft = (element: HTMLElement | null) => {
  let left = 0;
  let elem = element;
  while (elem) {
    left += elem.offsetLeft;
    elem = elem.offsetParent as HTMLElement | null;
  }
  return left;
};
