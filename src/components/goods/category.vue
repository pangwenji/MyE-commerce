/* eslint-disable vue/no-unused-vars */
/* eslint-disable vue/no-unused-vars */
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-button @click="addDialog" type="primary">添加商品</el-button>
        </el-col>
      </el-row>

      <tree-table
        class="treeTable"
        :data="cateList"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        :show-index="true"
        :border="true"
        :show-row-hover="true"
      >
        <template slot="isOk" slot-scope="scope">
          <i
            class="el-icon-success"
            style="color:lightgreen"
            v-if="scope.row.cat_deleted === false"
          ></i>
          <i class="el-icon-error" v-else style="color:red"></i>
        </template>
        <!--排序模板-->
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag size="mini" v-else-if="scope.row.cat_level === 1" type="sccuess">二级</el-tag>
          <el-tag size="mini" v-else type="warning">三级</el-tag>
        </template>
        <!--操作-->
        <template slot="opt" >
          <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
        </template>
      </tree-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryinfo.pagenum"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="queryinfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tatol"
      ></el-pagination>
      <!--添加对话框-->

      <el-dialog title="添加分类" :visible.sync="addCateDialogVisible" width="50%" @close = "addCateDislog">
        <!--添加内容-->
        <el-form
          :model="addCateForm"
          :rules="addCateFormRules"
          ref="addCateFormRef"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!--分类-->
          <el-form-item label="分类名称:" prop="cat_name">
            <el-input v-model="addCateForm.cat_name"></el-input>
          </el-form-item>
          <!--父级分类-->
          <el-form-item label="父级分类:" prop>
            <el-input v-model="addCateForm.cat_name">
              <el-cascader
                :props="{ expandTrigger: 'hover' }"
                v-model="selectedKeys"
                :options="parentCatelist"
                @change="handleChange"
                clerarable
                change-on-select
              ></el-cascader>
            </el-input>
          </el-form-item>
        </el-form>

        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addConfim">确 定</el-button>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryinfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      addCateDialogVisible: false,
      addCateForm: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      addCateFormRules: {
        cat_name: [
          { require: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      cascaderProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      parentCatelist: [],
      cateList: [],
      tatol: 0,
      selectedKeys: [],
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name',
          align: 'center',
          headerAlign: 'center'
        },
        {
          label: '是否有效',
          align: 'center',
          type: 'template',
          template: 'isOk',
          headerAlign: 'center'
        },
        {
          label: '排序',
          align: 'center',
          type: 'template',
          template: 'order',
          headerAlign: 'center'
        },
        {
          label: '操作',
          align: 'center',
          type: 'template',
          template: 'opt',
          headerAlign: 'center'
        }
      ]
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get('categories', {
        params: this.queryinfo
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类失败！')
      }
      console.log(res, 'res')
      this.cateList = res.data.result
      this.tatol = res.data.total
    },
    // 添加对话框
    addDialog() {
      this.addCateDialogVisible = true
    },
    // 监听页码
    handleSizeChange(newSize) {
      this.queryinfo.pagesize = newSize
      this.getCateList()
    },
    // 监听当前页面
    handleCurrentChange(newPage) {
      this.queryinfo.pagenum = newPage
      this.getCateList()
    },

    // 监听级联
    handleChange() {
      console.log(this.selectedKeys)
      if (this.selectedKeys.length > 0) {
           this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
           this.addCateForm.cat_level = this.selectedKeys.length
      } else {
           this.addCateForm.cat_pid = 0
           this.addCateForm.cat_level = 0
      }
    },
    async getParentsCateList() {
      const { data: res } = await this.$http.get('categories', {
        params: { type: 2 }
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取父级分类失败!')
      }
      console.log(res.data)
      this.parentCatelist = res.data
    },
     // 点击确定按钮
     async addConfim() {
       console.log(this.addCateForm)
         this.$ref.addCateFormRef.validate(async valid => {
           if (valid) {
             const { data: res } = await this.$http.post('categories', this.addCateForm)
             if (res.meta.status !== 201) {
                return this.$message.error('添加分类失败!')
             }
            this.$message.sccuess('添加成功!')
            this.getCateList()
            this.addCateDialogVisible = false
          }
         })
     },
     // 点击关闭对话框
     addCateDislog() {
       this.$ref.addCateFormRef.resetFields()
       this.addCateForm.cat_pid = 0
       this.addCateForm.cat_level = 0
       this.selectedKeys = []
     }
  }
}
</script>

<style lang = "less" scoped>
.treeTable {
  margin-top: 12px;
}
</style>
