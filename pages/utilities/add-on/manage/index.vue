<template>
  <div class="content sm-gutter" >
    <!-- START BREADCRUMBS -->
    <div class="bg-white">
      <div class="container p-l-5">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
          <li class="breadcrumb-item"><a href="#">Utilities</a></li>
          <li class="breadcrumb-item"><nuxt-link to="/utilities/add-drop-utility">Add/ Drop</nuxt-link></li>
          <li class="breadcrumb-item active">Manage Course</li>
        </ol>
      </div>
    </div>
    <!-- END BREADCRUMBS -->

    <div class="jumbotron" data-pages="parallax" data-scroll-element=".page-container">
      <div class=" container p-l-0 p-r-0   container-fixed-lg sm-p-l-0 sm-p-r-0">
        <div class="inner">
          <!-- START BREADCRUMB -->
          <div class="row">
            <div class="col-md-12">
              <div class="card card-transparent text-center" v-if="loading">
                <div class="card-header ">
                  <div class="table-responsive">
                    <h5>Loading...please wait</h5>
                  </div>
                </div>
              </div>
              <!-- START card -->
              <div class="card card-transparent text-center" v-if="!loading">
                <div class="card-header ">
                  <div class="table-responsive">
                    <table class="table table-striped table-condensed">
                      <tr>
                        <th>Matriculation No.:</th>
                        <td>{{ details.matriculation_number }}</td>
                        <th>Jamb Reg No.:</th>
                        <td>{{ details.jamb_number }}</td>
                      </tr>
                      <tr>
                        <th>Name:</th>
                        <td>{{ details.firstname }} {{  details.middlename }} {{ details.lastname }}</td>
                        <th>Level.</th>
                        <td>{{ details.level.name }}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <!-- END card -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- START CONTAINER FLUID -->
    <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
      <div class="card card-default">
        <div class="card-header">
          <div class="card-title text-primary">SEARCH COURSE</div>
          <div class="pull-right sm-pull-reset">
            <button type="button" @click="openModal" class="btn btn-success btn-sm"><i class="fa fa-plus"></i>&nbsp; Add Course </button>
          </div>
          <div class="clearfix"></div>
        </div>
        <hr />
        <div class="card-body">
          <form style="width: 100%" @submit.prevent="searchCourse">
            <div class="row">
              <div class="col-md-5">
                <select class="form-control" v-model="searchData.session_id">
                  <option value="" disabled selected>Select Session</option>
                  <option v-for="session in sessions" :value="session.id" :key="session.id">
                    {{ session.session_name }}
                  </option>
                </select>
              </div>
              <div class="col-md-5">
                <select class="form-control" v-model="searchData.level_id">
                  <option value="" disabled selected>Select Level</option>
                  <option value="1">100</option>
                  <option value="2">200</option>
                  <option value="3">300</option>
                  <option value="4">400</option>
                  <option value="5">500</option>
                  <option value="6">600</option>
                </select>
              </div>
              <div class="col-md-2">
                <button type="submit" id="submitBtn" class="btn btn-primary btn-block">Search Record</button>
              </div>
            </div>
          </form>
        </div>
        <div class="card-body" v-if="searching">
          <hr />
          <div class="table-responsive">
            <table class="table table-striped table-condensed" id="myTable">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Credit</th>
                  <th>Semester</th>
                  <th>Level</th>
                  <th>Session</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="searchLoading">
                  <td colspan="7"> Searching...please wait</td>
                </tr>
                <tr v-if="searchRecord && !searchLoading">
                  <td colspan="7"> No records matching the search criteria</td>
                </tr>
                <tr v-if="courses.length < 1 && !searchRecord && !searchLoading">
                  <td colspan="7"> No records matching the search criteria</td>
                </tr>
                <tr v-if="courses.length > 0 && !searchRecord && !searchLoading" v-for="(hasCourse, index) in courses" :key="index" :id="index">
                  <td>{{ hasCourse.course.code }}</td>
                  <td>{{ hasCourse.course.name }}</td>
                  <td>{{ hasCourse.course.weightage }}</td>
                  <td>{{ hasCourse.course.semester }}</td>
                  <td>{{ hasCourse.level.name }}</td>
                  <td>{{ hasCourse.session.session_name }}</td>
                  <td>
                    <span data-placement="top" data-toggle="tooltip" title="Delete Course">
                      <a href="javascript:;" @click="deleteCourse($event, hasCourse.id)"  class="btn btn-default btn-sm" role="button" data-toggle="modal">
                        <i class="fa fa-minus"></i>
                      </a>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- END CONTAINER FLUID -->

    <div class="modal fade SlideUp" id="add-course" tabindex="-1" role="dialog" aria-hidden="true">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        <i class="pg-close"></i>
      </button>
      <div class="modal-dialog" style="width: 95%">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="text-left p-b-5"><span class="semi-bold">SEARCH TO ADD COURSES</span></h5>
          </div>
          <div class="modal-body">
            <hr />
            <form style="width: 100%" @submit.prevent="getCourses">
              <div class="row">
                <div class="col-md-6">
                  <select class="form-control" @change="getDepartments" v-model="formData.college_id">
                    <option value="" disabled selected>Select College</option>
                    <option v-for="college in colleges" :value="college.id">{{ college.name }}</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <select class="form-control" @change="getPrograms" v-model="formData.department_id">
                    <option value="" disabled selected>Select Department</option>
                    <option v-for="department in departments" :value="department.id">{{ department.name }}</option>
                  </select>
                </div>
              </div>
              <br />
              <div class="row">
                <div class="col-md-6">
                  <select class="form-control" v-model="formData.program">
                    <option value="" disabled selected>Select Program</option>
                    <option v-for="program in programs" :value="program.id">{{ program.name }}</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <select class="form-control" v-model="formData.level">
                    <option value="" disabled selected>Select Level</option>
                    <option value="1">100</option>
                    <option value="2">200</option>
                    <option value="3">300</option>
                    <option value="4">400</option>
                    <option value="5">500</option>
                    <option value="6">600</option>
                  </select>
                </div>
              </div>
              <br />
              <div class="row">
                <div class="col-md-6">
                  <button type="submit" id="searchCourse" class="btn btn-primary btn-block">Search Record</button>
                </div>
                <div class="col-md-6">
                  <button type="button" @click="viewCourse" id="viewCourse" class="btn btn-warning btn-block">View Added Courses</button>
                </div>
              </div>
            </form>
            <hr/>
            <div class="table-responsive" v-if="search">
              <table class="table table-striped table-condensed">
                <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Credit</th>
                  <th>Semester</th>
                  <th>Level</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                  <tr v-if='addLoading'><td colspan="6">Loading..please wait</td></tr>
                  <tr v-if='!addLoading && addCourses.length < 1'><td colspan="6">No record at the moment</td></tr>
                  <tr v-if='!addLoading && addCourses.length > 0' v-for="course in addCourses" :key="course.id">
                    <td>{{ course.code }}</td>
                    <td>{{ course.name }}</td>
                    <td>{{ course.weightage }}</td>
                    <td>{{ course.semester }}</td>
                    <td>{{ course.level.name }}</td>
                    <td>
                      <span data-placement="top" data-toggle="tooltip" title="Add Course">
                      <a href="javascript:;" @click="addCourse($event, course)"  class="btn btn-default btn-sm" role="button" data-toggle="modal">
                        <i class="fa fa-plus"></i>
                      </a>
                    </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="table-responsive" v-if="view">
              <table class="table table-striped table-condensed">
                <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Credit</th>
                  <th>Semester</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                  <tr v-if="dataView.length < 1"><td colspan="5"> No records added</td></tr>
                  <tr v-if="dataView.length > 0" v-for="(view, index) in dataView" :key="index">
                    <td>{{ view.code }}</td>
                    <td>{{ view.name }}</td>
                    <td>{{ view.credit }}</td>
                    <td>{{ view.semester }}</td>
                    <td>
                      <span data-placement="top" data-toggle="tooltip" title="Remove Course">
                      <a href="javascript:;" @click="removeCourse(index)" class="btn btn-default btn-sm" role="button" data-toggle="modal">
                        <i class="fa fa-minus"></i>
                      </a>
                    </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <form @submit.prevent="saveAddedCourses">
                <div class="row">
                  <div class="col-md-6">
                    <select class="form-control" required v-model="saveData.level_id">
                      <option value="" disabled selected>Select Level</option>
                      <option value="1">100</option>
                      <option value="2">200</option>
                      <option value="3">300</option>
                      <option value="4">400</option>
                      <option value="5">500</option>
                      <option value="6">600</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <select class="form-control" required v-model="saveData.session_id">
                      <option value="" disabled selected>Select Session</option>
                      <option v-for="session in sessions" :value="session.id">{{ session.session_name }}</option>
                    </select>
                  </div>
                </div>
                <br />
                <div class="row">
                  <div class="col-md-12">
                    <button type="submit" id="saveCourse" class="btn btn-danger btn-block">Save Course</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>

  </div>
