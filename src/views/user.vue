<template>
  <section class="content">
  	<div class="ibox">
  		  <div class="ibox-title">
  		  	  <h5>用户管理</h5>
  		  </div><!--end of ibox-title-->
  		  <div class="ibox-content">
  		  	 <div class="ibox-content-search row">
  		  	 	    <div class="col-sm-3">
  		  	 	    	  <button type="button" class="btn btn-primary btn-sm" @click="showModal">添加用户</button>
  		  	 	    </div>
  		  	 	    <div class="col-sm-9">
  		  	 	    	  <div class="input-group pull-right" style="width:300px">
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
  	<modal name="userEditModal"  :width="480" :height="260" :pivotY="0.3" :pivotX="0.6">
	      <modal-header modal-title="添加用户" modal-name="userEditModal"></modal-header>
	      <div class="modal-body">
           <user-edit :user-info="userInfo"></user-edit>
        </div>
	      <modal-footer modal-name="userEditModal"></modal-footer>
	  </modal>
  </section>

</template>

<script>

import modalHeader from '../components/modalHeader.vue'
import modalFooter from '../components/modalFooter.vue'
import userEdit from './userEdit.vue'

export default {
  name: 'user',
  components:{
  	  "modal-header": modalHeader,
      "modal-footer": modalFooter,
      "user-edit": userEdit
  },
  data:function(){
      return{
        userList:[{"name":"www","phone":"13560472084","email":"newuser@163.com","steamid":"12837123721893","type":"普通用户","regTime":"2017-10-10 12:00"},{"name":"www","phone":"13560472084","email":"newuser@163.com","steamid":"12837123721893","type":"普通用户","regTime":"2017-10-10 12:00"},{"name":"www","phone":"13560472084","email":"newuser@163.com","steamid":"12837123721893","type":"普通用户","regTime":"2017-10-10 12:00"}],
        userInfo:{
             user_phone: "",
             user_password:"",
             user_name: "",
             user_steamid:"",
             user_email:"",
             user_type:"common"
         }
      }
  },
  mounted:function(){
      eventBus.$on("saveClick", this.formAjaxSubmit)
  },
  methods:{
  	showModal:function(){
  	    this.userInfo.user_phone="";
        this.userInfo.user_password="";
        this.userInfo.user_name="";
        this.userInfo.user_steamid="";
        this.userInfo.user_email="";
        this.userInfo.user_type="common";

  		  this.$modal.show('userEditModal');
  	},
    formAjaxSubmit:function(){
        this.addUser();
    },
    addUser:function(){
        console.log(JSON.stringify(this.userInfo));
    }
  }
}
</script>

<style>


</style>
