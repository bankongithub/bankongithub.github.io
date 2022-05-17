import { ethers } from 'ethers';

// create an eth wallet
const wallet = ethers.Wallet.createRandom();
const mnemonic = wallet.mnemonic;
const privateKey = wallet.privateKey;
const address = wallet.address;

// debug info
console.log('privateKey =', privateKey);
console.log('address =', address);

// message
const message = 'This is a message.';
console.log('message =', message);

// generate signature
let signature = await wallet.signMessage(message);
console.log('signature =', signature);

// verify signature
let verify = ethers.utils.verifyMessage(message, signature);
console.log('verify =', verify === address);
