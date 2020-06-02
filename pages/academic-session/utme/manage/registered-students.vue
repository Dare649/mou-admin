<template>
     <!-- START PAGE CONTENT -->
        <div class="content sm-gutter">
            <!-- START BREADCRUMBS -->
            <div class="bg-white">
                <div class="container p-l-5">
                    <ol class="breadcrumb breadcrumb-alt">
                        <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
                        <li class="breadcrumb-item"><a href="#">Academic Session</a></li>
                        <li class="breadcrumb-item"><nuxt-link to="/putme/manage">PUTME</nuxt-link></li>
                        <li class="breadcrumb-item active">Registered Students</li>
                    </ol>
                </div>
            </div>
            <!-- END BREADCRUMBS -->


            <!-- START CONTAINER FLUID -->
            <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
                <div class="card card-default">
                    <div class="card-header  separator">
                        <h3 class="text-primary no-margin pull-left sm-pull-reset">PUTME 2019/2020 REGISTERED STUDENTS</h3>
                        <div class="pull-right sm-pull-reset">
                            <button type="button" class="btn btn-primary btn-sm" data-target="#add_seat" data-toggle="modal"><i class="fa fa-plus"></i> &nbsp; <strong>Download to excel</strong></button>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-condensed" id="basicTable">
                                <thead>
                                  <th>JAMB REG NO</th>
                                  <th>NAME</th>
                                  <th>MODE OF PAYMENT</th>
                                  <th>TRANSACTION ID</th>
                                  <th>PAYMENT STATUS</th>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>RTY789212</td>
                                    <td>Isoboye Ibanibo</td>
                                    <td>PIN Number</td>
                                    <td>12681788123</td>
                                    <td>Successful</td>
                                    <!-- <td>
                                        <div class="btn-group">
                                            <span data-placement="top" data-toggle="tooltip" title="Edit Record">
                                                <a href="#edit_jamb_result" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-pencil"></i></a>
                                            </span>
                                            <button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-placement="top" title="Delete Record"><i class="pg-trash"></i></button>
                                        </div>
                                    </td> -->
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
            <add-seat-form />
        </div>
        <!-- END PAGE CONTENT -->
</template>
<script>
import AddSeatForm from '~/components/Modals/AddSeatForm'
export default {
    layout: 'main',
    components: {
        AddSeatForm
    }
}
</script>
