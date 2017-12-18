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
		                <th>英雄图片</th>
		                <th>排序</th>
		                <th>操作</th>
		             </tr>
		          </thead>
		          <tbody v-if="heroList.length>0">
		             <tr v-for="hero in heroList">
		                <td>{{hero.hero_cn_name}}</td>
		                <td>{{hero.hero_en_name}}</td>
		                <td>{{hero.hero_short_name}}</td>
		                <td v-html="getHeroType(hero.hero_type)"></td>
		                <td><img :src="'/static/img/hero/'+hero.hero_img"></td>
		                <td>{{hero.order}}</td>
		                <td><a href="javascript:void(0)" @click="showModal(2,hero._id)">编辑</a> - <a href="javascript:void(0)">删除</a></td>
		             </tr>
		          </tbody>
              <tbody v-else>
                 <tr><td colspan="7" class="noData">暂无数据！</td></tr>
              </tbody>
		      </table>
          <paginat v-if="heroList.length>0" :total-count="totalCount" :p-size="searchCon.pageSize"></paginat>
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
import paginat from '../../components/paginat.vue'

export default {
  name: 'user',
  components:{
  	  "modal-header": modalHeader,
      "modal-footer": modalFooter,
      "hero-edit": heroEdit,
      "paginat" : paginat
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
        totalCount:0,
        searchCon:{pageSize:15,pageNo:1},
        queryApi:"http://localhost:8809/api/hero/get",
        addApi:"http://localhost:8809/api/hero/add",
        editApi:"http://localhost:8809/api/hero/update"
      }
  },
  mounted:function(){
      var _this = this;
      _this.getHeroList();
      eventBus.$on("saveClick", _this.formAjaxSubmit);
      eventBus.$on("reloadList",function(pageSize,pageNo){
        _this.searchCon.pageSize = parseInt(pageSize);
        _this.searchCon.pageNo = parseInt(pageNo);
        _this.getHeroList();
      })
  },
  methods:{
  	getHeroList:function(){
  		  this.$http.post(this.queryApi,{searchCon:this.searchCon}).then(response => {
        	  var result = response.data
        	  if(result.status=="succ"){
        	  	   this.heroList = result.result;
        	  	   this.totalCount = result.totalCount;
        	  }else{
        	  	   layer.msg(result.msg,{icon:7});
        	  }
			  }, response => {
			       layer.msg("请求出错了！",{icon:7});
			  });
  	},
  	getHeroType:function(type){
	  		if(type=="1"){
	  			 return "<span class='label label-danger'>力量英雄</span>";
	  		}else if(type=="2"){
	  			 return "<span class='label label-success'>敏捷英雄</span>";
	  		}else if(type=="3"){
	  			 return "<span class='label label-info'>智力英雄</span>";
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

<style scoped>
   table tr td img{width:60px;height:40px}
</style>
