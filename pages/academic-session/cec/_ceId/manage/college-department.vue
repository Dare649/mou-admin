<template>
  <div class="content sm-gutter">
    <!-- START BREADCRUMBS -->
    <div class="bg-white">
      <div class="container p-l-5">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
          <li class="breadcrumb-item"><nuxt-link to="/academic-session/cec">CEC Academic Session</nuxt-link></li>
          <li class="breadcrumb-item"><nuxt-link :to="`/academic-session/cec/${formData.session_id}`">CEC Options</nuxt-link></li>
          <li class="breadcrumb-item active">Program Setup</li>
        </ol>
      </div>
    </div>
    <!-- END BREADCRUMBS -->
    <!-- START CONTAINER FLUID -->
    <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
      <div class="card card-default">
        <div class="card-header  separator">
          <h3 class="text-primary no-margin pull-left sm-pull-reset">Program Setup</h3>
          <div class="clearfix"></div>
        </div>
        <form class="m-t-20" @submit.prevent="saveSelection">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>College</label>
                  <select id="college" required @change="getDepartments" v-model="formData.college" class="form-control">
                    <option value="">Select College</option>
                    <option v-for="college in colleges" :value="college.id" :key="college.id">
                      {{ college.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>Entry mode</label>
                  <select id="entry_mode" required v-model="formData.entry_mode" class="form-control">
                    <option value="">Select Entry Mode</option>
                    <option v-for="mode in modes" :value="mode.id" :key="mode.id">
                      {{ mode.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="card card-default" v-if="!loading && !setDept">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12">
                      <label class="text-uppercase fs-16 bold">Select a college</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card card-default" v-if="loading && !setDept">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12">
                      <label class="text-uppercase fs-16 bold">Loading...please wait</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card card-default" v-if="!loading && setDept" v-for="dept in departments" :key="dept.id">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-check">
                        <label class="text-uppercase fs-16 bold">{{ dept.name }}</label>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6" v-for="prog in dept.program" :key="prog.id">
                      <div class="form-check">
                        <input type="checkbox" v-model="formData.program" :value="prog.id" id="defaultCheck1">
                        <label for="defaultCheck1" class="semi-bold fs-16">{{ prog.name }}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="float-right">
              <button type="submit" id="submitBtn" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Save Record</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- END CONTAINER FLUID -->
  </div>
</template>
<script>
export default {
  layout: 'main',
  data: () => ({
    loading: false,
    setDept: false,
    colleges: [],
    departments: [],
    formData: {
      program: [],
      entry_mode: '',
      session_id: ''
    },
    modes: []
  }),
  methods: {
    saveSelection() {
      if(this.formData.program < 1) {
        this.$toast.error('Please select at least one program')
        return
      }
      $('#submitBtn').attr('disabled', true).html('Saving...')
      this.$store.dispatch('cec/saveSelection', this.formData)
        .then(res =>{
          $('#submitBtn').attr('disabled', false).html('Save Record')
          if(res.data.status) {
            this.$toast.success(res.data.message)
            return
          }

          this.$toast.error(res.data.message)
        }).catch(err =>{
          this.$toast.error('An error occurred')
          $('#submitBtn').attr('disabled', false).html('Save Record')
        })
    },
    getColleges() {
      $('#college').attr('disabled', true)
      this.$store.dispatch('cec/getFaculties')
        .then(res =>{
          $('#college').attr('disabled', false)
          this.colleges = res.data.data
        })
    },
    getDepartments() {
      this.loading = true
      this.setDept = false
      this.$store.dispatch('cec/getDepartmentByFaculty', this.formData.college)
        .then(res =>{
          this.departments = res.data.data
          this.loading = false
          this.setDept = true
        })
    },
    getCecEntryMode() {
      $('#entry_mode').attr('disabled', true)
      this.$store.dispatch('cec/getEntryMode')
        .then(res =>{
          $('#entry_mode').attr('disabled', false)
          this.modes = res.data.data
        })
    }
  },
  mounted() {
    this.formData.session_id = this.$route.params.ceId;
    this.getColleges()
    this.getCecEntryMode()
  }
}
</script>
