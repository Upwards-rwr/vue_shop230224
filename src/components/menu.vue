<template>
    <div>
        
        <!-- 一级菜单 -->
            <el-submenu v-if="menu.children"  :index="menu.path">
                    <template slot="title">
                        <i :class="icon[menu.id]"></i>
                        <span slot="title">{{menu.authName}}</span>
                    </template>
                    <!-- 二级菜单 -->
                    <nav-menu v-for="(item,index) in menu.children" :menu="item" :key="index"></nav-menu>
            </el-submenu>
            <el-submenu-item v-else :index="menu.path" >
                        <i :class="icon[menu.id]"></i>
                        <span slot="title">{{menu.authName}}</span>
            </el-submenu-item>

       
    </div>
</template>
<script>
export default{
    name:"NavMenu",
    data(){
        return{
            icon:{
               147: 'el-icon-magic-stick',
               125: 'iconfont icon-users',
               103: 'iconfont icon-tijikongjian',
               101: 'iconfont icon-shangpin',
               102: 'iconfont icon-danju',
               145: 'iconfont icon-baobiao'
            }
        }
    },
    props:{
        menu:{
            type:Object,
            required: true
        }
    },
    mounted(){

    }
     
}
</script>
<style lang="less" scoped>
  
</style>
