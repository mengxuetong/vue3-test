import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// const About = () => import('../views/AboutView.vue')
// const Watch = () => import('../views/Watch.vue')
// const Util = () => import('../views/Util.vue')
// const Advance = () => import('../views/Advance.vue')
// const Lifecycle = () => import('../views/Lifecycle.vue')
// const UsageStore = () => import('../views/UsageStore.vue')


const pages = import.meta.glob('../views/**/page.js', {
  eager: true,
  import: 'default'
})
const pageComs = import.meta.glob('../views/**/index.vue')

const routes = Object.entries(pages).map(([path, meta]) => {
  const pageJspath = path
  path = path.replace('../views', '').replace('/page.js', '')
  path = path || '/'
  const name = path.split('/').filter(Boolean).join('-')
  const commsPath = pageJspath.replace('page.js', 'index.vue')

  return {
    name,
    path,
    component: pageComs[commsPath],
    meta
  }
})
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
router.afterEach((to, from) => {
  // document.title =  to.meta.title
})
export default router
