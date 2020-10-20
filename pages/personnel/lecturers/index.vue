<template>
  <div>
    <div class="content sm-gutter">
      <!-- START BREADCRUMBS -->
      <div class="bg-white">
        <div class="container p-l-5">
          <ol class="breadcrumb breadcrumb-alt">
            <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
            <li class="breadcrumb-item"><a href="#">Personnel</a></li>
            <li class="breadcrumb-item active">Lecturers</li>
          </ol>
        </div>
      </div>
      <!-- END BREADCRUMBS -->

      <!-- START CONTAINER FLUID -->
      <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
        <div class="card card-default">
          <div class="card-header">
            <h3 class="text-primary no-margin pull-left sm-pull-reset">Lecturers</h3>
            <div class="pull-right sm-pull-reset">
              <nuxt-link to="/personnel/lecturers/form/new" class="btn btn-primary btn-sm"><i class="fa fa-plus"></i> &nbsp; <strong>Create New Lecturer</strong></nuxt-link>
            </div>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-striped table-condensed" id="basicTable">
                <thead>
                  <th style="width:30%">Username</th>
                  <th style="width:25%">Name</th>
                  <th style="width:15%">Gender</th>
                  <th style="width:20%">Email</th>
                  <th style="width:20%">Status</th>
                  <th style="width:10%">Action</th>
                </thead>
                <tbody>
                  <template v-if="lecturers.length && !loading">
                    <tr v-for="lecturer in lecturers">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </template>
                  <template v-if="!lecturers.length && !loading">
                    <tr class="text-center" v-if="!lecturers.length && !loading">
                      <td colspan="6">No result found</td>
                    </tr>
                  </template>
                  <template v-if="loading">
                    <tr class="text-center">
                      <td colspan="6">Loading...Please wait!</td>
                    </tr>
                  </template>
                </tbody>
              </table>
              <pagination
                v-bind:pagination="pagination"
                v-on:click.native="getLecturers(pagination.current_page)"
                :offset="4">
              </pagination>
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

export default {
  layout: 'main',
  components: {
    Pagination
  },
  data: () => ({
    loading: true,
    lecturers: [],
    pagination: {
      total: 0,
      per_page: 2,
      from: 1,
      to: 0,
      current_page: 1
    }
  }),
  methods: {
    getLecturers(page) {
      this.loading = false
    }
  },
  mounted() {
    this.getLecturers(this.pagination.current_page)
  }
}
</script>
