<template>
  <div class="content sm-gutter">
    <!-- START BREADCRUMBS -->
    <div class="bg-white">
      <div class="container p-l-5">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
          <li class="breadcrumb-item"><nuxt-link to="/academic-session/utme">Academic Session</nuxt-link></li>
          <li class="breadcrumb-item active">Accommodation Fee Setup</li>
        </ol>
      </div>
    </div>
    <!-- END BREADCRUMBS -->

    <!-- ADD RECORD MODAL STARTS HERE -->
    <div class="modal fade SlideUp" id="accommodation_modal" tabindex="-1" role="dialog" aria-hidden="true">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        <i class="pg-close"></i>
      </button>
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="text-left p-b-5"><span class="semi-bold" id="title"></span></h5>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitData">
              <div class="row">
                <div class="col-lg-6 m-b-10">
                  <select class="form-control" @change="getSession($event)" v-model="formData.entry_mode">
                    <option value="" selected>Select Entry Mode</option>
                    <option value="PUTME">PUTME</option>
                    <option value="DE">DE</option>
                  </select>
                </div>
                <div class="col-lg-6 m-b-10">
                  <select class="form-control" v-model="formData.academic_session">
                    <option value="" selected>Select Academic Session</option>
                    <option v-for="session in sessions" :value="session.id">
                      {{ (formData.entry_mode === 'PUTME') ? session.session_name : session.de_session_name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6 m-b-10">
                  <select class="form-control" v-model="formData.hostel_name">
                    <option value="" selected>Select Hostel Type</option>
                    <option value="New Hostel">New Hostel</option>
                    <option value="Old Hostel">Old Hostel</option>
                  </select>
                </div>
                <div class="col-lg-6 m-b-10">
                  <input type="text" class="form-control" placeholder="Accommodation Fee" v-model="formData.amount"/>
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
          <h3 class="text-primary no-margin pull-left sm-pull-reset">Accommodation Fee Setup</h3>
          <div class="pull-right sm-pull-reset">
            <button type="button" @click="refresh()" class="btn btn-success btn-sm"><i class="fa fa-refresh"></i>&nbsp; Refresh </button>
            <button type="button" @click="addRecord()" class="btn btn-warning btn-sm"><i class="fa fa-plus"></i>&nbsp; Add New Record </button>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-striped table-condensed" id="basicTable">
              <thead>
                <th>Entry Mode</th>
                <th>Session</th>
                <th>Hostel Name</th>
                <th>Amount</th>
                <th>Action</th>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td colspan="5">Loading....Please wait</td>
                </tr>
                <tr v-if="!loading && accommodations.length < 1">
                  <td colspan="5">No record at the moment</td>
                </tr>
                <tr v-if="!loading && accommodations.length > 0" v-for="accommodation in accommodations">
                  <td>{{accommodation.entry_mode}}</td>
                  <td v-if="accommodation.entry_mode === 'PUTME'">{{accommodation.session.session_name}}</td>
                  <td v-if="accommodation.entry_mode === 'DE'">{{accommodation.session.de_session_name}}</td>
                  <td>{{accommodation.hostel_name}}</td>
                  <td>{{accommodation.amount}}</td>
                  <td>
                    <span data-placement="top" data-toggle="tooltip" title="Edit Record">
                      <button type="button" @click="editRecord(accommodation)" class="btn btn-default btn-sm" role="button"><i class="fa fa-pencil"></i></button>
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
              v-on:click.native="getAccommodationFee(pagination.current_page)"
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
  layout: 'main',
  data: () => ({
    loading: true,
    sLoading: false,
    pagination: {
      total: 0,
      per_page: 2,
      from: 1,
      to: 0,
      current_page: 1
    },
    accommodations: [],
    sessions: [],
    searchData: {
      id: ''
    },
    formData: {
      entry_mode: '',
      academic_session: '',
      hostel_name: '',
      amount: '',
      status: 1,
      id: ''
    }
  }),
  methods: {
    getAccommodationFee(page) {
      this.$store.dispatch('accommodation/getAccommodation', page)
        .then(res =>{
          this.accommodations = res.data.data.data
          this.pagination = res.data.data
          this.loading = false
        }).catch(err =>{
          this.loading = false
          this.$toast.error(err)
      })
    },
    refresh() {
      this.loading = true
      this.accommodations = []
      this.getAccommodationFee(this.pagination.current_page)
    },
    addRecord() {
      this.resetRecord()
      $('#title').html('Add New Record')
      $('#submitBtn').html('<i class="fa fa-save" /> &nbsp;&nbsp; Save Record')
      $('#accommodation_modal').modal()
    },
    editRecord(data) {
      this.resetRecord()
      this.formData.entry_mode = data.entry_mode
      this.getSession()
      this.formData.hostel_name = data.hostel_name
      this.formData.amount = data.amount
      this.formData.id = data.id
      this.formData.academic_session = data.academic_session_id
      $('#title').html('Edit Accommodation Record')
      $('#submitBtn').html('<i class="fa fa-save" /> &nbsp;&nbsp; Update Record')
      $('#accommodation_modal').modal()
    },
    submitData() {
      if(this.formData.id === '') {
        this.addNewRecord()
      }else{
        this.updateRecord()
      }
    },
    getSession() {
      this.$store.dispatch('accommodation/getSessionByEntryMode', this.formData.entry_mode)
        .then(res =>{
          this.sessions = res.data.data
        }).catch(err =>{
          this.$toast.error(err)
      })
    },
    addNewRecord() {
      $('#submitBtn').attr('disabled', true).html('<i class="fa fa-spin fa-spinner" /> &nbsp;&nbsp; Saving');
      this.$store.dispatch('accommodation/saveAccommodationRecord', this.formData)
        .then(res =>{
          $('#submitBtn').attr('disabled', false).html('<i class="fa fa-save" /> &nbsp;&nbsp; Save Record');
          if(res.data.status) {
            this.$toast.success(res.data.message)
            this.resetRecord()
            this.refresh()
            $('#accommodation_modal').modal('hide')
            return
          }

          this.$toast.error(res.data.message)
        }).catch(err =>{
        $('#submitBtn').attr('disabled', false).html('<i class="fa fa-save" /> &nbsp;&nbsp; Save Record');
          this.$toast.error(err)
      })
    },
    resetRecord() {
      this.formData = {
        entry_mode: '',
        academic_session: '',
        hostel_name: '',
        amount: '',
        status: 1,
        id: ''
      }
    },
    updateRecord() {
      $('#submitBtn').attr('disabled', true).html('<i class="fa fa-spin fa-spinner" /> &nbsp;&nbsp; Updating');
      this.$store.dispatch('accommodation/updateAccommodationRecord', this.formData)
        .then(res =>{
          $('#submitBtn').attr('disabled', false).html('<i class="fa fa-save" /> &nbsp;&nbsp; Update Record');
          if(res.data.status) {
            this.$toast.success(res.data.message)
            this.resetRecord()
            this.refresh()
            $('#accommodation_modal').modal('hide')
            return
          }

          this.$toast.error(res.data.message)
        }).catch(err =>{
        $('#submitBtn').attr('disabled', false).html('<i class="fa fa-save" /> &nbsp;&nbsp; Update Record');
        this.$toast.error(err)
      })
    }
  },
  mounted() {
    this.getAccommodationFee(1)
  }
}
</script>
