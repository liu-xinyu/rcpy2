<template>
<div class="main">
    <div class="login">
        <div class="logintop">
            <h3>人才培养计划填报管理系统</h3>
        </div>
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" label-width="0px" class="login_form">
            <el-form-item prop="username">
                <el-input prefix-icon="iconfont icon-touxiang" v-model="loginForm.username" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input  prefix-icon="iconfont icon-mima" v-model="loginForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item class="btns" >
                 <el-button type="primary" @click="login">登录</el-button>
                 <el-button type="info" @click="reset">重置</el-button>
            </el-form-item>
            
        </el-form>
       
    </div>
</div>
  
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
        //这是登录表单的数据绑定对象
     loginForm:{
         username:'教务处',
         password:'123'
     },
     loginRules:{
         username:[
            { required: true, message: '请输入账号密码', trigger: 'blur' },
            { min: 3, max:10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
         ],
         password:[
            { required: true, message: '请输入账号密码', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
         ]
     }
    }
  },
  methods:{
    //点击重置按钮，重置登录表单
    reset(){
        this.$refs.loginFormRef.resetFields();
    },
    login(){
        this.$refs.loginFormRef.validate(async valid=>{
            if(!valid) return;
            var result=await this.axios.post('/rcpy/loginServlet?operation=login', 
                this.$qs.stringify({
                    username: this.loginForm.username,
                    password: this.loginForm.password
                }));
            var {data}=result;
            console.log(data);
           
            if(data!==1){
                return this.$message.error('账号或者密码输入错误,请重新输入~~~~')
            }
           
            this.$router.push('/home')
        })
        
       
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.main{
    height: 100%;
    background:url(../assets/11.jpg);
}
.login{
    
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 300px;
    height: 300px;
    background-color: rgb(255, 255, 255,0.6);
    border-radius: 5%;
    
}
.logintop{
    width: 100%;
    border-bottom: 1px solid black;
    text-align: center;
}
.login_form{
    position: absolute;
    bottom: 10px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
.btns{
    display: flex;
    justify-content:flex-end;
}

</style>
