<template>
    <!-- START PAGE CONTENT -->
    <div class="content sm-gutter">
        <!-- START BREADCRUMBS -->
        <div class="bg-white">
            <div class="container p-l-5">
                <ol class="breadcrumb breadcrumb-alt">
                    <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
                    <li class="breadcrumb-item"><a href="#">Academic Session</a></li>
                    <li class="breadcrumb-item"><nuxt-link to="/academic-session/direct-entry">Direct Entry</nuxt-link></li>
                    <li class="breadcrumb-item"><a href="#">Options</a></li>
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
                        <nuxt-link to="/academic-session/direct-entry/form/new" class="btn btn-primary btn-sm"><i class="fa fa-plus"></i> &nbsp; <strong>Add New UME Exams</strong></nuxt-link>
                        <nuxt-link :to="`/academic-session/direct-entry/form/${id}`" class="btn btn-warning btn-sm"><i class="fa fa-pencil"></i> &nbsp; <strong>Edit Exam</strong></nuxt-link>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div class="card-body">
                    <div class="row p-t-20">
                        <div class="col-lg-3">
                          <nuxt-link :to="`/academic-session/direct-entry/${id}/manage/add-student-result`" class="btn btn-default btn-cons m-b-10 btn-block p-t-10 p-b-10">
                              <i class="fa fa-file-text fa-3x m-b-0"></i>
                              <h6 class="text-uppercase semi-bold m-b-0">Step 1</h6>
                              Add Student Result
                          </nuxt-link>
                        </div>
                        <div class="col-lg-3">
                            <nuxt-link :to="`/academic-session/direct-entry/${id}/manage/view-registered-students`" class="btn btn-default btn-cons m-b-10 btn-block p-t-10 p-b-10">
                                <i class="fa fa-id-card fa-3x m-b-0"></i>
                                <h6 class="text-uppercase semi-bold m-b-0">Step 2</h6>
                                View registered students
                            </nuxt-link>
                        </div>
                        <div class="col-lg-3">
                            <nuxt-link :to="`/academic-session/direct-entry/${id}/manage/late-fee-slip`" class="btn btn-default btn-cons m-b-10 btn-block p-t-10 p-b-10">
                                <i class="fa fa-ticket fa-3x m-b-0"></i>
                                <h6 class="text-uppercase semi-bold m-b-0">Step 3</h6>
                                Late fee slip
                            </nuxt-link>
                        </div>
                        <div class="col-lg-3">
                            <nuxt-link :to="`/academic-session/direct-entry/${id}/manage/student-union-dues`" class="btn btn-default btn-cons m-b-10 btn-block p-t-10 p-b-10">
                                <i class="fa fa-university fa-3x m-b-0"></i>
                                <h6 class="text-uppercase semi-bold m-b-0">Step 4</h6>
                                Student union dues
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
    layout: 'main',
    data(){
        return{
            id: null
        }
    },
    mounted() {
        this.id = this.$route.params.deId
    },
}
</script>
<style scoped>
.breadcrumb {
    background-color: #ffffff !important;;
}
</style>
