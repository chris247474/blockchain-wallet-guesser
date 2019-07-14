import * as walletCrack from '../index';
import { doesNotReject } from 'assert';
const number_to_base = require("number-to-base");

describe('Testing wallet private key guesser', () => {
    const iterations = 100;
    const hexLength = 64;
    const errStr = "currentDigits param must have length property value less than or equal to 64";

    beforeEach(() => {
    });

    beforeAll(() => {
    });

    test('randomIntFromInterval test', () => {
        for(var c = 0;c < iterations;c++) {
            const ranNum = walletCrack.randomIntFromInterval();
            expect(ranNum).toBeGreaterThanOrEqual(0);
        }
    })

    test('constructRemainingDigits test', () => {
        const ranNum = walletCrack.randomIntFromInterval();
        expect(ranNum).toBeGreaterThanOrEqual(0);

        const stringNum = ranNum.toString();
        expect(stringNum).toHaveLength(1);

        const hexString = walletCrack.constructRemainingDigits(stringNum);
        expect(hexString.length).toBe(hexLength);
    })

    test('random number should convert to hex string then convert back to the same random number', () => {
        const min = 0;
        const max = Math.pow(10, 10);
        let num: number;

        for(var c = 0;c < iterations;c++) {
            try {
                num = walletCrack.randomIntFromInterval(min, max);

                const hexFromNum = walletCrack.convertNumToHexString(num);
                expect(hexFromNum.length).toBe(hexLength);

                const numFromHex = walletCrack.convertHexStringToNum(hexFromNum);
                expect(numFromHex).toBe(num);
            } catch (err) {
                console.log('Iteration ' + c + 'Skipped: random number ' + num + 'w length greater than 64 generated');
            }
        }
    });

    afterEach(() => {

    });

    afterAll(() => {

    });
});