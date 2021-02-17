<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible =true">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态" prop="mg_state ">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userSateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDiag(scope.row.id)"
            ></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
            <el-tooltip :enterable="false" effect="dark" content="分类角色" placement="top">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryifo.pagenum"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
      <!--添加用-->
      <el-dialog title="提示" :visible.sync="addDialogVisible" width="30%" @close="addDialogColse">
        <el-form
          :model="AddruleForm"
          :rules="AddFormrules"
          ref="addFormRef"
          label-width="70px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="AddruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="AddruleForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="AddruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="moblie">
            <el-input v-model="AddruleForm.moblie"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </el-dialog>
      <!--修改用户-->
      <el-dialog title="提示" :visible.sync="editdDialogVisible" width="50%">
        <el-form
          :model="editRuleForm"
          :rules="editFormRules"
          ref="editFormRef"
          label-width="100px"
          @close = "editDiglogClose"
        >
          <el-form-item label="用户名" prop="editUser" disabled>
            <el-input v-model="editRuleForm.editUser"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="editMobile">
            <el-input v-model="editRuleForm.editMobile"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="editEail">
            <el-input v-model="editRuleForm.editEail"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editdDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUserInfo">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      var regEmial = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9])+/
      if (regEmial.test(value)) {
        return callback()
      }
      callback(new Error('请输入正确邮箱'))
    }
    var checkMobile = (rule, value, callback) => {
      var regMoblie = /^(0|86 |17951)?(13[0-9]|15[0123456789]|17[6787]|18[0-9]|14[57])[0-9]{8}$/
      if (regEmial.test(value)) {
        return callback()
      }
      callback(new Error('请输入正确的手机号'))
    }
    return {
      queryifo: {
        query: '',
        pagenum: 1,
        pagesize: 2,
      },
      addDialogVisible: false,
      editdDialogVisible: false,
      userList: [],
      total: 0,
      eidtForm: {},
      AddruleForm: {
        username: '',
        moblie: '',
        password: '',
        email: '',
      },
     //编辑
     editFormRules:{
       editEail: [
          { required: true, message: '请输入正确的邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
        ],
        editMobile: [
          { required: true, message: '请输入正确的手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' },
        ],
     },
     editRuleForm:{
       eidtUser:"",
       editMobile:"",
       editEail:""
     },

      AddFormrules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名在3到10个字符之间',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '密码在6~15个字符之间', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
        ],
        moblie: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      let { data: res } = await this.$http.get('users', {
        params: this.queryifo,
      })
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取数据失败')
      console.log(res)
      this.userList = res.data.users
      this.total = res.data.total
    },
    async userSateChange(userInfo) {
      console.log(userInfo)
      let { data: res } = await this.$http.put(
        `users/${userInfo.id}/state/${userInfo.mg_state}`
      )
      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state
        return this.$message.error('更新用户失败')
      }
      this.$message.success('更新用户成功')
    },
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryifo.pagesize = newSize
      this.getUserList()
    },
    handleCurrentChange(currnetPage) {
      console.log(currnetPage)
      this.queryifo.pagenum = currnetPage
      this.getUserList()
    },
    addDialogColse() {
      this.$refs.addFormRef.resetFields()
    },
    addUser() {
      this.$refs.addFormRef.validate(async (validate) => {
        if (validate) return
        let { data: res } = this.$http.post('users', this.AddruleForm)
        if (res.meta.status !== 201) {
          this.$message.error('添加用户失败')
        }
        this.$message.success('添加用户成功!')
        this.addDialogVisible = false
        this.getUserList()
      })
    },
    async showEditDiag(id) {
      let { data: res } = await this.$http.get(`users/${id}`)
      console.log(res)
      if (res.meta.status !== 201) {
        return this.$message.error('查询用户信息失败')
      }
      this.eidtForm = res.data
      this.editdDialogVisible = true
    },
    editDiglogClose(){
      this.$refs.editFormRef.resetFields()
    },
    //删除用户
   async  removeUserById(id){
      const resconfirm = await this.$confirm('永久删除该用户','提示',{
         confirmButtonText:"确定",
         cancelButtonText:"取消 ",
        type:'warning'
       }).catch(err =>err)

       if( resconfirm !=="confirm"){
        return this.$message.info('已取消删除')
       }
     let {data:res} =  await this.$http.delete('users/' + id)
     if( res.meta.status){
        return this.$message.error('删除失败')
     }
     this.$message.success("删除用户成功!")
     this.getUserList()
    },
   async editUserInfo(){
         let { data:res } = await  this.$refs.editFormRef.validate( valida =>{
           console.log(validate)
           if( !validate){
              return 
           } 
          this.$http.put(`users/${this.eidtForm.id}`,{email:this.eidtForm.email,mobile:this.eidtForm.mobile})
        })
        if( res.meta.status !==200 ){
             return this.$message.error("更新用户失败")
        }
        this.editdDialogVisible = false;
        this.getUserList();
        this.$message.success("更新用户成功!  ")

    }
  },
}
</script>

<style lang="less" scoped>
</style>