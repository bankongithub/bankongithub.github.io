// app.js

import { getInput, setOutput, setFailed } from '@actions/core';
import { context } from '@actions/github';
import fetch from 'node-fetch';

import eth from './eth.js';
import account from './account.js';

try {
  const url = context.payload.issue.url;
  const issue = await(await fetch(url)).json();
  if(issue.locked) {
    const operate = issue.title;
    const signature = issue.body;
    
    if(/^\[Transfer\] 0x[a-fA-F0-9]{40} -> 0x[a-fA-F0-9]{40}: [1-9]\d*$/.test(operate)) {
      // Transfer operate
      const [sendAddr, recvAddr] = operate.match(/0x[a-fA-F0-9]{40}/g);
      const amount = BigInt(operate.match(/[1-9]\d*$/));
      const sender = await account.get(sendAddr);
      const signJSON = JSON.stringify([ sendAddr, recvAddr, amount.toString(), sender.lastSignature ]);
      if(eth.verifyMessage(sendAddr, signJSON, signature)) {
        if(await account.transfer(sendAddr, recvAddr, amount, signature)) {
          setOutput('result', 'accept');
        } else {
          setOutput('result', 'reject');
        }
      } else {
        console.error('[reject] signature failure');
        setOutput('result', 'reject');
      }
    } else {
      console.error('[reject] format failure');
      setOutput('result', 'reject');
    }
  } else {
    console.error('[reject] unlocked means unsafe');
    setOutput('result', 'reject');
  }
} catch (error) {
  setFailed(error.message);
}