import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const VUEX_PROPERTIES = ['state', 'getters', 'actions', 'mutations']

let store = {};

(function updateModules () {
  // If store is an exported method = classic mode (deprecated)

  if (typeof store === 'function') {
    return console.warn('Classic mode for store/ is deprecated and will be removed in Nuxt 3.')
  }

  // Enforce store modules
  store.modules = store.modules || {}

  resolveStoreModules(require('../store/academic-session.js'), 'academic-session.js')
  resolveStoreModules(require('../store/accommodation.js'), 'accommodation.js')
  resolveStoreModules(require('../store/add-delete.js'), 'add-delete.js')
  resolveStoreModules(require('../store/authentication.js'), 'authentication.js')
  resolveStoreModules(require('../store/byPassUtility.js'), 'byPassUtility.js')
  resolveStoreModules(require('../store/cec.js'), 'cec.js')
  resolveStoreModules(require('../store/cercord-admission.js'), 'cercord-admission.js')
  resolveStoreModules(require('../store/cercord.js'), 'cercord.js')
  resolveStoreModules(require('../store/config.js'), 'config.js')
  resolveStoreModules(require('../store/countries.js'), 'countries.js')
  resolveStoreModules(require('../store/de-result-upload.js'), 'de-result-upload.js')
  resolveStoreModules(require('../store/departments.js'), 'departments.js')
  resolveStoreModules(require('../store/email-requests.js'), 'email-requests.js')
  resolveStoreModules(require('../store/faculties.js'), 'faculties.js')
  resolveStoreModules(require('../store/get-started.js'), 'get-started.js')
  resolveStoreModules(require('../store/id-card-request.js'), 'id-card-request.js')
  resolveStoreModules(require('../store/jamb-de.js'), 'jamb-de.js')
  resolveStoreModules(require('../store/jambs.js'), 'jambs.js')
  resolveStoreModules(require('../store/lgas.js'), 'lgas.js')
  resolveStoreModules(require('../store/mbs-admission.js'), 'mbs-admission.js')
  resolveStoreModules(require('../store/mbs.js'), 'mbs.js')
  resolveStoreModules(require('../store/nelfund.js'), 'nelfund.js')
  resolveStoreModules(require('../store/news.js'), 'news.js')
  resolveStoreModules(require('../store/old-transactions.js'), 'old-transactions.js')
  resolveStoreModules(require('../store/permissions.js'), 'permissions.js')
  resolveStoreModules(require('../store/personnel.js'), 'personnel.js')
  resolveStoreModules(require('../store/pg.js'), 'pg.js')
  resolveStoreModules(require('../store/programs.js'), 'programs.js')
  resolveStoreModules(require('../store/pumteresults.js'), 'pumteresults.js')
  resolveStoreModules(require('../store/putme.js'), 'putme.js')
  resolveStoreModules(require('../store/religions.js'), 'religions.js')
  resolveStoreModules(require('../store/reparation-fee.js'), 'reparation-fee.js')
  resolveStoreModules(require('../store/reports.js'), 'reports.js')
  resolveStoreModules(require('../store/roles.js'), 'roles.js')
  resolveStoreModules(require('../store/states.js'), 'states.js')
  resolveStoreModules(require('../store/student-acad-session.js'), 'student-acad-session.js')
  resolveStoreModules(require('../store/student.js'), 'student.js')
  resolveStoreModules(require('../store/users.js'), 'users.js')
  resolveStoreModules(require('../store/utility.js'), 'utility.js')

  // If the environment supports hot reloading...

  if (process.client && module.hot) {
    // Whenever any Vuex module is updated...
    module.hot.accept([
      '../store/academic-session.js',
      '../store/accommodation.js',
      '../store/add-delete.js',
      '../store/authentication.js',
      '../store/byPassUtility.js',
      '../store/cec.js',
      '../store/cercord-admission.js',
      '../store/cercord.js',
      '../store/config.js',
      '../store/countries.js',
      '../store/de-result-upload.js',
      '../store/departments.js',
      '../store/email-requests.js',
      '../store/faculties.js',
      '../store/get-started.js',
      '../store/id-card-request.js',
      '../store/jamb-de.js',
      '../store/jambs.js',
      '../store/lgas.js',
      '../store/mbs-admission.js',
      '../store/mbs.js',
      '../store/nelfund.js',
      '../store/news.js',
      '../store/old-transactions.js',
      '../store/permissions.js',
      '../store/personnel.js',
      '../store/pg.js',
      '../store/programs.js',
      '../store/pumteresults.js',
      '../store/putme.js',
      '../store/religions.js',
      '../store/reparation-fee.js',
      '../store/reports.js',
      '../store/roles.js',
      '../store/states.js',
      '../store/student-acad-session.js',
      '../store/student.js',
      '../store/users.js',
      '../store/utility.js',
    ], () => {
      // Update `root.modules` with the latest definitions.
      updateModules()
      // Trigger a hot update in the store.
      window.$nuxt.$store.hotUpdate(store)
    })
  }
})()

