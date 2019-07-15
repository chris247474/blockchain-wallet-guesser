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

        //const balance = await walletHelper.checkBalances(privKey, net);
        //console.log('balance: ', balance);

        // check transaction history
    })

    afterEach(() => {

    });

    afterAll(() => {

    });
});

/**
 * Account {
      address: '0xb978B4D856F2bf6c558437fB676ae456199aE483',
      privateKey:
       '000000000000000000000000000000000000000000000000000000000c1a6569',
      accounts:
       Accounts {
         providerResolver:
          ProviderResolver { providersModuleFactory: ProvidersModuleFactory {} },
         givenProvider: null,
         _currentProvider:
          HttpProvider {
            host: 'ropsten.infura.io/v3/fca9914262ce4cb08e533470cdd530ba',
            timeout: 0,
            headers: undefined,
            withCredentials: false,
            connected: true,
            providersModuleFactory: ProvidersModuleFactory {},
            agent: [Object] },
         _defaultAccount: undefined,
         _defaultBlock: 'latest',
         _transactionBlockTimeout: 50,
         _transactionConfirmationBlocks: 24,
         _transactionPollingTimeout: 750,
         _defaultGasPrice: undefined,
         _defaultGas: undefined,
         BatchRequest: [Function],
         utils:
          { BN: [Function],
            asciiToHex: [Function: asciiToHex],
            bytesToHex: [Function: bytesToHex],
            checkAddressChecksum: [Function: checkAddressChecksum],
            fromAscii: [Function: asciiToHex],
            fromDecimal: [Function: numberToHex],
            fromUtf8: [Function: utf8ToHex],
            fromWei: [Function: fromWei],
            getSignatureParameters: [Function: getSignatureParameters],
            getUnitValue: [Function: getUnitValue],
            hexToAscii: [Function: hexToAscii],
            hexToBytes: [Function: hexToBytes],
            hexToNumber: [Function: hexToNumber],
            hexToNumberString: [Function: hexToNumberString],
            hexToString: [Function: hexToUtf8],
            hexToUtf8: [Function: hexToUtf8],
            isAddress: [Function: isAddress],
            isBN: [Function: isBN],
            isBloom: [Function: isBloom],
            isHex: [Function: isHex],
            isHexStrict: [Function: isHexStrict],
            isTopic: [Function: isTopic],
            jsonInterfaceMethodToString: [Function: jsonInterfaceMethodToString],
            keccak256: [Function],
            numberToHex: [Function: numberToHex],
            padLeft: [Function: leftPad],
            padRight: [Function: rightPad],
            randomHex: [Function: randomHex],
            sha3: [Function],
            soliditySha3: [Function: soliditySha3],
            stringToHex: [Function: utf8ToHex],
            stripHexPrefix: [Function: stripHexPrefix],
            toAscii: [Function: hexToAscii],
            toBN: [Function: toBN],
            toChecksumAddress: [Function: toChecksumAddress],
            toDecimal: [Function: hexToNumber],
            toHex: [Function: toHex],
            toTwosComplement: [Function: toTwosComplement],
            toUtf8: [Function: hexToUtf8],
            toWei: [Function: toWei],
            utf8ToHex: [Function: utf8ToHex] },
         formatters:
          { outputBigNumberFormatter: [Function: outputBigNumberFormatter],
            isPredefinedBlockNumber: [Function: isPredefinedBlockNumber],
            inputDefaultBlockNumberFormatter: [Function: inputDefaultBlockNumberFormatter],
            inputBlockNumberFormatter: [Function: inputBlockNumberFormatter],
            txInputFormatter: [Function: txInputFormatter],
            inputCallFormatter: [Function: inputCallFormatter],
            inputTransactionFormatter: [Function: inputTransactionFormatter],
            inputSignFormatter: [Function: inputSignFormatter],
            outputTransactionFormatter: [Function: outputTransactionFormatter],
            outputTransactionReceiptFormatter: [Function: outputTransactionReceiptFormatter],
            outputBlockFormatter: [Function: outputBlockFormatter],
            inputLogFormatter: [Function: inputLogFormatter],
            outputLogFormatter: [Function: outputLogFormatter],
            inputPostFormatter: [Function: inputPostFormatter],
            outputPostFormatter: [Function: outputPostFormatter],
            inputAddressFormatter: [Function: inputAddressFormatter],
            outputSyncingFormatter: [Function: outputSyncingFormatter] },
         _transactionSigner: TransactionSigner { utils: [Object], formatters: [Object] },
         defaultKeyName: 'web3js_wallet',
         accounts: {},
         accountsIndex: 0,
         wallet:
          Wallet {
            utils: [Object],
            accountsModule: [Circular],
            defaultKeyName: 'web3js_wallet',
            accounts: {},
            accountsIndex: 0 } } }
 */