<template>
        <div class="content sm-gutter">
        <!-- START BREADCRUMBS -->
            <div class="bg-white">
                <div class="container p-l-5">
                    <ol class="breadcrumb breadcrumb-alt">
                        <li class="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                        <li class="breadcrumb-item"><a href="#">Exams</a></li>
                        <li class="breadcrumb-item active">UTME Admission List</li>
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
                            <div class="col-md-12">
                                <!-- START card -->
                                <div class="card card-transparent text-center">
                                    <div class="card-header ">
                                        <div class="card-title">UTME STUDENTS ONLY UPLOAD</div>
                                    </div>
                                    <div class="card-body">
                                      <h6 class="semi-bold">1. Admin will get the sample excel file by clicking the Download Sample Excel button.</h6>
                                      <h6 class="semi-bold">2. Fill the excel sheet appropriately, select the necessary options and upload by clicking on the "IMPORT RECORD" button in the "Upload UTME Admission List" section.</h6>
                                      <h6 class="semi-bold">3. Download admission list using the "Download UTME Admission List" section.</h6>
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
                    <div class="col-md-12">
                        <div class="card card-default">
                            <div class="card-header  separator">
                                <h3 class="text-primary no-margin p-b-10">Upload UTME Admission List</h3>
                            </div>
                            <div class="card-body">
                                <form class="p-4" @submit.prevent="uploadPUTMEAdmission">
                                    <div class="row">
                                      <div class="form-group col-md-4">
                                          <label>Select Excel file to upload</label>
                                          <div class="custom-file">
                                              <input type="file" ref="myFiles" class="custom-file-input" id="customFileLang" lang="es" required>
                                              <label class="custom-file-label" for="customFileLang">Select File</label>
                                          </div>
                                      </div>
                                      <div class="form-group col-md-4">
                                        <label>Select Academic Session</label>
                                         <select class="form-control" v-model="model.import_session_id">
                                            <option value="" disabled selected>Select your option</option>
                                            <option v-for="academic_session in academic_sessions" :key="academic_session.id" :value="academic_session.id">{{academic_session.session_name}}</option>
                                        </select>
                                      </div>
                                      <div class="form-group col-md-4">
                                        <label>Select Category</label>
                                        <select class="form-control" required v-model="model.import_category_id">
                                            <option value="" disabled selected>Select your option</option>
                                            <option v-for="category in admission_categories" :key="category.id" :value="category.id">{{category.name}}</option>
                                        </select>
                                      </div>
                                    </div>
                                    <div class="row">
                                      <div class="form-group col-md-6">
                                        <label>Select College</label>
                                        <select class="form-control" v-model="model.import_faculty_id" required @change="populateDepartment($event)">
                                            <option value="" disabled selected>Select your option</option>
                                            <option v-for="college in colleges" :key="college.id" :value="college.id">
                                              {{college.name}}
                                            </option>
                                        </select>
                                      </div>
                                      <div class="form-group col-md-6">
                                        <label>Select Department</label>
                                        <select class="form-control" required @change="populatePrograms($event)" v-model="model.import_department_id">
                                            <option value="" disabled selected>Select your option</option>
                                            <option v-for="department in departments" :key="department.id" :value="department.id">
                                              {{department.name}}
                                            </option>
                                        </select>
                                      </div>
                                      <div class="form-group col-md-6">
                                        <label>Select Programme</label>
                                        <select class="form-control" required v-model="model.import_program_id">
                                            <option value="" disabled selected>Select your option</option>
                                            <option v-for="program in programs" :key="program.id" :value="program.id">{{program.name}}</option>
                                        </select>
                                      </div>
                                      <div class="form-group col-md-6">
                                        <label>Overwrite existing list</label>
                                        <select class="form-control" required v-model="model.import_overwrite">
                                            <option value="" disabled selected>Select your option</option>
                                            <option value="1">YES</option>
                                            <option value="0">NO</option>
                                        </select>
                                      </div>
                                    </div>
                                    <div class="row">
                                      <div class="col-md-12">
                                        <hr/>
                                        <button type="button" class="pull-right sm-pull-reset btn btn-default m-t-5 m-r-10" v-if="!downloading" @click="downloadUTMEAdmissionSampleFile()"><i class="fa fa-arrow-down"></i> &nbsp; Download Sample Excel</button>
                                        <button disabled v-if="downloading" class="pull-right sm-pull-reset btn btn-default m-t-5 m-r-10"><i class="fa fa-arrow-down"></i>&nbsp; Downloading</button>

                                        <button type="submit" v-if="!loading"  class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Import Record</button>
                                        <button type="button"  disabled v-if="loading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Uploading</button>
                                      </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="card card-default">
                            <div class="card-header  separator">
                                <h3 class="text-primary no-margin p-b-10">Download UTME Admission List</h3>
                            </div>
                            <div class="card-body">
                                <form class="p-4">
                                    <div class="row">
                                      <div class="form-group col-md-6">
                                          <label>Select Academic Session</label>
                                           <select class="form-control" v-model="exportData.session_id">
                                                <option value="" disabled selected>All</option>
                                                <option v-for="academic_session in academic_sessions" :key="academic_session.id" :value="academic_session.id">{{academic_session.session_name}}</option>
                                            </select>
                                      </div>
                                     <div class="form-group col-md-6">
                                        <label>Select College</label>
                                        <select class="form-control" v-model="exportData.college_id" required @change="populateDownloadDepartment($event)">
                                            <option value="" disabled selected>All</option>
                                            <option v-for="college in colleges" :key="college.id" :value="college.id">
                                              {{college.name}}
                                            </option>
                                        </select>
                                      </div>
                                      <div class="form-group col-md-6">
                                          <label>Select Department</label>
                                          <select class="form-control" required v-model="exportData.department_id">
                                            <option value="" disabled selected>All</option>
                                            <option v-for="department in downloadDepartments" :key="department.id" :value="department.id">
                                              {{department.name}}
                                            </option>
                                        </select>
                                      </div>
                                      <div class="form-group col-md-6">
                                          <label>Select Category</label>
                                          <select class="form-control" required v-model="exportData.category_id">
                                              <option value="" selected>All</option>
                                              <option v-for="category in admission_categories" :key="category.id" :value="category.id">{{category.name}}</option>
                                          </select>
                                      </div>
                                    </div>
                                    <div class="row">
                                      <div class="col-md-12">
                                        <hr/>
                                        <button type="button" v-if="!exportLoading"  @click="exportUTMEs()" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Download Excel</button>
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
        downloadDepartments: [],
        model: {
          name: "",
          import_session_id: "",
          import_category_id: "",
          overwrite: "",
          import_overwrite: "",
          import_program_id: "",
          import_department_id:"",
          import_faculty_id: ''
        },
        exportData: {
          session_id: '',
          college_id: '',
          department_id: '',
          category_id: ''
        }
      }
    },
    methods: {
        exportUTMEs(){
            this.exportLoading = true
            this.$store
                .dispatch('get-started/exportAdmissionList', this.exportData)
                .then(res => {
                    if(res){
                      this.exportLoading = false
                      let fileURL = window.URL.createObjectURL(new Blob([res.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}));
                      let fileLink = document.createElement('a');
                      fileLink.href = fileURL;
                      fileLink.setAttribute('download', 'post-utme-admission-list-report.xlsx');
                      document.body.appendChild(fileLink);
                      fileLink.click();
                      this.exportLoading = false
                      this.$toast.success('Records exported to excel successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
                    }else{
                        this.exportLoading = false
                        this.$toast.error('An error occurred and file was not downloaded.')
                    }
            }).catch(err => {
              this.exportLoading = false
            })
        },
        populateDepartment(e) {
          let id = e.target.value
          this.$store.dispatch('departments/getDeptByColledId', id)
            .then(res =>{
              this.departments = res.data.data
            }).catch(err =>{
              this.$toast.error(err)
            })
        },
        populateDownloadDepartment(e) {
          let id = e.target.value
          this.$store.dispatch('departments/getDeptByColledId', id)
            .then(res =>{
              this.downloadDepartments = res.data.data
            }).catch(err =>{
              this.$toast.error(err)
            })
        },
        populatePrograms(event){
          let id = event.target.value
          this.$store.dispatch('programs/getProgByDeptId', id)
            .then(res =>{
              this.programs = res.data.data
            }).catch(err =>{
              this.$toast.error(err)
            })
        },
        downloadUTMEAdmissionSampleFile(){
          this.downloading = true
          this.$store
              .dispatch('get-started/downloadUTMEAdmissionSampleFile')
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
        uploadPUTMEAdmission(){
            this.loading = true
            this.file = this.$refs.myFiles.files[0];
            this.formData = new FormData();
            this.formData.append('file', this.file);
            this.formData.append('session_id', this.model.import_session_id)
            this.formData.append('department_id', this.model.import_department_id)
            this.formData.append('program_id', this.model.import_program_id)
            this.formData.append('faculty_id', this.model.import_faculty_id)
            this.formData.append('admission_category', this.model.import_category_id)
            this.formData.append('overwrite', this.model.import_overwrite)
            this.$store
                .dispatch('get-started/uploadPUTMEAdmission', this.formData)
                .then(res => {

                if(res != undefined){
                    if(res.success == true){
                        this.importResponse = res
                        this.loading = false
                        //this.$toast.success(res.message, {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
                    }else{
                        this.loading = false
                      this.$toast.error(res.message)
                        alert("File Upload Unsuccessful")
                    }
                }else{
                    this.loading = false
                  this.$toast.error(res.message)
                    alert("File Upload Unsuccessful")
                }
            }).catch(err => {
                this.loading = false
                this.$toast.error('An error occurred please contact the administrator' + err)
            })
        },
        getProgramsByDepartmentId(page, id) {
          let payload = {}
          payload.page = page
          payload.departmentId = id
          this.$store
              .dispatch('get-started/getProgramsByDepartmentId', payload)
              .then(res => {
              if(res != undefined){
                  if(res.status == true){
                      this.programs = res.data.data
                      this.pagination = res.data
                      this.getLoading = false
                  }else{
                      this.getLoading = false
                      this.ErrMsg = "Error Processing Request!"
                  }
              }else{
                  this.getLoading = false
                  this.ErrMsg = "Error Processing Request!"
              }
              }).catch(err => {
                  this.getLoading = false
              })
          },
          getAdmissionCategories(){
              this.$store
                  .dispatch('get-started/getAdmissionCategories')
                  .then(res => {
                  if(res != undefined){
                      if(res.status == true){
                          this.admission_categories = res.data
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
          getColleges() {
            this.$store.dispatch('faculties/getAllFacultiesWithoutPagination')
              .then(res =>{
                this.colleges = res.data.data
              }).catch(err =>{
                this.$toast.error(err)
              })
          },
        getAcademicSessions(){
            this.$store
            .dispatch('get-started/getAcademicSessions')
            .then(res => {
            if(res != undefined){
                if(res.status == true){
                    this.academic_sessions = res.data
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
        }
    },
   mounted: function() {
      this.getAcademicSessions()
      this.getAdmissionCategories()
      this.getColleges()

    }
}
</script>
