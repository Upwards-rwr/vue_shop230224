<template>
    <div class="viewContain">
    <el-container>
        <el-header>
            <div class="headImg">
                <img src="./../assets/image/0.png" alt="">
                <h2>电商后台管理系统</h2>
            </div>
            <el-button type="info" @click="logout" class="logout">退出</el-button>
        </el-header>
        <el-container>
            <el-aside :width="Collapse?'64px':'200px'">
                <nav-Left v-on:toggleCollapse="isCollapse"   ></nav-Left>
            </el-aside>
            <el-main>
                <bread-crumb></bread-crumb>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
    </div>
</template>
<script>
import NavLeft from "@/components/nav.vue"
import breadCrumb from "@/components/breadCrumb.vue"
export default {
data(){
    return {
        Collapse:false,
    }
},
components: {
    NavLeft,
    breadCrumb
},
created(){
    // this.isCollapse()
},
methods:{
    isCollapse(data){
        // console.log(data)
       this.Collapse=data
    },
    logout(){
          window.sessionStorage.clear();
          this.$router.push("/login")
    },
      
},

}
</script>
<style lang="less" scoped>
 .el-header{
     background: #373d41;
 }   
 .el-aside{
     background: #333444;
 }
 .el-mian{
     background: #EAEDF1;
 }
 .el-container{
     height: 100vh;
 }
 .el-header .logout{
     float: right;
     margin-right: 20px;
     margin-top: 10px;
 }
 .el-header .headImg{
     float: left;
     height: 100%;
     width: 260px;
    //  background: red;
 }
 .el-header .headImg img{
     float:left;
     height: 100%;
 }
</style>