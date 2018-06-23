<template>
  <section class="content">
  	<div class="ibox">
  		  <div class="ibox-title">
  		  	  <h5>饰品稀有度</h5>
  		  </div><!--end of ibox-title-->
  		  <div class="ibox-content">
  		  	 <div class="ibox-content-search row">
  		  	 	    <div class="col-sm-3">
  		  	 	    	  <button type="button" class="btn btn-primary btn-sm" @click="showModal(1)">新增字典项</button>
  		  	 	    </div>
  		  	 	    <div class="col-sm-9">
  		  	 	    	 <form class="form-inline">
			  		  	 	     <div class="input-group input-group-sm pull-right">
											      <span class="input-group-addon">字典项名称</span>
												    <select v-model="dict_name_obj"  class="form-control input-sm" @change="getDictListByType">
			  		  	 	    	        <option v-for="dict in dictNameList" :value="{value:dict.dict_name,text:dict.dict_descr}">{{dict.dict_descr}}</option>
                            </select>
										   </div>
									 </form>
  		  	 	    </div>
  		  	 </div>
  		  	 <table class="table table-auto table-striped table-hover">
		          <thead>
		             <tr>
		                <th>序号</th>
                    <th>排序</th>
		                <th>code</th>
		                <th>code_name</th>
		                <th>是否在使用</th>
		                <th>创建时间</th>
		                <th>操作</th>
		             </tr>
		          </thead>
		          <tbody>
		             <tr v-for="(dict,index) in dictList">
		                <td>{{index+1}}</td>
                    <td>{{dict.order}}</td>
		                <td>{{dict.dict_code}}</td>
		                <td>{{dict.dict_code_name}}</td>
		                <td v-html="getInuse(dict.in_use)"></td>
		                <td>{{Util.timeFormat(dict.create_time,"YYYY-MM-DD HH:mm:ss")}}</td>
		                <td><a href="javascript:void(0)" @click="showModal(2,dict._id)">编辑</a> - <a href="javascript:;" @click="delDict(dict._id)">删除</a></td>
		             </tr>
		          </tbody>
		      </table>
  		  </div><!--end of ibox-content-->
  	</div>
  	<modal :name="modalName"  :width="360" :height="340" :pivotY="0.3" :pivotX="0.6">
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
        dict_name_obj:{},
      	dictNameList:[],
        dictList:[],
        dictInfo:{
        	   _id:"",
             dict_name:"",
             dict_descr:"",
             dict_code:"",
             dict_code_name: "",
             order:""
        },
        queryApi:"api/dataDict/get",
        querNameApi:"api/dataDict/getName",
        addApi:"api/dataDict/add",
        editApi:"api/dataDict/update",
        delApi:"api/dataDict/del"
      }
  },
  mounted:function(){
  	  this.getDictList();
      eventBus.$on("saveClick", this.formAjaxSubmit)
  },
  methods:{
  	getDictList:async function(){
  	    //先获取字典项名称，回填select
        try{
            let result =  await this.$fetch(this.querNameApi);
            this.dictNameList = result.result;
            if(this.dictNameList.length>0){
              this.dict_name_obj = {value:this.dictNameList[0].dict_name,text:this.dictNameList[0].dict_descr}
            }
        }catch(err){
           layer.msg(err,{icon:7});
        }

        //默认查询第一个字典项的数据字典
        this.getDictListByType();
  	},
    //下拉列表切换时，查询数据字典
    getDictListByType: function(){
        this.$post(this.queryApi,{dict_name:this.dict_name_obj.value}).then(result => {
           this.dictList = result.result;
        })
    },
  	getInuse:function(in_use){
        return "<label class='label label-success'>使用中</label>";
  	},
  	showModal:function(type,id){
  		  if(type==1){
  		  	 this.modalTitle = "添加字典项";
  		  	 this.dictInfo = {_id:"",dict_name: this.dict_name_obj.value,dict_descr:this.dict_name_obj.text,dict_code:"",dict_code_name: "",order:""};
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
        this.$post(this.addApi,{dictInfo:dictInfo}).then(response => {
            layer.msg("添加成功!",{icon:1});
            this.$modal.hide(this.modalName);
            this.getDictList();
			  });
    },
    editDict:function(){
        this.$post(this.editApi,{dictInfo:this.dictInfo}).then(response => {
            layer.msg("修改成功",{icon:1});
            this.$modal.hide(this.modalName);
            this.getDictListByType();
			  });
    },
    delDict:function(dict_id){
      layer.confirm('确定要删除所选的字典项吗？',{icon: 3, title:'删除提示'},
        index => {
          layer.close(index);
          this.$post(this.delApi, {dict_id: dict_id}).then(response => {
            layer.msg("删除成功", {icon: 1});
            this.getDictListByType();
          });
        }
      );
    }
  }
}
</script>

<style>


</style>
