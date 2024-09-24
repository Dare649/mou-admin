<template>
  <div class="content sm-gutter">
    <!-- START BREADCRUMBS -->
    <div class="bg-white">
      <div class="container p-l-5">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
          <li class="breadcrumb-item"><a href="#">CEC</a></li>
          <li class="breadcrumb-item active">PG Application Report</li>
        </ol>
      </div>
    </div>
    <!-- END BREADCRUMBS -->

    <!-- START CONTAINER FLUID -->
    <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
      <div class="card card-default">
        <div class="card-header">
          <div class="card-title text-primary">PG Application Report</div>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-3">
              <label>PAN:</label>
              <input type="text" v-model="formData.pan" class="form-control" placeholder="PG Application Number" />
            </div>
            <div class="col-md-3">
              <label>Session:</label>
              <select class="form-control" id="session" v-model="formData.session">
                <option value="" selected>All</option>
                <option v-for="session in sessions" :value="session.id">{{ session.pg_session_name }}</option>
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
                <option value="Masters">Masters</option>
                <option value="PHD">PHD</option>
                <option value="PGD">PGD</option>
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
          <h3 class="text-primary no-margin pull-left sm-pull-reset">PG Application Report</h3>
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
                <th>PAN</th>
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
                  <img width="50" height="50" v-if="app.details.photo === '' || app.details.photo === null" src="/assets/img/avatar.png" class="img-responsive">
                  <img width="50" height="50" v-else :src="app.details.photo" class="img-responsive">
                </td>
                <td>{{ app.pg_application_number }}</td>
                <td>{{ app.details.first_name }} {{ app.details.last_name }}</td>
                <td>{{ app.entry_mode }} ({{ app.sub_entry_mode }})</td>
                <td>{{ $moment(app.created_at).format('DD-MM-YYYY') }}</td>
                <td v-if="app.status === 1">Successful</td>
                <td v-if="app.status === 0">Pending</td>
                <td v-if="app.status === 2">Failed</td>
                <td>
                  <div class="btn-group">
                    <!-- <span data-placement="top" data-toggle="tooltip" title="Edit">
                      <a href="javascript:;" @click="edit(app)" class="btn btn-default btn-sm" role="button"><i class="fa fa-edit"></i></a>
                    </span> -->
                    <span v-if="app.status === 1" data-placement="top" data-toggle="tooltip" title="View referees">
                      <a href="javascript:;" @click="viewReferees(app)" class="btn btn-default btn-sm" role="button"><i class="fa fa-eye"></i></a>
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


    <div class="modal fade SlideUp" id="view_referees" tabindex="-1" role="dialog" aria-hidden="true">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        <i class="pg-close"></i>
      </button>
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="text-left p-b-5"><span class="semi-bold">VIEW PG APPLICATION REFEREES</span></h5>
          </div>
          <div class="modal-body">
            <table class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                  <tr v-for="referee in referees" :key="referee.id">
                      <td>{{ referee.referee_name }}</td>
                      <td v-if="referee.status === 1"><span style="color: green;">Completed</span></td>
                      <td v-if="referee.status === 0"><span style="color: red;">Not completed</span></td>
                      <td>
                        <span v-if="referee.status === 1" data-placement="top" data-toggle="tooltip" title="Print reference">
                          <a href="javascript:;" @click="printReference(referee)" class="btn btn-default btn-sm" role="button"><i class="fa fa-print"></i></a>
                        </span>
                      </td>
                  </tr>
              </tbody>
            </table>
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
    formData: {
      faculty: '',
      department: '',
      program: '',
      session: '',
      entry_mode: '',
      pan: '',
      from_date: '',
      to_date: '',
      export: 'false',
      page: ''
    },
    pagination: {
      total: 0,
      per_page: 2,
      from: 1,
      to: 0,
      current_page: 1
    },
    referees: []
  }),
  methods: {
    printReference(referee) {
      let url = config.testBackend+'pg/print-referee?sorted_code='+referee.referee_code+'&connect_id='+referee.id
      window.open(url, '_blank')
    },
    viewReferees(app) {
      this.referees = app.referee
      $('#view_referees').modal()
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
    getApplications(page, action, name) {
      $('#'+action).attr('disabled', true).html('<i class="fa fa-spin fa-spinner" />&nbsp;Searching')
      this.formData.page = page
      this.loading = true
      this.applications = []
      this.$store.dispatch('pg/getAllPgApplications', this.formData)
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
        this.$toast.error('An error occurred')
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
    getPgAcademicSession() {
      $('#session').attr('disabled', true)
      this.$store.dispatch('pg/PgAcademicSession')
        .then(res =>{
          this.sessions = res.data.data
          $('#session').attr('disabled', false)
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
        pan: '',
        export: 'false',
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
    this.getPgAcademicSession()
  }
}
</script>
