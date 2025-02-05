import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _03467cc8 = () => interopDefault(import('../pages/dashboard/index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _6b9028c7 = () => interopDefault(import('../pages/academic-session/accommodation-fee-setup.vue' /* webpackChunkName: "pages/academic-session/accommodation-fee-setup" */))
const _4aa50f10 = () => interopDefault(import('../pages/academic-session/cec/index.vue' /* webpackChunkName: "pages/academic-session/cec/index" */))
const _59f17e96 = () => interopDefault(import('../pages/academic-session/direct-entry/index.vue' /* webpackChunkName: "pages/academic-session/direct-entry/index" */))
const _78350e44 = () => interopDefault(import('../pages/academic-session/pg/index.vue' /* webpackChunkName: "pages/academic-session/pg/index" */))
const _03ad5387 = () => interopDefault(import('../pages/academic-session/student-acad-session/index.vue' /* webpackChunkName: "pages/academic-session/student-acad-session/index" */))
const _19e2485e = () => interopDefault(import('../pages/academic-session/utme/index.vue' /* webpackChunkName: "pages/academic-session/utme/index" */))
const _231d3aca = () => interopDefault(import('../pages/application/cec/index.vue' /* webpackChunkName: "pages/application/cec/index" */))
const _523f4737 = () => interopDefault(import('../pages/application/cercord/index.vue' /* webpackChunkName: "pages/application/cercord/index" */))
const _a91c9072 = () => interopDefault(import('../pages/application/mbs/index.vue' /* webpackChunkName: "pages/application/mbs/index" */))
const _363bede4 = () => interopDefault(import('../pages/application/pg/index.vue' /* webpackChunkName: "pages/application/pg/index" */))
const _b96dfdb2 = () => interopDefault(import('../pages/cms/news/index.vue' /* webpackChunkName: "pages/cms/news/index" */))
const _44ac6474 = () => interopDefault(import('../pages/exams/cec-admission-list.vue' /* webpackChunkName: "pages/exams/cec-admission-list" */))
const _2c2434a7 = () => interopDefault(import('../pages/exams/cercord-admission-list.vue' /* webpackChunkName: "pages/exams/cercord-admission-list" */))
const _bf4502d0 = () => interopDefault(import('../pages/exams/de-admission-list.vue' /* webpackChunkName: "pages/exams/de-admission-list" */))
const _b948322a = () => interopDefault(import('../pages/exams/de-result-upload.vue' /* webpackChunkName: "pages/exams/de-result-upload" */))
const _4b8f97d2 = () => interopDefault(import('../pages/exams/mbs-admission-list.vue' /* webpackChunkName: "pages/exams/mbs-admission-list" */))
const _06ccad62 = () => interopDefault(import('../pages/exams/pg-admission-list.vue' /* webpackChunkName: "pages/exams/pg-admission-list" */))
const _726aea8e = () => interopDefault(import('../pages/exams/putme-admission-list.vue' /* webpackChunkName: "pages/exams/putme-admission-list" */))
const _78962435 = () => interopDefault(import('../pages/exams/putme-result-upload.vue' /* webpackChunkName: "pages/exams/putme-result-upload" */))
const _4923a398 = () => interopDefault(import('../pages/get-started/countries.vue' /* webpackChunkName: "pages/get-started/countries" */))
const _c266c2fc = () => interopDefault(import('../pages/get-started/faculties.vue' /* webpackChunkName: "pages/get-started/faculties" */))
const _65d1e25f = () => interopDefault(import('../pages/get-started/religion-management.vue' /* webpackChunkName: "pages/get-started/religion-management" */))
const _701fa9bd = () => interopDefault(import('../pages/get-started/roles.vue' /* webpackChunkName: "pages/get-started/roles" */))
const _15ebeff7 = () => interopDefault(import('../pages/get-started/subjects.vue' /* webpackChunkName: "pages/get-started/subjects" */))
const _450307ac = () => interopDefault(import('../pages/jamb/jamb-de.vue' /* webpackChunkName: "pages/jamb/jamb-de" */))
const _8e4e1ec6 = () => interopDefault(import('../pages/jamb/jamb-results.vue' /* webpackChunkName: "pages/jamb/jamb-results" */))
const _129594e8 = () => interopDefault(import('../pages/personnel/admin/index.vue' /* webpackChunkName: "pages/personnel/admin/index" */))
const _92d9ea50 = () => interopDefault(import('../pages/personnel/lecturers/index.vue' /* webpackChunkName: "pages/personnel/lecturers/index" */))
const _3656caaa = () => interopDefault(import('../pages/utilities/add-drop-utility.vue' /* webpackChunkName: "pages/utilities/add-drop-utility" */))
const _d53315f2 = () => interopDefault(import('../pages/utilities/by-pass.vue' /* webpackChunkName: "pages/utilities/by-pass" */))
const _67ad1cbe = () => interopDefault(import('../pages/utilities/change-student-levels.vue' /* webpackChunkName: "pages/utilities/change-student-levels" */))
const _c6ce5e6c = () => interopDefault(import('../pages/utilities/import-admission-list.vue' /* webpackChunkName: "pages/utilities/import-admission-list" */))
const _8bed2e14 = () => interopDefault(import('../pages/utilities/import-de-admission-list.vue' /* webpackChunkName: "pages/utilities/import-de-admission-list" */))
const _232d1792 = () => interopDefault(import('../pages/utilities/import-de-results.vue' /* webpackChunkName: "pages/utilities/import-de-results" */))
const _6427996b = () => interopDefault(import('../pages/utilities/import-nelfund-loan.vue' /* webpackChunkName: "pages/utilities/import-nelfund-loan" */))
const _4e80517a = () => interopDefault(import('../pages/utilities/import-old-olevel.vue' /* webpackChunkName: "pages/utilities/import-old-olevel" */))
const _2e1207a3 = () => interopDefault(import('../pages/utilities/import-old-transactions.vue' /* webpackChunkName: "pages/utilities/import-old-transactions" */))
const _a761c2a2 = () => interopDefault(import('../pages/utilities/import-putme.vue' /* webpackChunkName: "pages/utilities/import-putme" */))
const _5fc07df4 = () => interopDefault(import('../pages/utilities/import-putme-images.vue' /* webpackChunkName: "pages/utilities/import-putme-images" */))
const _60637a58 = () => interopDefault(import('../pages/utilities/import-putme-results.vue' /* webpackChunkName: "pages/utilities/import-putme-results" */))
const _65be3cfa = () => interopDefault(import('../pages/utilities/import-returning.vue' /* webpackChunkName: "pages/utilities/import-returning" */))
const _20c4587e = () => interopDefault(import('../pages/utilities/import-transfer-student.vue' /* webpackChunkName: "pages/utilities/import-transfer-student" */))
const _d6d597f4 = () => interopDefault(import('../pages/utilities/manage-sug-fee.vue' /* webpackChunkName: "pages/utilities/manage-sug-fee" */))
const _1d8c2d7d = () => interopDefault(import('../pages/utilities/search-rrr.vue' /* webpackChunkName: "pages/utilities/search-rrr" */))
const _1a54620c = () => interopDefault(import('../pages/utilities/student-email-request.vue' /* webpackChunkName: "pages/utilities/student-email-request" */))
const _31fd8872 = () => interopDefault(import('../pages/utilities/student-id-card-request.vue' /* webpackChunkName: "pages/utilities/student-id-card-request" */))
const _4c94a88c = () => interopDefault(import('../pages/utilities/student-login-details.vue' /* webpackChunkName: "pages/utilities/student-login-details" */))
const _f2bebeb4 = () => interopDefault(import('../pages/utilities/student-waiver.vue' /* webpackChunkName: "pages/utilities/student-waiver" */))
const _0afdf34e = () => interopDefault(import('../pages/utilities/validate-student-rrr.vue' /* webpackChunkName: "pages/utilities/validate-student-rrr" */))
const _e08322d2 = () => interopDefault(import('../pages/academic-session/direct-entry/add-new.vue' /* webpackChunkName: "pages/academic-session/direct-entry/add-new" */))
const _e813a000 = () => interopDefault(import('../pages/academic-session/utme/add-new.vue' /* webpackChunkName: "pages/academic-session/utme/add-new" */))
const _568b9a0e = () => interopDefault(import('../pages/reports/students/acceptance-report.vue' /* webpackChunkName: "pages/reports/students/acceptance-report" */))
const _74cc160a = () => interopDefault(import('../pages/reports/students/admissions-report.vue' /* webpackChunkName: "pages/reports/students/admissions-report" */))
const _19821ce0 = () => interopDefault(import('../pages/reports/students/cec-admission-report.vue' /* webpackChunkName: "pages/reports/students/cec-admission-report" */))
const _107ae3fa = () => interopDefault(import('../pages/reports/students/cercord-admission-report.vue' /* webpackChunkName: "pages/reports/students/cercord-admission-report" */))
const _30b327f3 = () => interopDefault(import('../pages/reports/students/course-download-report.vue' /* webpackChunkName: "pages/reports/students/course-download-report" */))
const _d07eebb2 = () => interopDefault(import('../pages/reports/students/de-admitted-students.vue' /* webpackChunkName: "pages/reports/students/de-admitted-students" */))
const _55156473 = () => interopDefault(import('../pages/reports/students/mbs-admission-report.vue' /* webpackChunkName: "pages/reports/students/mbs-admission-report" */))
const _bab71394 = () => interopDefault(import('../pages/reports/students/payment-transaction-report.vue' /* webpackChunkName: "pages/reports/students/payment-transaction-report" */))
const _b9ec6f9c = () => interopDefault(import('../pages/reports/students/pg-admission-report.vue' /* webpackChunkName: "pages/reports/students/pg-admission-report" */))
const _cce97964 = () => interopDefault(import('../pages/reports/students/putme/index.vue' /* webpackChunkName: "pages/reports/students/putme/index" */))
const _5c395fe5 = () => interopDefault(import('../pages/reports/students/reparation-fee-report.vue' /* webpackChunkName: "pages/reports/students/reparation-fee-report" */))
const _23b5ac07 = () => interopDefault(import('../pages/reports/students/school-fees-report.vue' /* webpackChunkName: "pages/reports/students/school-fees-report" */))
const _1707fa0a = () => interopDefault(import('../pages/reports/students/uploaded-de-candidates.vue' /* webpackChunkName: "pages/reports/students/uploaded-de-candidates" */))
const _f6202d60 = () => interopDefault(import('../pages/reports/students/uploaded-jamb-candidates.vue' /* webpackChunkName: "pages/reports/students/uploaded-jamb-candidates" */))
const _e329e128 = () => interopDefault(import('../pages/utilities/add-on/manage/index.vue' /* webpackChunkName: "pages/utilities/add-on/manage/index" */))
const _3439be1e = () => interopDefault(import('../pages/reports/students/putme/register-putme.vue' /* webpackChunkName: "pages/reports/students/putme/register-putme" */))
const _0bb38604 = () => interopDefault(import('../pages/reports/students/putme/ssce-result.vue' /* webpackChunkName: "pages/reports/students/putme/ssce-result" */))
const _0fe7e0d2 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _63b106a1 = () => interopDefault(import('../pages/academic-session/cec/form/_id.vue' /* webpackChunkName: "pages/academic-session/cec/form/_id" */))
const _7ea036dc = () => interopDefault(import('../pages/academic-session/direct-entry/form/_id.vue' /* webpackChunkName: "pages/academic-session/direct-entry/form/_id" */))
const _daecbbda = () => interopDefault(import('../pages/academic-session/pg/form/_id.vue' /* webpackChunkName: "pages/academic-session/pg/form/_id" */))
const _0960a293 = () => interopDefault(import('../pages/academic-session/utme/form/_id.vue' /* webpackChunkName: "pages/academic-session/utme/form/_id" */))
const _db8b6dac = () => interopDefault(import('../pages/cms/news/form/_id.vue' /* webpackChunkName: "pages/cms/news/form/_id" */))
const _61d3a15c = () => interopDefault(import('../pages/get-started/courses/edit/_id.vue' /* webpackChunkName: "pages/get-started/courses/edit/_id" */))
const _540d3df7 = () => interopDefault(import('../pages/get-started/courses/manage/_id.vue' /* webpackChunkName: "pages/get-started/courses/manage/_id" */))
const _b3a094ce = () => interopDefault(import('../pages/get-started/school-fees-setup/manage/_id.vue' /* webpackChunkName: "pages/get-started/school-fees-setup/manage/_id" */))
const _471815d9 = () => interopDefault(import('../pages/personnel/lecturers/form/_id.vue' /* webpackChunkName: "pages/personnel/lecturers/form/_id" */))
const _8dcfe89c = () => interopDefault(import('../pages/academic-session/cec/_cecId/index.vue' /* webpackChunkName: "pages/academic-session/cec/_cecId/index" */))
const _5b269dc1 = () => interopDefault(import('../pages/academic-session/direct-entry/_deId/index.vue' /* webpackChunkName: "pages/academic-session/direct-entry/_deId/index" */))
const _127458c0 = () => interopDefault(import('../pages/academic-session/pg/_pgId/index.vue' /* webpackChunkName: "pages/academic-session/pg/_pgId/index" */))
const _05d62f0a = () => interopDefault(import('../pages/academic-session/utme/_putmeId/index.vue' /* webpackChunkName: "pages/academic-session/utme/_putmeId/index" */))
const _04f9be3a = () => interopDefault(import('../pages/get-started/courses/_id.vue' /* webpackChunkName: "pages/get-started/courses/_id" */))
const _4b43b78c = () => interopDefault(import('../pages/get-started/departments/_id.vue' /* webpackChunkName: "pages/get-started/departments/_id" */))
const _2cfc0648 = () => interopDefault(import('../pages/get-started/lgas/_id.vue' /* webpackChunkName: "pages/get-started/lgas/_id" */))
const _7761a3ca = () => interopDefault(import('../pages/get-started/programs/_id.vue' /* webpackChunkName: "pages/get-started/programs/_id" */))
const _320d1b81 = () => interopDefault(import('../pages/get-started/school-fees-setup/_id.vue' /* webpackChunkName: "pages/get-started/school-fees-setup/_id" */))
const _4b7c4573 = () => interopDefault(import('../pages/get-started/specializations/_id.vue' /* webpackChunkName: "pages/get-started/specializations/_id" */))
const _a8d8bb46 = () => interopDefault(import('../pages/get-started/states/_id.vue' /* webpackChunkName: "pages/get-started/states/_id" */))
const _3cd3c112 = () => interopDefault(import('../pages/academic-session/cec/_cecId/manage/college-department.vue' /* webpackChunkName: "pages/academic-session/cec/_cecId/manage/college-department" */))
const _00a58059 = () => interopDefault(import('../pages/academic-session/cec/_cecId/manage/student-union-dues.vue' /* webpackChunkName: "pages/academic-session/cec/_cecId/manage/student-union-dues" */))
const _899de02e = () => interopDefault(import('../pages/academic-session/direct-entry/_deId/manage/acceptance-fee.vue' /* webpackChunkName: "pages/academic-session/direct-entry/_deId/manage/acceptance-fee" */))
const _6cf8e0ca = () => interopDefault(import('../pages/academic-session/direct-entry/_deId/manage/add-seat.vue' /* webpackChunkName: "pages/academic-session/direct-entry/_deId/manage/add-seat" */))
const _42272174 = () => interopDefault(import('../pages/academic-session/direct-entry/_deId/manage/add-student-result.vue' /* webpackChunkName: "pages/academic-session/direct-entry/_deId/manage/add-student-result" */))
const _d561d0b6 = () => interopDefault(import('../pages/academic-session/direct-entry/_deId/manage/late-fee-slip.vue' /* webpackChunkName: "pages/academic-session/direct-entry/_deId/manage/late-fee-slip" */))
const _08ad74e8 = () => interopDefault(import('../pages/academic-session/direct-entry/_deId/manage/student-union-dues.vue' /* webpackChunkName: "pages/academic-session/direct-entry/_deId/manage/student-union-dues" */))
const _7c57b1d3 = () => interopDefault(import('../pages/academic-session/pg/_pgId/manage/add-student-result.vue' /* webpackChunkName: "pages/academic-session/pg/_pgId/manage/add-student-result" */))
const _18cf87e6 = () => interopDefault(import('../pages/academic-session/pg/_pgId/manage/late-fee-slip.vue' /* webpackChunkName: "pages/academic-session/pg/_pgId/manage/late-fee-slip" */))
const _42de0547 = () => interopDefault(import('../pages/academic-session/pg/_pgId/manage/student-union-dues.vue' /* webpackChunkName: "pages/academic-session/pg/_pgId/manage/student-union-dues" */))
const _6af33493 = () => interopDefault(import('../pages/academic-session/pg/_pgId/manage/view-registered-students.vue' /* webpackChunkName: "pages/academic-session/pg/_pgId/manage/view-registered-students" */))
const _5f0eef32 = () => interopDefault(import('../pages/academic-session/utme/_putmeId/manage/acceptance-fee.vue' /* webpackChunkName: "pages/academic-session/utme/_putmeId/manage/acceptance-fee" */))
const _7143aa5a = () => interopDefault(import('../pages/academic-session/utme/_putmeId/manage/add-seat.vue' /* webpackChunkName: "pages/academic-session/utme/_putmeId/manage/add-seat" */))
const _0bfb9786 = () => interopDefault(import('../pages/academic-session/utme/_putmeId/manage/add-student-result.vue' /* webpackChunkName: "pages/academic-session/utme/_putmeId/manage/add-student-result" */))
const _4803ab3c = () => interopDefault(import('../pages/academic-session/utme/_putmeId/manage/late-fee-slip.vue' /* webpackChunkName: "pages/academic-session/utme/_putmeId/manage/late-fee-slip" */))
const _7eeef09e = () => interopDefault(import('../pages/academic-session/utme/_putmeId/manage/student-union-dues.vue' /* webpackChunkName: "pages/academic-session/utme/_putmeId/manage/student-union-dues" */))
const _5288bf7d = () => interopDefault(import('../pages/academic-session/utme/_putmeId/manage/view-registered-students.vue' /* webpackChunkName: "pages/academic-session/utme/_putmeId/manage/view-registered-students" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/dashboard",
    component: _03467cc8,
    name: "dashboard"
  }, {
    path: "/academic-session/accommodation-fee-setup",
    component: _6b9028c7,
    name: "academic-session-accommodation-fee-setup"
  }, {
    path: "/academic-session/cec",
    component: _4aa50f10,
    name: "academic-session-cec"
  }, {
    path: "/academic-session/direct-entry",
    component: _59f17e96,
    name: "academic-session-direct-entry"
  }, {
    path: "/academic-session/pg",
    component: _78350e44,
    name: "academic-session-pg"
  }, {
    path: "/academic-session/student-acad-session",
    component: _03ad5387,
    name: "academic-session-student-acad-session"
  }, {
    path: "/academic-session/utme",
    component: _19e2485e,
    name: "academic-session-utme"
  }, {
    path: "/application/cec",
    component: _231d3aca,
    name: "application-cec"
  }, {
    path: "/application/cercord",
    component: _523f4737,
    name: "application-cercord"
  }, {
    path: "/application/mbs",
    component: _a91c9072,
    name: "application-mbs"
  }, {
    path: "/application/pg",
    component: _363bede4,
    name: "application-pg"
  }, {
    path: "/cms/news",
    component: _b96dfdb2,
    name: "cms-news"
  }, {
    path: "/exams/cec-admission-list",
    component: _44ac6474,
    name: "exams-cec-admission-list"
  }, {
    path: "/exams/cercord-admission-list",
    component: _2c2434a7,
    name: "exams-cercord-admission-list"
  }, {
    path: "/exams/de-admission-list",
    component: _bf4502d0,
    name: "exams-de-admission-list"
  }, {
    path: "/exams/de-result-upload",
    component: _b948322a,
    name: "exams-de-result-upload"
  }, {
    path: "/exams/mbs-admission-list",
    component: _4b8f97d2,
    name: "exams-mbs-admission-list"
  }, {
    path: "/exams/pg-admission-list",
    component: _06ccad62,
    name: "exams-pg-admission-list"
  }, {
    path: "/exams/putme-admission-list",
    component: _726aea8e,
    name: "exams-putme-admission-list"
  }, {
    path: "/exams/putme-result-upload",
    component: _78962435,
    name: "exams-putme-result-upload"
  }, {
    path: "/get-started/countries",
    component: _4923a398,
    name: "get-started-countries"
  }, {
    path: "/get-started/faculties",
    component: _c266c2fc,
    name: "get-started-faculties"
  }, {
    path: "/get-started/religion-management",
    component: _65d1e25f,
    name: "get-started-religion-management"
  }, {
    path: "/get-started/roles",
    component: _701fa9bd,
    name: "get-started-roles"
  }, {
    path: "/get-started/subjects",
    component: _15ebeff7,
    name: "get-started-subjects"
  }, {
    path: "/jamb/jamb-de",
    component: _450307ac,
    name: "jamb-jamb-de"
  }, {
    path: "/jamb/jamb-results",
    component: _8e4e1ec6,
    name: "jamb-jamb-results"
  }, {
    path: "/personnel/admin",
    component: _129594e8,
    name: "personnel-admin"
  }, {
    path: "/personnel/lecturers",
    component: _92d9ea50,
    name: "personnel-lecturers"
  }, {
    path: "/utilities/add-drop-utility",
    component: _3656caaa,
    name: "utilities-add-drop-utility"
  }, {
    path: "/utilities/by-pass",
    component: _d53315f2,
    name: "utilities-by-pass"
  }, {
    path: "/utilities/change-student-levels",
    component: _67ad1cbe,
    name: "utilities-change-student-levels"
  }, {
    path: "/utilities/import-admission-list",
    component: _c6ce5e6c,
    name: "utilities-import-admission-list"
  }, {
    path: "/utilities/import-de-admission-list",
    component: _8bed2e14,
    name: "utilities-import-de-admission-list"
  }, {
    path: "/utilities/import-de-results",
    component: _232d1792,
    name: "utilities-import-de-results"
  }, {
    path: "/utilities/import-nelfund-loan",
    component: _6427996b,
    name: "utilities-import-nelfund-loan"
  }, {
    path: "/utilities/import-old-olevel",
    component: _4e80517a,
    name: "utilities-import-old-olevel"
  }, {
    path: "/utilities/import-old-transactions",
    component: _2e1207a3,
    name: "utilities-import-old-transactions"
  }, {
    path: "/utilities/import-putme",
    component: _a761c2a2,
    name: "utilities-import-putme"
  }, {
    path: "/utilities/import-putme-images",
    component: _5fc07df4,
    name: "utilities-import-putme-images"
  }, {
    path: "/utilities/import-putme-results",
    component: _60637a58,
    name: "utilities-import-putme-results"
  }, {
    path: "/utilities/import-returning",
    component: _65be3cfa,
    name: "utilities-import-returning"
  }, {
    path: "/utilities/import-transfer-student",
    component: _20c4587e,
    name: "utilities-import-transfer-student"
  }, {
    path: "/utilities/manage-sug-fee",
    component: _d6d597f4,
    name: "utilities-manage-sug-fee"
  }, {
    path: "/utilities/search-rrr",
    component: _1d8c2d7d,
    name: "utilities-search-rrr"
  }, {
    path: "/utilities/student-email-request",
    component: _1a54620c,
    name: "utilities-student-email-request"
  }, {
    path: "/utilities/student-id-card-request",
    component: _31fd8872,
    name: "utilities-student-id-card-request"
  }, {
    path: "/utilities/student-login-details",
    component: _4c94a88c,
    name: "utilities-student-login-details"
  }, {
    path: "/utilities/student-waiver",
    component: _f2bebeb4,
    name: "utilities-student-waiver"
  }, {
    path: "/utilities/validate-student-rrr",
    component: _0afdf34e,
    name: "utilities-validate-student-rrr"
  }, {
    path: "/academic-session/direct-entry/add-new",
    component: _e08322d2,
    name: "academic-session-direct-entry-add-new"
  }, {
    path: "/academic-session/utme/add-new",
    component: _e813a000,
    name: "academic-session-utme-add-new"
  }, {
    path: "/reports/students/acceptance-report",
    component: _568b9a0e,
    name: "reports-students-acceptance-report"
  }, {
    path: "/reports/students/admissions-report",
    component: _74cc160a,
    name: "reports-students-admissions-report"
  }, {
    path: "/reports/students/cec-admission-report",
    component: _19821ce0,
    name: "reports-students-cec-admission-report"
  }, {
    path: "/reports/students/cercord-admission-report",
    component: _107ae3fa,
    name: "reports-students-cercord-admission-report"
  }, {
    path: "/reports/students/course-download-report",
    component: _30b327f3,
    name: "reports-students-course-download-report"
  }, {
    path: "/reports/students/de-admitted-students",
    component: _d07eebb2,
    name: "reports-students-de-admitted-students"
  }, {
    path: "/reports/students/mbs-admission-report",
    component: _55156473,
    name: "reports-students-mbs-admission-report"
  }, {
    path: "/reports/students/payment-transaction-report",
    component: _bab71394,
    name: "reports-students-payment-transaction-report"
  }, {
    path: "/reports/students/pg-admission-report",
    component: _b9ec6f9c,
    name: "reports-students-pg-admission-report"
  }, {
    path: "/reports/students/putme",
    component: _cce97964,
    name: "reports-students-putme"
  }, {
    path: "/reports/students/reparation-fee-report",
    component: _5c395fe5,
    name: "reports-students-reparation-fee-report"
  }, {
    path: "/reports/students/school-fees-report",
    component: _23b5ac07,
    name: "reports-students-school-fees-report"
  }, {
    path: "/reports/students/uploaded-de-candidates",
    component: _1707fa0a,
    name: "reports-students-uploaded-de-candidates"
  }, {
    path: "/reports/students/uploaded-jamb-candidates",
    component: _f6202d60,
    name: "reports-students-uploaded-jamb-candidates"
  }, {
    path: "/utilities/add-on/manage",
    component: _e329e128,
    name: "utilities-add-on-manage"
  }, {
    path: "/reports/students/putme/register-putme",
    component: _3439be1e,
    name: "reports-students-putme-register-putme"
  }, {
    path: "/reports/students/putme/ssce-result",
    component: _0bb38604,
    name: "reports-students-putme-ssce-result"
  }, {
    path: "/",
    component: _0fe7e0d2,
    name: "index"
  }, {
    path: "/academic-session/cec/form/:id",
    component: _63b106a1,
    name: "academic-session-cec-form-id"
  }, {
    path: "/academic-session/direct-entry/form/:id?",
    component: _7ea036dc,
    name: "academic-session-direct-entry-form-id"
  }, {
    path: "/academic-session/pg/form/:id",
    component: _daecbbda,
    name: "academic-session-pg-form-id"
  }, {
    path: "/academic-session/utme/form/:id",
    component: _0960a293,
    name: "academic-session-utme-form-id"
  }, {
    path: "/cms/news/form/:id?",
    component: _db8b6dac,
    name: "cms-news-form-id"
  }, {
    path: "/get-started/courses/edit/:id?",
    component: _61d3a15c,
    name: "get-started-courses-edit-id"
  }, {
    path: "/get-started/courses/manage/:id?",
    component: _540d3df7,
    name: "get-started-courses-manage-id"
  }, {
    path: "/get-started/school-fees-setup/manage/:id?",
    component: _b3a094ce,
    name: "get-started-school-fees-setup-manage-id"
  }, {
    path: "/personnel/lecturers/form/:id?",
    component: _471815d9,
    name: "personnel-lecturers-form-id"
  }, {
    path: "/academic-session/cec/:cecId",
    component: _8dcfe89c,
    name: "academic-session-cec-cecId"
  }, {
    path: "/academic-session/direct-entry/:deId",
    component: _5b269dc1,
    name: "academic-session-direct-entry-deId"
  }, {
    path: "/academic-session/pg/:pgId",
    component: _127458c0,
    name: "academic-session-pg-pgId"
  }, {
    path: "/academic-session/utme/:putmeId",
    component: _05d62f0a,
    name: "academic-session-utme-putmeId"
  }, {
    path: "/get-started/courses/:id?",
    component: _04f9be3a,
    name: "get-started-courses-id"
  }, {
    path: "/get-started/departments/:id?",
    component: _4b43b78c,
    name: "get-started-departments-id"
  }, {
    path: "/get-started/lgas/:id?",
    component: _2cfc0648,
    name: "get-started-lgas-id"
  }, {
    path: "/get-started/programs/:id?",
    component: _7761a3ca,
    name: "get-started-programs-id"
  }, {
    path: "/get-started/school-fees-setup/:id?",
    component: _320d1b81,
    name: "get-started-school-fees-setup-id"
  }, {
    path: "/get-started/specializations/:id?",
    component: _4b7c4573,
    name: "get-started-specializations-id"
  }, {
    path: "/get-started/states/:id?",
    component: _a8d8bb46,
    name: "get-started-states-id"
  }, {
    path: "/academic-session/cec/:cecId?/manage/college-department",
    component: _3cd3c112,
    name: "academic-session-cec-cecId-manage-college-department"
  }, {
    path: "/academic-session/cec/:cecId?/manage/student-union-dues",
    component: _00a58059,
    name: "academic-session-cec-cecId-manage-student-union-dues"
  }, {
    path: "/academic-session/direct-entry/:deId?/manage/acceptance-fee",
    component: _899de02e,
    name: "academic-session-direct-entry-deId-manage-acceptance-fee"
  }, {
    path: "/academic-session/direct-entry/:deId?/manage/add-seat",
    component: _6cf8e0ca,
    name: "academic-session-direct-entry-deId-manage-add-seat"
  }, {
    path: "/academic-session/direct-entry/:deId?/manage/add-student-result",
    component: _42272174,
    name: "academic-session-direct-entry-deId-manage-add-student-result"
  }, {
    path: "/academic-session/direct-entry/:deId?/manage/late-fee-slip",
    component: _d561d0b6,
    name: "academic-session-direct-entry-deId-manage-late-fee-slip"
  }, {
    path: "/academic-session/direct-entry/:deId?/manage/student-union-dues",
    component: _08ad74e8,
    name: "academic-session-direct-entry-deId-manage-student-union-dues"
  }, {
    path: "/academic-session/pg/:pgId?/manage/add-student-result",
    component: _7c57b1d3,
    name: "academic-session-pg-pgId-manage-add-student-result"
  }, {
    path: "/academic-session/pg/:pgId?/manage/late-fee-slip",
    component: _18cf87e6,
    name: "academic-session-pg-pgId-manage-late-fee-slip"
  }, {
    path: "/academic-session/pg/:pgId?/manage/student-union-dues",
    component: _42de0547,
    name: "academic-session-pg-pgId-manage-student-union-dues"
  }, {
    path: "/academic-session/pg/:pgId?/manage/view-registered-students",
    component: _6af33493,
    name: "academic-session-pg-pgId-manage-view-registered-students"
  }, {
    path: "/academic-session/utme/:putmeId?/manage/acceptance-fee",
    component: _5f0eef32,
    name: "academic-session-utme-putmeId-manage-acceptance-fee"
  }, {
    path: "/academic-session/utme/:putmeId?/manage/add-seat",
    component: _7143aa5a,
    name: "academic-session-utme-putmeId-manage-add-seat"
  }, {
    path: "/academic-session/utme/:putmeId?/manage/add-student-result",
    component: _0bfb9786,
    name: "academic-session-utme-putmeId-manage-add-student-result"
  }, {
    path: "/academic-session/utme/:putmeId?/manage/late-fee-slip",
    component: _4803ab3c,
    name: "academic-session-utme-putmeId-manage-late-fee-slip"
  }, {
    path: "/academic-session/utme/:putmeId?/manage/student-union-dues",
    component: _7eeef09e,
    name: "academic-session-utme-putmeId-manage-student-union-dues"
  }, {
    path: "/academic-session/utme/:putmeId?/manage/view-registered-students",
    component: _5288bf7d,
    name: "academic-session-utme-putmeId-manage-view-registered-students"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
