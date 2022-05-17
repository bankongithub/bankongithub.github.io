<template>
  <img src="../assets/logo.png" />
  <h1>Welcome to the Bank on GitHub</h1>
  <Toast />
  <div>
    <InputText type="text" v-model="address" placeholder="Public address" style="width: 25rem; margin: 0 1rem 1rem 0rem" />&nbsp;
    <Button label="Search" icon="pi pi-search" style="margin: 0 1rem 1rem 0rem" @click="search"></Button>
  </div>

  <Card style="width: 20rem; margin: 2rem 1rem 1rem 1rem; display: inline-block;">
    <template #title>
      What is Bank on GitHub?
    </template>
    <template #content>
      <p>Bank on GitHub is a bank system based on GitHub (especially GitHub Actions). We used ETH wallet algorithm to protect your money, all the transactions will be deposited on the issue, so if you want to make a transfer, just new a issue (with ETH private key signature when sending). If you want to start, just generate an ETH wallet!</p>
    </template>
  </Card>

  <Card style="width: 20rem; margin: 0 1rem 1rem 1rem; display: inline-block;">
    <template #title>
      Can I create my private bank with this project?
    </template>
    <template #content>
      <p>Of course! You can fork the project and deploy it privately. The only thing you need to do is following the LICENSE. Don't forget to star this repository and follow the <a href="https://github.com/mmdjiji">author</a>! One thing should be noted that this project is not on Ethereum blockchain or any other blockchain but just used the wallet algorithm of ETC.</p>
    </template>
  </Card>
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import Card from 'primevue/card';

export default {
  data() {
    return {
      address: null
    }
  },
  methods: {
    search() {
      if(/^0x[a-fA-F0-9]{40}$/.test(this.address)) {
        this.$router.push(`/account/${this.address}`);
      } else {
        this.$toast.add({ severity: 'error', summary: 'Address error', detail: 'Please input a valid address' });
      }
    }
  },
  components: {
    InputText, Button, Toast, Card
  }
};

</script>
