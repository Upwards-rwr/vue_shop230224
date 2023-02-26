<template>
    <div>
        <div class="togger-button" @click="toggleCollapse">
            |||
        </div>
        <el-menu
        :router="true"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#409EFF"
        :collapse="isCollapse"
        >
             <menus v-for="(item,index) in menuList" :menu="item" :key="index"></menus>
        </el-menu>
    </div>
</template>
<script>
import menus from "./menu.vue";
export default {
    data(){
        return {
            isCollapse:false,
            menuList:[]
        }
    },
   components: {
         menus 
  },
  created(){
      this.getMenuList()
  },
  methods:{
      async getMenuList(){
          const {data:res} = await this.$http.get('/menus')
          if(res.meta.status !== 200){
              return this.$message.error(res.meta.msg)
          }
          this.menuList = res.data
        //   console.log(res)
      },
      //点击按钮切换菜单折叠和展开
      toggleCollapse(){
          this.isCollapse = !this.isCollapse
      }
  }
}
</script>
<style lang="less" scoped>  

.el-menu{
    border: 0;
}
.togger-button{
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>