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
              <div class="col-md-3">
                <label>Acadmic Session</label>
                <select class="form-control" v-model="model.session_id">
                  <option value="" selected>Select</option>
                  <option v-for="session in sessions" :value="session.id" :key="session.id">{{session.session_name}}</option>
                </select>
              </div>
              <div class="col-md-3">
                <label>Reg Num:</label>
                <input type="text" class="form-control" v-model="model.registration_number" placeholder="Reg Number (Optional)" />
              </div>
              <div class="col-md-3">
                <label>From Date:</label>
                <input type="date" class="form-control" v-model="model.from_date" />
              </div>
              <div class="col-md-3">
                <label>To Date:</label>
                <input type="date" class="form-control" v-model="model.to_date" />
              </div>
            </div>
            <div class="row m-t-5">
              <div class="col-md-3">
                <label>College:</label>
                <select class="form-control" v-model="model.faculty_id" @change="populateDepartments($event)">
                  <option value="" selected>All</option>
                  <option v-for="faculty in faculties" :key="faculty.id" :value="faculty.id">{{faculty.name}}</option>
                </select>
              </div>
              <div class="col-md-3">
                <label>Department:</label>
                <select class="form-control" v-model="model.department_id">
                  <option value="" selected>All</option>
                  <option v-for="department in departments" :key="department.id" :value="department.id">{{department.name}}</option>
                </select>
              </div>
              <div class="col-md-3">
                <label>Entry Mode:</label>
                <select class="form-control" v-model="model.entry_mode">
                  <option value="" selected>All</option>
                  <option value="JAMB">PUTME</option>
                  <option value="DE">Direct Entry</option>
                </select>
              </div>
              <div class="col-md-3">
                <label>Year:</label>
                <input type="text" class="form-control" placeholder="e.g 2021" v-model="model.year" />
              </div>
            </div>
            <div class="row m-t-15">
              <div class="col-md-6">
                <button type="button" id="exportBtn" @click="exportUploadedJambCandidates()"  class="btn btn-danger"><i class="fa fa-file-excel-o"></i>&nbsp; Export to Excel</button>
              </div>
              <div class="col-md-6 text-right">
                <button type="submit" id="searchBtn" @click="searchRecord(1)" class="btn btn-primary"><i class="fa fa-search"></i>&nbsp; Search Record</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="card card-default">
        <div class="card-header separator">
          <h3 class="text-primary no-margin pull-left sm-pull-reset">Uploaded Jamb Result</h3>
          <div class="pull-right sm-pull-reset">
            <button type="button" class="btn btn-success btn-sm" @click="refresh()"><i class="fa fa-refresh"></i>&nbsp; Refresh </button>
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
                  <th>Gender</th>
                  <th>Jamb Score</th>
                  <th>Year</th>
                  <!-- <th style="width:8%">Action</th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-if="Loading">
                  <td colspan="5">Loading....please wait</td>
                </tr>
                <tr v-if="!Loading && candidates.length < 1">
                  <td colspan="5">No record at the moment. Change the search criteria above and click "Search Record" button </td>
                </tr>
                <tr v-for="can in candidates" :key="can.jamb_number">
                  <td>{{ can.name }}</td>
                  <td>{{ can.registration_number }}</td>
                  <td>{{ can.sex == "F" ? "Female" : "Male" }}</td>
                  <td>{{ calculateJambScore(can) }}</td>
                  <td>{{ can.year }}</td>
                  <!-- <td>
                    <div class="btn-group">
                      <span data-placement="top" data-toggle="tooltip" title="View Jamb Letter">
                        <a href="#" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-eye"></i></a>
                      </span>
                    </div>
                  </td> -->
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
    sessions: [],
    departments: [],
    exLoading: false,
    Loading: false,
    candidates: [],
    model: {
      faculty_id: "",
      session_id: "",
      department_id: "",
      registration_number: "",
      year: "",
      entry_mode: "",
      from_date: "",
      to_date: "",
      export: false
    },
    pagination: {
      total: 0,
      per_page: 2,
      from: 1,
      to: 0,
      current_page: 1
    }
  }),
  methods: {
    calculateJambScore(can) {
      return +can.mark1 + +can.mark2 + +can.mark3 + +can.mark4
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
    getFaculties(){
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
    refresh() {
        this.model.faculty_id = ""
        this.model.department_id = ""
        this.model.registration_number = ""
        this.model.year = ""
        this.model.entry_mode = ""
        this.model.from_date = ""
        this.model.to_date = ""
        this.searchRecord(1)
      },
    searchRecord(page){
      this.Loading = true
      this.model.page = page
      this.candidates = [];
      this.model.export = 'false';
      $('#searchBtn').attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i> Searching...');
      this.$store
          .dispatch('get-started/getUploadedJambCandidates', this.model)
              .then(res => {
                $('#searchBtn').attr('disabled', false).html('<i class="fa fa-search"></i>&nbsp; Search Record');

              if(res != undefined){
                this.candidates = res.data.data
                this.pagination = res.data
              }
                this.Loading = false
          }).catch(err => {
            $('#searchBtn').attr('disabled', false).html('<i class="fa fa-search"></i>&nbsp; Search Record');

            this.Loading = false
        })
    },
    exportUploadedJambCandidates(){
      this.exLoading = true
      this.model.export = 'true'
      $('#exportBtn').attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i> Exporting...');

      this.$store
          .dispatch('get-started/exportUploadedJambCandidates', this.model)
              .then(res => {
                $('#exportBtn').attr('disabled', false).html('<i class="fa fa-file-excel-o"></i>&nbsp; Export Record');

              if(res != undefined){
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
            $('#exportBtn').attr('disabled', false).html('<i class="fa fa-file-excel-o"></i>&nbsp; Export Record');
            this.$toast.error(err)
            this.exLoading = false
        })
    },
    getSessions() {
      this.$store.dispatch('utility/getAllSession')
        .then(res =>{
          this.sessions = res.data;
          this.model.session_id = this.sessions[0].id;
        }).catch(err =>{
        this.$toast.error(err)
      })
    },
  },
  mounted: function() {
    this.getFaculties();
    this.getSessions()
  }
}
</script>
