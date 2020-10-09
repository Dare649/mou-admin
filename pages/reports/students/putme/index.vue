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
                      <li class="breadcrumb-item active">PUTME &amp; DE Exam Registration Report</li>
                  </ol>
              </div>
          </div>

            <!-- START CONTAINER FLUID -->
            <div class="container col-md-11 sm-padding-12 p-t-20 p-l-0 p-r-0">
              <div class="card card-default">
                <div class="card-header">
                  <div class="card-title text-primary">Search Options</div>
                </div>
                <div class="card-body">
                    <div class="row">
                      <div class="col-md-4">
                        <label>Reg Num:</label>
                        <input type="text" v-model="searchData.registration_number" class="form-control" placeholder="Reg Number (Optional)"  />
                      </div>
                      <div class="col-md-4">
                        <label>PUTME Reg. No:</label>
                        <input type="text" class="form-control" v-model="searchData.screening_id" placeholder="PUTME registration no.">
                      </div>
                      <div class="col-md-4">
                        <label>From Date:</label>
                        <input type="date" class="form-control" v-model="searchData.from" required />
                      </div>
                    </div>
                    <div class="row m-t-5">
                      <div class="col-md-4">
                        <label>To Date:</label>
                        <input type="date" v-model="searchData.to" class="form-control" required />
                      </div>
                      <div class="col-md-4">
                        <label>College:</label>
                        <select class="form-control" v-model="searchData.faculty_id" @change="populateDepartments($event)">
                          <option value="" selected>All</option>
                          <option v-for="faculty in faculties" :key="faculty.id" :value="faculty.id">{{faculty.name}}</option>
                        </select>
                      </div>
                      <div class="col-md-4">
                        <label>Department:</label>
                        <select class="form-control" v-model="searchData.department_id">
                          <option value="" selected>All</option>
                          <option v-for="department in departments" :key="department.id" :value="department.id">{{department.name}}</option>
                        </select>
                      </div>
                    </div>
                    <div class="row m-t-5">
                      <div class="col-md-4">
                        <label>Entry Mode:</label>
                        <select class="form-control" v-model="searchData.entry_mode">
                          <option value="" selected>All</option>
                          <option value="DE">DE</option>
                          <option value="JAMB">JAMB</option>
                        </select>
                      </div>
                      <div class="col-md-4">
                        <label>Select Year</label>
                        <select class="form-control" v-model="searchData.year">
                          <option value="" selected>All</option>
                          <option  value="2019">Year --- 2019/2020</option>
                          <option  value="2020">Year --- 2020/2021</option>
                          <option  value="2021">Year --- 2021/2022</option>
                          <option  value="2022">Year --- 2022/2023</option>
                          <option  value="2023">Year --- 2023/2014</option>
                        </select>
                      </div>
                      <div class="col-md-2 m-t-30">
                        <button type="button" id="searchBtn" @click="searchRecord(1)" class="btn btn-primary btn-block">
                          <i class="fa fa-search" />&nbsp;Search Record
                        </button>
                      </div>
                      <div class="col-md-2 m-t-30">
                        <button type="button" id="exportBtn" @click="exportRegisteredPutmeStudents" class="btn btn-danger btn-block">
                          <i class="fa fa-file-excel-o"></i>&nbsp; Export
                        </button>
                      </div>
                    </div>
                </div>
              </div>
                <div class="card card-default">
                    <div class="card-header  separator">
                        <h3 class="text-primary no-margin pull-left sm-pull-reset">PUTME &amp; DE Exam Registration Report</h3>
                        <div class="pull-right sm-pull-reset">
                          <nuxt-link to="/reports/students/putme/register-putme" class="btn btn-warning"><i class="fa fa-plus"></i>&nbsp; Add New Student </nuxt-link>
                          <button type="button" class="btn btn-success" @click="refresh()"><i class="fa fa-refresh"></i>&nbsp; Refresh </button>
                          <button type="button" class="btn btn-primary">Completed Registration <span class="badge">{{count}}</span></button>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-condensed" id="basicTable">
                              <thead>
                                <th>Image</th>
                                <th>REG Number</th>
                                <th style="width:20%">Name</th>
                                <th>Entry Mode</th>
                                <th>Status</th>
                                <th style="width:20%">Action</th>
                              </thead>
                              <tbody>
                                <tr v-if="getLoading">
                                    <td colspan="6">Loading....Please wait.</td>
                                </tr>
                                <tr v-if="!getLoading && Object.keys(users).length < 1">
                                    <td colspan="6">No record at the moment... Please insert new record</td>
                                </tr>
                                <tr v-if="!getLoading && Object.keys(users).length > 0" v-for="user in users" :key="user.id">
                                  <td>
                                    <img v-if="user.photo === '' || user.photo === null" src="/assets/img/avatar.png" width="50px" height="50px" />
                                    <img v-else :src="user.photo" width="50px" height="50px" />
                                  </td>
                                  <td>{{user.registration_number}}</td>
                                  <td>{{user.jamb_name}}</td>
                                  <td>{{user.type}}</td>
                                  <td>
                                    <span style="background-color: green; color: white; margin: 5px; padding: 4px;" v-if="user.status == 1">Completed</span>
                                    <span style="background-color: red; color: white; margin: 5px; padding: 4px;" v-if="user.status == 0">Not Completed</span>
                                  </td>
                                  <td>
                                    <div class="btn-group" v-if="user.status === 1">
                                      <a href="#edit_putme_student" @click="populateFields(user)" title="Edit Student Info" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-pencil"></i></a>
                                      <a href="#view_jamb_result" @click="showDetails(user.registration_number)" title="View Student Info" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-eye"></i></a>
                                      <a href="javascript:;" @click="exportOlevel(user)" title="Download Olevel Result" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-download"></i></a>
                                      <a href="javascript:;" @click="printForm(user.registration_number)" title="View Printable form" class="btn btn-default btn-sm" role="button"><i class="fa fa-print"></i></a>
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
              <div class="modal-dialog modal-lg" v-if="getDetailsLoading">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="text-left p-b-5"><span class="semi-bold">LOADING....PLEASE WAIT</span></h5>
                  </div>
                </div>
              </div>
              <div class="modal-dialog modal-lg" v-if="!getDetailsLoading">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="text-left p-b-5"><span class="semi-bold">VIEW STUDENT DETAILS</span></h5>
                      </div>
                      <div class="modal-body jamb_view">
                        <h5 v-if="putmeDetails.type == 'JAMB'">
                          <b>PUTME ID:</b>  {{putmeDetails.screening_id}} <br />
                          <b>NAME:</b>  {{putmeDetails.jambResult.name}}
                        </h5>
                        <h5 v-if="putmeDetails.type == 'DE'">
                          <b>PUTME ID:</b>  {{putmeDetails.screening_id}} <br />
                          <b>NAME:</b>   {{putmeDetails.jambResult.candidate_name}}
                        </h5>
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
                              <td v-if="putmeDetails != null ">
                                {{putmeDetails.marital_status}}
                              </td>
                          </tr>
                          <tr>
                              <th>Gender:</th>
                              <td v-if="putmeDetails != null">
                                <span v-if="putmeDetails.type === 'DE'">
                                  {{ (putmeDetails.jambResult.gender === 'M') ? 'Male' : 'Female'}}
                                </span>
                                <span v-if="putmeDetails.type === 'JAMB'">
                                  {{ (putmeDetails.jambResult.sex === 'M') ? 'Male' : 'Female'}}
                                </span>
                              </td>
                          </tr>
                          <tr>
                              <th>Department:</th>
                              <td v-if="putmeDetails.department != null">{{ putmeDetails.department.name }}</td>
                          </tr>
                          <tr>
                              <th>Faculty:</th>
                              <td v-if="putmeDetails.faculty != null">{{ putmeDetails.faculty.name }}</td>
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
                                  <td>
                                    <img v-if="putmeDetails.photo === '' || putmeDetails.photo === null" src="/assets/img/avatar.png" width="100px" height="100px">
                                    <img v-else :src="putmeDetails.photo" width="100px" height="100px">
                                  </td>
                              </tr>
                          </table>
                          <table class="table table-striped table-bordered" v-if="putmeDetails.type == 'JAMB'">
                            <tr v-if="putmeDetails.jambResult != null">
                                <th>1st Choice Institution:</th>
                                <td>{{putmeDetails.jambResult.university1}}</td>
                            </tr>
                            <tr v-if="putmeDetails.jambResult != null">
                              <th>1st Choice Faculty:</th>
                              <td>{{putmeDetails.jambResult.faculty.name}}</td>
                            </tr>
                            <tr v-if="putmeDetails.jambResult != null">
                              <th>1st Choice Department:</th>
                              <td>{{putmeDetails.jambResult.department.name}}</td>
                            </tr>
                            <tr v-if="putmeDetails.jambResult != null">
                                <th>2nd Choice Institution:</th>
                                <td>{{putmeDetails.jambResult.university2}}</td>
                            </tr>
                            <tr v-if="putmeDetails.jambResult != null">
                              <th>2nd Choice Faculty:</th>
                              <td>{{putmeDetails.jambResult.faculty.name}}</td>
                            </tr>
                            <tr v-if="putmeDetails.jambResult != null">
                                <th>2nd Choice Department:</th>
                                <td>{{putmeDetails.jambResult.department.name}}</td>
                            </tr>
                          </table>
                          <table class="table table-condensed" v-if="putmeDetails.type == 'JAMB'">
                              <thead>
                                  <tr>
                                      <th>Subject</th>
                                      <th>Mark</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr v-if="putmeDetails.jambResult != null">
                                      <td>{{putmeDetails.jambResult.subject1.name}}</td>
                                      <td>{{putmeDetails.jambResult.mark1}}</td>
                                  </tr>
                                  <tr v-if="putmeDetails.jambResult != null">
                                      <td>{{putmeDetails.jambResult.subject2.name}}</td>
                                      <td>{{putmeDetails.jambResult.mark2}}</td>
                                  </tr>
                                  <tr v-if="putmeDetails.jambResult != null">
                                      <td>{{putmeDetails.jambResult.subject3.name}}</td>
                                      <td>{{putmeDetails.jambResult.mark3}}</td>
                                  </tr>
                                  <tr v-if="putmeDetails.jambResult != null">
                                      <td>{{putmeDetails.jambResult.subject4.name}}</td>
                                      <td>{{putmeDetails.jambResult.mark4}}</td>
                                  </tr>
                                  <tr>
                                  <td><b>TOTAL JAMB SCORE</b></td>
                                  <td v-if="putmeDetails.jambResult != null">{{ (putmeDetails.jambResult.mark1 + putmeDetails.jambResult.mark2 + putmeDetails.jambResult.mark3 + putmeDetails.jambResult.mark4) }}</td>
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
      <!-- Export JAMB Result Modal -->
      <div class="modal fade SlideUp" id="export_putme_students" tabindex="-1" role="dialog" aria-hidden="true">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
          <i class="pg-close"></i>
        </button>
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="text-left p-b-5"><span class="semi-bold">EXPORT DETAILS</span></h5>
            </div>
            <div class="modal-body">
              <div class="row">
                <form class="full-width">
                  <div class="col-lg-12 m-b-10">
                    <select class="form-control" v-model="model.export_year" >
                      <option value="" selected>Year</option>
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
              <h5 class="text-left p-b-5"><span class="semi-bold">EDIT STUDENT DETAILS</span></h5>
            </div>
            <div class="modal-body">
              <form class="full-width" @submit.prevent="submitEditedPUTMEStudent">
                <table>
                  <tr class="col-lg-12 m-b-10">
                    <td><label>Photo:</label></td>
                    <td>
                      <input type="file" ref="file" class="form-control" />
                    </td>
                  </tr>
                  <tr class="col-lg-12 m-b-10">
                    <td><label>Name:</label></td>
                    <td>
                      <input type="text" v-model="model.name" class="form-control" />
                    </td>
                  </tr>
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
                    <td><label>Gender:</label></td>
                    <td>
                      <select class="full-width form-control" required="required" v-model="model.edit_gender">
                        <option value="" disabled>Select Gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
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
                    <td><label>Address:</label></td>
                    <td>
                      <input type="text" placeholder="Address" v-model="model.edit_address" class="form-control">
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
    </div>
