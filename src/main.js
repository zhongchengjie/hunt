// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VModal from 'vue-js-modal'
import store from './store/store'

Vue.config.productionTip = false
Vue.prototype.axios = axios

//vue-js-modal
Vue.use(VModal)

//eventBus
window.eventBus = new Vue();

//vuex
window.store = store;

//vue-resource

// Some middleware to help us ensure the user is authenticated.
router.beforeEach((to, from, next) => {
  //console.log(to.path);
  if (to.path!="/login"&&(!localStorage.getItem("token") || localStorage.getItem("token") == '')) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    console.log('Not authenticated')
    next({
       path: '/login'
    })
  } else {
    next()
  }
})


/*Vue.http.interceptors.push((request, next) => {
 /* const auth = store.state.account.auth;
  if (auth.check()) {
    const accessToken = auth.jwt_token.access_token;
    Vue.http.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    delete Vue.http.headers.common.Authorization;
  }
  //console.log(request);
  if(request.url=="http://localhost:8809/api/login"){
  	  delete Vue.http.headers.common.Authorization;
  }else{
  	  const accessToken = localStorage.getItem("token");
       Vue.http.headers.common.Authorization = `Bearer ${accessToken}`;
  }

  // continue to next interceptor
  next();
});
*/
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  template: '<App/>',
  components: { App }
})
