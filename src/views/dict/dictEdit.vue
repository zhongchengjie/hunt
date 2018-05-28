<template>
    <form name="dictEditForm"  autocomplete="off">
    	<input type="hidden" name="" v-model="dictInfo._id">
        <table class="table table-edit">
            <tr>
                <td width="100px">字典项名称</td>
                <td><input type="text" name="" v-model="dictInfo.dict_name" class="form-control input-sm"></td>
            </tr>
            <tr>
                <td>字典项描述</td>
                <td><input type="text" name="" v-model="dictInfo.dict_descr" class="form-control input-sm"></td>
            </tr>
            <tr>
                <td>字典项code</td>
                <td><input type="text" name="" v-model="dictInfo.dict_code" class="form-control input-sm"></td>
            </tr>
            <tr>
                <td>code_name</td>
                <td><input type="text" name="" v-model="dictInfo.dict_code_name" class="form-control input-sm"></td>
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
	props:["dictInfo"]
}
</script>





