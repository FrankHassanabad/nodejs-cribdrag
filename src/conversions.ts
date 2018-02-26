
export const stringToHex = (hexString: string): string =>
  hexString.split('').reduce((accum, val) =>
    accum + val.charCodeAt(0).toString(16), '');

export const hexToString = (hexString: string): string =>
  (hexString.match(/.{1,2}/g) || []).reduce((accum, split) =>
    accum = accum + String.fromCharCode(parseInt(split, 16)), '');

export const xorStrings = (string1: string, string2: string): string => {
  const [left, right] = padEitherSideEmptyZeros(Array.from(string1), Array.from(string2));
  return xorSameLength(left, right);
};

export const xorSameLength = (string1: ReadonlyArray<string>, string2: ReadonlyArray<string>): string => {
  throwIfLengthNotSame(string1, string2);
  return string1.reduce((accum, charVal, index) =>
    accum + (parseInt(charVal, 16) ^ parseInt(string2[index], 16)).toString(16), '');
};

export const padEitherSideEmptyZeros = (
  string1: ReadonlyArray<string>,
  string2: ReadonlyArray<string>,
): ReadonlyArray<ReadonlyArray<string>> => {
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

export const xorPlainTextWithCrib = (cipherText: string, crib: string) => {
  const cribInHex = stringToHex(crib);
  let chunks: ReadonlyArray<string> = [];
  for (let i = 0; i <= cipherText.length - cribInHex.length + 1; i += 2) {
    const slice = cipherText.slice(i, i + cribInHex.length);
    chunks = chunks.concat([xorStrings(slice, cribInHex)]);
  }
  return chunks;
};

export const throwIfLengthNotSame = (
  array1: ReadonlyArray<string>,
  array2: ReadonlyArray<string>,
): void => {
  if (array1.length !== array2.length) {
    throw TypeError(
      `Array lengths need to be equal: ` +
      `array1.length=${array1.length} ` +
      `array2.length=${array2.length}`,
    );
  }
};
