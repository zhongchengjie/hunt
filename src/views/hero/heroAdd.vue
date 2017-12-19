<template>
    <form name="heroAddForm"  autocomplete="off">
        <table class="table table-edit">
            <tr>
                <td width="90px">英雄类型</td>
                <td width="180px">
                	  <select name="" v-model="heroInfo.hero_type" class="form-control input-sm">
                	  	   <option value="">-- 请选择 --</option>
                	  	   <option value="1">力量英雄</option>
                	  	   <option value="2">敏捷英雄</option>
                	  	   <option value="3">智力英雄</option>
                	  </select>
                </td>
                <td  width="80px">起始序号</td>
                <td  width="180px"><input type="number" name="" v-model="heroInfo.order" class="form-control input-sm"></td>
            </tr>
            <tr>
            	<td>英雄名称</td>
            	<td colspan="3">
            		<textarea class="form-control input-sm" v-model="heroInfo.hero_cn_name" rows="4" placeholder="多个英雄名称请用回车隔开"></textarea>
            	</td>
            </tr>
            <tr>
            	<td>英文名称</td>
            	<td colspan="3">
            		<textarea class="form-control input-sm" v-model="heroInfo.hero_en_name" rows="4" placeholder="多个英文名称请用回车隔开"></textarea>
            	</td>
            </tr>
            <tr>
                <td>图片路径</td>
                <td colspan="3">
                	<textarea class="form-control input-sm" v-model="heroInfo.hero_img" rows="4" placeholder="多个图片路径请用回车隔开"></textarea>
                </td>              
            </tr>
        </table>
    </form>
</template>

<script>
export default {
	  name:"heroAdd",
	  props:["heroInfo"]
}
</script>





