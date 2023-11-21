<template>
  <div class="content sm-gutter">
    <!-- START BREADCRUMBS -->
    <div class="bg-white">
      <div class="container p-l-5">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
          <li class="breadcrumb-item"><a href="#">Utilities</a></li>
          <li class="breadcrumb-item active">Validate Student RRR</li>
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
              <h3 class="text-primary no-margin p-b-10">Validate RRR</h3>
            </div>
            <div class="card-body">
              <form class="p-4" @submit.prevent="submit">
                <div class="row">
                  <div class="form-group col-md-6">
                    <label>Matriculation No</label>
                    <input type="text" class="form-control" placeholder="Matriculation No/ CAN/ PAN" v-model="formData.matriculation_number" required>
                  </div>
                  <div class="form-group col-md-6">
                    <label>RRR:</label>
                    <input type="text" class="form-control" placeholder="RRR No" v-model="formData.rrr" required>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-md-4">
                    <label>Program</label>
                    <select required class="form-control" v-model="formData.program">
                      <option value="" disabled selected>Select a type</option>
                      <option value="REGULAR">REGULAR</option>
                      <option value="CEC">CEC</option>
                      <option value="PG">PG</option>
                    </select>
                  </div>
                  <div class="form-group col-md-4">
                    <label>Payment</label>
                    <select required class="form-control" v-model="formData.type">
                      <option value="" disabled selected>Select a type</option>
                      <option value="SCHOOL_FEE">SCHOOL CHARGES</option>
                      <option value="SUG_FEE">SUG DUES</option>
                      <option value="ACCOMMODATION_FEE">ACCOMMODATION FEE</option>
                      <option value="DEVELOPMENT_LEVY">DEVELOPMENT LEVY</option>
                    </select>
                  </div>
                  <div class="form-group col-md-4">
                    <label>Student Type</label>
                    <select required class="form-control" v-model="formData.student_type">
                      <option value="" disabled selected>Select a type</option>
                      <option value="NEW">NEW</option>
                      <option value="RETURNING">RETURNING</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-md-4">
                    <label>Session</label>
                    <select required class="form-control" v-model="formData.session_id">
                      <option value="" disabled selected>Select a session</option>
                      <option v-for="session in sessions" :value="session.id">{{ session.session_name }}</option>
                    </select>
                  </div>
                  <div class="form-group col-md-4">
                    <label>Semester</label>
                    <select class="form-control" v-model="formData.semester">
                      <option value="" disabled selected>Select a semester</option>
                      <option value="1">1ST SEMESTER</option>
                      <option value="2">2ND SEMESTER</option>
                    </select>
                  </div>
                  <div class="form-group col-md-4">
                    <label>Level</label>
                    <select required class="form-control" v-model="formData.level">
                      <option value="" disabled selected>Select a level</option>
                      <option value="1">100</option>
                      <option value="2">200</option>
                      <option value="3">300</option>
                      <option value="4">400</option>
                      <option value="5">500</option>
                      <option value="6">600</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <hr/>
                    <button id="submitBtn" type="submit" class="btn btn-primary m-t-5 m-r-10"><i class="fa fa-upload"></i> &nbsp; Submit</button>
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
  name: "student-waiver",
  layout: "main",
  data: () => ({
    sessions: [],
    formData: {
      matriculation_number: '',
      rrr: '',
      program: '',
      session_id: '',
      semester: '0',
      level: '',
      type: '',
      student_type: ''
    }
  }),
  methods: {
    submit() {
      $('#submitBtn').attr('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> Submitting')
      this.$store.dispatch('student/validateStudentRRR', this.formData)
        .then(res => {
          $('#submitBtn').attr('disabled', false).html('<i class="fa fa-upload"></i> &nbsp; Submit')
          if(res.data.status) {
            this.clearData()
            this.$toast.success(res.data.message)
            return
          }

          this.$toast.error(res.data.message)
        })
    },
    getSession() {
      this.$store.dispatch('student-acad-session/getAllSession').then(res => {
        this.sessions = res.data.data
      })
    },
    clearData() {
      this.formData = {
        matriculation_number: '',
        rrr: '',
        program: '',
        session_id: '',
        semester: '',
        level: '',
        type: ''
      }
    }
  },
  mounted() {
    this.getSession()
  }
}
</script>
