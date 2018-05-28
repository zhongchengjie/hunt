<template>
    <form name="apiDocEditForm"  autocomplete="off">
    	<input type="hidden" name="_id" v-model="apidocInfo._id">
        <table class="table table-edit">
            <tr>
                <td width="80px">api名称</td>
                <td width="180px"><input type=text name="api_name" v-model="apidocInfo.api_name" class="form-control input-sm"></td>
                <td width="80px">所属模块</td>
                <td width="180px">
                  <select name="api_module" v-model="apidocInfo.api_module" class="form-control input-sm" >
                    <option value="">请选择</option>
                    <option value="用户模块">用户模块</option>
                  </select>
                </td>
            </tr>
            <tr>
                <td>请求方式</td>
                <td>
                  <select name="api_method" v-model="apidocInfo.api_method" class="form-control input-sm">
                    <option value="post">post请求</option>
                    <option value="get">get请求</option>
                  </select>
                </td>
                <td>token验证</td>
                <td>
                  <select name="need_token" v-model="apidocInfo.need_token" class="form-control input-sm">
                    <option value="1">需要</option>
                    <option value="0">不需要</option>
                  </select>
                </td>
            </tr>
            <tr>
                <td>api描述</td>
                <td colspan="3"><textarea rows="3" name="api_descr" v-model="apidocInfo.api_descr" class="form-control input-sm"></textarea></td>
            </tr>
            <tr>
                <td>api参数</td>
                <td colspan="3"><input type="text" placeholder="多个参数用逗号分隔" name="api_params" v-model="apidocInfo.api_params" class="form-control input-sm"></td>
            </tr>
            <tr>
                <td>参数说明</td>
                <td colspan="3"><textarea rows="5" name="params_descr" v-model="apidocInfo.params_descr" class="form-control input-sm"></textarea></td>
            </tr>
        </table>
    </form>
</template>

<script>
export default {
	  name:"apiDocEdit",
	  props:["apidocInfo"],
}
</script>





