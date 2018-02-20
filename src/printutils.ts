'use strict';

import { hexToString } from './conversions';

export const printLine = (chunksInHex: string[], charSetRegex: string): void => {
  chunksInHex.forEach((chunk: any, index: any) => {
    const hexString = hexToString(chunk);
    if (hexString.match(charSetRegex)) {
      console.log(`${index}: ${hexString} *** (possible drag match)`);
    } else {
      console.log(`${index}: ${hexString}`);
    }
  });
};

export const printPlain = (chunksInHex: string[]): void => {
  chunksInHex.forEach((chunk: any, index: any) => {
    const hexString = hexToString(chunk);
    console.log(hexString);
  });
};
