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
                        <h5 class="text-left p-b-5"><span class="semi-bold">Import JAMB Result - DE</span></h5>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                        <div class="col-lg-12 m-b-10">
                            <select required class="form-control" v-model="uploadData.session">
                              <option value="" selected>Select Academic Session</option>
                              <option v-for="session in sessions" :value="session.id" :key="session.id">{{ session.de_session_name }}</option>
                            </select>
                        </div>
                        <div class="col-lg-12 m-b-10">
                            <div class="custom-file">
                            <input type="file" required ref="myFiles" class="custom-file-input" id="customFileLang" lang="es">
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

            <!-- Export JAMB Result Modal -->
            <div class="modal fade SlideUp" id="export_jamb_result" tabindex="-1" role="dialog" aria-hidden="true">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    <i class="pg-close"></i>
                </button>
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="text-left p-b-5"><span class="semi-bold">Export JAMB Result - DE</span></h5>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <form class="full-width">
                                    <div class="col-lg-12 m-b-10">
                                        <select class="form-control" v-model="exportData.year" >
                                            <option value="" selected>All</option>
                                            <option value="2010">2010</option>
                                            <option value="2011">2011</option>
                                            <option value="2012">2012</option>
                                            <option value="2013">2013</option>
                                            <option value="2019">2019</option>
                                            <option value="2020">2020</option>
                                        </select>
                                    </div>
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
          <div class="modal fade SlideUp" id="delete_de_result" tabindex="-1" role="dialog" aria-hidden="true">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                  <i class="pg-close"></i>
              </button>
              <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="text-left p-b-5"><span class="semi-bold">Delete Record</span></h5>
                      </div>
                      <div class="modal-body">
                          <form class="full-width" @submit.prevent="deleteJambDE">
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

          <div class="modal fade SlideUp" id="view_jamb_result" tabindex="-1" role="dialog" aria-hidden="true">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                <i class="pg-close"></i>
            </button>
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="text-left p-b-5"><span class="semi-bold">View JAMB Result - DE</span></h5>
                    </div>
                    <div class="modal-body jamb_view">
                        <h5 >{{show_candidate_name}}</h5>
                        <ul class="info">
                            <li>
                              <small>Registration Number:</small> <br />
                              <span>{{show_registration_number}}</span>
                            </li>
                            <li>
                              <small>Year:</small> <br />
                              <span>{{show_year}}</span>
                            </li>
                            <li>
                              <small>Gender:</small> <br />
                              <span>{{show_gender}}</span>
                            </li>
                            <li>
                              <small>LGA:</small> <br />
                              <span>{{show_lga_id}}</span>
                            </li>
                            <li>
                              <small>State:</small> <br />
                              <span>{{show_state_id}}</span>
                            </li>
                            <div class="clearfix"></div>
                        </ul>

                        <table class="table table-striped table-bordered">
                          <tr>
                            <th>Faculty:</th>
                            <td>{{show_course_name}}</td>
                          </tr>
                          <tr>
                            <th>Department:</th>
                            <td>{{show_department_id}}</td>
                          </tr>
                        </table>
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
                        <h5 class="text-left p-b-5"><span class="semi-bold">Edit JAMB Result - DE</span></h5>
                    </div>
                    <div class="modal-body">
                        <form class="full-width" @submit.prevent="submitEditedJambResut">
                            <div class="row">
                                <div class="col-lg-12 m-b-10">
                                    <input type="text" v-model="model.edit_registration_number" placeholder="Reg. Number" class="form-control">
                                </div>
                                <div class="col-lg-12 m-b-10">
                                    <input type="text" placeholder="Name" v-model="model.edit_candidate_name" class="form-control">
                                </div>
                                <div class="col-lg-12 m-b-10">
                                    <input type="text" placeholder="Course Name" v-model="model.edit_course_name" class="form-control">
                                </div>
                                <div class="col-lg-6 m-b-10">
                                    <select class="form-control" v-model="model.edit_gender">
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
                        <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
                        <li class="breadcrumb-item"><a href="#">JAMB</a></li>
                        <li class="breadcrumb-item active">JAMB Result - DE</li>
                    </ol>
                </div>
            </div>
            <!-- END BREADCRUMBS -->
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

            <!-- START CONTAINER FLUID -->
            <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
                <div class="card card-default" v-permission="'Search Jamb Result DE'">
                    <div class="card-header">
                        <div class="card-title text-primary">Search DE JAMB Result</div>
                    </div>
                    <div class="card-body">
                        <form style="width: 100%">
                            <div class="row">
                              <div class="col-md-5">
                                  <input type="text" v-model="model.search_registration_number" class="form-control" placeholder="Enter Registration Number" required>
                              </div>
                              <div class="col-md-5">
                                  <select class="form-control" v-model="model.search_year" >
                                      <option value="" selected>All</option>
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
                    <div class="card-header">
                        <h3 class="text-primary no-margin pull-left sm-pull-reset">JAMB Result - DE</h3>
                        <div class="pull-right sm-pull-reset">
                            <button v-permission="'View Jamb Result DE'" type="button" @click="refresh()" class="btn btn-success btn-sm"><i class="fa fa-refresh"></i>&nbsp; Refresh </button>
                            <button v-permission="'Import JAMB Result DE'" type="button" class="btn btn-primary btn-sm" data-target="#import_jamb_result" data-toggle="modal"><i class="fa fa-arrow-down"></i> &nbsp; <strong>Import Results from CSV</strong></button>
                            <button v-permission="'Export Jamb Result DE'" type="button" class="btn btn-warning btn-sm" data-target="#export_jamb_result" data-toggle="modal"><i class="fa fa-arrow-up"></i> &nbsp; <strong>Export Results into CSV</strong></button>
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
                                        <td colspan="5">Loading....Please wait.</td>
                                    </tr>
                                    <tr v-if="!getloading && de_results.length < 1">
                                        <td colspan="5">No record at the moment... Pls insert new record</td>
                                    </tr>
                                    <tr v-for="de_result in de_results" :key="de_result.id">
                                        <td>{{de_result.registration_number}}</td>
                                        <td>{{de_result.candidate_name}}</td>
                                        <td>{{de_result.gender}}</td>
                                        <td>{{de_result.year}}</td>
                                        <td>
                                            <div class="btn-group">
                                                <span v-permission="'View Jamb Result DE'" data-placement="top" @click="showDetails(de_result)" data-toggle="tooltip" title="View Result">
                                                    <a href="#view_jamb_result" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-eye"></i></a>
                                                </span>
                                                <span v-permission="'Edit Jamb Result DE'" data-placement="top" @click="populateFields(de_result)" data-toggle="tooltip" title="Edit Record">
                                                    <a href="#edit_jamb_result"  class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-pencil"></i></a>
                                                </span>
                                                <span v-permission="'Delete Jamb Result UME'" data-placement="top" data-toggle="tooltip" title="Delete Record">
                                                    <a href="#delete_de_result" @click="setId(de_result.id)"  class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="pg-trash"></i></a>
                                                </span>
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
  name: "Jamb-DE",
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
        downloading: false,
        importResponse: {},
        loading: false,
        deleteLoading: false,
        editLoading: false,
        getloading: false,
        exportLoading: false,
        de_results: [],
        file: "",
        sessions: [],
        show_candidate_name: "",
        show_registration_number: "",
        show_course_name: "",
        show_gender: "",
        show_state_id: "",
        show_lga_id: "",
        show_department_id: "",
        show_year: "",
        uploadData: {
          session: '',
          file: ''
        },
        model: {
          jamb_entry_mode: "",
          export_entry_mode: "",
          search_registration_number: "",
          search_year: "",
          export_year: "",
          edit_candidate_name: "",
          edit_registration_number: "",
          edit_course_name: "",
          id: 0,
          edit_gender: "",
          edit_state_id: "",
          edit_lga_id: "",
          edit_department_id: "",
          edit_year: ""
        },
        exportData: {
          year: ''
        }
      }
    },
  methods: {
      setId(id){
          this.model.id = id
      },
      showDetails(jamb){
          this.show_state_id = jamb.state.name
          this.show_lga_id = jamb.lga.name
          this.show_course_name = jamb.course_name
          this.show_department_id = jamb.department.name
          this.show_gender = jamb.gender
          this.show_year = jamb.year
          this.show_candidate_name = jamb.candidate_name
          this.show_registration_number = jamb.registration_number
      },
      populateFields(jamb){
          this.model.id = jamb.id
          this.model.edit_state_id = jamb.state_id
          this.model.edit_lga_id = jamb.lga_id
          this.model.edit_course_name = jamb.course_name
          this.model.edit_department_id = jamb.department_id
          this.model.edit_gender = jamb.gender
          this.model.edit_year = jamb.year
          this.model.edit_candidate_name = jamb.candidate_name
          this.model.edit_registration_number = jamb.registration_number
      },
      deleteJambDE(){
          this.deleteLoading = true
          this.$store
            .dispatch('jamb-de/deleteJambDE', this.model.id)
            .then(res => {
            if(res != undefined){
                if(res.status == true){
                this.deleteLoading = false
                this.getJambResults()
                $( '#delete_de_result' ).modal( 'hide' ).data( 'bs.modal', null );
                this.loading = false
                }else{
                this.deleteLoading = false
                this.loading = false
                this.ErrMsg = "Error Logging in!"
                }
            }else{
                this.deleteLoading = false
                this.ErrMsg = "Error Logging in!"
            }
        }).catch(err => {
          this.deleteLoading = false
        })
      },
      submitEditedJambResut(){
            this.editLoading = true
            let bodyFormData = new Object();
            bodyFormData.id = this.model.id
            bodyFormData.candidate_name = this.model.edit_candidate_name
            bodyFormData.registration_number = this.model.edit_registration_number
            bodyFormData.gender = this.model.edit_gender
            bodyFormData.state_id = this.model.edit_state_id
            bodyFormData.lga_id = this.model.edit_lga_id
            bodyFormData.course_name = this.model.edit_course_name
            bodyFormData.year = this.model.edit_year
            bodyFormData.department_id = this.model.edit_department_id
            this.$store
                .dispatch('jamb-de/updateJambResult', bodyFormData)
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                        this.editLoading = false
                        this.getJambResults(this.pagination.current_page)
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
        let payload = {}
        payload.year = this.model.search_year
        payload.registration_number = this.model.search_registration_number
          this.$store
            .dispatch('jamb-de/getJambResults', payload)
            .then(res => {
            if(res != undefined){
                if(res.status == true){
                    this.loading = false
                    this.de_results = res.data.data
                    this.pagination = res.data
                }else{
                    this.loading = false
                    this.ErrMsg = "Error Fetching data!"
                }
            }else{
                this.loading = false
                this.ErrMsg = "Error Fetching data!"
            }
        }).catch(err => {
          this.loading = false
        })
      },
      refresh(){
        this.de_results = []
        this.model.search_registration_number = ""
        this.model.search_year = ""
        this.getJambResults(1)
      },
      getJambResults(page){
          if(this.$laravel.hasPermission('View Jamb Result DE')){
        let payload = {}
        payload.page = page
        payload.year = this.model.search_year
        payload.registration_number = this.model.search_registration_number
        this.getloading = true
        this.$store
        .dispatch('jamb-de/getJambResults', payload)
        .then(res => {
          if(res != undefined){
            if(res.status == true){
                this.getloading = false
                this.de_results = res.data.data
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
            .dispatch('jamb-de/downloadJambResultSampleFile')
            .then(res => {
            if(res != undefined){
                if(res.success == true)    {
                  window.open(res.message, '_blank')
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
          this.$store
            .dispatch('jamb-de/exportJambResults', this.exportData)
            .then(res => {
            if(res != undefined){
              let fileURL = window.URL.createObjectURL(new Blob([res.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}));
              let fileLink = document.createElement('a');
              fileLink.href = fileURL;
              fileLink.setAttribute('download', 'de-jamb-results.xlsx');
              document.body.appendChild(fileLink);
              fileLink.click();
              this.exportLoading = false
              $( '#export_jamb_result' ).modal( 'hide' ).data( 'bs.modal', null )
              this.$toast.success('Record Exported to Excel Successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
            }else{
                this.exportLoading = false
                alert("File Downloaded Unsuccessful")
            }
        }).catch(err => {
          this.$toast.error(err)
          this.exportLoading = false
        })
      },
      uploadJambResults(){
        this.loading = true
        let formData = new FormData();
        formData.append('file', this.$refs.myFiles.files[0]);
        formData.append('academic_session_id', this.uploadData.session);
          this.$store
            .dispatch('jamb-de/uploadJambResults', formData)
            .then(res => {
            if(res != undefined){
                if(res.success == true){
                    this.loading = false
                    this.getJambResults(this.pagination.current_page)
                    $('#import_jamb_result').modal('hide').data( 'bs.modal', null )
                    // this.$toast.success("Data uploaded successfully!", {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
                    this.importResponse = res
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
      getAcademicSession() {
        this.$store.dispatch('academic-session/getDeSession')
          .then(res =>{

            this.sessions = res.data.data.data
          }).catch(err =>{
            this.$toast.error(err)
          })
      }
  },
  mounted: function() {
      if (!process.server) {
        const script1 = document.createElement('script')
        script1.type = 'text/javascript'
        script1.src = '/pages/js/pages.min.js'

        document.head.appendChild(script1)
      }
    this.getJambResults(this.pagination.current_page)
    this.getAcademicSession()
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
