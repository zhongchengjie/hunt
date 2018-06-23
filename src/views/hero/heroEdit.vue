<template>
    <form name="heroEditForm"  autocomplete="off">
    	<input type="hidden" v-model="heroInfo._id">
        <table class="table table-edit">
        	<tr>
            	<td width="90px">英雄名称</td>
            	<td width="180px"><input class="form-control input-sm" v-model="heroInfo.hero_cn_name"></td>
            	<td width="90px">英文名称</td>
            	<td width="180px"><input class="form-control input-sm" v-model="heroInfo.hero_en_name"></td>
            </tr>
            <tr>
            	<td>简称</td>
                <td><input class="form-control input-sm" v-model="heroInfo.hero_short_name"></td>
                <td>图片路径</td>
                <td><input class="form-control input-sm" v-model="heroInfo.hero_img"></td>
            </tr>
            <tr>
                <td >英雄类型</td>
                <td >
                	  <select name="" v-model="heroInfo.hero_type" class="form-control input-sm">
                	  	   <option value="1">力量英雄</option>
                	  	   <option value="2">敏捷英雄</option>
                	  	   <option value="3">智力英雄</option>
                	  </select>
                </td>
                <td>序号</td>
                <td><input type="number" name="" v-model="heroInfo.order" class="form-control input-sm"></td>
            </tr>

        </table>
    </form>
</template>

<script>
export default {
	  name:"heroEdit",
	  props:["heroInfo"]
}
</script>





