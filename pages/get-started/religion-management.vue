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
             <div class="modal fade SlideUp" id="export_religions" tabindex="-1" role="dialog" aria-hidden="true">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
              <i class="pg-close"></i>
          </button>
          <div class="modal-dialog modal-lg">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="text-left p-b-5"><span class="semi-bold">Export Religions</span></h5>
                  </div>
                  <div class="modal-body">
                      <div class="row">
                          <div class="col-lg-12">
                            <h6 class="text-left p-b-5"><span class="semi-bold">Click confirm to export all the religions to an excel file.</span></h6>
                          </div>
                          <div class="col-lg-12">
                              <button type="button" v-if="!exportLoading"  @click="exportReligions()" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Confirm</button>
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
                    <div class="card-header  separator">
                        <h3 class="text-primary no-margin pull-left sm-pull-reset">Religion Management</h3>
                        <div class="pull-right sm-pull-reset">
                            <button type="button" v-permission="'Add religion'" class="btn btn-primary btn-sm" data-target="#add_religion" data-toggle="modal"><i class="fa fa-plus"></i> &nbsp; <strong>Add New Religion</strong></button>
                            <button type="button" v-permission="'Upload religion'" class="btn btn-warning btn-sm" data-target="#upload_religion" data-toggle="modal"><i class="fa fa-arrow-up"></i> &nbsp; <strong>Upload Religions</strong></button>
                            <button type="button" v-permission="'Export religion'" class="btn btn-success btn-sm" data-target="#export_religions" data-toggle="modal"><i class="fa fa-file-excel-o"></i> &nbsp; <strong>Export to Excel</strong></button>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-condensed" id="basicTable">
                                <thead>
                                <th style="width:40%">Religion Name</th>
                                <th style="width:20%">Status</th>
                                <th style="width:20%">Action</th>
                                </thead>
                                <tbody>
                                    <tr v-if="getloading">
                                        <td colspan="4">Loading....Please wait.</td>
                                    </tr>
                                    <tr v-if="!getloading && religions.length < 1 && IsPermitted">
                                        <td colspan="4">No record at the moment</td>
                                    </tr>
                                    <tr v-if="!IsPermitted">
                                        <td colspan="6" style="color: red; font-size:18px;"><i class="fa fa-warning"></i>&nbsp; Not Permitted to view this records!</td>
                                    </tr>
                                    <tr v-for="religion in religions" :key="religion.id">
                                        <td>{{religion.name}}</td>
                                        <td>
                                            <span style="background-color: green; color: white; margin: 5px; padding: 4px;" v-if="religion.status == 1">Active</span>
                                            <span style="background-color: red; color: white; margin: 5px; padding: 4px;" v-if="religion.status == 0">Inactive</span>
                                        </td>
                                        <td>
                                            <div class="btn-group">
                                                <span data-placement="top" v-permission="'Edit religion'" @click="populateFields(religion)" data-toggle="tooltip" title="Edit Record">
                                                    <a href="#edit_religion"  class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-pencil"></i></a>
                                                </span>
                                                <span data-placement="top" v-permission="'Delete religion'" @click="setId(religion.id)" data-toggle="tooltip" title="Delete Record">
                                                    <a href="#delete_religion"  class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="pg-trash"></i></a>
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <Pagination
                                v-bind:pagination="pagination"
                                v-on:click.native="getReligions(pagination.current_page)"
                                :offset="4">
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END CONTAINER FLUID -->
        </div>
        <!-- END PAGE CONTENT -->

        <!-- Edit Country Modal -->
        <div class="modal fade SlideUp" id="edit_religion" tabindex="-1" role="dialog" aria-hidden="true">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                <i class="pg-close"></i>
            </button>
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="text-left p-b-5"><span class="semi-bold">Edit Religion Information</span></h5>
                    </div>
                    <div class="modal-body">
                        <form class="full-width" @submit.prevent="submitEditedReligion">
                            <div class="row">
                                <div class="col-lg-12 m-b-10">
                                    <input type="text" v-model="model.edit_name" placeholder="Name" class="form-control">
                                </div>
                                <div class="col-lg-12 m-b-10">
                                    <input v-model="model.edit_status" type="radio" name="exampleRadios" id="exampleRadios1" value="1" checked>
                                    <label for="exampleRadios1">
                                        Activate Religion
                                    </label>
                                </div>

                                <div class="col-lg-12 m-b-10">
                                    <input v-model="model.edit_status" type="radio" name="exampleRadios" id="exampleRadios2" value="0">
                                    <label for="exampleRadios2">
                                        Deactivate Religion
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

         <!-- Delete Country Modal -->
        <div class="modal fade SlideUp" id="delete_religion" tabindex="-1" role="dialog" aria-hidden="true">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                <i class="pg-close"></i>
            </button>
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="text-left p-b-5"><span class="semi-bold">Delete Religion Information</span></h5>
                    </div>
                    <div class="modal-body">
                        <form class="full-width" @submit.prevent="deleteReligion">
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

        <div class="modal fade SlideUp" id="add_religion" tabindex="-1" role="dialog" aria-hidden="true">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
            <i class="pg-close"></i>
        </button>
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="text-left p-b-5"><span class="semi-bold">Add New Religion</span></h5>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-12 m-b-10">
                            <input type="text" placeholder="Religion Name" v-model="model.name" class="form-control input-lg" id="icon-filter" name="icon-filter">
                        </div>
                        <div class="col-lg-12 m-b-10">
                            <input v-model="model.status" type="radio" name="exampleRadios" id="exampleRadios1" value="1" checked>
                            <label for="exampleRadios1">
                                Activate Religion
                            </label>
                        </div>

                        <div class="col-lg-12 m-b-10">
                            <input v-model="model.status" type="radio" name="exampleRadios" id="exampleRadios2" value="0">
                            <label for="exampleRadios2">
                                Deactivate Religion
                            </label>
                        </div>
                        <div class="col-lg-12">
                            <button type="button" v-if="!loading" @click="createReligion()" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Add Record</button>
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
    <!-- Upload Religion Modal -->
      <div class="modal fade SlideUp" id="upload_religion" tabindex="-1" role="dialog" aria-hidden="true">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
              <i class="pg-close"></i>
          </button>
          <div class="modal-dialog modal-lg">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="text-left p-b-5"><span class="semi-bold">Upload Religions</span></h5>
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
                              <button type="button" @click="uploadReligions()" v-if="!loading"  class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Upload Record</button>
                              <button type="button" disabled v-if="loading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Uploading</button>
                          </div>
                          <div class="col-lg-12 m-t-15">
                              <div class="dd-placeholder p-1">
                                  <h5 class="pull-left sm-pull-reset"><i class="fa fa-file-excel-o p-l-10"></i> Sample File</h5>
                                  <button v-if="!downloading" @click="downloadReligionSampleFile()" class="pull-right sm-pull-reset btn btn-default m-t-5 m-r-10"><i class="fa fa-arrow-down"></i> &nbsp; Download</button>
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
        <!-- <religion-form />
        <upload-religion /> -->
    </div>
