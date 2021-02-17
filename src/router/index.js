import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/welcome.vue';
import User from '../components/user/User.vue';
import Rights from '../components/power/Right.vue';
import Roles from '../components/power/role.vue';
import Categroy from '../components/goods/category.vue';
import Classification from '../components/Classification/Classification.vue';
import List from '../components/list/list.vue'
import Order from '../components/Order/order.vue'
import Report from '../components/report/report.vue'
import EchartLine from '../components/E-Chart/echart_line_view.vue';
import EchartBar from '../components/E-Chart/bargraph/chart/Keyboard_view.vue'
Vue.use(Router)

const routes = [
    { path: '', redireact: 'login' },
    { path: '/login', component: Login },
    {
        path: '/home',
        component: Home,
        redireact: '/welcome',
        children: [
            { path: '/welcome', component: Welcome },
            { path: '/users', component: User },
            { path: '/rights', component: Rights },
            { path: '/roles', component: Roles },
            { path: '/categories', component: Categroy },
            { path: '/params', component: Classification },
            { path: '/goods', component: List },
            { path: '/orders', component: Order },
            { path: '/reports', component: Report },
            { path: '/monitor', component: EchartLine },
            { path: '/eBar', component: EchartBar }
        ]
    }

]


const router = new Router({
    routes
})
//路由 守卫
router.beforeEach((to, from, next) => {
    if (to.path == '/login') {
        return next()
    }
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) {
        return next('/login')
    }
    next();
})

export default router
