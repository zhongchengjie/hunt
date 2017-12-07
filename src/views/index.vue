<template>
  <div class="wrapper">
    <header class="main-header">
			<span class="logo-mini">
				<a href="/"><img src="/static/img/copilot-logo-white.svg" alt="Logo" class="img-responsive center-block logo"></a>
			</span>
      <!-- Header Navbar -->
      <nav class="navbar navbar-static-top" role="navigation">
        <!-- Sidebar toggle button-->
        <a href="javascript:;" class="sidebar-toggle" data-toggle="offcanvas" role="button">
          <span class="sr-only">Toggle navigation</span>
        </a>
        <!-- Navbar Right Menu -->
        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
            <!-- Notifications Menu -->
            <li class="dropdown notifications-menu">
              <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-bell-o"></i>
                <span class="label label-warning">3</span>
              </a>
              <ul class="dropdown-menu">
                <li class="header">You have 3 notification(s)</li>
              </ul>
            </li>
            <!-- User Account Menu -->
            <li class="dropdown user user-menu">
              <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                <!-- The user image in the navbar-->
                <img src="/static/img/avator.png" class="user-image" alt="User Image">
                <!-- hidden-xs hides the username on small devices so only the image appears. -->
                <span class="hidden-xs">www</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>

   <!-- Left side column. contains the logo and sidebar -->
    <sidebar display-name="www" picture-url="/static/img/avator.png" />

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <ol class="breadcrumb">
          <li>
            <a href="javascript:;">
              <i class="fa fa-home"></i>首页</a>
          </li>
          <li class="active">{{$route.name}}</li>
        </ol>
      </section>

      <router-view></router-view>
    </div>
    <!-- Main Footer -->
    <footer class="main-footer">
      <strong>Copyright &copy; {{year}}
        <a href="javascript:;">Hunt</a>.</strong> All rights reserved.
    </footer>
  </div>
  <!-- ./wrapper -->
</template>


<script>
import sidebar from '../components/sidebar'
export default {
  name: 'index',
  components: {
    sidebar:sidebar
  },
  data: function () {
    return {
      year: new Date().getFullYear(),
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<style lang="scss">
.wrapper.fixed_layout {
  .main-header {
    position: fixed;
    width: 100%;
  }

  .content-wrapper {
    padding-top: 50px;
  }

  .main-sidebar {
    position: fixed;
    height: 100vh;
  }
}

.wrapper.hide_logo {
  @media (max-width: 767px) {
    .main-header .logo {
      display: none;
    }
  }
}

.logo-mini,
.logo-lg {
  text-align: left;

  img {
    padding: .4em !important;
  }
}

.logo-lg {
  img {
    display: -webkit-inline-box;
    width: 25%;
  }
}

.user-panel {
  height: 4em;
}

hr.visible-xs-block {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.17);
  height: 1px;
  border-color: transparent;
}
.content-header .breadcrumb{
  left:10px;
  font-size:14px;
  float:none
}

</style>
