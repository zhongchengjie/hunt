<template>
  <section class="content">
  	<div class="ibox">
  		  <div class="ibox-title">
  		  	  <h5>机器人管理</h5>
  		  </div><!--end of ibox-title-->
  		  <div class="ibox-content">
  		  	 <div class="ibox-content-search row">
  		  	 	    <div class="col-sm-3">
  		  	 	    	  <button type="button" class="btn btn-primary btn-sm" @click="showModal(1)">添加机器人</button>
  		  	 	    </div>
  		  	 	    <div class="col-sm-9">
  		  	 	    	  <form class="form-inline">
		  		  	 	    	  <div class="input-group pull-right" style="width:300px">
		  		  	 	    	  	  <input  v-model="searchCon.inputText" type="text" placeholder="请输入机器人名称、登录帐号或端口" class="input-sm form-control">
		  		  	 	    	  	  <span class="input-group-btn">
		                            <button type="button" class="btn btn-sm btn-primary" @click="getBotList"> 搜索</button>
		  		  	 	    	  	  </span>
		  		  	 	    	  </div>
		  		  	 	    	  <div class="input-group input-group-sm pull-right" style="margin-right:10px">
												      <span class="input-group-addon">状态</span>	
													    <select v-model="searchCon.botStatus" class="form-control input-sm" @change="getBotList">
													    	  <option value="" selected="selected">--全部--</option>
				  		  	 	    	  	    <option value="1">在线</option>
				  		  	 	    	  	    <option value="-1">离线</option>
				  		  	 	    	    </select>
											  </div>
										</form>
  		  	 	    </div>
  		  	 </div>
  		  	 <table class="table table-auto table-striped table-hover">
		          <thead>
		             <tr>
		                <th>机器人名称</th>
		                <th>登录帐号</th>
		                <th>端口</th>
		                <th>是否在使用</th>
		                <th>状态</th>
		                <th>最近登录时间</th>
		                <th>操作</th>
		             </tr>
		          </thead>
		          <tbody v-if="botList.length>0">
		             <tr v-for="bot in botList">
		                <td>{{bot.bot_name}}</td>
		                <td>{{bot.account_name}}</td>
		                <td>{{bot.port}}</td>
		                <td v-html="getInuse(bot.in_use)"></td>
		                <td v-html="getBotStatus(bot.status)"></td>
		                <td>{{bot.last_login_time}}</td>
		                <td><a href="javascript:void(0)" @click="showModal(2,bot._id)">编辑</a> - <a  v-if="bot.status=='-1'" href="javascript:void(0)" @click="botLogin(bot._id,bot.port,bot.account_name,bot.login_pwd)">登录</a>  <a  v-if="bot.status=='1'" href="javascript:void(0)" >退出</a></td>
		             </tr>
		          </tbody>
		          <tbody v-else>
		          	   <tr><td colspan="7" class="noData">暂无数据！</td></tr>
		          </tbody>
		      </table>
  		  </div><!--end of ibox-content-->
  	</div>
  	<modal :name="modalName"  :width="500" :height="260" :pivotY="0.3" :pivotX="0.6">
	      <modal-header :modal-title="modalTitle" :modal-name="modalName"></modal-header>
	      <div class="modal-body">
           <bot-edit :bot-info="botInfo"></bot-edit>
        </div>
	      <modal-footer :modal-name="modalName"></modal-footer>
	  </modal>
  </section>

</template>

<script>

import modalHeader from '../../components/modalHeader.vue'
import modalFooter from '../../components/modalFooter.vue'
import botEdit from './botEdit.vue'

