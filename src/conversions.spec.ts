import { expect } from 'chai';
import * as conversions from './conversions';

describe('conversions', () => {
  describe('#stringToHex', () => {
    it('should covert Frank to correct Hex', () =>
      expect(conversions.stringToHex('Frank')).to.eql('4672616e6b'));

    it('should covert frank to correct Hex', () =>
      expect(conversions.stringToHex('frank')).to.eql('6672616e6b'));

    it('should covert Becky to correct Hex', () =>
      expect(conversions.stringToHex('Becky')).to.eql('4265636b79'));

    it('should covert becky to correct Hex', () =>
      expect(conversions.stringToHex('becky')).to.eql('6265636b79'));

    it('should covert evan to correct Hex', () =>
      expect(conversions.stringToHex('Evan')).to.eql('4576616e'));

    it('should covert evan to correct Hex', () =>
      expect(conversions.stringToHex('evan')).to.eql('6576616e'));

    it('should covert braden to correct Hex', () =>
      expect(conversions.stringToHex('Braden')).to.eql('42726164656e'));

    it('should covert braden to correct Hex', () =>
      expect(conversions.stringToHex('braden')).to.eql('62726164656e'));
  });

  describe('#hexToString', () => {
    it('should covert Frank to correct Hex', () =>
      expect(conversions.hexToString('4672616e6b')).to.eql('Frank'));

    it('should covert frank to correct Hex', () =>
      expect(conversions.hexToString('6672616e6b')).to.eql('frank'));

    it('should covert Becky to correct Hex', () =>
      expect(conversions.hexToString('4265636b79')).to.eql('Becky'));

    it('should covert becky to correct Hex', () =>
      expect(conversions.hexToString('6265636b79')).to.eql('becky'));

    it('should covert evan to correct Hex', () =>
      expect(conversions.hexToString('4576616e')).to.eql('Evan'));

    it('should covert evan to correct Hex', () =>
      expect(conversions.hexToString('6576616e')).to.eql('evan'));

    it('should covert braden to correct Hex', () =>
      expect(conversions.hexToString('42726164656e')).to.eql('Braden'));

    it('should covert braden to correct Hex', () =>
      expect(conversions.hexToString('62726164656e')).to.eql('braden'));
  });

  describe('#xorStrings', () => {
    it('should xor truth table of 1 ^ 1 = 0', () => {
      expect(conversions.xorStrings('1', '1')).to.eql('0');
    });

    it('should xor truth table of 1 ^ 0 = 1', () => {
      expect(conversions.xorStrings('1', '0')).to.eql('1');
    });

    it('should xor truth table of 0 ^ 1 = 1', () => {
      expect(conversions.xorStrings('1', '0')).to.eql('1');
    });

    it('should xor truth table of 0 ^ 0 = 0', () => {
      expect(conversions.xorStrings('0', '0')).to.eql('0');
    });

    it('should xor with padding autoapplied 1111 ^ 1 = 1111 ^ 1000 = 0111', () => {
      expect(conversions.xorStrings('1111', '1')).to.eql('0111');
    });

    it('should xor with padding autoapplied 1 ^ 1111 = 1000 ^ 1111 ^ = 0111', () => {
      expect(conversions.xorStrings('1', '1111')).to.eql('0111');
    });
  });

  describe('#xorSameLength', () => {
    it('should xor truth table of 1 ^ 1 = 0', () => {
      expect(conversions.xorSameLength(['1'], ['1'])).to.eql('0');
    });

    it('should xor truth table of 1 ^ 0 = 1', () => {
      expect(conversions.xorSameLength(['1'], ['0'])).to.eql('1');
    });

    it('should xor truth table of 0 ^ 1 = 1', () => {
      expect(conversions.xorSameLength(['1'], ['0'])).to.eql('1');
    });

    it('should xor truth table of 0 ^ 0 = 0', () => {
      expect(conversions.xorSameLength(['0'], ['0'])).to.eql('0');
    });

    it('should throw if strings are not equal, 001 ^ 1 = (exception, no return value)', () => {
      expect(() => conversions.xorSameLength(['0', '0', '1' ], ['1'])).to.throw(TypeError);
    });

    it('should throw if string are not equal, 1 ^ 001 = 1', () => {
      expect(() => conversions.xorSameLength(['1'], ['0', '0', '1'])).to.throw(TypeError);
    });
  });

  describe('#padEitherSideEmptyZeros', () => {
    it('should pad array1 = 1, array2 = 00001 with array1 = 10000 array2 = 00001', () => {
      expect(conversions.padEitherSideEmptyZeros(['1'], ['0', '0', '0', '1']))
        .to.eql([['1', '0', '0', '0'], ['0', '0', '0', '1']]);
    });

    it('should pad array1 = 00001, array2 = 1 with array1 = 0001 array2 = 10000', () => {
      expect(conversions.padEitherSideEmptyZeros(['0', '0', '0', '1'], ['1']))
        .to.eql([['0', '0', '0', '1'], ['1', '0', '0', '0']]);
    });

    it('should not add any pad to array1 = 00001, array2 = 10000', () => {
      expect(conversions.padEitherSideEmptyZeros(['0', '0', '0', '1'], ['1', '0', '0', '0']))
        .to.eql([['0', '0', '0', '1'], ['1', '0', '0', '0']]);
    });
  });

  describe('#xorPlainTextWithCrib', () => {
    it('should echo back just the ascii code when the xor is zeros', () => {
      expect(conversions.xorPlainTextWithCrib('00', 'A')).to.eql(['41']);
    });

    it('should echo back just the ascii code as 2 chunks when the xor is zeros', () => {
      expect(conversions.xorPlainTextWithCrib('0000', 'A')).to.eql(['41', '41']);
    });

    it('should xor to zero when the ciphertext is the same as the ascii code', () => {
      expect(conversions.xorPlainTextWithCrib('41', 'A')).to.eql(['00']);
    });

    it('should xor to zero when the ciphertext is the same as the ascii code', () => {
      expect(conversions.xorPlainTextWithCrib('4141', 'A')).to.eql(['00', '00']);
    });

 });

});
