import random from "lodash/random";

export function getRandomListColor(): string {
  const hue = random(0, 360);
  return `hsl(${hue}deg 100% 50%)`;
}
