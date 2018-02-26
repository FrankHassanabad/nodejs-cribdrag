# nodejs-cribdrag

[![Build Status](https://travis-ci.org/FrankHassanabad/nodejs-cribdrag.svg?branch=master)](https://travis-ci.org/FrankHassanabad/nodejs-cribdrag)

Based on tooling and ideas from
https://github.com/SpiderLabs/cribdrag

And the articles it came from:
https://www.trustwave.com/Resources/SpiderLabs-Blog/The-Way-of-the-Cryptologist/
http://jarmoc.com/blog/2013/08/12/otp/

This is a NodeJS based crib dragger. This performs crib dragging attacks against ciphertext encrypted using an XOR operation with a predictable key.

These scripts can be used to cryptanalyze:

* One-Time Pad with reused key (XOR two ciphertexts together)
* Any stream cipher with reused key (XOR two ciphertexts together)
* Single character XOR
* Multiple character XOR

# install
```js
$ npm install
```

# Usages

For basic xor'ing of two strings

```sh
$ npm run xor 10 11
01
```

For encrypting using nodeJS broken out of the box aes-256-ctr

```sh
$ npm run encrypt "hello"
998560c50a
(node:1407) Warning: Use Cipheriv for counter mode of aes-256-ctr
```

For encrypting and then xor'ing two strings

```sh
$ npm run xorencrypt "hello" "how are you"
000a1b4c0e69d2b905f825
(node:1748) Warning: Use Cipheriv for counter mode of aes-256-ctr
(node:1748) Warning: Use Cipheriv for counter mode of aes-256-ctr
```

For running cribdrag and interactively doing plain text attacks

```sh
$ npm run xorencrypt "You have walked the path of the cryptographer and you are ready for further information. Congrats...." "Your next step will be to contact lawl.bitcoin@gmail.com to receive the next phase of the challenge."

00000052480f131d545712180e1544571d0409001204541c4f4f054f1a1c0443175215110303491008040b0a1b4e2109094110035b430e1f45541d4513011a450f191700121d175406000a54491e0e0e0108411b0f4f1a4645630c06061e0d111d494b0064
(node:1748) Warning: Use Cipheriv for counter mode of aes-256-ctr
(node:1748) Warning: Use Cipheriv for counter mode of aes-256-ctr

$ npm run cribdrag 00000052480f131d545712180e1544571d0409001204541c4f4f054f1a1c0443175215110303491008040b0a1b4e2109094110035b430e1f45541d4513011a450f191700121d175406000a54491e0e0e0108411b0f4f1a4645630c06061e0d111d494b0064

? Please enter your crib: bitcoin
```

Notice that you will have output with possible drag matches such as

```
39: rapher  *** (possible drag match)
```

Read through the articles posted above, but the next drag attempt
would be 'cryptographer', so on so forth until the messages are
broken.

# Canned vector attacks

```
$ npm run phone
Usage:
npm run phone <phone number from the list below>
[ '555-555-5555',
  '123-456-9999',
  '532-444-4444',
  '876-875-8765',
  '956-234-7563',
  '854-434-1345' ]

(choose a number)

$ npm run phone 876-875-8765
Found exact encrypted password match of: c9d73a845d2c82b444a0666e attempting decrypt of all phone numbers
555-555-5555
123-456-9999
532-444-4444
876-875-8765
956-234-7563
854-434-1345
```

If you have internal access to a column of encrypted phone numbers and
you know that the format is 555-555-5555 as well as at least one phone number
you should be able to decrypt all the other phone numbers.
Getting the internal number can be as simple as
  * Trying 1 or 2 known public numbers
  * Insider giving you their phone number
  * etc...

# Testing

Runs lint, build, and test

```
$ npm test
```

Run just the unit tests

```
$ npm run test:unit
```

Remove the dest folder (clean)

```
$ npm run clean
```