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
                        <li class="breadcrumb-item active">Departments</li>
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
                            <div class="col-md-8 offset-md-2">
                                <!-- START card -->
                                <div class="card card-transparent text-center">
                                    <div class="card-header ">
                                        <div class="card-title">Getting started</div>
                                    </div>
                                    <div class="card-body">
                                        <h5 class="semi-bold">
                                            You can manage the school Departments existing in the university.
                                        </h5>
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
                        <h3 class="text-primary no-margin pull-left sm-pull-reset">Department Management</h3>
                        <div class="pull-right sm-pull-reset">
                            <button type="button" class="btn btn-primary btn-sm" data-target="#add_department" data-toggle="modal"><i class="fa fa-plus"></i> &nbsp; <strong>Add New Department</strong></button>
                            <button type="button" class="btn btn-warning btn-sm" data-target="#upload_department" data-toggle="modal"><i class="fa fa-arrow-up"></i> &nbsp; <strong>Upload Departments</strong></button>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-condensed" id="basicTable">
                                <thead>
                                    <th style="width:20%">Faculty</th>
                                    <th style="width:60%">Department</th>
                                    <th style="width:20%">Action</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>EDUCATION</td>
                                        <td>College of Agricultural and Science Education (CASE)</td>
                                        <td>
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-default btn-sm"><i class="fa fa-pencil"></i></button>
                                                <button type="button" class="btn btn-default btn-sm"><i class="pg-trash"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AGRIC</td>
                                        <td>College of Animal Science and Animal Production (CASAP)</td>
                                        <td>
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-default btn-sm"><i class="fa fa-pencil"></i></button>
                                                <button type="button" class="btn btn-default btn-sm"><i class="pg-trash"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AGRIC</td>
                                        <td>College of Crop and Soil Sciences (CCSS)</td>
                                        <td>
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-default btn-sm"><i class="fa fa-pencil"></i></button>
                                                <button type="button" class="btn btn-default btn-sm"><i class="pg-trash"></i></button>
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
        <faculty-form></faculty-form>
        <upload-faculty></upload-faculty>
    </div>
</template>
<script>
import FacultyForm from '../../components/Modals/FacultyForm';
import UploadFaculty from '../../components/Modals/UploadFaculty';
export default {
    name: "States",
    layout: "main",
    middleware: "",
    components: {
        FacultyForm,
        UploadFaculty
    },
    mounted: function() {
        
    }
}
</script>