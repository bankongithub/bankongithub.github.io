// account.js

import { readFile, writeFile } from 'fs/promises';

const accounts_path = (address) => `./web/public/accounts/${address}.json`;

const get = async (address) => {
  try {
    const ctx = await readFile(accounts_path(address));
    const account = JSON.parse(ctx.toString());
    const { amount, lastSignature } = account;
    return { address, amount: BigInt(amount), lastSignature };
  } catch(err) {
    return { address, amount: BigInt(0), lastSignature: '*'};
  }
}

const set = async (account) => {
  try {
    const { address, amount, lastSignature } = account;
    await writeFile(accounts_path(address), JSON.stringify({ amount: amount.toString(), lastSignature }));
    return true;
  } catch(err) {
    return false;
  }
}

const transfer = async (sendAddr, recvAddr, amount, signature) => {
  try {
    if(sendAddr === recvAddr) {
      console.error('[reject] sendAddr === recvAddr');
      return false;
    }
    if(amount <= 0) {
      console.error('[reject] amount <= 0 is not allow');
      return false;
    }

    const sender = await get(sendAddr);
    
    if(sender.amount < amount) {
      console.error('[reject] amount not enough');
      return false;
    }

    const recver = await get(recvAddr);

    const sender_rollback = sender;
    
    sender.amount -= amount;
    recver.amount += amount;
    sender.lastSignature = signature;

    const sendResult = await set(sender);
    if(!sendResult) {
      console.error('[reject] send failed, stop');
      return false;
    }
    const recvResult = await set(recver);
    if(sendResult && recvResult) {
      console.log('[accept] transfer has been done successfully');
      return true;
    } else {
      // try to rollback
      const rollback_result = await set(sender_rollback);
      if(rollback_result) {
        console.error('[reject] send ok, recv failed, rollback ok');
      } else {
        // dirty
        console.error('[reject] send ok, recv failed, rollback failure!!!');
      }
      return false;
    }
  } catch(err) {
    console.error('[reject] unknown error', err);
    return false;
  }
}

export default { get, transfer };
