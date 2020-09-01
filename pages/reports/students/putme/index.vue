<template>
    <div>
        <!-- START PAGE CONTENT -->
        <div class="content sm-gutter">
            <!-- START BREADCRUMBS -->
            <div class="bg-white">
                <div class="container p-l-5">
                    <ol class="breadcrumb breadcrumb-alt">
                        <li class="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                        <li class="breadcrumb-item"><a href="#">Get Started</a></li>
                        <li class="breadcrumb-item active">PUTME Students</li>
                    </ol>
                </div>
            </div>
            <!-- Export JAMB Result Modal -->
            <div class="modal fade SlideUp" id="export_putme_students" tabindex="-1" role="dialog" aria-hidden="true">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    <i class="pg-close"></i>
                </button>
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="text-left p-b-5"><span class="semi-bold">Export PUTMEs</span></h5>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <form class="full-width">
                                    <div class="col-lg-12 m-b-10">
                                    <select class="form-control" v-model="model.export_year" >
                                        <option value="" selected>PUTME Result Year</option>
                                        <option value="2010">2010</option>
                                        <option value="2011">2011</option>
                                        <option value="2012">2012</option>
                                        <option value="2013">2013</option>
                                        <option value="2019">2019</option>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                        <option value="2023">2023</option>
                                    </select>
                                    </div>
                                    <!-- <div class="col-lg-12 m-b-10">
                                        <select class="full-width" data-init-plugin="select2" >
                                            <option value="" disabled selected>Jamb Entry Mode</option>
                                            <option v-for="academicType in academicTypes" :key="academicType.id" value="academicTypes.id" >{{academicType.name}}</option>
                                        </select>
                                    </div> -->
                                    <div class="col-lg-12">
                                        <button type="button" v-if="!exportLoading"  @click="exportPUTMERegistrations()" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Export Record</button>
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
             <!-- Edit JAMB Result Modal -->
        <div class="modal fade SlideUp" id="edit_putme_student" tabindex="-1" role="dialog" aria-hidden="true">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                <i class="pg-close"></i>
            </button>
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="text-left p-b-5"><span class="semi-bold">Edit PUTME Student</span></h5>
                    </div>
                    <div class="modal-body">
                        <form class="full-width" @submit.prevent="submitEditedPUTMEStudent">
                            <table>
                                <tr class="col-lg-12 m-b-10">
                                    <td><label>Marital Status:</label></td>
                                    <td>
                                        <select class="full-width form-control" required="required" v-model="model.edit_marital_status">
                                            <option value="" disabled>Marital Status</option>
                                            <option value="Married">Married</option>
                                            <option value="Single">Single</option>
                                            <option value="Divorced">Divorced</option>
                                        </select>  
                                    </td>
                                </tr>
                                <tr class="col-lg-12 m-b-10">
                                    <td><label>Phone Number:</label></td>
                                    <td>
                                        <input type="number" placeholder="Phone Number" v-model="model.edit_phone_number" class="form-control">
                                    </td>
                                </tr>
                                <tr class="col-lg-12 m-b-10">
                                    <td><label>Email Address:</label></td>
                                    <td>
                                        <input type="email" placeholder="Email Address" v-model="model.edit_email" class="form-control">
                                    </td>
                                </tr>
                                <tr class="col-lg-12 m-b-10">
                                    <td><label>Country:</label></td>
                                    <td>
                                        <select class="form-control" v-model="model.edit_country_id" @change="populateState($event)">
                                            <option value="" selected>Select your option</option>
                                            <option v-for="country in countries" :key="country.id" :value="country.id">{{country.name}}</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr class="col-lg-12 m-b-10">
                                    <td><label>State:</label></td>
                                    <td>
                                        <select class="form-control" v-model="model.edit_state_id" @change="populateLGA($event)">
                                            <option value="" selected>Select your option</option>
                                            <option v-for="state in states" :key="state.id" :value="state.id">{{state.name}}</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr class="col-lg-12 m-b-10">
                                    <td><label>LGA:</label></td>
                                    <td>
                                        <select class="form-control" v-model="model.edit_lga_id">
                                            <option value="" selected>Select your option</option>
                                            <option v-for="lga in lgas" :key="lga.id" :value="lga.id">{{lga.name}}</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr class="col-lg-12 m-b-10">
                                    <td><label>Faculty:</label></td>
                                    <td>
                                        <select class="form-control" v-model="model.edit_faculty_id" @change="populateDepartments($event)">
                                            <option value="" selected>Select your option</option>
                                            <option v-for="faculty in faculties" :key="faculty.id" :value="faculty.id">{{faculty.name}}</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr class="col-lg-12 m-b-10">
                                    <td><label>Department:</label></td>
                                    <td>
                                        <select class="form-control" v-model="model.edit_department_id">
                                            <option value="" selected>Select your option</option>
                                            <option v-for="department in departments" :key="department.id" :value="department.id">{{department.name}}</option>
                                        </select>
                                    </td>
                                </tr>
                            </table>
                            
                            <div class="row">
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
            <!-- START CONTAINER FLUID -->
            <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
                <div class="card card-default">
                    <div class="card-header  separator">
                        <h3 class="text-primary no-margin pull-left sm-pull-reset">PUTME Students</h3>
                        <div class="pull-right sm-pull-reset">
                          <button type="button" class="btn btn-warning btn-sm" data-target="#export_putme_students" data-toggle="modal"><i class="fa fa-arrow-up"></i> &nbsp; <strong>Export Results into CSV</strong></button>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="card-header">
                        <form @submit.prevent="searchRecord">
                            <div class="input-group col-lg-12" >
                                <input type="text" class="form-control" v-model="search_registration_number" placeholder="Registration Number">
                                <input type="text" class="form-control" v-model="search_type" placeholder="Select Type">
                                <input type="text" class="form-control" v-model="search_screening_id" placeholder="Screening Id">
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
                                  <th>REG Number</th>
                                  <th style="width:22%">Email</th>
                                  <th>Phone</th>
                                  <th>Type</th>
                                  <th style="width:16%">Status</th>
                                  <th style="width:18%">Action</th>
                                </thead>
                                <tbody>
                                    <tr v-if="getLoading">
                                        <td colspan="6">Loading....Please wait.</td>
                                    </tr>
                                    <tr v-if="!getLoading && users.length < 1">
                                        <td colspan="6">No record at the moment... Please insert new record</td>
                                    </tr>
                                    <tr v-else v-for="user in users" :key="user.id">
                                        <td>{{user.registration_number}}</td>
                                        <td>{{user.email}}</td>
                                        <td>{{user.primary_phone}}</td>
                                        <td>{{user.type}}</td>
                                        <td>
                                          <span style="background-color: green; color: white; margin: 5px; padding: 4px;" v-if="user.status == 1">Completed</span>
                                          <span style="background-color: red; color: white; margin: 5px; padding: 4px;" v-if="user.status == 0">Not Completed</span>
                                        </td>
                                        <td>
                                          <div class="btn-group">
                                              <span data-placement="top" data-toggle="tooltip" @click="populateFields(user)" title="Edit User">
                                                  <a href="#edit_putme_student" title="Edit Student Info" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-pencil"></i></a>
                                              </span>
                                          </div>
                                          <div class="btn-group">
                                              <span data-placement="top" @click="showDetails(user.registration_number)" data-toggle="tooltip" title="View User Details">
                                                  <a href="#view_jamb_result" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-eye"></i></a>
                                              </span>
                                          </div>
                                          <div class="btn-group">
                                              <span data-placement="top" data-toggle="tooltip" title="Edit Role">
                                                  <a href="javascript:;" @click="exportOlevel(user.registration_number)" title="Download Olevel Result" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-download"></i></a>
                                              </span>
                                          </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <Pagination
                              v-bind:pagination="pagination"
                              v-on:click.native="getAllUsers(pagination.current_page)"
                              :offset="4">
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END CONTAINER FLUID -->
        </div>

            <!-- /.ADD ADMIN USER ENDS HERE -->
            <div class="modal fade SlideUp" id="view_jamb_result" tabindex="-1" role="dialog" aria-hidden="true">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    <i class="pg-close"></i>
                </button>
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="text-left p-b-5"><span class="semi-bold">View PUMTE Details</span></h5>
                        </div>
                        <div class="modal-body jamb_view">
                            <h5 v-if="putmeDetails.jamb_result != null">{{putmeDetails.screening_id}} :- {{putmeDetails.jamb_result.name}} </h5>
                            <ul>
                                <li>
                                    <small>Reg. Number</small><br />
                                    <span>{{putmeDetails.registration_number}}</span>
                                </li>
                                <li>
                                    <small>Type</small> <br />
                                    <span>{{putmeDetails.type}}</span>
                                </li>
                                <li>
                                    <small>DOB</small><br />
                                    <span>{{putmeDetails.dob}}</span>
                                </li>
                            <li>
                                <small>LGA:</small><br />
                                <span v-if="putmeDetails.lga != null">{{putmeDetails.lga.name}}</span>
                            </li>
                                <li>
                                <small>State:</small> <br />
                                <span v-if="putmeDetails.state != null">{{putmeDetails.state.name}}</span>
                                </li>
                                <div class="clearfix"></div>
                            </ul>

                            <table class="table table-striped table-bordered">
                            <tr>
                                <th>Country:</th>
                                <td v-if="putmeDetails.country != null">{{putmeDetails.country.name}}</td>
                            </tr>
                            <tr>
                                <th>Marital Status:</th>
                                <td v-if="putmeDetails != null">{{putmeDetails.marital_status}}</td>
                            </tr>
                            <tr>
                                <th>Department:</th>
                                <td v-if="putmeDetails.department != null">{{putmeDetails.department.name}}</td>
                            </tr>
                            <tr>
                                <th>Faculty:</th>
                                <td v-if="putmeDetails.faculty != null">{{putmeDetails.faculty.name}}</td>
                            </tr>
                            </table>
                            <table class="table table-striped table-bordered">
                                <tr>
                                    <th>Email:</th>
                                    <td>{{putmeDetails.email}}</td>
                                </tr>
                                <tr>
                                    <th>Payment Status:</th>
                                    <td>{{putmeDetails.payment_status}}</td>
                                </tr>
                                <tr>
                                    <th>Passport</th>
                                    <td><img :src="putmeDetails.photo" width="100px" height="100px"/></td>
                                </tr>
                            </table>
                            <table class="table table-striped table-bordered">
                                <tr v-if="putmeDetails.jamb_result != null">
                                    <th>1st Choice Institution:</th>
                                    <td>{{putmeDetails.jamb_result.university1}}</td>
                                </tr>
                                <tr v-if="putmeDetails.jamb_result != null">
                                    <th>2nd Choice Institution:</th>
                                    <td>{{putmeDetails.jamb_result.university2}}</td>
                                </tr>
                                <tr v-if="putmeDetails.jamb_result != null">
                                    <th>1st Choice Department:</th>
                                    <td>{{putmeDetails.jamb_result.department.name}}</td>
                                </tr>
                                <tr v-if="putmeDetails.jamb_result != null">
                                    <th>1st Choice Faculty:</th>
                                    <td>{{putmeDetails.jamb_result.faculty.name}}</td>
                                </tr>
                                <tr v-if="putmeDetails.jamb_result != null">
                                    <th>2nd Choice Department:</th>
                                    <td>{{putmeDetails.jamb_result.department.name}}</td>
                                </tr>
                                <tr v-if="putmeDetails.jamb_result != null">
                                    <th>2nd Choice Faculty:</th>
                                    <td>{{putmeDetails.jamb_result.faculty.name}}</td>
                                </tr>
                            </table>
                                <table class="table table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Subject</th>
                                            <th>Mark</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="putmeDetails.jamb_result != null">
                                            <td>{{putmeDetails.jamb_result.subject1.name}}</td>
                                            <td>{{putmeDetails.jamb_result.mark1}}</td>
                                        </tr>
                                        <tr v-if="putmeDetails.jamb_result != null">
                                            <td>{{putmeDetails.jamb_result.subject2.name}}</td>
                                            <td>{{putmeDetails.jamb_result.mark2}}</td>
                                        </tr>
                                        <tr v-if="putmeDetails.jamb_result != null">
                                            <td>{{putmeDetails.jamb_result.subject3.name}}</td>
                                            <td>{{putmeDetails.jamb_result.mark3}}</td>
                                        </tr>
                                        <tr v-if="putmeDetails.jamb_result != null">
                                            <td>{{putmeDetails.jamb_result.subject4.name}}</td>
                                            <td>{{putmeDetails.jamb_result.mark4}}</td>
                                        </tr>
                                        <tr>
                                        <td><b>TOTAL</b></td>
                                        <td v-if="putmeDetails.jamb_result != null">{{ (putmeDetails.jamb_result.mark1 + putmeDetails.jamb_result.mark2 + putmeDetails.jamb_result.mark3 + putmeDetails.jamb_result.mark4) }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                        </div>
                    </div>
                    <!-- /.modal-content -->
                </div>
                <!-- /.modal-dialog -->
            </div>
            <!-- /.UPLOAD ADMIN USER -->
            <div class="modal fade SlideUp" id="upload_personnel" tabindex="-1" role="dialog" aria-hidden="true">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                  <i class="pg-close"></i>
              </button>
              <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="text-left p-b-5"><span class="semi-bold">UPLOAD ADMIN USER</span></h5>
                      </div>
                      <div class="modal-body">
                          <div class="row">
                              <div class="col-lg-12 m-b-10">
                                  <div class="custom-file">
                                      <input type="file" class="custom-file-input" id="customFileLang" lang="es">
                                      <label class="custom-file-label" for="customFileLang">Select File</label>
                                  </div>
                              </div>
                              <div class="col-lg-12">
                                  <button type="button" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Upload Record</button>
                              </div>
                              <div class="col-lg-12 m-t-15">
                                  <div class="dd-placeholder p-1">
                                      <h5 class="pull-left sm-pull-reset"><i class="fa fa-file-excel-o p-l-10"></i> Sample File</h5>
                                      <button class="pull-right sm-pull-reset btn btn-default m-t-5 m-r-10"><i class="fa fa-arrow-down"></i> &nbsp; Download</button>
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
            <!-- /.UPLOAD ADMIN USER ENDS HERE -->
    </div>
</template>
<script>
import Pagination from '~/components/Pagination'

export default {
    name: "roles",
    layout: "main",
    middleware: "auth",
    components: {
      Pagination
    },
    computed: {
    },
    data(){
        return {
            putmeDetails: {},
            subjects: [],
            update: false,
            currentUserSelected: "",
            updateLoading: false,
            user_permissions: [],
            addloading: false,
            checked: false,
            downloading: false,
            loading: false,
            searchItem: "",
            departments: [],
            faculties:[],
            makeAdminLoading: false,
            deleteLoading: false,
            editLoading: false,
            getLoading: true,
            exportLoading: false,
            search_screening_id: "",
            search_type: "",
            search_registration_number: "",
            countries: [],
            states: [],
            lgas: [],
            users:[],
            user:{},
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
                user_id: 0,
                export_year: "",
                edit_name: "",
                edit_screening_id: "",
                edit_state_id: "",
                edit_lga_id: "",
                edit_email:"",
                edit_dob:"",
                edit_university1:"",
                edit_country_id: "",
                edit_faculty_id:"",
                edit_faculty_id2:"",
                edit_department_id:"",
                edit_university2:"",
                edit_department_id2:"",
                edit_phone_number: "",
                edit_photo: ""
            },
        }
    },
    methods: {
        populateFields(jamb){
            this.model.edit_screening_id = jamb.screening_id
            this.model.edit_marital_status = jamb.marital_status
            this.model.edit_phone_number = jamb.primary_phone
            this.model.edit_faculty_id = jamb.faculty_id
            this.model.edit_department_id = jamb.department_id
            this.model.edit_country_id = jamb.country_id
            this.model.edit_state_id = jamb.state_id
            this.model.edit_lga_id = jamb.lga_id
            this.model.edit_dob = jamb.dob
            this.getDepartmentsByFacultyId(jamb.faculty_id)
            this.getStatesByCountryID(jamb.country_id)
            this.getLGAsByStateID(jamb.state_id)

            this.model.edit_registration_number = jamb.registration_number
            this.model.edit_email = jamb.email
            this.model.edit_photo = jamb.photo
        },
        submitEditedPUTMEStudent(){
            this.editLoading = true
            let bodyFormData = new FormData();
            bodyFormData.screening_id = this.model.edit_screening_id
            bodyFormData.marital_status = this.model.edit_marital_status
            bodyFormData.primary_phone = this.model.edit_phone_number
            bodyFormData.faculty_id = this.model.edit_faculty_id
            bodyFormData.department_id = this.model.edit_department_id
            bodyFormData.registration_number = this.model.edit_registration_number
            bodyFormData.email = this.model.edit_email
            bodyFormData.country_id = this.model.edit_country_id
            bodyFormData.state_id = this.model.edit_state_id
            bodyFormData.lga_id = this.model.edit_lga_id
            bodyFormData.dob = this.model.edit_dob

            this.$store
                .dispatch('get-started/updatePUTMEStudent', bodyFormData)
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                        this.editLoading = false 
                        $('#edit_putme_student').modal('hide').data( 'bs.modal', null )
                        this.getAllUsers(1)
                    }else{
                    this.editLoading = false
                    }
                }else{
                    this.editLoading = false
                }
            }).catch(err => {
                this.editLoading = false
            })
        },
        searchRecord(){
            let payload = {}
            payload.registration_number = this.search_registration_number
            payload.type = this.search_type
            payload.screening_id = this.search_screening_id
            payload.page = 1
            this.$store
                .dispatch('get-started/searchPUTMERegistraton', payload)
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                        if(res.data == null){
                            this.users = []
                        }else{
                            this.users = res.data.data
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
        exportPUTMERegistrations(){
            this.exportLoading = true
            this.$store
                .dispatch('get-started/exportPUTMERegistrations', this.model.export_year)
                .then(res => {
            if(res != undefined){
                this.exportLoading = false
                $('#export_putme_students').modal('hide').data( 'bs.modal', null )
                this.$toast.success('Record Exported to Excel Successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
            }else{
                this.exportLoading = false
                alert("File Downloaded Unsuccessful")
            }
                }).catch(err => {
                    this.exportLoading = false
                    this.$toast.error('An error occurred please contact the administrator' + err)
            })
        },
        showDetails(registration_number){
            this.putmeDetails = {}
            this.$store
                .dispatch('get-started/getPUTMERegistrationDetails', registration_number)
                .then(res => {
                if(res != undefined){
                    if(res.data.status == true){
                        this.getLoading = false
                        this.putmeDetails = res.data
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
        },
        getFaculties(){
            this.$store
                .dispatch('get-started/getAllFaculties')
                .then(res => {
                if(res != undefined){
                    this.getloading = false
                    this.faculties = res
                }else{
                    this.getloading = false
                    this.ErrMsg = "Error Fetching data!"
                }
            }).catch(err => {
                this.getloading = false
            })
        },
        getDepartmentsByFacultyId(facultyId) {
            let payload = {}
            payload.facultyId = facultyId
            this.$store
                .dispatch('get-started/getAllDepartmentsByFacultyId', payload)
                .then(res => {
                if(res != undefined){      
                    this.departments = res         
                }else{
                    this.ErrMsg = "Error Logging in!"
                }
            }).catch(err => {
            })
        },
        populateDepartments(event){
            this.departments = []
            if(event.target.value !== ""){
                this.getDepartmentsByFacultyId(1, event.target.value)
            }else{
                this.model.export_department_id = ''
                this.departments = []
            }
        },
        exportOlevel(reg_no){
            this.exportLoading = true
            this.$store
                .dispatch('get-started/exportOLevel', reg_no)
                .then(res => {
            if(res != undefined){
                this.exportLoading = false
                this.$toast.success('Record Exported to Excel Successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
            }else{
                this.exportLoading = false
                alert("File Downloaded Unsuccessful")
            }
                }).catch(err => {
                    this.exportLoading = false
                    this.$toast.error('An error occurred please contact the administrator' + err)
            })
        },
        getAllUsers(page){
            this.getLoading = true
            let payload = {}
            payload.page = page
            payload.registration_number = ""
            payload.type = ""
            payload.screening_id = ""
            this.$store
                .dispatch('get-started/getPUTMERegistrations', payload)
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                        this.getLoading = false
                        this.users = res.data.data
                        this.pagination = res.data
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
        },
        getCountries(){
            this.getloading = true
            this.$store
            .dispatch('get-started/getAllCountries')
            .then(res => {
            if(res != undefined){
                this.getLoading = false
                this.countries = res
                
            }else{
                this.getLoading = false
                this.ErrMsg = "Error Fetching data!"
            }
            }).catch(err => {
            this.getloading = false
            })
        },
        getStatesByCountryID(countryId){
            let payload = {}
            payload.countryId = countryId
            this.$store
                .dispatch('states/getAllStatesByCountryId', payload)
                .then(res => {
                    if(res != undefined){   
                        this.states = res
                    }else{
                        this.getloading = false
                        this.ErrMsg = "Error Logging in!"
                    }
            }).catch(err => {
            this.getloading = false
            })
        },
        getLGAsByStateID(stateId){
            let payload = {}
            payload.stateId = stateId
                this.$store
                    .dispatch('lgas/getAllLGAsByStateId', payload)
                    .then(res => {
                    if(res != undefined){            
                        this.lgas = res
                    }else{
                        this.ErrMsg = "Error Logging in!"
                    }      
            }).catch(err => {
            })
        },
        populateLGA(event){
            this.lgas = []
            if(event.target.value !== ""){
                this.getLGAsByStateID(event.target.value)
            }else{
                this.model.export_lga_id = ''
                this.lgas = []
            }
        },
        populateState(event){
            this.states = []
            if(event.target.value !== ""){
                this.getStatesByCountryID(event.target.value)
            }else{
                this.model.export_state_id = ''
                this.states = []
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
        this.getCountries()
        this.getFaculties()
        this.getAllUsers(this.pagination.current_page)
    }
}
</script>
<style scoped>
.breadcrumb {
    background-color: #ffffff !important;;
}
.dropdown-menu.show {
    display: block !important;
}

.modal-dialog {
    max-width: 95% !important;
    margin: 1.75rem auto;
}
</style>
