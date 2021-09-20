<template>
  <div class="content sm-gutter">
    <!-- START BREADCRUMBS -->
    <div class="bg-white">
      <div class="container p-l-5">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
          <li class="breadcrumb-item"><a href="#">Utilities</a></li>
          <li class="breadcrumb-item active">Bypass utility</li>
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
              <h3 class="text-primary no-margin p-b-10">Bypass Utility</h3>
            </div>
            <div class="card-body">
              <form class="p-4" @submit.prevent="importUtility">
                <div class="row">
                  <div class="form-group col-md-12">
                    <label>Select Excel file to upload</label>
                    <div class="custom-file">
                      <input type="file" ref="file" class="custom-file-input" id="customFileLang" lang="es" required>
                      <label class="custom-file-label" for="customFileLang">Select File</label>
                    </div>
                  </div>
                  <div class="form-group col-md-6">
                    <label>College</label>
                    <select class="form-control" @change="getDepartmentByCollege($event)" v-model="formData.college">
                      <option value="" disabled selected>Select your option</option>
                      <option v-for="college in colleges" :value="college.id" :key="college.id">{{ college.name }}</option>
                    </select>
                  </div>
                  <div class="form-group col-md-6">
                    <label>Department</label>
                    <select class="form-control" v-model="formData.department">
                      <option value="" disabled selected>Select your option</option>
                      <option v-for="department in departments" :value="department.id" :key="department.id">
                        {{department.name}}
                      </option>
                    </select>
                  </div>
                  <div class="form-group col-md-4">
                    <label>Registration Step</label>
                    <select class="form-control" required v-model="formData.registration_step">
                      <option value="" disabled selected>Select your option</option>
                      <option value="accommodation">Accommodation</option>
                      <option value="acceptance-fee">Acceptance Fee</option>
                    </select>
                  </div>
                  <div class="form-group col-md-4">
                    <label>Entry Mode</label>
                    <select class="form-control" @change="getSession" required v-model="formData.entry_mode">
                      <option value="" disabled selected>Select your option</option>
                      <option value="PUTME">PUTME</option>
                      <option value="DE">Direct Entry</option>
                    </select>
                  </div>
                  <div class="form-group col-md-4">
                    <label>Session</label>
                    <select class="form-control" required v-model="formData.session_id">
                      <option value="" disabled selected>Select your option</option>
                      <option v-for="session in sessions" :value="session.id">{{ (formData.entry_mode === 'DE') ? session.de_session_name : session.session_name }}</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <hr/>
                    <button id="downloadBtn" @click="downloadSampleCSV" class="pull-right sm-pull-reset btn btn-default m-t-5 m-r-10"><i class="fa fa-arrow-down"></i> &nbsp; Download Sample CSV</button>
                    <button id="submitBtn" type="submit" class="btn btn-primary m-t-5 m-r-10"><i class="fa fa-upload"></i> &nbsp; Upload</button>
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
  data() {
    return {
      download: false,
      formData: {
        college: '',
        department: '',
        registration_step: '',
        entry_mode: '',
        session_id: ''
      },
      colleges: [],
      departments: [],
      sessions: []
    }
  },
  methods: {
    importUtility() {
      if(confirm('Are you sure want to bypass the selected file?')) {
        $('#submitBtn').attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i> &nbsp; Uploading...');
        this.data = new FormData()
        this.data.append('file', this.$refs.file.files[0])
        this.data.append('college_id', this.formData.college)
        this.data.append('department_id', this.formData.department)
        this.data.append('registration_step', this.formData.registration_step)
        this.data.append('entry_mode', this.formData.entry_mode)
        this.data.append('session_id', this.formData.session_id)
        this.$store.dispatch('byPassUtility/uploadByPassUtility', this.data)
          .then(res =>{
            $('#submitBtn').attr('disabled', false).html('<i class="fa fa-upload"></i> &nbsp; Upload');
            if(res.data.status) {
              this.$toast.success(res.data.message)
              return
            }

            this.$toast.error(res.data.message)
          }).catch(err =>{
          $('#submitBtn').attr('disabled', false).html('<i class="fa fa-upload"></i> &nbsp; Upload');
            this.$toast.error(err)
        })
      }
    },
    clearForm() {
      this.formData.college = ''
      this.formData.department = ''
      this.formData.registration_step = ''
      this.formData.entry_mode = ''
    },
    downloadSampleCSV() {
      this.download = true
      $('#downloadBtn').attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i> Downloading...');
      this.$store.dispatch('byPassUtility/downloadSample')
        .then(res =>{
          $('#downloadBtn').attr('disabled', false).html('<i class="fa fa-arrow-down"></i> &nbsp; Download Sample CSV');
          if(res.data.status) {
            this.$toast.success('File Downloaded...')
            window.open(res.data.message, '_blank')
            return
          }
          this.$toast.error('An error occurred!')
        }).catch(err =>{
        $('#downloadBtn').attr('disabled', false).html('<i class="fa fa-arrow-down"></i> &nbsp; Download Sample CSV');
        this.$toast.error(err)
      })
    },
    getCollege() {
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
    },
    getSession () {
      this.$store.dispatch('utility/getSessionByEntryModeMode', this.formData)
        .then(res =>{
          this.sessions = res.data.data
        }).catch(err =>{
        this.$toast.error(err)
      })
    }
  },
  mounted() {
    this.getCollege()
  }
}
</script>
