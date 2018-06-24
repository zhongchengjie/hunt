<template>
  <section class="content">
    <div class="row">
        <div class="col-md-3">
          <div class="ipanel">
            <div class="ipanel-header">
              <span class="label label-success pull-right">当前</span>
              <h5>用户总数</h5>
            </div>
            <div class="ipanel-content">
              <h1>23,367</h1>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="ipanel">
            <div class="ipanel-header">
              <span class="label label-info pull-right">当前</span>
              <h5>存入饰品总量</h5>
            </div>
            <div class="ipanel-content">
              <h1>12,024</h1>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="ipanel">
            <div class="ipanel-header">
              <span class="label label-primary pull-right">当前</span>
              <h5>交易总量</h5>
            </div>
            <div class="ipanel-content">
              <h1>106,120</h1>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="ipanel">
            <div class="ipanel-header">
              <span class="label label-danger pull-right">今日</span>
              <h5>异常事件</h5>
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
            <h5>饰品存入/取回</h5>
            <span style="float:right;margin-right:20px;position: relative;bottom:4px">
              <select class="form-control input-sm" style="height:26px;line-height:26px;padding:5px 2px">
                <option>2018-06</option>
                <option>2018-05</option>
                <option>2018-04</option>
                <option>2018-03</option>
                <option>2018-01</option>
              </select>
            </span>
          </div>
          <div class="ipanel-content" >
            <div id="chart1" style="height:300px">

            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="ipanel">
          <div class="ipanel-header">
            <h5>交易实时<a style="margin-left:10px;cursor: pointer"><span class="glyphicon glyphicon-refresh"></span></a></h5>
          </div>
          <div class="ipanel-content">
            <table class="table table-auto table-hover">
              <thead>
              <tr>
                <th>用户</th>
                <th>事件名称</th>
                <th>操作时间</th>
                <th>状态</th>
              </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CCnc</td>
                  <td>存入饰品</td>
                  <td>2018-05-12 12:34:01</td>
                  <td><label class='label label-success'>成功</label></td>
                </tr>
                <tr>
                  <td>Kane</td>
                  <td>取回饰品</td>
                  <td>2018-05-12 09:12:45</td>
                  <td><label class='label label-warning'>失败</label></td>
                </tr>
                <tr>
                  <td>瓜皮战士</td>
                  <td>购买饰品</td>
                  <td>2018-05-11 20:09:45</td>
                  <td><label class='label label-success'>成功</label></td>
                </tr>
                <tr>
                  <td>qwerty</td>
                  <td>上架饰品</td>
                  <td>2018-05-10 09:12:45</td>
                  <td><label class='label label-success'>成功</label></td>
                </tr>
                <tr>
                  <td>云玩家</td>
                  <td>购买饰品</td>
                  <td>2018-05-09 12:09:45</td>
                  <td><label class='label label-success'>成功</label></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

   <!-- <div class="row">
      <div class="col-md-12">
        <div class="ipanel">
          <div class="ipanel-header">
            <h5>机器人状态<a style="margin-left:10px;cursor: pointer"><span class="glyphicon glyphicon-refresh"></span></a></h5>
          </div>
          <div class="ipanel-content" style="height:200px">
            <table class="table table-auto table-hover">
              <thead>
              <tr>
                <th>机器人名称</th>
                <th>登录帐号</th>
                <th>端口</th>
                <th>登录状态</th>
                <th>交易状态</th>
                <th>最近登录时间</th>
              </tr>
              </thead>
              <tbody>
                <tr v-for="bot in botList">
                  <td>{{bot.bot_name}}</td>
                  <td>{{bot.account_name}}</td>
                  <td>{{bot.port}}</td>
                  <td v-html="getLoginState(bot.login_state)"></td>
                  <td v-html="getTradeState(bot.trade_state)"></td>
                  <td>{{Util.timeFormat(bot.last_login_time,'YYYY-MM-DD HH:mm:ss')}}</td>
                 </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>-->

  </section>
</template>

<script>
import echarts  from 'echarts'

export default {
  name: 'dashboard',
  data: function(){
  	  return{
        botList:[]
  	  }
  },
  mounted:function() {
     this.initChart();
     //this.getBotList();
  },
  methods: {
    initChart:function(){
      //基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('chart1'));
      // 绘制图表
      myChart.setOption({
        color: ['#3398DB','#1dbb9b'],
        tooltip: {},
        xAxis: {
          data: ['06-01','06-02','06-03','06-04','06-05','06-06','06-07','06-08','06-09','06-10','06-11','06-12','06-13','06-14','06-15']
        },
        legend: {
          data:['存入量','取回量']
        },
        yAxis: {},
        series: [{
          name: '存入量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20,20, 36, 10, 10,5, 20, 36, 10, 12]
        },{
          name: '取回量',
          type: 'bar',
          data: [3, 12, 34, 50, 12, 56,12, 34, 9, 4,16, 16, 36, 16, 17]
        }]
      });
    },
    getBotList:function(){
      //....... 按搜索条件过滤，待完善
      this.$post("api/bot/get").then(result => {
        this.botList = result.result;
      });
    },
    getTradeState:function(state){
      if(state=="1"){
        return "<label class='label label-success'>空闲中</label>";
      }
    },
    getLoginState:function(state){
      if(state=="1"){
        return "<label class='label label-success'>在线</label>";
      }else if(state=="-1"){
        return "<label class='label label-warning'>离线</label>";
      }
    },
  }
}
</script>

<style>

</style>
