<template>
  <div class="content sm-gutter">
    <!-- START BREADCRUMBS -->
    <div class="bg-white">
      <div class="container p-l-5">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
          <li class="breadcrumb-item"><a href="#">Reports</a></li>
          <li class="breadcrumb-item active">Payment Transaction Report</li>
        </ol>
      </div>
    </div>
    <!-- END BREADCRUMBS -->

    <!-- START CONTAINER FLUID -->
    <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
      <div class="card card-default">
        <div class="card-header">
          <div class="card-title text-primary">Payment Transaction Report</div>
        </div>
        <div class="card-body">
            <div class="row">
              <div class="col-md-3">
                <label>Registration/ Matriculation Number:</label>
                <input type="text" v-model="formData.jamb_no" class="form-control" placeholder="Reg/ Matric Number" required />
              </div>
              <div class="col-md-3">
                <label>RRR Code:</label>
                <input type="text" v-model="formData.trans_ref" class="form-control" placeholder="RRR Code" required />
              </div>
              <div class="col-md-3">
                <label>From Date:</label>
                <input type="date" v-model="formData.from_dt" class="form-control" required />
              </div>
              <div class="col-md-3">
                <label>To Date:</label>
                <input type="date" v-model="formData.to_dt" class="form-control" required />
              </div>

            </div>
            <div class="row m-t-5">
              <div class="col-md-3">
                <label>College:</label>
                <select class="form-control" @change="getDepartmentByCollege($event)" v-model="formData.faculty_id">
                  <option value="" selected>All</option>
                  <option v-for="college in colleges" :value="college.id">{{college.name}}</option>
                </select>
              </div>
              <div class="col-md-3">
                <label>Department:</label>
                <select class="form-control" v-model="formData.department">
                  <option value="" selected>All</option>
                  <option v-for="department in departments" :value="department.id">{{department.name}}</option>
                </select>
              </div>
              <div class="col-md-3">
                <label>Status:</label>
                <select class="form-control" v-model="formData.status">
                  <option value="" selected>All</option>
                  <option value="2">PENDING</option>
                  <option value="1">SUCCESS</option>
                  <option value="3">FAILED</option>
                </select>
              </div>
              <div class="col-md-3">
                <label>Payment For:</label>
                <select class="form-control" v-model="formData.payment_type">
                  <option value="" selected>All</option>
                  <option value="PUTME_FEE">PUTME FEE</option>
                  <option value="DEVELOPMENT_LEVY">DEVELOPMENT LEVY</option>
                  <option value="ACCOMMODATION_FEE">ACCOMMODATION FEE</option>
                  <option value="ACCEPTANCE_FEE">ACCEPTANCE FEE</option>
                  <option value="SCHOOL_FEE">SCHOOL FEES</option>
                  <option value="SUG_FEE">SUG DUES</option>
                </select>
              </div>
            </div>
            <div class="row m-t-20">

              <div class="col-md-6">
                <button type="submit" @click="exportRecord" id="exportBtn" class="btn btn-danger"><i class="fa fa-file-excel-o" />&nbsp;Export to Excel</button>
              </div>
              <div class="col-md-6 text-right">
                <button type="button" @click="searchRecord" id="submitBtn" class="btn btn-primary"><i class="fa fa-search" />&nbsp;Search Record</button>
              </div>
            </div>
        </div>
      </div>
      <div class="card card-default">
        <div class="card-header separator">
          <h3 class="text-primary no-margin pull-left sm-pull-reset">Payment Transaction Report</h3>
          <div class="pull-right sm-pull-reset">
            <button type="button" @click="refresh" class="btn btn-success btn-sm"><i class="fa fa-refresh"></i>&nbsp; Refresh </button>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-striped table-condensed" id="basicTable">
              <thead>
              <tr>
                <th style="width: 25%;">Name</th>
                <th>Session</th>
                <th style="width: 20%;">Payment For</th>
                <th>Amount</th>
                <th >Date</th>
                <th>Status</th>
                <th style="width: 8%;">Action</th>
              </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td colspan="7">Loading...please wait</td>
                </tr>
                <tr v-if="!loading && Object.keys(payments).length < 1">
                  <td colspan="7">No records at the moment</td>
                </tr>
                <tr v-if="!loading && Object.keys(payments).length > 0" v-for="payment in payments">
                  <td>{{ payment.name }}</td>
                  <td>{{ (payment.session) ? payment.session.session_name : 'N/A' }}</td>
                  <td>{{ payment.description }}</td>
                  <td>{{ payment.amount }}</td>
                  <td>{{ $moment(payment.created_at).format('DD-MM-YYYY') }}</td>
                  <td v-if="payment.status === '1'">Successful</td>
                  <td v-if="payment.status === '2'">Pending</td>
                  <td v-if="payment.status === '3'">Failed</td>
                  <td>
                    <div class="btn-group" v-if="payment.status === '1'">
                      <span data-placement="top" data-toggle="tooltip" title="View Receipt">
                        <a href="javascript:;" @click="viewReceipt(payment.transaction_reference)" class="btn btn-default btn-sm" role="button"><i class="fa fa-eye"></i></a>
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <Pagination
              v-bind:pagination="pagination"
              v-on:click.native="getAllTransaction(pagination.current_page)"
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
import config from "@/store/config";

