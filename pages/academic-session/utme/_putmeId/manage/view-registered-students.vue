<template>
  <div class="content sm-gutter">
      <!-- START BREADCRUMBS -->
      <div class="bg-white">
          <div class="container p-l-5">
              <ol class="breadcrumb breadcrumb-alt">
                  <li class="breadcrumb-item"><a href="index.php">Dashboard</a></li>
                  <li class="breadcrumb-item"><nuxt-link to="/academic-session/putme">Academic Session</nuxt-link></li>
                  <li class="breadcrumb-item"><nuxt-link :to="`/academic-session/putme/${id}`">PUTME Options</nuxt-link></li>
                  <li class="breadcrumb-item active">Add Student Result</li>
              </ol>
          </div>
      </div>
      <!-- END BREADCRUMBS -->

      <!-- START CONTAINER FLUID -->
      <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
          <div class="card card-default">
              <div class="card-header">
                  <h3 class="text-primary no-margin pull-left sm-pull-reset">Post UTME Result Upload</h3>
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
                          <th style="width:50%">Slip Number</th>
                          <th style="width:30%">Used</th>
                          <th style="width:20%">Action</th>
                          </thead>
                          <tbody>
                          <tr>
                              <td>123345676878909</td>
                              <td>Yes</td>
                              <td>
                                  <div class="btn-group">
                                      <span data-placement="top" data-toggle="tooltip" title="Edit Record">
                                          <a href="#edit_jamb_result" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-pencil"></i></a>
                                      </span>
                                      <button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-placement="top" title="Delete Record"><i class="pg-trash"></i></button>
                                  </div>
                              </td>
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
  }
}
</script>
