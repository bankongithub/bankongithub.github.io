<template>
  <perfect-scrollbar>
    <TabMenu :model="items" class="nav" />
    <router-view></router-view>
  </perfect-scrollbar>
</template>

<script>
import TabMenu from 'primevue/tabmenu';

export default {
	data() {
		return {
			items: [
        { label: 'Home', icon: 'pi pi-fw pi-home', to: '/' },
        { label: 'Transfer', icon: 'pi pi-fw pi-send', to: '/transfer' },
        { label: 'Wallet', icon: 'pi pi-fw pi-wallet', to: '/wallet' },
        { label: 'GitHub', icon: 'pi pi-fw pi-github', url: 'https://github.com/bankongithub' }
      ]
		}
	},
  components: {
    TabMenu
  }
}
</script>

<style>
body {
  background-color: #dee2e6;
  margin: 0 auto;
  text-align: center;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.nav {
  margin-bottom: 2rem;
}

.p-tabmenuitem {
  display: grid;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.ps {
  height: 100vh;
}

</style>