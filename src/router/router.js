import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
    routes:[
        {
            path:"/login",
            name:"login",
            // meta:{bread:["订单管理","所有订单"]},
            component:()=>import("./../views/Login.vue")
        },
        {
           path:"/" ,
           redirect:'/login'
        },
        {
            path:"/home",
            name:"home",
            redirect:'/welcome',
            // meta:{bread:["订单管理","所有订单"]},
            component:()=>import("./../views/Home.vue"),
            children:[
                {
                    path:'/welcome',
                    component:()=>import("./../views/Welcome.vue"),
                    
                }
            ]
        },
    ]
})
//挂载路由导航守卫
router.beforeEach((to,from,next)=>{
    if(to.path == '/login') return next()
    const tokenStr = window.sessionStorage.getItem('token')
    if(!tokenStr) return next('/login')
    next()
})
export default router