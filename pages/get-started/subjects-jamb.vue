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
                        <li class="breadcrumb-item active">Subjects (JAMB)</li>
                    </ol>
                </div>
            </div>
            <!-- END BREADCRUMBS -->
            <!-- START CONTAINER FLUID -->
            <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
                <div class="card card-default">
                    <div class="card-header  separator">
                        <h3 class="text-primary no-margin pull-left sm-pull-reset">Subject Management</h3>
                        <div class="pull-right sm-pull-reset">
                            <button type="button" class="btn btn-primary btn-sm" data-target="#add_subject" data-toggle="modal"><i class="fa fa-plus"></i> &nbsp; <strong>Add New Subject</strong></button>
                            <button type="button" class="btn btn-warning btn-sm" data-target="#upload_subject" data-toggle="modal"><i class="fa fa-arrow-up"></i> &nbsp; <strong>Upload Subject</strong></button>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-condensed" id="basicTable">
                                <thead>
                                <th style="width:20%">Subject Abbreviation</th>
                                <th style="width:60%">Subject Name</th>
                                <th style="width:20%">Action</th>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>AGR</td>
                                    <td>AGR</td>
                                    <td>
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-default btn-sm"><i class="fa fa-pencil"></i></button>
                                            <button type="button" class="btn btn-default btn-sm"><i class="pg-trash"></i></button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>ARA</td>
                                    <td>ARA</td>
                                    <td>
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-default btn-sm"><i class="fa fa-pencil"></i></button>
                                            <button type="button" class="btn btn-default btn-sm"><i class="pg-trash"></i></button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>BIO</td>
                                    <td>BIO</td>
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
        <!-- END PAGE CONTENT -->
        <subject-form />
        <upload-subjects />
    </div>
</template>
<script>
import SubjectForm from '../../components/Modals/SubjectFormModal';
import UploadSubjects from '../../components/Modals/UploadSubjectsModal';
export default {
    name: "religion",
    layout: "main",
    middleware: "",
    components: {
        SubjectForm,
        UploadSubjects
    },
    mounted: function() {
        
    }
}
</script>