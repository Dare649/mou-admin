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

            <!-- START JUMBOTRON -->
            <div class="jumbotron" data-pages="parallax" data-scroll-element=".page-container">
                <div class=" container p-l-0 p-r-0   container-fixed-lg sm-p-l-0 sm-p-r-0">
                    <div class="inner">
                        <!-- START BREADCRUMB -->
                        <div class="row">
                            <div class="col-md-10 offset-md-1">
                                <!-- START card -->
                                <div class="card card-transparent text-center">
                                    <div class="card-header ">
                                        <div class="card-title">STUDENTS SSCE RESULTS DOWNLOAD</div>
                                    </div>
                                    <div class="card-body">
                                        <h6 class="semi-bold">1. Download students SSCE results list using the "Download Prefilled CSV File" section.</h6>
                                    </div>
                                </div>
                                <!-- END card -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END JUMBOTRON -->
           

            <!-- START CONTAINER FLUID -->
            <div class="container sm-padding-10 p-t-20 p-b-20">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card card-default">
                            <div class="card-header  separator">
                                <h3 class="text-primary no-margin p-b-10">Download Student SSCE Results List</h3>
                            </div>
                            <div class="card-body">
                                <form class="p-4">
                                    <div class="row">
                                      <div class="form-group col-md-10">
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
                                    </div>
                                    <div class="row">
                                      <div class="col-md-12">
                                        <hr/>
                                        <button type="button" v-if="!exportLoading"  @click="exportStudentSSCEs()" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Get CSV</button>
                                        <button type="button" disabled v-if="exportLoading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Downloading</button>
                                      </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END CONTAINER FLUID -->
        </div>

</template>
<script>
export default {
  layout: 'main',
  data() {
      return {
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
