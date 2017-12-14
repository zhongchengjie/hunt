<template>
    <form name="botEditForm"  autocomplete="off">
    	<input type="hidden" name="" v-model="botInfo._id">
        <table class="table table-edit">
            <tr>
                <td width="90px">机器人名称</td>
                <td width="170px"><input type="text" name="" v-model="botInfo.bot_name" class="form-control input-sm"></td>
                <td width="80px">steamid</td>
                <td width="180px"><input type="text" name="" v-model="botInfo.bot_steamid" class="form-control input-sm"></td>
            </tr>
            <tr>
                <td>登录帐号</td>
                <td><input type="text" name="" v-model="botInfo.account_name" class="form-control input-sm"></td>
                <td>登录密码</td>
                <td><input type="password" name="" v-model="botInfo.login_pwd" class="form-control input-sm"></td>
            </tr>
            <tr>
                <td>端口</td>
                <td><input type="number" name="" v-model="botInfo.port" class="form-control input-sm"></td>
                <td>手机号码</td>
                <td><input type="text" name="" v-model="botInfo.phone" class="form-control input-sm"></td>
            </tr>
        </table>
    </form>
</template>

<script>
export default {
	  name:"botEdit",
	  props:["botInfo"]
}
</script>





