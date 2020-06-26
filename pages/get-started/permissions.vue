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
                        <li class="breadcrumb-item active">Roles</li>
                    </ol>
                </div>
            </div>
            <!-- END BREADCRUMBS -->
            <!-- START CONTAINER FLUID -->
            <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
                <div class="card card-default">
                    <div class="card-header  separator">
                        <h3 class="text-primary no-margin pull-left sm-pull-reset">Permissions</h3>
                        <!-- <div class="pull-right sm-pull-reset">
                            <button type="button" class="btn btn-primary btn-sm" data-target="#add_role" data-toggle="modal"><i class="fa fa-plus"></i> &nbsp; <strong>Add New Permission</strong></button>
                        </div> -->
                        <div class="clearfix"></div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-condensed" id="basicTable">
                                <thead>
                                <th style="width:60%">Name</th>
                                <th style="width:40%">Guard Name</th>
                                <!-- <th style="width:20%">Action</th> -->
                                </thead>
                                <tbody>
                                <tr v-for="permission in permissions" :key="permission.id">
                                    <td>{{permission.name}}</td>
                                    <td>{{permission.guard_name}}</td>
                                    <!-- <td>
                                        <div class="btn-group">
                                            <span data-placement="top" data-toggle="tooltip" title="Edit Role">
                                                <a href="#edit_role" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-pencil"></i></a>
                                            </span>
                                            <button type="button" class="btn btn-default btn-sm" data-placement="top" data-toggle="tooltip" title="Delete Record"><i class="pg-trash"></i></button>
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
        </div>
        <!-- Edit Role -->
            <div class="modal fade SlideUp" id="edit_role" tabindex="-1" role="dialog" aria-hidden="true">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    <i class="pg-close"></i>
                </button>
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="text-left p-b-5"><span class="semi-bold">Edit Role</span></h5>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="row">
                                    <div class="col-lg-12 m-b-10">
                                        <input type="text" placeholder="Name" class="form-control" id="icon-filter" name="icon-filter">
                                    </div>
                                    <div class="col-lg-12 m-b-10">
                                        <input type="text" placeholder="Description" class="form-control" id="icon-filter" name="icon-filter">
                                    </div>
                                    <div class="col-lg-12 m-b-10">
                                        <select class="full-width" data-init-plugin="select2">
                                            <option value="" disabled selected>Status</option>
                                            <option value="M">M</option>
                                            <option value="F">F</option>
                                        </select>
                                    </div>
                                    <div class="col-lg-12">
                                        <button type="button" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Add Record</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <!-- /.modal-content -->
                </div>
                <!-- /.modal-dialog -->
            </div>

            <!-- Add Role -->
            <div class="modal fade SlideUp" id="add_role" tabindex="-1" role="dialog" aria-hidden="true">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    <i class="pg-close"></i>
                </button>
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="text-left p-b-5"><span class="semi-bold">Add New Permission</span></h5>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="row">
                                    <div class="col-lg-12 m-b-10">
                                        <input type="text" placeholder="Name" class="form-control" id="icon-filter" name="icon-filter">
                                    </div>
                                    <div class="col-lg-12 m-b-10">
                                        <input type="text" placeholder="Description" class="form-control" id="icon-filter" name="icon-filter">
                                    </div>
                                    <div class="col-lg-12">
                                        <button type="button" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Add Record</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <!-- /.modal-content -->
                </div>
                <!-- /.modal-dialog -->
            </div>

            <!-- Add Role -->
            <div class="modal fade SlideUp" id="manage_permission" tabindex="-1" role="dialog" aria-hidden="true">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    <i class="pg-close"></i>
                </button>
                <div class="modal-dialog" style="width: 1280px">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="text-left p-b-5"><span class="semi-bold">Manage Permission</span></h5>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="row">
                                    <div class="col-lg-3 m-b-10">
                                        <div class="text-body mb-10">
                                            <h6 class="font-weight-bold">Faculties</h6>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="add_new_faculty">
                                                <label for="add_new_faculty">Add New Faculty</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="edit_faculty">
                                                <label for="edit_faculty">Edit Faculty</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="fac_upload">
                                                <label for="fac_upload">Upload</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="fac_export">
                                                <label for="fac_export">Export</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="fac_delete">
                                                <label for="fac_delete">Delete</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="fac_view_dept">
                                                <label for="fac_view_dept">View Department</label>
                                            </div>
                                        </div>
                                        <div class="text-body mb-10">
                                            <h6 class="font-weight-bold">Subject</h6>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="add_new_subject">
                                                <label for="add_new_subject">Add New Subject</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="upload_subject">
                                                <label for="upload_subject">Upload Subjects</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="export_excel">
                                                <label for="export_excel">Export to Excel</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="edit_subject">
                                                <label for="edit_subject">Edit Subject</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="sub_delete">
                                                <label for="sub_delete">Delete Subject</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="sub_view">
                                                <label for="sub_view">View Subject</label>
                                            </div>
                                        </div>
                                        <div class="text-body mb-10">
                                            <h6 class="font-weight-bold">Department</h6>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="add_new_subject">
                                                <label for="add_new_department">Add New Department</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="upload_department">
                                                <label for="upload_department">Upload Departments</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="dept_export_excel">
                                                <label for="dept_export_excel">Export to Excel</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="edit_department">
                                                <label for="edit_department">Edit Department</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="dept_delete">
                                                <label for="dept_delete">Delete Department</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-lg-3 m-b-10">
                                        <div class="text-body mb-10">
                                            <h6 class="font-weight-bold">Faculties</h6>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="add_new_faculty">
                                                <label for="add_new_faculty">Add New Faculty</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="edit_faculty">
                                                <label for="edit_faculty">Edit Faculty</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="fac_upload">
                                                <label for="fac_upload">Upload</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="fac_export">
                                                <label for="fac_export">Export</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="fac_delete">
                                                <label for="fac_delete">Delete</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="fac_view_dept">
                                                <label for="fac_view_dept">View Department</label>
                                            </div>
                                        </div>
                                        <div class="text-body mb-10">
                                            <h6 class="font-weight-bold">Subject</h6>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="add_new_subject">
                                                <label for="add_new_subject">Add New Subject</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="upload_subject">
                                                <label for="upload_subject">Upload Subjects</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="export_excel">
                                                <label for="export_excel">Export to Excel</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="edit_subject">
                                                <label for="edit_subject">Edit Subject</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="sub_delete">
                                                <label for="sub_delete">Delete Subject</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="sub_view">
                                                <label for="sub_view">View Subject</label>
                                            </div>
                                        </div>
                                        <div class="text-body mb-10">
                                            <h6 class="font-weight-bold">Department</h6>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="add_new_subject">
                                                <label for="add_new_department">Add New Department</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="upload_department">
                                                <label for="upload_department">Upload Departments</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="dept_export_excel">
                                                <label for="dept_export_excel">Export to Excel</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="edit_department">
                                                <label for="edit_department">Edit Department</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="dept_delete">
                                                <label for="dept_delete">Delete Department</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-lg-3 m-b-10">
                                        <div class="text-body mb-10">
                                            <h6 class="font-weight-bold">Faculties</h6>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="add_new_faculty">
                                                <label for="add_new_faculty">Add New Faculty</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="edit_faculty">
                                                <label for="edit_faculty">Edit Faculty</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="fac_upload">
                                                <label for="fac_upload">Upload</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="fac_export">
                                                <label for="fac_export">Export</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="fac_delete">
                                                <label for="fac_delete">Delete</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="fac_view_dept">
                                                <label for="fac_view_dept">View Department</label>
                                            </div>
                                        </div>
                                        <div class="text-body mb-10">
                                            <h6 class="font-weight-bold">Subject</h6>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="add_new_subject">
                                                <label for="add_new_subject">Add New Subject</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="upload_subject">
                                                <label for="upload_subject">Upload Subjects</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="export_excel">
                                                <label for="export_excel">Export to Excel</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="edit_subject">
                                                <label for="edit_subject">Edit Subject</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="sub_delete">
                                                <label for="sub_delete">Delete Subject</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="sub_view">
                                                <label for="sub_view">View Subject</label>
                                            </div>
                                        </div>
                                        <div class="text-body mb-10">
                                            <h6 class="font-weight-bold">Department</h6>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="add_new_subject">
                                                <label for="add_new_department">Add New Department</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="upload_department">
                                                <label for="upload_department">Upload Departments</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="dept_export_excel">
                                                <label for="dept_export_excel">Export to Excel</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="edit_department">
                                                <label for="edit_department">Edit Department</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="dept_delete">
                                                <label for="dept_delete">Delete Department</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-lg-3 m-b-10">
                                        <div class="text-body mb-10">
                                            <h6 class="font-weight-bold">Faculties</h6>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="add_new_faculty">
                                                <label for="add_new_faculty">Add New Faculty</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="edit_faculty">
                                                <label for="edit_faculty">Edit Faculty</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="fac_upload">
                                                <label for="fac_upload">Upload</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="fac_export">
                                                <label for="fac_export">Export</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="fac_delete">
                                                <label for="fac_delete">Delete</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="fac_view_dept">
                                                <label for="fac_view_dept">View Department</label>
                                            </div>
                                        </div>
                                        <div class="text-body mb-10">
                                            <h6 class="font-weight-bold">Subject</h6>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="add_new_subject">
                                                <label for="add_new_subject">Add New Subject</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="upload_subject">
                                                <label for="upload_subject">Upload Subjects</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="export_excel">
                                                <label for="export_excel">Export to Excel</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="edit_subject">
                                                <label for="edit_subject">Edit Subject</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="sub_delete">
                                                <label for="sub_delete">Delete Subject</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="sub_view">
                                                <label for="sub_view">View Subject</label>
                                            </div>
                                        </div>
                                        <div class="text-body mb-10">
                                            <h6 class="font-weight-bold">Department</h6>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="add_new_subject">
                                                <label for="add_new_department">Add New Department</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="upload_department">
                                                <label for="upload_department">Upload Departments</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="dept_export_excel">
                                                <label for="dept_export_excel">Export to Excel</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="edit_department">
                                                <label for="edit_department">Edit Department</label>
                                            </div>
                                            <div class="checkbox check-primary mt-0 mb-0 pl-0">
                                                <input type="checkbox" value="1" id="dept_delete">
                                                <label for="dept_delete">Delete Department</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-lg-12">
                                        <button type="button" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Save Changes</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <!-- /.modal-content -->
                </div>
                <!-- /.modal-dialog -->
            </div>
    </div>
