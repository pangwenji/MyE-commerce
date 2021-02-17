<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" border>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="['bdbottom',i1 === 0 ? 'bdtop':'']"
              v-for="( item,i1 ) in scope.row.children"
              :key="item.id"
            >
              <el-col :span="5">
                <el-tag>{{item.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!--二级菜单-->
              <el-col :span="19">
                <el-row
                  :class="[k1 === 0 ? '': 'bdtop']"
                  v-for="(item1,k1) in item.children"
                  :key="item1.id"
                >
                  <el-col :span="6">
                    <el-tag type="success">{{item1.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      v-for="(item3,i3) in item1.children"
                      :key="item3.id"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作" width="300px">
          <el-button size="mini" class="my_button" type="primary" icon="el-icon-edit">编辑</el-button>
          <el-button size="mini" class="my_button" type="danger" icon="el-icon-delete">删除</el-button>
          <el-button
            size="mini"
            class="my_button"
            type="warning"
            icon="el-icon-cloudy"
            @click="showSetrightDialog"
          >分配角色</el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <!--分配权限对话框-->
    <el-dialog title="提示" :visible.sync="setRigthDialogVisible" width="30%" :before-close="handleClose">
      <el-tree  
            show-checkbox 
           default-expand-all 
           node-key = "id" 
           :data="data" 
           :props="treeProps" 
           @node-click="handleNodeClick"
           :defalut-checked-keys="defKeys"
           ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRigthDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRigthDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
export default {
  data() {
    return {
      tableData: [],
      setRigthDialogVisible:false,
      rigthList:[],
      treeProps:{
        label:'authName',
        children:'children'
      },
      defKeys:[]
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { data: res } = await this.$http. get('/roles')
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败')
      }
      this.$message.success('获取角色列表成功')
      this.tableData = res['data']
    },
   async showSetrightDialog() {
      //获取所有权限数据
      let { data:res } = await this.$http.get('rights/tree')
      console.log(res)
      if(res.meta.status !==200 ){ return  this.$message.error("获取权限信息失败")}
      this.rigthList = res.data
      this.setRigthDialogVisible = true
    },
  },
}
</script>

<style lang="less" scoped>
.el-tag {
  margin: 16px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
</style>