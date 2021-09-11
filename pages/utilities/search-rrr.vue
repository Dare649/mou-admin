<template>
  <div class="content sm-gutter">
    <!-- START BREADCRUMBS -->
    <div class="bg-white">
      <div class="container p-l-5">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
          <li class="breadcrumb-item"><a href="#">Utilities</a></li>
          <li class="breadcrumb-item active">Search</li>
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
          <form style="width: 100%" @submit.prevent="searchRecord">
            <div class="row">
              <div class="col-md-6">
                <label>Reg Num/ CAN/ PAN:</label>
                <input type="text" class="form-control" v-model="formData.jamb_reg_no" placeholder="Reg Number/ PAN/ CAN"/>
              </div>
              <div class="col-md-6">
                <label>From Date:</label>
                <input type="date" v-model="formData.from_date" class="form-control"/>
              </div>
              <div class="col-md-6">
                <label>To Date:</label>
                <input type="date" v-model="formData.to_date" class="form-control"/>
              </div>
              <div class="col-md-6">
                <label>Mode:</label>
                <select @change="resetResult" required class="form-control" v-model="formData.mode">
                  <option value="" selected>All</option>
                  <option value="PUTME">PUTME/ DE</option>
                  <option value="CEC">CEC</option>
                  <option value="PG">PG</option>
                </select>
              </div>
            </div>
            <div class="row m-t-15">
              <div class="col-md-2">
                <button type="submit" id="submitBtn" class="btn btn-primary btn-block"><i class="fa fa-search"></i>&nbsp; Search Record</button>
             </div>
            </div>
          </form>
        </div>
      </div>
      <div class="card card-default">
        <div class="card-header separator">
          <h3 class="text-primary no-margin pull-left sm-pull-reset">Search Results</h3>
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
                  <th>Reg No</th>
                  <th>Full Name</th>
                  <th>RRR</th>
                  <th>Order ID</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Date Paid</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td colspan="8">Loading...please wait</td>
                </tr>
                <tr v-if="!loading && results.length < 1">
                  <td colspan="8">No result at the moment</td>
                </tr>
                <tr v-if="!loading && results.length > 0 && formData.mode === 'PUTME'" v-for="result in results" :key="result.id">
                  <td>{{ result.student.jamb_reg_no }}</td>
                  <td>{{ result.student.result.candidate_name }}</td>
                  <td>{{ result.transaction_reference }}</td>
                  <td>{{ result.payment_reference }}</td>
                  <td>{{ result.amount }}</td>
                  <td>{{ result.type }}</td>
                  <td v-if="result.status === '1'">SUCCESSFUL</td>
                  <td v-if="result.status === '2'">PENDING</td>
                  <td v-if="result.status === '3'">FAILED</td>
                  <td>{{ $moment(result.created_at).format('Y-m-d') }}</td>
                </tr>
                <tr v-if="!loading && results.length > 0 && formData.mode === 'CEC'" v-for="result in results" :key="result.id">
                  <td>{{ result.cec_application_number }}</td>
                  <td>{{ result.student.applicant_name }}</td>
                  <td>{{ result.rrr_code }}</td>
                  <td>{{ result.order_id }}</td>
                  <td>{{ result.amount }}</td>
                  <td>{{ result.description }}</td>
                  <td v-if="result.status === 1">SUCCESSFUL</td>
                  <td v-if="result.status === 0">PENDING</td>
                  <td v-if="result.status === '2'">FAILED</td>
                  <td>{{ $moment(result.created_at).format('d/mm/Y') }}</td>
                </tr>
                <tr v-if="!loading && results.length > 0 && formData.mode === 'PG'" v-for="result in results" :key="result.id">
                  <td>{{ result.pg_application_number }}</td>
                  <td>{{ result.student.first_name }} {{ result.student.last_name }}</td>
                  <td>{{ result.rrr_code }}</td>
                  <td>{{ result.order_id }}</td>
                  <td>{{ result.amount }}</td>
                  <td>{{ result.description }}</td>
                  <td v-if="result.status === 1">SUCCESSFUL</td>
                  <td v-if="result.status === 0">PENDING</td>
                  <td v-if="result.status === 2">FAILED</td>
                  <td>{{ $moment(result.created_at).format('d/mm/Y') }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- END CONTAINER FLUID -->
  </div>
</template>
<script>

export default {
  name: 'search-rrr',
  layout: 'main',
  data: () => ({
    results: [],
    loading: false,
    formData: {
      jamb_reg_no: '',
      mode: '',
      from_date: '',
      to_date: ''
    }
  }),
  methods: {
    resetResult() {
      this.results = []
    },
    searchRecord () {
      this.resetResult()
      $('#submitBtn').attr('disabled', true).html('<i class="fa fa-search"></i>&nbsp; Searching..')
      this.loading = true
      this.$store.dispatch('utility/searchRRR', this.formData)
        .then((res) =>{
          $('#submitBtn').attr('disabled', false).html('<i class="fa fa-search"></i>&nbsp; Search Record')
          if(res.data.status) {
            this.results = res.data.data
            this.loading = false
            return
          }
          this.loading = false
          this.$toast.error(res.data.message)
        }).catch((err) =>{
          this.loading = false
          this.$toast.error('An error occurred')
          $('#submitBtn').attr('disabled', false).html('<i class="fa fa-search"></i>&nbsp; Search Record')
        })
    },
    refresh() {
      this.formData = {
        jamb_reg_no: '',
        mode: '',
        from_date: '',
        to_date: ''
      }
      this.resetResult()
    }
  }
}
</script>
