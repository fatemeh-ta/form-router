import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import register from './components/register.vue';
import viewList from './components/viewList.vue';
import '../node_modules/bulma/css/bulma.min.css';
import './main.scss';

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   components: { App },
//   template: '<App/>'
// })

Vue.use(VueRouter);

Vue.config.productionTip = false;

const routes = [
  { path: '/register', component: register },
  { path: '/viewList', component: viewList },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
