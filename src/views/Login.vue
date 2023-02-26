<template>
    <div class="login_container">
 
        <div class="login_box">
            <div class="login_tou">
                <img src="./../assets/image/0.png" alt="">
            </div>
            <el-form ref="form" :model="form" :rules="rules">
                <el-form-item prop="username">
                    <el-input v-model="form.username" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item prop="password"> 
                    <el-input v-model="form.password" prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                <el-form-item class="elButton">
                   
                <el-button type="primary" @click="submitForm">登录</el-button>
                <el-button @click="resetForm">重置</el-button>
                
                </el-form-item>
            </el-form>
            
             
        </div>
    </div>
</template>

<script>

export default{
     data() {
      return {
        form: {
            
          username: 'admin',
          password: '123456',
        },
         rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 6, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
         } 
      }
    },
    methods:{
        submitForm(){
                this.$refs.form.validate(async(valid) => {
                if (valid) {
                    //发送请求
                    const {data: res} = await this.$http.post("/login",this.form)
                    console.log(res)
                    if(res.meta.status !== 200){
                        this.$message({
                            message: '登录失败',
                            type: 'warning'
                        });
                    }else{
                        this.$message({
                                message: '登录成功',
                                type: 'success'
                        });
                        window.sessionStorage.setItem("token",res.data.token);
                        this.$router.push('/home')
                    }
                    
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
        },
        resetForm(){
            // console.log( this.$refs.form)
            this.$refs.form.resetFields();
            // this.form={
            //     name: '',
            //     password: '',
            // }
            
        }
    }
    
}
</script>

<style scoped lang="less">
.login_container{
    background: #2b4b6b;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items:center;
    
}
.login_box{
    width:450px;
    height: 300px;
    background: #fff;
    border-radius: 3px;
    position: relative;
    
}
.login_tou{
    background: rgb(255, 255, 255);
    width: 100px;
    height: 100px;
    position: absolute;
    top:-50px;
    left:50%;
    transform:translateX(-50%);
    border-radius: 50%;
}
.login_tou img{
    width:100%;
    height: 100%;
}
.el-form{
    margin-top: 80px;
    padding: 0 20px;
    
}
.el-form-item{
    margin-bottom: 30px;
}
.el-input__icon{
    font-size: 20px;
}
.elButton{
position: absolute;
right: 20px;
}
.el-button{
margin-right: 20rpx;
}
</style>
