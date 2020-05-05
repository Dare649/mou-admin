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
      
    }
  },
  created: function() {}
};
</script>