// createStore
export const createStore = store instanceof Function ? store : () => {
  return new Vuex.Store(Object.assign({
    strict: (process.env.NODE_ENV !== 'production')
  }, store))
}

function normalizeRoot (moduleData, filePath) {
  moduleData = moduleData.default || moduleData

  if (moduleData.commit) {
    throw new Error(`[nuxt] ${filePath} should export a method that returns a Vuex instance.`)
  }

  if (typeof moduleData !== 'function') {
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData)
  }
  return normalizeModule(moduleData, filePath)
}

function normalizeModule (moduleData, filePath) {
  if (moduleData.state && typeof moduleData.state !== 'function') {
    console.warn(`'state' should be a method that returns an object in ${filePath}`)

    const state = Object.assign({}, moduleData.state)
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData, { state: () => state })
  }
  return moduleData
}

function resolveStoreModules (moduleData, filename) {
  moduleData = moduleData.default || moduleData
  // Remove store src + extension (./foo/index.js -> foo/index)
  const namespace = filename.replace(/\.(js|mjs)$/, '')
  const namespaces = namespace.split('/')
  let moduleName = namespaces[namespaces.length - 1]
  const filePath = `store/${filename}`

  moduleData = moduleName === 'state'
    ? normalizeState(moduleData, filePath)
    : normalizeModule(moduleData, filePath)

  // If src is a known Vuex property
  if (VUEX_PROPERTIES.includes(moduleName)) {
    const property = moduleName
    const propertyStoreModule = getStoreModule(store, namespaces, { isProperty: true })

    // Replace state since it's a function
    mergeProperty(propertyStoreModule, moduleData, property)
    return
  }

  // If file is foo/index.js, it should be saved as foo
  const isIndexModule = (moduleName === 'index')
  if (isIndexModule) {
    namespaces.pop()
    moduleName = namespaces[namespaces.length - 1]
  }

  const storeModule = getStoreModule(store, namespaces)

  for (const property of VUEX_PROPERTIES) {
    mergeProperty(storeModule, moduleData[property], property)
  }

  if (moduleData.namespaced === false) {
    delete storeModule.namespaced
  }
}

function normalizeState (moduleData, filePath) {
  if (typeof moduleData !== 'function') {
    console.warn(`${filePath} should export a method that returns an object`)
    const state = Object.assign({}, moduleData)
    return () => state
  }
  return normalizeModule(moduleData, filePath)
}

function getStoreModule (storeModule, namespaces, { isProperty = false } = {}) {
  // If ./mutations.js
  if (!namespaces.length || (isProperty && namespaces.length === 1)) {
    return storeModule
  }

  const namespace = namespaces.shift()

  storeModule.modules[namespace] = storeModule.modules[namespace] || {}
  storeModule.modules[namespace].namespaced = true
  storeModule.modules[namespace].modules = storeModule.modules[namespace].modules || {}

  return getStoreModule(storeModule.modules[namespace], namespaces, { isProperty })
}

function mergeProperty (storeModule, moduleData, property) {
  if (!moduleData) {
    return
  }

  if (property === 'state') {
    storeModule.state = moduleData || storeModule.state
  } else {
    storeModule[property] = Object.assign({}, storeModule[property], moduleData)
  }
}
