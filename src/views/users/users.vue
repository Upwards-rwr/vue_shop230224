<template>
    <div>
        <el-card>
            <el-row :gutter="20" style="margin-bottom: 20px">
                <el-col :span="8">
                    <div>
                        <el-input placeholder="请输入内容" v-model="queryInfo.query" class="input-with-select" clearable  @clear="getUserListData">
                            <el-button slot="append" icon="el-icon-search" @click="getUserListData"></el-button>
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div>
                        <el-button type="primary" @click="addUser">添加用户</el-button>
                    </div>
                </el-col>
            </el-row>
            <el-row style="margin-bottom: 20px">
                 <el-table :data="userList" border stripe style="width: 100%">
                    <el-table-column label="#" type="index"></el-table-column>
                    <el-table-column prop="username" label="姓名"></el-table-column>
                    <el-table-column prop="email" label="邮箱"></el-table-column>
                    <el-table-column prop="mobile" label="电话"></el-table-column>
                    <el-table-column prop="role_name" label="角色"></el-table-column>
                    <el-table-column  label="状态">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column  label="操作" width="180px">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-edit" size="mini" @click="reviseUser(scope.row)"></el-button>
                            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row.id)"></el-button>
                            <el-tooltip class="item" effect="dark" content="分配角色" :enterable="false">
                                <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <!-- 分页 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[2, 5, 8, 10]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>
        <my-dialog></my-dialog>   
    </div>
</template>
<script>
import pubsub from 'pubsub-js'
import myDialog from './Dialog.vue'
export default {
   data(){
       return {
           input:'',
           //获取用户列表参数对象
           queryInfo:{
               query:'',
               pagenum:1,
               pagesize:10,
           },
           userList:[],
           total:0,
       }
    },
    components:{
        myDialog
    },
   created(){
       this.getUserListData()
   },
   methods:{
       //获取用户列表数据
       async getUserListData(){
            const {data: res} = await this.$http.get("/users",{params:this.queryInfo})
            if(res.meta.status !== 200) return this.$message.error('获取用户列表失败')
            this.userList = res.data.users
            this.total = res.data.total
            // console.log(this.userList)
       },
       //监听最新的pagesize改变事件
       handleSizeChange(newSize){
        //    console.log(newSize)
           this.queryInfo.pagesize = newSize
           this.getUserListData()
       },
       //监听页码值改变的事件
        handleCurrentChange(newPage){
        //    console.log(newPage)
           this.queryInfo.pagenum = newPage   
           this.getUserListData()
       },
       //改變用户状态
       async userStateChanged(userInfo){
           const {data:res}=await this.$http.put(`/users/${userInfo.id}/state/${userInfo.mg_state}`)
           if(res.meta.status !== 200){
               userInfo.mg_state = !userInfo.mg_state
               return this.$message.error('更新用户状态失败！')
           }
           this.$message.success('更新用户状态成功')
       },
       //点击添加用户事件
       addUser(){
           //发送添加用户的信号
           pubsub.publish('addUser','添加用户')
       },
       //点击修改用户
       reviseUser(row){
           //发送添加用户的信号
           pubsub.publish('reviseUser',{
               titie:'修改用户',
               row:row
           })
       },
       //delete删除用户
       async deleteUser(id){
            const {data: res} = await this.$http.delete("/goods/:id",{params:this.queryInfo})
            if(res.meta.status !== 200) return this.$message.error('获取用户列表失败')
            
       }
   },
   mounted(){
       //接受ensure修改和添加用户成功事件
       this.$bus.$on('ensure',(data)=>{
           if(data) {
                 console.log(data)
               this.getUserListData()
           }
       })
   }
}
</script>
<style lang="less" scoped>
 
</style>