</template>
<script>
import Pagination from '~/components/Pagination'
// import SubjectForm from '../../components/Modals/SubjectFormModal';
// import UploadSubjects from '../../components/Modals/UploadSubjectsModal';
export default {
    name: "Permissions",
    layout: "main",
    middleware: "auth",
    components: {
        // SubjectForm,
        // UploadSubjects
        Pagination
    },
    data(){
        return {
            permissions: [],
            addloading: false,
            downloading: false,
            loading: false,
            IsPermitted: true,
            deleteLoading: false,
            editLoading: false,
            getLoading: true,
            exportLoading: false,
            file: "",
            pagination: {
                total: 0,
                per_page: 2,
                from: 1,
                to: 0,
                current_page: 1
            },
            model: {
              name: "",
              id: 0,
              prefix: "",
              status: 1,
              edit_prefix: "",
              edit_status: "",
              edit_name: ""
            },
        }
    },
    methods: {
        deleteSubject(){
            this.deleteLoading = true
            this.$store
                .dispatch('get-started/deleteSubject', this.model.id)
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                    this.deleteLoading = false
                    this.getSubjects()
                    $( '#delete_subject' ).modal( 'hide' ).data( 'bs.modal', null );
                    this.loading = false
                    }else{
                    this.deleteLoading = false
                    this.loading = false
                    this.ErrMsg = "Error Logging in!"
                    }
                }else{
                    this.loading = false
                    this.ErrMsg = "Error Logging in!"
                }

            }).catch(err => {
            this.loading = false
            })
        },
        submitEditedSubject(){
            this.editLoading = true
            let bodyFormData = new Object();
            let payload = {}
            bodyFormData.name = this.model.edit_name
            bodyFormData.prefix = this.model.edit_prefix
            bodyFormData.status = this.model.edit_status
            payload.id = this.model.edit_id
            payload.bodyFormData = bodyFormData
            this.$store
            .dispatch('get-started/updateSubject', payload)
            .then(res => {
            if(res != undefined){
                if(res.status == true){
                    this.editLoading = false
                    this.getSubjects()
                    $('#edit_subject').modal('hide').data( 'bs.modal', null )
                    this.$toast.success('Record Edited Successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});

                }else{
                    this.editLoading = false
                    this.ErrMsg = "Error Logging in!"
                }
            }else{
                this.loading = false
                this.ErrMsg = "Error Logging in!"
            }
            }).catch(err => {
                this.loading = false
            })
        },
        createSubject(){
            this.loading = true
            let bodyFormData = new FormData();
            bodyFormData.set('name', this.model.name)
            bodyFormData.set('prefix', this.model.prefix)
            bodyFormData.set('status', this.model.status)
            this.$store
            .dispatch('get-started/createSubject', bodyFormData)
            .then(res => {
            if(res != undefined){
                if(res.status == true){
                    this.getSubjects()
                    this.loading = false
                    $('#add_o_subject').modal('hide').data( 'bs.modal', null )
                    this.model = {}
                }else{
                    this.loading = false
                    this.ErrMsg = "Error Creating Record!"
                }
            }else{
                this.loading = false
                this.ErrMsg = "Error Processing Request!"
            }
            }).catch(err => {
            this.loading = false
            })
        },
        setId(id){
          this.model.id = id
        },
        populateFields(request){
          this.model.edit_id = request.id
          this.model.edit_name = request.name
          this.model.edit_prefix = request.prefix
          this.model.edit_status = request.status
        },
        uploadSubjects(){
            this.loading = true
            this.file = this.$refs.myFiles.files[0];
            let formData = new FormData();
            formData.append('file', this.file);
            this.$store
                .dispatch('get-started/uploadSubjects', formData)
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                        this.loading = false
                        this.getSubjects()
                        $('#upload_subjects').modal('hide').data( 'bs.modal', null )
                        this.$toast.success(res.message, {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
                    }else{
                        this.loading = false
                        alert("File Upload Unsuccessful")
                        this.ErrMsg = "Error Logging in!"
                    }
                }else{
                    this.loading = false
                    console.log(res)
                    alert("File Upload Unsuccessful")
                    this.ErrMsg = "Error Logging in!"
                }
            }).catch(err => {
            this.loading = false
            })
        },
        exportSubjects(){
            this.exportLoading = true
            this.$store
                .dispatch('get-started/exportSubjects')
                .then(res => {
                if(res != undefined){
                    this.loading = false
                    var fileURL = window.URL.createObjectURL(new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}));
                    var fileLink = document.createElement('a');

                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', 'subjects.xlsx');
                    document.body.appendChild(fileLink);

                    fileLink.click();

                    $( '#export_subjects' ).modal( 'hide' ).data( 'bs.modal', null )
                    this.exportLoading = false
                    this.$toast.success('Record Exported to Excel Successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
                }else{
                    this.exportLoading = false
                    alert("File Downloaded Unsuccessful")
                }
            }).catch(err => {
            this.exportLoading = false
            })
        },
        downloadSubjectSampleFile(){
            this.downloading = true
            this.$store
                .dispatch('get-started/downloadSubjectSampleFile')
                .then(res => {
                if(res != undefined){
                    if(res.success == true)    {
                        window.location = res.message
                        this.downloading = false
                        $('#upload_subject').modal('hide').data( 'bs.modal', null )
                        this.$toast.success('Download Successful!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
                    }

                }else{
                    this.downloading = false
                    alert("File Download Unsuccessful")
                }
            }).catch(err => {
            this.downloading = false
            })
        },
        getPermissions(){
            if(this.$laravel.hasRole('Administrator')){
            this.$store
                .dispatch('permissions/getPermissions')
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                        this.getLoading = false
                        //this.permissions = res.data.data
                        this.permissions = res.data
                        //this.pagination = res.data
                        //console.log(this.countries)
                    }else{
                        this.getLoading = false
                        this.ErrMsg = "Error Fetching data!"
                    }
                }else{
                    this.getLoading = false
                    this.ErrMsg = "Error Fetching data!"
                }
            }).catch(err => {
                this.getLoading = false
            })
            }else{
                this.IsPermitted = false
                this.getLoading = false
                this.$router.push(
                decodeURIComponent(
                    this.$route.query.redirect || "/dashboard"
                )
            );
            this.$toast.error("Not Permitted to access this page! Contact the admin.", { icon: "times" });
            }
        }
    },
    mounted: function() {
        if (!process.server) {
            const script1 = document.createElement('script')
            script1.type = 'text/javascript'
            script1.src = '/pages/js/pages.min.js'
            document.head.appendChild(script1)
        }
        this.getPermissions()
    }
}
</script>
<style scoped>
    .breadcrumb {
    background-color: #ffffff !important;;
}
</style>
