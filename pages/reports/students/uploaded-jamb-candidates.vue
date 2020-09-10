<template>
  <div class="content sm-gutter">
    <!-- START BREADCRUMBS -->
    <div class="bg-white">
      <div class="container p-l-5">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
          <li class="breadcrumb-item"><a href="#">Reports</a></li>
          <li class="breadcrumb-item active">Uploaded JAMB Students</li>
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
          <form style="width: 100%">
            <div class="row">
              <div class="col-md-4">
                <label>Reg Num:</label>
                <input type="text" class="form-control" v-model="model.registration_number" placeholder="Reg Number" required />
              </div>
              <div class="col-md-4">
                <label>From Date:</label>
                <input type="date" class="form-control" v-model="model.from_date" required />
              </div>
              <div class="col-md-4">
                <label>To Date:</label>
                <input type="date" class="form-control" v-model="model.to_date" required />
              </div>
            </div>
            <div class="row m-t-5">
              <div class="col-md-3">
                <label>College:</label>
                <select class="form-control" v-model="model.faculty_id" @change="populateDepartments($event)">
                  <option value="" selected>-Select College-</option>
                  <option v-for="faculty in faculties" :key="faculty.id" :value="faculty.id">{{faculty.name}}</option>
                </select>
              </div>
              <div class="col-md-3">
                <label>Department:</label>
                <select class="form-control" v-model="model.department_id">
                  <option value="" selected>-Select Department-</option>
                  <option v-for="department in departments" :key="department.id" :value="department.id">{{department.name}}</option>
                </select>
              </div>
              <div class="col-md-3">
                <label>Entry Mode:</label>
                <select class="form-control" v-model="model.entry_mode">
                  <option value="" selected>-Select-</option>
                  <option value="JAMB">PUTME</option>
                  <option value="DE">Direct Entry</option>
                </select>
              </div>
              <div class="col-md-3">
                <label>Year:</label>
                <select class="form-control" v-model="model.year">
                  <option value="" selected>-Select Year-</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                </select>
              </div>
            </div>
            <div class="row m-t-15">
              <div class="col-md-2">
                <button type="submit" class="btn btn-primary btn-block"><i class="fa fa-search"></i>&nbsp; Search Record</button>
              </div>
              <div class="col-md-2">
                <button type="button" disabled v-if="exLoading" class="btn btn-danger btn-block">Exporting</button>
                <button type="button" v-if="!exLoading" @click="exportUploadedJambCandidates(true)"  class="btn btn-danger btn-block"><i class="fa fa-file-excel-o"></i>&nbsp; Export </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="card card-default">
        <div class="card-header separator">
          <h3 class="text-primary no-margin pull-left sm-pull-reset">Uploaded Jamb Result</h3>
          <div class="pull-right sm-pull-reset">
            <button type="button" class="btn btn-success btn-sm"><i class="fa fa-refresh"></i>&nbsp; Refresh </button>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-striped table-condensed" id="basicTable">
              <thead>
              <tr>
                <th>Full Name</th>
                <th>Reg No</th>
                <!-- <th>Email</th> -->
                <th>Gender</th>
                <th>Entry Mode</th>
                <th style="width:8%">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="can in candidates" :key="can.jamb_number">
                <td>{{can.name}}</td>
                <td>{{can.jamb_number}}</td>
                <!-- <td>chinicerow@yahoo.com</td> -->
                <td>{{can.sex == "F" ? "Female" : "Male"}}</td>
                <td>{{can.entry_mode}}</td>
                <td>
                  <div class="btn-group">
                    <span data-placement="top" data-toggle="tooltip" title="View Jamb Letter">
                      <a href="#" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-eye"></i></a>
                    </span>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
            <Pagination
              v-bind:pagination="pagination"
              v-on:click.native="getJambStudents(pagination.current_page)"
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
  name: 'uploaded',
  layout: 'main',
  components: {
    Pagination
  },
  data: () => ({
    faculties: [],
    departments: [],
    exLoading: false,
    Loading: false,
    candidates: [],
    model: {
      faculty_id: "",
      department_id: "",
      registration_number: "",
      year: "",
      entry_mode: "",
      from_date: "",
      to_date: ""
    },
    pagination: {
      total: 0,
      per_page: 2,
      from: 1,
      to: 0,
      current_page: 1
    }
  }),
  mounted: function() {
      if (!process.server) {
        const script1 = document.createElement('script')
        script1.type = 'text/javascript'
        script1.src = '/pages/js/pages.min.js'

        document.head.appendChild(script1)
      }

      //if(this.$laravel.hasPermission('View PUTME Result')){
        this.getFaculties()
        this.getUploadedJambCandidates(false)
      //   }else{
      //     this.$router.push(
      //           decodeURIComponent(
      //               this.$route.query.redirect || "/dashboard"
      //           )
      //       );
      //       this.$toast.error("Not Permitted to access this page! Contact the admin.", { icon: "times" });
      // }

    },
  methods: {
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
    getUploadedJambCandidates(IsExport){
      this.Loading = true
      let payload = {}
      payload.registration_number = ""
      payload.faculty_id = ""
      payload.department_id = ""
      payload.entry_mode = ""
      payload.year = ""
      payload.from_date = ""
      payload.to_date = ""
      payload.export = IsExport
      this.$store
          .dispatch('get-started/getUploadedJambCandidates', payload)
              .then(res => {
              if(res != undefined){
                  console.log(res)
                  this.Loading = false
                  this.candidates = res.data
              }else{
                  this.Loading = false
                  alert("File Downloaded Unsuccessful")
              }
          }).catch(err => {
            this.exLoading = false
        })
    },
    exportUploadedJambCandidates(IsExport){
      this.exLoading = true
      let payload = {}
      payload.registration_number = this.model.registration_number
      payload.faculty_id = this.model.faculty_id
      payload.department_id = this.model.department_id
      payload.entry_mode = this.model.entry_mode
      payload.year = this.model.year
      payload.from_date = this.model.from_date
      payload.to_date = this.model.to_date
      payload.export = IsExport
      this.$store
          .dispatch('get-started/exportUploadedJambCandidates', payload)
              .then(res => {
              if(res != undefined){
                  this.exLoading = false
                  console.log("Gether", res)
                  var fileURL = window.URL.createObjectURL(new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}));
                  var fileLink = document.createElement('a');
                  fileLink.href = fileURL;
                  fileLink.setAttribute('download', 'uploaded_jamb_students_reports.xlsx');
                  document.body.appendChild(fileLink);
                  fileLink.click();
                  this.exLoading = false
                  this.$toast.success('Record Exported to Excel Successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
              }else{
                  this.exLoading = false
                  alert("File Downloaded Unsuccessful")
              }
          }).catch(err => {
            this.exLoading = false
        })
    },
    getJambStudents() {

    }
  }
}
</script>
