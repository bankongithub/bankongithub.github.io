<template>

  <div id="key">
    <Fieldset class="keybox">
      <template #legend>
        Address
      </template>
      <span style="word-break: break-all;">{{ address }}</span>
    </Fieldset>

    <Fieldset class="keybox">
      <template #legend>
        Amounts of JB
      </template>
      <span style="word-break: break-all;">
        {{ amount }}
      </span>
    </Fieldset>
  </div>

  <Button label="Show Transactions" icon="pi pi-history" class="p-button" style="margin: 0 1rem 1rem 0rem" @click="showTransactions"></Button>
</template>

<script>
import Fieldset from 'primevue/fieldset';
import Button from 'primevue/button';

export default {
  data() {
    return {
      address: this.$route.params?.address,
      amount: BigInt(0)
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
    async showTransactions() {
      window.open(`https://github.com/bankongithub/bankongithub.github.io/issues?q=${this.address}`, '_blank');
    }
  },
  components: {
    Fieldset, Button
  },
  async mounted() {
    if(this.address && /^0x[a-fA-F0-9]{40}$/.test(this.address)) {
      const account = await this.getAccount(this.address);
      this.amount = account.amount;
    } else {
      this.$router.push('/');
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