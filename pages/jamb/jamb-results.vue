<template>
    <div>
        <!-- Import JAMB Result Modal -->
<div class="modal fade SlideUp" id="import_jamb_result" tabindex="-1" role="dialog" aria-hidden="true">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        <i class="pg-close"></i>
    </button>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="text-left p-b-5"><span class="semi-bold">Import JAMB Result - UTME</span></h5>
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
                        <button type="button" @click="uploadJambResults()" v-if="!loading"  class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Upload Record</button>
                        <button type="button" disabled v-if="loading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Uploading</button>
                    </div>
                    <div class="col-lg-12 m-t-15">
                        <div class="dd-placeholder p-1">
                            <h5 class="pull-left sm-pull-reset"><i class="fa fa-file-excel-o p-l-10"></i> Sample File</h5>
                            <button v-if="!downloading" @click="downloadJambResultSampleFile()" class="pull-right sm-pull-reset btn btn-default m-t-5 m-r-10"><i class="fa fa-arrow-down"></i> &nbsp; Download</button>
                            <button disabled v-if="downloading" class="pull-right sm-pull-reset btn btn-default m-t-5 m-r-10"><i class="fa fa-arrow-down"></i>&nbsp; Downloading</button>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<div class="modal fade SlideUp" id="view_jamb_result" tabindex="-1" role="dialog" aria-hidden="true">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        <i class="pg-close"></i>
    </button>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="text-left p-b-5"><span class="semi-bold">View JAMB Result</span></h5>
            </div>
            <div class="modal-body jamb_view">
                <h5 >{{show_name}}</h5>
                <ul class="info">
                    <li><small>Registration Number:</small> <span>{{show_registration_number}}</span></li>
                    <li><small>Year:</small> <span>{{show_year}}</span></li>
                    <li><small>Gender:</small> <span>{{show_sex}}</span></li>
                    <li><small>LGA:</small> <span>{{show_lga_id}}</span></li>
                    <li><small>State:</small> <span>{{show_state_id}}</span></li>
                    <li><small>Country:</small> <span>{{show_country_id}}</span></li>
                    <li><small>1st Choice Institution:</small> <span>{{show_university1}}</span></li>
                    <li><small>2nd Choice Institution:</small> <span>{{show_university2}}</span></li>
                    <li><small>1st Choice Faculty:</small> <span>{{show_faculty_id1}}</span></li>
                    <li><small>2nd Choice Faculty:</small> <span>{{show_faculty_id2}}</span></li>
                    <li><small>1st Choice Department:</small> <span>{{show_department_id1}}</span></li>
                    <li><small>2nd Choice Department:</small> <span>{{show_department_id2}}</span></li>
                    <li><small>Phone Code:</small> <span>{{show_phone_code}}</span></li>  
                    <div class="clearfix"></div>
                </ul>
                <table class="table table-condensed">
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Mark</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{show_subject_id1}}</td>
                            <td>{{show_mark1}}</td>
                        </tr>
                        <tr>
                            <td>{{show_subject_id2}}</td>
                            <td>{{show_mark2}}</td>
                        </tr>
                        <tr>
                            <td>{{show_subject_id3}}</td>
                            <td>{{show_mark3}}</td>
                        </tr>
                        <tr>
                            <td>{{show_subject_id4}}</td>
                            <td>{{show_mark4}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<!-- Export JAMB Result Modal -->
<div class="modal fade SlideUp" id="export_jamb_result" tabindex="-1" role="dialog" aria-hidden="true">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        <i class="pg-close"></i>
    </button>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="text-left p-b-5"><span class="semi-bold">Edit JAMB Result</span></h5>
            </div>
            <div class="modal-body">
                <div class="row">
                    <form class="full-width">
                        <div class="col-lg-12 m-b-10">
                            <select class="form-control" v-model="model.export_year" >
                                <option value="" selected>Jamb Result Year</option>
                                <option value="2010">2010</option>
                                <option value="2011">2011</option>
                                <option value="2012">2012</option>
                                <option value="2013">2013</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                            </select>
                        </div>
                        <!-- <div class="col-lg-12 m-b-10">
                            <select class="full-width" data-init-plugin="select2" >
                                <option value="" disabled selected>Jamb Entry Mode</option>
                                <option v-for="academicType in academicTypes" :key="academicType.id" value="academicTypes.id" >{{academicType.name}}</option>
                            </select>
                        </div> -->
                        <div class="col-lg-12">
                             <button type="button" v-if="!exportLoading"  @click="exportJambResults()" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Export Record</button>
                              <button type="button" disabled v-if="exportLoading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Exporting...</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<!-- Delete Country Modal -->
                <div class="modal fade SlideUp" id="delete_jamb_result" tabindex="-1" role="dialog" aria-hidden="true">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        <i class="pg-close"></i>
                    </button>
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="text-left p-b-5"><span class="semi-bold">Delete Record</span></h5>
                            </div>
                            <div class="modal-body">
                                <form class="full-width" @submit.prevent="deleteJambResult">
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

<!-- Edit JAMB Result Modal -->
<div class="modal fade SlideUp" id="edit_jamb_result" tabindex="-1" role="dialog" aria-hidden="true">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        <i class="pg-close"></i>
    </button>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="text-left p-b-5"><span class="semi-bold">Edit JAMB Result</span></h5>
            </div>
            <div class="modal-body">
                <form class="full-width" @submit.prevent="submitEditedJambResut">
                    <div class="row">
                        <div class="col-lg-12 m-b-10">
                            <input type="text" v-model="model.edit_registration_number" placeholder="Reg. Number" class="form-control">
                        </div>
                        <div class="col-lg-12 m-b-10">
                            <input type="text" placeholder="Name" v-model="model.edit_name" class="form-control">
                        </div>
                        <div class="col-lg-6 m-b-10">
                            <select class="form-control" v-model="model.edit_sex">
                                <option value="" disabled>Select your option</option>
                                <option value="M">M</option>
                                <option value="F">F</option>
                            </select>
                        </div>
                        <div class="col-lg-6 m-b-10">
                            <input type="text" placeholder="Result Year" v-model="model.edit_year" class="form-control">
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
                        <li class="breadcrumb-item"><a href="#">JAMB</a></li>
                        <li class="breadcrumb-item active">JAMB Result - UTME</li>
                    </ol>
                </div>
            </div>
            <!-- END BREADCRUMBS -->


            <!-- START CONTAINER FLUID -->
            <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
                <div class="card card-default" v-permission="'Search Jamb Result UTME'">
                    <div class="card-header">
                        <div class="card-title text-primary">Search JAMB Result</div>
                    </div>
                    <div class="card-body">
                        <form style="width: 100%">
                            <div class="row">
                              <div class="col-md-5">
                                  <input type="text" v-model="model.search_registration_number" class="form-control" placeholder="Enter Registration Number" required>
                              </div>
                              <div class="col-md-5">
                                <select class="form-control" v-model="model.search_year" >
                                  <option value="" selected>Select Jamb Result Year</option>
                                  <option value="2010">2010</option>
                                  <option value="2011">2011</option>
                                  <option value="2012">2012</option>
                                  <option value="2013">2013</option>
                                  <option value="2019">2019</option>
                                  <option value="2020">2020</option>
                                  <option value="2021">2021</option>
                                </select>
                              </div>
                              <div class="col-md-2">
                                  <button v-if="!loading" type="button" @click="search()" class="btn btn-primary btn-block">Search Record</button>
                                  <button v-if="loading" type="button" disabled class="btn btn-primary btn-block">Searching</button>
                              </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="card card-default">
                    <div class="card-header  separator">
                        <h3 class="text-primary no-margin pull-left sm-pull-reset">JAMB Result</h3>
                        <div class="pull-right sm-pull-reset">
                            <button v-permission="'View Jamb Result UTME'" type="button" @click="refresh()" class="btn btn-success btn-sm"><i class="fa fa-refresh"></i>&nbsp; Refresh </button>
                            <button v-permission="'Import Jamb Result UTME'" type="button" class="btn btn-primary btn-sm" data-target="#import_jamb_result" data-toggle="modal"><i class="fa fa-arrow-down"></i> &nbsp; <strong>Import Results from CSV</strong></button>
                            <button v-permission="'Export Jamb Result UTME'" type="button" class="btn btn-warning btn-sm" data-target="#export_jamb_result" data-toggle="modal"><i class="fa fa-arrow-up"></i> &nbsp; <strong>Export Results into CSV</strong></button>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-condensed" id="basicTable">
                                <thead>
                                <th style="width:20%">Reg Number</th>
                                <th style="width:36%">Name</th>
                                <th style="width:10%">Gender</th>
                                <th style="width:16%">Result Year</th>
                                <th style="width:18%">Action</th>
                                </thead>
                                <tbody>
                                    <tr v-if="getloading">
                                        <td colspan="4">Loading....Please wait.</td>
                                    </tr>
                                    <tr v-if="!getloading && jamb_results.length < 1">
                                        <td colspan="4">No record at the moment</td>
                                    </tr>
                                    <tr v-for="jamb_result in jamb_results" :key="jamb_result.id">
                                        <td>{{jamb_result.registration_number}}</td>
                                        <td>{{jamb_result.name}}</td>
                                        <td>{{jamb_result.sex}}</td>
                                        <td>{{jamb_result.year}}</td>
                                        <td>
                                            <div class="btn-group">
                                                <span v-permission="'View Jamb Result UTME'" data-placement="top" @click="showDetails(jamb_result)" data-toggle="tooltip" title="View Result">
                                                    <a href="#view_jamb_result" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-eye"></i></a>
                                                </span>
                                                <span v-permission="'Edit Jamb Result UTME'" data-placement="top" @click="populateFields(jamb_result)" data-toggle="tooltip" title="Edit Record">
                                                    <a href="#edit_jamb_result"  class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-pencil"></i></a>
                                                </span>
                                                <button v-permission="'Delete Jamb Result UTME'" type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-placement="top" title="Delete Record"><i class="pg-trash"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <Pagination
                                v-bind:pagination="pagination"
                                v-on:click.native="getJambResults(pagination.current_page)"
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

    </div>
</template>
<script>
import Pagination from '~/components/Pagination'
export default {
  name: "Jamb-Results",
  layout: "main",
  middleware: "",
  components: {
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
        editLoading: false,
        getloading: false,
        exportLoading: false,
        jamb_results: [],
        academicTypes: [],
        show_sex: "",
        show_name: "",
        show_state_id: "",
        show_lga_id: "",
        show_university1:"",
        show_faculty_id1:"",
        show_faculty_id2:"",
        show_department_id1:"",
        show_university1:"",
        show_university2:"",
        show_department_id2:"",
        show_subject_id1:"",
        show_subject_id2:"",
        show_subject_id3:"",
        show_subject_id4:"",
        show_mark1:"",
        show_mark2:"",
        show_mark3:"",
        show_mark4:"",
        show_phone_code: "",
        show_country_id: 0,
        show_registration_number:"",
        show_year:"",
        file: "",
        model: {
          edit_year: "",
          jamb_entry_mode: "",
          search_registration_number: "",
          search_year: "",
          export_year: "",
          name: "",
          edit_registration_number: "",
          id: 0,
          edit_sex: "",
          edit_name: "",
          edit_state_id: "",
          edit_lga_id: "",
          edit_university1:"",
          edit_faculty_id1:"",
          edit_faculty_id2:"",
          edit_department_id1:"",
          edit_university1:"",
          edit_university2:"",
          edit_department_id2:"",
          edit_subject_id1:"",
          edit_subject_id2:"",
          edit_subject_id3:"",
          edit_subject_id4:"",
          edit_mark1:"",
          edit_mark2:"",
          edit_mark3:"",
          edit_mark4:"",
          edit_phone_code: "",
          edit_country_id: 0
        },
      }
    },
  methods: {
      setId(id){
          this.model.id = id
      },
      populateFields(jamb){
          this.model.id = jamb.id
          this.model.edit_state_id = jamb.state_id
          this.model.edit_lga_id = jamb.lga_id
          this.model.edit_university1 = jamb.university1
          this.model.edit_university2 = jamb.university2
          this.model.edit_faculty_id1 = jamb.faculty_id1
          this.model.edit_faculty_id2 = jamb.faculty_id2
          this.model.edit_department_id1 = jamb.department_id1
          this.model.edit_department_id2 = jamb.department_id2
          this.model.edit_subject_id1 = jamb.subject_id1
          this.model.edit_subject_id2 = jamb.subject_id2
          this.model.edit_subject_id3 = jamb.subject_id3
          this.model.edit_subject_id4 = jamb.subject_id4
          this.model.edit_mark1 = jamb.mark1
          this.model.edit_mark2 = jamb.mark2
          this.model.edit_mark3 = jamb.mark3
          this.model.edit_mark4 = jamb.mark4
          this.model.edit_sex = jamb.sex
          this.model.edit_year = jamb.year
          this.model.edit_name = jamb.name
          this.model.edit_registration_number = jamb.registration_number
      },
      showDetails(jamb){
          this.model.id = jamb.id
          this.show_country_id = jamb.country_id
          this.show_state_id = jamb.state_id
          this.show_lga_id = jamb.lga_id
          this.show_university1 = jamb.university1
          this.show_university2 = jamb.university2
          this.show_faculty_id1 = jamb.faculty_id1
          this.show_faculty_id2 = jamb.faculty_id2
          this.show_department_id1 = jamb.department_id1
          this.show_department_id2 = jamb.department_id2
          this.show_subject_id1 = jamb.subject_id1
          this.show_subject_id2 = jamb.subject_id2
          this.show_subject_id3 = jamb.subject_id3
          this.show_subject_id4 = jamb.subject_id4
          this.show_mark1 = jamb.mark1
          this.show_mark2 = jamb.mark2
          this.show_mark3 = jamb.mark3
          this.show_mark4 = jamb.mark4
          this.show_sex = jamb.sex
          this.show_year = jamb.year
          this.show_name = jamb.name
          this.show_registration_number = jamb.registration_number
      },
      deleteJambResult(){
          this.deleteLoading = true
          this.$store
            .dispatch('get-started/deleteJambResult', this.model.id)
            .then(res => {
            if(res != undefined){
                if(res.success == true){
                this.deleteLoading = false
                this.getCountries()
                $( '#delete_jamb_result' ).modal( 'hide' ).data( 'bs.modal', null );
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
      submitEditedJambResut(){
            this.editLoading = true
            let bodyFormData = new Object();
            bodyFormData.id = this.model.id
            bodyFormData.registration_number = this.model.edit_registration_number
            bodyFormData.name = this.model.edit_name
            bodyFormData.state_id = this.model.edit_state_id
            bodyFormData.lga_id = this.model.edit_lga_id
            bodyFormData.university1 = this.model.edit_university1
            bodyFormData.faculty_id1 = this.model.edit_faculty_id1
            bodyFormData.department_id1 = this.model.edit_department_id1
            bodyFormData.university2 = this.model.edit_university2
            bodyFormData.faculty_id2 = this.model.edit_faculty_id2
            bodyFormData.department_id2 = this.model.edit_department_id2
            bodyFormData.subject_id1 = this.model.edit_subject_id1
            bodyFormData.mark1 = this.model.edit_mark1
            bodyFormData.subject_id2 = this.model.edit_subject_id2
            bodyFormData.mark2 = this.model.edit_mark2
            bodyFormData.subject_id3 = this.model.edit_subject_id3
            bodyFormData.mark3 = this.model.edit_mark3
            bodyFormData.subject_id4 = this.model.edit_subject_id4
            bodyFormData.mark4 = this.model.edit_mark4
            bodyFormData.sex = this.model.edit_sex
            bodyFormData.year = this.model.edit_year
            this.$store
                .dispatch('get-started/updateJambResult', bodyFormData)
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                        this.editLoading = false
                        this.getJambResults()
                        $('#edit_jamb_result').modal('hide').data( 'bs.modal', null )
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
      search(){
        this.loading = true
        this.getloading = true
        let payload = {}
        payload.year = this.model.search_year
        payload.registration_number = this.model.search_registration_number
          this.$store
            .dispatch('get-started/getJambResults', payload)
            .then(res => {
            if(res != undefined){
                if(res.status == true){
                    this.loading = false
                    this.getloading = false
                    this.jamb_results = res.data.data
                    this.pagination = res.data
                }else{
                    this.loading = false
                    this.getloading = false
                    this.ErrMsg = "Error Fetching data!"
                }
            }else{
                this.loading = false
                this.getloading = false
                this.ErrMsg = "Error Fetching data!"
            }
        }).catch(err => {
            this.getloading = false
            this.loading = false
        })
      },
      getAcademicTypes(){
        this.$store
        .dispatch('get-started/getAcademicTypes')
        .then(res => {
          if(res != undefined){
            if(res.status == true){
                this.academicTypes = res.data.data
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
      },
      refresh(){
        this.jamb_results = []
        this.model.search_registration_number = ""
        this.model.search_year = ""
        this.getJambResults()
      },
      getJambResults(page){
          if(this.$laravel.hasPermission('View Jamb Result UTME')){
        let payload = {}
        payload.page = page
        payload.year = this.model.search_year
        payload.registration_number = this.model.search_registration_number
        this.getloading = true
        this.$store
        .dispatch('get-started/getJambResults', payload)
        .then(res => {
          if(res != undefined){
            if(res.status == true){
                this.getloading = false
                this.jamb_results = res.data.data
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
                this.$router.push(
                decodeURIComponent(
                  this.$route.query.redirect || "/dashboard"
                        )
                    );
                    this.$toast.error("Not Permitted to access this page! Contact the admin.", { icon: "times" });
            }
      },
      downloadJambResultSampleFile(){
          this.downloading = true
          this.$store
            .dispatch('get-started/downloadJambResultSampleFile')
            .then(res => {
            if(res != undefined){
                if(res.success == true)    {
                    window.location = res.message
                    this.downloading = false
                    $('#import_jamb_result').modal('hide').data( 'bs.modal', null )
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
      exportJambResults(){
          this.exportLoading = true
          let formData = new FormData();
          formData.year = this.model.export_year
          this.$store
            .dispatch('get-started/exportJambResults', formData)
            .then(res => {
            if(res != undefined){
                this.exportLoading = false
                $( '#export_jamb_result' ).modal( 'hide' ).data( 'bs.modal', null )
                this.$toast.success('Record Exported to Excel Successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
            }else{
                this.exportLoading = false
                alert("File Downloaded Unsuccessful")
            }
        }).catch(err => {
          this.exportLoading = false
        })
      },
      uploadJambResults(){
        this.loading = true
        this.file = this.$refs.myFiles.files[0];
        let formData = new FormData();
        formData.append('file', this.file);
          this.$store
            .dispatch('get-started/uploadJambResults', formData)
            .then(res => {
            if(res != undefined){
                if(res.success == true){
                    this.loading = false
                    this.getJambResults(this.pagination.current_page)
                    $('#import_jamb_result').modal('hide').data( 'bs.modal', null )
                    this.$toast.success("Records Updated Successfully!", {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
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
  },
  mounted: function() {
      if (!process.server) {
        const script1 = document.createElement('script')
        script1.type = 'text/javascript'
        script1.src = '/pages/js/pages.min.js'

        document.head.appendChild(script1)
      }
    this.getJambResults(1)
    this.getAcademicTypes()
    }
}
</script>
<style scoped>
ul.info {
  list-style-type:square;
}
.breadcrumb {
    background-color: #ffffff !important;;
}
</style>
