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
                        <li class="breadcrumb-item"><nuxt-link :to="'/get-started/departments/' + routeId" >Departments</nuxt-link></li>
                        <li class="breadcrumb-item active">Programs</li>
                    </ol>
                </div>
            </div>
            <!-- END BREADCRUMBS -->

            <!-- Add Faculty Modal -->
      <div class="modal fade SlideUp" id="add_department" tabindex="-1" role="dialog" aria-hidden="true">
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
                            <input v-model="model.status" type="radio" name="exampleRadios" id="programRadioA" value="1" checked>
                            <label for="programRadioA">
                                Activate Program
                            </label>
                        </div>

                        <div class="col-lg-12 m-b-10">
                            <input v-model="model.status" type="radio" name="exampleRadios" id="programRadioD" value="0">
                            <label for="programRadioD">
                                Deactivate Program
                            </label>
                        </div>
                          <div class="col-lg-12">
                              <button type="button" v-if="!loading" @click="createProgram()" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Add Record</button>
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
      <div class="modal fade SlideUp" id="upload_programs" tabindex="-1" role="dialog" aria-hidden="true">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
              <i class="pg-close"></i>
          </button>
          <div class="modal-dialog modal-lg">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="text-left p-b-5"><span class="semi-bold">Upload Programs</span></h5>
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
                              <button type="button" @click="uploadPrograms" v-if="!loading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Upload Record</button>
                              <button type="button" disabled v-if="loading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Uploading</button>
                          </div>
                          <div class="col-lg-12 m-t-15">
                              <div class="dd-placeholder p-1">
                                  <h5 class="pull-left sm-pull-reset"><i class="fa fa-file-excel-o p-l-10"></i> Sample File</h5>
                                  <button v-if="!downloading" @click="downloadProgramSampleFile()" class="pull-right sm-pull-reset btn btn-default m-t-5 m-r-10"><i class="fa fa-arrow-down"></i> &nbsp; Download</button>
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
                                            You can manage the school Programs existing in the university.
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
            <div class="modal fade SlideUp" id="export_programs" tabindex="-1" role="dialog" aria-hidden="true">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    <i class="pg-close"></i>
                </button>
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="text-left p-b-5"><span class="semi-bold">Export Programs</span></h5>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-lg-12">
                                    <h6 class="text-left p-b-5"><span class="semi-bold">Click confirm to export all the programs to an excel file.</span></h6>
                                </div>
                                <div class="col-lg-12">
                                    <button type="button" v-if="!exportLoading"  @click="exportPrograms()" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Confirm</button>
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
                        <h3 class="text-primary no-margin pull-left sm-pull-reset">Program Management</h3>
                        <div class="pull-right sm-pull-reset">
                            <nuxt-link :to="'/get-started/departments/' + routeId" > <button type="button" class="btn btn-primary btn-sm"> <i class="fa fa-step-backward" aria-hidden="true"></i></button>&nbsp;&nbsp;</nuxt-link>
                            <button v-permission="'Add programme'" type="button" class="btn btn-primary btn-sm" data-target="#add_department" data-toggle="modal"><i class="fa fa-plus"></i> &nbsp; <strong>Add New Program</strong></button>
                            <button v-permission="'Upload programme'" type="button" class="btn btn-warning btn-sm" data-target="#upload_programs" data-toggle="modal"><i class="fa fa-arrow-up"></i> &nbsp; <strong>Upload Programs</strong></button>
                            <button v-permission="'Export programme'" type="button" class="btn btn-success btn-sm" data-target="#export_programs" data-toggle="modal"><i class="fa fa-file-excel-o"></i> &nbsp; <strong>Export to Excel</strong></button>
                        </div>
                        <div class="clearfix"></div>
                    </div>

                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-condensed" id="basicTable">
                                <thead>
                                    <th style="width:28%">Department</th>
                                    <th style="width:28%">Program</th>
                                    <th style="width:10.0%">Duration</th>
                                    <th style="width:12.0%">Status</th>
                                    <th style="width:15%">Action</th>
                                </thead>
                                <tbody>
                                  <tr v-if="getLoading">
                                    <td colspan="6">Loading....Please wait.</td>
                                  </tr>
                                  <tr v-if="!getLoading && programs.length < 1 && IsPermitted">
                                    <td colspan="6">No record at the moment</td>
                                  </tr>
                                  <tr v-if="!IsPermitted">
                                    <td colspan="4" style="color: red; font-size:18px;"><i class="fa fa-warning"></i>&nbsp; Not Permitted to view this records!</td>
                                  </tr>
                                  <tr v-for="program in programs" :key="program.id">
                                      <td>{{program.department.name}}</td>
                                      <td>{{program.name}}</td>
                                      <td>{{program.duration}} years</td>
                                      <td>
                                          <span style="background-color: green; color: white; margin: 5px; padding: 4px;" v-if="program.status == 1">Active</span>
                                          <span style="background-color: red; color: white; margin: 5px; padding: 4px;" v-if="program.status == 0">Inactive</span>
                                      </td>
                                      <td>
                                          <div class="btn-group">
                                              <span v-permission="'Edit programme'" data-placement="top"  data-toggle="tooltip" title="Edit Record">
                                                  <a href="#edit_program" @click="populateFields(program)" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-pencil"></i></a>
                                              </span>
                                              <span v-permission="'Delete programme'" data-placement="top" data-toggle="tooltip" title="Delete Record">
                                                  <a href="#delete_department" @click="setId(program.id)"  class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="pg-trash"></i></a>
                                              </span>
                                          </div>
                                      </td>
                                  </tr>
                                </tbody>
                            </table>
                            <Pagination
                                v-bind:pagination="pagination"
                                v-on:click.native="getProgramsByDepartmentId(pagination.current_page)"
                                :offset="4">
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END CONTAINER FLUID -->
        </div>
        <!-- Edit Faculty Modal -->
        <div class="modal fade SlideUp" id="edit_program" tabindex="-1" role="dialog" aria-hidden="true">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                <i class="pg-close"></i>
            </button>
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="text-left p-b-5"><span class="semi-bold">Edit Program Information</span></h5>
                    </div>
                    <div class="modal-body">
                        <form class="full-width" @submit.prevent="submitEditedProgram">
                            <div class="row">
                                <div class="col-lg-12 m-b-10">
                                    <input type="text" v-model="model.edit_name" placeholder="Name" class="form-control">
                                </div>
                                <!-- <div class="col-lg-12 m-b-10">
                                    <input type="text" placeholder="Prefix" v-model="model.edit_prefix" class="form-control">
                                </div> -->
                                <div class="col-lg-12 m-b-10">
                                    <input type="number" placeholder="Duration" v-model="model.edit_length_of_study" class="form-control">
                                </div>
                                <div class="col-lg-12 m-b-10">
                                    <input v-model="model.edit_status" type="radio" name="exampleRadios" id="exampleRadios1" value="1" checked>
                                    <label for="exampleRadios1">
                                        Activate Program
                                    </label>
                                </div>

                                <div class="col-lg-12 m-b-10">
                                    <input v-model="model.edit_status" type="radio" name="exampleRadios" id="exampleRadios2" value="0">
                                    <label for="exampleRadios2">
                                        Deactivate Program
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
                        <form class="full-width" @submit.prevent="deleteProgram">
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
import Pagination from '~/components/Pagination'
export default {
    name: "Programs",
    layout: "main",
    middleware: "",
    components: {
        Pagination
    },
    data() {
      return {
        getLoading: true,
        loading: false,
        IsPermitted: true,
        downloading: false,
        exportLoading: false,
        deleteLoading: false,
        editLoading: false,
        programs: [],
        routeId: 0,
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
          status: 1,
          abbreviation: "",
          length_of_study: 4,
          department_status: "",
          edit_prefix: "",
          edit_length_of_study: "",
          edit_status: "",
          edit_department_id: "",
          edit_name: "",
          edit_program_id: "",
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
        if(this.$laravel.hasPermission('View programme')){
            this.getProgramsByDepartmentId(this.pagination.current_page)
        }else{
            this.IsPermitted = false
            this.getLoading = false
        }
        
        this.routeId = (this.$route.params.id).split("_")[0]
    },

    methods:{
        setId(id){
            this.model.id = id
        },
        downloadProgramSampleFile(){
            this.downloading = true
            this.$store
                .dispatch('get-started/downloadProgramSampleFile')
                .then(res => {
                if(res != undefined){
                    if(res.success == true)    {
                        window.location = res.message
                        this.downloading = false
                        $('#upload_o_program').modal('hide').data( 'bs.modal', null )
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
        uploadPrograms(){
            this.loading = true
            this.file = this.$refs.myFiles.files[0];
            let formData = new FormData();
            formData.append('file', this.file);
            this.$store
                .dispatch('get-started/uploadPrograms', formData)
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                        this.loading = false
                        this.getProgramsByDepartmentId()
                        $('#upload_o_department').modal('hide').data( 'bs.modal', null )
                        this.$toast.success(res.message, {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
                    }else{
                        this.loading = false
                        alert("File Upload Unsuccessful")
                        this.ErrMsg = "Error Processing Request!"
                    }
                }else{
                    this.loading = false
                    alert("File Upload Unsuccessful")
                    this.ErrMsg = "Error Processing Request!"
                }
            }).catch(err => {
            this.loading = false
            })
        },
        createProgram(){
            this.loading = true
            let departmentId = (this.$route.params.id).split('_')[1]
            let facultyId = (this.$route.params.id).split('_')[0]
            let bodyFormData = new FormData();
            bodyFormData.set('department_id', departmentId)
            //bodyFormData.set('faculty_id', facultyId)
            bodyFormData.set('name', this.model.name)
            //bodyFormData.set('prefix', this.model.abbreviation)
            bodyFormData.set('duration', this.model.length_of_study)
            bodyFormData.set('status', this.model.status)
            this.$store
            .dispatch('get-started/createProgram', bodyFormData)
            .then(res => {
            if(res != undefined){
                if(res.status == true){
                    this.getProgramsByDepartmentId()
                    this.loading = false
                    $('#add_department').modal('hide').data( 'bs.modal', null )
                    this.model = {}
                }else{
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
        deleteProgram(){
            this.deleteLoading = true
            this.$store
                .dispatch('get-started/deleteProgram', this.model.id)
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                    this.deleteLoading = false
                    this.getProgramsByDepartmentId()
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
        submitEditedProgram(){
            this.editLoading = true
            let bodyFormData = new Object();
            let payload = {}
            bodyFormData.name = this.model.edit_name
            // bodyFormData.prefix = this.model.edit_prefix
            bodyFormData.status = this.model.edit_status
            bodyFormData.department_id = this.model.edit_department_id
            bodyFormData.duration = this.model.edit_length_of_study
            payload.id = this.model.edit_program_id
            payload.bodyFormData = bodyFormData
            this.$store
            .dispatch('get-started/updateProgram', payload)
            .then(res => {
            if(res != undefined){
                if(res.status == true){
                    this.editLoading = false
                    this.getProgramsByDepartmentId()
                    $('#edit_program').modal('hide').data( 'bs.modal', null )
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
        populateFields(program){
          this.model.edit_department_id = program.department_id
          this.model.edit_program_id = program.id
          this.model.edit_name = program.name
        //   this.model.edit_prefix = program.prefix
          this.model.edit_length_of_study = program.duration
        //   this.model.edit_faculty_id = program.faculty_id
          this.model.edit_status = program.status
        },
        exportPrograms(){
            this.exportLoading = true
            this.$store
                .dispatch('get-started/exportPrograms')
                .then(res => {
                if(res != undefined){
                    this.loading = false
                    var fileURL = window.URL.createObjectURL(new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}));
                    var fileLink = document.createElement('a');

                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', 'programs.xlsx');
                    document.body.appendChild(fileLink);

                    fileLink.click();
                    this.exportLoading = false
                    $( '#export_programs' ).modal( 'hide' ).data( 'bs.modal', null )
                    this.$toast.success('Record Exported to Excel Successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
                }else{
                    this.exportLoading = false
                    alert("File Downloaded Unsuccessful")
                }
            }).catch(err => {
            this.exportLoading = false
            })
        },
        getProgramsByDepartmentId(page) {
            if(this.$laravel.hasPermission('View programme')){
            let departmentId = (this.$route.params.id).split("_")[1]
            let payload = {}
            payload.page = page
            payload.departmentId = departmentId
            this.$store
                .dispatch('get-started/getProgramsByDepartmentId', payload)
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                        this.programs = res.data.data
                        this.pagination = res.data
                        this.getLoading = false
                    }else{
                        this.getLoading = false
                        this.ErrMsg = "Error Processing Request!"
                    }
                }else{
                    this.getLoading = false
                    this.ErrMsg = "Error Processing Request!"
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
