<template>
  <section class="content">
    <div class="box-container">
      <div class="table-tools">
         <button type="button" class="btn btn-success btn-sm"><span class="glyphicon glyphicon-plus"></span> 添加用户</button>
      </div>
      <table class="table table-auto table-bordered table-hover table-condensed">
          <thead>
             <tr>
                <th>用户名</th>
                <th>手机号码</th>
                <th>邮箱</th>
                <th>steamid</th>
                <th>用户类型</th>
                <th>注册时间</th>
                <th>操作</th>
             </tr>
          </thead>
          <tbody>
             <tr v-for="user in userList">
                <td>{{user.name}}</td>
                <td>{{user.phone}}</td>
                <td>{{user.email}}</td>
                <td>{{user.steamid}}</td>
                <td>{{user.type}}</td>
                <td>{{user.regTime}}</td>
                <td><a href="">编辑</a>-<a href="">注销</a></td>
             </tr>
          </tbody>
      </table>
    </div>
  </section>

</template>

<script>


export default {
  name: 'user',
  data: function(){
      return{
          userList:[{"name":"www","phone":"13560472084","email":"newuser@163.com","steamid":"12837123721893","type":"普通用户","regTime":"2017-10-10 12:00"},{"name":"www","phone":"13560472084","email":"newuser@163.com","steamid":"12837123721893","type":"普通用户","regTime":"2017-10-10 12:00"},{"name":"www","phone":"13560472084","email":"newuser@163.com","steamid":"12837123721893","type":"普通用户","regTime":"2017-10-10 12:00"}]
      }
  },
  mounted () {
  }
}
</script>

<style >
   .box-container{background:#fff;padding:15px;margin-top:30px;border-radius:4px}
   .table-tools{margin-bottom:10px}
   .table {
     width: 100%;
     margin-bottom: 18px;
     max-width: 100%;
     background-color: transparent;
     border-collapse: collapse;
     border-spacing: 0;
     box-sizing: border-box;
     color: #1f2d3d;
   }
   .table th, .table td {
     padding: 6px 8px;
     line-height: 18px;
     vertical-align: middle;
     height:25px;
     border-top: 1px solid #dfe6ec;
   }

   .table-bordered {
     border: 1px solid #EBEBEB;
   }
   .table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {
     line-height: 22px;
     padding: 6px;
     height:35px;
     vertical-align: top;
     word-break: break-all;
     box-sizing: border-box;
     text-overflow: ellipsis;
     white-space: nowrap;
   }
   .table a{
     color: #20a0ff;
     text-decoration: none;
   }
   .table > thead > tr > th {
     border-bottom: none;
     vertical-align: bottom;
   }
   .table-hover>tbody>tr:hover{
     background-color: #f4f4f4;
   }
   .table-bordered > thead > tr > th, .table-bordered > tbody > tr > th, .table-bordered > tfoot > tr > th, .table-bordered > thead > tr > td, .table-bordered > tbody > tr > td, .table-bordered > tfoot > tr > td {
     border: 1px solid #e7e7e7;
   }
   .table-bordered > thead > tr > th, .table-bordered > thead > tr > td {
     background-color: #f4f4f4;
     border-bottom-width: 1px;
   }
   .table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th{
     vertical-align: middle;color: #777;font-size: 13px;
   }
</style>
