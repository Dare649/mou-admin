<template>
    <div>
        <!-- START PAGE CONTENT -->
        <div class="content sm-gutter">
            <!-- START BREADCRUMBS -->
            <div class="bg-white">
                <div class="container p-l-5">
                    <ol class="breadcrumb breadcrumb-alt">
                        <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
                        <li class="breadcrumb-item">Get Started</li>
                        <li class="breadcrumb-item active"><nuxt-link to="/get-started/faculties">Faculties</nuxt-link></li>
                        <li class="breadcrumb-item active">Departments</li>
                    </ol>
                </div>
            </div>
            <!-- END BREADCRUMBS -->

        <!-- Add Faculty Modal -->
        <div class="modal fade SlideUp" v-permission="'Add department'" id="add_department" tabindex="-1" role="dialog" aria-hidden="true">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                <i class="pg-close"></i>
            </button>
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="text-left p-b-5"><span class="semi-bold">Add New Record</span></h5>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-12 m-b-10">
                                <input type="text" placeholder="Name" v-model="model.name" class="form-control input-lg" id="icon-filter" name="icon-filter">
                            </div>
                            <div class="col-lg-12 m-b-10">
                                <input type="text" placeholder="Abbreviation" v-model="model.abbreviation" class="form-control input-lg" id="icon-filter1" name="icon-filter">
                            </div>
                            <div class="col-lg-12 m-b-10">
                                <input type="number" placeholder="Length of Study" v-model="model.length_of_study" class="form-control input-lg" id="icon-filter2" name="icon-filter">
                            </div>
                            <div class="col-lg-12 m-b-10">
                                <input v-model="model.department_status" type="radio" name="exampleRadios" id="departmentRadioA" value="1" checked>
                                <label for="departmentRadioA">
                                    Activate Department
                                </label>
                            </div>

                            <div class="col-lg-12 m-b-10">
                                <input v-model="model.department_status" type="radio" name="exampleRadios" id="departmentRadioD" value="0">
                                <label for="departmentRadioD">
                                    Deactivate Department
                                </label>
                            </div>
                            <div class="col-lg-12">
                                <button type="button" v-if="!loading" @click="createDepartment()" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Add Record</button>
                                <button type="button" v-if="loading" disabled class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Adding Record</button>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>

      <!-- Upload Faculty Modal -->
      <div class="modal fade SlideUp" id="upload_departments" tabindex="-1" role="dialog" aria-hidden="true">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
              <i class="pg-close"></i>
          </button>
          <div class="modal-dialog modal-lg">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="text-left p-b-5"><span class="semi-bold">Upload Departments</span></h5>
                  </div>
                  <div class="modal-body">
                      <div class="row">
                          <div class="col-lg-12 m-b-10">
                              <div class="custom-file">
                                  <input type="file" ref="myFiles" class="custom-file-input" id="customFileLang" lang="es">
                                  <label class="custom-file-label" for="customFileLang">Select File</label>
                              </div>
                          </div>
                          <div class="col-lg-12">
                              <button type="button" @click="uploadDepartments" v-if="!loading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Upload Record</button>
                              <button type="button" disabled v-if="loading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Uploading</button>
                          </div>
                          <div class="col-lg-12 m-t-15">
                              <div class="dd-placeholder p-1">
                                  <h5 class="pull-left sm-pull-reset"><i class="fa fa-file-excel-o p-l-10"></i> Sample File</h5>
                                  <button v-if="!downloading" @click="downloadDepartmentSampleFile()" class="pull-right sm-pull-reset btn btn-default m-t-5 m-r-10"><i class="fa fa-arrow-down"></i> &nbsp; Download</button>
                                  <button v-if="downloading" disabled class="pull-right sm-pull-reset btn btn-default m-t-5 m-r-10"><i class="fa fa-arrow-down"></i> &nbsp; Downloading</button>
                                  <div class="clearfix"></div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="modal-footer">
                  </div>
              </div>
              <!-- /.modal-content -->
          </div>
          <!-- /.modal-dialog -->
      </div>

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

            <!-- Export Countries Modal -->
            <div class="modal fade SlideUp" id="export_departments" tabindex="-1" role="dialog" aria-hidden="true">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    <i class="pg-close"></i>
                </button>
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="text-left p-b-5"><span class="semi-bold">Export Departments</span></h5>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-lg-12">
                                    <h6 class="text-left p-b-5"><span class="semi-bold">Click confirm to export all the departments to an excel file.</span></h6>
                                </div>
                                <div class="col-lg-12">
                                    <button type="button" v-if="!exportLoading"  @click="exportDepartments()" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Confirm</button>
                                    <button type="button" disabled v-if="exportLoading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Downloading</button>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                        </div>
                    </div>
                    <!-- /.modal-content -->
                </div>
                <!-- /.modal-dialog -->
            </div>

            <!-- START CONTAINER FLUID -->
            <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
                <div class="card card-default">
                    <div class="card-header">
                        <h3 class="text-primary no-margin pull-left sm-pull-reset">Department Management</h3>
                        <div class="pull-right sm-pull-reset">
                            <nuxt-link to="/get-started/faculties"> <button type="button" class="btn btn-primary btn-sm"> <i class="fa fa-step-backward" aria-hidden="true"></i></button>&nbsp;&nbsp;</nuxt-link>
                            <button v-permission="'View departments'" type="button" @click="refresh()" class="btn btn-success btn-sm"><i class="fa fa-refresh"></i>&nbsp; Refresh </button>
                            <button v-permission="'Add department'" type="button" class="btn btn-primary btn-sm" data-target="#add_department" data-toggle="modal"><i class="fa fa-plus"></i> &nbsp; <strong>Add New Department</strong></button>
                            <button v-permission="'Upload department'" type="button" class="btn btn-warning btn-sm" data-target="#upload_departments" data-toggle="modal"><i class="fa fa-arrow-up"></i> &nbsp; <strong>Upload Departments</strong></button>
                            <button v-permission="'Export department'" type="button" class="btn btn-success btn-sm" data-target="#export_departments" data-toggle="modal"><i class="fa fa-file-excel-o"></i> &nbsp; <strong>Export to Excel</strong></button>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="card-header">
                        <form @submit.prevent="searchDepartment">
                            <div class="input-group col-lg-4" >
                                <input type="text" class="form-control" v-model="searchItem" placeholder="Search">
                                <div class="input-group-btn">
                                <button class="btn btn-default" type="submit">
                                    <i class="fa fa-search"></i>
                                </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-condensed" id="basicTable">
                                <thead>
                                  <th style="width:8%">Code</th>
                                  <th style="width:28%">Department</th>
                                  <th style="width:28%">Faculty</th>
                                  <th style="width:10.0%">Duration</th>
                                  <th style="width:12.0%">Status</th>
                                  <th style="width:15%">Action</th>
                                </thead>
                                <tbody>
                                  <tr v-if="getLoading">
                                    <td colspan="6">Loading....Please wait.</td>
                                  </tr>
                                  <tr v-if="!getLoading && departments.length < 1 && IsPermitted">
                                    <td colspan="6">No record at the moment</td>
                                  </tr>
                                  <tr v-if="!IsPermitted">
                                    <td colspan="4" style="color: red; font-size:18px;"><i class="fa fa-warning"></i>&nbsp; Not Permitted to view this records!</td>
                                  </tr>
                                  <tr v-for="department in departments" :key="department.id">
                                    <td>{{department.prefix}}</td>
                                    <td>{{department.name}}</td>
                                    <td>{{department.faculty.name}}</td>
                                    <td>{{department.length_of_study}} years</td>
                                    <td>
                                        <span style="background-color: green; color: white; margin: 5px; padding: 4px;" v-if="department.status == 1">Active</span>
                                        <span style="background-color: red; color: white; margin: 5px; padding: 4px;" v-if="department.status == 0">Inactive</span>
                                    </td>
                                    <td>
                                        <div class="btn-group">
                                            <span v-permission="'View programme'" data-placement="top" data-toggle="tooltip" title="Link to Programs">
                                                <nuxt-link :to="'/get-started/programs/' + department.faculty_id +'_'+ department.id" ><button type="button" class="btn btn-default btn-sm"><i class="fa fa-link"></i></button></nuxt-link>
                                            </span>
                                            <span v-permission="'Edit department'" data-placement="top"  data-toggle="tooltip" title="Edit Record">
                                                <a href="#edit_department" @click="populateFields(department)" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-pencil"></i></a>
                                            </span>
                                            <span v-permission="'Delete department'" data-placement="top" data-toggle="tooltip" title="Delete Record">
                                                <a href="#delete_department" @click="setId(department.id)"  class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-trash"></i></a>
                                            </span>
                                        </div>
                                    </td>
                                  </tr>
                                </tbody>
                            </table>
                            <Pagination
                                v-bind:pagination="pagination"
                                v-on:click.native="getDepartmentsByFacultyId(pagination.current_page)"
                                :offset="4">
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END CONTAINER FLUID -->
        </div>
        <!-- Edit Faculty Modal -->
        <div class="modal fade SlideUp" id="edit_department" tabindex="-1" role="dialog" aria-hidden="true">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                <i class="pg-close"></i>
            </button>
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="text-left p-b-5"><span class="semi-bold">Edit Department Information</span></h5>
                    </div>
                    <div class="modal-body">
                        <form class="full-width" @submit.prevent="submitEditedDepartment">
                            <div class="row">
                                <div class="col-lg-12 m-b-10">
                                    <input type="text" v-model="model.edit_name" placeholder="Name" class="form-control">
                                </div>
                                <div class="col-lg-12 m-b-10">
                                    <input type="text" placeholder="Prefix" v-model="model.edit_prefix" class="form-control">
                                </div>
                                <div class="col-lg-12 m-b-10">
                                    <input type="number" placeholder="Duration" v-model="model.edit_length_of_study" class="form-control">
                                </div>
                                <div class="col-lg-12 m-b-10">
                                    <input v-model="model.edit_status" type="radio" name="exampleRadios" id="exampleRadios1" value="1" checked>
                                    <label for="exampleRadios1">
                                        Activate Department
                                    </label>
                                </div>

                                <div class="col-lg-12 m-b-10">
                                    <input v-model="model.edit_status" type="radio" name="exampleRadios" id="exampleRadios2" value="0">
                                    <label for="exampleRadios2">
                                        Deactivate Department
                                    </label>
                                </div>
                                <div class="col-lg-12 m-t-10">
                                    <button type="submit" v-if="!editLoading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Save Changes</button>
                                    <button type="submit" v-if="editLoading" disabled class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Submitting</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>

        <!-- Delete Faculty Modal -->
        <div class="modal fade SlideUp" id="delete_department" tabindex="-1" role="dialog" aria-hidden="true">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                <i class="pg-close"></i>
            </button>
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="text-left p-b-5"><span class="semi-bold">Delete Faculty Information</span></h5>
                    </div>
                    <div class="modal-body">
                        <form class="full-width" @submit.prevent="deleteDepartment">
                            <div class="row">
                                <h5 class="text-left p-b-5"><span class="semi-bold">Are you sure you want to delete this record?</span></h5>
                                <div class="col-lg-12 m-t-10">
                                    <button type="submit" v-if="!deleteLoading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Confirm</button>
                                    <button type="submit" v-if="deleteLoading" disabled class="btn btn-primary btn-lg btn-large fs-16 semi-bold"><i class="fa fa-delete"></i>Deleting</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!-- <faculty-form></faculty-form>
        <upload-faculty></upload-faculty> -->
    </div>
