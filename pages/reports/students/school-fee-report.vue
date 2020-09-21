<template>
  <div class="content sm-gutter">
    <!-- START BREADCRUMBS -->
    <div class="bg-white">
      <div class="container p-l-5">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
          <li class="breadcrumb-item"><a href="#">Reports</a></li>
          <li class="breadcrumb-item active">School Fees Report</li>
        </ol>
      </div>
    </div>
    <!-- END BREADCRUMBS -->

    <!-- START CONTAINER FLUID -->
    <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
      <div class="card card-default">
        <div class="card-header">
          <div class="card-title text-primary">School Fees Report</div>
        </div>
        <div class="card-body">
            <div class="row">
              <div class="col-md-3">
                <label>Jamb Num:</label>
                <input type="text" v-model="searchData.registration_number" class="form-control" placeholder="Reg Number" required />
              </div>
              <div class="col-md-3">
                <label>Matric Num:</label>
                <input type="text" class="form-control" placeholder="Matric Number" required />
              </div>
              <div class="col-md-3">
                <label>From Date:</label>
                <input type="date" v-model="searchData.from" class="form-control" required />
              </div>
              <div class="col-md-3">
                <label>To Date:</label>
                <input type="date" v-model="searchData.to" class="form-control" required />
              </div>
            </div>
            <div class="row m-t-5">
              <div class="col-md-3">
                <label>College:</label>
                <select class="form-control" @change="getDepartmentByCollege($event)" v-model="searchData.faculty_id">
                  <option value="" selected>All</option>
                  <option v-for="college in colleges" :value="college.id">{{college.name}}</option>
                </select>
              </div>
              <div class="col-md-3">
                <label>Department:</label>
                <select class="form-control" v-model="searchData.department_id">
                  <option value="" selected>All</option>
                  <option v-for="department in departments" :value="department.id">{{department.name}}</option>
                </select>
              </div>
              <div class="col-md-3">
                <label>Entry Mode:</label>
                <select class="form-control" v-model="searchData.entry_mode">
                  <option value="" selected>All</option>
                  <option value="JAMB">PUTME</option>
                  <option value="DE">Direct Entry</option>
                </select>
              </div>
              <div class="col-md-3">
                <label>Payment For:</label>
                <select class="form-control" v-model="searchData.payment_type">
                  <option value="" selected>All</option>
                  <option value="ACCOMMODATION_FEE">Accommodation Fee</option>
                  <option value="ACCEPTANCE_FEE">Acceptance Fee</option>
                  <option value="SCHOOL_FEE">School Fee</option>
                </select>
              </div>
            </div>
            <div class="row m-t-20">
              <div class="col-md-2">
                <button type="button" id="submitBtn" class="btn btn-primary btn-block"><i class="fa fa-search" />&nbsp;Search Record</button>
              </div>
              <div class="col-md-2">
                <button type="submit" id="exportBtn" class="btn btn-danger btn-block"><i class="fa fa-file-excel-o" />&nbsp;Export to Excel</button>
              </div>
            </div>
        </div>
      </div>
      <div class="card card-default">
        <div class="card-header separator">
          <h3 class="text-primary no-margin pull-left sm-pull-reset">School Fees Report</h3>
          <div class="pull-right sm-pull-reset">
            <button type="button" class="btn btn-success btn-sm"><i class="fa fa-refresh"></i>&nbsp; Refresh </button>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-striped table-condensed" id="basicTable">
              <thead>
              <tr>
                <th>Matric No.</th>
                <th>Reg No.</th>
                <th>Name</th>
                <th>Entry Mode</th>
                <th>Payment For</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>RTYS7892</td>
                <td>YU78TYS</td>
                <td>Chinedu Rowland</td>
                <td>PUTME</td>
                <td>School Fees</td>
                <td>
                  <div class="btn-group">
                    <span data-placement="top" data-toggle="tooltip" title="View Details">
                      <a href="#view_jamb_result" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-eye"></i></a>
                    </span>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
            <Pagination
              v-bind:pagination="pagination"
              v-on:click.native="getAllSchoolFees(pagination.current_page)"
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
        to_dt: ''
      },
      pagination: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      students: [],
      colleges: [],
      departments: []
    }
  },
  methods: {
    getAllSchoolFees(page) {
      this.searchData.page = page
      this.$store.dispatch('reports/getTransactionReport', this.formData)
        .then(res =>{
          console.log(res)
        }).catch(err =>{
          this.$toast.error(err)
      })
    },
    getColleges() {
      this.$store.dispatch('utility/getFaculties')
        .then(res =>{
          this.colleges = res.data
        }).catch(err =>{
        this.$toast.error(err)
      })
    },
    getDepartmentByCollege(e) {
      let id = e.target.value
      this.$store.dispatch('utility/getDepartmentByFaculty', id)
        .then(res =>{
          this.departments = res.data
        }).catch(err =>{
        this.$toast.error(err)
      })
    }
  },
  mounted() {
    this.getColleges()
    this.getAllSchoolFees()
  }
}
</script>
