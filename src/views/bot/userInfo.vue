<template>
    <table class="table table-info table-bordered">
    	<tr>
            <td>用户名</td>
            <td>{{infoObj.user_name}}</td>
            <td>steamid</td>
            <td>{{infoObj.user_steamid}}</td>
        </tr>
        <tr>
            <td>手机号码</td>
            <td>{{infoObj.user_phone}}</td>
            <td>登录密码</td>
            <td>******</td>
        </tr>
        <tr>
            <td>邮箱</td>
            <td>{{infoObj.user_email}}</td>
            <td>用户类型</td>
            <td>{{infoObj.user_type}}</td>
        </tr>
    </table>
</template>

<script>
export default {
	  name:"userInfo",
	  props:["infoObj"]
}
</script>





