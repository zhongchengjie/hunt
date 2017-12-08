<template>
	<div class="modal-header">
		<span class="pull-right">关闭</span>
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