<template>
  <div class="content sm-gutter">
    <!-- START BREADCRUMBS -->
    <div class="bg-white">
      <div class="container p-l-5">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
          <li class="breadcrumb-item"><a href="#">Reports</a></li>
          <li class="breadcrumb-item active">DE Admissions Report</li>
        </ol>
      </div>
    </div>
    <!-- END BREADCRUMBS -->

    <!-- START CONTAINER FLUID -->
    <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
      <div class="card card-default">
        <div class="card-header">
          <div class="card-title text-primary">Search Option</div>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-4">
              <label>Acadmic Session</label>
              <select class="form-control" v-model="formData.session_id">
                <option value="" selected>Select</option>
                <option v-for="session in sessions" :value="session.id" :key="session.id">{{session.session_name}}</option>
              </select>
            </div>
            <div class="col-md-4">
              <label>Reg Num:</label>
              <input type="text" v-model="formData.registration_number" class="form-control" placeholder="Reg Number" />
            </div>
            <div class="col-md-2">
              <label>From Date:</label>
              <input type="date" v-model="formData.from" class="form-control" />
            </div>
            <div class="col-md-2">
              <label>To Date:</label>
              <input type="date" v-model="formData.to" class="form-control" />
            </div>
          </div>
          <div class="row m-t-5">
            <div class="col-md-4">
              <label>College:</label>
              <select class="form-control" @change="getDepartmentByCollege($event)" v-model="formData.faculty_id">
                <option value="" selected>All</option>
                <option v-for="college in colleges" :value="college.id" :key="college.id">{{college.name}}</option>
              </select>
            </div>
            <div class="col-md-4">
              <label>Department:</label>
              <select class="form-control" v-model="formData.department_id">
                <option value="" selected>All</option>
                <option v-for="dept in departments" :value="dept.id" :key="dept.id">{{dept.name}}</option>
              </select>
            </div>
            <div class="col-md-4">
              <label>Entry Mode:</label>
              <select class="form-control" v-model="formData.entry_mode">
                <option value="" selected>All</option>
                <option value="JAMB">JAMB</option>
                <option value="DE">DIRECT ENTRY</option>
              </select>
            </div>
          </div>
          <div class="row m-t-15">
            <div class="col-md-6">
              <button type="button" id="exportBtn" @click="exportRecord" class="btn btn-danger"><i class="fa fa-file-excel-o"></i>&nbsp; Export to Excel</button>
            </div>
            <div class="col-md-6 text-right">
              <button type="button" id="searchBtn" @click="searchRecord()" class="btn btn-primary"><i class="fa fa-search"></i>&nbsp; Search Record</button>
            </div>
          </div>
        </div>
      </div>
      <div class="card card-default">
        <div class="card-header separator">
          <h3 class="text-primary no-margin pull-left sm-pull-reset">DE Admissions List Report</h3>
          <div class="pull-right sm-pull-reset">
            <button type="button" @click="cancelSearch" class="btn btn-default btn-sm"><i class="fa fa-stop"></i>&nbsp; Cancel Search </button>
            <button type="button" @click="refreshData" class="btn btn-success btn-sm"><i class="fa fa-refresh"></i>&nbsp; Refresh </button>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-striped table-condensed" id="basicTable">
              <thead>
              <tr>
                <th style="width: 25%;">PUTME No.</th>
                <th>Reg No.</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Total Score</th>
                <th>Placement Level</th>
                <th style="width:10%">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-if="loading">
                <td colspan="7">Loading...Please wait</td>
              </tr>
              <tr v-if="!loading && students.length < 1">
                <td colspan="7">No record at the moment. Change the search criteria above and click "Search Record" button </td>
              </tr>
              <tr v-if="!loading" v-for="student in students" :key="student.id">
                <td>{{student.putme.screening_id}}</td>
                <td>{{student.jamb_reg_no}}</td>
                <td>{{ student.name }}</td>
                <td>{{ (student.sex === 'F') ? 'Female' : 'Male'}}</td>
                <td>{{student.totalscore}}</td>
                <td>{{student.placement_level}}</td>
                <td>
                  <div class="btn-group">
                    <button type="button" @click="markForApproval(student.jamb_reg_no)" v-if="student.marked_for_department == 0" title="Mark for departmental approval" class="btn btn-default btn-sm" role="button"><i class="fa fa-map-marker"></i></button>
                    <button type="button" disabled v-if="student.marked_for_department == 1" title="Marked" class="btn btn-success btn-sm" role="button"><i class="fa fa-map-marker"></i></button>
                    <button type="button" @click="changePlacementLevel(student)" title="Change placement level" class="btn btn-default btn-sm" role="button">
                      <i class="fa fa-external-link"></i>
                    </button>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
            <Pagination
              v-bind:pagination="pagination"
              v-on:click.native="searchRecord(pagination.current_page)"
              :offset="4">
            </Pagination>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade SlideUp" id="placement-level" tabindex="-1" role="dialog" aria-hidden="true">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        <i class="pg-close"></i>
      </button>
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="text-left p-b-5"><span class="semi-bold">CHANGE PLACEMENT LEVEL</span></h5>
          </div>
          <div class="modal-body jamb_view">
            <h5 >Student Name: {{ studentData.name }}</h5>
            <table class="table table-striped table-bordered">
              <tr>
                <th>JAMB REG NUMBER:</th>
                <td>{{studentData.jamb_number}}</td>
              </tr>
              <tr>
                <th>PLACED LEVEL:</th>
                <td>{{ studentData.placed_level }}</td>
              </tr>
            </table>
            <div class="mt-3">
              <form class="full-width" @submit.prevent="submitPlacementLevel">
                <div class="col-lg-12 m-b-10">
                  <label><b>Select new placement level</b></label>
                  <select class="form-control" required v-model="studentData.placement_level">
                    <option value="">Select</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                    <option value="400">400</option>
                    <option value="500">500</option>
                    <option value="600">600</option>
                  </select>
                </div>
                <div class="col-lg-12 m-t-10">
                  <button type="submit" id="submitLevelBtn" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">
                    Change Level
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <!-- END CONTAINER FLUID -->
  </div>
