<template>
  <div class="content sm-gutter">
    <!-- START BREADCRUMBS -->
    <div class="bg-white">
      <div class="container p-l-5">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
          <li class="breadcrumb-item"><nuxt-link to="/academic-session/utme">Academic Session</nuxt-link></li>
          <li class="breadcrumb-item active">Regular Academic Session</li>
        </ol>
      </div>
    </div>
    <!-- END BREADCRUMBS -->

    <!-- ADD RECORD MODAL STARTS HERE -->
    <div class="modal fade SlideUp" id="session-modal" tabindex="-1" role="dialog" aria-hidden="true">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        <i class="pg-close"></i>
      </button>
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="text-left p-b-5">
              <span class="semi-bold" id="title"></span>
            </h5>
          </div>
          <div class="modal-body">
            <hr />
            <form @submit.prevent="saveSession">
              <div class="row">
                <div class="col-lg-6 m-b-10">
                  <input type="text" v-model="formData.session_name" placeholder="Session name" class="form-control" />
                </div>
                <div class="col-lg-6 m-b-10">
                  <input type="text" v-model="formData.course_registration_fee" placeholder="Course Reg Fee" class="form-control" />
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6 m-b-10">
                  <input type="text" v-model="formData.matriculation_year" placeholder="Matriculation Year" class="form-control" />
                </div>
                <div class="col-lg-6 m-b-10">
                  <input type="text" v-model="formData.late_fees_amount" placeholder="Late Registration Fee" class="form-control" />
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6 m-b-10">
                  <input type="date" v-model="formData.late_fees_start_date" class="form-control" />
                </div>
                <div class="col-lg-6 m-b-10">
                  <input type="date" v-model="formData.late_fees_end_date" class="form-control" />
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12 m-b-10">
                  <select class="form-control" v-model="formData.status">
                    <option value="">-Status-</option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-lg-12">
                  <button type="submit" id="submitBtn" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">
                    <i class="fa fa-save" /> &nbsp;&nbsp; Save Record
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <!-- ADD RECORD MODAL ENDS HERE -->

    <!-- START CONTAINER FLUID -->
    <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
      <div class="card card-default">
        <div class="card-header ">
          <h3 class="text-primary no-margin pull-left sm-pull-reset">Regular Session Setup</h3>
          <div class="pull-right sm-pull-reset">
            <button type="button" @click="refresh()" class="btn btn-success btn-sm">
              <i class="fa fa-refresh"></i>&nbsp; Refresh
            </button>
            <button type="button" @click="openModal()" class="btn btn-warning btn-sm">
              <i class="fa fa-plus"></i>&nbsp; Add New Record
            </button>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-striped table-condensed" id="basicTable">
              <thead>
                <th>Session</th>
                <th>Late fee amount</th>
                <th>Course reg fee</th>
                <th>Matric. Year</th>
                <th>Status</th>
                <th>Action</th>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td colspan="6">Loading....Please wait</td>
                </tr>
                <tr v-if="!loading && sessions.length < 1">
                  <td colspan="6">No record at the moment</td>
                </tr>
                <tr v-if="!loading && sessions.length > 0" v-for="session in sessions">
                  <td>{{ session.session_name }}</td>
                  <td>{{ session.late_fees_amount }}</td>
                  <td>{{ session.course_registration_fee }}</td>
                  <td>{{ session.matriculation_year }}</td>
                  <td v-if="session.status === 1">Active</td>
                  <td v-if="session.status === 0">Inactive</td>
                  <td>
                    <span data-placement="top" @click="editSession(session)" data-toggle="tooltip" title="Edit Record">
                      <button type="button" class="btn btn-default btn-sm" role="button">
                        <i class="fa fa-pencil"></i>
                      </button>
                    </span>
                    <span data-placement="top" data-toggle="tooltip" title="Delete Record">
                      <button type="button" class="btn btn-default btn-sm" role="button"><i class="fa fa-trash"></i></button>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <pagination
              v-bind:pagination="pagination"
              v-on:click.native="getAcademicSession(pagination.current_page)"
              :offset="4">
            </pagination>
          </div>
        </div>
      </div>
    </div>
    <!-- END CONTAINER FLUID -->
  </div>
