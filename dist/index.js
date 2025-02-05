import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from './components/nuxt-error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_vuesweetalert2_5a6622d9 from 'nuxt_plugin_vuesweetalert2_5a6622d9' // Source: ./vue-sweetalert2.js (mode: 'client')
import nuxt_plugin_moment_2c8cbe16 from 'nuxt_plugin_moment_2c8cbe16' // Source: ./moment.js (mode: 'all')
import nuxt_plugin_toast_d94ecf1e from 'nuxt_plugin_toast_d94ecf1e' // Source: ./toast.js (mode: 'client')
import nuxt_plugin_axios_71af687c from 'nuxt_plugin_axios_71af687c' // Source: ./axios.js (mode: 'all')
import nuxt_plugin_plugin_0f43ff7e from 'nuxt_plugin_plugin_0f43ff7e' // Source: ./auth/plugin.js (mode: 'all')
import nuxt_plugin_auth_7f7561ce from 'nuxt_plugin_auth_7f7561ce' // Source: ../plugins/auth.js (mode: 'all')
import nuxt_plugin_libs_1e91e71a from 'nuxt_plugin_libs_1e91e71a' // Source: ../plugins/libs.js (mode: 'client')
import nuxt_plugin_utils_1ea7651c from 'nuxt_plugin_utils_1ea7651c' // Source: ../plugins/utils.js (mode: 'client')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    const globalNuxt = this.$root ? this.$root.$options.$nuxt : null
    if (process.client && !globalNuxt && typeof window !== 'undefined') {
      return window.$nuxt
    }
    return globalNuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule

function registerModule (path, rawModule, options = {}) {
  const preserveState = process.client && (
    Array.isArray(path)
      ? !!path.reduce((namespacedState, path) => namespacedState && namespacedState[path], this.state)
      : path in this.state
  )
  return originalRegisterModule.call(this, path, rawModule, { preserveState, ...options })
}

