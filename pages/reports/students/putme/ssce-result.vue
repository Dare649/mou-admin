<template>

        <div class="content sm-gutter">
        <!-- START BREADCRUMBS -->
            <div class="bg-white">
                <div class="container p-l-5">
                    <ol class="breadcrumb breadcrumb-alt">
                        <li class="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                        <li class="breadcrumb-item"><a href="#">Reports</a></li>
                        <li class="breadcrumb-item active">Student SSCE Results</li>
                    </ol>
                </div>
            </div>
            <!-- END BREADCRUMBS -->
            <!-- START CONTAINER FLUID -->
            <div class="container sm-padding-10 p-t-20 p-b-20">
              <div class="card card-default">
                <div class="card-header">
                  <div class="card-title text-primary">Search Options</div>
                </div>
                <div class="card-body">
                  <form style="width: 100%">
                    <div class="row">
                      <div class="col-md-4">
                        <label>Reg Num:</label>
                        <input type="text" class="form-control" placeholder="Reg Number (Optional)" v-model="model.registration_number" />
                      </div>
                      <div class="col-md-4">
                        <label>From Date:</label>
                        <input type="date" class="form-control" required v-model="model.from_dt" />
                      </div>
                      <div class="col-md-4">
                        <label>To Date:</label>
                        <input type="date" class="form-control" required v-model="model.to_dt" />
                      </div>
                    </div>
                    <div class="row m-t-5">
                      <div class="col-md-4">
                        <label>College:</label>
                        <select class="form-control" v-model="model.faculty_id" @change="populateDepartments($event)">
                          <option value="" selected>All</option>
                          <option v-for="faculty in faculties" :key="faculty.id" :value="faculty.id">{{faculty.name}}</option>
                        </select>
                      </div>
                      <div class="col-md-4">
                        <label>Department:</label>
                        <select class="form-control" v-model="model.department_id">
                          <option value="" selected>All</option>
                          <option v-for="department in departments" :key="department.id" :value="department.id">{{department.name}}</option>
                        </select>
                      </div>
                      <div class="col-md-4">
                        <label>Exam Type:</label>
                        <select class="form-control" v-model="model.exam_type">
                          <option value="" selected>All</option>
                          <option value="waec">WAEC</option>
                          <option value="neco">NECO</option>
                          <option value="nabteb">NABTEB</option>
                        </select>
                      </div>
                    </div>
                    <div class="row m-t-5">
                      <div class="col-md-4">
                        <label>Select Year</label>
                        <select class="form-control" required v-model="model.year">
                          <option value="" selected>All</option>
                          <option  value="2019">Year --- 2019/2020</option>
                          <option  value="2020">Year --- 2020/2021</option>
                          <option  value="2021">Year --- 2021/2022</option>
                          <option  value="2022">Year --- 2022/2023</option>
                          <option  value="2023">Year --- 2023/2014</option>
                        </select>
                      </div>
                      <div class="col-md-2 m-t-30">
                        <button type="button" @click="searchRecord()" v-if="!sLoading" class="btn btn-primary btn-block">
                          <i class="fa fa-search" />&nbsp;Search Record
                        </button>
                        <button type="submit" disabled v-if="sLoading" class="btn btn-primary btn-block"><i class="fa fa-search"></i>&nbsp; Searching...</button>
                      </div>
                      <div class="col-md-2 m-t-30">
                        <button type="button" v-if="!exportLoading"  @click="exportStudentSSCEs()" class="btn btn-danger btn-block">
                          <i class="fa fa-file-excel-o" />&nbsp;Export to csv
                        </button>
                        <button type="button" disabled v-if="exportLoading" class="btn btn-primary btn-block">Downloading</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div class="card card-default">
                  <div class="card-header  separator">
                      <h3 class="text-primary no-margin p-b-10">O-Level Students</h3>
                      <div class="pull-right sm-pull-reset">
                        <button type="button" class="btn btn-success btn-sm" @click="refresh()"><i class="fa fa-refresh"></i>&nbsp; Refresh </button>
                      </div>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-striped table-condensed" id="basicTable">
                        <thead>
                        <tr>
                          <th style="width:20%">Name</th>
                          <th style="width:20%">Email</th>
                          <th>Reg No.</th>
                          <th>Gender</th>
                          <th>Status</th>
                          <th>Verified on</th>
                          <th>Type</th>
                          <!-- <th style="width:10%">Action</th> -->
                        </tr>
                        </thead>
                        <tbody>
                          <tr v-if="Loading">
                            <td colspan="4">Loading....Please wait.</td>
                          </tr>
                          <tr v-if="(!Loading && candidates.length <= 0)">
                            <td colspan="4">No record at the moment</td>
                          </tr>
                          <tr v-for="can in candidates" :key="can.id">
                            <td>{{can.name}}</td>
                            <td>{{can.email}}</td>
                            <td>{{can.reg_number}}</td>
                            <td>{{can.gender == 'F' ? 'Female' : 'Male'}}</td>
                            <td>{{can.status == 1 ? 'Verified' : 'Not Verified'}}</td>
                            <td>{{can.verified_on}}</td>
                            <td v-if="can.type != null">{{can.type.toUpperCase()}}</td>
                            <!-- <td>
                              <div class="btn-group">
                                <span data-placement="top" data-toggle="tooltip" title="View WAEC Details">
                                  <a href="#view_jamb_result" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-eye"></i></a>
                                </span>
                              </div>
                            </td> -->
                          </tr>
                        </tbody>
                      </table>
                      <Pagination
                        v-bind:pagination="pagination"
                        v-on:click.native="getSsceResult(pagination.current_page)"
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

