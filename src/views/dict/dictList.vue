<template>
  <section class="content">
  	<div class="ibox">
  		  <div class="ibox-title">
  		  	  <h5>饰品稀有度</h5>
  		  </div><!--end of ibox-title-->
  		  <div class="ibox-content">
  		  	 <div class="ibox-content-search row">
  		  	 	    <div class="col-sm-3">
  		  	 	    	  <button type="button" class="btn btn-primary btn-sm" @click="showModal(1)">添加字典项</button>
  		  	 	    </div>
  		  	 	    <div class="col-sm-9">
  		  	 	    	 <form class="form-inline">
			  		  	 	     <div class="input-group input-group-sm pull-right">
											      <span class="input-group-addon">字典项名称</span>	
												    <select v-model="dict_name" class="form-control input-sm" @change="getDictList">
			  		  	 	    	  	  <option value="accessories_rarity" selected="selected">饰品稀有度</option>
			  		  	 	    	  	  <option value="accessories_type">饰品类型</option>
			  		  	 	    	    </select>
										   </div>
									 </form>
  		  	 	    </div>
  		  	 </div>
  		  	 <table class="table table-auto table-striped table-hover">
		          <thead>
		             <tr>
		                <th>序号</th>
		                <th>code</th>
		                <th>value</th>
		                <th>排序</th>
		                <th>是否在使用</th>
		                <th>创建时间</th>
		                <th>操作</th>
		             </tr>
		          </thead>
		          <tbody>
		             <tr v-for="(dict,index) in dictList">
		                <td>{{index+1}}</td>
		                <td>{{dict.dict_code}}</td>
		                <td>{{dict.dict_value}}</td>
		                <td>{{dict.order}}</td>
		                <td v-html="getInuse(dict.in_use)"></td>
		                <td>{{timeFormat(dict.create_time)}}</td>
		                <td><a href="javascript:void(0)" @click="showModal(2,dict._id)">编辑</a> - <a href="javascript:void(0)">删除</a></td>
		             </tr>
		          </tbody>
		      </table>
  		  </div><!--end of ibox-content-->
  	</div>
  	<modal :name="modalName"  :width="320" :height="290" :pivotY="0.3" :pivotX="0.6">
	      <modal-header :modal-title="modalTitle" :modal-name="modalName"></modal-header>
	      <div class="modal-body">
           <dict-edit :dict-info="dictInfo"></dict-edit>
        </div>
	      <modal-footer :modal-name="modalName"></modal-footer>
	  </modal>
  </section>

</template>

<script>

import modalHeader from '../../components/modalHeader.vue'
import modalFooter from '../../components/modalFooter.vue'
import dictEdit from './dictEdit.vue'
import moment from  'moment'

export default {
  name: 'dict',
  components:{
  	  "modal-header": modalHeader,
      "modal-footer": modalFooter,
      "dict-edit": dictEdit
  },
  data:function(){
      return{
      	modalName:"dictEditModal",
      	modalTitle:"添加字典项",
      	dict_name:"accessories_rarity",
        dictList:[],
        dictInfo:{
        	   _id:"",
             dict_name: "",
             dict_code:"",
             dict_value: "",
             order:""
        },
        queryApi:"http://localhost:8809/api/dataDict/get?name=",
        addApi:"http://localhost:8809/api/dataDict/add",
        editApi:"http://localhost:8809/api/dataDict/update",
      }
  },
  mounted:function(){
  	  this.getDictList();  
      eventBus.$on("saveClick", this.formAjaxSubmit)
  },
  methods:{
  	getDictList:function(){
  		  this.$http.get(this.queryApi+this.dict_name).then(response => {
        	  var result = response.data
        	  if(result.status=="succ"){
        	  	   this.dictList = result.result;
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
    timeFormat:function(datetime){
  		  if(datetime){
  		  	 return moment(datetime).format('YYYY-MM-DD HH:mm:ss');
  		  }		  
  	},
  	showModal:function(type,id){
  		  if(type==1){
  		  	 this.modalTitle = "添加字典项";
  		  	 this.dictInfo = {_id:"",dict_name: this.dict_name,dict_code:"",dict_value: "",order:""};
  		  }else{
  		  	 this.modalTitle = "编辑字典项";
  		  	 var list = this.dictList;
  		  	 var len = list.length;
		  	 	 for(var i=0;i<len;i++){
		  	 	   if(list[i]._id ==id){
		  	 	   	  this.dictInfo = list[i]
		  	 	   }
		  	   }
  		  	
  		  }
  		  this.$modal.show(this.modalName);
  	},
    formAjaxSubmit:function(){
    	  if(this.dictInfo._id!=""&&this.dictInfo._id!=null){
    	  	  this.editDict();
    	  }
    	  else{
    	  	  this.addDict();
    	  }
        
    },
    addDict:function(){
    	  var dictInfo = this.dictInfo;
    	  delete dictInfo._id        //添加是不需要_id属性
        this.$http.post(this.addApi,{dictInfo:dictInfo}).then(response => {
        	  var result = response.data;
        	  if(result.status=="succ"){
        	  	  layer.msg("添加成功!",{icon:1});
        	  	  this.$modal.hide(this.modalName);     
        	  	  this.getDictList();
        	  }else{
        	  	   layer.msg(result.msg,{icon:7});
        	  }			    
			  }, response => {
			      layer.msg("请求出错了！",{icon:7});
			  });
    },
    editDict:function(){
        this.$http.post(this.editApi,{dictInfo:this.dictInfo}).then(response => {
        	  var result = response.data;
        	  if(result.status=="succ"){
        	  	  layer.msg("修改成功",{icon:1});
        	  	  this.$modal.hide(this.modalName);     
        	  	  this.getDictList();
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


</style>
