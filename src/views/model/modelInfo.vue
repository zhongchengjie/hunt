<template>
  <section class="content">
  	<div class="ibox">
  		  <div class="ibox-title">
  		  	  <h5>Model管理<span style="color:#999;font-weight:normal;"> (下拉选择模型以查看其详细信息) </span><a style="margin-left:10px;cursor: pointer" title="刷新Model"><span class="glyphicon glyphicon-refresh"></span></a></h5>
  		  </div><!--end of ibox-title-->
  		  <div class="ibox-content">
  		  	 <div class="ibox-content-search row">
  		  	 	    <div class="col-sm-12">
  		  	 	    	 <form class="form-inline">
			  		  	 	     <div class="input-group input-group-sm">
											      <span class="input-group-addon">模型</span>
												    <select v-model="modelName"  class="form-control input-sm" @change="getModelInfo">
			  		  	 	    	        <option v-for="item in modelNames" :value="item">{{item}}</option>
                            </select>

										   </div>
                       <span style="color:#999;margin-left:10px">当前选择的Model：</span><b>{{modelName}}</b>
                       <button type="button" class="btn btn-success btn-xs" @click="asyncModel(1)" style="margin-left:20px">强制同步模型</button>
                       <button type="button" class="btn btn-success btn-xs" @click="asyncModel(2)" style="margin-left:10px">同步模型</button>
                   </form>
  		  	 	    </div>
  		  	 </div>
  		  	 <table class="table table-auto table-striped table-hover">
		          <thead>
		             <tr>
		                <th>序号</th>
		                <th>字段名</th>
		                <th>类型</th>
                    <th>默认值</th>
		                <th class="text-center">允许为空</th>
		                <th class="text-center">是否为主键</th>
                    <th>说明</th>
		             </tr>
		          </thead>
		          <tbody>
		             <tr v-for="(item,index) in modelInfoList">
		                <td>{{index+1}}</td>
		                <td>{{item.name}}</td>
		                <td>{{item.type}}</td>
                    <td>{{item.defaultValue}}</td>
		                <td class="text-center">{{item.allowNull?"√":"×"}}</td>
                    <td class="text-center">{{item.primaryKey?"是":"-"}}</td>
                    <td>-</td>
		             </tr>
		          </tbody>
		      </table>
  		  </div><!--end of ibox-content-->
  	</div>

  </section>

</template>

<script>



export default {
  name: 'model',
  data:function(){
      return{
        modelName:"",
        modelNames:[],
        modelInfoList:[]
      }
  },
  mounted:function(){
      this.getModelInfo();
  },
  methods:{
  	getModelName:async function(){
  	    //先获取已定义的模型，回填select
        try{
           let result =  await this.$fetch("http://120.79.129.124:8802/api/model/name/get");
           this.modelNames = result.result;
           this.modelNames.length>0?this.modelName = this.modelNames[0]:"";
        }catch(err){
           layer.msg(err,{icon:7});
        }
  	},
    getModelInfo:async function () {
  	    if(this.modelNames.length==0){
           await this.getModelName();
        }
        this.$fetch("http://120.79.129.124:8802/api/model/descr/get",{modelName:this.modelName}).then(result=>{
            this.modelInfoList = result.result;
        }).catch(err=>{
            layer.msg("请先同步模型！",{icon:7});
        })
    },
    asyncModel:function(type){
        this.$fetch("http://120.79.129.124:8802/api/model/sync",{modelName:this.modelName,type:type}).then(()=>{
           layer.msg("同步成功",{icon:1});
      })
    }

  }
}
</script>

<style>


</style>
