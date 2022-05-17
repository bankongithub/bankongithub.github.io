import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('../views/Index.vue')
    },
    {
      path: '/account/:address',
      name: 'Account',
      component: () => import('../views/Account.vue')
    },
    {
      path: '/account',
      redirect: localStorage.getItem('address')?`/account/${localStorage.getItem('address')}`:'/'
    },
    {
      path: '/transfer',
      name: 'Transfer',
      component: () => import('../views/Transfer.vue')
    },
    {
      path: '/wallet',
      name: 'Wallet',
      component: () => import('../views/Wallet.vue')
    }
  ]
})

export default router