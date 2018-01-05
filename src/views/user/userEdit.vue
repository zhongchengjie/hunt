<template>
    <form name="userEditForm"  autocomplete="off">
    	<input type="hidden" name="_id" v-model="userInfo._id">
        <table class="table table-edit">
            <tr>
                <td width="80px">手机号码</td>
                <td width="180px"><input type="tel" name="user_phone" v-model="userInfo.user_phone" class="form-control input-sm"></td>
                <td width="80px">登录密码</td>
                <td width="180px"><input type="password" name="user_password" v-model="userInfo.user_password" class="form-control input-sm" :readonly="ifreadonly"></td>
            </tr>
            <tr>
                <td>用户名</td>
                <td><input type="text" name="user_name" v-model="userInfo.user_name" class="form-control input-sm"></td>
                <td>steamid</td>
                <td><input type="text" name="user_steamid" v-model="userInfo.user_steamid" class="form-control input-sm"></td>
            </tr>
            <tr>
                <td>邮箱</td>
                <td><input type="email" name="user_email" v-model="userInfo.user_email" class="form-control input-sm"></td>
                <td>用户类型</td>
                <td>
                   <select name="user_type" v-model="userInfo.user_type" class="form-control input-sm">
                       <option value="common">普通用户</option>
                       <option value="vip">vip用户</option>
                   </select>
                </td>
            </tr>
            <tr>
                <td>交易链接</td>
                <td colspan="3"><input type="text" name="user_tradeurl" v-model="userInfo.user_tradeurl" class="form-control input-sm"></td>
            </tr>
        </table>
    </form>
</template>

<script>
export default {
	  name:"userEdit",
	  props:["userInfo"],
	  data:function(){
	  	return {
	  		 ifreadonly:false
	  	}
	  },
	  created:function(){
	  	 console.log(this.userInfo.user_password);
	  	 if(this.userInfo.user_password!=""){
	  	 	this.ifreadonly=true;
	  	 }
	  }
}
</script>





