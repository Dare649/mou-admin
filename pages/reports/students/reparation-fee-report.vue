<template>
  <div class="content sm-gutter">
    <!-- START BREADCRUMBS -->
    <div class="bg-white">
      <div class="container p-l-5">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
          <li class="breadcrumb-item"><a href="#">Reports</a></li>
          <li class="breadcrumb-item active">Reparation Fee Report</li>
        </ol>
      </div>
    </div>
    <!-- END BREADCRUMBS -->

    <!-- START CONTAINER FLUID -->
    <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
      <div class="card card-default">
        <div class="card-header">
          <div class="card-title text-primary">Search Option</div>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <label>Matriculation Number:</label>
              <input type="text" class="form-control" v-model="formData.matriculation_number" placeholder="Matriculation Number" />
            </div>
            <div class="col-md-6">
              <label>Transaction Reference No:</label>
              <input type="text" class="form-control" v-model="formData.transaction_reference_no" placeholder="Transaction Reference No." />
            </div>
          </div>
          <div class="row m-t-5">
            <div class="col-md-4">
              <label>From Date:</label>
              <input type="date" v-model="formData.from_date" class="form-control" />
            </div>
            <div class="col-md-4">
              <label>To Date:</label>
              <input type="date" v-model="formData.to_date" class="form-control" />
            </div>
            <div class="col-md-4">
              <label>Status:</label>
              <select class="form-control" v-model="formData.status">
                <option value="" selected>All</option>
                <option value="0">Pending</option>
                <option value="1">Successful</option>
                <option value="2">Failed</option>
              </select>
            </div>
          </div>
          <div class="row m-t-15">
            <div class="col-md-6">
              <button type="button" @click="exportRecord" id="exportBtn" class="btn btn-danger"><i class="fa fa-file-excel-o"></i>&nbsp; Export to Excel</button>
            </div>
            <div class="col-md-6 text-right">
              <button type="button" id="searchBtn" @click="searchReparationFee(1)" class="btn btn-primary"><i class="fa fa-search"></i>&nbsp; Search Record</button>
            </div>
          </div>
        </div>
      </div>
      <div class="card card-default">
        <div class="card-header separator">
          <h3 class="text-primary no-margin pull-left sm-pull-reset">Reparation Fee Report</h3>
          <div class="pull-right sm-pull-reset">
            <button type="button" class="btn btn-default btn-sm"><i class="fa fa-stop"></i>&nbsp; Cancel Search </button>
            <button type="button" @click="refreshRecord" class="btn btn-success btn-sm"><i class="fa fa-refresh"></i>&nbsp; Refresh </button>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-striped table-condensed" id="basicTable">
              <thead>
              <tr>
                <th style="width: 25%;">Mat. No</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Reference No</th>
                <th>Serial No</th>
                <th>Date</th>
                <th style="width:10%">Action</th>
              </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td colspan="6">Loading......Please wait</td>
                </tr>
                <tr v-if="!loading && students.length < 1">
                  <td colspan="6">No record at the moment. Change the search criteria above and click "Search Record" button or click refresh to cancel </td>
                </tr>
                <tr v-if="!loading && students.length > 0" v-for="student in students">
                  <td>{{ student.matriculation_number }}</td>
                  <td>{{ student.firstname }} {{ student.lastname }}</td>
                  <td>{{ student.amount }}</td>
                  <td>{{ student.transaction_reference }}</td>
                  <td>{{ student.serial_no }}</td>
                  <td>{{ $moment(student.updated_at).format('MMMM Do YYYY') }}</td>
                  <td>
                    <div class="btn-group">
                      <button v-if="student.status == 1"  @click="printReceipt(student.transaction_reference)" type="button" title="Print Receipt" class="btn btn-success btn-sm" role="button"><i class="fa fa-paypal"></i></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <Pagination
              v-bind:pagination="pagination"
              v-on:click.native="getReparationFee(pagination.current_page)"
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
import config from "~/store/config";

export default {
  layout: 'main',
  components: {
    Pagination
  },
  data: () =>({
    pagination: {
      total: 0,
      per_page: 2,
      from: 1,
      to: 0,
      current_page: 1
    },
    formData: {
      matriculation_number: '',
      transaction_reference_no: '',
      from_date: '',
      to_date: '',
      status: '',
      export: false
    },
    students: [],
    loading: true,
  }),
  methods: {
    async getReparationFee(page) {
      this.formData.page = page
      await this.$store.dispatch('reparation-fee/GetReparationStudents', this.formData)
        .then(res =>{
          this.students = res.data.data.data
          this.pagination = res.data.data
          this.loading = false
        }).catch(err =>{
          this.$toast.error(err)
        })
    },
    async searchReparationFee(page) {
      this.formData.page = page
      this.loading = true
      this.formData.export = false;
      this.students = []
      $('#searchBtn').attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i> Searching...');
      await this.$store.dispatch('reparation-fee/GetReparationStudents', this.formData)
        .then(res =>{
          $('#searchBtn').attr('disabled', false).html('<i class="fa fa-search"></i>&nbsp; Search Record');
          this.students = res.data.data.data
          this.pagination = res.data.data
          this.loading = false
        }).catch(err =>{
          $('#searchBtn').attr('disabled', false).html('<i class="fa fa-search"></i>&nbsp; Search Record');
          this.loading = false
          this.$toast.error(err)
        })
    },
    async refreshRecord() {
      this.formData = {
        matriculation_number: '',
        transaction_reference_no: '',
        from_date: '',
        to_date: '',
        status: '',
        export: false
      }
      await this.getReparationFee(this.pagination.current_page)
    },
    printReceipt(transaction_reference_no) {
      const url = config.backend + 'reparation/print-receipt?transaction_ref=' + transaction_reference_no
      window.open(url, '_blank');
    },
    exportRecord() {
      $('#exportBtn').attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i> Exporting...');
      this.formData.export = true
      this.$store.dispatch('reparation-fee/ExportReparationFee', this.formData)
        .then(res =>{
          $('#exportBtn').attr('disabled', false).html('<i class="fa fa-file-excel-o"></i>&nbsp; Export to Excel');
          let fileURL = window.URL.createObjectURL(new Blob([res.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}));
          let fileLink = document.createElement('a');
          fileLink.href = fileURL;
          fileLink.setAttribute('download', 'reparation-fee-report.xlsx');
          document.body.appendChild(fileLink);
          fileLink.click();
          this.$toast.success('Record Exported to Excel Successfully!', { icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true });
        }).catch(err =>{
          $('#exportBtn').attr('disabled', false).html('<i class="fa fa-file-excel-o"></i>&nbsp; Export to Excel');
          this.$toast.error(err)
        })
    },
  },
  mounted() {
    this.getReparationFee();
  }
}
</script>
