<template>
  <div class="content sm-gutter">
    <!-- START BREADCRUMBS -->
    <div class="bg-white">
      <div class="container p-l-5">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
          <li class="breadcrumb-item"><a href="#">Reports</a></li>
          <li class="breadcrumb-item active">Admissions Report</li>
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
              <input type="text" v-model="formData.registration_number" class="form-control" placeholder="Reg Number" />
            </div>
            <div class="col-md-4">
              <label>From Date:</label>
              <input type="date" v-model="formData.from" class="form-control" />
            </div>
            <div class="col-md-4">
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
                <option value="JAMB">PUTME</option>
                <option value="DE">Direct Entry</option>
              </select>
            </div>
          </div>
          <div class="row m-t-15">
            <div class="col-md-2">
              <button type="button" id="searchbtn" @click="getAdmissionList" class="btn btn-primary btn-block"><i class="fa fa-search"></i>&nbsp; Search Record</button>
            </div>
            <div class="col-md-2">
              <button type="button" id="exportBtn" @click="exportRecord" class="btn btn-danger btn-block"><i class="fa fa-file-excel-o"></i>&nbsp; Export to Excel</button>
            </div>
          </div>
        </div>
      </div>
      <div class="card card-default">
        <div class="card-header separator">
          <h3 class="text-primary no-margin pull-left sm-pull-reset">Admissions List Report</h3>
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
                <th style="width:10%">Action</th>
              </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td colspan="6">Loading...Please wait</td>
                </tr>
                <tr v-if="!loading && students.length < 1">
                  <td colspan="6">No record at the moment</td>
                </tr>
                <tr v-if="!loading" v-for="student in students">
                  <td>{{student.putme_reg_no}}</td>
                  <td>{{student.jamb_reg_no}}</td>
                  <td>{{ student.firstname }} {{student.middlename}} {{student.lastname}}</td>
                  <td>{{ (student.sex === 'F') ? 'Female' : 'Male'}}</td>
                  <td>{{student.totalscore}}</td>
                  <td>
                    <div class="btn-group">
                      <a href="javascript:;" title="View Admission Letter" @click="viewAdmissionLetter(student.jamb_reg_no)" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-eye"></i></a>
                      <button type="button" @click="markForApproval(student.jamb_reg_no)" v-if="student.marked_for_department == 0" title="Mark for departmental approval" class="btn btn-default btn-sm" role="button"><i class="fa fa-map-marker"></i></button>
                      <button type="button" disabled v-if="student.marked_for_department == 1" title="Marked" class="btn btn-success btn-sm" role="button"><i class="fa fa-map-marker"></i></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <Pagination
              v-bind:pagination="pagination"
              v-on:click.native="getAdmissionList(pagination.current_page)"
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
    loading: true,
    exLoading: false,
    sLoading: false
  }),
  methods: {
    viewAdmissionLetter(registration_number) {
      let url = config.backend + 'session/acceptance-letter/print/' + registration_number
      window.open(url, '_blank')
    },
    cancelSearch() {
      this.formData.registration_number = ''
      this.formData.faculty_id = ''
      this.formData.department_id = ''
      this.formData.year = ''
      this.formData.from = ''
      this.formData.entry_mode = ''
      this.formData.to = ''
      this.formData.export = false
      this.getAdmissionList(this.pagination.current_page)
    },
    markForApproval(reg_num) {
      if(confirm('Do you want to mark this student okay for departmental approval?')){
        this.approveData.registration_number = reg_num
        console.log(this.approveData)
        this.$toast.info('Processing...please wait', {duration: 6100})
        this.$store.dispatch('academic-session/markForDepartmentalApproval', this.approveData)
          .then(res =>{
            if(res.data.status) {
              this.$toast.success(res.data.message, {duration: 6100})
              this.getAdmissionList(this.pagination.current_page)
              return
            }

            this.$toast.error(res.data.message, {duration: 6100})
          }).catch(err =>{
          this.$toast.error(err, {duration: 6100})
        })
      }
    },
    getAdmissionList(page) {
      this.loading = true
      this.formData.page = page
      this.$store.dispatch('reports/getAdmissionList', this.formData)
        .then(res =>{
          console.log(res)
          this.loading = false
          if(res.data.status) {
            this.students = res.data.data.data
            console.log(this.students)
            this.pagination = res.data.data
          }
        }).catch(err =>{
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
      this.getAdmissionList(this.pagination.current_page)
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
    this.getAdmissionList(this.pagination.current_page)
  }
}
</script>
