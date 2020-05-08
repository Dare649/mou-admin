const pkg = require('./package')


module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: "Michael Okpara University of Agriculture, Umudike",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/assets/img/favicon.png' },
      { rel: "stylesheet", href:"/assets/plugins/pace/pace-theme-flash.css"},
      { rel: "stylesheet", href:"/assets/plugins/bootstrap/css/bootstrap.min.css"},
      { rel: "stylesheet", href:"/assets/plugins/font-awesome/css/font-awesome.css"},
      { rel: "stylesheet", href:"/assets/plugins/jquery-scrollbar/jquery.scrollbar.css"},
      { rel: "stylesheet", href:"/assets/plugins/select2/css/select2.min.css"},
      { rel: "stylesheet", href:"/assets/plugins/switchery/css/switchery.min.css"},
      { rel: "stylesheet", href:"/pages/css/pages-icons.css"},
      { rel: "stylesheet", href: "/assets/css/style.css"},
      { class:"main-stylesheet", rel: "stylesheet", type:"text/css", href:"/pages/css/themes/modern.css"}, 
    ],
    script: [
      {type:"text/javascript", src: '/assets/plugins/pace/pace.min.js' },
      {type:"text/javascript", src: "/assets/plugins/jquery/jquery-3.2.1.min.js"},
      {src: "/assets/plugins/modernizr.custom.js"},
      {src: "/assets/plugins/jquery-ui/jquery-ui.min.js"},
      {src: "/assets/plugins/popper/umd/popper.min.js"},
      {src: "/assets/plugins/bootstrap/js/bootstrap.min.js"},
      {src: "/assets/plugins/jquery/jquery-easy.js"},
      {src: "/assets/plugins/jquery-unveil/jquery.unveil.min.js"},
      {src: "/assets/plugins/jquery-ios-list/jquery.ioslist.min.js"},
      {src: "/assets/plugins/jquery-actual/jquery.actual.min.js"},
      {src: "/assets/plugins/jquery-scrollbar/jquery.scrollbar.min.js"},
      {src: "/assets/plugins/select2/js/select2.full.min.js"},
      {src: "/assets/plugins/classie/classie.js"},
      {src: "/assets/plugins/switchery/js/switchery.min.js"},
      {src: "/assets/plugins/jquery-validation/js/jquery.validate.min.js"}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/moment'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  }
}
