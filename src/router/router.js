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
                    
                },
                {
                    path:'/users',
                    component:()=>import('./../views/users/users.vue'),
                    meta:{bread:['用户管理','用户列表']}
                },
                {
                    path:'/roles',
                    component:()=>import('./../views/power/Roles.vue'),
                    meta:{bread:['权限管理','角色列表']}
                },
                {
                    path:'/rights',
                    component:()=>import('./../views/power/Rights.vue'),
                    meta:{bread:['权限管理','权限列表']}
                },
                {
                    path:'/Categories',
                    component:()=>import('./../views/goods/Categories.vue'),
                    meta:{bread:['商品管理','分类参数']}
                },
                {
                    path:'/goods',
                    component:()=>import('./../views/goods/Goods.vue'),
                    meta:{bread:['商品管理','商品列表']}
                },
                {
                    path:'/params',
                    component:()=>import('./../views/goods/Params.vue'),
                    meta:{bread:['商品管理','分类参数']}
                },
                {
                    path:'/reports',
                    component:()=>import('./../views/report/Report.vue'),
                    meta:{bread:['数据报表','数据统计']}
                },
                {
                    path:'/orders',
                    component:()=>import('./../views/order/Order.vue'),
                    meta:{bread:['数据报表','数据统计']}
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