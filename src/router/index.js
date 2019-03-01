import Vue from 'vue'
import App from '../App'
import Router from 'vue-router'
import HomePage from '@/home/HomePage'
import LoginPage from '@/login/LoginPage'
import Index from '@/components/Index'
import History from '@/components/History'
import Notifications from '@/components/Notifications'




Vue.use(Router)

const router = new Router({
  mode: 'history',
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    },
  routes: [
    { path: '/',name: 'HomePage', component: HomePage,
     children: [
        { path: '', name: 'Index', component: Index },
        { path: 'History', name: 'History', component: History },
        { path: 'Notifications', name: 'Notifications', component: Notifications },
    ]},
    { path: '/login', component: LoginPage },

    // otherwise redirect to home
    { path: '*', redirect: '/' }

  ],
  linkActiveClass: "active", // active class for non-exact links.
  linkExactActiveClass: "active" // active class for *exact* links.
});
export default router

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  
  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})


