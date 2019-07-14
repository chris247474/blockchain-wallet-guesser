import * as walletCrack from '../index';
import { doesNotReject } from 'assert';

describe('Testing wallet private key guesser', () => {
    beforeEach(() => {
    });

    beforeAll(() => {
    });

    test('number 1 should convert to hex string then convert back to number 1', () => {
        const num = 1;

        const hexString = walletCrack.convertNumToHexString(num);
        console.log('hexString:', hexString);
        expect(hexString.length).toBe(16);

        const newNum = walletCrack.convertHexStringToNum(hexString);
        console.log('newNum:', newNum);
        expect(newNum).toBe(num);
    });

    afterEach(() => {

    });

    afterAll(() => {

    });
});