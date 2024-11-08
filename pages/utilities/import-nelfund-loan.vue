<template>
  <div class="content sm-gutter">
    <!-- START BREADCRUMBS -->
    <div class="bg-white">
      <div class="container p-l-5">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
          <li class="breadcrumb-item"><a href="#">Utilities</a></li>
          <li class="breadcrumb-item active">Import NELFUND Student Loan</li>
        </ol>
      </div>
    </div>
    <!-- END BREADCRUMBS -->

    <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0" v-if="response.success">
      <div class="card card-default">
        <div class="card-body">
          <div class="alert alert-danger" v-if="response.errors.length > 0">
            <strong>The Following Errors Occurred:</strong>
            <p>
              <ul v-for="item in response.errors" :key="response[item]">
                <li>Row: {{ item.row }} ---- <span>Attribute: {{ item.attribute }}</span> ---- <span >Messages: {{ item.message }}</span></li>
              </ul>
              <a :href="response.error_file" target="_blank" download>Click here to download error file</a>
            </p>
          </div>
          <div class="alert alert-success">
            <strong>Audit Trail Performed.</strong>
            <p>File Successfully Imported: {{ response.count }} Records Imported</p>
          </div>
        </div>
      </div>
    </div>

    <!-- START CONTAINER FLUID -->
    <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
      <div class="card card-default">
        <div class="card-header">
          <div class="card-title text-primary">Import Nelfund Student Loan</div>
        </div>
        <div class="card-body">
          <form style="width: 100%" @submit.prevent="upload">
            <div class="row">
              <div class="col-md-6">
                <label>Select Mode</label>
                <select required class="form-control" v-model="formData.entry_mode">
                  <option value="" disabled selected>Select your option</option>
                  <option value="PUTME/DE">PUTME/ DE</option>
                  <option value="PG">PG</option>
                  <option value="CEC">CEC</option>
                </select>
              </div>
              <div class="col-md-6">
                <label>Select File</label>
                <input type="file" required ref="file" class="form-control"/>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-md-12 mt-2">
                <div class="pull-left">
                  <button type="button" id="downloadBtn" @click="downloadSample" class="btn btn-danger btn-block"><i class="fa fa-download"></i> Download Sample Sheet</button>
                </div>
                <div class="pull-right">
                  <button type="submit" id="uploadBtn" class="btn btn-primary btn-block"><i class="fa fa-upload"></i> Upload Record</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="card card-default">
        <div class="card-header separator">
          <h3 class="text-primary no-margin pull-left sm-pull-reset">Imported Students</h3>
          <div class="pull-right sm-pull-reset">
            <button type="button" @click="refreshStudents" class="btn btn-success btn-sm"><i class="fa fa-refresh"></i>&nbsp; Refresh </button>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-striped table-condensed" id="basicTable">
              <thead>
              <tr>
                <th style="width:22%;">Matric No.</th>
                <th>Name</th>
                <th>Session</th>
                <th>Semester</th>
                <th>Level</th>
                <th style="">Amount</th>
              </tr>
              </thead>
              <tbody>
              <tr v-if="loading"><td colspan="7">Loading...Please wait</td></tr>
              <tr v-if="!loading && students.length < 1"><td colspan="7">No records at the moment</td></tr>
              <tr v-if="!loading && students.length > 0" v-for="student in students">
                <td>{{ student.matriculation_number }}</td>
                <td>{{ student.student.firstname }} {{ student.student.lastname }}</td>
                <td>{{ student.session.session_name }}</td>
                <td>{{ student.semester }}</td>
                <td>{{ student.level }}</td>
                <td>{{ student.amount }}</td>
                <!-- <td>
                  <div class="btn-group">
                    <span data-placement="top" data-toggle="tooltip" title="View Request">
                      <a href="javascript:;" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-eye"></i></a>
                    </span>
                    <span data-placement="top" data-toggle="tooltip" title="Manage Courses">
                        <nuxt-link :to="'/utilities/add-on/manage?matriculation_number=' + student.matriculation_number" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-edit"></i></nuxt-link>
                    </span>
                    <span data-placement="top" data-toggle="tooltip" title="">
                        <a href="javascript:;" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-address-book-o"></i></a>
                      </span>
                  </div>
                </td> -->
              </tr>
              </tbody>
            </table>
            <Pagination
              v-bind:pagination="pagination"
              v-on:click.native="getAllStudents(pagination.current_page)"
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
  layout: 'main',
  components: {
    Pagination
  },
  data: () => ({
    loading: true,
    students: [],
    formData: {
      jamb_number: '',
      matric_number: '',
      entry_mode: '',
      page: ''
    },
    pagination: {
      total: 0,
      per_page: 2,
      from: 1,
      to: 0,
      current_page: 1
    },
    response: {},
  }),
  methods: {
    async upload() {
      $('#uploadBtn').attr('disabled', true).html('<i class="fa fa-search"></i>&nbsp; Uploading..')
      let data = new FormData()
      data.append('file', this.$refs.file.files[0])
      data.append('entry_mode', this.formData.entry_mode)

      this.$store.dispatch('nelfund/importRecord', data)
        .then(res =>{
          $('#uploadBtn').attr('disabled', false).html('<i class="fa fa-upload"></i> Upload Record')
          if(res.data.success) {
            this.response = res.data
            this.getAllStudents(1)
            return
          }

          this.$toast.error('An error occurred')
        }).catch(err =>{
        $('#uploadBtn').attr('disabled', false).html('<i class="fa fa-upload"></i> Upload Record')
        this.$toast.error(err)
      })
    },
    getAllStudents (page) {
      this.students = []
      this.loading = true
      this.formData.page = page
      this.$store.dispatch('nelfund/getStudents', this.formData)
        .then(res =>{
          this.students = res.data.data.data
          this.pagination = res.data.data
          this.loading = false
        }).catch(err =>{
        this.loading = false
        this.$toast.error(err)
      })
    },
    downloadSample() {
      $('#downloadBtn').attr('disabled', true).html('<i class="fa fa-search"></i>&nbsp; Downloading..')
      this.$store
        .dispatch('nelfund/downloadSampleFile')
        .then(res => {
          $('#downloadBtn').attr('disabled', false).html('<i class="fa fa-download"></i> Download Sample Sheet')
            if(res.success === true)    {
              window.location = res.message
              $('#upload_o_department').modal('hide').data( 'bs.modal', null )
              this.$toast.success('Download Successful!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
            }
        }).catch(err => {
        $('#downloadBtn').attr('disabled', false).html('<i class="fa fa-download"></i> Download Sample Sheet')
      })
    },
    refreshStudents () {

    }
  },
  mounted () {
    this.getAllStudents(this.pagination.current_page)
  }
}
</script>
