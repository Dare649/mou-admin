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
                        <li class="breadcrumb-item active">Religion</li>
                    </ol>
                </div>
            </div>
            <!-- END BREADCRUMBS -->
            <!-- START CONTAINER FLUID -->
            <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
                <div class="card card-default">
                    <div class="card-header  separator">
                        <h3 class="text-primary no-margin pull-left sm-pull-reset">Religion Management</h3>
                        <div class="pull-right sm-pull-reset">
                            <button type="button" class="btn btn-primary btn-sm" data-target="#add_religion" data-toggle="modal"><i class="fa fa-plus"></i> &nbsp; <strong>Add New Religion</strong></button>
                            <button type="button" class="btn btn-warning btn-sm" data-target="#upload_religion" data-toggle="modal"><i class="fa fa-arrow-up"></i> &nbsp; <strong>Upload Religions</strong></button>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-condensed" id="basicTable">
                                <thead>
                                <th style="width:60%">Religion Name</th>
                                <th style="width:20%">Action</th>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Christianity</td>
                                    <td>
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-default btn-sm"><i class="fa fa-pencil"></i></button>
                                            <button type="button" class="btn btn-default btn-sm"><i class="pg-trash"></i></button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Islam</td>
                                    <td>
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-default btn-sm"><i class="fa fa-pencil"></i></button>
                                            <button type="button" class="btn btn-default btn-sm"><i class="pg-trash"></i></button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Tradidital</td>
                                    <td>
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-default btn-sm"><i class="fa fa-pencil"></i></button>
                                            <button type="button" class="btn btn-default btn-sm"><i class="pg-trash"></i></button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Others</td>
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
        <religion-form />
        <upload-religion />
    </div>
</template>
<script>
import ReligionForm from '../../components/Modals/ReligionFormModal';
import UploadReligion from '../../components/Modals/UploadReligionModal';
export default {
    name: "religion",
    layout: "main",
    middleware: "",
    components: {
        ReligionForm,
        UploadReligion
    },
    mounted: function() {
        
    }
}
</script>