// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import HeaderAsideFooterLayout from './layouts/HeaderAsideFooterLayout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Market from './pages/Market/Market';
import Create from './pages/Create/Create';
import MyCenter from './pages/MyCenter/MyCenter';

const routerConfig = [
  {
    path: '/',
    layout: HeaderAsideFooterLayout,
    component: Home,
  },
  {
    path: '/Market',
    layout: HeaderAsideFooterLayout,
    component: Market,
  },
  {
    path: '/Create/:typeId',
    layout: HeaderAsideFooterLayout,
    component: Create,
  },
  {
    path: '/MyCenter',
    layout: HeaderAsideFooterLayout,
    component: MyCenter,
  },
  {
    path: '*',
    layout: HeaderAsideFooterLayout,
    component: NotFound,
  },
];

export default routerConfig;
