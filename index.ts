const number_to_base = require("number-to-base");

export const randomIntFromInterval = (min: number = 0, max:number = 10) => // min and max included
{
    return Math.floor(Math.random() * Math.floor(max));
}

export const constructRemainingDigits = (currentDigits: string) => {
    const hexDigitToAppend = "0";
    let finalHex = "";
    const digitLength = 64;
    let iterations: number = digitLength - currentDigits.length;

    if(digitLength > currentDigits.length) {
        for(var c = 0;c < iterations;c++) {
            finalHex += hexDigitToAppend;
        }
        finalHex += currentDigits;
    } else {
        throw new Error("currentDigits param must have length property value less than or equal to 64");
    }

    return finalHex;
}

export const convertNumToHexString = (number: number, base: number = 16) => {
    const hex = number_to_base(number, base);
    return constructRemainingDigits(hex);
}

export const convertHexStringToNum = (hexString: string, base: number = 16) => {
    return parseInt(hexString, 16);
}

export const createWalletPrivateKeyFromNumber = (num: number) => {
    return convertNumToHexString(num);
}

export default createWalletPrivateKeyFromNumber;