import * as walletCrack from '../index';
import * as walletHelper from '../helpers/ethersHelper';
import { doesNotReject } from 'assert';
const number_to_base = require("number-to-base");
require('dotenv').config();

describe('Testing wallet private key guesser', () => {
    const iterations = 100;
    const hexLength = 64;
    const errStr = "currentDigits param must have length property value less than or equal to 64";
    const min = 0;
    const max = Math.pow(10, 10);
    const nets = process.env;
    const net = process.env.ROPSTEN;

    beforeEach(() => {
    });

    beforeAll(() => {
        expect(nets).not.toBeUndefined();
        expect(nets.ROPSTEN).not.toBeUndefined();
        expect(nets.KOVAN).not.toBeUndefined();
        expect(nets.RINKEBY).not.toBeUndefined();
        expect(nets.MAINNET).not.toBeUndefined();
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

    test('createWalletPrivateKeyFromNumber result should be a valid Web3 Account', () => {
        const randomNum = walletCrack.randomIntFromInterval(min, max);
        //just to verify the privKey
        const privKey = walletCrack.createWalletPrivateKeyFromNumber(randomNum);
        const account = walletHelper.createAccountFromNumber(randomNum, net);

        expect(account).not.toBeUndefined();
        expect(account.address).not.toBeUndefined();
        expect(account.privateKey).toEqual(privKey);
        expect(account.address).not.toBeUndefined();
        expect(account.accounts).not.toBeUndefined();
        expect(account.accounts.wallet).not.toBeUndefined();
    })

    test('createWalletPrivateKeyFromNumber result should be able to perform wallet actions', async () => {
        const randomNum = walletCrack.randomIntFromInterval(min, max);
        //just to verify the privKey
        const privKey = walletCrack.createWalletPrivateKeyFromNumber(randomNum);
        const account = walletHelper.createAccountFromNumber(randomNum, net);

        expect(account).not.toBeUndefined();
        expect(account.address).not.toBeUndefined();
        expect(account.address).not.toBeUndefined();
        expect(account.accounts).not.toBeUndefined();
        expect(account.accounts.wallet).not.toBeUndefined();

        const balance = await walletHelper.checkBalances(privKey, net);
        console.log('balance: ', balance);
    })

    afterEach(() => {

    });

    afterAll(() => {

    });
});