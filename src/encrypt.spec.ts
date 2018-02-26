import { expect } from 'chai';
import { encrypt } from './encrypt';

describe('encrypt', () => {
  it('should encrypt Frank to aes-256-ctr correctly', () =>
    expect(encrypt('Frank', 'aes-256-ctr')).to.eql('b7926dc70e'));

  it('should encrypt Frank to aes-256-cbc correctly', () =>
    expect(encrypt('Frank', 'aes-256-cbc')).to.eql('546be778da081a233bd3afaed4608090'));
});
