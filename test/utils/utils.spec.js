
import { expect } from 'chai';
import { isEmpty, truncate } from '../../js/utils/utils';

describe('Utils', () => {

  describe ('isEmpty', () => {

    it('parameter is undefined - returns true', () => {
      const result = isEmpty(undefined);
      expect(result).to.be.true;
    });

    it('parameter is null - returns true', () => {
      const result = isEmpty(null);
      expect(result).to.be.true;
    });

    it('parameter length is 0 - returns true', () => {
      const result = isEmpty('');
      expect(result).to.be.true;
    });

    it('valid string with length > 0 - return false', () => {
      const result = isEmpty('test value');
      expect(result).to.be.false;
    });
  });

  describe ('truncate', () => {

    it('string to truncate is empty - returns \'\'', () => {
      const result = truncate('', 5);
      expect(result).to.equal('');
    });

    it('string length < length parameter - return string', () => {
      const result = truncate('Test', 5);
      expect(result).to.equal('Test');
    });

    it('string length > length parameter - return truncated string with ...', () => {
      const result = truncate('Testing', 4);
      expect(result).to.equal('Test...');
    });
  });
});
