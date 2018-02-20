'use strict';

import { xorStrings } from '../conversions';

/*
 * Usage:
 * $ npm run xorstrings string1 string2 (cipher)
 * If no cipher is choosen, then aes-256-ctr is used
 * Other ciphers you can pass in as a 3rd argument:
 * aes-256-ctr
 * aes-256-cb
 * aes-256-ecb
 */
const string1 = process.argv[2];
const string2 = process.argv[3];
const cipher = process.argv[4] || 'aes-256-ctr';

if (string1 == null || string2 == null) {
  console.log('Usage:');
  console.log('npm run xor <string1> <string2>');
  process.exit(1);
}

console.log(xorStrings(string1, string2));
