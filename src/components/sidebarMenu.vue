<template>
  <ul class="sidebar-menu">
    <router-link tag="li" class="pageLink" to="/dashboard">
      <a>
        <i class="fa fa-pie-chart fa-fw"></i>
        <span class="page">仪表盘</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/dict">
      <a>
        <i class="fa fa-book fa-fw"></i>
        <span class="page">数据字典管理</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/user">
      <a>
        <i class="fa fa-user fa-fw"></i>
        <span class="page">用户管理</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/hero">
      <a>
        <i class="fa fa-list-ul fa-fw"></i>
        <span class="page">英雄资料管理</span>
      </a>
    </router-link>
    <li class="treeview">
      <a href="#">
        <i class="fa fa-steam fa-fw"></i>
        <span>交易管理</span>
        <span class="pull-right-container">
          <i class="fa fa-angle-left fa-fw pull-right"></i>
        </span>
      </a>
      <ul class="treeview-menu">
      	<router-link tag="li" class="pageLink" to="/bot/account">
		      <a>
		        <i class="fa fa-tasks"></i>
		        <span class="page">机器人帐号</span>
		      </a>
		    </router-link>
        <router-link tag="li" class="pageLink" to="/bot/store">
		      <a>
		        <i class="fa fa-tasks"></i>
		        <span class="page">机器人库存</span>
		      </a>
		    </router-link>
		    <router-link tag="li" class="pageLink" to="/assset">
		      <a>
		        <i class="fa fa-tasks"></i>
		        <span class="page">饰品信息</span>
		      </a>
		    </router-link>
      </ul>
    </li>
    <li class="treeview">
      <a href="#">
        <i class="fa fa-desktop fa-fw"></i>
        <span>账户管理</span>
        <span class="pull-right-container">
          <i class="fa fa-angle-left fa-fw pull-right"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <router-link tag="li" class="pageLink" to="/account/list">
          <a>
            <i class="fa fa-tasks"></i>
            <span class="page">用户账户</span>
          </a>
        </router-link>
        <router-link tag="li" class="pageLink" to="/account/detail">
          <a>
            <i class="fa fa-tasks"></i>
            <span class="page">账户明细</span>
          </a>
        </router-link>
        <router-link tag="li" class="pageLink" to="/account/deposit">
          <a>
            <i class="fa fa-tasks"></i>
            <span class="page">充值记录</span>
          </a>
        </router-link>
      </ul>
    </li>
    <li class="treeview">
      <a href="#">
        <i class="fa fa-hdd-o fa-fw"></i>
        <span>API管理</span>
        <span class="pull-right-container">
          <i class="fa fa-angle-left fa-fw pull-right"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <router-link tag="li" class="pageLink" to="/api/doc">
          <a>
            <i class="fa fa-tasks"></i>
            <span class="page">API文档</span>
          </a>
        </router-link>
        <router-link tag="li" class="pageLink" to="/api/debug">
          <a>
            <i class="fa fa-tasks"></i>
            <span class="page">API调试</span>
          </a>
        </router-link>
      </ul>
    </li>
    <li class="treeview">
      <a href="#">
        <i class="fa fa-database fa-fw"></i>
        <span>Model管理</span>
        <span class="pull-right-container">
          <i class="fa fa-angle-left fa-fw pull-right"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <router-link tag="li" class="pageLink" to="/api/model">
          <a>
            <i class="fa fa-tasks"></i>
            <span class="page">Model</span>
          </a>
        </router-link>
      </ul>
    </li>
    <li class="treeview">
      <a href="#">
        <i class="fa fa-cog fa-fw"></i>
        <span>工具箱</span>
        <span class="pull-right-container">
          <i class="fa fa-angle-left fa-fw pull-right"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <router-link tag="li" class="pageLink" to="/">
          <a>
            <i class="fa fa-tasks"></i>
            <span class="page">Code-AutoComplete</span>
          </a>
        </router-link>
      </ul>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'sidebarName'
}
</script>
<style>
  /* override default */
  .sidebar-menu>li>a {
    padding: 12px 15px 12px 15px;
  }
  .sidebar-menu>li>a>.fa{
    width: 22px;
  }

  .sidebar-menu li.active>a>.fa-angle-left, .sidebar-menu li.active>a>.pull-right-container>.fa-angle-left {
    animation-name: rotate;
    animation-duration: .2s;
    animation-fill-mode: forwards;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(-90deg);
    }
  }
</style>
