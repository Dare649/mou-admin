<template>
    <div>
        <!-- START PAGE CONTENT -->
        <!-- Upload Modal -->
        <div class="modal fade SlideUp" id="upload_subjects" tabindex="-1" role="dialog" aria-hidden="true">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                <i class="pg-close"></i>
            </button>
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="text-left p-b-5"><span class="semi-bold">Upload Subjects</span></h5>
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
                                <button type="button" @click="uploadSubjects()" v-if="!loading"  class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Upload Record</button>
                                <button type="button" disabled v-if="loading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Uploading</button>
                            </div>
                            <div class="col-lg-12 m-t-15">
                                <div class="dd-placeholder p-1">
                                    <h5 class="pull-left sm-pull-reset"><i class="fa fa-file-excel-o p-l-10"></i> Sample File</h5>
                                    <button v-if="!downloading" @click="downloadSubjectSampleFile()" class="pull-right sm-pull-reset btn btn-default m-t-5 m-r-10"><i class="fa fa-arrow-down"></i> &nbsp; Download</button>
                                    <button disabled v-if="downloading" class="pull-right sm-pull-reset btn btn-default m-t-5 m-r-10"><i class="fa fa-arrow-down"></i>&nbsp; Downloading</button>
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
        <!-- Delete Modal -->
        <div class="modal fade SlideUp" id="delete_subject" tabindex="-1" role="dialog" aria-hidden="true">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                <i class="pg-close"></i>
            </button>
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="text-left p-b-5"><span class="semi-bold">Delete Information</span></h5>
                    </div>
                    <div class="modal-body">
                        <form class="full-width" @submit.prevent="deleteSubject">
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
        <!-- Export Countries Modal -->
            <div class="modal fade SlideUp" id="export_subjects" tabindex="-1" role="dialog" aria-hidden="true">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    <i class="pg-close"></i>
                </button>
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="text-left p-b-5"><span class="semi-bold">Export Subjects</span></h5>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-lg-12">
                                    <h6 class="text-left p-b-5"><span class="semi-bold">Click confirm to export all the records to an excel file.</span></h6>
                                </div>
                                <div class="col-lg-12">
                                    <button type="button" v-if="!exportLoading"  @click="exportSubjects()" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Confirm</button>
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

        <!-- Edit Modal -->
        <div class="modal fade SlideUp" id="edit_subject" tabindex="-1" role="dialog" aria-hidden="true">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                <i class="pg-close"></i>
            </button>
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="text-left p-b-5"><span class="semi-bold">Edit Information</span></h5>
                    </div>
                    <div class="modal-body">
                        <form class="full-width" @submit.prevent="submitEditedSubject">
                            <div class="row">
                                <div class="col-lg-12 m-b-10">
                                    <input type="text" v-model="model.edit_name" placeholder="Name" class="form-control">
                                </div>
                                <div class="col-lg-12 m-b-10">
                                    <input type="text" placeholder="Prefix" v-model="model.edit_prefix" class="form-control">
                                </div>
                                <div class="col-lg-12 m-b-10">
                                    <input v-model="model.edit_status" type="radio" name="exampleRadios" id="exampleRadios1" value="1" checked>
                                    <label for="exampleRadios1">
                                        Activate
                                    </label>
                                </div>

                                <div class="col-lg-12 m-b-10">
                                    <input v-model="model.edit_status" type="radio" name="exampleRadios" id="exampleRadios2" value="0">
                                    <label for="exampleRadios2">
                                        Deactivate
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
        <div class="modal fade SlideUp" id="add_o_subject" tabindex="-1" role="dialog" aria-hidden="true">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                <i class="pg-close"></i>
            </button>
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="text-left p-b-5"><span class="semi-bold">Add New Subject</span></h5>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-12 m-b-10">
                            <input type="text" v-model="model.name" placeholder="Name" class="form-control input-lg" id="icon-filter" name="icon-filter">
                        </div>
                        <div class="col-lg-12 m-b-10">
                            <input type="text" v-model="model.prefix" placeholder="Abbreviation" class="form-control input-lg" id="icon-filter" name="icon-filter">
                        </div>
                        <div class="col-lg-12 m-b-10">
                            <input v-model="model.status" type="radio" name="exampleRadios" id="exampleRadios1" value="1" checked>
                            <label for="exampleRadios1">
                                Activate
                            </label>
                        </div>

                        <div class="col-lg-12 m-b-10">
                            <input v-model="model.status" type="radio" name="exampleRadios" id="exampleRadios2" value="0">
                            <label for="exampleRadios2">
                                Deactivate
                            </label>
                        </div>
                        <div class="col-lg-12">
                            <button type="button" v-if="!loading" @click="createSubject()" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Add Record</button>
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
        <!-- START PAGE CONTENT -->
        <div class="content sm-gutter">
            <!-- START BREADCRUMBS -->
            <div class="bg-white">
                <div class="container p-l-5">
                    <ol class="breadcrumb breadcrumb-alt">
                        <li class="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
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
                            <button v-permission="'View state'" type="button" @click="refresh()" class="btn btn-success btn-sm"><i class="fa fa-refresh"></i>&nbsp; Refresh </button>
                            <button v-permission="'Add subject'" type="button" class="btn btn-primary btn-sm" data-target="#add_o_subject" data-toggle="modal"><i class="fa fa-plus"></i> &nbsp; <strong>Add New Subject</strong></button>
                            <button v-permission="'Upload subject'" type="button" class="btn btn-warning btn-sm" data-target="#upload_subjects" data-toggle="modal"><i class="fa fa-arrow-up"></i> &nbsp; <strong>Upload Subjects</strong></button>
                            <button v-permission="'Export subject'" type="button" class="btn btn-success btn-sm" data-target="#export_subjects" data-toggle="modal"><i class="fa fa-file-excel-o"></i> &nbsp; <strong>Export to Excel</strong></button>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="card-header">
                                <form @submit.prevent="searchSubject">
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
                                <th style="width:40%">Name</th>
                                <th style="width:10%">Code</th>
                                <th style="width:30%">Status</th>
                                <th style="width:20%">Action</th>
                                </thead>
                                <tbody>
                                  <tr v-if="getLoading">
                                    <td colspan="4">Loading....Please wait.</td>
                                  </tr>
                                  <tr v-if="!getLoading && subjects.length < 1 && IsPermitted">
                                    <td colspan="4">No record at the moment... Please insert new record</td>
                                  </tr>
                                  <tr v-if="!IsPermitted">
                                    <td colspan="4" style="color: red; font-size:18px;"><i class="fa fa-warning"></i>&nbsp; Not Permitted to view this records!</td>
                                  </tr>
                                  <tr v-else v-for="subject in subjects" :key="subject.id">
                                      <td>{{subject.name}}</td>
                                      <td>{{subject.prefix}}</td>
                                      <td>
                                          <span style="background-color: green; color: white; margin: 5px; padding: 4px;" v-if="subject.status == 1">Active</span>
                                          <span style="background-color: red; color: white; margin: 5px; padding: 4px;" v-if="subject.status == 0">Inactive</span>
                                      </td>
                                      <td>
                                          <div class="btn-group">
                                              <span v-permission="'Edit subject'" data-placement="top" @click="populateFields(subject)" data-toggle="tooltip" title="Edit Record">
                                                  <a href="#edit_subject"  class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-pencil"></i></a>
                                              </span>
                                              <span v-permission="'Delete subject'" data-placement="top" @click="setId(subject.id)" data-toggle="tooltip" title="Delete Record">
                                                  <a href="#delete_subject"  class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="pg-trash"></i></a>
                                              </span>
                                          </div>
                                      </td>
                                  </tr>
                                </tbody>
                            </table>
                            <Pagination
                              v-bind:pagination="pagination"
                              v-on:click.native="getSubjects(pagination.current_page)"
                              :offset="4">
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END CONTAINER FLUID -->
        </div>
        <!-- END PAGE CONTENT -->
        <!-- <subject-form />
        <upload-subjects /> -->
    </div>
