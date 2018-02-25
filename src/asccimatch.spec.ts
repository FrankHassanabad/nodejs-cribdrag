import { expect } from 'chai';
import { asciiMatch } from './asciimatch';

describe('asciiMatch', () => {
  const frankInHex = ['46', '72', '61', '6e', '6b'];

  it('should match F to Frank', () => expect(asciiMatch(frankInHex, 'F')).to.be.true);
  it('should match r to Frank', () => expect(asciiMatch(frankInHex, 'r')).to.be.true);
  it('should match a to Frank', () => expect(asciiMatch(frankInHex, 'a')).to.be.true);
  it('should match n to Frank', () => expect(asciiMatch(frankInHex, 'n')).to.be.true);
  it('should match k to Frank', () => expect(asciiMatch(frankInHex, 'k')).to.be.true);

  it('should not match lower case f', () =>
    expect(asciiMatch(frankInHex, 'f')).to.be.false);

  it('should not match letter not in the group such as z', () =>
    expect(asciiMatch(frankInHex, 'z')).to.be.false);
});
