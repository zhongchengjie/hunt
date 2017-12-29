<template>
	<div class="modal-footer" v-if="type==2">
       <button type="button" class="btn btn-default btn-sm" @click="closeModal">关闭</button>
	</div>
	<div class="modal-footer" v-else>
       <button type="button" class="btn btn-primary btn-sm" @click="saveClick">保存</button>&nbsp;&nbsp;&nbsp;
       <button type="button" class="btn btn-default btn-sm" @click="closeModal">关闭</button>
	</div>
</template>

<script>
export default {
	  name:"modalFooter",
	  props:["modalName","type"],
	  data:function(){
	  	return{
	  	}
	  },
	  destroyed:function(){
       // eventBus.$off("saveClick");
	  },
	  methods:{
	      //保存按钮事件
        saveClick:function(){
            eventBus.$emit("saveClick");
        },
        //关闭模态框
        closeModal:function(){
          var modalName = this.modalName;
          this.$modal.hide(modalName);
        }
	  }
}
</script>

<style scoped>
  .modal-footer{
      bottom: 0;
      left: 0;
      position: absolute;
      width: 100%;
      height: 48px;
      line-height: 45px;
      background-color: #f8f8f8;
      text-align: center;
      border-top: 1px solid #f4f4f4;
      margin-top: 20px;
      padding:0;
  }
</style>

