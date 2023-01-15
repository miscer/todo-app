import random from "lodash/random";

export function getRandomListColor(): string {
  // it's easier to use HSL here to ensure that the random color will have good contrast (i.e. no #eeeeee)
  const hue = random(0, 360);
  return `hsl(${hue}deg 100% 50%)`;
}
