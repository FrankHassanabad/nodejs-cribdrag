'use strict';

import { encrypt } from '../encrypt';

/*
 * Usage:
 * $ npm run encryptstring string1 (cipher)
 * If no cipher is choosen, then aes-256-ctr is used
 * Other ciphers you can pass in as a 2nd argument:
 * aes-256-ctr
 * aes-256-cb
 * aes-256-ecb
 */
const string1 = process.argv[2];
const cipher = process.argv[3] || 'aes-256-ctr';

if (string1 == null) {
  console.log('Usage:');
  console.log('npm run encrypt <string> (cipher)');
  process.exit(1);
}

console.log(encrypt(string1, cipher));
