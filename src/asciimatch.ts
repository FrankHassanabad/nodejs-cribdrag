import { hexToString } from './conversions';

export const asciiMatch = (
  chunksInHex: string[],
  charSetRegex: string,
): boolean =>
  chunksInHex.some(chunk => hexToString(chunk).match(charSetRegex) != null);
