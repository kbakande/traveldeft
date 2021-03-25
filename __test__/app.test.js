import 'regenerator-runtime/runtime'
import { expect } from '@jest/globals';
import { dateDiffInDays } from '../src/client/js/application'


it('tests difference in date functions', () => {
    const testDate = new Date(new Date().toISOString().slice(0, 10));
    expect(dateDiffInDays(testDate)).toBe(0);
});