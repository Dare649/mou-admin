<template>
  <div class="content sm-gutter">
    <!-- START BREADCRUMBS -->
    <div class="bg-white">
      <div class="container p-l-5">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
          <li class="breadcrumb-item"><a href="#">Reports</a></li>
          <li class="breadcrumb-item active">Acceptance Letter Report</li>
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
              <label>Reg Num:</label>
              <input type="text" v-model="searchData.registration_number" class="form-control" placeholder="Reg Number" required />
            </div>
            <div class="col-md-4">
              <label>From Date:</label>
              <input type="date" v-model="searchData.from" class="form-control" required />
            </div>
            <div class="col-md-4">
              <label>To Date:</label>
              <input type="date" v-model="searchData.to" class="form-control" required />
            </div>
          </div>
          <div class="row m-t-5">
            <div class="col-md-4">
              <label>College:</label>
              <select class="form-control" @change="getDepartmentByCollege($event)" v-model="searchData.faculty_id">
                <option value="" selected>All</option>
                <option v-for="college in colleges" :value="college.id">{{college.name}}</option>
              </select>
            </div>
            <div class="col-md-4">
              <label>Department:</label>
              <select class="form-control" v-model="searchData.department_id">
                <option value="" selected>All</option>
                <option v-for="department in departments" :value="department.id">{{department.name}}</option>
              </select>
            </div>
            <div class="col-md-4">
              <label>Entry Mode:</label>
              <select class="form-control" v-model="searchData.entry_mode">
                <option value="" selected>All</option>
                <option value="JAMB">PUTME</option>
                <option value="DE">Direct Entry</option>
              </select>
            </div>
          </div>
          <div class="row m-t-15">

            <div class="col-md-6">
              <button type="button" id="exportBtn" @click="exportData" class="btn btn-danger"><i class="fa fa-file-excel-o"></i>&nbsp; Export to Excel </button>
            </div>
            <div class="col-md-6 text-right">
              <button type="button" @click="getAcceptanceLetter(1)" class="btn btn-primary"><i class="fa fa-search"></i>&nbsp; Search Record</button>
            </div>
          </div>
        </div>
      </div>
      <div class="card card-default">
        <div class="card-header separator">
          <h3 class="text-primary no-margin pull-left sm-pull-reset">Acceptance Letter Report</h3>
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
                  <th>Reg No.</th>
                  <th style="width:30%">Name</th>
                  <th>Program.</th>
                  <th>Date Accepted.</th>
                  <th style="width:8%">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td colspan="5">Loading......Please wait</td>
                </tr>
                <tr v-if="!loading && Object.keys(students).length < 1">
                  <td colspan="5">No record at the moment. Change the search criteria above and click "Search Record" button </td>
                </tr>
                <tr v-if="!loading && Object.keys(students).length > 0" v-for="student in students">
                  <td>{{ student.reg_number }}</td>
                  <td>{{ student.name }}</td>
                  <td>{{ student.program }}</td>
                  <td>{{ $moment(student.form_acceptance_dt).format('MMMM Do YYYY') }}</td>
                  <td>
                    <div class="btn-group">
                      <span data-placement="top" data-toggle="tooltip" title="View Acceptance Letter">
                        <a href="javascript:;" @click="viewAcceptanceLetter(student.reg_number)" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-map"></i></a>
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <Pagination
              v-bind:pagination="pagination"
              v-on:click.native="getAcceptanceLetter(pagination.current_page)"
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
  data: () =>({
    loading: false,
    searchData: {
      registration_number: '',
      faculty_id: '',
      department_id: '',
      year: '',
      from: '',
      entry_mode: '',
      to: '',
      export: false
    },
    pagination: {
      total: 0,
      per_page: 2,
      from: 1,
      to: 0,
      current_page: 1
    },
    students: [],
    colleges: [],
    departments: []
  }),
  methods: {
    cancelSearch() {
      this.searchData.registration_number = ''
      this.searchData.faculty_id = ''
      this.searchData.department_id = ''
      this.searchData.year = ''
      this.searchData.from = ''
      this.searchData.entry_mode = ''
      this.searchData.to = ''
      this.searchData.export = false
      this.getAcceptanceLetter(this.pagination.current_page)
    },
    refreshData() {
      this.getAcceptanceLetter()
    },
    viewAcceptanceLetter(reg_num) {
      let url = config.backend + "session/acceptance-letter/print/" + reg_num
      window.open(url, '_blank')
    },
    exportData() {
      $('#exportBtn').attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i> Exporting...');
      this.searchData.export = true
      this.$store.dispatch('reports/exportAcceptanceStudents', this.searchData)
        .then(res =>{
          $('#exportBtn').attr('disabled', false).html('<i class="fa fa-file-excel-o"></i>&nbsp; Export');
          let fileURL = window.URL.createObjectURL(new Blob([res.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}));
          let fileLink = document.createElement('a');
          fileLink.href = fileURL;
          fileLink.setAttribute('download', 'acceptance-letter-report.xlsx');
          document.body.appendChild(fileLink);
          fileLink.click();
          this.exLoading = false
          this.$toast.success('Record Exported to Excel Successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
        }).catch(err =>{
          $('#exportBtn').attr('disabled', false).html('<i class="fa fa-file-excel-o"></i>&nbsp; Export');
          this.$toast.error(err)
      })
    },
    getAcceptanceLetter(page) {
      this.loading = true
      this.searchData.page = page
      this.$store.dispatch('reports/getAcceptanceStudents', this.searchData)
        .then(res =>{
          if(res.data.status) {
            this.students = res.data.data.data
            this.pagination = res.data.data
          }
          this.loading = false
        }).catch(err =>{
        this.loading = false
        this.$toast.error(err)
      })
    },
    getColleges() {
      this.$store.dispatch('utility/getFaculties')
        .then(res =>{
          this.colleges = res.data
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
    this.getColleges()
  }
}
</script>
