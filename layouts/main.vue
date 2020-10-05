<template>
  <div onload="startTime()" class = "fixed-header horizontal-menu horizontal-app-menu dashboard" id="app">
    <AppHeader></AppHeader>
    <!-- START PAGE-CONTAINER -->
    <div class="page-container ">
        <div class="page-content-wrapper ">
          <nuxt/>
          <AppFooter></AppFooter>
        </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";

export default {
  name: "SMP-Dashboard",
  components: {
    AppHeader,
    AppFooter
  },
  data(){
    return {
      roles:[]
    }
  },
  mounted: function(){

    this.setPermissions();

    this.setRoles();

    window.onload = function()
    {
      // fix for windows 8
      if (navigator.appVersion.indexOf("Windows NT 6.2") != -1)
        document.head.innerHTML += '<link rel="stylesheet" type="text/css" href="pages/css/windows.chrome.fix.css" />'
    }
    if (!process.server) {
      const script1 = document.createElement('script')
      script1.type = 'text/javascript'
      script1.src = '/pages/js/pages.min.js'
      document.head.appendChild(script1)
    }
  },
  methods:{
    setPermissions(){
      this.$laravel.setPermissions(this.$auth.user.user_permissions);
    },
    setRoles(){
      this.$laravel.setRoles(this.$auth.user.user_roles);
    }
  },
  created: function() {}
};
</script>
<style scoped>
body .page-container {
    background: #f5f6f7 !important;
    font-size: 14px !important;
}

body .menu-bar {
    background: #f5f6f7 !important;
    font-size: 14px !important;
}
.breadcrumb {
    background-color: #ffffff !important;;
}
</style>
