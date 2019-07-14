const Web3 = require('web3');
import * as walletCrack from '../index';

const initWeb3 = (net: string = process.env.MAINNET) => {
    const web3 = new Web3(new Web3.providers.HttpProvider(net));
    return web3;
}

export const createAccountFromPrivateKey = (privateKey: string, net: string = process.env.MAINNET) => {
    if(net !== process.env.MAINNET
        && net !== process.env.KOVAN
        && net !== process.env.RINKEBY
        && net !== process.env.ROPSTEN) {
            throw new Error("net param value must be one of 4 networks listed in .env file")
        }

    const web3 = initWeb3(net);
    return web3.eth.accounts.privateKeyToAccount(privateKey);
}

export const createAccountFromNumber = (number: number, net: string = process.env.MAINNET) => {
    const privKey = walletCrack.createWalletPrivateKeyFromNumber(number);
    return createAccountFromPrivateKey(privKey, net);
}

export const checkBalances = (privateKey: string, net: string = process.env.MAINNET) => {
    const web3 = initWeb3(process.env.ROPSTEN);
    const account = createAccountFromPrivateKey(privateKey, net);

    return web3.eth.getBalance(account.address);
    /*web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0]));
    web3.fromWei(web3.eth.getBalance(web3.eth.accounts[1]));
    web3.fromWei(web3.eth.getBalance(web3.eth.accounts[2]));*/
}
/*function checkAllBalances() { 
    var i =0; 
    eth.accounts.forEach( 
        function(e){ 
            console.log("  eth.accounts["+i+"]: " +  e + " \tbalance: " + web3.fromWei(eth.getBalance(e), "ether") + " ether"); i++; 
        }
    )
}; */



export default createAccountFromNumber;