</template>
<script>
export default {
  layout: 'main',
  data: () => ({
    loading: true,
    searching: false,
    searchRecord: false,
    addLoading: false,
    search: true,
    view: false,
    sessions: [],
    searchData: {
      student_id: '',
      level_id: '',
      session_id: ''
    },
    saveData: {
      level_id: '',
      session_id: ''
    },
    formData: {
      matriculation_number: '',
      college_id: '',
      department_id: '',
      program: '',
      level: ''
    },
    courses: [],
    addCourses: [],
    details: {},
    colleges: [],
    departments: [],
    programs: [],
    dataView: [],
    dataSave: [],
    searchLoading: false
  }),
  methods: {
    deleteCourse(e, id) {
      if(confirm('Do you want to delete this course?')) {
        this.$store.dispatch('add-delete/deleteCourse', id)
          .then(res => {
            if (res.data.status) {
              this.$toast.success('Record successfully deleted')
              this.searchCourse()
              return
            }

            this.$toast.error('An error occurred')
            return

          }).catch(err => {
            this.$toast.error("An error occurred, please contact the environment")
            console.log(err)
          })
      }
    },
    searchCourse () {
      $('#submitBtn').attr('disabled', true).html('Searching..')
      this.searchLoading = true
      this.searchRecord = true
      this.searching = true
      this.$store.dispatch('add-delete/searchStudent', this.searchData)
        .then((res) =>{
          $('#submitBtn').attr('disabled', false).html('Search Record')
          if(res.data.status) {
            this.courses = res.data.data
            this.searchRecord = false
            this.searchLoading = false
          }

          this.$toast.error(res.data.message)
        }).catch((err) =>{
          this.searchLoading = false
          $('#submitBtn').attr('disabled', false).html('Search Record')
        })
    },
    getStudentDetails() {
      this.$store.dispatch('student/getStudentByMatNo', this.formData)
        .then((res) =>{
          if(res.data.status) {
            this.details = res.data.data
            this.searchData.student_id = this.details.id
            this.loading = false
            return
          }

          this.details = {}
          this.loading = false
        }).catch(err =>{
          console.log(err)
        })
    },
    getAllSession() {
      this.$store.dispatch('utility/getAllSession')
        .then((res) =>{
          this.sessions = res.data
        }).catch((err) =>{

      })
    },
    openModal() {
      $("#add-course").modal()
    },
    getColleges() {
      this.$store.dispatch('utility/getFaculties')
        .then(res =>{
          this.colleges = res.data
        })
    },
    getDepartments() {
      this.$store.dispatch('utility/getDepartmentByFaculty', this.formData.college_id)
        .then(res =>{
          this.departments = res.data
        })
    },
    getPrograms() {
      this.$store.dispatch('utility/getProgramByDept', this.formData.department_id)
        .then(res =>{
          this.programs = res.data.data
        })
    },
    getCourses() {
      $('#searchCourse').attr('disabled', true).html('Searching...')
      this.search = true
      this.view = false
      this.$store.dispatch('utility/getCourseByProgram', this.formData)
        .then(res => {
          $('#searchCourse').attr('disabled', false).html('Search Record')
          if(res.data.status) {
            this.addCourses = res.data.data
            return
          }
        }).catch(err =>{
          $('#searchCourse').attr('disabled', false).html('Search Record')
        })
    },
    addCourse(e, course) {
      let recordSave = {
        student_id: this.details.id,
        session_id: '',
        level_id: course.level_id,
        course_id: course.id
      }
      this.dataSave.push(recordSave)

      let recordView = {
        code: course.code,
        name: course.name,
        credit: course.weightage,
        semester: course.semester
      }
      this.dataView.push(recordView)
      this.$toast.success(course.name + ' was successfully added')
    },
    viewCourse() {
      this.search = false
      this.view = true
    },
    removeCourse(index) {
      this.dataView.splice(index, 1)
      this.dataSave.splice(index, 1)
      this.$toast.success('Course was successfully removed')
    },
    saveAddedCourses() {
      if(this.dataSave.length < 1) {
        this.$toast.error('There are selected courses to add')
        return
      }

      for(let i = 0; i < this.dataSave.length; i++) {
        this.dataSave[i].level_id = this.saveData.level_id
        this.dataSave[i].session_id = this.saveData.session_id
      }

      if(confirm('Are you sure you want to add these courses for the student?')) {
        $('#saveCourse').attr('disabled', true).html('Adding course...please wait')
        let data = {
          "data": this.dataSave
        }
        this.$store.dispatch('add-delete/addCourse', data)
          .then(res =>{
            $('#saveCourse').attr('disabled', false).html('Save Course')
            if(res.data.status) {
              $("#add-course").modal('hide')
              this.dataView = []
              this.dataSave = []
              this.$toast.success('Course was successfully added. Kindly search to confirm')
              return
            }

            this.$toast.error('An error occurred while searching course. Operation was terminated')
          }).catch(err =>{
            $('#saveCourse').attr('disabled', false).html('Save Course')
            this.$toast.error('An error occurred while searching course. Operation was terminated')
          })
      }
    }
  },
  mounted() {
    this.formData.matriculation_number = this.$route.query.matriculation_number
    this.getStudentDetails()
    this.getAllSession()
    this.getColleges()
  }
}
</script>
