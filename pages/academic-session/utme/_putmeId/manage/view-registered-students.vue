<template>
  <div class="content sm-gutter">
      <!-- START BREADCRUMBS -->
      <div class="bg-white">
          <div class="container p-l-5">
              <ol class="breadcrumb breadcrumb-alt">
                  <li class="breadcrumb-item"><a href="index.php">Dashboard</a></li>
                  <li class="breadcrumb-item"><nuxt-link to="/academic-session/utme">Academic Session</nuxt-link></li>
                  <li class="breadcrumb-item"><nuxt-link :to="`/academic-session/utme/${id}`">PUTME Options</nuxt-link></li>
                  <li class="breadcrumb-item active">Registered students</li>
              </ol>
          </div>
      </div>
      <!-- END BREADCRUMBS -->

      <!-- START CONTAINER FLUID -->
      <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
          <div class="card card-default">
              <div class="card-header">
                  <h3 class="text-primary no-margin pull-left sm-pull-reset">PUTME Registered Students</h3>
                  <div class="pull-right sm-pull-reset">
                      <a href="/api/putme-sessions/post-utme-result/download-sample" class="btn btn-primary btn-sm"><i class="fa fa-plus"></i> &nbsp; <strong></strong></a>
                      <button type="button" class="btn btn-primary btn-sm" data-target="#download_csv" data-toggle="modal"><i class="fa fa-plus"></i> &nbsp; <strong>Download CSV</strong></button>
                      <button type="button" class="btn btn-warning btn-sm" data-target="#upload_csv" data-toggle="modal"><i class="fa fa-arrow-up"></i> &nbsp; <strong>Upload CSV</strong></button>
                  </div>
                  <div class="clearfix"></div>
              </div>
              <div class="card-body">
                  <div class="table-responsive">
                      <table class="table table-striped table-condensed" id="basicTable">
                          <thead>
                            <th>Reg No</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Payment Mode</th>
                            <th>Reference</th>
                            <th>Amount</th>
                            <th>Payment Status</th>
                          </thead>
                          <tbody>
                            <tr v-if="loading" class="text-center"><td colspan="7">Loading....please wait</td></tr>
                            <tr v-if="!loading && students.length < 1" class="text-center"><td colspan="7">No records to be displayed</td></tr>
                            <tr v-else v-for="student in students">
                              <td>{{ student.jambResult.registration_number }}</td>
                              <td>{{ student.jambResult.name }}</td>
                              <td>{{ student.jambResult.sex }}</td>
                              <td>{{ student.mop }}</td>
                              <td>{{ student.transaction_reference }}</td>
                              <td>{{ student.amount }}</td>
                              <td>{{ student.status }}</td>
                            </tr>
                          </tbody>
                      </table>
                      <pagination
                          v-bind:pagination="pagination"
                          v-on:click.native="getRegisteredStudents(pagination.current_page)"
                          :offset="4">
                      </pagination>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  layout: 'main',
  data: () =>({
    id: null,
    loading: true,
    students: [],
    formData: {
      year: '2020',
      page: ''
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
    getRegisteredStudents(page) {
      this.formData.page = page
      this.$store.dispatch('putme/getRegisteredStudents', this.formData)
        .then(res =>{
          this.loading = false
          this.students = res.data.data.data
          this.pagination = res.data.data
        }).catch(err =>{
          this.$toast.error(err)
        })
    }
  },
  mounted() {
    this.id = this.$route.params.putmeId;
    this.getRegisteredStudents(this.pagination.current_page)
  }
}
</script>
