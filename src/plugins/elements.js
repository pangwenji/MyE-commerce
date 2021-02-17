import Vue from 'vue';
import {
    Message,
    Button,
    Form,
    FormItem ,
    Input,
    Container,
    Header,
    Main,
    Aside,
    Menu,
    Submenu,
    MenuItemGroup,
    Tag,
    MenuItem,
    Tooltip,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Row,
    Col,
    Table,
    TableColumn,
    Pagination,
    Dialog,
    Tree,
    MessageBox,
    Cascader,
    Tabs,
    TabPane
} from 'element-ui';
Vue.use(TabPane)
Vue.use(Tabs)
Vue.use(Cascader)
Vue.use(Tree)
Vue.use(Tag)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dialog  )
Vue.use(Tooltip)
Vue.use(Row)
Vue.use(Pagination)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Card)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Menu)   
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Aside);
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm