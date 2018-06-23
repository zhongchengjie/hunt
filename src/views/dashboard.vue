<template>
  <section class="content">
    <div class="row">
        <div class="col-md-3">
          <div class="ipanel">
            <div class="ipanel-header">
              <span class="label label-success pull-right">Monthly</span>
              <h5>用户</h5>
            </div>
            <div class="ipanel-content">
              <h1>367</h1>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="ipanel">
            <div class="ipanel-header">
              <span class="label label-info pull-right">Monthly</span>
              <h5>存入</h5>
            </div>
            <div class="ipanel-content">
              <h1>1024</h1>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="ipanel">
            <div class="ipanel-header">
              <span class="label label-primary pull-right">Monthly</span>
              <h5>求购</h5>
            </div>
            <div class="ipanel-content">
              <h1>709</h1>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="ipanel">
            <div class="ipanel-header">
              <span class="label label-danger pull-right">今日</span>
              <h5>异常订单</h5>
            </div>
            <div class="ipanel-content">
              <h1>3</h1>
            </div>
          </div>
        </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="ipanel">
          <div class="ipanel-header">
            <h5>Order</h5>
          </div>
          <div class="ipanel-content" style="height:300px">

          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="ipanel">
          <div class="ipanel-header">
            <h5>登录日志</h5>
          </div>
          <div class="ipanel-content" style="height:300px">
            <table class="table table-auto table-striped table-hover">
              <thead>
              <tr>
                <th>序号</th>
                <th>登录IP</th>
                <th>登录时间</th>
                <th>登出时间</th>
              </tr>
              </thead>
              <tbody>
                <tr>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>

export default {
  name: 'dashboard',
  data: function(){
  	  return{
  	  }
  },
  methods: {

  }
}
</script>

<style>

</style>
