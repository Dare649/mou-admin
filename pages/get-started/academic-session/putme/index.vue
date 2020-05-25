<template>
    <div>
        <!-- START PAGE CONTENT -->
        <div class="content sm-gutter">
            <!-- START BREADCRUMBS -->
            <div class="bg-white">
                <div class="container p-l-5">
                    <ol class="breadcrumb breadcrumb-alt">
                        <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                        <li class="breadcrumb-item"><a href="#">Get Started</a></li>
                        <li class="breadcrumb-item active">Academic Session</li>
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
                    <div class="card-header  separator">
                        <h3 class="text-primary no-margin pull-left sm-pull-reset">Post UME Exams</h3>
                        <div class="pull-right sm-pull-reset">
                            <nuxt-link to="/get-started/academic-session/putme/add-new" class="btn btn-primary btn-sm"><i class="fa fa-plus"></i> &nbsp; <strong>Add New UME Exams</strong></nuxt-link>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-condensed" id="basicTable">
                                <thead>
                                <th style="width:30%">Exam Name</th>
                                <th style="width:10%">Exam Fees</th>
                                <th style="width:10%">Added By</th>
                                <th style="width:20%">Added On</th>
                                <th style="width:20%">Status</th>
                                <th style="width:10%">Action</th>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>POST UTME 2019-20 SESSION</td>
                                    <td>2000.00</td>
                                    <td>Admin</td>
                                    <td>2019-06-25 09:24:07</td>
                                    <td><strong>Current</strong> - <a href="#"><small>REMOVE</small></a></td>
                                    <td>
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-placement="top" title="Edit Record"><i class="fa fa-pencil"></i></button>
                                            <nuxt-link to="/get-started/academic-session/putme/manage" class="btn btn-default btn-sm" data-toggle="tooltip" data-placement="top" title="View Record"><i class="fa fa-eye"></i></nuxt-link>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>POST UTME 2019-20 SESSION</td>
                                    <td>2000.00</td>
                                    <td>Admin</td>
                                    <td>2019-06-25 09:24:07</td>
                                    <td><strong>Not Current</strong> - <a href="#"><small>MAKE</small></a></td>
                                    <td>
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-placement="top" title="Edit Record"><i class="fa fa-pencil"></i></button>
                                            <a href="" class="btn btn-default btn-sm" data-toggle="tooltip" data-placement="top" title="View Record"><i class="fa fa-eye"></i></a>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>POST UTME 2019-20 SESSION</td>
                                    <td>2000.00</td>
                                    <td>Admin</td>
                                    <td>2019-06-25 09:24:07</td>
                                    <td><strong>Not Current</strong> - <a href="#"><small>REMOVE</small></a></td>
                                    <td>
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-placement="top" title="Edit Record"><i class="fa fa-pencil"></i></button>
                                            <a href="" class="btn btn-default btn-sm" data-toggle="tooltip" data-placement="top" title="View Record"><i class="fa fa-eye"></i></a>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <ul class="pagination m-t-20">
                                <li class="page-item disabled">
                                    <a class="page-link" href="#" tabindex="-1">Previous</a>
                                </li>
                                <li class="page-item"><a class="page-link" href="#">1</a></li>
                                <li class="page-item active">
                                    <a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
                                </li>
                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                <li class="page-item">
                                    <a class="page-link" href="#">Next</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END CONTAINER FLUID -->
        </div>
    </div>
</template>
<script>
export default {
    layout: 'main'
}
</script>
