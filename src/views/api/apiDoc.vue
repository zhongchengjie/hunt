<template>
  <section class="content">
  	<div class="ibox">
  		  <div class="ibox-title">
  		  	  <h5>API文档</h5>
  		  </div><!--end of ibox-title-->
  		  <div class="ibox-content">
  		  	 <div class="ibox-content-search row">
  		  	 	    <div class="col-sm-3">
  		  	 	    	  <button type="button" class="btn btn-primary btn-sm" @click="showModal(1)">添加API说明</button>
  		  	 	    </div>
  		  	 	    <div class="col-sm-9">
  		  	 	    	  <form class="form-inline">
                         <div class="input-group pull-right" style="width:240px">
                              <input v-model="searchCon.inputText" type="text" placeholder="请输入API名称或API描述" class="input-sm form-control">
                              <span class="input-group-btn">
		                               <button type="button" class="btn btn-sm btn-primary" @click="getApiDocList"> 搜索</button>
		  		  	 	    	  	    </span>
                        </div>
		  		  	 	    	  <div class="input-group input-group-sm pull-right" style="margin-right:10px">
												      <span class="input-group-addon">请求方式</span>
													    <select v-model="searchCon.method" class="form-control input-sm" @change="getApiDocList">
													    	  <option value="" selected="selected">--全部--</option>
				  		  	 	    	  	    <option value="get">get方式</option>
				  		  	 	    	  	    <option value="post">post方式</option>
				  		  	 	    	    </select>
											  </div>
                        <div class="input-group input-group-sm pull-right" style="margin-right:10px">
                            <span class="input-group-addon">所属模块</span>
                            <select v-model="searchCon.module" class="form-control input-sm" @change="getApiDocList">
                                <option value="" selected="selected">--全部--</option>
                                <option value="用户模块">用户模块</option>
                            </select>
                        </div>
										</form>
  		  	 	    </div>
  		  	 </div>
  		  	 <table class="table table-auto table-striped table-hover">
		          <thead>
		             <tr>
		                <th>api名称</th>
		                <th>api描述</th>
                    <th>所属模块</th>
		                <th class="text-center">请求方式</th>
		                <th class="text-center">需要token</th>
		                <th>所需参数</th>
		                <th>参数说明</th>
                    <th>备注说明</th>
                    <th>操作</th>
		             </tr>
		          </thead>
		          <tbody v-if="apiDocList.length>0">
		             <tr v-for="apiDoc in apiDocList">
		                <td>{{apiDoc.api_name}}</td>
		                <td>{{apiDoc.api_descr}}</td>
                    <td>{{apiDoc.api_module}}</td>
		                <td class="text-center">{{apiDoc.api_method}}</td>
		                <td class="text-center">{{apiDoc.need_token==1?"√":"×"}}</td>
		                <td>{{apiDoc.api_params}}</td>
		                <td v-html="Util.newLineText(apiDoc.params_descr)"></td>
                    <td>{{apiDoc.remark}}</td>
                    <td><a href="javascript:void(0)" @click="showModal(2,apiDoc._id)">编辑</a> - <a href="javascript:void(0)">删除</a></td>
                 </tr>
		          </tbody>
		          <tbody v-else>
		          	   <tr><td colspan="7" class="noData">暂无数据！</td></tr>
		          </tbody>
		      </table>
  		  </div><!--end of ibox-content-->
  	</div>
    <modal :name="modalName"  :width="560" :height="520" :pivotY="0.3" :pivotX="0.6">
	      <modal-header :modal-title="modalTitle" :modal-name="modalName"></modal-header>
	      <div class="modal-body">
           <apidoc-edit :apidoc-info="apiDocInfo"></apidoc-edit>
        </div>
	      <modal-footer :modal-name="modalName"></modal-footer>
	  </modal>
  </section>

</template>

<script>

import modalHeader from '../../components/modalHeader.vue'
import modalFooter from '../../components/modalFooter.vue'
import apiDocEdit from './apiDocEdit'

export default {
  name: 'apiDoc',
  components:{
  	  "modal-header": modalHeader,
      "modal-footer": modalFooter,
      "apidoc-edit":apiDocEdit
  },
  data:function(){
      return{
      	modalName:"apiDocEditModal",
      	modalTitle:"添加API说明",
        apiDocList:[],
        apiDocInfo:{
          _id:"",
          api_name: "",
          api_descr:"",
          api_module:"",
          api_method: "",
          api_params:"",
          params_descr:"",
          need_token:"",
          remark:""
        },
        searchCon:{inputText:"",method:"",module:""},
        queryApi:"api/apiDoc/get",
        addApi:"api/apiDoc/add",
        editApi:"api/apiDoc/update"
      }
  },
  mounted:function(){
  	  var _this = this;
  	  _this.getApiDocList();
      eventBus.$on("saveClick", _this.formAjaxSubmit)
  },
  methods:{
    getApiDocList:function(){
        this.$fetch(this.queryApi).then(result => {
             this.apiDocList = result.result;
			  });
  	},
    showModal:function(type,id){
      if(type==1){
        this.modalTitle = "添加API说明";
        this.apiDocInfo = { _id:"",api_name: "",api_descr:"",api_module:"",api_method: "post",api_params:"",params_descr:"",need_token:1,remark:""};
      }
      else{
        this.modalTitle = "修改API说明";
        var list = this.apiDocList;
        var len = list.length;
        for(var i=0;i<len;i++){
          if(list[i]._id ==id){
            this.apiDocInfo = list[i];
          }
        }
      }
      this.$modal.show(this.modalName);
    },
    formAjaxSubmit:function(){
      if(this.apiDocInfo._id!=""&&this.apiDocInfo._id!=null){
        this.editApiDoc();
      }
      else{
        this.addApiDoc();
      }

    },
    addApiDoc:function(){
      var apiDocInfo = this.apiDocInfo;
      delete apiDocInfo._id;
      this.$post(this.addApi,{apiDocInfo:apiDocInfo}).then(result => {
        layer.msg("添加成功!",{icon:1});
        this.$modal.hide(this.modalName);
        this.getApiDocList();
      });
    },
    editApiDoc:function(){
      this.$post(this.editApi,{apiDocInfo:this.apiDocInfo}).then(result => {
        layer.msg("修改成功",{icon:1});
        this.$modal.hide(this.modalName);
        this.getApiDocList();
      });
    },
    test:function(){
    	 var apiDocInfo1 = {_id:"123",api_name:"update by task1"}
    	 var apiDocInfo2 = {api_name:"add by task2 at "+new Date().getTime()}
    	 var apiDocInfo3 = {_id:"456",api_name:"update by task3"}
    	 var task1 = this.$post(this.editApi,{apiDocInfo:apiDocInfo1});
    	 var task2 = this.$post(this.addApi,{apiDocInfo:apiDocInfo2});
    	 var task3 = this.$post(this.editApi,{apiDocInfo:apiDocInfo3});
    	 //并行执行任务。其中某个任务出错时，并不会影响其它并行任务的执行。
    	 Promise.all([task1, task2]).then(function (results) {
			    console.log(results);
			 }).catch(err=>{
			 	  console.log(err);
			 })
			 //串行执行任务。
			 /*task1.then(task2).catch(err=>{
			 	  console.log(err);
			 })*/
			 //应用到数据字典？
    }
  }
}
</script>
