import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/comics',
      name: 'comics',
      component: () => import('../views/ComicsView.vue')
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('../views/UploadView.vue')
    },
    {
      path: '/c/:id',
      name: 'comic',
      component: () => import('../views/ComicView.vue')
    },
    {
      path: '/view/c/:id',
      name: 'comicReaderView',
      component: () => import('../views/ComicReaderView.vue')
    },
    {
      path: '/tags',
      name: 'tags',
      component: () => import('../views/TagsView.vue')
    }
  ]
})

export default router