</template>
<script>
// import ReligionForm from '../../components/Modals/ReligionFormModal';
// import UploadReligion from '../../components/Modals/UploadReligionModal';
import Pagination from '~/components/Pagination'
export default {
    name: "religion",
    layout: "main",
    middleware: "",
    components: {
        // ReligionForm,
        // UploadReligion,
        Pagination
    },
     data() {
      return {
        pagination: {
            total: 0,
            per_page: 2,
            from: 1,
            to: 0,
            current_page: 1
        },
        addloading: false,
        downloading: false,
        loading: false,
        deleteLoading: false,
        getloading: false,
        editLoading: false,
        exportLoading: false,
        religions: [],
        IsPermitted: true,
        file: "",
        model: {
          name: "",
          id: 0,
          status: "",
          edit_name: "",
          edit_status: "",
          edit_religion_id: ""
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
        this.getReligions()
    },
    methods: {
        uploadReligions(){
            this.loading = true
            this.file = this.$refs.myFiles.files[0];
            let formData = new FormData();
            formData.append('file', this.file);
            this.$store
                .dispatch('get-started/uploadReligions', formData)
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                        this.loading = false
                        this.getReligions()
                        $('#upload_religion').modal('hide').data( 'bs.modal', null )
                        this.$toast.success(res.message, {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
                    }else{
                        this.loading = false
                        alert("File Upload Unsuccessful")
                        this.ErrMsg = "Error Logging in!"
                    }
                }else{
                    this.loading = false
                    alert("File Upload Unsuccessful")
                    this.ErrMsg = "Error Logging in!"
                }
            }).catch(err => {
            this.loading = false
            })
        },
        downloadReligionSampleFile(){
            this.downloading = true
            this.$store
                .dispatch('get-started/downloadReligionSampleFile')
                .then(res => {
                if(res != undefined){
                    if(res.success == true)    {
                        window.location = res.message
                        this.downloading = false
                        $('#upload_religion').modal('hide').data( 'bs.modal', null )
                        this.$toast.success('Download Successful!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
                    }
                }else{
                    this.downloading = false
                    alert("File Downloaded Unsuccessful")
                }
            }).catch(err => {
            this.downloading = false
            })
        },
        exportReligions(){
            this.exportLoading = true
            this.$store
                .dispatch('get-started/exportReligions')
                .then(res => {
                if(res != undefined){
                    this.loading = false
                    var fileURL = window.URL.createObjectURL(new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}));
                    var fileLink = document.createElement('a');

                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', 'religions.xlsx');
                    document.body.appendChild(fileLink);

                    fileLink.click();
                    this.exportLoading = false
                    $( '#export_religions' ).modal( 'hide' ).data( 'bs.modal', null )
                    this.$toast.success('Record Exported to Excel Successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
                }else{
                    this.exportLoading = false
                    alert("File Downloaded Unsuccessful")
                }
            }).catch(err => {
            this.exportLoading = false
            })
        },
        populateFields(religion){
            this.model.edit_religion_id = religion.id
            this.model.edit_name = religion.name
            this.model.edit_status = religion.status
        },
        submitEditedReligion(){
            this.editLoading = true
            let bodyFormData = new Object();
            let payload = {}
            bodyFormData.name = this.model.edit_name
            bodyFormData.status = this.model.edit_status
            payload.id = this.model.edit_religion_id
            payload.bodyFormData = bodyFormData
            this.$store
            .dispatch('get-started/updateReligion', payload)
            .then(res => {
            if(res != undefined){
                if(res.status == true){
                    this.editLoading = false
                    this.getReligions()
                    $('#edit_religion').modal('hide').data( 'bs.modal', null )
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
        setId(id){
            this.model.id = id
        },
        deleteReligion(){
            this.deleteLoading = true
            this.$store
                .dispatch('get-started/deleteReligion', this.model.id)
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                    this.deleteLoading = false
                    this.getReligions()
                    $( '#delete_religion' ).modal( 'hide' ).data( 'bs.modal', null );
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
        createReligion(){
            this.loading = true
            let bodyFormData = new FormData();
            bodyFormData.set('name', this.model.name)
            bodyFormData.set('status', this.model.status)
            this.$store
            .dispatch('get-started/createReligion', bodyFormData)
            .then(res => {
            if(res != undefined){
                if(res.status == true){
                    this.getReligions()
                    this.loading = false
                    $('#add_religion').modal('hide').data( 'bs.modal', null )
                    this.model = {}
                }else{
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
        getReligions(page){
            if(this.$laravel.hasPermission('View religion')){
                this.getloading = true
                this.$store
                    .dispatch('get-started/getReligions', page)
                    .then(res => {
                    if(res != undefined){
                        if(res.status == true){
                            this.getloading = false
                            this.religions = res.data.data
                            this.pagination = res.data
                        }else{
                            this.getloading = false
                            this.ErrMsg = "Error Fetching data!"
                        }
                    }else{
                        this.getloading = false
                        this.ErrMsg = "Error Fetching data!"
                    }
                    }).catch(err => {
                    this.getloading = false
                })
            }else{
                this.IsPermitted = false
                this.getLoading = false
            }
        },
    }
}
</script>
