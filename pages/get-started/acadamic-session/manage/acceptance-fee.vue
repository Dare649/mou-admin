<template>
     <!-- START PAGE CONTENT -->
        <div class="content sm-gutter">
            <!-- START BREADCRUMBS -->
            <div class="bg-white">
                <div class="container p-l-5">
                    <ol class="breadcrumb breadcrumb-alt">
                        <li class="breadcrumb-item"><a href="index.php">Dashboard</a></li>
                        <li class="breadcrumb-item"><a href="#">Get Started</a></li>
                        <li class="breadcrumb-item"><a href="get_academic_session.php">Academic Session</a></li>
                        <li class="breadcrumb-item"><a href="get_academic_session_options.php">Academic Session Options</a></li>
                        <li class="breadcrumb-item active">Slip for Acceptance Fees</li>
                    </ol>
                </div>
            </div>
            <!-- END BREADCRUMBS -->


            <!-- START CONTAINER FLUID -->
            <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
                <div class="card card-default">
                    <div class="card-header  ">
                        <div class="card-title text-primary">Search Slip Number</div>
                    </div>
                    <div class="card-body">
                        <form class="row" style="width: 100%">
                            <div class="col-md-10">
                                <input type="text" class="form-control" placeholder="Slip Number" required>
                            </div>
                            <div class="col-md-2">
                                <button type="submit" class="btn btn-primary btn-block">Search Record</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="card card-default">
                    <div class="card-header  separator">
                        <h3 class="text-primary no-margin pull-left sm-pull-reset">Bank Deposit Slip (For Acceptance)</h3>
                        <div class="pull-right sm-pull-reset">
                            <button type="button" class="btn btn-primary btn-sm" data-target="#add_slip" data-toggle="modal"><i class="fa fa-plus"></i> &nbsp; <strong>Add Slip</strong></button>
                            <button type="button" class="btn btn-warning btn-sm" data-target="#import_record" data-toggle="modal"><i class="fa fa-arrow-down"></i> &nbsp; <strong>Import Record</strong></button>
                            <button type="button" class="btn btn-default btn-sm" data-target="#auto_slip" data-toggle="modal"><i class="fa fa-check"></i> &nbsp; <strong>Auto Generate Slip</strong></button>
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
            <add-slip-modal />
            <auto-generate-slip-modal />
            <import-slip-modal />
        </div>
        <!-- END PAGE CONTENT -->
</template>
<script>
import AddSlipModal from '../../../../components/Modals/AddAcceptanceSlipModal'
import AutoGenerateSlipModal from '../../../../components/Modals/AutoGenerateAcceptanceFeeModal'
import ImportSlipModal from '../../../../components/Modals/ImportAcceptanceFee'
export default {
    layout: 'main',
    components: {
        AddSlipModal,
        AutoGenerateSlipModal,
        ImportSlipModal
    }
}
</script>
