<template>
    <div class="header p-r-0 bg-primary">
        <div class="header-inner header-md-height">
            <a href="#" class="btn-link toggle-sidebar d-lg-none pg pg-menu text-white" data-toggle="horizontal-menu"></a>
            <div class="">
                <div class="brand inline no-border d-sm-inline-block">
                    <img src="/assets/img/mou_logo.png" alt="logo" data-src="/assets/img/mou_logo.png" data-src-retina="/assets/img/mou_logo.png" height="40">
                </div>
            </div>
            <div class="d-flex align-items-center">
                <!-- START User Info-->
                <div class="pull-left p-r-10 fs-14 font-heading d-lg-inline-block d-none text-white">
                    <span v-if="$auth.user" class="semi-bold">{{$auth.user.name}}</span>
                </div>
                <div class="dropdown pull-right">
                    <button class="profile-dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="thumbnail-wrapper d32 circular inline sm-m-r-5">
                    <img src="/assets/img/profiles/avatar.png" alt="" data-src="/assets/img/profiles/avatar.png" data-src-retina="/assets/img/profiles/avatar.png" width="32" height="32">
                    </span>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right profile-dropdown" role="menu">
                        <span><a href="#" class="dropdown-item"><i class="fa fa-user"></i> &nbsp;&nbsp;Profile</a></span>
                        <span><a href="#" class="dropdown-item"><i class="pg-settings_small"></i> &nbsp;&nbsp;Settings</a></span>
                        <span><a href="#" class="dropdown-item"><i class="fa fa-envelope"></i> &nbsp;&nbsp;Feedback</a></span>
                        <span @click="logout()"><nuxt-link to="/" class="dropdown-item"><i class="pg-power"></i> &nbsp;&nbsp;Logout</nuxt-link> </span>
                        <div class="dropdown-divider"></div>
                        <span v-if="$auth.user" class="dropdown-item fs-12 hint-text">Last visited<br />on {{$moment($auth.user.updated_at).format('dddd, h:mm a')}}</span>
                    </div>
                </div>
                <!-- END User Info-->
                <!--            <a href="#" class="header-icon pg pg-alt_menu btn-link m-l-10 sm-no-margin d-inline-block" data-toggle="quickview" data-toggle-element="#quickview"></a>-->
            </div>
        </div>
        <div class="bg-white">
            <div class="container p-l-0">
                <div class="menu-bar header-sm-height" data-pages-init='horizontal-menu' data-hide-extra-li="-1">
                    <a href="#" class="btn-link toggle-sidebar d-lg-none pg pg-close" data-toggle="horizontal-menu">
                    </a>
                    <ul>
                        <li><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
                        <li>
                            <a href="javascript:;"><span class="title">Get Started</span><span class=" arrow"></span></a>
                            <ul>
                                <li v-permission="'View faculty'"><nuxt-link to="/get-started/faculties">Faculties</nuxt-link></li>
                                <li v-permission="'View subject'"><nuxt-link to="/get-started/subjects">Subject</nuxt-link></li>
                                <li v-permission="'View country'"><nuxt-link to="/get-started/countries">Countries</nuxt-link></li>
                                <li v-permission="'View religion'"><nuxt-link to="/get-started/religion-management">Religions</nuxt-link></li>
                                <li v-permission="'View Roles'"><nuxt-link to="/get-started/roles">Roles</nuxt-link></li>
                            </ul>
                        </li>
                        <li>
                            <a href="javascript:;"><span class="title">Academic Session</span><span class=" arrow"></span></a>
                            <ul>
                                <li v-permission="'View UTME'"><nuxt-link to="/academic-session/utme">UTME</nuxt-link></li>
                                <li v-permission="'View Direct Entry'"><nuxt-link to="/academic-session/direct-entry">Direct Entry</nuxt-link></li>
                                <li v-permission="'View Cec'"><nuxt-link to="/academic-session/cec">CEC</nuxt-link></li>
                                <li v-permission="'View Pg'"><nuxt-link to="/academic-session/pg">PG</nuxt-link></li>
                                <li v-permission="'View Regular Student'"><nuxt-link to="/academic-session/student-acad-session">Regular Students</nuxt-link></li>
                                <li v-permission="'View Accommodation Fee'"><nuxt-link to="/academic-session/accommodation-fee-setup">Accommodation Fee Setup</nuxt-link></li>
                            </ul>
                        </li>
                        <li class="">
                            <a href="javascript:;"><span class="title">Personnel</span><span class=" arrow"></span></a>
                            <ul class="">
                                <li v-permission="'View Admin Users'"><nuxt-link to="/personnel/admin">Admin Users</nuxt-link></li>
                                <li v-permission="'View Lecturers'"><nuxt-link to="/personnel/lecturers">Lecturers</nuxt-link></li>
                            </ul>
                        </li>
                        <li class="">
                            <a href="javascript:;"><span class="title">Reports</span><span class=" arrow"></span></a>
                            <ul class="">
                                <li v-permission="'View Putme De Report'"><nuxt-link to="/reports/students/putme">PUTME/ DE Exam Reg. Report</nuxt-link></li>
                                <li v-permission="'View Download O Level'"><nuxt-link to="/reports/students/putme/ssce-result">Download O-Level</nuxt-link></li>
                                <li v-permission="'View Admission Report'"><nuxt-link to="/reports/students/admissions-report">Admissions Report</nuxt-link></li>
                                <li v-permission="'View DE Admission'"><nuxt-link to="/reports/students/de-admitted-students">DE Admissions Report</nuxt-link></li>
                                <li v-permission="'View CEC Admission'"><nuxt-link to="/reports/students/cec-admission-report">CEC Admissions Report</nuxt-link></li>
                                <li v-permission="'View PG Admission'"><nuxt-link to="/reports/students/pg-admission-report">PG Admissions Report</nuxt-link></li>
                                <li v-permission="'View CERCORD Admission'"><nuxt-link to="/reports/students/cercord-admission-report">CERCORD Admissions Report</nuxt-link></li>
                                <li v-permission="'View MBS Admission'"><nuxt-link to="/reports/students/mbs-admission-report">MBS Admissions Report</nuxt-link></li>
                                <li v-permission="'View Acceptance Letter'"><nuxt-link to="/reports/students/acceptance-report">Acceptance Letter Report</nuxt-link></li>
                                <li v-permission="'View Payment Transaction'"><nuxt-link to="/reports/students/payment-transaction-report">Payment Transaction Report</nuxt-link></li>
                                <li v-permission="'View Jamb Candidate'"><nuxt-link to="/reports/students/uploaded-jamb-candidates">Jamb candidate</nuxt-link></li>
                                <li v-permission="'View De Jamb Candidate'"><nuxt-link to="/reports/students/uploaded-de-candidates">DE Jamb candidate</nuxt-link></li>
                                <li v-permission="'View Course Download'"><nuxt-link to="/reports/students/course-download-report">Course Download Report</nuxt-link></li>
                              <li v-permission="'View Course Download'"><nuxt-link to="/reports/students/reparation-fee-report">Reparation Fee Report</nuxt-link></li>
                            </ul>
                        </li>
                        <li class="">
                            <a href="javascript:;"><span class="title">JAMB</span><span class=" arrow"></span></a>
                            <ul class="">
                                <li v-permission="'View Jamb Result UME'"><nuxt-link to="/jamb/jamb-results">JAMB Result UTME</nuxt-link></li>
                                <li v-permission="'View Jamb Result DE'"><nuxt-link to="/jamb/jamb-de">JAMB Direct Entry</nuxt-link></li>
                            </ul>
                        </li>
                        <li>
                          <a href="javascript:;"><span class="title">Exams</span><span class=" arrow"></span></a>
                          <ul class="">
                              <li v-permission="'View PUTME Result'"><nuxt-link to="/exams/putme-result-upload">UTME Result</nuxt-link></li>
                              <li v-permission="'View DE Result'"><nuxt-link to="/exams/de-result-upload">DE Result</nuxt-link></li>
                              <li v-permission="'View Utme Admission'"><nuxt-link to="/exams/putme-admission-list">UTME Admission List</nuxt-link></li>
                              <li v-permission="'View De Admission'"><nuxt-link to="/exams/de-admission-list">DE Admission List</nuxt-link></li>
                              <li v-permission="'View Cec Admission'"><nuxt-link to="/exams/cec-admission-list">CEC Admission List</nuxt-link></li>
                              <li v-permission="'View Pg Admission'"><nuxt-link to="/exams/pg-admission-list">PG Admission List</nuxt-link></li>
                              <li v-permission="'View CERCORD Admission'"><nuxt-link to="/exams/cercord-admission-list">CERCORD Admission List</nuxt-link></li>
                              <li v-permission="'View MBS Admission'"><nuxt-link to="/exams/mbs-admission-list">MBS Admission List</nuxt-link></li>
                          </ul>
                        </li>
                      <li>
                        <a href="javascript:;">
                          <span class="title">Utilities</span><span class=" arrow"></span>
                        </a>
                        <ul class="">
                          <li class="" v-permission="'View Search RRR'"><nuxt-link to="/utilities/search-rrr">Search RRR</nuxt-link></li>
                          <li class="" v-permission="'View Import Returning Students'"><nuxt-link to="/utilities/import-returning">Import returning students</nuxt-link></li>
                          <li class="" v-permission="'View ByPass Utility'"><nuxt-link to="/utilities/by-pass">Bypass Utilities</nuxt-link></li>
                          <li class="" v-permission="'View Students Utility'"><nuxt-link to="/utilities/student-login-details">Student Utilities</nuxt-link></li>
                          <li class="" v-permission="'View Add Drop Utility'"><nuxt-link to="/utilities/add-drop-utility">Add/ Drop Utilities</nuxt-link></li>
                          <li class="" v-permission="'View Import Nelfund Loan'"><nuxt-link to="/utilities/import-nelfund-loan">Import NELFUND Loan</nuxt-link></li>
                          <li class="" v-permission="'View Import Registered Putme'"><nuxt-link to="/utilities/import-putme">Import Registered PUTME Students</nuxt-link></li>
                          <li class="" v-permission="'View Import Putme Result'"><nuxt-link to="/utilities/import-putme-results">Import PUTME Results</nuxt-link></li>
                          <li class="" v-permission="'View Import De Result'"><nuxt-link to="/utilities/import-de-results">Import DE Results</nuxt-link></li>
                          <li class="" v-permission="'View Import Admission List'"><nuxt-link to="/utilities/import-admission-list">Import Admissions List</nuxt-link></li>
                          <li class="" v-permission="'View Import De Admission List'"><nuxt-link to="/utilities/import-de-admission-list">Import DE Admissions List</nuxt-link></li>
                          <li class="" v-permission="'View Import Putme Images'"><nuxt-link to="/utilities/import-putme-images">Import PUTME Images</nuxt-link></li>
                          <li class="" v-permission="'View Import Transfer Students'"><nuxt-link to="/utilities/import-transfer-student">Import Transfer Student</nuxt-link></li>
                          <li class="" v-permission="'View Import Previous Transactions'"><nuxt-link to="/utilities/import-old-transactions">Import Previous Transactions</nuxt-link></li>
                          <li class="" v-permission="'View Import Old Level'"><nuxt-link to="/utilities/import-old-olevel">Import O'Level</nuxt-link></li>
                          <li class="" v-permission="'View Change Student Levels'"><nuxt-link to="/utilities/change-student-levels">Change Student Levels</nuxt-link></li>
                          <li class="" v-permission="'View Student Email Requests'"><nuxt-link to="/utilities/student-email-request">Student Email Request</nuxt-link></li>
                          <li class="" v-permission="'View Student ID Card Requests'"><nuxt-link to="/utilities/student-id-card-request">Student ID Card Request</nuxt-link></li>
                          <li class="" v-permission="'View Search RRR'"><nuxt-link to="/utilities/student-waiver">Student waiver</nuxt-link></li>
                          <li class="" v-permission="'View Search RRR'"><nuxt-link to="/utilities/validate-student-rrr">Validate Student RRR</nuxt-link></li>
                          <li class="" v-permission="'View Search RRR'"><nuxt-link to="/utilities/manage-sug-fee">Manage SUG Fee</nuxt-link></li>
                          <li class=""><nuxt-link to="/cms/news">News</nuxt-link></li>
                        </ul>
                      </li>
                      <li>
                        <a href="javascript:;">
                          <span class="title">Applications</span>
                          <span class=" arrow"></span>
                        </a>
                        <ul class="">
                          <li class="" v-permission="'View Cec Applications'"><nuxt-link to="/application/cec">CEC Applications</nuxt-link></li>
                          <li class="" v-permission="'View Cercord Applications'"><nuxt-link to="/application/cercord">Cercord Applications</nuxt-link></li>
                          <li class="" v-permission="'View Pg Applications'"><nuxt-link to="/application/pg">PG Applications</nuxt-link></li>
                          <li class="" v-permission="'View Pg Applications'"><nuxt-link to="/application/mbs">MBS Applications</nuxt-link></li>
                        </ul>
                      </li>
                      <li><a href="#"><span class="title">Transaction Logs</span></a></li>
                      <li><a href="#"><span class="title">Scripts</span></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    mounted(){

    },
    methods: {
        setPermissions(){
            this.$laravel.setPermissions(this.$auth.user.user_permissions);
        },
        setRoles(){
            this.$laravel.setRoles(this.$auth.user.user_roles);
        },
        logout() {
          this.$toast.success('Logging out...', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
          this.setPermissions([])
          this.setRoles([])
          this.$auth.logout()
        },
    }
}
</script>
<style scoped>
.bg-primary {
    background-color: #1D9D21 !important;
}
/* .header {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
} */
</style>
