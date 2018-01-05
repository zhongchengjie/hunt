<template>
    <table class="table table-info table-bordered">
        <tr>
            <td width="90px">机器人名称</td>
            <td>{{infoObj.bot_name}}</td>
            <td width="90px">steamid</td>
            <td>{{infoObj.bot_steamid}}</td>
        </tr>
        <tr>
            <td>登录帐号</td>
            <td>{{infoObj.account_name}}</td>
            <td>登录密码</td>
            <td>{{infoObj.login_pwd}}</td>
        </tr>
        <tr>
        	<td>登录密钥</td>
            <td>{{infoObj.shared_secret}}</td>
            <td>端口</td>
            <td>{{infoObj.port}}</td>         
        </tr>
    </table>
</template>

<script>
export default {
	  name:"botInfo",
	  props:["infoObj"]
}
</script>





