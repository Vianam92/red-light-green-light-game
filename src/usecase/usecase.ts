export const randomVariation = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const greenLightDuration = (score: number) => Math.max(10000 - score * 100, 2000) + randomVariation(-1500, 1500);