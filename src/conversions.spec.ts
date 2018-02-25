import { expect } from 'chai';
import * as conversions from './conversions';

describe('conversions', () => {
  describe('#stringToHex', () => {
    it('should covert Frank to correct Hex', () => expect(conversions.stringToHex('Frank')).to.eql('4672616e6b'));
    it('should covert frank to correct Hex', () => expect(conversions.stringToHex('frank')).to.eql('6672616e6b'));

    it('should covert evan to correct Hex', () => expect(conversions.stringToHex('Evan')).to.eql('4576616e'));
    it('should covert evan to correct Hex', () => expect(conversions.stringToHex('evan')).to.eql('6576616e'));

    it('should covert braden to correct Hex', () => expect(conversions.stringToHex('Braden')).to.eql('42726164656e'));
    it('should covert braden to correct Hex', () => expect(conversions.stringToHex('braden')).to.eql('62726164656e'));
  });
});
