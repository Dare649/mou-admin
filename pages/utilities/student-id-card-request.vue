<template>
  <div>

    <div class="modal fade SlideUp" id="import_student_emails" tabindex="-1" role="dialog" aria-hidden="true">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        <i class="pg-close"></i>
      </button>
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="text-left p-b-5"><span class="semi-bold">Upload Student Request Status</span></h5>
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
            <li class="breadcrumb-item active">Send ID Card Request</li>
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
            <div class="card-title text-primary">Search ID Card Requests</div>
          </div>
          <div class="card-body">
            <form style="width: 100%">
              <div class="row">
                <div class="col-md-4">
                  <input type="text" class="form-control" v-model="sData.matriculation_number" placeholder="Matriculation Number" required>
                </div>
                <div class="col-md-4">
                  <select class="form-control" required v-model="sData.status">
                    <option value="">Status</option>
                    <option value="0">All</option>
                    <option value="1">Captured</option>
                    <option value="2">Printed</option>
                    <option value="3">Collected</option>
                  </select>
                </div>
                <div class="col-md-4">
                  <input type="date" class="form-control" v-model="sData.date" placeholder="Date" required>
                </div>
              </div>
              <div class="row m-t-10">
                <div class="col-md-12">
                  <button type="button" id="searchBtn" @click="getIdCardRequest(1)" class="btn btn-primary btn-block">Search Record</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="card card-default">
          <div class="card-header">
            <h3 class="text-primary no-margin pull-left sm-pull-reset">MOUAU Student ID Card Request</h3>
            <div class="pull-right sm-pull-reset">
              <button type="button" class="btn btn-success btn-sm" @click.prevent="resetResult()"><i class="fa fa-refresh"></i>&nbsp; Refresh </button>
              <button type="button" class="btn btn-primary btn-sm" @click.prevent="displayImportModal" data-toggle="modal"><i class="fa fa-arrow-down"></i> &nbsp; <strong>Import Records from CSV</strong></button>
              <button type="button" class="btn btn-warning btn-sm" @click.prevent="exportIdRequest" id="exportBtn" data-toggle="modal"><i class="fa fa-arrow-up"></i> &nbsp; <strong>Export Records into CSV</strong></button>
            </div>
            <div class="clearfix"></div>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-striped table-condensed" id="basicTable">
                <thead>
                  <th>Mat No</th>
                  <th >Name</th>
                  <th >Email</th>
                  <th style="width: 10%">Gender</th>
                  <th style="width: 18%">Action</th>
                </thead>
                <tbody>
                  <tr v-if="loading">
                    <td colspan="5">Loading.....please wait</td>
                  </tr>
                  <tr v-if="!loading && requests.length < 1">
                    <td colspan="5">No record found</td>
                  </tr>
                  <tr v-if="!loading && requests.length > 0" v-for="request in requests" :key="request.id">
                    <td>{{ request.matriculation_number }}</td>
                    <td>{{ request.student.firstname }} {{ request.student.lastname }}</td>
                    <td>{{ request.preferred_email }}</td>
                    <td>{{ request.student.gender }}</td>
                    <td>
                      <div class="btn-group">
                        <span data-placement="top" data-toggle="tooltip" title="View Detail">
                          <button type="button" @click.prevent="viewModal(request)" class="btn btn-default btn-sm"><i class="fa fa-file-o"></i></button>
                        </span>

                        <span data-placement="top" data-toggle="tooltip" title="Delete details">
                          <button type="button" @click.prevent="deleteRequest(request.id)" class="btn btn-default btn-sm"><i class="fa fa-trash"></i></button>
                        </span>

                        <!-- <span data-placement="top" data-toggle="tooltip" title="Mark as Collected">
                          <button type="button" class="btn btn-default btn-sm"><i class="fa fa-pencil"></i></button>
                        </span> -->
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <Pagination
                v-bind:pagination="pagination"
                v-on:click.native="getIdCardRequest(pagination.current_page)"
                :offset="4">
              </Pagination>
            </div>
          </div>
        </div>
      </div>


      <div class="modal fade SlideUp" id="view_request" tabindex="-1" role="dialog" aria-hidden="true">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
          <i class="pg-close"></i>
        </button>
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="text-left p-b-5"><span class="semi-bold">View Student ID Card Request</span></h5>
            </div>
            <div class="modal-body jamb_view">
              <h5>{{ display.name }}</h5>
              <ul>
                <li>
                  <small>Matriculation Number</small><br />
                  <span>{{ display.matriculation_number }}</span>
                </li>
                <li>
                  <small>Genotype</small> <br />
                  <span>{{ display.genotype }}</span>
                </li>
                <li>
                  <small>Blood group</small><br />
                  <span>{{ display.blood_group }}</span>
                </li>
                <li>
                  <small>Gender</small><br />
                  <span>{{ display.gender }}</span>
                </li>
                <div class="clearfix"></div>
              </ul>

              <table class="table table-striped table-bordered">
                <tr>
                  <th>Title:</th>
                  <td>{{ display.title }}</td>
                </tr>
                <tr>
                  <th>Preferred Email:</th>
                  <td>{{ display.preferred_email }}</td>
                </tr>
                <tr>
                  <th>Date Requested:</th>
                  <td>{{ display.date_requested }}</td>
                </tr>
                <tr>
                  <th>To Pay:</th>
                  <td>{{ (display.to_pay === 1) ? 'YES' : 'NO' }}</td>
                </tr>
                <tr>
                  <th>Has Paid:</th>
                  <td>{{ (display.is_paid === 1) ? 'YES' : 'NO' }}</td>
                </tr>
                <tr>
                  <th>Is Captured:</th>
                  <td>{{ (display.is_captured == 0 ) ? 'NO' : 'YES' }}</td>
                </tr>
                <tr>
                  <th>Date Captured:</th>
                  <td>{{ display.date_captured }}</td>
                </tr>
                <tr>
                  <th>Is printed:</th>
                  <td>{{ (display.is_printed == 0) ? 'NO' : 'YES' }}</td>
                </tr>
                <tr>
                  <th>Date Printed:</th>
                  <td>{{ display.date_printed }}</td>
                </tr>
                <tr>
                  <th>Is collected:</th>
                  <td>{{ (display.is_collected == 0) ? 'NO' : 'YES' }}</td>
                </tr>
                <tr>
                  <th>Date collected:</th>
                  <td>{{ display.date_collected }}</td>
                </tr>
              </table>

              <div class="col-md-12 m-t-10" v-if="display.is_doc === 1">
                <button type="button" @click.prevent="downloadDocument" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Download Replacement Approval</button>
              </div>
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
    display: {
      name: '',
      matriculation_number: '',
      genotype: '',
      blood_group: '',
      gender: '',
      title: '',
      preferred_email: '',
      date_requested: '',
      is_captured: '',
      date_captured: '',
      is_printed: '',
      date_printed: '',
      is_collected: '',
      date_collected: '',
      to_pay: '',
      is_paid: '',
      is_doc: '',
      doc_url: ''
    },
    formData: {
      file: ''
    },
    sData: {
      matriculation_number: '',
      status: '',
      date: '',
      export: false,
      page: ''
    },
    importResponse: {},
    requests: [],
    loading: true
  }),
  methods: {
    downloadDocument() {
      window.open(this.display.doc_url, '_blank')
    },
    async importRecord() {
      let formData = new FormData();
      formData.append('file', this.$refs.myFiles.files[0]);
      $('#submitBtn').attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i>Uploading..please wait')
      this.$store.dispatch('id-card-request/importStudent', formData)
        .then(res =>{
          $('#submitBtn').attr('disabled', false).html('Upload Record')
          if(res.data.success){
            this.getIdCardRequest(this.pagination.current_page)
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
    async getIdCardRequest(page) {
      this.loading = true
      this.sData.page = page
      this.$store.dispatch('id-card-request/getIdCardRequest', this.sData)
        .then(res =>{
          this.pagination = res.data.data
          this.requests = res.data.data.data
          this.loading = false
        }).catch(err => {
          console.log(err)
      })
    },
    async resetResult() {
      this.sData = {
        matriculation_number: '',
        status: '',
        date: '',
        export: false,
        page: ''
      }

      await this.getIdCardRequest(1)
    },
    exportIdRequest(){
      $('#exportBtn').attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i>Exporting..please wait')
      this.sData.export = 'true'
      this.$store
        .dispatch('id-card-request/exportRes', this.sData)
        .then(res => {
          $('#exportBtn').attr('disabled', false).html('<i class="fa fa-arrow-up"></i> &nbsp; <strong>Export Results into CSV</strong>')
            let fileURL = window.URL.createObjectURL(new Blob([res.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}));
            let fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'student-id-card-request' + now() + '.xlsx');
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
      $('#downloadBtn').attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i>Downloading..please wait')
        this.$store.dispatch('id-card-request/downloadSample')
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
    },
    viewModal(request) {
      this.display = {
        name: request.student.firstname + ' ' + request.student.middlename + ' ' + request.student.lastname,
        matriculation_number: request.student.matriculation_number,
        genotype: request.genotype,
        blood_group: request.blood_group,
        gender: request.student.gender,
        title: request.title,
        preferred_email: request.preferred_email,
        date_requested: request.date_requested,
        is_captured: request.is_treated,
        date_captured: request.date_treated,
        is_printed: request.is_printed,
        date_printed: request.date_printed,
        is_collected: request.is_collected,
        date_collected: request.date_collected,
        is_paid: request.is_paid,
        to_pay: request.to_pay,
        is_doc: request.doc_uploaded,
        doc_url: request.document_url
      }
      $('#view_request').modal()
    },
    async deleteRequest(id) {
      if(confirm('Are you sure you want to delete this record?')) {
        this.$store.dispatch('id-card-request/deleteReq', id)
          .then(res => {
            if (!res.data.status) {
              this.$toast.error(res.data.message)
              return
            }

            this.$toast.success(res.data.message)
            this.getIdCardRequest(1)

          }).catch(err => {
          console.log(err)
        })
      }
    }
  },
  async mounted() {
    await this.getIdCardRequest(1)
  }
}
</script>

<style scoped>

</style>
