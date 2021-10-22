<template>
  <div class="content sm-gutter">
    <!-- START BREADCRUMBS -->
    <div class="bg-white">
      <div class="container p-l-5">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
          <li class="breadcrumb-item"><a href="#">Reports</a></li>
          <li class="breadcrumb-item active">Course Download Report</li>
        </ol>
      </div>
    </div>
    <!-- END BREADCRUMBS -->

    <!-- START CONTAINER FLUID -->
    <div class="container sm-padding-10 p-t-20 p-b-20">
      <div class="row">
        <div class="col-md-12">
          <div class="card card-default">
            <div class="card-header  separator">
              <h3 class="text-primary no-margin p-b-10">Course Download Report</h3>
            </div>
            <div class="card-body">
              <form class="p-4" @submit.prevent="downloadReport">
                <div class="row">
                  <div class="form-group col-md-4">
                    <label>Select College</label>
                    <select class="form-control" id="college" @change="getDepartments" v-model="formData.college_id">
                      <option value="" disabled selected>Select your option</option>
                      <option v-for="college in colleges" :key="college.id" :value="college.id">
                        {{ college.name }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group col-md-4">
                    <label>Select Department</label>
                    <select class="form-control" @change="getProgram" id="department" required v-model="formData.department_id">
                      <option value="" disabled selected>Select your option</option>
                      <option v-for="department in departments" :value="department.id" :key="department.id">
                        {{ department.name }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group col-md-4">
                    <label>Select Programme</label>
                    <select class="form-control" id="program" required v-model="formData.program_id">
                      <option value="" disabled selected>Select your option</option>
                      <option v-for="program in programs" :value="program.id" :key="program.id">
                        {{ program.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-md-4">
                    <label>Select Level</label>
                    <select class="form-control" @change="getCourse" required v-model="formData.level_id">
                      <option value="" disabled selected>Select your option</option>
                      <option value="1">100</option>
                      <option value="2">200</option>
                      <option value="3">300</option>
                      <option value="4">400</option>
                      <option value="5">500</option>
                      <option value="6">600</option>
                    </select>
                  </div>
                  <div class="form-group col-md-4">
                    <label>Select Course</label>
                    <select class="form-control" id="course" required v-model="formData.course_id">
                      <option value="" disabled selected>Select your option</option>
                      <option v-for="course in courses" :value="course.id" :key="course.id">
                        {{course.code}} - {{ course.name }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group col-md-4">
                    <label>Select Academic Session</label>
                    <select class="form-control" id="session" v-model="formData.session_id">
                      <option value="" disabled selected>Select your option</option>
                      <option v-for="session in sessions" :value="session.id" :key="session.id">
                        {{ session.session_name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <hr/>
                    <button type="submit" id="submitBtn" class="sm-pull-reset btn btn-primary m-t-5 m-r-10"><i class="fa fa-arrow-down"></i> &nbsp; Download To Excel</button>
                 </div>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
    <!-- END CONTAINER FLUID -->
  </div>
</template>
<script>
export default {
  layout: 'main',
  data: () => ({
    formData: {
      college_id: '',
      department_id: '',
      program_id: '',
      course_id: '',
      level_id: '',
      session_id: ''
    },
    colleges: [],
    departments: [],
    programs: [],
    courses: [],
    sessions: []
  }),
  methods: {
    downloadReport(object) {
      console.log(this.formData)
      $('#submitBtn').attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i> &nbsp; Downloading')
      this.$store.dispatch('reports/exportCourseDownloadReport', this.formData)
        .then(res =>{
          console.log(res.data)
          $('#submitBtn').attr('disabled', false).html('<i class="fa fa-arrow-down"></i> &nbsp; Download To Excel')
          let fileURL = window.URL.createObjectURL(new Blob([res.data]), {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
          let fileLink = document.createElement('a');
          fileLink.href = fileURL;
          fileLink.setAttribute('download', 'course-download-report.xlsx');
          document.body.appendChild(fileLink);
          fileLink.click();
          this.$toast.success('Record Exported to Excel Successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
        }).catch(err => {
          $('#submitBtn').attr('disabled', true).html('<i class="fa fa-arrow-down"></i> &nbsp; Download To Excel')
          this.$toast.error('An error occurred')
        })
    },
    getActiveSession() {
      $('#session').attr('disabled', true)
      this.$store.dispatch('utility/getAllSession')
        .then(res =>{
          this.sessions = res.data.data
          $('#session').attr('disabled', false)
        })
    },
    getColleges () {
      $('#college').attr('disabled', true)
      this.$store.dispatch('utility/getFaculties')
        .then(res =>{
          this.colleges = res.data
          $('#college').attr('disabled', false)
        })
    },
    getDepartments() {
      $('#department').attr('disabled', true)
      this.$store.dispatch('utility/getDepartmentByFaculty', this.formData.college_id)
        .then(res =>{
          this.departments = res.data
          $('#department').attr('disabled', false)
        })
    },
    getProgram() {
      $('#program').attr('disabled', true)
      this.$store.dispatch('utility/getProgramByDept', this.formData.department_id)
        .then(res =>{
          this.programs = res.data.data
          console.log(res)
          $('#program').attr('disabled', false)
        })
    },
    getCourse () {
      $('#course').attr('disabled', true)
      let data = {
        program:  this.formData.program_id,
        level: this.formData.level_id
      }
      this.$store.dispatch('utility/getCourseByProgram', data)
        .then(res =>{
          this.courses = res.data.data
          $('#course').attr('disabled', false)
        })
    }
  },
  mounted() {
    this.getActiveSession()
    this.getColleges()
  }
}
</script>
