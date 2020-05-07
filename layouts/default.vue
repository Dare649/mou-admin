<template>
  <div class="">
    <nuxt/>
  </div> 
</template>
<script>
export default {
  mounted: function() {
    
    if (!process.server) {
      const script1 = document.createElement('script')       
      script1.type = 'text/javascript'
      script1.src = 'pages/js/pages.min.js'        
      
      // const script2 = document.createElement('script')       
      // script2.type = 'text/javascript'
      // script2.src = 'assets/plugins/jquery-validation/js/jquery.validate.min.js'

      // const script3 = document.createElement('script')       
      // script3.type = 'text/javascript'
      // script3.src = 'assets/plugins/switchery/js/switchery.min.js'

      // const script4 = document.createElement('script')       
      // script4.type = 'text/javascript'
      // script4.src = 'assets/plugins/classie/classie.js'

      // const script5 = document.createElement('script')       
      // script5.type = 'text/javascript'
      // script5.src = 'assets/plugins/select2/js/select2.full.min.js'

      // const script6 = document.createElement('script')       
      // script6.type = 'text/javascript'
      // script6.src = 'assets/plugins/jquery-scrollbar/jquery.scrollbar.min.js'

      // const script7 = document.createElement('script')       
      // script7.type = 'text/javascript'
      // script7.src = 'assets/plugins/jquery-actual/jquery.actual.min.js'

      // const script8 = document.createElement('script')       
      // script8.type = 'text/javascript'
      // script8.src = 'assets/plugins/jquery-ios-list/jquery.ioslist.min.js'

      // const script9 = document.createElement('script')       
      // script9.type = 'text/javascript'
      // script9.src = 'assets/plugins/jquery-unveil/jquery.unveil.min.js'

      // const script10 = document.createElement('script')       
      // script10.type = 'text/javascript'
      // script10.src = 'assets/plugins/jquery/jquery-easy.js'

      // const script11 = document.createElement('script')       
      // script11.type = 'text/javascript'
      // script11.src = 'assets/plugins/bootstrap/js/bootstrap.min.js'

      // const script12 = document.createElement('script')       
      // script12.type = 'text/javascript'
      // script12.src = 'assets/plugins/popper/umd/popper.min.js'

      // const script13 = document.createElement('script')       
      // script13.type = 'text/javascript'
      // script13.src = 'assets/plugins/jquery-ui/jquery-ui.min.js'

      // const script14 = document.createElement('script')       
      // script14.type = 'text/javascript'
      // script14.src = 'assets/plugins/modernizr.custom.js'

      // const script15 = document.createElement('script')       
      // script15.type = 'text/javascript'
      // script15.src = 'assets/plugins/jquery/jquery-3.2.1.min.js'

      // const script16 = document.createElement('script')       
      // script16.type = 'text/javascript'
      // script16.src = 'assets/plugins/pace/pace.min.js'

      // document.head.appendChild(script16)
      // document.head.appendChild(script15)
      // document.head.appendChild(script14)
      // document.head.appendChild(script13)
      // document.head.appendChild(script12)
      // document.head.appendChild(script11)
      // document.head.appendChild(script10)
      // document.head.appendChild(script9)
      // document.head.appendChild(script8)
      // document.head.appendChild(script7)
      // document.head.appendChild(script6)
      // document.head.appendChild(script5)
      // document.head.appendChild(script4)
      // document.head.appendChild(script3)
      // document.head.appendChild(script2)
      document.head.appendChild(script1)        
    }
  },
  head: {
    bodyAttrs: {
      class: 'fixed-header'
    }
  }
}
</script>
