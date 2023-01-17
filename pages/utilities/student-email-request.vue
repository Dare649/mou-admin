<template>
  <div>

    <div class="modal fade SlideUp" id="import_student_emails" tabindex="-1" role="dialog" aria-hidden="true">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        <i class="pg-close"></i>
      </button>
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="text-left p-b-5"><span class="semi-bold">Upload Student Emails</span></h5>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-lg-12 m-b-10">
                <div class="custom-file">
                  <input type="file" ref="myFiles" required class="custom-file-input" id="customFileLang" lang="es">
                  <label class="custom-file-label" for="customFileLang">Select File</label>
                </div>
              </div>
              <div class="col-lg-12">
                <button type="button" @click="importRecord" id="submitBtn" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Upload Record</button>
              </div>
              <div class="col-lg-12 m-t-15">
                <div class="dd-placeholder p-1">
                  <h5 class="pull-left sm-pull-reset"><i class="fa fa-file-excel-o p-l-10"></i> Sample File</h5>
                  <button @click="downloadSampleFile" id="downloadBtn" class="pull-right sm-pull-reset btn btn-default m-t-5 m-r-10"><i class="fa fa-arrow-down"></i> &nbsp; Download</button>
                  <div class="clearfix"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>

    <div class="content sm-gutter">
      <!-- START BREADCRUMBS -->
      <div class="bg-white">
        <div class="container p-l-5">
          <ol class="breadcrumb breadcrumb-alt">
            <li class="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
            <li class="breadcrumb-item"><a href="#">Utilities</a></li>
            <li class="breadcrumb-item active">Send Email Request</li>
          </ol>
        </div>
      </div>
      <!-- END BREADCRUMBS -->
      <!-- Audit Trail -->
      <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0" v-if="importResponse.success">
        <div class="card card-default">
          <div class="card-body">
            <div class="alert alert-danger" v-if="importResponse.errors.length > 0">
              <strong>The Following Errors Occurred:</strong>
              <p>
              <ul v-for="item in importResponse.errors" :key="importResponse[item]">
                <li>Row: {{item.row}} ---- <span>Attribute: {{item.attribute}}</span> ---- <span >Messages: {{item.message}}</span></li>
              </ul>
              <a :href="importResponse.error_file" target="_blank" download>Click here to download error file</a>
              </p>
            </div>
            <div class="alert alert-success">
              <strong>Audit Trail Performed.</strong>
              <p>File Successfully Imported. {{importResponse.count}} Records Imported</p>
            </div>
          </div>
        </div>
      </div>

      <!-- START CONTAINER FLUID -->
      <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
        <div class="card card-default">
          <div class="card-header">
            <div class="card-title text-primary">Search Email Requests</div>
          </div>
          <div class="card-body">
            <form style="width: 100%">
              <div class="row">
                <div class="col-md-10">
                  <input type="text" class="form-control" v-model="sData.reg_num" placeholder="Enter Registration Number" required>
                </div>
                <div class="col-md-2">
                  <button type="button" id="searchBtn" @click="getEmailRequest(1)" class="btn btn-primary btn-block">Search Record</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="card card-default">
          <div class="card-header">
            <h3 class="text-primary no-margin pull-left sm-pull-reset">MOUAU Student Email</h3>
            <div class="pull-right sm-pull-reset">
              <button type="button" class="btn btn-success btn-sm"><i class="fa fa-refresh"></i>&nbsp; Refresh </button>
              <button type="button" class="btn btn-primary btn-sm" @click="displayImportModal" data-toggle="modal"><i class="fa fa-arrow-down"></i> &nbsp; <strong>Import Results from CSV</strong></button>
              <button type="button" class="btn btn-warning btn-sm" @click="exportEmailRequest" id="exportBtn" data-toggle="modal"><i class="fa fa-arrow-up"></i> &nbsp; <strong>Export Results into CSV</strong></button>
            </div>
            <div class="clearfix"></div>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-striped table-condensed" id="basicTable">
                <thead>
                  <th>Mat No</th>
                  <th >Reg No</th>
                  <th >Name</th>
                  <th >Email</th>
                  <th >Phone</th>
                  <th style="width: 7%">Gender</th>
                  <th style="width: 10%">Status</th>
                </thead>
                <tbody>
                  <tr v-if="loading">
                    <td colspan="7">Loading.....please wait</td>
                  </tr>
                  <tr v-if="!loading && requests.length < 1">
                    <td colspan="7">No record found</td>
                  </tr>
                  <tr v-if="!loading && requests.length > 0" v-for="request in requests" :key="request.id">
                    <td>{{ request.matriculation_number }}</td>
                    <td>{{ request.registration_number }}</td>
                    <td>{{ request.full_name }}</td>
                    <td>{{ request.email }}</td>
                    <td>{{ request.phone }}</td>
                    <td>{{ request.gender }}</td>
                    <td v-if="request.is_done === 0">Pending</td>
                    <td v-if="request.is_done === 1">Uploaded</td>
                  </tr>
                </tbody>
              </table>
              <Pagination
                v-bind:pagination="pagination"
                v-on:click.native="getEmailRequest(pagination.current_page)"
                :offset="4">
              </Pagination>
            </div>
          </div>
        </div>
      </div>
      <!-- END CONTAINER FLUID -->
    </div>
  </div>
