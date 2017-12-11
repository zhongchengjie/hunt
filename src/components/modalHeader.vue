<template>
	<div class="modal-header">
		<span class="pull-right" @click="closeModal"><i class="fa fa-close"></i></span>
    <h5>{{modalTitle}}</h5>
	</div>
</template>

<script>
export default {
	  name:"modalHeader",
	  props:["modalName","modalTitle"],
	  data:function(){
	  	return{
	  	}
	  },
	  destroyed:function(){
	  },
	  methods:{
	      //关闭模态框
	      closeModal:function(){
          var modalName = this.modalName;
          this.$modal.hide(modalName);
        }
	  }
}
</script>

<style scoped>
   .modal-header{padding:10px 15px;background-color: #F8F8F8;}
   .modal-header h5{margin:5px 0 0;color:#777;font-weight:600}
   .modal-header span i{color:#999;cursor: pointer;font-size:16px}
</style>
