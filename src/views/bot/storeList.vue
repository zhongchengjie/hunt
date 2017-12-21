<template>
  <section class="content">
  	<div class="ibox">
  		  <div class="ibox-title">
  		  	  <h5>机器人库存管理</h5>
  		  </div><!--end of ibox-title-->
  		  <div class="ibox-content">
  		  	 <div class="ibox-content-search row">
  		  	 	    <div class="col-sm-3">
  		  	 	    	  <button type="button" class="btn btn-success btn-sm" @click="getStoretList"><span class="glyphicon glyphicon-refresh"></span> 刷新库存</button>
  		  	 	    </div>
  		  	 	    <div class="col-sm-9">
  		  	 	    	  <form class="form-inline">
		  		  	 	    	  <div class="input-group pull-right" style="width:300px">
		  		  	 	    	  	  <input  v-model="searchCon.inputText" type="text" placeholder="请输入机器人名称、登录帐号或端口" class="input-sm form-control">
		  		  	 	    	  	  <span class="input-group-btn">
		                            <button type="button" class="btn btn-sm btn-primary" @click="getStoretList"> 搜索</button>
		  		  	 	    	  	  </span>
		  		  	 	    	  </div>
		  		  	 	    	  <div class="input-group input-group-sm pull-right" style="margin-right:10px">
												      <span class="input-group-addon">饰品状态</span>	
													    <select v-model="searchCon.botStatus" class="form-control input-sm" @change="getStoretList">
													    	  <option value="" selected="selected">--全部--</option>
				  		  	 	    	  	    <option value="1">未上架</option>
				  		  	 	    	  	    <option value="2">上架中</option>
				  		  	 	    	    </select>
											  </div>
										</form>
  		  	 	    </div>
  		  	 </div>
  		  	 <table class="table table-auto table-striped table-hover">
		          <thead>
		             <tr>
		                <th>饰品ID</th>
		                <th>饰品名称</th>
		                <th>拥有者steamID</th>
		                <th>拥有者姓名</th>
		                <th>机器人steamID</th>
		                <th>机器人名称</th>
		                <th>饰品状态</th>
		                <th>出售价格</th>
		             </tr>
		          </thead>
		          <tbody v-if="storeList.length>0">
		             <tr v-for="store in storeList">
		                <td><a href="javascript:void(0)" @click="showModal">{{store.asset._id}}</a></td>
		                <td>{{store.asset.asset_name}}</td>
		                <td><a href="javascript:void(0)" @click="showModal">{{store.belong_user.user_steamid}}</a></td>
		                <td>{{store.belong_user.user_name}}</td>
		                <td><a href="javascript:void(0)" @click="showModal">{{store.bot.bot_steamid}}</a></td>
		                <td>{{store.bot.bot_name}}</td>
		                <td v-html="getAssetState(store.asset_state)"></td>
		                <td>{{store.sale_price}}</td>
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
        storeList:[],
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
        queryApi:"http://localhost:8809/api/store/getStoreInfo?type=4",
        addApi:"http://localhost:8809/api/bot/add",
        editApi:"http://localhost:8809/api/bot/update",
        loginApi:"http://localhost:8809/api/bot/login",
        logoutApi:"http://localhost:8809/api/bot/logout"
      }
  },
  mounted:function(){
  	  this.getStoretList();  
      eventBus.$on("saveClick", this.formAjaxSubmit)
  },
  methods:{
  	getStoretList:function(){
  		  this.$http.get(this.queryApi).then(response => {
        	  var result = response.data
        	  if(result.status=="succ"){
        	  	   this.storeList = result.result;
        	  }else{
        	  	   layer.msg(result.msg,{icon:7});
        	  }
			  }, response => {
			       layer.msg("请求出错了！",{icon:7});
			  });
  	},
  	getAssetState:function(state){
	  		if(state=="1"){
	  			 return "<label class='label label-warning'>未上架</label>";
	  		}else if(state=="2"){
	  			 return "<label class='label label-success'>上架中</label>";
	  		}
  	},
  	showModal:function(){
  		
  	}
  }
}
</script>
