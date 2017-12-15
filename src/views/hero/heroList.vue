<template>
  <section class="content">
  	<div class="ibox">
  		  <div class="ibox-title">
  		  	  <h5>英雄资料管理</h5>
  		  </div><!--end of ibox-title-->
  		  <div class="ibox-content">
  		  	 <div class="ibox-content-search row">
  		  	 	    <div class="col-sm-3">
  		  	 	    	  <button type="button" class="btn btn-primary btn-sm" @click="showModal(1)">添加英雄资料</button>
  		  	 	    </div>
  		  	 	    <div class="col-sm-9">
  		  	 	    	  
  		  	 	    </div>
  		  	 </div>
  		  	 <table class="table table-auto table-striped table-hover">
		          <thead>
		             <tr>
		                <th>英雄名</th>
		                <th>英文名</th>
		                <th>简称</th>
		                <th>类型</th>
		                <th>图片路径</th>
		                <th>排序</th>
		                <th>操作</th>
		             </tr>
		          </thead>
		          <tbody>
		             <tr v-for="hero in heroList">
		                <td>{{hero.hero_cn_name}}</td>
		                <td>{{hero.hero_en_name}}</td>
		                <td>{{hero.hero_short_name}}</td>
		                <td v-html="getHeroType(hero.hero_type)"></td>
		                <td>{{hero.hero_img}}</td>
		                <td>{{hero.order}}</td>
		                <td><a href="javascript:void(0)" @click="showModal(2,hero._id)">编辑</a> - <a href="javascript:void(0)">删除</a></td>
		             </tr>
		          </tbody>
		      </table>
  		  </div><!--end of ibox-content-->
  	</div>
  	<modal :name="modalName"  :width="500" :height="260" :pivotY="0.3" :pivotX="0.6">
	      <modal-header :modal-title="modalTitle" :modal-name="modalName"></modal-header>
	      <div class="modal-body">
           <hero-edit :hero-info="heroInfo"></hero-edit>
        </div>
	      <modal-footer :modal-name="modalName"></modal-footer>
	  </modal>
  </section>

</template>

<script>

import modalHeader from '../../components/modalHeader.vue'
import modalFooter from '../../components/modalFooter.vue'
import heroEdit from './heroEdit.vue'

export default {
  name: 'user',
  components:{
  	  "modal-header": modalHeader,
      "modal-footer": modalFooter,
      "hero-edit": heroEdit
  },
  data:function(){
      return{
      	modalName:"botEditModal",
      	modalTitle:"添加英雄资料",
        heroList:[],
        heroInfo:{
        	   _id:"",
             hero_en_name: "",
             hero_cn_name:"",
             hero_short_name: "",
             hero_img:"",
             hero_type:"",
             order:""
        },
        queryApi:"http://localhost:8809/api/hero/get",
        addApi:"http://localhost:8809/api/hero/add",
        editApi:"http://localhost:8809/api/hero/update"
      }
  },
  mounted:function(){
  	  this.getHeroList();  
      eventBus.$on("saveClick", this.formAjaxSubmit)
  },
  methods:{
  	getHeroList:function(){
  		  this.$http.get(this.queryApi).then(response => {
        	  var result = response.data
        	  if(result.status=="succ"){
        	  	   this.heroList = result.result1;
        	  }else{
        	  	   layer.msg(result.msg,{icon:7});
        	  }
			  }, response => {
			       layer.msg("请求出错了！",{icon:7});
			  });
  	},
  	getHeroType:function(type){
	  		if(type=="1"){
	  			 return "<label class='label label-danger'>力量英雄</label>";
	  		}else if(type=="2"){
	  			 return "<label class='label label-success'>敏捷英雄</label>";
	  		}else if(type=="3"){
	  			 return "<label class='label label-info'>智力英雄</label>";
	  		}
  	},
  	showModal:function(type,id){
  		  if(type==1){
  		  	 this.modalTitle = "添加英雄资料";
  		  	 this.heroInfo = { _id:"",hero_en_name: "",hero_cn_name:"",hero_short_name: "",hero_img:"",hero_type:"",order:""};
  		  }else{
  		  	 this.modalTitle = "修改英雄资料";
  		  	 var list = this.heroList;
  		  	 var len = list.length;
  		  	 for(var i=0;i<len;i++){
  		  	 	   if(list[i]._id ==id){
  		  	 	   	  this.heroInfo = list[i]
  		  	 	   }
  		  	 }
  		  }
  		  this.$modal.show(this.modalName);
  	},
    formAjaxSubmit:function(){
    	  if(this.heroInfo._id!=""&&this.heroInfo._id!=null){
    	  	  this.editHero();
    	  }
    	  else{
    	  	  this.addHero();
    	  }
        
    },
    addHero:function(){
    	  var heroInfo = this.heroInfo;
    	  delete heroInfo._id        //添加是不需要_id属性
        this.$http.post(this.addApi,{heroInfo:heroInfo}).then(response => {
        	  var result = response.data;
        	  if(result.status=="succ"){
        	  	  layer.msg("添加成功!",{icon:1});
        	  	  this.$modal.hide(this.modalName);     
        	  	  this.getHeroList();
        	  }else{
        	  	   layer.msg(result.msg,{icon:7});
        	  }			    
			  }, response => {
			      layer.msg("请求出错了！",{icon:7});
			  });
    },
    editHero:function(){
        this.$http.post(this.editApi,{heroInfo:this.heroInfo}).then(response => {
        	  var result = response.data;
        	  if(result.status=="succ"){
        	  	  layer.msg("修改成功",{icon:1});
        	  	  this.$modal.hide(this.modalName);     
        	  	  this.getHeroList();
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