</template>
<script>
import Pagination from '~/components/Pagination'
import config from '~/store/config.js'

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
        getDetailsLoading: true,
        exportLoading: false,
        search_screening_id: "",
        search_type: "",
        search_registration_number: "",
        countries: [],
        states: [],
        lgas: [],
        users:[],
        user:{},
        searchData: {
          registration_number: '',
          screening_id: '',
          from: '',
          to: '',
          session_id: '',
          faculty_id: '',
          department_id: '',
          entry_mode: '',
          year :'',
          export: false
        },
        pagination: {
          total: 0,
          per_page: 2,
          from: 1,
          to: 0,
          current_page: 1
        },
        approveData: {
          registration_number: ''
        },
        model: {
          name: "",
          id: 0,
          user_id: 0,
          export_year: "",
          edit_name: "",
          edit_gender: "",
          edit_screening_id: "",
          edit_state_id: "",
          edit_lga_id: "",
          edit_email:"",
          edit_dob:"",
          edit_address: '',
          edit_university1:"",
          edit_country_id: "",
          edit_faculty_id:"",
          edit_faculty_id2:"",
          edit_department_id:"",
          edit_university2:"",
          edit_department_id2:"",
          edit_phone_number: "",
          edit_secondary_phone: '',
          edit_no_of_sittings: ''
        },
        count: 0
      }
  },
  methods: {
    populateFields(jamb){
      this.getDepartmentsByFacultyId(jamb.faculty_id)
      this.getStatesByCountryID(jamb.country_id)
      this.getLGAsByStateID(jamb.state_id)
      this.model.edit_screening_id = jamb.screening_id
      this.model.edit_marital_status = jamb.marital_status
      this.model.edit_phone_number = jamb.primary_phone
      this.model.edit_faculty_id = jamb.faculty_id
      this.model.edit_department_id = jamb.department_id
      this.model.edit_country_id = jamb.country_id
      this.model.edit_state_id = jamb.state_id
      this.model.edit_lga_id = jamb.lga_id
      this.model.edit_dob = jamb.dob
      this.model.edit_address = jamb.address
      this.model.edit_gender = jamb.sex
      this.model.edit_registration_number = jamb.registration_number
      this.model.edit_email = jamb.email
      this.model.edit_photo = jamb.photo
      this.model.name = jamb.jamb_name
    },
    submitEditedPUTMEStudent(){
      this.editLoading = true
      this.bodyFormData = new FormData();
      this.bodyFormData.append('photo', this.$refs.file.files[0])
      this.bodyFormData.append('screening_id', this.model.edit_screening_id)
      this.bodyFormData.append('name', this.model.name)
      this.bodyFormData.append('registration_number', this.model.edit_registration_number)
      this.bodyFormData.append('dob', this.model.edit_dob)
      this.bodyFormData.append('email', this.model.edit_email)
      this.bodyFormData.append('primary_phone', this.model.edit_phone_number)
      this.bodyFormData.append('secondary_phone', this.model.edit_secondary_phone)
      this.bodyFormData.append('marital_status', this.model.edit_marital_status)
      this.bodyFormData.append('country_id', this.model.edit_country_id)
      this.bodyFormData.append('state_id', this.model.edit_state_id)
      this.bodyFormData.append('lga_id', this.model.edit_lga_id)
      this.bodyFormData.append('address', this.model.edit_address)
      this.bodyFormData.append('faculty_id', this.model.edit_faculty_id)
      this.bodyFormData.append('department_id', this.model.edit_department_id)
      this.bodyFormData.append('no_of_sittings', this.model.edit_no_of_sittings)
      this.bodyFormData.append('gender', this.model.edit_gender)

      this.$store.dispatch('get-started/updatePUTMEStudent', this.bodyFormData)
        .then(res => {
          if(res.data.status){
            this.editLoading = false
            this.clearForm()
            $('#edit_putme_student').modal('hide').data( 'bs.modal', null )
            this.$toast.success('Student details was successfully updated')
            this.getAllUsers(1)
          }else{
            this.editLoading = false
            this.$toast.error(res.data.message)
          }
      }).catch(err => {
        this.editLoading = false
        this.$toast.error(err)
      })
    },
    clearForm() {
      this.model = {
        name: "",
        id: 0,
        user_id: 0,
        export_year: "",
        edit_name: "",
        edit_gender: "",
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
        edit_secondary_phone: '',
        edit_no_of_sittings: ''
      }
    },
    printForm(registration_number) {
      let url = config.backend + 'forms/registration-print?jamb_reg_no=' + registration_number
      window.open(url, '_blank')
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
        this.getDetailsLoading = true
        this.$store
            .dispatch('get-started/getPUTMERegistrationDetails', registration_number)
            .then(res => {
            if(res != undefined){
                if(res.data.status == true){
                  this.putmeDetails = res.data
                  console.log(this.putmeDetails)
                  this.getDetailsLoading = false
                }else{
                  this.ErrMsg = "Error Fetching data!"
                  this.getDetailsLoading = false
                }
            }else{
              this.ErrMsg = "Error Fetching data!"
              this.getDetailsLoading = false
            }
        }).catch(err => {
          this.getDetailsLoading = false
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
          this.getDepartmentsByFacultyId(event.target.value)
        }else{
            this.model.export_department_id = ''
            this.departments = []
        }
    },
    exportOlevel(user){
        this.exportLoading = true
        this.$store
            .dispatch('get-started/exportOLevel', user)
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
    exportRegisteredPutmeStudents() {
      $('#exportBtn').attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i> Exporting...');
      this.searchData.export = true
      this.$store.dispatch('reports/exportRegisteredPutmeStudents', this.searchData)
        .then(res =>{
          $('#exportBtn').attr('disabled', false).html('<i class="fa fa-file-excel-o"></i>&nbsp; Export');
          let fileURL = window.URL.createObjectURL(new Blob([res.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}));
          let fileLink = document.createElement('a');
          fileLink.href = fileURL;
          fileLink.setAttribute('download', 'putme-registration-report.xlsx');
          document.body.appendChild(fileLink);
          fileLink.click();
          this.exLoading = false
          this.searchData.export = false
          this.$toast.success('Record Exported to Excel Successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
        }).catch(err =>{
        $('#exportBtn').attr('disabled', false).html('<i class="fa fa-file-excel-o"></i>&nbsp; Export');
        this.$toast.error(err)
      })
    },
    refresh() {
      this.searchData = {
        registration_number: '',
        screening_id: '',
        from: '',
        to: '',
        session_id: '',
        faculty_id: '',
        department_id: '',
        entry_mode: '',
        year :'',
        export: false
      }
      this.countRegisteredPutmeStudents()
      this.getAllUsers(1)
    },
    searchRecord() {
      this.getLoading = true
      this.users = []
      this.searchData.page = 1
      this.searchData.export = false
      $('#searchBtn').attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i> Searching...');
      this.$store
        .dispatch('reports/getRegisteredPutmeStudents', this.searchData)
        .then(res => {
          $('#searchBtn').attr('disabled', false).html('<i class="fa fa-search" />&nbsp;Search Record');
          if(res.data.status){
            this.getLoading = false
            this.users = res.data.data.data
            this.pagination = res.data.data
          }else{
            this.getLoading = false
            this.ErrMsg = "Error Fetching data!"
          }
        }).catch(err => {
        $('#searchBtn').attr('disabled', false).html('<i class="fa fa-search" />&nbsp;Search Record');
        this.getLoading = false
        this.$toast.error(err)
      })
    },
    countRegisteredPutmeStudents() {
      this.count = 0
      this.$store.dispatch('utility/countPutmeStudent')
        .then(res => {
          this.count = res.data.data
        })
    },
    getAllUsers(page){
      this.getLoading = true
      this.users = []
      this.searchData.page = page
        this.$store
            .dispatch('reports/getRegisteredPutmeStudents', this.searchData)
            .then(res => {
            if(res != undefined){
              if(res.data.status){
                this.users = res.data.data.data
                this.pagination = res.data.data
                this.getLoading = false
              }
              this.getLoading = false
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
      this.countRegisteredPutmeStudents()
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
