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
                        <a href="javascript:;" class="btn btn-default btn-sm" role="button"><i class="fa fa-edit"></i></a>
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
    programs: [],
    sessions: [],
    modes: [],
    applications: [],
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
  }
}
</script>
