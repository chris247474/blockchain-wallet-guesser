

export const convertNumToHexString = (number: Number) => {
    if (number < 0)
    {
      number = 0xFFFFFFFF + number + 1;
    }
  
    return number.toString(16).toUpperCase();
}

export const convertHexStringToNum = (hexString: string) => {
    return parseInt(hexString, 16);
}