<template>
  
  <Toast />
  <ConfirmPopup />
  <Dialog v-model:visible="importDisplay">
    <template #header>
      <h3>Import your wallet</h3>
    </template>

    Please input your private key or mnemonic words

    <template #footer>
      <InputText v-model="importText" autofocus></InputText>&nbsp;
      <Button label="OK" icon="pi pi-check" @click="importWallet"></Button>
    </template>
  </Dialog>

  <div id="key" v-show="address">

    <Message severity="info" :closable="false">Please save the following credentials, which are the only ones that can control your wallet and do not disclose them to anyone.</Message>

    <Fieldset class="keybox">
      <template #legend>
        Address
      </template>
      <span style="word-break: break-all;">
        <a :href="'/account/' + address">{{ address }}</a>
      </span>
    </Fieldset>

    <Fieldset class="keybox">
      <template #legend>
        Amounts of JB
      </template>
      <span style="word-break: break-all;">
        {{ amount }}
      </span>
    </Fieldset>

    <Fieldset class="keybox">
      <template #legend>
        Private Key
      </template>
      <span style="word-break: break-all;">
        {{ privateKey }}
      </span>
    </Fieldset>

    <Fieldset class="keybox" v-show="mnemonic">
      <template #legend>
        Mnemonic Words
      </template>
      <span>
        {{ mnemonic }}
      </span>
    </Fieldset>

    <Button label="Delete" icon="pi pi-trash" class="p-button-danger" style="margin: 0 1rem 1rem 0rem" @click="delWallet"></Button>
  </div>
  
  <div v-show="!address">
    <Button label="New" icon="pi pi-wallet" style="margin: 0 1rem 1rem 0rem" @click="newWallet"></Button>
    <Button label="Import" icon="pi pi-download" style="margin: 0 1rem 1rem 0rem" @click="showImport"></Button>
  </div>
  

</template>

<script>
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import Fieldset from 'primevue/fieldset';
import Message from 'primevue/message';
import ConfirmPopup from 'primevue/confirmpopup';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';

import { ethers } from 'ethers';

export default {
  data() {
    return {
      address: localStorage.getItem('address'),
      amount: BigInt(0),
      privateKey: localStorage.getItem('privateKey'),
      mnemonic: localStorage.getItem('mnemonic'),
      importDisplay: false,
      importText: null
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
    async newWallet() {
      const wallet = ethers.Wallet.createRandom();
      
      [ this.address, this.privateKey, this.mnemonic ] = [ wallet.address, wallet.privateKey, wallet.mnemonic.phrase ];
      
      const account = await this.getAccount(this.address);
      this.amount = account.amount;

      localStorage.setItem('address', this.address);
      localStorage.setItem('privateKey', this.privateKey);
      localStorage.setItem('mnemonic', this.mnemonic);
    },
    delWallet(event) {
      this.$confirm.require({
          target: event.currentTarget,
          message: 'If you delete and forget your private key (mnemonic words), even if the god comes, you cannot restore your account.',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            [ this.address, this.privateKey, this.mnemonic ] = [ null, null, null ];
            localStorage.clear();
          }
      });
    },
    showImport() {
      this.importDisplay = true;
    },
    async importWallet() {
      let wallet;

      if(!this.importText || !/^0x[a-fA-F0-9]{64}$/.test(this.importText)) { // use mnemonic words
        try {
          wallet = ethers.Wallet.fromMnemonic(this.importText);
        } catch(err) {
          this.$toast.add({ severity: 'error', summary: 'Key error', detail: 'Please input a valid private key / mnemonic words' });
          return;
        }
      }
      try {
        if(!wallet) { // use private key
          console.log('1')
          wallet = new ethers.Wallet(this.importText);
          console.log(wallet)
        }
        if(wallet) {
          [ this.address, this.privateKey ] = [ wallet.address, wallet.privateKey ];
          localStorage.setItem('address', this.address);
          localStorage.setItem('privateKey', this.privateKey);
          if(wallet.mnemonic) {
            this.mnemonic = wallet.mnemonic.phrase;
            localStorage.setItem('mnemonic', this.mnemonic);
          }
          const account = await this.getAccount(this.address);
          this.amount = account.amount;
          this.importDisplay = false;
          
        }
        

      } catch(err) {
        this.$toast.add({ severity: 'error', summary: 'Key error', detail: 'Please input a valid private key / mnemonic words' });
        return;
      }

    }
  },
  components: {
    Button, Toast, Fieldset, Message, ConfirmPopup, Dialog, InputText
  },
  async mounted() {
    if(this.address) {
      const account = await this.getAccount(this.address);
      this.amount = account.amount;
    }
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
