<template>
    <div>
        <!-- Add Faculty Modal -->
        <div class="modal fade SlideUp" id="add_lga" tabindex="-1" role="dialog" aria-hidden="true">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                <i class="pg-close"></i>
            </button>
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="text-left p-b-5"><span class="semi-bold">Add New LGA</span></h5>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-12 m-b-10">
                                <input type="text" v-model="model.name" placeholder="LGA Name" class="form-control input-lg" id="icon-filter2" name="icon-filter">
                            </div>
                            <div class="col-lg-12 m-b-10">
                                <input type="text" v-model="model.abbreviation" placeholder="LGA Abbreviation" class="form-control input-lg" id="icon-filter1" name="icon-filter">
                            </div>
                            <div class="col-lg-12">
                                <button type="button" v-if="!loading" @click="createLGA()" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Add Record</button>
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

        <!-- Delete Country Modal -->
        <div class="modal fade SlideUp" id="delete_lga" tabindex="-1" role="dialog" aria-hidden="true">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                <i class="pg-close"></i>
            </button>
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="text-left p-b-5"><span class="semi-bold">Delete LGA Information</span></h5>
                    </div>
                    <div class="modal-body">
                        <form class="full-width" @submit.prevent="deleteLGA">
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

        <!-- Edit Country Modal -->
        <div class="modal fade SlideUp" id="edit_lga" tabindex="-1" role="dialog" aria-hidden="true">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                <i class="pg-close"></i>
            </button>
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="text-left p-b-5"><span class="semi-bold">Edit State Information</span></h5>
                    </div>
                    <div class="modal-body">
                        <form class="full-width" @submit.prevent="submitEditedLGA">
                            <div class="row">
                                <div class="col-lg-12 m-b-10">
                                    <input type="text" v-model="model.edit_name" placeholder="State Name" class="form-control">
                                </div>
                                <div class="col-lg-12 m-b-10">
                                    <input type="text" placeholder="Abbreviation" v-model="model.edit_abbreviation" class="form-control">
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

        <!-- Upload Faculty Modal -->
        <div class="modal fade SlideUp" id="upload_lga" tabindex="-1" role="dialog" aria-hidden="true">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                <i class="pg-close"></i>
            </button>
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="text-left p-b-5"><span class="semi-bold">Upload LGAs</span></h5>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <!-- <div class="col-lg-12 m-b-10">
                                <input type="text" placeholder="File Caption" class="form-control input-lg" id="icon-filter" name="icon-filter">
                            </div> -->
                            <div class="col-lg-12 m-b-10">
                                <div class="custom-file">
                                    <input type="file" ref="myFiles" class="custom-file-input" id="customFileLang" lang="es">
                                    <label class="custom-file-label" for="customFileLang">Select File</label>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <button type="button" @click="uploadLGAs" v-if="!loading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Upload Record</button>
                                <button type="button" disabled v-if="loading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Uploading</button>
                            </div>
                            <div class="col-lg-12 m-t-15">
                                <div class="dd-placeholder p-1">
                                    <h5 class="pull-left sm-pull-reset"><i class="fa fa-file-excel-o p-l-10"></i> Sample File</h5>
                                    <button v-if="!downloading" @click="downloadLGASampleFile()" class="pull-right sm-pull-reset btn btn-default m-t-5 m-r-10"><i class="fa fa-arrow-down"></i> &nbsp; Download</button>
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
        <!-- START PAGE CONTENT -->
        <div class="content sm-gutter">
            <!-- START BREADCRUMBS -->
            <div class="bg-white">
                <div class="container p-l-5">
                    <ol class="breadcrumb breadcrumb-alt">
                    <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
                    <li class="breadcrumb-item">Get Started</li>
                    <li class="breadcrumb-item"><nuxt-link :to="'/get-started/states/' + routeId" >States</nuxt-link></li>
                    <li class="breadcrumb-item active">LGAs</li>
                    </ol>
                </div>
            </div>
            <!-- END BREADCRUMBS -->


            <!-- Export Countries Modal -->
            <div class="modal fade SlideUp" id="export_lgas" tabindex="-1" role="dialog" aria-hidden="true">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    <i class="pg-close"></i>
                </button>
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="text-left p-b-5"><span class="semi-bold">Export LGAs</span></h5>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-lg-12">
                                    <h6 class="text-left p-b-5"><span class="semi-bold">Click confirm to export all the LGAs to an excel file.</span></h6>
                                </div>
                                <div class="col-lg-12">
                                    <button type="button" v-if="!exportLoading"  @click="exportLGAs()" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Confirm</button>
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
                        <h3 class="text-primary no-margin pull-left sm-pull-reset">LGA Management</h3>
                        <div class="pull-right sm-pull-reset">
                            <nuxt-link :to="'/get-started/states/' + routeId" > <button type="button" class="btn btn-primary btn-sm"> <i class="fa fa-step-backward" aria-hidden="true"></i></button>&nbsp;&nbsp;</nuxt-link>
                            <button v-permission="'View lga'" type="button" @click="refresh()" class="btn btn-success btn-sm"><i class="fa fa-refresh"></i>&nbsp; Refresh </button>
                            <button v-permission="'Add lga'" type="button" class="btn btn-primary btn-sm" data-target="#add_lga" data-toggle="modal"><i class="fa fa-plus"></i> &nbsp; <strong>Add New LGA</strong></button>
                            <button v-permission="'Upload lga'" type="button" class="btn btn-warning btn-sm" data-target="#upload_lga" data-toggle="modal"><i class="fa fa-arrow-up"></i> &nbsp; <strong>Upload LGAs</strong></button>
                            <button v-permission="'Export lga'" type="button" class="btn btn-success btn-sm" data-target="#export_lgas" data-toggle="modal"><i class="fa fa-file-excel-o"></i> &nbsp; <strong>Export to Excel</strong></button>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="card-header">
                        <form @submit.prevent="searchLGA">
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
                                <thead style="text-align:center">
                                <th style="width:20%">Country</th>
                                <th style="width:20%">State</th>
                                <th style="width:20%">Name</th>
                                <th style="width:20%">Code</th>
                                
                                <th style="width:20%">Action</th>
                                </thead>
                                <tbody style="text-align:center">
                                    <tr v-if="getloading">
                                    <td colspan="4">Loading....Please wait.</td>
                                </tr>
                                <tr v-if="!getloading && lgas.length < 1 && IsPermitted">
                                    <td colspan="4">No record at the moment</td>
                                </tr>
                                <tr v-if="!IsPermitted">
                                    <td colspan="6" style="color: red; font-size:18px;"><i class="fa fa-warning"></i>&nbsp; Not Permitted to view this records!</td>
                                </tr>
                                <tr v-for="lga in lgas" :key="lga.id">                               
                                    <td v-if="lga.state != null">{{lga.state.country.name}}</td>       
                                    <td v-if="lga.state != null">{{lga.state.name}}</td>
                                    <td>{{lga.name}}</td>
                                    <td>{{lga.code}}</td>
                                    <td>
                                        <div class="btn-group">
                                            <span v-permission="'Edit lga'" data-placement="top" @click="populateFields(lga)" data-toggle="tooltip" title="Edit Record">
                                            <a href="#edit_lga"  class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-pencil"></i></a>
                                            </span>
                                            <span v-permission="'Delete lga'" data-placement="top" @click="setId(lga.id)" data-toggle="tooltip" title="Delete Record">
                                            <a href="#delete_lga"  class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="pg-trash"></i></a>              
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <Pagination
                            v-bind:pagination="pagination"
                            v-on:click.native="getLGAsByStateId(pagination.current_page)"
                            :offset="4">
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END CONTAINER FLUID -->
        </div>
        <!-- END PAGE CONTENT -->
        <!-- START COPYRIGHT -->
        <!-- END COPYRIGHT -->
          
      
    </div>
