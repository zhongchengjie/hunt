<template>
	<div class="ibox-content-page">
		<select  v-if="pageSizes&&pageSizes.length>0" v-model="pageSize" class="form-control input-sm" style="width:90px;display: inline-block;" @change="reloadList">
			 <option v-for="size in pageSizes" :value="size">{{size}} 条/页</option>
		</select>
  	    <select  v-else v-model="pageSize" class="form-control input-sm" style="width:90px;display: inline-block;" @change="reloadList">
  	    	<option value="10">10 条/页</option>
		    <option value="15">15 条/页</option>
	  	    <option value="20">20 条/页</option>
	  	    <option value="30">30 条/页</option>
	  	    <option value="50">50 条/页</option>
	    </select>
	    <span class="total-info">&nbsp;&nbsp;&nbsp;共  <span>{{totalCount}}</span> 条，共  <span>{{getTotalPage}}</span> 页</span>
	    <button type="button" v-if="getTotalPage>1&&getTotalPage!=pageNo" class="btn btn-sm btn-default pull-right" @click="nextPage">下一页</button>
	    <button type="button" v-if="getTotalPage>1&&pageNo!=1" class="btn btn-sm btn-default pull-right" style="margin-right:10px" @click="prePage">上一页</button>
	    <span class="page-no pull-right" style="margin-right:10px;margin-top:5px">第 <span>{{pageNo}}</span> 页</span>
  </div>
</template>

<script>
export default {
	  name:"paginat",
	  props:["totalCount","pageSizes","pSize"],
	  data:function(){
	  	  return{
	  	  	 pageSize:15,  //每页的记录数
	  	  	 pageNo:1,    //页码
	  	  	 totalPage:1  //总页数
	  	  }
	  },
	  mounted:function(){
	  	  this.pageSize  = this.pSize||15;
	  },
	  computed:{
	  	 getTotalPage:function(){
	  	    var totalCount = this.totalCount;
          if(totalCount>0){
            return Math.ceil(totalCount/this.pageSize);
          }
	  	 }
	  },
	  methods:{
	     //切换每页显示的记录数
	     reloadList:function(){
	     	this.pageNo = 1;
	     	eventBus.$emit("reloadList",this.pageSize,this.pageNo);
	     },
	     //下一页
	     nextPage:function(){
	     	this.pageNo++;
	     	eventBus.$emit("reloadList",this.pageSize,this.pageNo);
	     },
	     //上一页
	     prePage:function(){
	     	this.pageNo--;
	     	eventBus.$emit("reloadList",this.pageSize,this.pageNo);
	     }
	  }
}
</script>