export default {
  layout: 'main',
  components: {
    Pagination
  },
  data() {
    return {
      loading: true,
      searchData: {
        registration_number: '',
        faculty_id: '',
        department_id: '',
        payment_type: '',
        year: '',
        status: '',
        from: '',
        entry_mode: '',
        to: '',
        export: false
      },
      formData: {
        trans_ref: '',
        jamb_no: '',
        department: '',
        payment_type: '',
        from_dt : '',
        to_dt: '',
        status: '',
        entry_mode: '',
        faculty_id: '',
        export: false
      },
      pagination: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      payments: [],
      colleges: [],
      departments: []
    }
  },
  methods: {
    getAllTransaction(page) {
      this.formData.page = page
      this.payments = []
      this.$store.dispatch('reports/getTransactionReport', this.formData)
        .then(res =>{
          this.payments = res.data.data.data
          this.pagination = res.data.data
          this.loading = false
        }).catch(err =>{
          this.loading = false
          this.$toast.error(err)
      })
    },
    viewReceipt(ref) {
      let url = config.backend + 'reports/payment-receipt/' + ref
      window.open(url, '_blank')
    },
    searchRecord() {
      this.formData.page = 1
      this.formData.export = false;

      this.loading = true
      this.payments = [];
      if(this.formData.from != '' && this.formData.to == '') this.formData.to = this.formData.from;

      $('#submitBtn').attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i> &nbsp; Searching...');
      this.$store.dispatch('reports/getTransactionReport', this.formData)
        .then(res =>{
          $('#submitBtn').attr('disabled', false).html('<i class="fa fa-search" />&nbsp;Search Record');
          this.payments = res.data.data.data
          this.pagination = res.data.data
          this.loading = false
        }).catch(err =>{
        $('#submitBtn').attr('disabled', false).html('<i class="fa fa-search" />&nbsp;Search Record');
        this.loading = false
        this.$toast.error(err)
      })
    },
    exportRecord() {
      if(this.formData.from_dt != '' && this.formData.to_dt == '') this.formData.to_dt = this.formData.from_dt;

      if (this.formData.from != '' && !this.validateDateInterval(this.formData.from_dt, this.formData.to_dt)) {
        this.$swal({
            icon: 'error',
            title: 'Date interval cannot be more than 31 days',
            showConfirmButton: true,
          })
        return false;
      }
      $('#exportBtn').attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i> Exporting...');
      this.formData.export = true;

      this.$store.dispatch('reports/exportTransactionReport', this.formData)
        .then(res =>{
          $('#exportBtn').attr('disabled', false).html('<i class="fa fa-file-excel-o"></i>&nbsp; Export');
          let fileURL = window.URL.createObjectURL(new Blob([res.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}));
          let fileLink = document.createElement('a');
          fileLink.href = fileURL;
          fileLink.setAttribute('download', 'payment-transaction-report.xlsx');
          document.body.appendChild(fileLink);
          fileLink.click();
          this.exLoading = false
          this.$toast.success('Record Exported to Excel Successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
        }).catch(err =>{
          $('#exportBtn').attr('disabled', false).html('<i class="fa fa-file-excel-o"></i>&nbsp; Export');
          this.$toast.error(err)
      })
    },
    refresh() {
      this.formData = {
        trans_ref: '',
        jamb_no: '',
        department: '',
        payment_type: '',
        from_dt: '',
        to_dt: '',
        status: '',
        entry_mode: '',
        faculty_id: '',
        export: false
      }
      this.getAllTransaction(1)
    },
    getColleges() {
      this.$store.dispatch('utility/getFaculties')
        .then(res =>{
          this.colleges = res.data
        }).catch(err =>{
        this.$toast.error(err)
      })
    },
    validateDateInterval(from, to) {
      const a = this.$moment(to);
      const b = this.$moment(from);
      const diff = a.diff(b, 'days');
      if(diff > 31) {
        return false;
      } else {
        return true;
      }
    },
    getDepartmentByCollege(e) {
      let id = e.target.value
      if (id) {
        this.$store.dispatch('utility/getDepartmentByFaculty', id)
          .then(res =>{
            this.departments = res.data
          }).catch(err =>{
          this.$toast.error(err)
        })
      } else {
        this.formData.department = '';
      }
    }
  },
  mounted() {
    this.getColleges()
    this.getAllTransaction(1)
  }
}
</script>
