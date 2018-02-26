import { hexToString } from './conversions';

export const printLine = (chunksInHex: ReadonlyArray<string>, charSetRegex: string): void => {
  chunksInHex.forEach((chunk, index) => {
    const hexString = hexToString(chunk);
    if (hexString.match(charSetRegex)) {
      console.log(`${index}: ${hexString} *** (possible drag match)`);
    } else {
      console.log(`${index}: ${hexString}`);
    }
  });
};

export const printPlain = (chunksInHex: ReadonlyArray<string>): void =>
  chunksInHex.forEach(chunk => console.log(hexToString(chunk)));
