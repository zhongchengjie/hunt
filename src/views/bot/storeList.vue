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
		  		  	 	    	  	  <input  v-model="searchCon.inputText" type="text" placeholder="请输入..." class="input-sm form-control">
		  		  	 	    	  	  <span class="input-group-btn">
		                            <button type="button" class="btn btn-sm btn-primary" @click="getStoretList"> 搜索</button>
		  		  	 	    	  	  </span>
		  		  	 	    	  </div>
		  		  	 	    	  <div class="input-group input-group-sm pull-right" style="margin-right:10px">
												      <span class="input-group-addon">饰品状态</span>
													    <select v-model="searchCon.assetState" class="form-control input-sm" @change="getStoretList">
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
		                <td><a href="javascript:void(0)" @click="showModal(1,store.asset)">{{store.asset._id}}</a></td>
		                <td>{{store.asset.asset_name}}</td>
		                <td><a href="javascript:void(0)" @click="showModal(2,store.belong_user)">{{store.belong_user.user_steamid}}</a></td>
		                <td>{{store.belong_user.user_name}}</td>
		                <td><a href="javascript:void(0)" @click="showModal(3,store.bot)">{{store.bot.bot_steamid}}</a></td>
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
    <modal name="assetInfoModal"  :width="600" :height="640" :pivotY="0.3" :pivotX="0.6">
	      <modal-header :modal-title="modalTitle" modal-name="assetInfoModal"></modal-header>
	      <div class="modal-body">
	      	  <asset-info :info-obj="infoObj" ></asset-info>
        </div>
	      <modal-footer modal-name="assetInfoModal" :type="2"></modal-footer>
	  </modal>
	  <modal name="userInfoModal"  :width="500" :height="240" :pivotY="0.3" :pivotX="0.6">
	      <modal-header :modal-title="modalTitle" modal-name="userInfoModal"></modal-header>
	      <div class="modal-body">
	      	  <user-info :info-obj="infoObj" ></user-info>
        </div>
	      <modal-footer modal-name="userInfoModal" :type="2"></modal-footer>
	  </modal>
	  <modal name="botInfoModal"  :width="610" :height="240" :pivotY="0.3" :pivotX="0.6">
	      <modal-header :modal-title="modalTitle" modal-name="botInfoModal"></modal-header>
	      <div class="modal-body">
	      	   <bot-info :info-obj="infoObj" ></bot-info>
        </div>
	      <modal-footer modal-name="botInfoModal" :type="2"></modal-footer>
	  </modal>

  </section>

</template>

<script>

import modalHeader from '../../components/modalHeader.vue'
import modalFooter from '../../components/modalFooter.vue'
import botInfo from './botInfo.vue'
import userInfo from './userInfo.vue'
import assetInfo from './assetInfo.vue'

export default {
  name: 'bot',
  components:{
  	  "modal-header": modalHeader,
      "modal-footer": modalFooter,
      "bot-info": botInfo,
      "user-info": userInfo,
      "asset-info": assetInfo

  },
  data:function(){
      return{
      	modalName:"assetInfoModal",
      	modalTitle:"详细信息",
        storeList:[],
        infoObj:{},
        searchCon:{assetState:"",inputText:"",pageSize:15,pageNo:1},
        queryApi:"api/store/getStoreInfo?type=4"
      }
  },
  mounted:function(){
  	  this.getStoretList();
  },
  methods:{
  	getStoretList:function(){
       //....... 按搜索条件过滤，待完善
  		  this.$fetch(this.queryApi).then(result => {
             this.storeList = result.result;
			  });
  	},
  	getAssetState:function(state){
	  		if(state=="1"){
	  			 return "<label class='label label-warning'>未上架</label>";
	  		}else if(state=="2"){
	  			 return "<label class='label label-success'>上架中</label>";
	  		}
  	},
  	showModal:function(type,infoObj){
  		  this.infoObj = infoObj;
  		  if(type==1){
  		  	 this.modalTitle = "饰品详细信息";
  		  	 this.$modal.show("assetInfoModal");
  		  }else if(type==2){
  		  	 this.modalTitle = "用户["+ infoObj.user_steamid+"]详细信息";
  		  	 this.$modal.show("userInfoModal");
  		  }else if(type==3){
  		  	 this.modalTitle = "机器人["+ infoObj.bot_steamid+"]详细信息";
  		  	 this.$modal.show("botInfoModal");
  		  }
  	}
  }
}
</script>
