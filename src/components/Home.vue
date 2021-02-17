<template>
    <el-container class="home">
        <el-header>
            <div>
                <img
                    style="height: 53px;width: 68px;border-radius: 48%;"
                    src="../assets/shuwukong.jpeg"
                    alt
                />
                <span style="font-size:28px">后台管理系统</span>
            </div>
            <el-button
                type="info"
                style="background-color:#66b1ff"
                @click="goBack"
                >退出</el-button
            >
        </el-header>
        <el-container>
            <el-aside :width="collFlag ? '64px' : '200px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <el-menu
                    background-color="#ff1cae"
                    text-color="#fff"
                    active-text-color="#409BFF"
                    :unique-opened="true"
                    :collapse="collFlag"
                    :collapse-transition="false"
                    router
                    default-active="url"
                >
                    <el-submenu
                        v-for="item in meunList"
                        :key="item.id"
                        :index="item.id + ''"
                    >
                        <template slot="title">
                            <i :class="iconsObj[item.id]"></i>
                            <span>{{ item.authName }}</span>
                        </template>
                        <el-menu-item
                            @click="saveNavState('/' + prop.path)"
                            v-for="prop in item.children"
                            :index="'/' + prop.path"
                            :key="prop.id"
                        >
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>{{ prop.authName }}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
    data() {
        return {
            meunList: [],
            collFlag: false,
            iconsObj: {
                "125": "iconfont icon-yonghu",
                "103": "iconfont icon-quanxian",
                "101": "iconfont icon-ziyuan",
                "102": "iconfont icon-dingdan",
                "145": "iconfont icon-shujutongji",
                "160": "iconfont icon-tuxing",
                "161": "iconfont icon-jiankong"
            },
            url: ""
        };
    },
    created() {
        this.getMeunList();
        this.url = window.sessionStorage.getItem("url");
    },
    methods: {
        async getMeunList() {
            const { data: res } = await this.$http.get("menus");
            if (res.meta.status !== 200) {
                return this.$meassge.error(res["meta"].msg);
            }
            this.meunList = res.data;
        },
        toggleCollapse() {
            this.collFlag = !this.collFlag;
        },
        saveNavState(url) {
            window.sessionStorage.setItem("url", url);
            this.url = url;
        },
        goBack() {
            window.sessionStorage.clear();
            this.$router.push("/login");
        }
    }
};
</script>

<style lang="less" scoped>
.home {
    height: 100%;
}
.toggle-button {
    background: #ff1cae;
    text-align: center;
    cursor: pointer;
}
.el-header {
    background: #ff1cae;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
        display: flex;
        align-items: center;
    }
}
.el-aside {
    background: #ff1cae;
    .el-menu {
        border-right: none;
    }
}
</style>