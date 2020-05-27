<template>
    <!-- START PAGE CONTENT -->
    <div class="content sm-gutter">
        <!-- START BREADCRUMBS -->
        <div class="bg-white">
            <div class="container p-l-5">
                <ol class="breadcrumb breadcrumb-alt">
                    <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                    <li class="breadcrumb-item"><a href="#">Get Started</a></li>
                    <li class="breadcrumb-item"><a href="get_academic_session.php">Academic Session</a></li>
                    <li class="breadcrumb-item"><a href="get_academic_session_options.php">Post UME Options</a></li>
                    <li class="breadcrumb-item active">Total Seats to Program Management</li>
                </ol>
            </div>
        </div>
        <!-- END BREADCRUMBS -->

        <!-- START CONTAINER FLUID -->
        <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
            <div class="card card-default">
                <div class="card-header  separator">
                    <h3 class="text-primary no-margin pull-left sm-pull-reset">Post UME Options</h3>
                    <div class="pull-right sm-pull-reset">
                        <nuxt-link to="/academic-session/putme/add-new" class="btn btn-primary btn-sm"><i class="fa fa-plus"></i> &nbsp; <strong>Add New UME Exams</strong></nuxt-link>
                        <a href="get_view_ume.php" class="btn btn-warning btn-sm"><i class="fa fa-pencil"></i> &nbsp; <strong>Edit Exam</strong></a>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div class="card-body">
                    <div class="row p-t-20">
                      <div class="col-lg-3">
                          <nuxt-link to="/academic-session/putme/manage/add-student-result" class="btn btn-default btn-cons m-b-10 btn-block p-t-10 p-b-10">
                              <i class="fa fa-file-text fa-3x m-b-0"></i>
                              <h6 class="text-uppercase semi-bold m-b-0">Step 1</h6>
                              Add Student Result
                          </nuxt-link>
                      </div>
                      <div class="col-lg-3">
                          <nuxt-link to="/academic-session/putme/manage/add-seat" class="btn btn-default btn-cons m-b-10 btn-block p-t-10 p-b-10">
                              <i class="fa fa-id-badge fa-3x m-b-0"></i>
                              <h6 class="text-uppercase semi-bold m-b-0">Step 2</h6>
                              View registered students
                          </nuxt-link>
                      </div>
                      <div class="col-lg-3">
                          <nuxt-link to="/academic-session/putme/manage/late-fee-slip" class="btn btn-default btn-cons m-b-10 btn-block p-t-10 p-b-10">
                              <i class="fa fa-ticket fa-3x m-b-0"></i>
                              <h6 class="text-uppercase semi-bold m-b-0">Step 3</h6>
                              Late fee slip
                          </nuxt-link>
                      </div>
                      <div class="col-lg-3">
                          <a href="#" class="btn btn-default btn-cons m-b-10 btn-block p-t-10 p-b-10">
                              <i class="fa fa-refresh fa-3x m-b-0"></i>
                              <h6 class="text-uppercase semi-bold m-b-0">Step 4</h6>
                              Late Fees Slip (returning)
                          </a>
                      </div>
                      <div class="col-lg-3">
                          <a href="#" class="btn btn-default btn-cons m-b-10 btn-block p-t-10 p-b-10">
                              <i class="fa fa-mail-forward fa-3x m-b-0"></i>
                              <h6 class="text-uppercase semi-bold m-b-0">Step 10</h6>
                              Student union dues
                          </a>
                      </div>
                      <div class="col-lg-3">
                        <nuxt-link to="/acadamic-session/putme/manage/student-union-dues" class="btn btn-default btn-cons m-b-10 btn-block p-t-10 p-b-10">
                            <i class="fa fa-university fa-3x m-b-0"></i>
                            <h6 class="text-uppercase semi-bold m-b-0">Step 4</h6>
                            Student union dues (returning)
                        </nuxt-link>
                      </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- END CONTAINER FLUID -->
    </div>
</template>
<script>
export default {
    layout: 'main'
}
</script>
<style scoped>
.breadcrumb {
    background-color: #ffffff !important;;
}
</style>
