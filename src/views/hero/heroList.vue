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
                    <form class="form-inline">
		  		  	 	    	  <div class="input-group pull-right" style="width:260px">
		  		  	 	    	  	  <input v-model="searchCon.inputText" type="text" placeholder="请输入英雄的中英文名称或简称" class="input-sm form-control">
		  		  	 	    	  	  <span class="input-group-btn">
		                            <button type="button" class="btn btn-sm btn-primary" @click="getHeroList"> 搜索</button>
		  		  	 	    	  	  </span>
		  		  	 	    	  </div>
		  		  	 	    	  <div class="input-group input-group-sm pull-right" style="margin-right:10px">
												      <span class="input-group-addon">英雄类型</span>
													    <select v-model="searchCon.heroType" class="form-control input-sm" @change="getHeroList">
													    	  <option value="" selected="selected">--全部--</option>
				  		  	 	    	  	    <option value="1">力量英雄</option>
				  		  	 	    	  	    <option value="2">敏捷英雄</option>
				  		  	 	    	  	    <option value="3">智力英雄</option>
				  		  	 	    	    </select>
											  </div>
										</form>
  		  	 	    </div>
  		  	 </div>
  		  	 <table class="table table-auto table-striped table-hover">
		          <thead>
		             <tr>
		                <th>英雄名</th>
		                <th>英文名</th>
		                <th>简称</th>
		                <th>英雄类型</th>
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
		                <td><a href="javascript:void(0)" @click="showModal(2,hero._id)">编辑</a><!-- - <a href="javascript:void(0)">删除</a>--></td>
		             </tr>
		          </tbody>
              <tbody v-else>
                 <tr><td colspan="7" class="noData">暂无数据！</td></tr>
              </tbody>
		      </table>
          <paginat v-if="heroList.length>0" :total-count="totalCount" :p-size="searchCon.pageSize"></paginat>
        </div><!--end of ibox-content-->
  	</div>
  	<modal :name="addModal"  :width="500" :height="460" :pivotY="0.3" :pivotX="0.6">
	      <modal-header modal-title="添加英雄资料" :modal-name="addModal"></modal-header>
	      <div class="modal-body">
           <hero-add :hero-info="heroInfo"></hero-add>
        </div>
	      <modal-footer :modal-name="addModal"></modal-footer>
	  </modal>
	  <modal :name="editModal"  :width="500" :height="260" :pivotY="0.3" :pivotX="0.6">
	      <modal-header modal-title="编辑英雄资料" :modal-name="editModal"></modal-header>
	      <div class="modal-body">
           <hero-edit :hero-info="heroInfo"></hero-edit>
        </div>
	      <modal-footer :modal-name="editModal"></modal-footer>
	  </modal>
  </section>

</template>

<script>

import modalHeader from '../../components/modalHeader.vue'
import modalFooter from '../../components/modalFooter.vue'
import heroAdd from './heroAdd.vue'
import heroEdit from './heroEdit.vue'
import paginat from '../../components/paginat.vue'

export default {
  name: 'user',
  components:{
  	  "modal-header": modalHeader,
      "modal-footer": modalFooter,
      "hero-add": heroAdd,
      "hero-edit": heroEdit,
      "paginat" : paginat
  },
  data:function(){
      return{
      	addModal:"botAddModal",
      	editModal:"botEditModal",
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
        searchCon:{heroType:"",inputText:"",pageSize:10,pageNo:1},
        queryApi:"api/hero/getAll",
        addApi:"api/hero/addBatch",
        editApi:"api/hero/update"
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
  		  this.$post(this.queryApi,{searchCon:this.searchCon}).then(result => {
             this.heroList = result.result;
             this.totalCount = result.totalCount;
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
  		  	 this.heroInfo = { _id:"",hero_en_name: "",hero_cn_name:"",hero_short_name: "",hero_img:"",hero_type:"",order:""};
  		  	 this.$modal.show(this.addModal);
  		  }else{
  		  	 var list = this.heroList;
  		  	 var len = list.length;
  		  	 for(var i=0;i<len;i++){
  		  	 	   if(list[i]._id ==id){
  		  	 	   	  this.heroInfo = list[i]
  		  	 	   }
  		  	 }
  		  	 this.$modal.show(this.editModal);
  		  }

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
    	  heroInfo.hero_cn_name = heroInfo.hero_cn_name.replace(/[\r\n]/g,",");
    	  heroInfo.hero_en_name = heroInfo.hero_en_name.replace(/[\r\n]/g,",");
    	  heroInfo.hero_img = heroInfo.hero_img.replace(/[\r\n]/g,",");
        this.$post(this.addApi,{heroInfo:heroInfo}).then(result => {
              layer.msg("添加成功!",{icon:1});
              this.$modal.hide(this.addModal);
              this.getHeroList();
			  });
    },
    editHero:function(){
        this.$post(this.editApi,{heroInfo:this.heroInfo}).then(result => {
              layer.msg("修改成功",{icon:1});
              this.$modal.hide(this.editModal);
              this.getHeroList();
			  });
    }
  }
}
</script>

<style scoped>
   table tr td img{width:60px;height:36px}
</style>