async function createApp(ssrContext, config = {}) {
  const store = createStore(ssrContext)
  const router = await createRouter(ssrContext, config, { store })

  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  store.registerModule = registerModule

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"Michael Okpara University of Agriculture, Umudike","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"Michael Okpara University of Agriculture Umudike, formerly Federal University of Agriculture, Umudike, was established as a specialized University by the Federal Government of Nigeria via Decree No 48 of 2nd November 1992."}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Fassets\u002Fimg\u002Ffavicon.png"},{"rel":"stylesheet","href":"\u002Fassets\u002Fplugins\u002Fpace\u002Fpace-theme-flash.css"},{"rel":"stylesheet","href":"\u002Fassets\u002Fplugins\u002Fbootstrap\u002Fcss\u002Fbootstrap.min.css"},{"rel":"stylesheet","href":"\u002Fassets\u002Fplugins\u002Ffont-awesome\u002Fcss\u002Ffont-awesome.css"},{"rel":"stylesheet","href":"\u002Fassets\u002Fplugins\u002Fjquery-scrollbar\u002Fjquery.scrollbar.css"},{"rel":"stylesheet","href":"\u002Fassets\u002Fplugins\u002Fselect2\u002Fcss\u002Fselect2.min.css"},{"rel":"stylesheet","href":"\u002Fassets\u002Fplugins\u002Fswitchery\u002Fcss\u002Fswitchery.min.css"},{"rel":"stylesheet","href":"\u002Fpages\u002Fcss\u002Fpages-icons.css"},{"class":"main-stylesheet","rel":"stylesheet","type":"text\u002Fcss","href":"\u002Fpages\u002Fcss\u002Fthemes\u002Fmodern.css"},{"rel":"stylesheet","href":"\u002Fassets\u002Fcss\u002Fstyle.css"},{"rel":"stylesheet","href":"\u002Fassets\u002Fcss\u002Fcustom.css","type":"text\u002Fcss"}],"script":[{"type":"text\u002Fjavascript","src":"\u002Fassets\u002Fplugins\u002Fpace\u002Fpace.min.js"},{"type":"text\u002Fjavascript","src":"\u002Fassets\u002Fplugins\u002Fjquery\u002Fjquery-3.2.1.min.js"},{"src":"\u002Fassets\u002Fplugins\u002Fmodernizr.custom.js"},{"src":"\u002Fassets\u002Fplugins\u002Fjquery-ui\u002Fjquery-ui.min.js"},{"src":"\u002Fassets\u002Fplugins\u002Fpopper\u002Fumd\u002Fpopper.min.js"},{"src":"\u002Fassets\u002Fplugins\u002Fbootstrap\u002Fjs\u002Fbootstrap.min.js"},{"src":"\u002Fassets\u002Fplugins\u002Fjquery\u002Fjquery-easy.js"},{"src":"\u002Fassets\u002Fplugins\u002Fjquery-unveil\u002Fjquery.unveil.min.js"},{"src":"\u002Fassets\u002Fplugins\u002Fjquery-ios-list\u002Fjquery.ioslist.min.js"},{"src":"\u002Fassets\u002Fplugins\u002Fjquery-actual\u002Fjquery.actual.min.js"},{"src":"\u002Fassets\u002Fplugins\u002Fjquery-scrollbar\u002Fjquery.scrollbar.min.js"},{"src":"\u002Fassets\u002Fplugins\u002Fselect2\u002Fjs\u002Fselect2.full.min.js"},{"src":"\u002Fassets\u002Fplugins\u002Fclassie\u002Fclassie.js"},{"src":"\u002Fassets\u002Fplugins\u002Fswitchery\u002Fjs\u002Fswitchery.min.js"},{"src":"\u002Fassets\u002Fplugins\u002Fjquery-validation\u002Fjs\u002Fjquery.validate.min.js"},{"src":"\u002Fassets\u002Fplugins\u002Fbootstrap-form-wizard\u002Fjs\u002Fjquery.bootstrap.wizard.min.js"}],"style":[]},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      errPageReady: false,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        nuxt.errPageReady = false
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    beforeSerializeFns: ssrContext ? ssrContext.beforeSerializeFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (process.client && typeof nuxt_plugin_vuesweetalert2_5a6622d9 === 'function') {
    await nuxt_plugin_vuesweetalert2_5a6622d9(app.context, inject)
  }

  if (typeof nuxt_plugin_moment_2c8cbe16 === 'function') {
    await nuxt_plugin_moment_2c8cbe16(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_toast_d94ecf1e === 'function') {
    await nuxt_plugin_toast_d94ecf1e(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_71af687c === 'function') {
    await nuxt_plugin_axios_71af687c(app.context, inject)
  }

  if (typeof nuxt_plugin_plugin_0f43ff7e === 'function') {
    await nuxt_plugin_plugin_0f43ff7e(app.context, inject)
  }

  if (typeof nuxt_plugin_auth_7f7561ce === 'function') {
    await nuxt_plugin_auth_7f7561ce(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_libs_1e91e71a === 'function') {
    await nuxt_plugin_libs_1e91e71a(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_utils_1ea7651c === 'function') {
    await nuxt_plugin_utils_1ea7651c(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // Wait for async component to be resolved first
  await new Promise((resolve, reject) => {
    // Ignore 404s rather than blindly replacing URL in browser
    if (process.client) {
      const { route } = router.resolve(app.context.route.fullPath)
      if (!route.matched.length) {
        return resolve()
      }
    }
    router.replace(app.context.route.fullPath, resolve, (err) => {
      // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
      if (!err._isRouter) return reject(err)
      if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

      // navigated to a different route in router guard
      const unregister = router.afterEach(async (to, from) => {
        if (process.server && ssrContext && ssrContext.url) {
          ssrContext.url = to.fullPath
        }
        app.context.route = await getRouteData(to)
        app.context.params = to.params || {}
        app.context.query = to.query || {}
        unregister()
        resolve()
      })
    })
  })

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
