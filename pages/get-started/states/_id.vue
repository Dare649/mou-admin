<template>
    <div>
      <!-- Add Faculty Modal -->
      <div class="modal fade SlideUp" id="add_state" tabindex="-1" role="dialog" aria-hidden="true">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
              <i class="pg-close"></i>
          </button>
          <div class="modal-dialog modal-lg">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="text-left p-b-5"><span class="semi-bold">Add New State</span></h5>
                  </div>
                  <div class="modal-body">
                      <div class="row">
                          <div class="col-lg-12 m-b-10">
                              <input type="text" placeholder="State Name" v-model="model.name" class="form-control input-lg" id="icon-filter" name="icon-filter">
                          </div>
                          <div class="col-lg-12 m-b-10">
                              <input type="text" placeholder="State Abbreviation" v-model="model.abbreviation" class="form-control input-lg" id="icon-filter" name="icon-filter">
                          </div>
                          <div class="col-lg-12">
                              <button type="button" v-if="!loading" @click="createState()" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Add Record</button>
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
                <div class="modal fade SlideUp" id="delete_state" tabindex="-1" role="dialog" aria-hidden="true">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        <i class="pg-close"></i>
                    </button>
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="text-left p-b-5"><span class="semi-bold">Delete State Information</span></h5>
                            </div>
                            <div class="modal-body">
                                <form class="full-width" @submit.prevent="deleteState">
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

      <!-- Upload Faculty Modal -->
      <div class="modal fade SlideUp" id="upload_state" tabindex="-1" role="dialog" aria-hidden="true">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
              <i class="pg-close"></i>
          </button>
          <div class="modal-dialog modal-lg">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="text-left p-b-5"><span class="semi-bold">Upload States</span></h5>
                  </div>
                  <div class="modal-body">
                      <div class="row">
                          <div class="col-lg-12 m-b-10">
                              <input type="text" placeholder="File Caption" class="form-control input-lg" id="icon-filter" name="icon-filter">
                          </div>
                          <div class="col-lg-12 m-b-10">
                              <div class="custom-file">
                                  <input type="file" ref="myFiles" class="custom-file-input" id="customFileLang" lang="es">
                                  <label class="custom-file-label" for="customFileLang">Select File</label>
                              </div>
                          </div>
                          <div class="col-lg-12">
                              <button type="button" @click="uploadStates" v-if="!loading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Upload Record</button>
                              <button type="button" disabled v-if="loading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Uploading</button>
                          </div>
                          <div class="col-lg-12 m-t-15">
                              <div class="dd-placeholder p-1">
                                  <h5 class="pull-left sm-pull-reset"><i class="fa fa-file-excel-o p-l-10"></i> Sample File</h5>
                                  <button v-if="!downloading" @click="downloadStateSampleFile()" class="pull-right sm-pull-reset btn btn-default m-t-5 m-r-10"><i class="fa fa-arrow-down"></i> &nbsp; Download</button>
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

      <!-- Edit Country Modal -->
