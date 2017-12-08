<template>
  <section class="content">
  	<div class="ibox">
  		  <div class="ibox-title">
  		  	  <h5>用户管理</h5>
  		  </div><!--end of ibox-title-->
  		  <div class="ibox-content">
  		  	 <div class="ibox-content-search row">
  		  	 	    <div class="col-sm-8">
  		  	 	    	  <button type="button" class="btn btn-primary btn-sm" @click="addUser">添加用户</button>
  		  	 	    </div>
  		  	 	    <div class="col-sm-4">
  		  	 	    	  <div class="input-group">
  		  	 	    	  	  <input type="text" placeholder="请输入用户名、手机号码、邮箱、或steamid" class="input-sm form-control"> 
  		  	 	    	  	  <span class="input-group-btn">
                            <button type="button" class="btn btn-sm btn-primary"> 搜索</button> 
  		  	 	    	  	  </span>
  		  	 	    	  </div>
  		  	 	    </div>
  		  	 </div>
  		  	 <table class="table table-auto table-striped table-hover table-condensed">
		          <thead>
		             <tr>
		                <th>用户名</th>
		                <th>手机号码</th>
		                <th>邮箱</th>
		                <th>steamid</th>
		                <th>用户类型</th>
		                <th>注册时间</th>
		                <th>操作</th>
		             </tr>
		          </thead>
		          <tbody>
		             <tr v-for="user in userList">
		                <td>{{user.name}}</td>
		                <td>{{user.phone}}</td>
		                <td>{{user.email}}</td>
		                <td>{{user.steamid}}</td>
		                <td>{{user.type}}</td>
		                <td>{{user.regTime}}</td>
		                <td><a href="">编辑</a> - <a href="">注销</a></td>
		             </tr>
		          </tbody>
		      </table>
  		  </div><!--end of ibox-content-->
  	</div>
  	<modal name="userEditModal"  :width="600" :height="480">
	      <modal-header modal-title="添加用户"></modal-header>
	      <div class="modal-body"></div>
	      <modal-footer></modal-footer>
	  </modal>
  </section>

</template>

<script>

import modalHeader from '../components/modalHeader.vue'

export default {
  name: 'user',
  components:{
  	  "modal-header":modalHeader
  },
  data: function(){
      return{
          userList:[{"name":"www","phone":"13560472084","email":"newuser@163.com","steamid":"12837123721893","type":"普通用户","regTime":"2017-10-10 12:00"},{"name":"www","phone":"13560472084","email":"newuser@163.com","steamid":"12837123721893","type":"普通用户","regTime":"2017-10-10 12:00"},{"name":"www","phone":"13560472084","email":"newuser@163.com","steamid":"12837123721893","type":"普通用户","regTime":"2017-10-10 12:00"}]
      }
  },
  mounted () {
  },
  methods:{
  	addUser:function(){
  		  this.$modal.show('userEditModal');
  	}
  }
}
</script>

<style>
	  
   
</style>
