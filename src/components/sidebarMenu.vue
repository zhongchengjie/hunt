<template>
  <ul class="sidebar-menu">
    <router-link tag="li" class="pageLink" to="/user">
      <a>
        <i class="fa fa-desktop"></i>
        <span class="page">用户管理</span>
      </a>
    </router-link>
   <router-link tag="li" class="pageLink" to="/dict">
      <a>
        <i class="fa fa-desktop"></i>
        <span class="page">数据字典管理</span>
      </a>
   </router-link>
    <router-link tag="li" class="pageLink" to="/hero">
      <a>
        <i class="fa fa-tasks"></i>
        <span class="page">英雄资料管理</span>
      </a>
    </router-link>
    <li class="treeview">
      <a href="#">
        <i class="fa fa-folder-o"></i>
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
		        <i class="fa fa-desktop"></i>
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
        <i class="fa fa-folder-o"></i>
        <span>账户管理</span>
        <span class="pull-right-container">
          <i class="fa fa-angle-left fa-fw pull-right"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li>
          <a href="#">
            <i class="fa fa-file-word-o"></i> Item 1
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-file-picture-o"></i> Item 2
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-file-pdf-o"></i> Item 3
          </a>
        </li>
      </ul>
    </li>
    <router-link tag="li" class="pageLink" to="/repos">
      <a>
        <i class="fa fa-heart"></i>
        <span class="page">Repos</span>
        <small class="label pull-right bg-green">AJAX</small>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/login">
      <a>
        <i class="fa fa-circle-o text-yellow"></i>
        <span class="page"> Login</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/404">
      <a>
        <i class="fa fa-circle-o text-red"></i>
        <span class="page"> 404</span>
      </a>
    </router-link>
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
