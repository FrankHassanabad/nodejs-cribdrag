import * as crypto from 'crypto';

const password = 'I am some super long password';

export const encrypt = (clearText: string, cipherString: string): string => {
  const cipher = crypto.createCipher(cipherString, password);
  return cipher.update(clearText, 'utf8', 'hex') + cipher.final('hex');
};
