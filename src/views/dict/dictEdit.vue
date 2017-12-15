<template>
    <form name="dictEditForm"  autocomplete="off">
    	<input type="hidden" name="" v-model="dictInfo._id">
        <table class="table table-edit">
        	<tr>
                <td width="90px">字典项名称</td>
                <td><input type="text" name="" v-model="dictInfo.dict_name" class="form-control input-sm" :readonly="readonly"></td>
            </tr>
            <tr>
                <td>字典项code</td>
                <td><input type="text" name="" v-model="dictInfo.dict_code" class="form-control input-sm"></td>
            </tr>
            <tr>
                <td>字典项value</td>
                <td><input type="text" name="" v-model="dictInfo.dict_value" class="form-control input-sm"></td>
            </tr>
            <tr>
                <td>排序</td>
                <td><input type="text" name="" v-model="dictInfo.order" class="form-control input-sm"></td>
            </tr>
        </table>
    </form>
</template>

<script>
export default {
	  name:"dictEdit",
	  props:["dictInfo"],
	  data:function(){
	  	  return{
	  	  	 readonly:false
	  	  }
	  },
	  created:function(){
	  	  if(this.dictInfo.dict_name!=""){
	  	  	 this.readonly = true;
	  	  }
	  }
}
</script>





