<template>
  <div class="content sm-gutter">
    <!-- START BREADCRUMBS -->
    <div class="bg-white">
        <div class="container p-l-5">
            <ol class="breadcrumb breadcrumb-alt">
                <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                <li class="breadcrumb-item"><a href="#">Personnel</a></li>
                <li class="breadcrumb-item active">Admin Users</li>
            </ol>
        </div>
    </div>
    <!-- END BREADCRUMBS -->
    <!-- START CONTAINER FLUID -->
    <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
        <div class="card card-default">
            <div class="card-header  separator">
                <h3 class="text-primary no-margin pull-left sm-pull-reset">Admin Users</h3>
                <div class="pull-right sm-pull-reset">
                    <button type="button" class="btn btn-primary btn-sm" data-target="#add_personnel" data-toggle="modal"><i class="fa fa-plus"></i> &nbsp; <strong>Add New Admin</strong></button>
                    <button type="button" class="btn btn-warning btn-sm" data-target="#upload_personnel" data-toggle="modal"><i class="fa fa-arrow-up"></i> &nbsp; <strong>Upload Admins</strong></button>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-striped table-condensed" id="basicTable">
                        <thead>
                        <th style="width:20%">First Name</th>
                        <th style="width:15%">Last Name</th>
                        <th style="width:10%">Gender</th>
                        <th style="width:15%">Phone Number</th>
                        <th style="width:25%">Email</th>
                        <th style="width:15%">Action</th>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Caroline</td>
                            <td>Uche</td>
                            <td>M</td>
                            <td>08032340000</td>
                            <td>benjokele@gmail.com</td>
                            <td>
                                <div class="btn-group">
                                    <button type="button" class="btn btn-default btn-sm"><i class="fa fa-pencil"></i></button>
                                    <button type="button" class="btn btn-default btn-sm"><i class="fa fa-eye"></i></button>
                                    <button type="button" class="btn btn-default btn-sm"><i class="pg-trash"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Benjamin</td>
                            <td>Okeleke</td>
                            <td>M</td>
                            <td>08032340000</td>
                            <td>benjokele@gmail.com</td>
                            <td>
                                <div class="btn-group">
                                    <button type="button" class="btn btn-default btn-sm"><i class="fa fa-pencil"></i></button>
                                    <button type="button" class="btn btn-default btn-sm"><i class="fa fa-eye"></i></button>
                                    <button type="button" class="btn btn-default btn-sm"><i class="pg-trash"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Chukwuemeka</td>
                            <td>James</td>
                            <td>M</td>
                            <td>08032340000</td>
                            <td>benjokele@gmail.com</td>
                            <td>
                                <div class="btn-group">
                                    <button type="button" class="btn btn-default btn-sm"><i class="fa fa-pencil"></i></button>
                                    <button type="button" class="btn btn-default btn-sm"><i class="fa fa-eye"></i></button>
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
    <add-personnel-modal />
    <upload-personnel-modal />
  </div>
</template>
<script>
  import Pagination from '~/components/Pagination'
  import AddPersonnelModal from '~/components/Modals/Personnel/AddPersonnelModal'
  import UploadPersonnelModal from '~/components/Modals/Personnel/UploadAdminModal'

  export default {
    name: 'personnel',
    layout: 'main',
    components: {
      Pagination,
      AddPersonnelModal,
      UploadPersonnelModal
    },
    data() {
      return {
        loading: true,
        pagination: {
            total: 0,
            per_page: 2,
            from: 1,
            to: 0,
            current_page: 1
        }
      }
    },
    methods: {

    },
    mounted() {

    }
  }
</script>
