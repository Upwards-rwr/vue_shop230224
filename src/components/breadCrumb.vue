<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in breaList" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>
export default {
    data(){
        return {
            breaList:[],
        }
    },
    watch:{
        $route(){
            this.getBreadcrumb()
        }
    },
    methods:{
        getBreadcrumb(){
            this.breaList = this.$route.meta.bread?this.$route.meta.bread:[];
            // console.log(this.breaList)
        }
    },
    created(){
        this.getBreadcrumb()
    }
}
</script>
<style lang="less" scoped>
 .el-breadcrumb{
     margin-bottom: 10px;
 }   
</style>