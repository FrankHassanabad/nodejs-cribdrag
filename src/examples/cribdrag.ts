import * as inquirer from 'inquirer';
import { xorPlainTextWithCrib } from '../conversions';
import { printLine } from '../printutils';

const ciphertext = process.argv[2];
if (ciphertext == null) {
  console.log('Usage:');
  console.log('npm run cribdrag <xor string>');
  process.exit(1);
}

const charSet = 'a-zA-Z0-9.,?! :;\'"';
const charSetRegex = `^[${charSet}]+$`;

const enterYourCrib = [
  {
    message: 'Please enter your crib:',
    name: 'crib',
    type: 'input',
  },
];

const startup = () => {
  return inquirer
  .prompt(enterYourCrib)
  .then(({ crib }: any) => {
    if (crib === '') {
      process.exit(0);
    } else {
      const output = xorPlainTextWithCrib(ciphertext, crib);
      printLine(output, charSetRegex);
      startup();
    }
  });
};

startup();
