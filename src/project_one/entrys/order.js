import Vue from 'vue';
import App from 'pages/order/app';
import VueRouter from 'vue-router';
import routerMap from 'pages/order/router'
import filter from 'pages/order/filter'
import $ from 'jquery'

// 路由模块和HTTP模块
Vue.use(VueRouter);

// 使用filter
for(var k in filter){
    Vue.filter(k, filter[k]);
};

const router = new VueRouter();
routerMap(router)
router.start(App, 'app');

