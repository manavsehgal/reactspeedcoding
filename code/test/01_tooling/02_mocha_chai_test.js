import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('Mocha Chai Demo', () => {
  describe('Array operations', () => {
    describe('#indexOf()', () => {
      it('should return -1 when the value is not present', () => {
        expect([1, 2, 3].indexOf(5)).to.equal(-1);
        expect([1, 2, 3].indexOf(0)).to.equal(-1);
      });
    });

    describe('length', () => {
      it('should return 0 when array is empty', () => {
        expect([].length).to.equal(0);
      });
    });

    describe('length', () => {
      // Indicate pending test as a TODO for your collaborators
      it('should return number of elements in array');
    });
  });
});
