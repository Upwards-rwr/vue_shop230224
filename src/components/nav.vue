<template>
    <div>
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
        :default-active="activePath"
        :collapse-transition="false"
        :collapse="isCollapse"
        unique-opened
        :router="true"
        background-color="#333744"
        text-color="#fff"
        active-text-color="#ffd04b">
        <!-- 一級菜單 -->
        <el-submenu :index="item.path" v-for="item in menuList" :key="item.id">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
            <i :class="iconsObj[item.id]"></i>
            <span>{{item.authName}}</span>
            </template>
        <!-- 二级菜单 -->
            <el-menu-item 
            :index="item2.path"
             v-for="item2 in item.children" 
             @click="saveNavState(item2.path)"
             :key="item2.id">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>{{item2.authName}}</span>
                </template>
            </el-menu-item>
        </el-submenu>
    
        </el-menu>
    </div>
</template>
<script>
export default {
    data(){
        return{
            //高亮显示
            activePath:'',
            isCollapse:false,
            menuList:[],
            iconsObj:{
                147: 'el-icon-magic-stick',
               125: 'iconfont icon-users',
               103: 'iconfont icon-tijikongjian',
               101: 'iconfont icon-shangpin',
               102: 'iconfont icon-danju',
               145: 'iconfont icon-baobiao'
            }
        }
    },
    created(){
        this.getMenuList()
        this.activePath = window.sessionStorage.getItem('activePath')
    },
    methods:{
        async getMenuList(){
            const {data:res} = await this.$http.get('/menus')
            if(res.meta.status !== 200) return this.$message.error(res.mata.msg)
            this.menuList = res.data
      
        },
        toggleCollapse(){
            this.isCollapse=!this.isCollapse
            this.$emit('toggleCollapse',this.isCollapse)

        },
        saveNavState(activePath){
           window.sessionStorage.setItem('activePath', activePath)
           this.activePath=activePath
        },
     
    }
}
</script>
<style lang="less" scoped>
 .iconfont{
     margin-right: 10px;
 } 
 
 .el-menu{
     border-right:none;
 }  
 .toggle-button{
     background: #4a5064;
     font-size: 10px;
     line-height: 24px;
     color: #fff;
     text-align:center;
     letter-spacing: 0.2em;
     cursor:pointer;
 }
</style>