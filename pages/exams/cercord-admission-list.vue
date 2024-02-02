<template>

  <div class="content sm-gutter">
    <!-- START BREADCRUMBS -->
    <div class="bg-white">
      <div class="container p-l-5">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
          <li class="breadcrumb-item"><a href="#">Exams</a></li>
          <li class="breadcrumb-item active">CERCORD Admission List</li>
        </ol>
      </div>
    </div>
    <!-- END BREADCRUMBS -->

    <!-- START JUMBOTRON -->
    <div class="jumbotron" data-pages="parallax" data-scroll-element=".page-container">
      <div class=" container p-l-0 p-r-0   container-fixed-lg sm-p-l-0 sm-p-r-0">
        <div class="inner">
          <!-- START BREADCRUMB -->
          <div class="row">
            <div class="col-md-10 offset-md-1">
              <!-- START card -->
              <div class="card card-transparent text-center">
                <div class="card-header ">
                  <div class="card-title">CERCORD STUDENTS ONLY UPLOAD</div>
                </div>
                <div class="card-body">
                  <h6 class="semi-bold">1. Admin will get the sample excel file by clicking the "Download Sample Excel" button.</h6>
                  <h6 class="semi-bold">2. Fill the excel sheet appropriately, select the necessary options and upload by clicking on the "IMPORT RECORD" button in the "Upload CERCORD Admission List" section.</h6>
                  <!-- <h6 class="semi-bold">3. Download admission list using the "Download CERCORD Admission List" section.</h6> -->
                </div>
              </div>
              <!-- END card -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END JUMBOTRON -->
    <!-- Audit Trail -->
    <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0" v-if="response.success">
      <div class="card card-default">
        <div class="card-body">
          <div class="alert alert-danger" v-if="response.errors.length > 0">
            <strong>The Following Errors Occurred:</strong>
            <p>
            <ul v-for="item in response.errors" :key="response[item]">
              <li>Row: {{item.row}} ---- <span>Attribute: {{item.attribute}}</span> ---- <span >Messages: {{item.message}}</span></li>
            </ul>
            <a :href="response.error_file" target="_blank" download>Click here to download error file</a>
            </p>
          </div>
          <div class="alert alert-success">
            <strong>Audit Trail Performed.</strong>
            <p>File Successfully Imported: {{response.count}} Records Imported</p>
          </div>
        </div>
      </div>
    </div>

    <!-- START CONTAINER FLUID -->
    <div class="container sm-padding-10 p-t-20 p-b-20">
      <div class="row">
        <div class="col-md-12">
          <div class="card card-default">
            <div class="card-header  separator">
              <h3 class="text-primary no-margin p-b-10">Upload CERCORD Admission List</h3>
            </div>
            <div class="card-body">
              <form class="p-4" @submit.prevent="importFile">
                <div class="row">
                  <div class="form-group col-md-6">
                    <label>Select Excel file to upload</label>
                    <div class="custom-file">
                      <input type="file" ref="file" class="custom-file-input" id="customFileLang" lang="es" required>
                      <label class="custom-file-label" for="customFileLang">Select File</label>
                    </div>
                  </div>
                  <div class="form-group col-md-6">
                    <label>Select Academic Session</label>
                    <select class="form-control" id="session" v-model="formData.session_id">
                      <option value="" disabled selected>Select your option</option>
                      <option v-for="session in sessions" :key="session.id" :value="session.id">
                        {{ session.cercord_session_name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-md-6">
                    <label>Select College</label>
                    <select class="form-control" id="college" @change="getDepartments" v-model="formData.college_id">
                      <option value="" disabled selected>Select your option</option>
                      <option v-for="college in colleges" :key="college.id" :value="college.id">
                        {{ college.name }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group col-md-6">
                    <label>Select Department</label>
                    <select class="form-control" @change="getProgram" id="department" v-model="formData.department_id" required>
                      <option value="" disabled selected>Select your option</option>
                      <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                        {{ dept.name }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group col-md-6">
                    <label>Select Programme</label>
                    <select class="form-control" id="program" @change="getSpecialization" v-model="formData.program_id" required>
                      <option value="" disabled selected>Select your option</option>
                      <option v-for="program in programs" :key="program.id" :value="program.id">
                        {{ program.name }}
                      </option>
                   </select>
                  </div>
                  <div class="form-group col-md-6">
                    <label>Admission Mode</label>
                    <select class="form-control" v-model="formData.mode_id" required>
                      <option value="" disabled selected>Select your option</option>
                      <option v-for="mode in modes" :key="mode.id" :value="mode.id">
                        {{ mode.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <hr/>
                    <button @click="downloadSampleFile" id="downloadBtn" class="pull-right sm-pull-reset btn btn-default m-t-5 m-r-10"><i class="fa fa-arrow-down"></i> &nbsp; Download Sample Excel</button>
                    <button type="submit" id="submitBtn" class="btn btn-primary btn-lg btn-large fs-16 semi-bold"><i class="fa fa-upload"></i> Import Record</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- <div class="col-md-12">
          <div class="card card-default">
            <div class="card-header  separator">
              <h3 class="text-primary no-margin p-b-10">Download PG Admission List</h3>
            </div>
            <div class="card-body">
              <form class="p-4">
                <div class="row">
                  <div class="form-group col-md-6">
                    <label>Select Academic Session</label>
                    <select class="form-control">
                      <option value="" disabled selected>All</option>
                    </select>
                  </div>
                  <div class="form-group col-md-6">
                    <label>Select College</label>
                    <select class="form-control">
                      <option value="" disabled selected>All</option>
                    </select>
                  </div>
                  <div class="form-group col-md-6">
                    <label>Select Department</label>
                    <select class="form-control" required>
                      <option value="" disabled selected>All</option>
                    </select>
                  </div>
                  <div class="form-group col-md-6">
                    <label>Select Category</label>
                    <select class="form-control">
                      <option value="" selected>All</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <hr/>
                    <button type="button" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Download Excel</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <!-- END CONTAINER FLUID -->
  </div>

</template>
<script>
export default {
  layout: 'main',
  data: () => ({
    response: {},
    sessions: [],
    colleges: [],
    departments: [],
    programs: [],
    specializations: [],
    modes: [],
    formData: {
      session_id: '',
      college_id: '',
      department_id: '',
      program_id: '',
      mode_id: ''
    }
  }),
  methods: {
    importFile() {
      $('#submitBtn').attr('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> Importing')
      let data = new FormData()
      data.append('file', this.$refs.file.files[0])
      data.append('session_id', this.formData.session_id)
      data.append('department_id', this.formData.department_id)
      data.append('program_id', this.formData.program_id)
      data.append('faculty_id', this.formData.college_id)
      data.append('specialization_id', this.formData.specialization_id)
      this.$store.dispatch('cercord-admission/importCercordAdmissionList', data)
        .then(res =>{
          $('#submitBtn').attr('disabled', false).html('<i class="fa fa-upload"></i> &nbsp; Import')
          if(res.data.success) {
            this.response = res.data
            this.loading = false
            return
          }

          this.$toast.error('An error occurred')
        }).catch(err =>{
          $('#submitBtn').attr('disabled', false).html('<i class="fa fa-upload"></i> &nbsp; Import')
          this.$toast.error(err)
        })
    },
    downloadSampleFile() {
      $('#downloadBtn').attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i> Downloading')
      this.$store.dispatch('cercord-admission/downloadSampleFile')
        .then(res =>{
          $('#downloadBtn').attr('disabled', false).html('<i class="fa fa-arrow-down"></i> &nbsp Download Sample Excel')
          if(res.data.success) {
            window.location = res.data.message
            this.$toast.success('Download Successful!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
          }
        }).catch(err =>{
          $('#downloadBtn').attr('disabled', false).html('<i class="fa fa-arrow-down"></i> &nbsp Download Sample Excel')
          this.$toast.error('An error occurred')
        })
    },
    getAcademicSession() {
      $('#session').attr('disabled', true)
      this.$store.dispatch('cercord-admission/cercordAcademicSession')
        .then(res =>{
          $('#session').attr('disabled', false)
          this.sessions = res.data.data
        }).catch(err =>{
          $('#session').attr('disabled', false)
          this.$toast.error('An error occurred')
        })
    },
    getColleges() {
      $('#college').attr('disabled', true)
      this.$store.dispatch('faculties/getAllFacultiesWithoutPagination')
        .then(res =>{
          $('#college').attr('disabled', false)
          this.colleges = res.data.data
        }).catch(err =>{
          $('#college').attr('disabled', false)
          this.$toast.error(err)
        })
    },
    getDepartments() {
      $('#department').attr('disabled', true)
      this.$store.dispatch('departments/getDeptByColledId', this.formData.college_id)
        .then(res =>{
          $('#department').attr('disabled', false)
          this.departments = res.data.data
        }).catch(err =>{
          $('#department').attr('disabled', false)
          this.$toast.error(err)
        })
    },
    getProgram() {
      $('#program').attr('disabled', true)
      this.$store.dispatch('utility/getProgramByDept', this.formData.department_id)
        .then(res =>{
          $('#program').attr('disabled', false)
          this.programs = res.data.data
        }).catch(err =>{
        $('#program').attr('disabled', false)
        this.$toast.error(err)
      })
    },
    getSpecialization() {
      $('#specialization').attr('disabled', true)
      this.$store.dispatch('utility/getSpecializationByProgram', this.formData.program_id)
        .then(res =>{
          $('#specialization').attr('disabled', false)
          this.specializations = res.data.data
        }).catch(err =>{
        $('#specialization').attr('disabled', false)
        this.$toast.error(err)
      })
    },
    getModeOfStudy() {
      this.$store.dispatch('utility/getModeOfStudy', 'CERCORD')
        .then(res => {
          this.modes = res.data.data
        }).catch(err => {
        this.$toast.error(err)
      })
    }
  },
  mounted() {
    this.getAcademicSession()
    this.getColleges()
    this.getModeOfStudy();
  }
}
</script>