</template>
<script>
export default {
  layout: "main",
  data: () => ({
    loading: true,
    sessions: [],
    formData: {
      session_name: '',
      late_fees_start_date: '',
      late_fees_end_date: '',
      late_fees_amount: '',
      course_registration_fee: '',
      matriculation_year: '',
      status: '',
      id: ''
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
    getAcademicSession(page) {
      this.$store.dispatch('student-acad-session/getSession', page)
        .then(res =>{
          if(res.data.status) {
            this.pagination = res.data.data
            this.sessions = res.data.data.data
            this.loading = false
            return
          }

          this.$toast.error(res.data.message)
          this.loading = false
        }).catch(err =>{
          this.loading = false
          this.$toast.error('An error occurred')
        })
    },
    saveSession()  {
      if(this.formData.id === '') {
        this.createSession()
      }else{
        this.updateSession()
      }
    },
    createSession() {
      $('#submitBtn').attr('disabled', true).html('<i class="fa fa-save" /> &nbsp;&nbsp; Saving...')
      this.$store.dispatch('student-acad-session/saveSession', this.formData)
        .then(res =>{
          $('#submitBtn').attr('disabled', false).html('<i class="fa fa-save" /> &nbsp;&nbsp; Save Record')
          if(res.data.status) {
            this.closeModal()
            this.refresh()
            this.$toast.success(res.data.message)
            return
          }
          this.$toast.error(res.data.message)
        }).catch(err =>{
          $('#submitBtn').attr('disabled', false).html('<i class="fa fa-save" /> &nbsp;&nbsp; Save Record')
          this.$toast.error('An error occurred')
        })
    },
    updateSession() {
      $('#submitBtn').attr('disabled', true).html('<i class="fa fa-save" /> &nbsp;&nbsp; Updating...')
      this.$store.dispatch('student-acad-session/updateSession', this.formData)
        .then(res =>{
          $('#submitBtn').attr('disabled', false).html('<i class="fa fa-save" /> &nbsp;&nbsp; Update Record')
          if(res.data.status) {
            this.closeModal()
            this.refresh()
            this.$toast.success(res.data.message)
            return
          }

          this.$toast.error(res.data.message)
        }).catch(err =>{
          $('#submitBtn').attr('disabled', false).html('<i class="fa fa-save" /> &nbsp;&nbsp; Update Record')
          this.$toast.error('An error occurred')
        })
    },
    editSession(session) {
      this.formData = {
        session_name: session.session_name,
        late_fees_start_date: this.$moment(session.late_fees_start_date).format('Y-MM-DD'),
        late_fees_end_date: this.$moment(session.late_fees_start_date).format('Y-MM-DD'),
        late_fees_amount: session.late_fees_amount,
        course_registration_fee: session.course_registration_fee,
        matriculation_year: session.matriculation_year,
        status: session.status,
        id: session.id
      }
      $('#title').html('Edit Session')
      $('#submitBtn').attr('disabled', false).html('<i class="fa fa-save" /> &nbsp;&nbsp; Update Record')
      $('#session-modal').modal()
    },
    openModal() {
      $('#title').html('Create new session')
      $('#submitBtn').attr('disabled', false).html('<i class="fa fa-save" /> &nbsp;&nbsp; Save Record')
      $('#session-modal').modal()
    },
    closeModal() {
      this.formData = {
        session_name: '',
        late_fees_start_date: '',
        late_fees_end_date: '',
        late_fees_amount: '',
        course_registration_fee: '',
        matriculation_year: '',
        status: '',
        id: ''
      }
      $('#title').html('')
      $('#session-modal').modal('hide')
    },
    refresh() {
      this.loading = true
      this.getAcademicSession(this.pagination.current_page)
    }
  },
  mounted() {
    this.getAcademicSession(this.pagination.current_page)
  }
}
</script>