export default {
  layout: 'main',
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
        Loading: false,
        deleteLoading: false,
        exportLoading: false,
        academic_sessions: [],
        departments: [],
        importResponse: {},
        sLoading: false,
        programs: [],
        file: "",
        colleges: [],
        candidates: [],
        admission_categories: [],
        faculties: [],
        model: {
          year:"",
          registration_number: "",
          from_dt: "",
          to_dt: "",
          faculty_id: "",
          department_id: "",
          exam_type: "",
          export: true
        },
      }
    },
    methods: {
      refresh() {
        this.candidates = []
        this.model.year = ""
        this.model.registration_number = ""
        this.model.from_dt = ""
        this.model.to_dt = ""
        this.model.faculty_id = ""
        this.model.department_id = ""
        this.model.exam_type = ""
        this.getSsceResult(1)
      },
      searchRecord(){
        this.sLoading = true
        let payload = {}
        payload.year = this.model.year
        payload.registration_number = this.model.registration_number
        payload.from_dt = this.model.from_dt
        payload.to_dt = this.model.to_dt
        payload.faculty_id = this.model.faculty_id
        payload.department_id = this.model.department_id
        payload.exam_type = this.model.exam_type
        payload.page = 1
        payload.export = false
        this.$store
            .dispatch('get-started/getSsceResultReport', payload)
                .then(res => {
                if(res != undefined){
                    this.sLoading = false
                    this.candidates = res.data.data
                    this.pagination = res.data
                }else{
                    this.sLoading = false
                    alert("File Downloaded Unsuccessful")
                }
            }).catch(err => {
              this.sLoading = false
          })
      },
      getFaculties(page){
          this.$store
              .dispatch('get-started/getAllFaculties')
              .then(res => {
              if(res !== undefined){
                  this.faculties = res
              }else{
                  this.ErrMsg = "Error Fetching data!"
              }
          }).catch(err => {
          })
      },
      populateDepartments(event){
          this.model.export_department_id = ""
          this.departments = []
          if(event.target.value !== ""){
              this.getDepartmentsByFacultyId(event.target.value)
          }else{
              this.model.export_department_id = ""
              this.departments = []
          }
      },
      getDepartmentsByFacultyId(facultyId) {
          let payload = {}
          payload.facultyId = facultyId
          this.$store
              .dispatch('get-started/getAllDepartmentsByFacultyId', payload)
              .then(res => {
              if(res !== undefined){
                  this.departments = res
              }else{
                  this.ErrMsg = "Error Logging in!"
              }
          }).catch(err => {
          })
      },
      getSsceResult(page) {
        this.Loading = true
        let payload = {}
        payload.year = ""
        payload.registration_number = ""
        payload.from_dt = ""
        payload.to_dt = ""
        payload.faculty_id = ""
        payload.department_id = ""
        payload.exam_type = ""
        payload.export = false
        payload.page = page
        this.$store
            .dispatch('get-started/getSsceResultReport', payload)
                .then(res => {
                if(res != undefined){
                  this.Loading = false
                  this.candidates = res.data.data
                  this.pagination = res.data
                }else{
                    this.Loading = false
                    alert("File Downloaded Unsuccessful")
                }
            }).catch(err => {
              this.exLoading = false
          })
      },
      exportStudentSSCEs(){
        this.exportLoading = true
        let payload = {}
        payload.year = this.model.year
        payload.registration_number = this.model.registration_number
        payload.from_dt = this.model.from_dt
        payload.to_dt = this.model.to_dt
        payload.faculty_id = this.model.faculty_id
        payload.department_id = this.model.department_id
        payload.exam_type = this.model.exam_type
        payload.export = this.model.export
        this.$store
          .dispatch('get-started/exportSSCEResults', payload)
          .then(res => {
            if(res){
              this.exportLoading = false
              this.$toast.success('Records exported to excel successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
            }else{
              this.exportLoading = false
              alert("File Downloaded Unsuccessful")
            }
        }).catch(err => {
          this.exportLoading = false
          alert("File Downloaded Unsuccessful")
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
      this.getFaculties()
      this.getSsceResult(1)
    }
}
</script>