export default {
  name: 'bot',
  components:{
  	  "modal-header": modalHeader,
      "modal-footer": modalFooter,
      "bot-edit": botEdit
  },
  data:function(){
      return{
      	modalName:"botEditModal",
      	modalTitle:"添加机器人",
        botList:[],
        botInfo:{
        	   _id:"",
             bot_name: "",
             bot_steamid:"",
             account_name: "",
             login_pwd:"",
             port:"",
             phone:""
        },
        searchCon:{botStatus:"",inputText:"",pageSize:15,pageNo:1},
        queryApi:"http://localhost:8809/api/bot/get",
        addApi:"http://localhost:8809/api/bot/add",
        editApi:"http://localhost:8809/api/bot/update",
        loginApi:"http://localhost:8809/api/bot/login"
      }
  },
  mounted:function(){
  	  this.getBotList();  
      eventBus.$on("saveClick", this.formAjaxSubmit)
  },
  methods:{
  	getBotList:function(){
  		  this.$http.post(this.queryApi).then(response => {
        	  var result = response.data
        	  if(result.status=="succ"){
        	  	   this.botList = result.result;
        	  }else{
        	  	   layer.msg(result.msg,{icon:7});
        	  }
			  }, response => {
			       layer.msg("请求出错了！",{icon:7});
			  });
  	},
  	getInuse:function(in_use){
	  		if(in_use=="1"){
	  			 return "<label class='label label-success'>使用中</label>";
	  		}else if(in_use=="0"){
	  			 return "<label class='label label-warning'>已注销</label>";
	  		}
  	},
  	getBotStatus:function(status){
	  		if(status=="1"){
	  			 return "<label class='label label-success'>在线</label>";
	  		}else if(status=="-1"){
	  			 return "<label class='label label-warning'>离线</label>";
	  		}
  	},
  	showModal:function(type,id){
  		  if(type==1){
  		  	 this.modalTitle = "添加机器人";
  		  	 this.botInfo = {_id:"",bot_name: "",bot_steamid:"",account_name: "",login_pwd:"",port:"",phone:""};
  		  }else{
  		  	 this.modalTitle = "编辑机器人";
  		  	 var list = this.botList;
  		  	 var len = list.length;
  		  	 for(var i=0;i<len;i++){
  		  	 	   if(list[i]._id ==id){
  		  	 	   	  this.botInfo = list[i]
  		  	 	   }
  		  	 }
  		  }
  		  this.$modal.show(this.modalName);
  	},
    formAjaxSubmit:function(){
    	  if(this.botInfo._id!=""&&this.botInfo._id!=null){
    	  	  this.editBot();
    	  }
    	  else{
    	  	  this.addBot();
    	  }
        
    },
    addBot:function(){
    	  var botInfo = this.botInfo;
    	  delete botInfo._id        //添加是不需要_id属性
        this.$http.post(this.addApi,{botInfo:botInfo}).then(response => {
        	  var result = response.data;
        	  if(result.status=="succ"){
        	  	  layer.msg("添加成功!",{icon:1});
        	  	  this.$modal.hide(this.modalName);     
        	  	  this.getBotList();
        	  }else{
        	  	   layer.msg(result.msg,{icon:7});
        	  }			    
			  }, response => {
			      layer.msg("请求出错了！",{icon:7});
			  });
    },
    editBot:function(){
        this.$http.post(this.editApi,{botInfo:this.botInfo}).then(response => {
        	  var result = response.data;
        	  if(result.status=="succ"){
        	  	  layer.msg("修改成功",{icon:1});
        	  	  this.$modal.hide(this.modalName);     
        	  	  this.getBotList();
        	  }else{
        	  	   layer.msg(result.msg,{icon:7});
        	  }			    
			  }, response => {
			      layer.msg("请求出错了！",{icon:7});
			  });
    },
    botLogin:function(id,port,account_name,login_pwd){
    	  var _this = this;
    	  layer.prompt({title: '请输入手机动态验证码',offset:'300px'}, function(code, index){
    	  	   if(code==""){
    	  	   	   layer.msg("请输入手机动态验证码！",{icon:7});
    	  	   	   return;
    	  	   }
				     layer.close(index);
				     var botInfo ={_id:id,port:port,account_name:account_name,login_pwd:login_pwd,two_factor_code:code}
				     _this.$http.post(_this.loginApi,{botInfo:botInfo}).then(response => {
		        	  var result = response.data;
		        	  if(result.status=="succ"){
		        	  	   layer.msg("登录成功",{icon:1});  
		        	  	   _this.getBotList();
		        	  }else{
		        	  	   layer.msg(result.msg,{icon:7});
		        	  }			    
					   }, response => {
					      layer.msg("请求出错了！",{icon:7});
					   });
				     
				});
    }
  }
}
</script>
