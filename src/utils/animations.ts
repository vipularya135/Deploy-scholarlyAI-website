
export const animateNumber = (
  element: HTMLElement,
  start: number = 0,
  end: number,
  duration: number = 1500
) => {
  let startTimestamp: number | null = null;
  const step = (timestamp: number) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const currentValue = Math.floor(progress * (end - start) + start);
    element.textContent = currentValue.toLocaleString();
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = end.toLocaleString();
    }
  };
  window.requestAnimationFrame(step);
};

export const staggeredEntrance = (selector: string, delay: number = 100) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el, index) => {
    const element = el as HTMLElement;
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, index * delay);
  });
};
