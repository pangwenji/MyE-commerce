<<template>
    <div class="login-contanier">
         <div class="login-box">
             <div class="avater-box">
                 <img   src="../assets/logo.png" alt="" />
             </div>

             <el-form  ref="loginFormRef" :model= "form"class="login-form"  :rules="rulesForm">
                 <el-form-item prop="username">
                     <el-input v-model="form.username" prefix-icon="el-icon-search"></el-input>
                  </el-form-item>

                   <el-form-item prop="password">
                     <el-input type="password" v-model="form.password" prefix-icon="el-icon-search"></el-input>
                  </el-form-item>

                   <el-form-item class="btns">
                     <el-button type="primary" @click="login">登录</el-button>
                     <el-button type="info" @click="resetLoginForm">重置</el-button>
                  </el-form-item>
             </el-form>
         </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
              form:{
                  username:"admin",
                  password:"123456"
              },
              rulesForm:{
                  username:[
                      {required: true, message: "请输入用户名", trigger: "blur"},
                      {min: 3,max:10,message: "长度在3到10之间",trigger:"blur"}
                  ],
                  password:[
                      {required: true, message: "请输入密码", trigger: "blur"},
                      {min: 6,max:16,message: "长度在6到15之间",trigger:"blur"}
                  ]
              } 
            }
    },
    methods: {
        resetLoginForm(){
            this.$refs.loginFormRef.resetFields();
        },
        login(){
            this.$refs.loginFormRef.validate(async valid =>{
              console.log(valid)
              if(!valid) return
              const {data} =await this.$http.post('login',this.form)
              console.log( data )
              if( data.meta.status !==200 ){
                  this.$message.error("登录失败");
                  return
              }else if(data.meta.status ==200){
                  this.$message.success("登录成功");
                  window.sessionStorage.setItem('token',data['data']['token']);
                  this.$router.push('/home');
              }
            })
        }
    },
}
</script>>
<style lang="less" scoped>
  .login-contanier{
      background: #2b4b6b;
      height: 100%;
      .login-box{
      width: 450px;
      height: 300px;
      border-radius: 3px;
      background: #fff;
      top:50%;
      left:50%;
      position: absolute;
      transform: translate(-50%,-50%);
            .login-form{
                position: absolute;
                bottom: 0px;
                width:100%;
                padding: 0 20px;
                box-sizing: border-box;
            }
            .btns{
              float: right;
            }
            .avater-box{
                width: 130px;
                height: 130px;
                border:1px solid black;
                border-radius: 50%;
                padding: 10px;
                box-shadow: 0 0 10px #ddd;
                 position: absolute;
                 left:50%;
                 transform: translate(-50%,-50%);
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background: #eee;
                }
            }
     }
  }
  
</style>>