'use strict';

// TODO: This will not work for strings codes that are less than 16.
// It still needs to pad them with 01, 02, etc...
const stringToHex = (hexString: string): string => {
  const stringToArray = hexString.split('');
  return stringToArray.reduce((accum: any, val: any) => {
    return accum + val.charCodeAt(0).toString(16);
  }, '');
};

const hexToString = (hexString: string): string => {
  const splitByTwo = hexString.match(/.{1,2}/g);
  return splitByTwo.reduce((accum: any, split: any) => {
    return accum = accum + String.fromCharCode(parseInt(split, 16));
  }, '');
};

const xorStrings = (string1: string, string2: string): string => {
  const [left, right] = padEitherSideEmptyZeros(Array.from(string1), Array.from(string2));
  return xorSameLength(left, right);
};

const xorSameLength = (string1: string[], string2: string): string => {
  return string1.reduce((accum: any, charVal: any, index: any) =>
    accum + (parseInt(charVal, 16) ^ parseInt(string2[index], 16)).toString(16)
  , '');
};

const padEitherSideEmptyZeros = (string1: string[], string2: string[]): any => {
  if (string1.length > string2.length) {
    const emptyZeros = Array(string1.length - string2.length).fill('0');
    return [string1, string2.concat(emptyZeros)];
  } else if (string1.length < string2.length) {
    const emptyZeros = Array(string2.length - string1.length).fill('0');
    return [string1.concat(emptyZeros), string2];
  } else {
    return [string1, string2];
  }
};

const xorPlainTextWithCrib = (cipherText: string, crib: string) => {
  const cribInHex = stringToHex(crib);
  let chunks: any = [];
  for (let i = 0; i <= cipherText.length - cribInHex.length + 1; i += 2) {
    const slice = cipherText.slice(i, i + cribInHex.length);
    chunks = chunks.concat([xorStrings(slice, cribInHex)]);
  }
  return chunks;
};

export {
  stringToHex,
  hexToString,
  xorStrings,
  xorPlainTextWithCrib,
  xorSameLength,
  padEitherSideEmptyZeros,
};
