<template>
  <div class="login-wrapper">
      <!-- START Login Background Pic Wrapper-->
      <div class="bg-pic">
        <!-- START Background Pic-->
        <img src="assets/img/login_bkg1.jpg" data-src="assets/img/login_bkg1.jpg" data-src-retina="assets/img/login_bkg1.jpg" alt="" class="lazy">
        <!-- END Background Pic-->
      </div>
      <!-- END Login Background Pic Wrapper-->
      <!-- START Login Right Container-->
      <div class="login-container bg-white">
        <div class="p-l-50 m-l-20 p-r-50 m-r-20 p-t-50 m-t-30 sm-p-l-15 sm-p-r-15 sm-p-t-40">
          <img src="assets/img/mou_logo_c.png" alt="logo" data-src="assets/img/mou_logo_c.png" data-src-retina="assets/img/mou_logo_c.png"  height="70">
          <p class="p-t-35 text-center">Welcome to the myMOUAU student portal.</p>
          <!-- START Login Form -->
          <form id="form-login" class="p-t-15" role="form" action="index.php">
            <!-- START Form Control-->
            <div class="form-group form-group-default">
              <label>Login</label>
              <div class="controls">
                <input type="text" name="username" placeholder="User Name" class="form-control" required>
              </div>
            </div>
            <!-- END Form Control-->
            <!-- START Form Control-->
            <div class="form-group form-group-default">
              <label>Password</label>
              <div class="controls">
                <input type="password" class="form-control" name="password" placeholder="Credentials" required>
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
              <button class="btn btn-primary btn-cons m-t-10 btn-lg btn-block" type="submit"><i class="fa fa-lock"></i> <span class="bold">SIGN IN</span></button>
          </form>
          <!--END Login Form-->

            <p class="small p-t-35 text-center">&copy; <?php echo date('Y');?> Michael Okpara University of Agriculture, Umudike.</p>

        </div>
      </div>
      <!-- END Login Right Container-->
    </div> 
    
 
</template>

<script>
  export default {
    mounted: function() {
      window.onload = function()
      {
        // fix for windows 8
        if (navigator.appVersion.indexOf("Windows NT 6.2") != -1)
          document.head.innerHTML += '<link rel="stylesheet" type="text/css" href="pages/css/windows.chrome.fix.css" />'
      }
      if (!process.server) {
        const script1 = document.createElement('script')       
        script1.type = 'text/javascript'
        script1.src = 'pages/js/pages.min.js'        
        
        const script2 = document.createElement('script')       
        script2.type = 'text/javascript'
        script2.src = 'assets/plugins/jquery-validation/js/jquery.validate.min.js'

        const script3 = document.createElement('script')       
        script3.type = 'text/javascript'
        script3.src = 'assets/plugins/switchery/js/switchery.min.js'

        const script4 = document.createElement('script')       
        script4.type = 'text/javascript'
        script4.src = 'assets/plugins/classie/classie.js'

        const script5 = document.createElement('script')       
        script5.type = 'text/javascript'
        script5.src = 'assets/plugins/select2/js/select2.full.min.js'

        const script6 = document.createElement('script')       
        script6.type = 'text/javascript'
        script6.src = 'assets/plugins/jquery-scrollbar/jquery.scrollbar.min.js'

        const script7 = document.createElement('script')       
        script7.type = 'text/javascript'
        script7.src = 'assets/plugins/jquery-actual/jquery.actual.min.js'

        const script8 = document.createElement('script')       
        script8.type = 'text/javascript'
        script8.src = 'assets/plugins/jquery-ios-list/jquery.ioslist.min.js'

        const script9 = document.createElement('script')       
        script9.type = 'text/javascript'
        script9.src = 'assets/plugins/jquery-unveil/jquery.unveil.min.js'

        const script10 = document.createElement('script')       
        script10.type = 'text/javascript'
        script10.src = 'assets/plugins/jquery/jquery-easy.js'

        const script11 = document.createElement('script')       
        script11.type = 'text/javascript'
        script11.src = 'assets/plugins/bootstrap/js/bootstrap.min.js'

        const script12 = document.createElement('script')       
        script12.type = 'text/javascript'
        script12.src = 'assets/plugins/popper/umd/popper.min.js'

        const script13 = document.createElement('script')       
        script13.type = 'text/javascript'
        script13.src = 'assets/plugins/jquery-ui/jquery-ui.min.js'

        const script14 = document.createElement('script')       
        script14.type = 'text/javascript'
        script14.src = 'assets/plugins/modernizr.custom.js'

        const script15 = document.createElement('script')       
        script15.type = 'text/javascript'
        script15.src = 'assets/plugins/jquery/jquery-3.2.1.min.js'

        const script16 = document.createElement('script')       
        script16.type = 'text/javascript'
        script16.src = 'assets/plugins/pace/pace.min.js'

        document.head.appendChild(script16)
        document.head.appendChild(script15)
        document.head.appendChild(script14)
        document.head.appendChild(script13)
        document.head.appendChild(script12)
        document.head.appendChild(script11)
        document.head.appendChild(script10)
        document.head.appendChild(script9)
        document.head.appendChild(script8)
        document.head.appendChild(script7)
        document.head.appendChild(script6)
        document.head.appendChild(script5)
        document.head.appendChild(script4)
        document.head.appendChild(script3)
        document.head.appendChild(script2)
        document.head.appendChild(script1)        
      }
    }
  }
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
