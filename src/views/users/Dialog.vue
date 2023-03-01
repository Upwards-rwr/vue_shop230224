<template>
<div>
    <el-dialog
        :title=title
        :visible.sync="dialogVisible"
        width="50%"
        @click="dialogClosed">
        <el-form :model="form" :rules="rulesForm" ref="formRef" label-width="70px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <!--  :prop="title=='修改用户' ? '' : rulesForm.password"-->
            <el-form-item label="密码"  prop="password" v-if="title=='添加用户'">
                <el-input v-model="form.password"   ref="passwordRef" ></el-input>
            </el-form-item>
            <el-form-item label="密码"  prop="password2" v-else>
                <el-input v-model="form.password"   ref="passwordRef" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
                <el-input v-model="form.mobile"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogClosed">取 消</el-button>
            <el-button type="primary" @click="ensure">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>
<script>
import pubsub from 'pubsub-js'
export default {
    data(){
                    //验证邮箱的规则
            var checkEmail = (rule,value,cb)=>{
                const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
                if(regEmail.test(value)){
                    //合法邮箱
                    return cb()
                }
                cb(new Error('请输入合法的邮箱'))
            }
            //验证手机号的规则
            var checkMobile = (rule,value,cb)=>{
                //验证手机号的正则表达式
                const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
                if(regMobile.test(value)){
                    //合法邮箱
                    return cb()
                }
                cb(new Error('请输入合法的手机号'))
            }
        return{
            
            dialogVisible:false,
            form:{
                username:'',
                password:'',
                email:'',
                mobile:'',
            },
            rulesForm:{
               username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ],
                password2:[],
                email:[
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    {validator:checkEmail,trigger:'blur'}
                ],
                mobile:[
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    {validator:checkMobile,trigger:'blur'}
                ],
            },
            //标题
            title:'',
            //编辑用户的id
            id:'',
        }
    },
    methods: {
        //监听对话框的关闭事件
        dialogClosed(){
            this.$refs.formRef.resetFields()
            this.dialogVisible = false
        },
        //确定事件
        ensure(){
            if(this.title=='添加用户'){
                this.$refs.formRef.validate(async valid=>{
                if(!valid) return 
                //添加用户网络请求
                const {data:res} = await this.$http.post('/users',this.form)
                if(res.meta.status !== 201){
                    this.$message.error('添加用户失败')
                }
                this.$message.success('添加用户成功')
                //隐藏添加用户的对话框
                this.dialogVisible = false
                //通知父亲组件 重新获取用户列表数据
                this.$bus.$emit('ensure','ensure')
                })
            }else{
                //编辑用户
                //去除编辑密码的规则
                // this.$refs['formRef'].clearValidate('password');
                // this.$refs.formRef.clearValidate('password');
                this.$refs.formRef.validate(async valid=>{
                if(!valid) return 
                //添加用户网络请求
                const {data:res} = await this.$http.put('/users'+this.id,{
                    email:this.form.email,
                    mobile:this.form.mobile
                })
                console.log(res)
                if(res.meta.status !== 201){
                    this.$message.error('更新用户信息失败')
                }
                //关闭对话框
                this.dialogVisible = false
                //通知父亲组件 重新获取用户列表数据
                this.$bus.$emit('ensure','ensure')
                this.$message.success('更新用户成功')
                })
            }
}
    },
    mounted(){
        this.pubId = pubsub.subscribe('addUser',(a,b)=>{
            this.title = b
            this.dialogVisible=true
            // console.log(a,b)
        })
        this.reviseUser = pubsub.subscribe('reviseUser',(a,b)=>{
            this.title = b.title
            let form = b.row
            this.form.username = form.username  
            this.form.email = form.email
            this.form.mobile = form.mobile
            this.id=form.id
            //让password表单项目禁用
            console.log(this.$refs.passwordRef)
            // this.$refs.passwordRef.disable=true
            // this.$refs.passwordRef.disabled=false
        
            this.dialogVisible=true
        })
    },
    beforeDestroy() {
        //pubsub.unsubscribe(pid) // 取消订阅
        pubsub.unsubscribe(this.pubId);
        pubsub.unsubscribe(this.reviseUser);
    },
    
}
</script>
<style lang="less" scoped>
    
</style>