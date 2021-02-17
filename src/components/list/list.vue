<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
          <el-col :span = "8">
              <el-input placeholder="请输入内容">
                  <el-button slot = "append" icon = "el-icon-search"></el-button>
              </el-input>
          </el-col>
          <el-col :span = "4">
                  <el-button  type = "primary">添加商品</el-button>

          </el-col>
       
      </el-row>

      <el-table :data = "goodsList" border stripe>

      </el-table>
  </el-card>
  </div>
 
</template>

<script>
export default {
  data() {
    return {
        queryinfo:{
            query:"",
            pagenum:1,
            pagesize:10
        },
        goodsList:[],
        total:0
    }
    

  },
  created() {
      this.getGoodsList()
  },
  methods: {
     async getGoodsList(){
         let { data :res}  = await this.$http.get('/goods',{
              params:this.queryinfo
          })
          if( res.meta.status !== 200){
            return this.$message.error("获取商品列表失败！")
          }
          this.$message.success("获取商品数据成功!")
          this.goodsList = res.data.goods;
          this.total = res.data.total
      }
  },
   
}
</script>

<style lang="less" scoped>
</style>