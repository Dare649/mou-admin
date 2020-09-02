<template>
  <div>

    <div class="modal fade SlideUp" id="add_school_fees" tabindex="-1" role="dialog" aria-hidden="true">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        <i class="pg-close"></i>
      </button>
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="text-left p-b-5"><span class="semi-bold">School Fees Setup - {{programName}}</span></h5>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-lg-12 m-b-10">
                <input type="text" class="form-control" v-model="formData.name" placeholder="Fee Caption" />
              </div>
              <div class="col-lg-6 m-b-10">
                <select class="form-control" v-model="formData.entry_mode">
                  <option value="" selected>Entry Mode</option>
                  <option value="PUTME">PUTME</option>
                  <option value="DE">Direct Entry</option>
                </select>
              </div>
              <!-- <div class="col-lg-6 m-b-10">
                <select class="form-control" v-model="formData.academic_session">
                  <option value="" selected>Select Academic Session</option>
                  <option v-for="session in add_sessions"  :key="session.id" :value="session.id">
                    {{ (formData.entry_mode === 'putme') ? session.session_name : session.de_session_name }}
                  </option>
                </select>
              </div> -->
              <!-- <div class="col-lg-6 m-b-10">
                <input type="text" class="form-control" v-model="formData.name" placeholder="Fee Caption" />
              </div> -->
              <div class="col-lg-6 m-b-10">
                <input type="text" class="form-control" v-model="formData.school_fees_amount" placeholder="School Fees Amount" />
              </div>
              <div class="col-lg-6 m-b-10">
                <input type="text" class="form-control" v-model="formData.returning_school_fees_amount" placeholder="School Fees Amount Returning " />
              </div>
              <div class="col-lg-6 m-b-10">
                <input type="text" class="form-control" v-model="formData.new_hostel_fees" placeholder="New Hostel Fees" />
              </div>
              <div class="col-lg-6 m-b-10">
                <input type="text" class="form-control" v-model="formData.old_hostel_fees" placeholder="Old Hostel Fees" />
              </div>
              <div class="col-lg-6 m-b-10">
                <input type="text" class="form-control" v-model="formData.extra_year_fees" placeholder="Extra Year Fees" />
              </div>
              <div class="col-lg-6 m-b-10">
                <select class="form-control" v-model="formData.level">
                  <option value="" selected>Level</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="400">400</option>
                </select>
              </div>
              <div class="col-lg-6 m-b-10">
                <select class="form-control" v-model="formData.semester">
                  <option value="" selected>Semester</option>
                  <option value="1">1st Semester</option>
                  <option value="2">2nd Semester</option>
                </select>
              </div>

            </div>
            <hr />
            <div class="row">
              <div class="col-lg-12">
                <button type="button" v-if="!aLoading" @click="addNewSchoolFeeSetUp()" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Save Record</button>
                <button type="button" v-if="aLoading" disabled class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Saving Record</button>
              </div>
            </div>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>

        <!-- Edit Program Modal -->
        <div class="modal fade SlideUp" id="edit_school_fee" tabindex="-1" role="dialog" aria-hidden="true">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                <i class="pg-close"></i>
            </button>
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="text-left p-b-5"><span class="semi-bold">Edit School Fee Information</span></h5>
                    </div>
                    <div class="modal-body">
                        <form class="full-width" @submit.prevent="submitEditedSchoolFee">
                            <div class="row">
                                <div class="col-lg-12 m-b-10">
                                  <input type="text" class="form-control" v-model="formData.edit_name" placeholder="Fee Caption" />
                                </div>
                                <div class="col-lg-6 m-b-10">
                                  <select class="form-control" v-model="formData.edit_entry_mode">
                                    <option value="" selected>Entry Mode</option>
                                    <option value="PUTME">PUTME</option>
                                    <option value="DE">Direct Entry</option>
                                  </select>
                                </div>
                                <!-- <div class="col-lg-6 m-b-10">
                                  <select class="form-control" v-model="formData.academic_session">
                                    <option value="" selected>Select Academic Session</option>
                                    <option v-for="session in add_sessions"  :key="session.id" :value="session.id">
                                      {{ (formData.edit_entry_mode === 'putme') ? session.session_name : session.de_session_name }}
                                    </option>
                                  </select>
                                </div> -->

                                <div class="col-lg-6 m-b-10">
                                  <input type="text" class="form-control" v-model="formData.edit_school_fees_amount" placeholder="School Fees Amount" />
                                </div>
                                <div class="col-lg-6 m-b-10">
                                  <input type="text" class="form-control" v-model="formData.edit_returning_school_fees_amount" placeholder="School Fees Amount Returning " />
                                </div>
                                <div class="col-lg-6 m-b-10">
                                  <input type="text" class="form-control" v-model="formData.edit_new_hostel_fees" placeholder="New Hostel Fees" />
                                </div>
                                <div class="col-lg-6 m-b-10">
                                  <input type="text" class="form-control" v-model="formData.edit_old_hostel_fees" placeholder="Old Hostel Fees" />
                                </div>
                                <div class="col-lg-6 m-b-10">
                                  <input type="text" class="form-control" v-model="formData.edit_extra_year_fees" placeholder="Extra Year Fees" />
                                </div>
                                <div class="col-lg-6 m-b-10">
                                  <select class="form-control" v-model="formData.edit_level">
                                    <option value="" selected>Level</option>
                                    <option value="100">100</option>
                                    <option value="200">200</option>
                                    <option value="300">300</option>
                                    <option value="400">400</option>
                                  </select>
                                </div>
                                <div class="col-lg-6 m-b-10">
                                  <select class="form-control" v-model="formData.edit_semester">
                                    <option value="" selected>Semester</option>
                                    <option value="1">1st Semester</option>
                                    <option value="2">2nd Semester</option>
                                  </select>
                                </div>

                              </div>
                            <div class="col-lg-12 m-t-10">
                                <button type="submit" v-if="!eLoading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Save Changes</button>
                                <button type="submit" v-if="eLoading" disabled class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Submitting</button>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!-- Audit Trail -->
        <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0" v-if="importResponse.success">
            <div class="card card-default">
                <div class="card-body">
                    <div class="alert alert-danger" v-if="importResponse.errors.length > 0">
                        <strong>The Following Errors Occurred:</strong>
                        <p>
                            <ul v-for="item in importResponse.errors" :key="importResponse[item]">
                                <li>Row: {{item.row}} ---- <span>Attribute: {{item.attribute}}</span> ---- <span >Messages: {{item.message}}</span></li>
                            </ul>
                            <a :href="importResponse.error_file" target="_blank" download>Click here to download error file</a>
                        </p>
                    </div>
                    <div class="alert alert-success">
                        <strong>Audit Trail Performed.</strong>
                        <p>File Successfully Imported. {{importResponse.count}} Records Imported</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade SlideUp" id="view_school_fee_details" tabindex="-1" role="dialog" aria-hidden="true">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                  <i class="pg-close"></i>
              </button>
              <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="text-left p-b-5"><span class="semi-bold">VIEW SCHOOL FEE DETAILS</span></h5>
                      </div>
                      <div class="modal-body jamb_view">                      
                          <table class="table table-striped table-bordered">
                          <tr>
                              <th>Caption Name:</th>
                              <td v-if="feeDetails.fee_caption">{{feeDetails.fee_caption.toUpperCase()}}</td>
                          </tr>
                          <tr>
                              <th>Entry Mode:</th>
                              <td v-if="feeDetails.entry_mode">{{feeDetails.entry_mode.toUpperCase()}}</td>
                          </tr>
                          <tr>
                              <th>Amount:</th>
                              <td v-if="feeDetails.amount">&#8358; {{ numberWithCommas(feeDetails.amount) }}</td>
                          </tr>
                          <tr>
                              <th>Returning Amount:</th>
                              <td v-if="feeDetails.returning_amount">&#8358; {{ numberWithCommas(feeDetails.returning_amount) }}</td>
                          </tr>
                          <tr>
                              <th>New Hostel Fee:</th>
                              <td v-if="feeDetails.with_new_hostel">&#8358; {{ numberWithCommas(feeDetails.with_new_hostel) }}</td>
                          </tr>
                          <tr>
                              <th>Old Hostel Fee:</th>
                              <td v-if="feeDetails.with_old_hostel">&#8358; {{ numberWithCommas(feeDetails.with_old_hostel) }}</td>
                          </tr>
                          <tr>
                              <th>Extra Year:</th>
                              <td v-if="feeDetails.extra_year">&#8358; {{ numberWithCommas(feeDetails.extra_year) }}</td>
                          </tr>
                          <tr>
                              <th>Level:</th>
                              <td>{{ feeDetails.level }}</td>
                          </tr>
                          <tr>
                              <th>Semester:</th>
                              <td >{{ (feeDetails.semester == 1) ? "First Semester" :  "Second Semester" }}</td>
                          </tr>
                          </table>
                      </div>
                  </div>
              </div>
        </div>
        <!-- Delete Record Modal -->
        <div class="modal fade SlideUp" id="delete_details" tabindex="-1" role="dialog" aria-hidden="true">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                <i class="pg-close"></i>
            </button>
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="text-left p-b-5"><span class="semi-bold">Delete School Fee Information</span></h5>
                    </div>
                    <div class="modal-body">
                        <form class="full-width" @submit.prevent="deleteSchoolFee">
                            <div class="row">
                                <h5 class="text-left p-b-5"><span class="semi-bold">Are you sure you want to delete this record?</span></h5>
                                <div class="col-lg-12 m-t-10">
                                    <button type="submit" v-if="!dLoading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Confirm</button>
                                    <button type="submit" v-if="dLoading" disabled class="btn btn-primary btn-lg btn-large fs-16 semi-bold"><i class="fa fa-delete"></i>Deleting</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
    <div class="modal fade SlideUp" id="import_school_fees" tabindex="-1" role="dialog" aria-hidden="true">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        <i class="pg-close"></i>
      </button>
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="text-left p-b-5"><span class="semi-bold">IMPORT SCHOOL FEES - {{programName}}</span></h5>
          </div>
          <div class="modal-body">
            <div class="row">
              <!-- <div class="col-lg-6 m-b-10">
                <select class="form-control" @change="getSession($event)" v-model="importData.entry_mode">
                  <option value="" selected>Entry Mode</option>
                  <option value="putme">PUTME</option>
                  <option value="direct-entry">Direct Entry</option>
                </select>
              </div> -->
              <!-- <div class="col-lg-6 m-b-10">
                <select class="form-control" v-model="importData.academic_session">
                  <option value="" selected>Select Academic Session</option>
                  <option v-for="session in sessions" :key="session.id" :value="session.id">
                    {{ (importData.entry_mode === 'putme') ? session.session_name : session.de_session_name }}
                  </option>
                </select>
              </div> -->
              <div class="col-lg-12 m-b-10">
                <input type="file" class="form-control" ref="myFiles" id="customFileLang" lang="es" />
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-lg-6">
                <button type="button"  @click="uploadSchoolFees()" v-if="!uLoading" class="btn btn-primary m-t-5 m-r-10">Import Record</button>
                <button type="button"  disabled v-if="uLoading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Uploading</button>
              </div>
              <div class="col-lg-6">
                <button v-if="!downloading" @click="downloadSchoolFeesSampleFile()" class="pull-right sm-pull-reset btn btn-default m-t-5 m-r-10">
                  <i class="fa fa-arrow-down"></i> &nbsp; Download Sample
                </button>
                <button disabled v-if="downloading" class="pull-right sm-pull-reset btn btn-default m-t-5 m-r-10"><i class="fa fa-arrow-down"></i>&nbsp; Downloading</button>
              </div>
            </div>
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
            <li class="breadcrumb-item"><nuxt-link :to="'/get-started/departments/'" >Departments</nuxt-link></li>
            <li class="breadcrumb-item">Programs</li>
            <li class="breadcrumb-item active">School Fees Setup - {{ programName }}</li>
          </ol>
        </div>
      </div>
      <!-- END BREADCRUMBS -->

      <!-- START CONTAINER FLUID -->
      <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
        <div class="card card-default">
          <div class="card-header">
            <div class="card-title text-primary">Search Record</div>
          </div>
          <div class="card-body">
            <form style="width: 100%">
              <div class="row">
                <div class="col-md-5">
                  <input type="text" class="form-control" v-model="formData.search_fee_caption" placeholder="Fees caption" />
                </div>
                <div class="col-md-5">
                  <select class="form-control" v-model="formData.search_entry_mode">
                    <option value="" selected>Entry mode</option>
                    <option value="PUTME">PUTME</option>
                    <option value="DE">Direct Entry</option>
                  </select>
                </div>
                <div class="col-md-2">
                  <button type="button" @click="search()" class="btn btn-primary btn-block">Search Record</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="card card-default">
          <div class="card-header">
            <h3 class="text-primary no-margin pull-left sm-pull-reset">School Fees Setup - {{ programName }}</h3>
            <div class="pull-right sm-pull-reset">
              <nuxt-link :to="'/get-started/program/'" > <button type="button" class="btn btn-primary btn-sm"> <i class="fa fa-step-backward" aria-hidden="true"></i></button>&nbsp;&nbsp;</nuxt-link>
              <button v-permission="'View School Fee'" type="button" @click="refresh()" class="btn btn-success btn-sm"><i class="fa fa-refresh"></i>&nbsp; Refresh </button>
              <span @click="setProgramName()">
                <button type="button" class="btn btn-primary btn-sm" data-target="#add_school_fees" data-toggle="modal"><i class="fa fa-plus"></i>&nbsp;<strong>New School Fees Setup</strong></button>
              </span>
              <button type="button" class="btn btn-warning btn-sm" data-target="#import_school_fees" data-toggle="modal"><i class="fa fa-upload"></i>&nbsp;<strong>Import School Fees</strong></button>
              <button type="button" v-if="!exLoading" @click="exportSchoolFee()" v-permission="'Export School Fee'" class="btn btn-dark btn-sm" data-toggle="modal"><i class="fa fa-download"></i>&nbsp;<strong>Export Record</strong></button>
              <button type="button" disabled v-if="exLoading" class="btn btn-dark btn-sm" data-toggle="modal"><i class="fa fa-download"></i>&nbsp;<strong>Exporting...</strong></button>
            </div>
            <div class="clearfix"></div>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-striped table-condensed" id="basicTable">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Amount(&#8358;) </th>
                    <th>Returning(&#8358;)</th>
                    <th>New hostel(&#8358;)</th>
                    <th>Old hostel(&#8358;)</th>
                    <th>Level</th>
                    <th style="width: 17%;">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="loading">
                    <td colspan="7">Loading....please wait</td>
                  </tr>
                  <tr v-if="!loading && setups.length <= 0">
                    <td colspan="7">No record at the moment</td>
                  </tr>
                  <template v-if="!loading && setups.length > 0">
                    <tr v-for="setup in setups" :key="setup.id">
                      <td>{{setup.fee_caption}}</td>
                      <td>{{numberWithCommas(setup.amount)}}</td>
                      <td>{{numberWithCommas(setup.returning_amount)}}</td>
                      <td>{{numberWithCommas(setup.with_new_hostel)}}</td>
                      <td>{{numberWithCommas(setup.with_old_hostel)}}</td>
                      <td>{{setup.level}}</td>
                      <td>
                        <span @click="setViewDetails(setup)">
                          <a href="#view_school_fee_details" class="btn btn-default btn-sm" title="View details" role="button" data-toggle="modal"><i class="fa fa-eye"></i></a>
                        </span>
                        <span @click="setEditSchoolFee(setup)">
                          <a href="#edit_school_fee"  class="btn btn-default btn-sm" title="Edit details" role="button" data-toggle="modal"><i class="fa fa-pencil"></i></a>  
                        </span>
                        
                        <span v-permission="'Delete School Fee'" data-placement="top" data-toggle="tooltip" title="Delete Record">
                          <a href="#delete_details" @click="setId(setup.id)"  class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="pg-trash"></i></a>
                        </span>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
              <Pagination
                v-bind:pagination="pagination"
                v-on:click.native="getSchoolFeesById(pagination.current_page)"
                :offset="4">
              </Pagination>
            </div>
          </div>
        </div>
      </div>
      <!-- END CONTAINER FLUID -->
    </div>
  </div>
</template>
<script>
import Pagination from '~/components/Pagination'

export default {
  name: "schoolfees",
  layout: "main",
  components: {
    Pagination
  },
  data() {
    return {
      setups: [],
      loading: false,
      aLoading: false,
      eLoading: false,
      exLoading: false,
      dLoading: false,
      downloading: false,
      uLoading: false,
      importResponse: {},
      programName: '',
      feeDetails: {},
      sessions: [],
      file:'',
      pagination: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      importData: {
        entry_mode: '',
      },
      formData: {
        delete_id: 0,
        entry_mode: '',
        name: '',
        school_fees_amount: '',
        returning_school_fees_amount: '',
        new_hostel_fees: '',
        old_hostel_fees: '',
        extra_year_fees: '',
        level: '',
        semester: '',
        edit_id: 0,
        edit_entry_mode: '',
        edit_academic_session: '',
        edit_name: '',
        edit_school_fees_amount: '',
        edit_returning_school_fees_amount: '',
        edit_new_hostel_fees: '',
        edit_old_hostel_fees: '',
        edit_extra_year_fees: '',
        edit_level: '',
        edit_semester: '',
        search_fee_caption: '',
        search_entry_mode:''
      },
      id: '',
      details: {}
    }
  },
  methods: {
    refresh(){
        this.jamb_results = []
        this.formData.search_fee_caption = ""
        this.formData.search_entry_mode = ""
        this.getSchoolFeesById(1)
    },
    search(){
        this.getloading = true
        let payload = {}
        payload.fee_caption = this.formData.search_fee_caption
        payload.entry_mode = this.formData.search_entry_mode
          this.$store
            .dispatch('get-started/searchSchoolFee', payload)
            .then(res => {
            if(res != undefined){
                if(res.status){
                    this.getloading = false
                    this.setups = res.data.data
                    this.pagination = res.data
                }else{
                    this.getloading = false
                }
            }else{              
                this.getloading = false
            }
        }).catch(err => {
            this.getloading = false
        })
    },
    downloadSchoolFeesSampleFile(){
          this.downloading = true
          this.$store
            .dispatch('get-started/downloadSchoolFeesSampleFile')
            .then(res => {
            if(res !== undefined){
                if(res.success === true)    {
                    window.location = res.message
                    this.downloading = false
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
    uploadSchoolFees(){
        this.uLoading = true
        this.file = this.$refs.myFiles.files[0];
        let formData = new FormData();
        formData.append('file', this.file);
          this.$store
            .dispatch('get-started/uploadSchoolFees', formData)
            .then(res => {
                if(res.success === true){
                    this.uLoading = false
                    this.importResponse = res  
                    $('#import_school_fees').modal('hide').data( 'bs.modal', null )
                }else{
                    this.uLoading = false
                    alert("File Upload Unsuccessful!")
                    this.ErrMsg = "Error Logging in!"
                }
          
        }).catch(err => {
          this.uLoading = false
        })
    },
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    setViewDetails(details){
      this.feeDetails = details
    },
    exportSchoolFee(){
      this.exLoading = true
      this.$store
          .dispatch('get-started/exportSchoolFee')
              .then(res => {
              if(res != undefined){
                  this.exLoading = false
                  var fileURL = window.URL.createObjectURL(new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}));
                  var fileLink = document.createElement('a');
                  fileLink.href = fileURL;
                  fileLink.setAttribute('download', 'school_fee_setups.xlsx');
                  document.body.appendChild(fileLink);
                  fileLink.click();
                  this.exLoading = false
                  this.$toast.success('Record Exported to Excel Successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
              }else{
                  this.exLoading = false
                  alert("File Downloaded Unsuccessful")
              }
          }).catch(err => {
            this.exLoading = false
        })
    },
    deleteSchoolFee(){
      this.dLoading = true
        this.$store
            .dispatch('get-started/deleteSchoolFee', this.formData.delete_id)
            .then(res => {
                if(res.success){
                this.dLoading = false
                this.getSchoolFeesById()
                $( '#delete_details' ).modal( 'hide' ).data( 'bs.modal', null );
                  this.dLoading = false
                }else{
                  this.dLoading = false
                  this.ErrMsg = "Error Processing Request!"
                }
            }).catch(err => {
              this.dLoading = false
          })
    },
    setId(id){
      this.formData.delete_id = id
    },
    submitEditedSchoolFee(){
      this.eLoading = true
      let payload = {}
      let programId = (this.$route.params.id).split('_')[0]
      let bodyFormData = new FormData();
      bodyFormData.append('program_id', programId)
      bodyFormData.append('fee_caption', this.formData.edit_name)
      bodyFormData.append('amount', this.formData.edit_school_fees_amount)
      bodyFormData.append('returning_amount', this.formData.edit_returning_school_fees_amount)
      bodyFormData.append('with_new_hostel', this.formData.edit_new_hostel_fees)
      bodyFormData.append('with_old_hostel', this.formData.edit_old_hostel_fees)
      bodyFormData.append('extra_year', this.formData.edit_extra_year_fees)
      bodyFormData.append('level', this.formData.edit_level)
      bodyFormData.append('semester', this.formData.edit_semester)
      bodyFormData.append('entry_mode', this.formData.edit_entry_mode)
      bodyFormData.append('pg_mode', null)
      payload.id = this.formData.edit_id
      payload.bodyFormData = bodyFormData
      this.$store
        .dispatch('get-started/updateSchoolFee', payload)
        .then(res => {
          if(res.success){
              this.eLoading = false
              this.getSchoolFeesById()
              $('#edit_school_fee').modal('hide').data( 'bs.modal', null )
              this.$toast.success('Record Edited Successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true})
          }else{
            this.eLoading = false
            this.ErrMsg = "Error Processing Request!"
          }
      }).catch(err => {
          this.eLoading = false
      })
    },
    setEditSchoolFee(setup){
      this.formData.edit_entry_mode = setup.entry_mode
      this.formData.edit_academic_session = null
      this.formData.edit_name = setup.fee_caption
      this.formData.edit_school_fees_amount = setup.amount
      this.formData.edit_returning_school_fees_amount = setup.returning_amount
      this.formData.edit_new_hostel_fees = setup.with_new_hostel
      this.formData.edit_old_hostel_fees = setup.with_old_hostel
      this.formData.edit_extra_year_fees = setup.extra_year
      this.formData.edit_level = setup.level
      this.formData.edit_semester = setup.semester
      this.formData.edit_id = setup.id
    },
    setProgramName(){
      this.programName = (this.$route.params.id).split('_')[1]
    },
    getSchoolFeesById(page) {
      this.loading = true
      let programId = (this.$route.params.id).split('_')[0]
      let payload = {}
      payload.page = page
      payload.programId = programId
      this.$store
          .dispatch('get-started/getSchoolFeeByProgramId', payload)
          .then(res => {
              if(res.status == true){
                  this.setups = res.data.data
                  this.pagination = res.data
                  this.loading = false
              }else{
                  this.loading = false
                  this.ErrMsg = "Error Processing Request!"
              }
        }).catch(err => {
            this.loading = false
        })
    },
    getSession(e) {
      // let session = e.target.value
      // if(session === '') {
      //   this.sessions = []
      //   return
      // }
      this.$store.dispatch('academic-session/getSession', this.importData)
        .then(res =>{
          this.details = res.data.data
        }).catch(err =>{
          this.$toast.error(err)
      })
    },
    addNewSchoolFeeSetUp(){
            this.aLoading = true
            let programId = (this.$route.params.id).split('_')[0]
            let bodyFormData = new FormData();
            bodyFormData.set('program_id', programId)
            bodyFormData.set('fee_caption', this.formData.name)
            bodyFormData.set('amount', this.formData.school_fees_amount)
            bodyFormData.set('returning_amount', this.formData.returning_school_fees_amount)
            bodyFormData.set('with_new_hostel', this.formData.new_hostel_fees)
            bodyFormData.set('with_old_hostel', this.formData.old_hostel_fees)
            bodyFormData.set('extra_year', this.formData.extra_year_fees)
            bodyFormData.set('level', this.formData.level)
            bodyFormData.set('semester', this.formData.semester)
            bodyFormData.set('entry_mode', this.formData.entry_mode)
            bodyFormData.set('pg_mode', null)
            this.$store
              .dispatch('get-started/createSchoolFee', bodyFormData)
              .then(res => {
                if(res.success){
                    this.getSchoolFeesById(1)
                    this.aLoading = false
                    $('#add_school_fees').modal('hide').data( 'bs.modal', null )
                    this.formData = {}
                }else{
                    this.aLoading = false
                    this.ErrMsg = "Error Processing Request!"
                }
            }).catch(err => {
              console.log(err)
              this.$toast.error(err)
              this.aLoading = false
        })
    },
    getAddSession(e) {
      let session = e.target.value
      if(session === '') {
        this.add_sessions = []
        return
      }

      this.$store.dispatch('academic-session/getSession', this.formData)
        .then(res =>{
          this.add_sessions = res.data.data
        }).catch(err =>{
        this.$toast.error(err)
      })
    }
  },
  mounted() {
    if (!process.server) {
      const script1 = document.createElement('script')
      script1.type = 'text/javascript'
      script1.src = '/pages/js/pages.min.js'
      document.head.appendChild(script1)
    }
    this.setProgramName()
    this.getSchoolFeesById(1)
  }
}
</script>
