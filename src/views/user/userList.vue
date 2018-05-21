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
  		  	 	    	  <form class="form-inline">
		  		  	 	    	  <div class="input-group pull-right" style="width:340px">
		  		  	 	    	  	  <input v-model="searchCon.inputText" type="text" placeholder="请输入用户名、手机号码、邮箱、或steamid" class="input-sm form-control">
		  		  	 	    	  	  <span class="input-group-btn">
		                            <button type="button" class="btn btn-sm btn-primary" @click="getUserList"> 搜索</button>
		  		  	 	    	  	  </span>
		  		  	 	    	  </div>
		  		  	 	    	  <div class="input-group input-group-sm pull-right" style="margin-right:10px">
												      <span class="input-group-addon">用户类型</span>	
													    <select v-model="searchCon.userType" class="form-control input-sm" @change="getUserList">
													    	  <option value="" selected="selected">--全部--</option>
				  		  	 	    	  	    <option value="common">普通用户</option>
				  		  	 	    	  	    <option value="vip">vip用户</option>
				  		  	 	    	    </select>
											  </div>
										</form>
  		  	 	    </div>
  		  	 </div>
  		  	 <table class="table table-auto table-striped table-hover">
		          <thead>
		             <tr>
		                <th>用户名</th>
		                <th>手机号码</th>
		                <th>邮箱</th>
		                <th>steamid</th>
		                <th>交易链接</th>
		                <th>用户类型</th>
		                <th>注册时间</th>
		                <th>操作</th>
		             </tr>
		          </thead>
		          <tbody v-if="userList.length>0">
		             <tr v-for="user in userList">
		                <td>{{user.user_name}}</td>
		                <td>{{user.user_phone}}</td>
		                <td>{{user.user_email}}</td>
		                <td>{{user.user_steamid}}</td>
		                <td>{{user.user_tradeurl}}</td>
		                <td>{{getUserType(user.user_type)}}</td>
		                <td>{{timeFormat(user.register_time)}}</td>
		                <td><a href="javascript:void(0)" @click="showModal(2,user._id)">编辑</a> - <a href="javascript:void(0)">注销</a></td>
		             </tr>
		          </tbody>
		          <tbody v-else>
		          	   <tr><td colspan="7" class="noData">暂无数据！</td></tr>
		          </tbody>
		      </table>
		      <paginat v-if="userList.length>0" :total-count="totalCount" :p-size="searchCon.pageSize"></paginat>
  		  </div><!--end of ibox-content-->
  	</div>
  	<modal :name="modalName"  :width="500" :height="260" :pivotY="0.3" :pivotX="0.6">
	      <modal-header :modal-title="modalTitle" :modal-name="modalName"></modal-header>
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
import paginat from '../../components/paginat.vue'
import moment from  'moment'

export default {
  name: 'user',
  components:{
  	  "modal-header": modalHeader,
      "modal-footer": modalFooter,
      "user-edit": userEdit,
      "paginat" : paginat
  },
  data:function(){
      return{
      	modalName:"userEditModal",
      	modalTitle:"添加用户",
        userList:[],
        userInfo:{
        	   _id:"",
             user_phone: "",
             user_password:"",
             user_name: "",
             user_steamid:"",
             user_email:"",
             user_type:"common",
             user_tradeurl:""
        },
        searchCon:{userType:"",inputText:"",pageSize:15,pageNo:1},
        totalCount:0,
        queryApi:"http://localhost:8809/api/user/get",
        addApi:"http://localhost:8809/api/user/add",
        editApi:"http://localhost:8809/api/user/update"
      }
  },
  mounted:function(){
  	  var _this = this;
  	  _this.getUserList();  
      eventBus.$on("saveClick", _this.formAjaxSubmit)
      eventBus.$on("reloadList",function(pageSize,pageNo){
      	  _this.searchCon.pageSize = parseInt(pageSize);
      	  _this.searchCon.pageNo = parseInt(pageNo);
      	  _this.getUserList();
      })
  },
  methods:{
  	getUserList:function(){
  		  /*this.$http.post(this.queryApi,{searchCon:this.searchCon}).then(response => {
        	  var result = response.data
        	  if(result.status=="succ"){
        	  	   this.userList = result.result;
        	  	   this.totalCount = result.totalCount;
        	  }else{
        	  	   layer.msg(result.msg,{icon:7});
        	  }
			  }, response => {
			       layer.msg("请求出错了！",{icon:7});
			  });*/
			  axios.post(this.queryApi,{searchCon:this.searchCon}).then(response => {
        	  var result = response.data
        	  if(result.status=="succ"){
        	  	   this.userList = result.result;
        	  	   this.totalCount = result.totalCount;
        	  }else{
        	  	   layer.msg(result.msg,{icon:7});
        	  }
			  }).catch(error => {
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
  	timeFormat:function(datetime){
  		  if(datetime){
  		  	 return moment(datetime).format('YYYY-MM-DD HH:mm:ss');
  		  }		  
  	},
  	showModal:function(type,id){
  		  if(type==1){
  		  	 this.modalTitle = "添加用户";
  		  	 this.userInfo = {_id:"",user_phone: "",user_password:"",user_name: "",user_steamid:"",user_email:"",user_type:"common",user_tradeurl:""};
  		  }
  		  else{
  		  	 this.modalTitle = "修改用户";
  		  	 var list = this.userList;
  		  	 var len = list.length;
  		  	 for(var i=0;i<len;i++){
  		  	 	   if(list[i]._id ==id){
  		  	 	   	  this.userInfo = list[i];
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
        var userInfo = this.userInfo;
        delete userInfo._id;
        userInfo.user_password = hex_md5(userInfo.user_password)    //md5加密
        this.$http.post(this.addApi,{userInfo:userInfo}).then(response => {
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
