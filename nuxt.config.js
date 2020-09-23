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
      { class:"main-stylesheet", rel: "stylesheet", type:"text/css", href:"/pages/css/themes/modern.css"},
      { rel: "stylesheet", href: "/assets/css/style.css"},
      { rel: "stylesheet", href: "/assets/css/custom.css", type: "text/css"}
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
      {src: "/assets/plugins/jquery-validation/js/jquery.validate.min.js"},
      {src: '/assets/plugins/bootstrap-form-wizard/js/jquery.bootstrap.wizard.min.js'}
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
   ** Toastr configuration
   */
	toast: {
		position: 'top-center',
		duration: 5000,
		fullWidth: true,
		fitToScreen: true,
		iconPack: 'fontawesome'
	},
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/toast',
    '@nuxtjs/moment',
    [
      'vue-sweetalert2/nuxt',
      {
        confirmButtonColor: '#41b882',
        cancelButtonColor: '#ff7674'
      }
    ]
  ],

  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false // Or `bvCSS: false`
  },
  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: process.env.BASE_URL || 'https://portal.olsslekki.org/',
    // baseURL: process.env.BASE_URL || 'http://127.0.0.1:8000/',
		proxy: false
  },
  proxy: {
		'/api/': 'https://portal.olsslekki.org/',
    // '/api/': 'http://127.0.0.1:8000/'
  },
  env: {
		BASE_URL: 'https://portal.olsslekki.org/',
    // BASE_URL: 'http://127.0.0.1:8000/'
  },

  /*
   ** Authentication of the app
   */
	auth: {
		strategies: {
			local: {
				endpoints: {
					login: {
						url: 'api/auth/validate-token',
						method: 'post',
						propertyName: 'token'
					},
					logout: false,
					user: {
						url: 'api/me',
            method: 'get',
            propertyName: 'data'
          }
        },
        tokenRequired: true,
        tokenType: 'bearer',
        globalToken: true,
        autoFetchUser: true
			}
		},
		redirect: {
			login: '/?login=1',
			logout: '/',
			home: '/',
			callback: '/'
		},
		plugins: [
      '~/plugins/auth.js',
      {src: '~/plugins/libs.js', ssr: false},
      {src: '~/plugins/utils.js', ssr: false}
    ]
  },
  router: {
    middleware: ['auth']
  },
  generate: {
    routes: function () {
      let departments = axios.get('https://portal.olsslekki.org/api/departments').then((res) => {
        return res.data.map((page) => {
          return '/get-started/departments/' + page.id
        })
      })
      return Promise.all([pages, tipsters]).then(values => {
        return values.join().split(',');
      });
    }
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
