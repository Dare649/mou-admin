<template>
    <!-- START PAGE CONTENT -->
        <div class="content sm-gutter">
            <!-- START BREADCRUMBS -->
            <div class="bg-white">
                <div class="container p-l-5">
                    <ol class="breadcrumb breadcrumb-alt">
                        <li class="breadcrumb-item"><a href="index.php">Dashboard</a></li>
                        <li class="breadcrumb-item"><nuxt-link to="/academic-session/putme">Academic Session</nuxt-link></li>
                        <li class="breadcrumb-item"><nuxt-link :to="`/academic-session/putme/${id}`">PUTME Options</nuxt-link></li>
                        <li class="breadcrumb-item active">Add Student Result</li>
                    </ol>
                </div>
            </div>
            <!-- END BREADCRUMBS -->

            <!-- START JUMBOTRON -->
            <div class="jumbotron" data-pages="parallax" data-scroll-element=".page-container">
                <div class=" container p-l-0 p-r-0   container-fixed-lg sm-p-l-0 sm-p-r-0">
                    <div class="inner">
                        <!-- START BREADCRUMB -->
                        <div class="row">
                            <div class="col-md-10 offset-md-1">
                                <!-- START card -->
                                <div class="card card-transparent text-center">
                                    <div class="card-header ">
                                        <div class="card-title">Process</div>
                                    </div>
                                    <div class="card-body">
                                        <h5 class="semi-bold">1. Admin will first Get CSV from "GET CSV" button in "Download Prefilled CSV File" section.</h5>
                                        <h5 class="semi-bold">2. Import the Jamb Results from "IMPORT" button in "Upload Prefilled CSV File" section.</h5>
                                        <h5 class="semi-bold">3. Admin can check Report to view scores uploaded from "CHECK REPORT" button in <br>"Download Prefilled CSV File" section.</h5>
                                    </div>
                                </div>
                                <!-- END card -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END JUMBOTRON -->

            <!-- START CONTAINER FLUID -->
            <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
                <div class="card card-default">
                    <div class="card-header">
                        <h3 class="text-primary no-margin pull-left sm-pull-reset">Post UTME Result Upload</h3>
                        <div class="pull-right sm-pull-reset">
                            <a href="/api/putme-sessions/post-utme-result/download-sample" class="btn btn-primary btn-sm"><i class="fa fa-plus"></i> &nbsp; <strong></strong></a>
                            <button type="button" class="btn btn-primary btn-sm" data-target="#download_csv" data-toggle="modal"><i class="fa fa-plus"></i> &nbsp; <strong>Download CSV</strong></button>
                            <button type="button" class="btn btn-warning btn-sm" data-target="#upload_csv" data-toggle="modal"><i class="fa fa-arrow-up"></i> &nbsp; <strong>Upload CSV</strong></button>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-condensed" id="basicTable">
                                <thead>
                                <th style="width:50%">Slip Number</th>
                                <th style="width:30%">Used</th>
                                <th style="width:20%">Action</th>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>123345676878909</td>
                                    <td>Yes</td>
                                    <td>
                                        <div class="btn-group">
                                            <span data-placement="top" data-toggle="tooltip" title="Edit Record">
                                                <a href="#edit_jamb_result" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-pencil"></i></a>
                                            </span>
                                            <button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-placement="top" title="Delete Record"><i class="pg-trash"></i></button>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <pagination
                                v-bind:pagination="pagination"
                                v-on:click.native="getResults(pagination.current_page)"
                                :offset="4">
                            </pagination>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END CONTAINER FLUID -->
            <download-student-result-modal />
            <import-student-result-modal />
        </div>
        <!-- END PAGE CONTENT -->
</template>
<script>
import ImportStudentResultModal from '~/components/Modals/ImportStudentResultModal'
import DownloadStudentResultModal from '~/components/Modals/DownloadStudentResultModal'
export default {
    layout: 'main',
    components: {
        ImportStudentResultModal,
        DownloadStudentResultModal,
    },
    data(){
        return {
            id: null,
            loading: true,
            pagination: {
                total: 0,
                per_page: 2,
                from: 1,
                to: 0,
                current_page: 1
            },
        }
    },
    methods: {
        getResults(page) {
            this.$axios.get('api/putme-sessions').then(res => {
                this.sessions = res.data.data;
                this.pagination = res.data;
                this.loading = false;
            })
        },
    },
    mounted() {
        this.id = this.$route.params.id;
    },
}
</script>