</template>
<script>
import FacultyForm from '~/components/Modals/FacultyFormModal'
import UploadFaculty from '~/components/Modals/UploadFacultyModal'
import Pagination from '~/components/Pagination'
export default {
    name: "States",
    layout: "main",
    middleware: "",
    components: {
        FacultyForm,
        UploadFaculty,
        Pagination
    },
    data() {
      return {
        getLoading: true,
        loading: false,
        downloading: false,
        exportLoading: false,
        deleteLoading: false,
        editLoading: false,
        departments: [],
        searchItem: "",
        IsPermitted: true,
        pagination: {
            total: 0,
            per_page: 2,
            from: 1,
            to: 0,
            current_page: 1
        },
        file: "",
        model: {
          name: "",
          id: 0,
          abbreviation: "",
          length_of_study: 0,
          department_status: "",
          edit_prefix: "",
          edit_length_of_study: "",
          edit_status: "",
          edit_department_id: "",
          edit_name: "",
          edit_faculty_id: ""
        },
      }
    },
    mounted: function() {
        if (!process.server) {
            const script1 = document.createElement('script')
            script1.type = 'text/javascript'
            script1.src = '/pages/js/pages.min.js'
            document.head.appendChild(script1)
        }

        this.checkPagePermission()
    },
    methods:{
        refresh(){
            this.searchItem = ""
            this.departments = []
            this.getDepartmentsByFacultyId(1)
        },
        searchDepartment(){
            this.$store
                .dispatch('get-started/searchDepartment', this.searchItem)
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                        if(res.data == null){
                            this.departments = []
                        }else{
                            this.departments = res.data.data
                            this.pagination = res.data
                        }
                    }else{
                    }
                }else{
                }
            }).catch(err => {
            this.loading = false
            })
        },
        checkPagePermission(){
            if(this.$laravel.hasPermission('View departments')){
                this.getDepartmentsByFacultyId(this.pagination.current_page)
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
        },
        setId(id){
            this.model.id = id
        },
        downloadDepartmentSampleFile(){
            this.downloading = true
            this.$store
                .dispatch('get-started/downloadDepartmentSampleFile')
                .then(res => {
                if(res != undefined){
                    if(res.success == true)    {
                        window.location = res.message
                        this.downloading = false
                        $('#upload_o_department').modal('hide').data( 'bs.modal', null )
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
        uploadDepartments(){
            this.loading = true
            this.file = this.$refs.myFiles.files[0];
            let formData = new FormData();
            formData.append('file', this.file);
            this.$store
                .dispatch('get-started/uploadDepartments', formData)
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                        this.loading = false
                        this.getDepartmentsByFacultyId()
                        $('#upload_o_department').modal('hide').data( 'bs.modal', null )
                        this.$toast.success(res.message, {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
                    }else{
                        this.loading = false
                      this.$toast.error(res.message)
                        this.ErrMsg = "Error Processing Request!"
                    }
                }else{
                    this.loading = false
                  this.$toast.error('Error Processing Request!')
                  this.ErrMsg = "Error Processing Request!"
                }
            }).catch(err => {
            this.loading = false
            })
        },
        createDepartment(){
            this.loading = true
            let facultyId = this.$route.params.id
            let bodyFormData = new FormData();
            bodyFormData.set('faculty_id', facultyId)
            bodyFormData.set('name', this.model.name)
            bodyFormData.set('prefix', this.model.abbreviation)
            bodyFormData.set('length_of_study', this.model.length_of_study)
            bodyFormData.set('status', this.model.department_status)
            this.$store
            .dispatch('get-started/createDepartment', bodyFormData)
            .then(res => {
            if(res != undefined){
                if(res.status == true){
                    this.getDepartmentsByFacultyId()
                    this.loading = false
                    $('#add_department').modal('hide').data( 'bs.modal', null )
                    this.model = {}
                }else{
                    this.loading = false
                  this.$toast.error(res.message)
                    this.ErrMsg = "Error Processing Request!"
                }
            }else{
                this.loading = false
                this.ErrMsg = "Error Processing Request!"
            }
            }).catch(err => {
              this.$toast.error(err)
              this.loading = false
            })
        },
        deleteDepartment(){
            this.deleteLoading = true
            this.$store
                .dispatch('get-started/deleteDepartment', this.model.id)
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                    this.deleteLoading = false
                    this.getDepartmentsByFacultyId()
                    $( '#delete_department' ).modal( 'hide' ).data( 'bs.modal', null );
                    this.loading = false
                    }else{
                    this.deleteLoading = false
                    this.loading = false
                    this.ErrMsg = "Error Processing Request!"
                    }
                }else{
                    this.loading = false
                    this.ErrMsg = "Error Processing Request!"
                }

            }).catch(err => {
            this.loading = false
            })
        },
        submitEditedDepartment(){
            this.editLoading = true
            let bodyFormData = new Object();
            let payload = {}
            bodyFormData.name = this.model.edit_name
            bodyFormData.prefix = this.model.edit_prefix
            bodyFormData.status = this.model.edit_status
            bodyFormData.faculty_id = this.model.edit_faculty_id
            bodyFormData.length_of_study = this.model.edit_length_of_study
            payload.id = this.model.edit_department_id
            payload.bodyFormData = bodyFormData
            this.$store
            .dispatch('get-started/updateDepartment', payload)
            .then(res => {
            if(res != undefined){
                if(res.status == true){
                    this.editLoading = false
                    this.getDepartmentsByFacultyId()
                    $('#edit_department').modal('hide').data( 'bs.modal', null )
                    this.$toast.success('Record Edited Successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});

                }else{
                this.editLoading = false
                this.ErrMsg = "Error Processing Request!"
                }
            }else{
                this.loading = false
                this.ErrMsg = "Error Processing Request!"
            }
            }).catch(err => {
                this.loading = false
            })
        },
        populateFields(department){
          let facultyId = this.$route.params.id
          this.model.edit_department_id = department.id
          this.model.edit_name = department.name
          this.model.edit_prefix = department.prefix
          this.model.edit_length_of_study = department.length_of_study
          this.model.edit_faculty_id = facultyId
          this.model.edit_status = department.status
        },
        exportDepartments(){
            this.exportLoading = true
            this.$store
                .dispatch('get-started/exportDepartments')
                .then(res => {
                if(res != undefined){
                    this.loading = false
                    var fileURL = window.URL.createObjectURL(new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}));
                    var fileLink = document.createElement('a');

                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', 'departments.xlsx');
                    document.body.appendChild(fileLink);

                    fileLink.click();
                    this.exportLoading = false
                    $( '#export_departments' ).modal( 'hide' ).data( 'bs.modal', null )
                    this.$toast.success('Record Exported to Excel Successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
                }else{
                    this.exportLoading = false
                    alert("File Downloaded Unsuccessful")
                }
            }).catch(err => {
            this.exportLoading = false
            })
        },
        getDepartmentsByFacultyId(page) {
            if(this.$laravel.hasPermission('View departments')){
            let facultyId = this.$route.params.id
            let payload = {}
            payload.facultyId = facultyId
            payload.page = page
            this.$store
                .dispatch('get-started/getDepartmentsByFacultyId', payload)
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                        this.departments = res.data.data
                        this.pagination = res.data
                        this.getLoading = false
                    }else{
                        this.getLoading = false
                        this.ErrMsg = "Error Logging in!"
                    }
                }else{
                    this.getLoading = false
                    this.ErrMsg = "Error Logging in!"
                }
                }).catch(err => {
                    this.getLoading = false
                })
                }else{
                    this.IsPermitted = false
                    this.getLoading = false
                }

            },
    }
}
</script>
<style scoped>
    .breadcrumb {
    background-color: #ffffff !important;;
}
</style>
