// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VModal from 'vue-js-modal'
import VueResource from 'vue-resource'
import store from './store'

Vue.config.productionTip = false
Vue.use(VModal)

window.eventBus = new Vue();


// Some middleware to help us ensure the user is authenticated.
router.beforeEach((to, from, next) => {
  //console.log(to.path);
  if (to.path!="/login"&&(!store.state.token || store.state.token === 'null')) {
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

Vue.use(VueResource);
Vue.http.interceptors.push((request, next) => {
 /* const auth = store.state.account.auth;
  if (auth.check()) {
    const accessToken = auth.jwt_token.access_token;
    Vue.http.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    delete Vue.http.headers.common.Authorization;
  }*/
  console.log(request);
  if(request.url=="http://localhost:8809/api/login"){
  	  delete Vue.http.headers.common.Authorization;
  }else{
  	  const accessToken = router.app.$store.state.token;
       Vue.http.headers.common.Authorization = `Bearer ${accessToken}`;
  }

  // continue to next interceptor
  next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  template: '<App/>',
  components: { App }
})