</template>
<script>
import Pagination from '~/components/Pagination'
import config from '~/store/config.js'

export default {
  layout: 'main',
  components: {
    Pagination
  },
  data: () =>({
    pagination: {
      total: 0,
      per_page: 2,
      from: 1,
      to: 0,
      current_page: 1
    },
    formData: {
      registration_number: '',
      session_id: '',
      faculty_id: '',
      department_id: '',
      year: '',
      from: '',
      entry_mode: '',
      to: '',
      export: false
    },
    approveData: {
      registration_number: ''
    },
    colleges: [],
    departments: [],
    students: [],
    loading: false,
    exLoading: false,
    sLoading: false,
    studentData: {
      name: '',
      jamb_number: '',
      placed_level: '',
      placement_level: ''
    }
  }),
  methods: {
    viewAdmissionLetter(registration_number) {
      let url = config.backend + 'session/acceptance-letter/print/' + registration_number
      window.open(url, '_blank')
    },
    cancelSearch() {
      this.formData.registration_number = ''
      this.formData.faculty_id = ''
      this.formData.session_id = ''
      this.formData.department_id = ''
      this.formData.year = ''
      this.formData.from = ''
      this.formData.entry_mode = ''
      this.formData.to = ''
      this.formData.export = false
      this.searchRecord(this.pagination.current_page)
    },
    changePlacementLevel(student) {
      this.studentData.name = student.name
      this.studentData.jamb_number = student.jamb_reg_no
      this.studentData.placed_level = student.placement_level
      $("#placement-level").modal()
    },
    clearPlacementLevel() {
      this.studentData = {
        name: '',
        jamb_number: '',
        placed_level: ''
      }
    },
    submitPlacementLevel() {
      $('#submitLevelBtn').attr('disabled', true).html('Changing Levels...Please wait')
      this.$store.dispatch('student/changeDePlacementLevel', this.studentData)
        .then((response) => {
          $('#submitLevelBtn').attr('disabled', false).html('Change Level')

          if(response.data.status) {
            this.clearPlacementLevel()
            this.$toast.success(response.data.message)
            $("#placement-level").modal('hide')
            this.searchRecord(this.pagination.current_page)
            return
          }

          this.toast.error(response.data.message)
        }).catch((error) => {
          $('#submitLevelBtn').attr('disabled', false).html('Change Level')
          this.$toast.error(error)
        })
    },
    markForApproval(reg_num) {
      if(confirm('Do you want to mark this student okay for departmental approval?')){
        this.approveData.registration_number = reg_num
        this.$toast.info('Processing...please wait', {duration: 6100})
        this.$store.dispatch('academic-session/markForDepartmentalApproval', this.approveData)
          .then(res =>{
            if(res.data.status) {
              this.$toast.success(res.data.message, {duration: 6100})
              this.searchRecord(this.pagination.current_page)
              return
            }

            this.$toast.error(res.data.message, {duration: 6100})
          }).catch(err =>{
          this.$toast.error(err, {duration: 6100})
        })
      }
    },
    searchRecord(page) {
      this.loading = true;
      this.formData.page = page
      this.students = []
      $('#searchBtn').attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i> Searching...');
      this.$store.dispatch('reports/getDeAdmissionList', this.formData)
        .then(res =>{
          $('#searchBtn').attr('disabled', false).html('<i class="fa fa-search"></i>&nbsp; Search Record');
          this.loading = false
          if(res.data.status) {
            this.students = res.data.data.data
            this.pagination = res.data.data
          }
        }).catch(err =>{
        $('#searchBtn').attr('disabled', false).html('<i class="fa fa-search"></i>&nbsp; Search Record');
        this.loading = false
        this.$toast.error(err)
      })
    },
    exportRecord() {
      $('#exportBtn').attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i> Exporting...');
      this.formData.export = true
      this.$store.dispatch('reports/exportAdmissionList', this.formData)
        .then(res =>{
          $('#exportBtn').attr('disabled', false).html('<i class="fa fa-file-excel-o"></i>&nbsp; Export');
          let fileURL = window.URL.createObjectURL(new Blob([res.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}));
          let fileLink = document.createElement('a');
          fileLink.href = fileURL;
          fileLink.setAttribute('download', 'admission-list-report.xlsx');
          document.body.appendChild(fileLink);
          fileLink.click();
          this.$toast.success('Record Exported to Excel Successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
        }).catch(err =>{
        $('#exportBtn').attr('disabled', false).html('<i class="fa fa-file-excel-o"></i>&nbsp; Export');
        this.$toast.error(err)
      })
    },
    refreshData() {
      this.formData = {
        registration_number: '',
        faculty_id: '',
        department_id: '',
        year: '',
        from: '',
        entry_mode: '',
        to: '',
        export: false
      }
      this.searchRecord(this.pagination.current_page)
    },
    getColleges() {
      this.$store.dispatch('utility/getFaculties')
        .then(res =>{
          this.colleges = res.data
        }).catch(err =>{
        this.$toast.error(err)
      })
    },
    getSessions() {
      this.$store.dispatch('utility/getAllSession')
        .then(res =>{
          this.sessions = res.data;
          this.formData.session_id = this.sessions[0].id;
        }).catch(err =>{
        this.$toast.error(err)
      })
    },
    getDepartmentByCollege(e) {
      let id = e.target.value
      this.$store.dispatch('utility/getDepartmentByFaculty', id)
        .then(res =>{
          this.departments = res.data
        }).catch(err =>{
        this.$toast.error(err)
      })
    }
  },
  mounted() {
    this.getSessions();
    this.getColleges()
  }
}
</script>
