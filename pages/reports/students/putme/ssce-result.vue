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
                    <!-- <div class="row m-t-5">
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

                    </div> -->
                    <div class="row m-t-5">
                      <div class="col-md-4">
                        <label>Exam Type:</label>
                        <select class="form-control" v-model="model.exam_type">
                          <option value="" selected>All</option>
                          <option value="waec">WAEC</option>
                          <option value="neco">NECO</option>
                          <option value="nabteb">NABTEB</option>
                        </select>
                      </div>
                      <div class="col-md-4">
                        <!-- <label>Enter Year</label>
                        <input type="text" id="year" class="form-control" placeholder="E.g 2021" v-model="model.year" /> -->
                        <label>Session:</label>
                        <select class="form-control" v-model="model.year">
                          <option value="">Select a session</option>
                          <option v-for="session in academic_sessions" :value="session.id">{{ session.session_name }}</option>
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
                          <i class="fa fa-file-excel-o" />&nbsp;Export to Excel
                        </button>
                        <button type="button" disabled v-if="exportLoading" class="btn btn-danger btn-block">Exporting...</button>
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
                          <th>Reg No.</th>
                          <th>Gender</th>
                          <th>Status</th>
                          <th>Verified on</th>
                          <th>Type</th>
                          <th style="width:10%">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                          <tr v-if="Loading">
                            <td colspan="7">Loading....Please wait.</td>
                          </tr>
                          <tr v-if="(!Loading && candidates.length <= 0)">
                            <td colspan="7">No record at the moment</td>
                          </tr>
                          <tr v-for="can in candidates" :key="can.id">
                            <td>{{ (can.name) ? can.name : can.candidate_name }}</td>
                            <td>{{ can.jamb_registration_number }}</td>
                            <td v-if="can.sex">{{ can.sex == 'F' ? 'Female' : 'Male' }}</td>
                            <td v-if="can.gender">{{ can.gender == 'F' ? 'Female' : 'Male' }}</td>
                            <td>{{ can.status == 1 ? 'Verified' : 'Not Verified' }}</td>
                            <td>{{ $moment(can.updated_at).format('DD-MM-YYYY') }}</td>
                            <td v-if="can.exam_type != null">{{ can.type.toUpperCase() }}</td>
                            <td>
                              <div class="btn-group">
                                <span data-placement="top" data-toggle="tooltip" title="View WAEC Details">
                                  <a @click="viewResult(can.content)" class="btn btn-default btn-sm" role="button" data-toggle="modal">
                                    <i class="fa fa-eye"></i>
                                  </a>
                                </span>
                              </div>
                            </td>
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

          <div class="modal fade SlideUp" id="display_result" tabindex="-1" role="dialog" aria-hidden="true">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
              <i class="pg-close"></i>
            </button>
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="text-left p-b-5">
                    <span class="semi-bold"><span id="studentName"></span> (O-LEVEL RESULT)</span>
                  </h5>
                </div>
                <div class="modal-body">
                  <hr />
                  <table class="table table-condensed">
                    <thead>
                      <tr>
                        <th>SUBJECT</th>
                        <th>GRADE</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(result, index) in results" :key="index">
                        <td>{{ result.subject }}</td>
                        <td>{{ result.grade }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="modal-footer">
                  <div class="row">
                    <hr />
                    <button type="button" @click="closeResultModal" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
        error: false,
        programs: [],
        file: "",
        candidates: [],
        admission_categories: [],
        model: {
          year: this.$moment().format('YYYY'),
          registration_number: "",
          from_dt: "",
          to_dt: "",
          faculty_id: "",
          department_id: "",
          exam_type: "",
          export: false
        },
        results: []
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
        this.model.export = false
        this.getSsceResult(1)
      },
      searchRecord(){

        if(this.model.year === '') {
          this.$toast.error('Kindly select a session');
          this.error = true;
          $('#year').focus();
        } else {
          this.sLoading = true
          this.model.export = false;
          this.$store
            .dispatch('get-started/getSsceResultReport', this.model)
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
        }
      },
      getSsceResult(page) {
        this.Loading = true
        this.model.page = page
        this.$store
            .dispatch('get-started/getSsceResultReport', this.model)
                .then(res => {
                if(res != undefined){
                  this.candidates = res.data.data
                  this.pagination = res.data
                }
                this.Loading = false
            }).catch(err => {
              this.Loading = false
          })
      },
      exportStudentSSCEs(){
        if(this.model.year === '') {
          // this.$swal({
          //   position: 'top-center',
          //   icon: 'error',
          //   title: 'You have not entered a result year',
          //   showConfirmButton: true,
          // })
          this.$toast.error('You have not entered a result year');
          this.error = true;
          $('#year').focus();
        } else {
          this.exportLoading = true
          this.model.export  = true
          this.$store
            .dispatch('get-started/exportSSCEResults', this.model)
            .then(res => {
              if (res) {
                var fileURL = window.URL.createObjectURL(new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}));
                var fileLink = document.createElement('a');

                fileLink.href = fileURL;
                fileLink.setAttribute('download', 'ssce-results-report.xlsx');
                document.body.appendChild(fileLink);
                fileLink.click();
                this.exportLoading = false
                this.$toast.success('Records exported to excel successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
              } else {
                this.exportLoading = false
                alert("File Downloaded Unsuccessful")
              }
          }).catch(err => {
            this.exportLoading = false
            alert("File Downloaded Unsuccessful")
          })
        }
      },
      viewResult(content) {
        this.results = [];
        const res = JSON.parse(content);
        this.results = res.result;
        $('#studentName').html(res.user_info.name.toUpperCase());
        $('#display_result').modal();
      },
      closeResultModal() {
        this.results = [];
        $('#studentName').html('');
        $('#display_result').modal('hide');
      },
      getAllSession() {
        this.$store.dispatch('student-acad-session/getAllSession').then((res) => {
          this.academic_sessions = res.data.data
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
      this.getSsceResult(1)
      this.getAllSession()
    }
}
</script>
