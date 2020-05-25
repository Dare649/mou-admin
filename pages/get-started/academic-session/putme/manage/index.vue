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
                        <a href="get_add_new_ume.php" class="btn btn-primary btn-sm"><i class="fa fa-plus"></i> &nbsp; <strong>Add New UME Exams</strong></a>
                        <a href="get_view_ume.php" class="btn btn-warning btn-sm"><i class="fa fa-pencil"></i> &nbsp; <strong>Edit Exam</strong></a>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div class="card-body">
                    <div class="row p-t-20">
                        <div class="col-lg-3">
                            <nuxt-link to="/get-started/academic-session/putme/manage/add-seat" class="btn btn-default btn-cons m-b-10 btn-block p-t-10 p-b-10">
                                <i class="fa fa-id-badge fa-3x m-b-0"></i>
                                <h6 class="text-uppercase semi-bold m-b-0">Step 1</h6>
                                Add seats to program
                            </nuxt-link>
                        </div>
                        <div class="col-lg-3">
                            <nuxt-link to="/get-started/acadamic-session/putme/manage/bank-deposit-slip" class="btn btn-default btn-cons m-b-10 btn-block p-t-10 p-b-10">
                                <i class="fa fa-id-card fa-3x m-b-0"></i>
                                <h6 class="text-uppercase semi-bold m-b-0">Step 2</h6>
                                Slip for UTME Registration
                            </nuxt-link>
                        </div>
                        <div class="col-lg-3">
                            <nuxt-link to="/get-started/acadamic-session/putme/manage/add-student-result" class="btn btn-default btn-cons m-b-10 btn-block p-t-10 p-b-10">
                                <i class="fa fa-file-text fa-3x m-b-0"></i>
                                <h6 class="text-uppercase semi-bold m-b-0">Step 3</h6>
                                Add Student Result
                            </nuxt-link>
                        </div>
                        <div class="col-lg-3">
                            <nuxt-link to="/get-started/acadamic-session/putme/manage/acceptance-fee" class="btn btn-default btn-cons m-b-10 btn-block p-t-10 p-b-10">
                                <i class="fa fa-ticket fa-3x m-b-0"></i>
                                <h6 class="text-uppercase semi-bold m-b-0">Step 4</h6>
                                Slip for Acceptance Fees
                            </nuxt-link>
                        </div>
                        <div class="col-lg-3">
                            <a href="slip_school_fees.php" class="btn btn-default btn-cons m-b-10 btn-block p-t-10 p-b-10">
                                <i class="fa fa-university fa-3x m-b-0"></i>
                                <h6 class="text-uppercase semi-bold m-b-0">Step 5</h6>
                                Slip for School Fees
                            </a>
                        </div>
                        <div class="col-lg-3">
                            <a href="#" class="btn btn-default btn-cons m-b-10 btn-block p-t-10 p-b-10">
                                <i class="fa fa-refresh fa-3x m-b-0"></i>
                                <h6 class="text-uppercase semi-bold m-b-0">Step 6</h6>
                                Slip for School Fees (Returning)
                            </a>
                        </div>

                        <div class="col-lg-3">
                            <a href="#" class="btn btn-default btn-cons m-b-10 btn-block p-t-10 p-b-10">
                                <i class="fa fa-files-o fa-3x m-b-0"></i>
                                <h6 class="text-uppercase semi-bold m-b-0">Step 7</h6>
                                Manage other Document Types
                            </a>
                        </div>
                        <div class="col-lg-3">
                            <a href="#" class="btn btn-default btn-cons m-b-10 btn-block p-t-10 p-b-10">
                                <i class="fa fa-thumbs-up fa-3x m-b-0"></i>
                                <h6 class="text-uppercase semi-bold m-b-0">Step 8</h6>
                                Approve Uploaded Documents
                            </a>
                        </div>
                        <div class="col-lg-3">
                            <a href="verify_document.php" class="btn btn-default btn-cons m-b-10 btn-block p-t-10 p-b-10">
                                <i class="fa fa-check fa-3x m-b-0"></i>
                                <h6 class="text-uppercase semi-bold m-b-0">Step 9</h6>
                                Verify other Documents
                            </a>
                        </div>
                        <div class="col-lg-3">
                            <a href="#" class="btn btn-default btn-cons m-b-10 btn-block p-t-10 p-b-10">
                                <i class="fa fa-mail-forward fa-3x m-b-0"></i>
                                <h6 class="text-uppercase semi-bold m-b-0">Step 10</h6>
                                Pre-School Fees Slips (Returning)
                            </a>
                        </div>
                        <div class="col-lg-3">
                            <a href="matric_pool.php" class="btn btn-default btn-cons m-b-10 btn-block p-t-10 p-b-10">
                                <i class="fa fa-graduation-cap fa-3x m-b-0"></i>
                                <h6 class="text-uppercase semi-bold m-b-0">Step 11</h6>
                                Matriculation Pool
                            </a>
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