</template>
<script>
import Pagination from '~/components/Pagination'
// import SubjectForm from '../../components/Modals/SubjectFormModal';
// import UploadSubjects from '../../components/Modals/UploadSubjectsModal';
export default {
    name: "subjects",
    layout: "main",
    middleware: "auth",
    components: {
        // SubjectForm,
        // UploadSubjects
        Pagination
    },
    data(){
        return {
            subjects: [],
            addloading: false,
            downloading: false,
            loading: false,
            IsPermitted: true,
            deleteLoading: false,
            editLoading: false,
            getLoading: true,
            exportLoading: false,
            searchItem: "",
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
                    this.model.name = ""
                    this.model.prefix = ""
                    this.model.status = ""
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
        searchSubject(){
            this.$store
                .dispatch('get-started/searchSubject', this.searchItem)
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                        this.subjects = res.data
                        this.pagination = res.data
                    }else{
                    }
                }else{
                }
            }).catch(err => {
            })
        },
        refresh(){
            this.searchItem = ""
            this.subjects = []
            this.getSubjects(1)
        },
        getSubjects(page){
            if(this.$laravel.hasPermission('View subject')){
            this.$store
                .dispatch('get-started/getSubjects', page)
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                        this.getLoading = false
                        this.subjects = res.data.data
                        this.pagination = res.data
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
        this.getSubjects(this.pagination.current_page)
    }
}
</script>
<style scoped>
    .breadcrumb {
    background-color: #ffffff !important;;
}
</style>
