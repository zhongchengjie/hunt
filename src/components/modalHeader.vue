<template>
	<div class="modal-header">
		<span class="pull-right"><i class="fa fa-remove"></i></span>
	    <h5>{{modalTitle}}</h5>
	</div>
</template>

<script>
export default {
	  name:"modalHeader",
	  props:["modalTitle"],
	  data:function(){
	  	return{
	  	}
	  },
	  destroyed:function(){
	  },
	  methods:{
	  }
}
</script>

<style scoped>
</style>