<div class="modal fade SlideUp" id="edit_state" tabindex="-1" role="dialog" aria-hidden="true">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        <i class="pg-close"></i>
    </button>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="text-left p-b-5"><span class="semi-bold">Edit State Information</span></h5>
            </div>
            <div class="modal-body">
                <form class="full-width" @submit.prevent="submitEditedState">
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
      
              <!-- START PAGE CONTENT -->
              <div class="content sm-gutter">
                  <!-- START BREADCRUMBS -->
                  <div class="bg-white">
                      <div class="container p-l-5">
                          <ol class="breadcrumb breadcrumb-alt">
                              <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                              <li class="breadcrumb-item"><a href="#">Get Started</a></li>
                              <li class="breadcrumb-item active">States</li>
                          </ol>
                      </div>
                  </div>
                  <!-- END BREADCRUMBS -->
                  <!-- Export Countries Modal -->
                    <div class="modal fade SlideUp" id="export_states" tabindex="-1" role="dialog" aria-hidden="true">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            <i class="pg-close"></i>
                        </button>
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="text-left p-b-5"><span class="semi-bold">Export Countries</span></h5>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <h6 class="text-left p-b-5"><span class="semi-bold">Click confirm to export all the states to an excel file.</span></h6>
                                        </div>
                                        <div class="col-lg-12">
                                            <button type="button" v-if="!exportLoading"  @click="exportStates()" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Confirm</button>
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
                              <h3 class="text-primary no-margin pull-left sm-pull-reset">State Management</h3>
                              <div class="pull-right sm-pull-reset">
                                  <nuxt-link to="/get-started/countries"> <i style='font-size:24px' class="fa fa-undo"></i>&nbsp;&nbsp;&nbsp;</nuxt-link>
                                  <button type="button" class="btn btn-primary btn-sm" data-target="#add_state" data-toggle="modal"><i class="fa fa-plus"></i> &nbsp; <strong>Add New State</strong></button>
                                  <button type="button" class="btn btn-warning btn-sm" data-target="#upload_state" data-toggle="modal"><i class="fa fa-arrow-up"></i> &nbsp; <strong>Upload States</strong></button>
                                  <button type="button" class="btn btn-success btn-sm" data-target="#export_states" data-toggle="modal"><i class="fa fa-file-excel-o"></i> &nbsp; <strong>Export to Excel</strong></button>
                              </div>
                              <div class="clearfix"></div>
                          </div>
                          <div class="card-body">
                              <b-row>
                                <b-col lg="6" class="my-1">
                                        <b-form-group
                                        label="Filter"
                                        label-cols-sm="3"
                                        label-align-sm="right"
                                        label-size="sm"
                                        label-for="filterInput"
                                        class="mb-0"
                                        >
                                        <b-input-group size="lg">
                                            <b-form-input
                                            v-model="filter"
                                            type="search"
                                            id="filterInput"
                                            placeholder="Type to Search"
                                            >
                                        </b-form-input>                                        
                                        <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>                                          
                                        </b-input-group>
                                        </b-form-group>
                                    </b-col>

                                <b-col sm="5" md="6" class="my-1">
                                    <b-form-group
                                    label="Per page"
                                    label-cols-sm="6"
                                    label-cols-md="4"
                                    label-cols-lg="3"
                                    label-align-sm="right"
                                    label-size="sm"
                                    label-for="perPageSelect"
                                    class="mb-0"
                                    >
                                    <b-form-select
                                        v-model="perPage"
                                        id="perPageSelect"
                                        size="lg"
                                        :options="pageOptions"
                                    ></b-form-select>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-table
                                id="states-table"
                                :items="states"
                                :per-page="perPage"
                                :fields="fields"
                                @filtered="onFiltered"
                                :filter="filter"
                                :current-page="currentPage"
                                small
                            >
                            <template slot="country_id" slot-scope="data">
                                {{ data.item.country_id }}
                            </template>
                            <template slot="name" slot-scope="data">
                                {{ data.item.name }}
                            </template>
                            
                            <template slot="code" slot-scope="data">
                                {{ data.item.code }}
                            </template>
                            <template slot="flag" slot-scope="data">
                                {{ data.item.flag }}
                            </template>
                            <template slot="created_at" slot-scope="data">
                                {{ $moment(data.item.created_at).format('yyyy-MM-DD') }}
                            </template>
                            <template slot="actions" slot-scope="data">
                                    <span data-placement="top" data-toggle="tooltip" title="Link to LGAs">
                                            <nuxt-link :to="'/get-started/lgas/' + data.item.id +'_'+data.item.country_id"> <button type="button" class="btn btn-default btn-sm"><i class="fa fa-link"></i></button></nuxt-link>
                                            </span>
                                            <span data-placement="top" @click="populateFields(data.item)" data-toggle="tooltip" title="Edit Record">
                                                <a href="#edit_state"  class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-pencil"></i></a>
                                            </span>
                                            <span data-placement="top" @click="setId(data.item.id)" data-toggle="tooltip" title="Delete Record">
                                                <a href="#delete_state"  class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="pg-trash"></i></a>              
                                            </span>
                            </template>
                            </b-table>
                            <b-pagination
                                v-model="currentPage"
                                :total-rows="rows"
                                :per-page="perPage"
                                first-text="First"
                                prev-text="Prev"
                                next-text="Next"
                                last-text="Last"
                                aria-controls="states-table"
                            ></b-pagination>
                              <!-- <div class="table-responsive">
                                  <table class="table table-striped table-condensed" id="basicTable">
                                      <thead>
                                          <th style="width:30%">Country Name</th>
                                          <th style="width:30%">State Name</th>
                                        <th style="width:20%">State Abbreviation</th>                                        
                                        <th style="width:20%">Action</th>
                                      </thead>
                                      <tbody>
                                      <tr v-for="state in states" :key="state.id">
                                          <td>{{state.country_id}}</td>
                                          <td>{{state.name}}</td>
                                          <td>{{state.code}}</td>                                     
                                          <td>
                                              <div class="btn-group">
                                                  <span data-placement="top" data-toggle="tooltip" title="Link to LGAs">
                                                    <nuxt-link :to="'/get-started/lgas/' + state.id +'_'+state.country_id"> <button type="button" class="btn btn-default btn-sm"><i class="fa fa-link"></i></button></nuxt-link>
                                                  </span>
                                                  <span data-placement="top" @click="populateFields(state)" data-toggle="tooltip" title="Edit Record">
                                                    <a href="#edit_state"  class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-pencil"></i></a>
                                                  </span>
                                                  <span data-placement="top" @click="setId(state.id)" data-toggle="tooltip" title="Delete Record">
                                                    <a href="#delete_state"  class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="pg-trash"></i></a>              
                                                  </span>
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
                      </div> -->
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
export default {
  name: "States",
  layout: "main",
  middleware: "auth",
  components: {
    
  },
  methods: {
    submitEditedState(){
        this.editLoading = true
        let bodyFormData = new Object();
        bodyFormData.name = this.model.edit_name
        bodyFormData.code = this.model.edit_abbreviation
        bodyFormData.id = this.model.edit_state_id
        bodyFormData.country_id = this.$route.params.id
        this.$store
        .dispatch('get-started/updateState', bodyFormData)
        .then(res => {
          if(res != undefined){
            if(res.success == true){
                this.editLoading = false
                this.getStatesByCountryId()
                $('#edit_state').modal('hide').data( 'bs.modal', null )          
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
    populateFields(state){
          this.model.edit_state_id = state.id
          this.model.edit_abbreviation = state.code
          this.model.edit_name = state.name
    },
    downloadStateSampleFile(){
        this.downloading = true
          this.$store
            .dispatch('get-started/downloadStateSampleFile')
            .then(res => {
            if(res != undefined){     
                if(res.success == true)    {
                    window.location = res.message
                    this.downloading = false
                    $('#upload_state').modal('hide').data( 'bs.modal', null )          
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
    uploadStates(){
        this.loading = true
        this.file = this.$refs.myFiles.files[0];
        let formData = new FormData();
        formData.append('file', this.file);
          this.$store
            .dispatch('get-started/uploadStates', formData)
            .then(res => {
            if(res != undefined){
                if(res.status == true){
                    this.loading = false
                    this.getCountries()
                    $('#upload_state').modal('hide').data( 'bs.modal', null )          
                    this.$toast.success(res.message, {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});  
                }else{
                    this.loading = false
                    $('#upload_state').modal('hide').data( 'bs.modal', null )  
                    this.$toast.error('Error uploading, Contact Admin', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});  
                    
                }
            }else{
                this.loading = false
                $('#upload_state').modal('hide').data( 'bs.modal', null )  
                this.$toast.error('Error uploading, Contact Admin', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});  
            }      
        }).catch(err => {
          this.loading = false
        })
    },
    getStatesByCountryId() {
      let countryId = this.$route.params.id
      this.$store
            .dispatch('get-started/getStatesByCountryId', countryId)
            .then(res => {
            if(res != undefined){
                if(res.success == true){              
                    this.states = res.data
                    this.loading = false
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
    exportStates(){
        this.exportLoading = true
          this.$store
            .dispatch('get-started/exportStates')
            .then(res => {
            if(res != undefined){         
                this.loading = false
                var fileURL = window.URL.createObjectURL(new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}));
                var fileLink = document.createElement('a');

                fileLink.href = fileURL;
                fileLink.setAttribute('download', 'states.xlsx');
                document.body.appendChild(fileLink);

                fileLink.click();   
                this.exportLoading = false 
                $( '#export_states' ).modal( 'hide' ).data( 'bs.modal', null )
                this.$toast.success('Record Exported to Excel Successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});      
            }else{
                this.exportLoading = false 
                alert("File Downloaded Unsuccessful")
            }      
        }).catch(err => {
          this.exportLoading = false 
        })
    },
    setId(id){
        this.model.id = id
    },
    onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
    deleteState(){   
          this.deleteLoading = true
          this.$store
            .dispatch('get-started/deleteState', this.model.id)
            .then(res => {
            if(res != undefined){
                if(res.success == true){
                this.deleteLoading = false
                this.getStatesByCountryId()
                $( '#delete_state' ).modal( 'hide' ).data( 'bs.modal', null );  
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
    createState(){
        this.loading = true
        let countryId = this.$route.params.id
        let bodyFormData = new FormData();
        bodyFormData.set('country_id', countryId)
        bodyFormData.set('name', this.model.name)
        bodyFormData.set('code', this.model.abbreviation)
        this.$store
        .dispatch('get-started/createState', bodyFormData)
        .then(res => {
          if(res != undefined){
            if(res.success == true){
                this.getStatesByCountryId()
                this.loading = false
                $('#add_state').modal('hide').data( 'bs.modal', null ) 
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
    }
  },
   computed: {
      rows() {
        return this.states.length
      }
    },
  data() {
      return { 
        perPage: 5,
        pageOptions: [5, 10, 15],
        currentPage: 1,
        filterOn: [],
        filter: null,
        fields: [
            {
                key: 'country_id'          
            },
            {
                key: 'name',
                sortable: true
            },
            {
                key: 'code'
            },
            {
                key: 'flag'
            },
            {
                key: 'created_at',
                sortable: true
            },
            {
                key: 'actions'
            },
        ],
        loading: false,
        downloading: false,
        exportLoading: false,
        deleteLoading: false,
        editLoading: false,
        states: [],
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
          edit_country_id: 0,
          edit_currency: ""
        },
      }
    },
  mounted: function() {
      this.getStatesByCountryId()
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