</template>

<script>
import Pagination from '~/components/Pagination'
import {now} from "moment";

export default {
  name: "student-email-request",
  layout: "main",
  components: {
    Pagination
  },
  data: () => ({
    pagination: {
      total: 0,
      per_page: 2,
      from: 1,
      to: 0,
      current_page: 1
    },
    formData: {
      file: ''
    },
    sData: {
      page: '',
      reg_num: ''
    },
    importResponse: {},
    requests: [],
    loading: true
  }),
  methods: {
    async importRecord() {
      let formData = new FormData();
      formData.append('file', this.$refs.myFiles.files[0]);
      $('#submitBtn').attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i>Uploading..please wait')
      this.$store.dispatch('email-requests/uploadStudentEmails', formData)
        .then(res =>{
          $('#submitBtn').attr('disabled', false).html('Upload Record')
          if(res.data.success){
            this.getEmailRequest(this.pagination.current_page)
            $('#import_student_emails').modal('hide').data( 'bs.modal', null )
            this.importResponse = res.data
          }else{
            this.loading = false
            this.$toast.error('An error occurred:' + res.data.message)
          }
        }).catch(err => {
        console.log(err)
      })
    },
    async getEmailRequest(page) {
      this.loading = true
      this.sData.page = page
      this.$store.dispatch('email-requests/getEmailRequest', this.sData)
        .then(res =>{
          this.pagination = res.data.data
          this.requests = res.data.data.data
          this.loading = false
        }).catch(err => {
          console.log(err)
      })
    },
    exportEmailRequest(){
      $('#exportBtn').attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i>Exporting..please wait')
      this.$store
        .dispatch('email-requests/exportEmailRequest')
        .then(res => {
          $('#exportBtn').attr('disabled', false).html('<i class="fa fa-arrow-up"></i> &nbsp; <strong>Export Results into CSV</strong>')
            let fileURL = window.URL.createObjectURL(new Blob([res.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}));
            let fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'student-email-request' + now() + '.xlsx');
            document.body.appendChild(fileLink);
            fileLink.click();
            this.exportLoading = false
            this.$toast.success('Record Exported to Excel Successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
        }).catch(err => {
        $('#exportBtn').attr('disabled', false).html('<i class="fa fa-arrow-up"></i> &nbsp; <strong>Export Results into CSV</strong>')
        this.exportLoading = false
        this.$toast.error('An error occurred please contact the administrator' + err)
      })
    },
    displayImportModal() {
      $('#import_student_emails').modal()
    },
    downloadSampleFile() {
      $('#downloadBtn').attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i>Downloding..please wait')
        this.$store.dispatch('email-requests/downloadSample')
          .then(res =>{
            $('#downloadBtn').attr('disabled', false).html('<i class="fa fa-arrow-down"></i> &nbsp; Download')
            window.location = res.message
            this.downloading = false
            // $('#import_jamb_result').modal('hide').data( 'bs.modal', null )
            this.$toast.success('Download Successful!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
          }).catch(err => {
          $('#downloadBtn').attr('disabled', false).html('<i class="fa fa-arrow-down"></i> &nbsp; Download')
          console.log(err)
        })
    }
  },
  async mounted() {
    await this.getEmailRequest()
  }
}
</script>

<style scoped>

</style>
