<template>
 <div class="container container-table">
      <div class="row vertical-10p">
        <div class="container">
          <img src="/static/img/logo.png" class="center-block logo">
          <div class="text-center col-md-4 col-sm-offset-4">
            <form class="ui form loginForm" autocomplete="off" @submit.prevent="loginCheck">
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                <input class="form-control"  type="text" v-model="account">
              </div>
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-lock" style="font-size:21px"></i></span>
                <input class="form-control"  type="password"  v-model="password">
              </div>
              <button type="submit" class="btn btn-primary btn-lg">Submit</button>
            </form>
          </div>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'login',
  data: function(){
  	  return{
         loginApi:"http://localhost:8802/api/admin/login",
  	  	 account:"",
  	  	 password:""
  	  }
  },
  methods: {
      loginCheck:function(){
      	  this.$post(this.loginApi,{account:this.account,password:this.password}).then(result => {
              layer.msg("登录成功",{icon:1});
              //console.log(result);
              store.commit('setLoginUser', result.result)
              store.commit('setLoginToken', result.token)

              this.$router.push('/');
			    });
      }
  }
}
</script>

<style>
html, body, .container-table {
  height: 100%;
  background-color: #282B30 !important;
}
.container-table {
    display: table;
    color: white;
}
.vertical-center-row {
    display: table-cell;
    vertical-align: middle;
}
.vertical-10p {
  padding-top: 10%;
}
.logo {
  width: 15em;
  padding: 3em;
}
.loginForm .input-group {
  padding-bottom: 2em;
  height: 3em;
}
.loginForm .input-group input {
  height: 4em;
}
</style>
