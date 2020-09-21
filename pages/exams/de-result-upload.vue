<template>

        <div class="content sm-gutter">
        <!-- START BREADCRUMBS -->
            <div class="bg-white">
                <div class="container p-l-5">
                    <ol class="breadcrumb breadcrumb-alt">
                        <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                        <li class="breadcrumb-item"><a href="#">JAMB</a></li>
                        <li class="breadcrumb-item active">DE Result Upload</li>
                    </ol>
                </div>
            </div>
            <!-- END BREADCRUMBS -->

            <!-- START JUMBOTRON -->
            <div class="jumbotron" data-pages="parallax" data-scroll-element=".page-container" v-permission="'View DE Result'">
                <div class=" container p-l-0 p-r-0   container-fixed-lg sm-p-l-0 sm-p-r-0">
                    <div class="inner">
                        <!-- START BREADCRUMB -->
                        <div class="row">
                            <div class="col-md-10 offset-md-1">
                                <!-- START card -->
                                <div class="card card-transparent text-center">
                                    <div class="card-header ">
                                        <div class="card-title">Process</div>
                                    </div>
                                    <div class="card-body">
                                        <h6 class="semi-bold">1. Admin will first Get CSV from "GET CSV" button in "Download Prefilled CSV File" section.</h6>
                                        <h6 class="semi-bold">2. Import the Jamb Results from "IMPORT" button in "Upload Prefilled CSV File" section.</h6>
                                        <h6 class="semi-bold">3. Admin can check Report to view scores uploaded from "CHECK REPORT" button in "Download Prefilled CSV File" section.</h6>
                                    </div>
                                </div>
                                <!-- END card -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END JUMBOTRON -->
            <!-- Audit Trail -->
            <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0" v-if="importResponse.success">
                <div class="card card-default">
                    <div class="card-body">
                        <div class="alert alert-danger" v-if="importResponse.errors.length > 0">
                            <strong>The Following Errors Occurred:</strong>
                            <p>
                                <ul v-for="item in importResponse.errors" :key="importResponse[item]">
                                    <li>Row: {{item.row}} ---- <span>Attribute: {{item.attribute}}</span> ---- <span >Messages: {{item.message}}</span></li>
                                </ul>
                                <a :href="importResponse.error_file" target="_blank" download>Click here to download error file</a>
                            </p>
                        </div>
                        <div class="alert alert-success">
                            <strong>Audit Trail Performed.</strong>
                            <p>File Successfully Imported. {{importResponse.count}} Records Imported</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- START CONTAINER FLUID -->
            <div class="container sm-padding-10 p-t-20 p-b-20">
                <div class="row">
                    <div class="col-md-6" v-permission="'Download DE result csv'">
                        <div class="card card-default">
                            <div class="card-header  separator">
                                <h3 class="text-primary no-margin p-b-10">Download Prefilled Excel File</h3>
                            </div>
                            <div class="card-body">
                                <form class="p-4">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-group m-b-10">
                                                <label>Select academic session</label>
                                                <select class="form-control" v-model="model.export_session_id">
                                                    <option value="" disabled selected>All</option>
                                                    <option v-for="academic_session in academic_sessions" :key="academic_session.id" :value="academic_session.id">{{academic_session.de_session_name}}</option>
                                                </select>
                                            </div>
                                            <div class="form-group m-b-10">
                                                <label>Select Faculty</label>
                                                <select class="form-control" v-model="model.export_faculty_id" @change="populateDepartments($event)">
                                                    <option value="" selected>All</option>
                                                    <option v-for="faculty in faculties" :key="faculty.id" :value="faculty.id">{{faculty.name}}</option>
                                                </select>
                                            </div>
                                            <div class="form-group m-b-10">
                                                <label>Select Department</label>
                                                <select class="form-control" v-model="model.export_department_id">
                                                    <option value="" selected>All</option>
                                                    <option v-for="department in departments" :key="department.id" :value="department.id">{{department.name}}</option>
                                                </select>
                                            </div>
                                            <div class="m-t-30">
                                                <hr/>
                                                <button type="button" v-if="!exportLoading"  @click="exportPUTMEs()" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Get Excel</button>
                                                <button type="button" disabled v-if="exportLoading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Downloading</button>
                                            </div>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6" v-permission:any="'Upload DE result|Download DE result sample csv'">
                        <div class="card card-default">
                            <div class="card-header  separator">
                                <h3 class="text-primary no-margin p-b-10">Upload Prefilled Excel File</h3>
                            </div>
                            <div class="card-body">
                                <form class="p-4">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-group m-b-10">
                                                <label>Select Excel file to upload</label>
                                                <div class="custom-file">
                                                    <input type="file" ref="myFiles" class="custom-file-input" id="customFileLang" lang="es" required>
                                                    <label class="custom-file-label" for="customFileLang">Select File</label>
                                                </div>
                                            </div>
                                            <div class="form-group m-b-10">
                                                <label>Select academic session</label>
                                                <select class="form-control" v-model="model.session_id" required>
                                                    <option value="" disabled selected>Select your option</option>
                                                    <option v-for="academic_session in academic_sessions" :key="academic_session.id" :value="academic_session.id">{{academic_session.de_session_name}}</option>
                                                </select>
                                            </div>
                                            <div class="form-group m-b-10">
                                                <label>Overwrite existing marks</label>
                                                <select class="form-control" v-model="model.overwrite" required>
                                                    <option value="" disabled selected>Select your option</option>
                                                    <option value="1">YES</option>
                                                    <option value="0">NO</option>
                                                </select>
                                            </div>
                                            <div class="m-t-30">
                                                <hr/>
                                                <button v-permission="'Download sample csv'" v-if="!downloading" @click="downloadDEResultsSampleFile()" class="pull-right sm-pull-reset btn btn-default m-t-5 m-r-10"><i class="fa fa-arrow-down"></i> &nbsp; Download Sample</button>
                                                <button disabled v-if="downloading" class="pull-right sm-pull-reset btn btn-default m-t-5 m-r-10"><i class="fa fa-arrow-down"></i>&nbsp; Downloading</button>

                                                <button v-permission="'Upload DE result'" type="button" @click="uploadDEResults()" v-if="!loading"  class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Import Record</button>
                                                <button type="button"  disabled v-if="loading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Uploading</button>
                                            </div>
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
  name: "Jamb",
  layout: "main",
  middleware: "",
  components: {

  },
  methods: {
      getFaculties(){
            this.$store
                .dispatch('get-started/getAllFaculties')
                .then(res => {
                if(res != undefined){
                    this.faculties = res
                }else{
                    this.getloading = false
                    this.ErrMsg = "Error Fetching data!"
                }
            }).catch(err => {
                this.getloading = false
            })
        },
        getDepartmentsByFacultyId(facultyId) {
            let payload = {}
            payload.facultyId = facultyId
            this.$store
                .dispatch('get-started/getAllDepartmentsByFacultyId', payload)
                .then(res => {
                if(res != undefined){
                    this.departments = res
                }else{
                    this.ErrMsg = "Error Logging in!"
                }
            }).catch(err => {
            })
        },
      downloadDEResultsSampleFile(){
          this.downloading = true
          this.$store
            .dispatch('de-result-upload/downloadDEResultsSampleFile')
            .then(res => {
            if(res != undefined){
                if(res.success == true)    {
                    window.location = res.message
                    this.downloading = false
                    this.$toast.success('Download Successful!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
                }
            }else{
                this.downloading = false
                alert("File Downloaded Unsuccessful")
            }
        }).catch(err => {
          this.downloading = false
        })
      },
      exportPUTMEs(){
          this.exportLoading = true
          var payload = new FormData()
          payload.session_id = this.model.export_session_id
          payload.department_id = this.model.export_department_id
          this.$store
            .dispatch('de-result-upload/exportDEs', payload)
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
        })
      },
      uploadDEResults(){
        this.loading = true
        this.file = this.$refs.myFiles.files[0];
        let formData = new FormData();
        formData.append('file', this.file)
        formData.append('session_id', this.model.session_id)
        formData.append('overwrite', this.model.overwrite)
          this.$store
            .dispatch('de-result-upload/uploadDEResults', formData)
            .then(res => {
            if(res != undefined){
                if(res.success == true){
                    this.importResponse = res
                    this.loading = false
                    //this.$toast.success(res.message, {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
                }else{
                    this.loading = false
                    alert("File Upload Unsuccessful")
                    this.ErrMsg = "Error Logging in!"
                }
            }else{
                this.loading = false
                alert("File Upload Unsuccessful")
                this.ErrMsg = "Error Logging in!"
            }
        }).catch(err => {
          this.loading = false
        })
      },
      populateDepartments(event){
            if(event.target.value !== ""){
                this.getDepartmentsByFacultyId(1, event.target.value)
            }else{
                this.model.export_department_id = ''
                this.departments = []
            }
        },
      getAcademicSessions(){
          this.$store
            .dispatch('de-result-upload/getAcademicSessions')
            .then(res => {
            if(res != undefined){
                if(res.status == true){
                    this.academic_sessions = res.data.data
                    this.getloading = false
                }else{
                    this.getloading = false
                    this.ErrMsg = "Error Fetching data!"
                }
            }else{
                this.getloading = false
                this.ErrMsg = "Error Fetching data!"
            }
            }).catch(err => {
                this.getloading = false
         })
      },
      checkPagePermission(){
          if(!this.$laravel.hasPermission('View DE Result')){
        this.$router.push(
                decodeURIComponent(
                    this.$route.query.redirect || "/dashboard"
                )
            );
            this.$toast.error("Not Permitted to access this page! Contact the admin.", { icon: "times" });
        }else{
                this.getFaculties()
                this.getAcademicSessions()
        }
      }
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
        addloading: false,
        downloading: false,
        importResponse: {},
        loading: false,
        deleteLoading: false,
        editLoading: false,
        exportLoading: false,
        academic_sessions: [],
        faculties: [],
        departments: [],
        file: "",
        model: {
          name: "",
          session_id: "",
          overwrite: "",
          export_department_id: "",
          export_faculty_id: "",
          export_session_id: ""
        },
      }
    },
  mounted: function() {
      if (!process.server) {
        const script1 = document.createElement('script')
        script1.type = 'text/javascript'
        script1.src = '/pages/js/pages.min.js'
        document.head.appendChild(script1)
      }

      this.checkPagePermission()
    }
}
</script>
<style scoped>
.breadcrumb {
    background-color: #ffffff !important;;
}
</style>
