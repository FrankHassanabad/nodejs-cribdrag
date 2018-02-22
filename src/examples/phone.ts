import { asciiMatch } from '../asciimatch';
import { xorPlainTextWithCrib, xorStrings } from '../conversions';
import { encrypt } from '../encrypt';
import { printPlain } from '../printutils';

const phoneNumbers = [
  '555-555-5555',
  '123-456-9999',
  '532-444-4444',
  '876-875-8765',
  '956-234-7563',
  '854-434-1345',
];

if (process.argv[2] == null) {
  console.log('Usage:');
  console.log('npm run phone <phone number from the list below>');
  console.dir(phoneNumbers);
  process.exit(1);
}

const inputPhoneNum = process.argv[2];

const cipher = 'aes-256-ctr';
const encryptedPhoneNumbers = phoneNumbers.map((phoneNumber) => encrypt(phoneNumber, cipher));

let matches: any = [];

for (let i = 0; i < encryptedPhoneNumbers.length - 1; ++i) {
  const encryptedPhoneNum1 = encryptedPhoneNumbers[i];
  const encryptedPhoneNum2 = encryptedPhoneNumbers[i + 1];
  const xor = xorStrings(encryptedPhoneNum1, encryptedPhoneNum2);
  const output = xorPlainTextWithCrib(xor, inputPhoneNum);
  if (asciiMatch(output, '^[0-9]+\-[0-9]+\-[0-9]+$')) {
    matches = matches.concat([[encryptedPhoneNum1, encryptedPhoneNum2]]);
  }
}

let exactMatch: string = null;
if (matches.length === 2) {
  if (matches[0][1] === matches[1][0]) {
    exactMatch = matches[0][1];
  }
}

if (exactMatch) {
  console.log(
    'Found exact encrypted password match of:', exactMatch,
    'attempting decrypt of all phone numbers',
  );

  encryptedPhoneNumbers.forEach((encryptedPhoneNumber) => {
    const xor = xorStrings(encryptedPhoneNumber, exactMatch);
    const output = xorPlainTextWithCrib(xor, inputPhoneNum);
    printPlain(output);
  });
} else {
  console.log('Exact number not found, try a differnet one');
}