</template>
<script>
import Pagination from '~/components/Pagination'
export default {
  name: "LGAs",
  layout: "main",
  middleware: "auth",
  components: {
    Pagination
  },
  data(){
      return {
          pagination: {
            total: 0,
            per_page: 2,
            from: 1,
            to: 0,
            current_page: 1
        },
        lgas: [],
        routeId: 0,
        loading: false,
        getloading: false,
        exportLoading: false,
        IsPermitted: true,
        deleteLoading: false,
        editLoading: false,
        downloading: false,
        states: [],
        searchItem: "",
        file: "",
        model: {
          name: "",
          id: 0,
          abbreviation: "",
          phone_code: "",
          currency: "",
          capital: "",
          edit_abbreviation: "",
          edit_capital: "",
          edit_name: "",
          edit_phone_code: "",
          edit_lga_id: 0,
          edit_currency: ""
        }
      }
  },

  methods:{
      uploadLGAs(){
        this.loading = true
        this.file = this.$refs.myFiles.files[0];
        let formData = new FormData();
        formData.append('file', this.file);
          this.$store
            .dispatch('get-started/uploadLGAs', formData)
            .then(res => {
            if(res != undefined){
                if(res.status == true){
                    this.loading = false
                    this.getLGAsByStateId()
                    $('#upload_lga').modal('hide').data( 'bs.modal', null )          
                    this.$toast.success(res.message, {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});  
                }else{
                    this.loading = false
                    $('#upload_lga').modal('hide').data( 'bs.modal', null )  
                    this.$toast.error('Error uploading, Contact Admin', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});  
                    
                }
            }else{
                this.loading = false
                $('#upload_lga').modal('hide').data( 'bs.modal', null )  
                this.$toast.error('Error uploading, Contact Admin', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});  
            }      
        }).catch(err => {
          this.loading = false
        })
    },
    refresh(){
        this.searchItem = ""
        this.lgas = []
        this.getLGAsByStateId()
    },
    searchLGA(){
          this.$store
            .dispatch('get-started/searchLGA', this.searchItem)
            .then(res => {
            if(res != undefined){
                if(res.status == true){
                    this.lgas = res.data.data
                    this.pagination = res.data
                }else{
                }
            }else{
            }
        }).catch(err => {
        })
    },
    downloadLGASampleFile(){
        this.downloading = true
          this.$store
            .dispatch('get-started/downloadLGASampleFile')
            .then(res => {
            if(res != undefined){     
                if(res.success == true)    {
                    window.location = res.message
                    this.downloading = false
                    $('#upload_lga').modal('hide').data( 'bs.modal', null )          
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
    exportLGAs(){
        this.exportLoading = true
          this.$store
            .dispatch('get-started/exportLGAs')
            .then(res => {
            if(res != undefined){         
                this.loading = false
                var fileURL = window.URL.createObjectURL(new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}));
                var fileLink = document.createElement('a');

                fileLink.href = fileURL;
                fileLink.setAttribute('download', 'lgas.xlsx');
                document.body.appendChild(fileLink);

                fileLink.click();   
                this.exportLoading = false 
                $( '#export_lgas' ).modal( 'hide' ).data( 'bs.modal', null )
                this.$toast.success('Record Exported to Excel Successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});      
            }else{
                this.exportLoading = false 
                alert("File Downloaded Unsuccessful")
            }      
        }).catch(err => {
          this.exportLoading = false 
        })
    },
    deleteLGA(){   
          this.deleteLoading = true
          this.$store
            .dispatch('get-started/deleteLGA', this.model.id)
            .then(res => {
            if(res != undefined){
                if(res.success == true){
                this.deleteLoading = false
                this.getLGAsByStateId()
                $( '#delete_lga' ).modal( 'hide' ).data( 'bs.modal', null );  
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
    submitEditedLGA(){
        this.editLoading = true
        let bodyFormData = new Object();
        bodyFormData.name = this.model.edit_name
        bodyFormData.code = this.model.edit_abbreviation
        bodyFormData.id = this.model.edit_lga_id
        bodyFormData.country_id = (this.$route.params.id).split('_')[1]
        bodyFormData.state_id = (this.$route.params.id).split('_')[0]
        this.$store
        .dispatch('get-started/updateLGA', bodyFormData)
        .then(res => {
            if(res != undefined){
            if(res.success == true){
                this.editLoading = false
                this.getLGAsByStateId()
                $('#edit_lga').modal('hide').data( 'bs.modal', null )          
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
    populateFields(lga){
        this.model.edit_lga_id = lga.id
        this.model.edit_abbreviation = lga.code
        this.model.edit_name = lga.name
    },
    setId(id){
        this.model.id = id
    },
    createLGA(){
        this.loading = true
        let countryId = (this.$route.params.id).split('_')[1]
        let stateId = (this.$route.params.id).split('_')[0]
        let bodyFormData = new FormData();
        bodyFormData.set('country_id', countryId)
        bodyFormData.set('state_id', stateId)
        bodyFormData.set('name', this.model.name)
        bodyFormData.set('code', this.model.abbreviation)
        this.$store
            .dispatch('get-started/createLGA', bodyFormData)
            .then(res => {
            if(res != undefined){
                if(res.success == true){
                    this.getLGAsByStateId()
                    this.loading = false
                    $('#add_lga').modal('hide').data( 'bs.modal', null ) 
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
    getLGAsByStateId(){
        if(this.$laravel.hasPermission('View lga')){
            this.getloading = true
            let stateId = (this.$route.params.id).split('_')[0]
            let payload = {}
            payload.current_page = this.pagination.current_page
            payload.stateId = stateId
                this.$store
                    .dispatch('lgas/getLGAsByStateId', payload)
                    .then(res => {
                    if(res != undefined){
                        if(res.success == true){             
                            this.lgas = res.data.data
                            this.getloading = false
                            this.pagination = res.data
                        }else{
                            this.getloading = false
                            this.ErrMsg = "Error Logging in!"
                        }
                    }else{
                        this.getloading = false
                        this.ErrMsg = "Error Logging in!"
                    }      
            }).catch(err => {
                this.getloading = false
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
      this.getLGAsByStateId()
      this.routeId = (this.$route.params.id).split("_")[1]
      if (!process.server) {
        const script1 = document.createElement('script')       
        script1.type = 'text/javascript'
        script1.src = '/pages/js/pages.min.js'        

        document.head.appendChild(script1)        
      }
    }
}
</script>
<style scoped>
    .breadcrumb {
    background-color: #ffffff !important;;
}
</style>