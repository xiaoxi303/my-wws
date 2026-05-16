import Lenis from "lenis";

export function createLenis() {
  return new Lenis({
    duration: 1.18,
    easing: (time: number) => Math.min(1, 1.001 - 2 ** (-10 * time)),
    smoothWheel: true,
    syncTouch: false,
    touchMultiplier: 1.2,
    wheelMultiplier: 0.86
  });
}
