<template>
  <div class="content sm-gutter">
    <!-- START BREADCRUMBS -->
    <div class="bg-white">
      <div class="container p-l-5">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
          <li class="breadcrumb-item"><a href="#">CEC</a></li>
          <li class="breadcrumb-item active">CEC Application Report</li>
        </ol>
      </div>
    </div>
    <!-- END BREADCRUMBS -->

    <!-- START CONTAINER FLUID -->
    <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
      <div class="card card-default">
        <div class="card-header">
          <div class="card-title text-primary">CEC Application Report</div>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-3">
              <label>CAN:</label>
              <input type="text" v-model="formData.can" class="form-control" placeholder="CEC Application Number" />
            </div>
            <div class="col-md-3">
              <label>Session:</label>
              <select class="form-control" id="session" v-model="formData.session">
                <option value="" selected>All</option>
                <option v-for="session in sessions" :value="session.id">{{ session.cec_session_name }}</option>
              </select>
            </div>
            <div class="col-md-3">
              <label>From Date:</label>
              <input type="date" v-model="formData.from_date" class="form-control" />
            </div>
            <div class="col-md-3">
              <label>To Date:</label>
              <input type="date" v-model="formData.to_date"  class="form-control" />
            </div>

          </div>
          <div class="row m-t-5">
            <div class="col-md-3">
              <label>College:</label>
              <select id="college" class="form-control" @change="getDepartmentByCollege" v-model="formData.faculty">
                <option value="" selected>All</option>
                <option v-for="college in colleges" :value="college.id">{{college.name}}</option>
              </select>
            </div>
            <div class="col-md-3">
              <label>Department:</label>
              <select id="department" class="form-control" @change="getProgramByDeptId" v-model="formData.department">
                <option value="" selected>All</option>
                <option v-for="department in departments" :value="department.id">{{department.name}}</option>
              </select>
            </div>
            <div class="col-md-3">
              <label>Program:</label>
              <select id="program" class="form-control" v-model="formData.program">
                <option value="" selected>All</option>
                <option v-for="program in programs" :value="program.id">{{program.name}}</option>
              </select>
            </div>
            <div class="col-md-3">
              <label>Entry Mode:</label>
              <select id="mode" v-model="formData.entry_mode" class="form-control">
                <option value="" selected>All</option>
                <option v-for="mode in modes" :value="mode.id">{{mode.name}}</option>
              </select>
            </div>
          </div>
          <div class="row m-t-20">
            <div class="col-md-2">
              <button type="button" @click="getApplications(1, 'searchBtn', 'Search Record')" id="searchBtn" class="btn btn-primary btn-block">&nbsp;Search Record</button>
            </div>
            <div class="col-md-2">
              <button type="submit" id="exportBtn" class="btn btn-danger btn-block">&nbsp;Export to Excel</button>
            </div>
          </div>
        </div>
      </div>
      <div class="card card-default">
        <div class="card-header separator">
          <h3 class="text-primary no-margin pull-left sm-pull-reset">Payment Transaction Report</h3>
          <div class="pull-right sm-pull-reset">
            <button type="button" @click="refresh" id="refreshBtn" class="btn btn-success btn-sm">&nbsp; Refresh </button>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-striped table-condensed" id="basicTable">
              <thead>
                <tr>
                  <th></th>
                  <th>CAN</th>
                  <th style="width: 20%;">Name</th>
                  <th>Mode</th>
                  <th>Date registered</th>
                  <th>Status</th>
                  <th style="width: 8%;">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td colspan="7">Loading...please wait</td>
                </tr>
                <tr v-if="!loading && applications.length < 1">
                  <td colspan="7">No records at the moment</td>
                </tr>
                <tr v-if="!loading && applications.length > 0" v-for="app in applications" :key="app.id">
                  <td>
                    <img width="50" height="50" v-if="app.photo_url === '' || app.photo_url === null" src="/assets/img/avatar.png" class="img-responsive">
                    <img width="50" height="50" v-else :src="app.photo_url" class="img-responsive">
                  </td>
                  <td>{{ app.cec_application_number }}</td>
                  <td>{{ app.applicant_name }}</td>
                  <td>{{ app.entry_mode.name }}</td>
                  <td>{{ $moment(app.created_at).format('DD-MM-YYYY') }}</td>
                  <td v-if="app.is_paid === 1">Successful</td>
                  <td v-if="app.is_paid === 0">Pending</td>
                  <td v-if="app.is_paid === 2">Failed</td>
                  <td>
                    <div class="btn-group">
                      <span data-placement="top" data-toggle="tooltip" title="Edit">
                        <a href="javascript:;" @click="edit(app)" class="btn btn-default btn-sm" role="button"><i class="fa fa-edit"></i></a>
                      </span>
                      <span v-if="app.is_paid === 1" data-placement="top" data-toggle="tooltip" title="View Payment">
                        <a href="javascript:;" class="btn btn-default btn-sm" role="button"><i class="fa fa-eye"></i></a>
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <Pagination
              v-bind:pagination="pagination"
              v-on:click.native="getApplications(pagination.current_page)"
              :offset="4">
            </Pagination>
          </div>
        </div>
      </div>
    </div>
    <!-- END CONTAINER FLUID -->


    <div class="modal fade SlideUp" id="edit_cec_application" tabindex="-1" role="dialog" aria-hidden="true">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        <i class="pg-close"></i>
      </button>
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="text-left p-b-5"><span class="semi-bold">EDIT CEC APPLICATION DETAILS</span></h5>
          </div>
          <div class="modal-body">
            <form class="full-width" @submit.prevent="submitCecEdit">
              <table>
                <tr class="col-lg-12 m-b-10">
                  <td><label>CEC Entry Mode:</label></td>
                  <td>
                    <select id="mode" v-model="editData.entry_mode" class="form-control">
                      <option value="" selected>All</option>
                      <option v-for="mode in modes" :value="mode.id">{{mode.name}}</option>
                    </select>
                  </td>
                </tr>
                <tr class="col-lg-12 m-b-10">
                  <td><label>CAN:</label></td>
                  <td>
                    <input type="text" v-model="editData.can" readonly class="form-control" />
                  </td>
                </tr>
                <tr class="col-lg-12 m-b-10">
                  <td><label>Name:</label></td>
                  <td>
                    <input type="text" v-model="editData.name" class="form-control" />
                  </td>
                </tr>
                <tr class="col-lg-12 m-b-10">
                  <td><label>Marital Status:</label></td>
                  <td>
                    <select class="full-width form-control" v-model="editData.marital_status" required="required">
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
                    <select class="full-width form-control" v-model="editData.gender" required="required">
                      <option value="" disabled>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </td>
                </tr>
                <tr class="col-lg-12 m-b-10">
                  <td><label>Phone Number:</label></td>
                  <td>
                    <input type="text" v-model="editData.phone" placeholder="Phone Number" class="form-control">
                  </td>
                </tr>
                <tr class="col-lg-12 m-b-10">
                  <td><label>Email Address:</label></td>
                  <td>
                    <input type="email" v-model="editData.email" placeholder="Email Address" class="form-control">
                  </td>
                </tr>
                <tr class="col-lg-12 m-b-10">
                  <td><label>Date of birth:</label></td>
                  <td>
                    <input type="date" v-model="editData.dob" class="form-control">
                  </td>
                </tr>
                <tr class="col-lg-12 m-b-10">
                  <td><label>Address:</label></td>
                  <td>
                    <input type="text" v-model="editData.address" placeholder="Address" class="form-control">
                  </td>
                </tr>
                <tr class="col-lg-12 m-b-10">
                  <td><label>Country:</label></td>
                  <td>
                    <select class="form-control" @change="getStatesByCountryID" v-model="editData.country">
                      <option value="" selected>Select your option</option>
                      <option v-for="country in countries" :key="country.id" :value="country.id">{{country.name}}</option>
                    </select>
                  </td>
                </tr>
                <tr class="col-lg-12 m-b-10">
                  <td><label>State:</label></td>
                  <td>
                    <select class="form-control" @change="getLGAsByStateID" v-model="editData.state">
                      <option value="" selected>Select your option</option>
                      <option v-for="state in states" :key="state.id" :value="state.id">{{state.name}}</option>
                    </select>
                  </td>
                </tr>
                <tr class="col-lg-12 m-b-10">
                  <td><label>LGA:</label></td>
                  <td>
                    <select class="form-control" v-model="editData.lga">
                      <option value="" selected>Select your option</option>
                      <option v-for="lga in lgas" :key="lga.id" :value="lga.id">{{lga.name}}</option>
                    </select>
                  </td>
                </tr>
                <tr class="col-lg-12 m-b-10">
                  <td><label>Faculty:</label></td>
                  <td>
                    <select class="form-control" @change="getDepartmentByCollegeEdit" v-model="editData.faculty">
                      <option value="" selected>Select your option</option>
                      <option v-for="faculty in colleges" :key="faculty.id" :value="faculty.id">{{faculty.name}}</option>
                    </select>
                  </td>
                </tr>
                <tr class="col-lg-12 m-b-10">
                  <td><label>Department:</label></td>
                  <td>
                    <select class="form-control" v-model="editData.department">
                      <option value="" selected>Select your option</option>
                      <option v-for="department in department_edits" :key="department.id" :value="department.id">{{department.name}}</option>
                    </select>
                  </td>
                </tr>
                <tr class="col-lg-12 m-b-10">
                  <td><label>Entry Qualification:</label></td>
                  <td>
                    <select required v-model="editData.entry_qualification" class="form-control">
                      <option value="" selected>Select</option>
                      <option value="WAEC/NECO/NABTEB with 5 credits and above in a sitting">
                        WAEC/NECO/NABTEB with 5 credits and above in a sitting
                      </option>
                      <option value="WAEC/NECO/NABTEB with 5 credits and above in 2 sittings">
                        WAEC/NECO/NABTEB with 5 credits and above in 2 sittings
                      </option>
                    </select>
                  </td>
                </tr>
                <tr class="col-lg-12 m-b-10">
                  <td><label>Institution attended:</label></td>
                  <td>
                    <input type="text" placeholder="Institution attended" v-model="editData.institution_attended" class="form-control">
                  </td>
                </tr>
              </table>
              <div class="row">
                <div class="col-lg-12 m-t-10">
                  <button type="submit" id="submitBtn" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Save Changes</button>
                  <button type="button" @click="cancelCec" class="btn btn-warning btn-lg btn-large fs-16 semi-bold">Cancel</button>
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
import config from "@/store/config";
export default {
  layout: 'main',
  components: {
    Pagination
  },
  data: () => ({
    loading: true,
    colleges: [],
    departments: [],
    department_edits: [],
    programs: [],
    sessions: [],
    modes: [],
    lgas: [],
    countries: [],
    states: [],
    applications: [],
    editData: {
      entry_mode: '',
      can: '',
      name: '',
      marital_status: '',
      gender: '',
      phone: '',
      email: '',
      dob: '',
      address: '',
      country: '',
      state: '',
      lga: '',
      faculty: '',
      department: '',
      entry_qualification: '',
      institution_attended: ''
    },
    formData: {
      faculty: '',
      department: '',
      program: '',
      session: '',
      entry_mode: '',
      can: '',
      from_date: '',
      to_date: '',
      page: ''
    },
    pagination: {
      total: 0,
      per_page: 2,
      from: 1,
      to: 0,
      current_page: 1
    },
  }),
  methods: {
    submitCecEdit() {
      $('#submitBtn').attr('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> Submitting');
      this.$store.dispatch('cec/submitEditApplication', this.editData)
        .then((res) => {
          $('#submitBtn').attr('disabled', false).html('Save Changes')
          if(res.data.status) {
            this.$toast.success(res.data.message)
            this.getApplications(this.pagination.current_page)
            $('#edit_cec_application').modal('hide')
            return
          }

          this.$toast.error('An error occurred')
        }).catch((err) => {
          $('#submitBtn').attr('disabled', false).html('Save Changes')
          this.$toast.error(err)
          this.loading = false
        })
    },
    edit(app) {
      this.editData.faculty = app.faculty_id
      this.getDepartmentByCollegeEdit()

      this.editData.country = 161
      this.getStatesByCountryID()

      this.editData.state = app.state_id
      this.getLGAsByStateID()

      this.editData = {
        entry_mode: app.cec_entry_mode_id,
        can: app.cec_application_number,
        name: app.applicant_name,
        marital_status: app.marital_status,
        gender: app.gender,
        phone: app.contact_number_1,
        email: app.email_address,
        dob: app.dob,
        address: app.applicant_address,
        country: 161,
        state: app.state_id,
        lga: app.lga_id,
        faculty: app.faculty_id,
        department: app.department_id,
        entry_qualification: app.entry_level_qualification,
        institution_attended: app.institution_attended
      }
      $('#edit_cec_application').modal()
    },
    cancelCec() {
      this.editData = {
        entry_mode: '',
        can: '',
        name: '',
        marital_status: '',
        gender: '',
        phone: '',
        email: '',
        dob: '',
        address: '',
        country: '',
        state: '',
        lga: '',
        faculty: '',
        department: '',
        entry_qualification: '',
        institution_attended: ''
      }
      $('#edit_cec_application').modal('hide')
    },
    getApplications(page, action, name) {
      $('#'+action).attr('disabled', true).html('<i class="fa fa-spin fa-spinner" />&nbsp;Searching')
      this.formData.page = page
      this.loading = true
      this.$store.dispatch('cec/getApplications', this.formData)
        .then(res => {
          $('#'+action).attr('disabled', false).html(name)
          this.loading = false
          if(res.data.status) {
            this.applications = res.data.data.data
            this.pagination = res.data.data
          }
        }).catch(err =>{
          $('#'+action).attr('disabled', false).html(name)
          this.loading = false
          this.$toast.error('An error ocurred')
        })
    },
    getColleges() {
      $('#college').attr('disabled', true)
      this.$store.dispatch('utility/getFaculties')
        .then(res =>{
          this.colleges = res.data
          $('#college').attr('disabled', false)
        }).catch(err =>{
        this.$toast.error(err)
      })
    },
    getDepartmentByCollege() {
      $('#department').attr('disabled', true)
      this.$store.dispatch('utility/getDepartmentByFaculty', this.formData.faculty)
        .then(res =>{
          this.departments = res.data
          $('#department').attr('disabled', false)
        }).catch(err =>{
        this.$toast.error(err)
      })
    },
    getDepartmentByCollegeEdit() {
      $('#department').attr('disabled', true)
      this.$store.dispatch('utility/getDepartmentByFaculty', this.editData.faculty)
        .then(res =>{
          this.department_edits = res.data
          $('#department').attr('disabled', false)
        }).catch(err =>{
        this.$toast.error(err)
      })
    },
    getCountries(){
      this.getloading = true
      this.$store
        .dispatch('get-started/getAllCountries')
        .then(res => {
          this.countries = res
        }).catch(err => {})
    },
    getStatesByCountryID(){
      let payload = {}
      payload.countryId = this.editData.country
      this.$store
        .dispatch('states/getAllStatesByCountryId', payload)
        .then(res => {
          this.states = res
        }).catch(err => {})
    },
    getLGAsByStateID() {
      let payload = {}
      payload.stateId = this.editData.state
      this.$store
        .dispatch('lgas/getAllLGAsByStateId', payload)
        .then(res => {
          this.lgas = res
        }).catch(err => {
      })
    },
    getProgramByDeptId() {
      $('#program').attr('disabled', true)
      this.$store.dispatch('utility/getProgramByDept', this.formData.department)
        .then(res =>{
          this.programs = res.data.data
          $('#program').attr('disabled', false)
        }).catch(err =>{
        this.$toast.error(err)
      })
    },
    getCecAcademicSession() {
      $('#session').attr('disabled', true)
      this.$store.dispatch('cec/CecAcademicSession')
        .then(res =>{
          this.sessions = res.data.data
          $('#session').attr('disabled', false)
        }).catch(err =>{
        this.$toast.error(err)
      })
    },
    getCecEntryMode() {
      $('#mode').attr('disabled', true)
      this.$store.dispatch('cec/getEntryMode')
        .then(res =>{
          this.modes = res.data.data
          $('#mode').attr('disabled', false)
        }).catch(err =>{
        this.$toast.error(err)
      })
    },
    refresh() {
      this.formData = {
        faculty: '',
          department: '',
          program: '',
          session: '',
          entry_mode: '',
          can: '',
          from_date: '',
          to_date: '',
          page: 1
      }
      this.getApplications(1, 'refreshBtn', 'Refresh')
    }
  },
  mounted() {
    this.getApplications(this.pagination.current_page)
    this.getColleges()
    this.getCecAcademicSession()
    this.getCecEntryMode()
    this.getCountries()
  }
}
</script>
