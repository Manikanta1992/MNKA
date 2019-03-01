<template>
 
  <header class="topbar">
    <nav class="navbar top-navbar navbar-expand-md navbar-light">
        <div class="navbar-collapse">

            <ul class="navbar-nav mr-auto mt-md-0 ">
              <li>
                <router-link to='/' style="font-size:13px;color: white;"><i class="mdi mdi-gauge" ></i>Dashboard</router-link>&nbsp;&nbsp;
                <router-link to='/History' style="font-size:13px;color: white;"><i class="mdi mdi-bullseye"></i><span class="hide-menu">Episode History</span></router-link>&nbsp;&nbsp;
                <router-link to='/Notifications' style="font-size:13px;color: white;"><i class="mdi mdi-bullseye"></i><span class="hide-menu">Notifications</span></router-link>
              </li>
            	<li style="margin-left: 400px;">
            		<img src="../../static/images/logo-icon.png" alt="homepage" class="light-logo " />
            	</li>
            </ul>
            <ul class="navbar-nav my-lg-0">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle text-muted waves-effect waves-dark" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="../../static/images/user-img.png" alt="user" class="profile-pic" /></a>
                    <div class="dropdown-menu dropdown-menu-right scale-up">
                        <ul class="dropdown-user">
                            <li>
                                <div class="dw-user-box">
                                    <div class="u-img"><img src="../../static/images/user-img.png" alt="user"></div>
                                    <div class="u-text">
                                        <h4>{{account.Name}}</h4>
                                        <p class="text-muted">{{account.PhNo}}</p>
                                        <p class="text-muted">{{account.CITY}}</p>
                                    </div>
                                </div>
                            </li>
                            <li >
                                <div class="dw-user-box text-center">
                            	  <a href="/login" classs='text-center'><i class="fa fa-power-off"></i> Logout</a>
                                </div>  
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
  </header>

   
</template>
<script>
  import { mapState, mapActions } from 'vuex'

export default {
    name: 'Header',
    computed: {
        ...mapState({
            account: state => state.account.user.User_Details

        })
    },

};  
</script>

