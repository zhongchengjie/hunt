<template>
  <section class="content">
  	<div class="ibox">
  		  <div class="ibox-title">
  		  	  <h5>用户管理</h5>
  		  </div><!--end of ibox-title-->
  		  <div class="ibox-content">
  		  	 <div class="ibox-content-search row">
  		  	 	    <div class="col-sm-3">
  		  	 	    	  <button type="button" class="btn btn-primary btn-sm" @click="showModal(1)">添加用户</button>
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
  		  	 <table class="table table-auto table-striped table-hover">
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
		                <td>{{user.user_name}}</td>
		                <td>{{user.user_phone}}</td>
		                <td>{{user.user_email}}</td>
		                <td>{{user.user_steamid}}</td>
		                <td>{{getUserType(user.user_type)}}</td>
		                <td>{{user.register_time}}</td>
		                <td><a href="javascript:void(0)" @click="showModal(2,user._id)">编辑</a> - <a href="">注销</a></td>
		             </tr>
		          </tbody>
		      </table>
  		  </div><!--end of ibox-content-->
  	</div>
  	<modal name="userEditModal"  :width="480" :height="260" :pivotY="0.3" :pivotX="0.6">
	      <modal-header modal-title="添加用户" :modal-name="modalName"></modal-header>
	      <div class="modal-body">
           <user-edit :user-info="userInfo"></user-edit>
        </div>
	      <modal-footer :modal-name="modalName"></modal-footer>
	  </modal>
  </section>

</template>

<script>

import modalHeader from '../../components/modalHeader.vue'
import modalFooter from '../../components/modalFooter.vue'
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
      	modalName:"userEditModal",
        userList:[],
        userInfo:{
        	   _id:"",
             user_phone: "",
             user_password:"",
             user_name: "",
             user_steamid:"",
             user_email:"",
             user_type:"common"
        },
        queryApi:"http://localhost:8809/api/user/get",
        addApi:"http://localhost:8809/api/user/add",
        editApi:"http://localhost:8809/api/user/update"
      }
  },
  mounted:function(){
  	  this.getUserList();  
      eventBus.$on("saveClick", this.formAjaxSubmit)
  },
  methods:{
  	getUserList:function(){
  		  this.$http.get(this.queryApi).then(response => {
        	  var result = response.data
        	  if(result.status=="succ"){
        	  	   this.userList = result.result;
        	  }else{
        	  	   layer.msg(result.msg,{icon:7});
        	  }
			  }, response => {
			       layer.msg("请求出错了！",{icon:7});
			  });
  	},
  	getUserType:function(type){
	  		if(type=="common"){
	  			 return "普通用户";
	  		}else if(type=="vip"){
	  			 return "vip用户";
	  		}
  	},
  	showModal:function(type,id){
  		  if(type==1){
  		  	 this._id = "";
  		  	 this.userInfo.user_phone="";
           this.userInfo.user_password="";
	         this.userInfo.user_name="";
	         this.userInfo.user_steamid="";
	         this.userInfo.user_email="";
	         this.userInfo.user_type="common";
  		  }
  		  else{
  		  	 var list = this.userList;
  		  	 var len = list.length;
  		  	 for(var i=0;i<len;i++){
  		  	 	   if(list[i]._id ==id){
  		  	 	   	  this.userInfo = list[i]
  		  	 	   }
  		  	 }
  		  }
  		  this.$modal.show(this.modalName);
  	},
    formAjaxSubmit:function(){
    	  if(this.userInfo._id!=""&&this.userInfo._id!=null){
    	  	  this.editUser();
    	  }
    	  else{
    	  	  this.addUser();
    	  }
        
    },
    addUser:function(){
        this.$http.post(this.addApi,{userInfo:this.userInfo}).then(response => {
        	  var result = response.data;
        	  if(result.status=="succ"){
        	  	  layer.msg("添加成功!",{icon:1});
        	  	  this.$modal.hide(this.modalName);     
        	  	  this.getUserList();
        	  }else{
        	  	   layer.msg(result.msg,{icon:7});
        	  }			    
			  }, response => {
			      layer.msg("请求出错了！",{icon:7});
			  });
    },
    editUser:function(){
        this.$http.post(this.editApi,{userInfo:this.userInfo}).then(response => {
        	  var result = response.data;
        	  if(result.status=="succ"){
        	  	  layer.msg("修改成功",{icon:1});
        	  	  this.$modal.hide(this.modalName);     
        	  	  this.getUserList();
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
