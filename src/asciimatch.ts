'use strict';

import { hexToString } from './conversions';

export const asciiMatch = (chunksInHex: string[], charSetRegex: string): boolean => {
  return chunksInHex.some((chunk) => {
    const hexString = hexToString(chunk);
    if (hexString.match(charSetRegex)) {
      return true;
    } else {
      return false;
    }
  });
};
