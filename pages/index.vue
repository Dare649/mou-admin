
<template>
 <div class="login-wrapper">
  <!-- START Login Background Pic Wrapper-->
  <div class="bg-pic">
    <!-- START Background Pic-->
    <img src="/assets/img/login_bkg1.jpg" data-src="/assets/img/login_bkg1.jpg" data-src-retina="/assets/img/login_bkg1.jpg" alt="" class="lazy">
    <!-- END Background Pic-->
  </div>
  <!-- END Login Background Pic Wrapper-->
  <!-- START Login Right Container-->
  <div class="login-container bg-white">
    <div class="p-l-50 m-l-20 p-r-50 m-r-20 p-t-50 m-t-30 sm-p-l-15 sm-p-r-15 sm-p-t-40">
      <img src="/assets/img/mou_logo_c.png" alt="logo" data-src="/assets/img/mou_logo_c.png" data-src-retina="/assets/img/mou_logo_c.png"  height="70">
      <p class="p-t-35 text-center">Welcome to the MOUAU admin portal.</p>
      <!-- START Login Form -->
      <form id="form-login" class="p-t-15" @submit.prevent="login" v-if="!IsMessageSentSuccessfully">
        <!-- START Form Control-->
        <div class="form-group form-group-default" v-if="!IsMessageSentSuccessfully">
          <label>Login</label>
          <div class="controls">
            <input type="text" v-model="model.username" name="username" placeholder="User Name" class="form-control" required>
          </div>
        </div>
        <!-- END Form Control-->
        <!-- START Form Control-->
        <div class="form-group form-group-default" v-if="!IsMessageSentSuccessfully">
          <label>Password</label>
          <div class="controls">
            <input type="password" v-model="model.password" class="form-control" name="password" placeholder="Credentials" required>
          </div>
        </div>
        <!-- START Form Control-->
        <div class="row" style="color: red;" v-if="ErrMsg != null">{{ErrMsg}}</div>
        <div class="row">
          <div class="col-md-6 no-padding sm-p-l-10">
            <div class="checkbox ">
              <input type="checkbox" value="1" id="checkbox1">
              <label for="checkbox1">Keep Me Signed in</label>
            </div>
          </div>
          <div class="col-md-6 d-flex align-items-center justify-content-end">
            <a href="iforgot.php" class="text-success small">Forgot Password?</a>
          </div>
        </div>
        <!-- END Form Control-->
          <button v-if="!loading" class="btn btn-primary btn-cons m-t-10 btn-lg btn-block" type="submit"><i class="fa fa-lock"></i> <span class="bold">SIGN IN</span></button>
          <button v-if="loading" disabled class="btn btn-primary btn-cons m-t-10 btn-lg btn-block" type="submit"><i class="fa fa-unlock"></i> <span class="bold">SIGNING IN</span></button>
      </form>
      <!--END Login Form-->

      <!-- START Login Form -->
      <form id="form-login" class="p-t-15" @submit.prevent="authenticate" v-if="IsMessageSentSuccessfully">

        <!-- START Form Control-->
        <div class="form-group form-group-default" v-if="IsMessageSentSuccessfully">
          <label>Token</label>
          <div class="controls">
            <input type="token" v-model="model.token" class="form-control" name="token" placeholder="Enter pin sent to your mail" required>
          </div>
        </div>
        <!-- START Form Control-->
        <div class="row">
          <div class="col-md-6 no-padding sm-p-l-10">
            <div class="checkbox ">
              <input type="checkbox" value="1" id="checkbox1">
              <label for="checkbox1">Keep Me Signed in</label>
            </div>
          </div>
          <div class="col-md-6 d-flex align-items-center justify-content-end">
            <a href="iforgot.php" class="text-success small">Forgot Password?</a>
          </div>
        </div>
        <!-- END Form Control-->
          <button v-if="!authloading" class="btn btn-primary btn-cons m-t-10 btn-lg btn-block" type="submit"><i class="fa fa-lock"></i> <span class="bold">Authenticate</span></button>
          <button v-if="authloading" disabled class="btn btn-primary btn-cons m-t-10 btn-lg btn-block" type="submit"><i class="fa fa-unlock"></i> <span class="bold">Authenticating</span></button>
      </form>
      <!--END Login Form-->

        <p class="small p-t-35 text-center">&copy; {{year}} Michael Okpara University of Agriculture, Umudike.</p>

    </div>
  </div>
  <!-- END Login Right Container-->
</div>
</template>

<script>
  export default {
    data() {
      return {
        year: this.$moment().format('YYYY'),
        IsMessageSentSuccessfully: false,
        ErrMsg: null,
        loading: false,
        authloading: false,
        model: {
          username: "",
          password: "",
          token: ""
        },
      }
    },
    mounted() {

    },
    methods: {
      async login() {
        this.loading = true
        let bodyFormData = new FormData();
        bodyFormData.set('email', this.model.username)
        bodyFormData.set('password', this.model.password)

        this.$store
        .dispatch('authentication/login', bodyFormData)
        .then(res => {
          if(res != undefined){
            if(res.status == true){
            this.IsMessageSentSuccessfully = true
            this.loading = false
            }else{
              this.loading = false
              this.ErrMsg = 'Invalid login credentials'
            }
          }else{
            this.loading = false
            this.ErrMsg = "Error Logging in!"
          }
        }).catch(err => {
          this.loading = false
        })
      },

      async authenticate(){
          this.authloading = true;
          let bodyFormData = new FormData();
          bodyFormData.set('email', this.model.username)
          bodyFormData.set('token', this.model.token)
          try {
            await this.$auth.loginWith("local", {
              data: bodyFormData
            });
            this.$router.push(
                decodeURIComponent(
                  this.$route.query.redirect || "/dashboard"
                )
            );

          } catch (e) {
            this.authloading = false;
            console.log(e)
          }

      }
    }
  }
</script>
