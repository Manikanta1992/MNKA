<template>
  <div>
    <div class="preloader">
        <svg class="circular" viewBox="25 25 50 50">
            <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" /> </svg>
    </div>
    <!-- ============================================================== -->
    <!-- Main wrapper - style you can find in pages.scss -->
    <!-- ============================================================== -->
    <section id="wrapper" class="login-register login-sidebar" style="background-image:url(../../static/images/background/login-register.jpg);">
        <div class="login-box card">
            <div class="card-body">
                <form class="form-horizontal form-material" @submit.prevent="handleSubmit">
                    <a href="javascript:void(0)" class="text-center db"><img src="/../../static/images/logo-icon.png" alt="Home" /><br><br>
                    <div v-if="alert.message" :class="`alert ${alert.type}`" role="alert" class="message">{{alert.message}}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">X
                        </button>
                    </div></a>
                    <div class="form-group m-t-40">
                        <div class="col-xs-12">
                            <input class="form-control" type="text" placeholder="Mobile Number" v-model.trim="username" name="Mobile Number" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('Mobile Number') }" autocomplete="off" />
                            <div v-if="submitted && errors.has('Mobile Number')" class="invalid-feedback">{{ errors.first('Mobile Number') }}</div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-xs-12">
                           <input class="form-control" type="password" placeholder="Password" v-validate="'required'" v-model.trim="password" name="Password" :class="{ 'is-invalid': submitted && errors.has('Password') }"/>
                            <div v-if="submitted && errors.has('Password')" class="invalid-feedback">{{ errors.first('Password') }}</div>
                        </div>
                    </div>
                    
                    <div class="form-group text-center m-t-20">
                        <div class="col-xs-12">
                            <button class="btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light" :disabled="status.loggingIn">Log In</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section> 
 </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'login',
    data () {
        return {
            username: '',
            password: '',
            submitted: false
        }
    },
    computed: {
        ...mapState('account', ['status']),
        ...mapState({
            alert: state => state.alert
        })
    },
    created () {
        // reset login status
        this.logout();
    },
    methods: {
        ...mapActions('account', ['login', 'logout']),
        ...mapActions({
            clearAlert: 'alert/clear' 
        }),
        handleSubmit (e) {
            this.submitted = true;
            this.clearAlert();
            this.$validator.validate().then(valid => {
                if (valid) {
                  const { username, password } = this;
                  if (username && password) {
                      this.login({ username, password })
                  }
                }
            });
            
        }
    },
    watch: {
        $route (to, from){
            // clear alert on location change
            this.clearAlert();
        }
    } 
};
</script>

<style scoped>
  .message {
      font-size: 0.93rem;
      color: #000;
    } 
</style>