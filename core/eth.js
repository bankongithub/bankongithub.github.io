import { ethers } from 'ethers';

const randomWallet = () => ethers.Wallet.createRandom();

const signMessage = (wallet, message) => wallet.signMessage(message);

const verifyMessage = (publicKey, message, signature) => ethers.utils.verifyMessage(message, signature) === publicKey;

export default { randomWallet, signMessage, verifyMessage };