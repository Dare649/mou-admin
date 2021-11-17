<template>
  <div class="content sm-gutter">
    <!-- START BREADCRUMBS -->
    <div class="bg-white">
      <div class="container p-l-5">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
          <li class="breadcrumb-item"><a href="#">Utilities</a></li>
          <li class="breadcrumb-item active">Add/ Drop Utility</li>
        </ol>
      </div>
    </div>
    <!-- END BREADCRUMBS -->

    <!-- START CONTAINER FLUID -->
    <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
      <div class="card card-default">
        <div class="card-header">
          <div class="card-title text-primary">Add/ Drop Utility</div>
        </div>
        <div class="card-body">
          <form style="width: 100%" @submit.prevent="getAllStudents(1)">
            <div class="row">
              <div class="col-md-5">
                <input type="text" v-model="formData.jamb_number" class="form-control" placeholder="Jamb Reg Number" />
              </div>
              <div class="col-md-5">
                <input type="text" v-model="formData.matric_number" class="form-control" placeholder="Matriculation Number" />
              </div>
              <div class="col-md-2">
                <button type="submit" id="searchBtn" class="btn btn-primary btn-block">Search Record</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="card card-default">
        <div class="card-header separator">
          <h3 class="text-primary no-margin pull-left sm-pull-reset">Student Details</h3>
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
                <th style="width: 8%;">Image</th>
                <th style="width:22%;">Matric No.</th>
                <th>Reg No.</th>
                <th style="width:25%;">Name</th>
                <th>Phone</th>
                <th style="">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-if="loading"><td colspan="7">Loading...Please wait</td></tr>
              <tr v-if="!loading && students.length < 1"><td colspan="7">No records at the moment</td></tr>
              <tr v-if="!loading && students.length > 0" v-for="student in students">
                <td v-if="student.photo === null || student.photo === ''">
                  <img src="/assets/img/avatar.png" width="50px" height="50px"/>
                </td>
                <td v-else>
                  <img :src="student.photo" width="50px" height="50px" />
                </td>
                <td>{{student.matriculation_number}}</td>
                <td>{{student.jamb_number}}</td>
                <td>{{student.firstname}} {{student.lastname}}</td>
                <td>{{student.phone1}}</td>
                <td>
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
                </td>
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
      page: ''
    },
    pagination: {
      total: 0,
      per_page: 2,
      from: 1,
      to: 0,
      current_page: 1
    },
  }),
  methods: {
    getAllStudents (page) {
      this.students = []
      this.loading = true
      this.formData.page = page
      this.$store.dispatch('student/getAllStudents', this.formData)
        .then(res =>{
          console.log(res.data)
          this.students = res.data.data.data
          this.pagination = res.data.data
          this.loading = false
        }).catch(err =>{
        this.loading = false
        this.$toast.error(err)
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
