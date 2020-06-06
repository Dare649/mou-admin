<template>
    <div>
        <div class="content sm-gutter">
            <!-- START BREADCRUMBS -->
            <div class="bg-white">
                <div class="container p-l-5">
                    <ol class="breadcrumb breadcrumb-alt">
                        <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
                        <li class="breadcrumb-item"><a href="#">Academic Session</a></li>
                        <li class="breadcrumb-item active">PUTME</li>
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
                                        <div class="card-title">Getting started</div>
                                    </div>
                                    <div class="card-body">
                                        <h5 class="semi-bold">
                                            You can manage University Examinations in this section. There are many different subsections under
                                            examination which you have to specify according to examination preference.
                                        </h5>
                                        <h6 class="semi-bold"><span class="text-primary">NOTE:</span> You are requested to mark one examination as current exam.</h6>
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
                        <h3 class="text-primary no-margin pull-left sm-pull-reset">Post UME Exams</h3>
                        <div class="pull-right sm-pull-reset">
                            <nuxt-link to="/academic-session/putme/form/new" class="btn btn-primary btn-sm"><i class="fa fa-plus"></i> &nbsp; <strong>Add New UME Exams</strong></nuxt-link>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive" v-if="!loading">
                            <table class="table table-striped table-condensed" id="basicTable">
                                <thead>
                                <th style="width:30%">Exam Name</th>
                                <th style="width:25%">Registration Fee</th>
                                <th style="width:15%">Added By</th>
                                <th style="width:20%">Added On</th>
                                <th style="width:20%">Status</th>
                                <th style="width:10%">Action</th>
                                </thead>
                                <tbody>
                                    <template v-if="sessions.length && !loading">

                                        <tr v-for="(session, index) in sessions" :key="index">
                                            <td>{{ session.session_name }}</td>
                                            <td>{{ numberFormat(session.putme_registration_fee) }}</td>
                                            <td>Admin</td>
                                            <td>{{ parseDate(session.createdAt, 'DD/MM/YYYY HH:mm:ss') }}</td>
                                            <td>
                                                <span v-if="session.status === 0">
                                                    <strong>Not Current</strong> - <a href="javascript:;" @click="updateStatus(session, index, 1)"><small>MAKE</small></a>
                                                </span>
                                                <span v-if="session.status === 1">
                                                    <strong>Current</strong> - <a href="javascript:;" @click="updateStatus(session, index, 0)"><small>REMOVE</small></a>
                                                </span>
                                            </td>
                                            <td>
                                                <div class="btn-group">
                                                    <nuxt-link :to="`/academic-session/putme/form/${session.id}`" class="btn btn-default btn-sm" data-toggle="tooltip" data-placement="top" title="Edit Record"><i class="fa fa-pencil"></i></nuxt-link>
                                                    <nuxt-link :to="`/academic-session/putme/${session.id}`" class="btn btn-default btn-sm" data-toggle="tooltip" data-placement="top" title="View Record"><i class="fa fa-eye"></i></nuxt-link>
                                                </div>
                                            </td>
                                        </tr>
                                    </template>
                                    <template v-if="!sessions.length && !loading">
                                        <tr class="text-center">
                                            <td colspan="6">No result found</td>
                                        </tr>
                                    </template>
                                </tbody>
                            </table>
                            <pagination
                                v-bind:pagination="pagination"
                                v-on:click.native="getAcademicSessions(pagination.current_page)"
                                :offset="4">
                            </pagination>
                        </div>
                        <vcl-table :columns="6" v-if="loading" />
                    </div>
                </div>
            </div>
            <!-- END CONTAINER FLUID -->
        </div>

        <div class="clearboth"></div>
    </div>
</template>
<script>

export default {
    layout: 'main',
    data() {
        return {
            sessions: [],
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
        getAcademicSessions(page) {
            this.$axios.get('api/putme-sessions').then(res => {
                this.sessions = res.data.data;
                this.pagination = res.data;
                this.loading = false;
            })
        },
        updateStatus(session, index, action) {
            this.$axios.get(`api/putme-sessions/status/${session.id}?status=${action}`).then(res => {
                if(res.data.status) {
                    if(action === 1) {
                        this.sessions[index].status = 0;
                    } else {
                        this.sessions[index].status = 1;
                    }
                }
            })
        }
    },
    mounted() {
        this.getAcademicSessions(1)
    },
}
</script>
<style scoped>
    .breadcrumb {
        background-color: #ffffff !important;
    }
    .card-body svg {
        padding-top: 20px;
        width: 100%;
    }
</style>
