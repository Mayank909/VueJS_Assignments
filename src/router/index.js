import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home.vue";
import Dashboard from "@/views/Dashboard/Dashboard.vue";
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    children: [
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/AboutView.vue')
      },
      {
        path: '/product',
        name: 'product',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Dashboard/Product.vue')
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Dashboard/Product.vue')
      },
      {
        path: '/category',
        name: 'category',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Dashboard/ProductCategory.vue')
      },
      {
        path: '/productCategoryUpdate/:id',
        name: 'productCategoryUpdate',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Dashboard/ProductCategoryUpdate.vue')
      },
      {
        path: '/productUpdate',
        name: 'productUpdate',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Dashboard/ProductUpdate.vue')
      }
    ]
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
