<template>

        <div class="content sm-gutter">
        <!-- START BREADCRUMBS -->
            <div class="bg-white">
                <div class="container p-l-5">
                    <ol class="breadcrumb breadcrumb-alt">
                        <li class="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                        <li class="breadcrumb-item"><a href="#">Reports</a></li>
                        <li class="breadcrumb-item active">Student SSCE Results</li>
                    </ol>
                </div>
            </div>
            <!-- END BREADCRUMBS -->




            <!-- START CONTAINER FLUID -->
            <div class="container sm-padding-10 p-t-20 p-b-20">
              <div class="card card-default">
                <div class="card-header">
                  <div class="card-title text-primary">Search Options</div>
                </div>
                <div class="card-body">
                  <form style="width: 100%">
                    <div class="row">
                      <div class="col-md-4">
                        <label>Reg Num:</label>
                        <input type="text" class="form-control" placeholder="Reg Number" required />
                      </div>
                      <div class="col-md-4">
                        <label>From Date:</label>
                        <input type="date" class="form-control" required />
                      </div>
                      <div class="col-md-4">
                        <label>To Date:</label>
                        <input type="date" class="form-control" required />
                      </div>
                    </div>
                    <div class="row m-t-5">
                      <div class="col-md-4">
                        <label>College:</label>
                        <select class="form-control">
                          <option value="" selected>-Select-</option>
                        </select>
                      </div>
                      <div class="col-md-4">
                        <label>Department:</label>
                        <select class="form-control">
                          <option value="" selected>-Select-</option>
                        </select>
                      </div>
                      <div class="col-md-4">
                        <label>Exam Type:</label>
                        <select class="form-control">
                          <option value="" selected>-Select-</option>
                          <option value="waec">WAEC</option>
                          <option value="neco">NECO</option>
                          <option value="nabteb">NABTEB</option>
                        </select>
                      </div>
                    </div>
                    <div class="row m-t-5">
                      <div class="col-md-4">
                        <label>Select Year</label>
                        <select class="form-control" required v-model="model.export_year">
                          <option value="" selected>Select your option</option>
                          <option  value="2019">Year --- 2019/2020</option>
                          <option  value="2020">Year --- 2020/2021</option>
                          <option  value="2021">Year --- 2021/2022</option>
                          <option  value="2022">Year --- 2022/2023</option>
                          <option  value="2023">Year --- 2023/2014</option>
                        </select>
                      </div>
                      <div class="col-md-2 m-t-30">
                        <button type="button" class="btn btn-primary btn-block">
                          <i class="fa fa-search" />&nbsp;Search Record
                        </button>
                      </div>
                      <div class="col-md-2 m-t-30">
                        <button type="button" v-if="!exportLoading"  @click="exportStudentSSCEs()" class="btn btn-danger btn-block">
                          <i class="fa fa-file-excel-o" />&nbsp;Export to csv
                        </button>
                        <button type="button" disabled v-if="exportLoading" class="btn btn-primary btn-block">Downloading</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div class="card card-default">
                  <div class="card-header  separator">
                      <h3 class="text-primary no-margin p-b-10">List of SSCE/ OLevel students</h3>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-striped table-condensed" id="basicTable">
                        <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Reg No.</th>
                          <th>Gender</th>
                          <th>Status</th>
                          <th>Verified on</th>
                          <th style="width:10%">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <td>Chinedu Rowland</td>
                          <td>RTYS7892</td>
                          <td>YU78sa</td>
                          <td>Chinedu Rowland</td>
                          <td>15/08/2020</td>
                          <td>PUTME</td>
                          <td>
                            <div class="btn-group">
                              <span data-placement="top" data-toggle="tooltip" title="View WAEC Details">
                                <a href="#view_jamb_result" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-eye"></i></a>
                              </span>
                            </div>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                      <Pagination
                        v-bind:pagination="pagination"
                        v-on:click.native="getSsceResult(pagination.current_page)"
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
  data() {
      return {
        pagination: {
          total: 0,
          per_page: 2,
          from: 1,
          to: 0,
          current_page: 1
        },
        downloading: false,
        loading: false,
        deleteLoading: false,
        exportLoading: false,
        academic_sessions: [],
        departments: [],
        importResponse: {},
        programs: [],
        file: "",
        colleges: [],
        admission_categories: [],

        model: {
          export_year:""
        },
      }
    },
    methods: {
      getSsceResult() {

      },
      exportStudentSSCEs(){
        this.exportLoading = true
        this.$store
          .dispatch('get-started/exportSSCEResults', this.model.export_year)
          .then(res => {
            if(res){
              this.exportLoading = false
              this.$toast.success('Records exported to excel successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
            }else{
              this.exportLoading = false
              alert("File Downloaded Unsuccessful")
            }
        }).catch(err => {
          this.exportLoading = false
          alert("File Downloaded Unsuccessful")
        })
      }
    },
   mounted: function() {
      if (!process.server) {
        const script1 = document.createElement('script')
        script1.type = 'text/javascript'
        script1.src = '/pages/js/pages.min.js'

        document.head.appendChild(script1)
      }

    }
}
</script>
