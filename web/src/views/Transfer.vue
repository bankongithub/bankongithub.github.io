<template>
  
  <Toast />
  <div v-show="!clicked">
    <div>
      <InputText type="text" v-model="recvAddr" placeholder="Recipient's public address" style="width: 25rem; margin: 0 1rem 1rem 0rem" />
    </div>
    <div>
      <InputNumber v-model="amount" mode="decimal" placeholder="Amount of the transfer" :min="0" style="width: 25rem; margin: 0 1rem 1rem 0rem" />
    </div>
    <div>
      <InputText type="text" v-model="privateKey" placeholder="Your private key / mnemonic words" style="width: 25rem; margin: 0 1rem 1rem 0rem" />
    </div>
    <Button label="Transfer" icon="pi pi-send" @click="transfer"></Button>
  </div>

  <div id="key" v-show="clicked">
    <Message severity="info" :closable="false">Please new a github issue and fill them into the following value. (If you click the following button, the title will be completed automatically.) The transfer will not arrive in real time, it usually takes a few minutes.</Message>
    <Fieldset class="keybox">
      <template #legend>
        Title
      </template>
      <span style="word-break: break-all;">
        {{ title }}
      </span>
    </Fieldset>
    <Fieldset class="keybox">
      <template #legend>
        Signature
      </template>
      <span style="word-break: break-all;">
        {{ signature }}
      </span>
    </Fieldset>
    <Button label="Go to issue" icon="pi pi-send" @click="goToIssue"></Button>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import Fieldset from 'primevue/fieldset';
import Message from 'primevue/message';

import { ethers } from 'ethers';

export default {
  data() {
    return {
      recvAddr: null,
      amount: null,
      privateKey: localStorage.getItem('privateKey'),
      title: null,
      signature: null,
      clicked: false
    }
  },
  methods: {
    async getAccount(address) {
        try {
          const req = await fetch(`/accounts/${address}.json?t=${Math.random()}`);
          const res = await req.json();
          return { address, amount: BigInt(res.amount), lastSignature: res.lastSignature };
        } catch(err) {
          return { address, amount: BigInt(0), lastSignature: '*'};
        }
    },
    async transfer() {
      let wallet;

      if(!this.privateKey || !/^0x[a-fA-F0-9]{64}$/.test(this.privateKey)) { // use mnemonic words
        try {
          wallet = ethers.Wallet.fromMnemonic(this.privateKey);
        } catch(err) {
          this.$toast.add({ severity: 'error', summary: 'Key error', detail: 'Please input a valid private key / mnemonic words' });
          return;
        }
      }

      if(!this.recvAddr || !/^0x[a-fA-F0-9]{40}$/.test(this.recvAddr)) {
        this.$toast.add({ severity: 'error', summary: 'Address error', detail: 'Please input a valid address' });
        return;
      }
      if(!this.amount || !/(^[1-9]\d*$)/.test(this.amount)) {
        this.$toast.add({ severity: 'error', summary: 'Amount error', detail: 'Please input a valid amount' });
        return;
      }
      
      try {
        if(!wallet) { // use private key
          wallet = new ethers.Wallet(this.privateKey);
        }
        const sendAddr = wallet.address;
        const account = await this.getAccount(sendAddr);
        if(account.amount < BigInt(this.amount)) {
          this.$toast.add({ severity: 'error', summary: 'Not enough amount', detail: 'You don\'t have enough amount to transfer' });
          return;
        }
        if(sendAddr === this.recvAddr) {
          this.$toast.add({ severity: 'error', summary: 'Cannot transfer to yourself', detail: 'Please transfer to others' });
          return;
        }
        const lastSignature = account.lastSignature;
        const signJSON = JSON.stringify([ sendAddr, this.recvAddr, BigInt(this.amount).toString(), lastSignature ]);
        this.title = `[Transfer] ${sendAddr} -> ${this.recvAddr}: ${this.amount}`;
        this.signature = await wallet.signMessage(signJSON);
        this.clicked = true;
        
      } catch(err) {
        this.$toast.add({ severity: 'error', summary: 'Unknown error', detail: 'Please check your input' });
      }
    },
    async goToIssue() {
      window.open(`https://github.com/bankongithub/bankongithub.github.io/issues/new?assignees=&labels=&template=transfer.md&title=${this.title}`, '_blank');
    }
  },
  components: {
    InputText, InputNumber, Button, Toast, Fieldset, Message
  }

};
</script>

<style>
#key {
  margin: 0 10vw;
}

.keybox {
  margin-bottom: 2rem;
}
</style>
