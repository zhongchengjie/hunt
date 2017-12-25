<template>
 <div class="container container-table">
      <div class="row vertical-10p">
        <div class="container">
          <img src="/static/img/logo.png" class="center-block logo">
          <div class="text-center col-md-4 col-sm-offset-4">
            <form class="ui form loginForm" autocomplete="off">
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                <input class="form-control"  type="text" v-model="phone">
              </div>
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-lock" style="font-size:20px"></i></span>
                <input class="form-control"  type="password"  v-model="password">
              </div>
              <button type="submit" class="btn btn-primary btn-lg" @click="loginCheck">Submit</button>
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
  	  	 phone:"",
  	  	 password:""
  	  }
  },
  methods: {
      loginCheck:function(){
      	  this.$http.post("http://localhost:8809/api/login",{phone:this.phone,password:hex_md5(this.password)}).then(response => {
        	  var result = response.data;
        	  if(result.status=="succ"){
        	  	  layer.msg("登录成功",{icon:1});
        	  	  store.commit('SET_USER', result.user)
                  store.commit('SET_TOKEN', result.token)
        	  	  localStorage.setItem("token", result.token);
        	  	  this.$router.push("/")
        	  }else{
        	  	   layer.msg(result.msg,{icon:7});
        	  }
			  }, response => {
			      layer.msg("请求出错了！",{icon:7});
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
  padding-bottom: 1em;
  height: 3em;
}
.input-group input {
  height: 4em;
}
</style>
