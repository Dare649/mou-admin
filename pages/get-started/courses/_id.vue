<template>
    <div>
        <!-- Course Lecturers -->
        <div class="modal fade SlideUp" id="view_lecturer" tabindex="-1" role="dialog" aria-hidden="true">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                <i class="pg-close"></i>
            </button>

            <div class="modal-dialog modal-lg" >

                <div class="modal-content">
                    <div style="text-align:center; font-size:24px;" v-if="lecturerLoading">
                        <i class="fa fa-spinner fa-spin fa-3x fa-fw"  aria-hidden="true"></i>
                    </div>
                    <div class="modal-header" v-if="!lecturerLoading">
                        <h5 class="text-left p-b-5"><span class="semi-bold">{{lecturerModalLabel.course_name+ ' (' + lecturerModalLabel.course_code+')'}} Lecturer(s)</span></h5>
                    </div>
                    <div class="modal-body" v-if="!lecturerLoading">
                        <table class="table table-striped table-condensed" id="basicTable">
                            <tbody>
                                <tr v-for="lecturer in lecturers" :key="lecturer.id">
                                    <td>Lecturer 1</td>
                                    <td>{{lecturer.name}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!-- START PAGE CONTENT -->
        <div class="content sm-gutter">
            <!-- START BREADCRUMBS -->
            <div class="bg-white">
                <div class="container p-l-5">
                    <ol class="breadcrumb breadcrumb-alt">
                        <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
                        <li class="breadcrumb-item">Get Started</li>
                        <li class="breadcrumb-item"><nuxt-link :to="'/get-started/departments/' + routeId" >Departments</nuxt-link></li>
                        <li class="breadcrumb-item active">Programs</li>
                        <li class="breadcrumb-item active">Courses</li>
                    </ol>
                </div>
            </div>
            <!-- END BREADCRUMBS -->
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
            <!-- Upload Faculty Modal -->
            <div class="modal fade SlideUp" id="upload_courses" tabindex="-1" role="dialog" aria-hidden="true">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    <i class="pg-close"></i>
                </button>
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="text-left p-b-5"><span class="semi-bold">Upload Courses</span></h5>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-lg-12 m-b-10">
                                    <label>Level</label>
                                    <select class="form-control" v-model="model.import_level">
                                        <option value="">Select Level</option>
                                        <option :value="level.id" v-for="level in levels" :key="level.id">{{level.name}}</option>
                                    </select>
                                    <span class="alert alert-danger" v-if="err_level_id != ''">{{err_level_id}}</span>
                                    <span class="alert alert-danger" v-if="err_program_id != ''">{{err_program_id}}</span>
                                </div>
                                <div class="col-lg-12 m-b-10">
                                    <div class="custom-file">
                                        <input type="file" ref="myFiles" class="custom-file-input" id="customFileLang" lang="es">
                                        <label class="custom-file-label" for="customFileLang">Select File</label>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <button type="button" @click="uploadCourses" v-if="!loading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Upload Record</button>
                                    <button type="button" disabled v-if="loading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Uploading</button>
                                </div>
                                <div class="col-lg-12 m-t-15">
                                    <div class="dd-placeholder p-1">
                                        <h5 class="pull-left sm-pull-reset"><i class="fa fa-file-excel-o p-l-10"></i> Sample File</h5>
                                        <button v-if="!downloading" @click="downloadCourseSampleFile()" class="pull-right sm-pull-reset btn btn-default m-t-5 m-r-10"><i class="fa fa-arrow-down"></i> &nbsp; Download</button>
                                        <button v-if="downloading" disabled class="pull-right sm-pull-reset btn btn-default m-t-5 m-r-10"><i class="fa fa-arrow-down"></i> &nbsp; Downloading</button>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                        </div>
                    </div>
                    <!-- /.modal-content -->
                </div>
                <!-- /.modal-dialog -->
            </div>

            <!-- START JUMBOTRON -->
            <div class="jumbotron" data-pages="parallax" data-scroll-element=".page-container">
                <div class=" container p-l-0 p-r-0   container-fixed-lg sm-p-l-0 sm-p-r-0">
                    <div class="inner">
                        <!-- START BREADCRUMB -->
                        <div class="row">
                            <div class="col-md-8 offset-md-2">
                                <!-- START card -->
                                <div class="card card-transparent text-center">
                                    <div class="card-header ">
                                        <div class="card-title">Getting started</div>
                                    </div>
                                    <div class="card-body">
                                        <h5 class="semi-bold">
                                            You can manage the courses existing in this university.
                                            Course Fees can also be managed from from link given in options.
                                            In case of elective subjects you need to create a group for elective
                                            subjects and assign that to subjects.
                                        </h5>
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
            <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
                <div class="card card-default">
                    <div class="card-header  separator">
                        <h5 class="text-primary no-margin pull-left sm-pull-reset">Search Course</h5>
                        <div class="clearfix"></div>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="row">
                                <div class="col-lg-10 m-t-15 m-b-10">
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <label>Course Name</label>
                                            <input type="text" placeholder="Course Name" v-model="model.search_course_name" class="form-control" id="icon-filter" name="icon-filter">
                                        </div>
                                        <div class="col-lg-4">
                                            <label>Semester</label>
                                            <select class="form-control" v-model="model.search_semester">
                                                <option value="">Select</option>
                                                <option value="1">1st Semester</option>
                                                <option value="2">2nd Semester</option>
                                            </select>
                                        </div>
                                        <div class="col-lg-4">
                                            <label>Level</label>
                                            <select class="form-control" v-model="model.search_level">
                                                <option value="">Select Level</option>
                                                <option :value="level.id" v-for="level in levels" :key="level.id">{{level.name}}</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-lg-2 m-t-30 m-b-10">
                                    <button type="button" v-if="!searchloading" @click="searchCourse()" class="btn btn-primary btn-block m-t-15"><i class="fa fa-search"></i>&nbsp; Search Record</button>
                                    <button type="button" v-if="searchloading" disabled class="btn btn-primary btn-block m-t-15"><i class="fa fa-search"></i>&nbsp; Searching</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="card card-default">
                    <div class="card-header  separator">
                        <h3 class="text-primary no-margin pull-left sm-pull-reset">Courses</h3>

                        <div class="pull-right sm-pull-reset">
                            <nuxt-link :to="'/get-started/programs/' + routeId" > <button type="button" class="btn btn-primary btn-sm"> <i class="fa fa-step-backward" aria-hidden="true"></i></button>&nbsp;&nbsp;</nuxt-link>
                            <button type="button" class="btn btn-success btn-sm" @click="refresh()"><i class="fa fa-refresh"></i>&nbsp; Refresh </button>
                            <button v-permission="'Upload programme'" type="button" class="btn btn-warning btn-sm" data-target="#upload_courses" data-toggle="modal"><i class="fa fa-arrow-up"></i> &nbsp; <strong>Upload Programs</strong></button>
                            <nuxt-link :to="'/get-started/courses/manage/'+ subRouteId" class="btn btn-primary btn-sm"><i class="fa fa-plus"></i> &nbsp; <strong>Add New Course</strong></nuxt-link>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-condensed" id="basicTable">
                                <thead>
                                    <th>Course Name</th>
                                    <th>Course Code</th>
                                    <th>Semester</th>
                                    <th>Credit Unit</th>
                                    <th>Elective</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </thead>
                                <tbody>
                                    <tr v-if="getLoading">
                                        <td colspan="6">Loading....Please wait.</td>
                                    </tr>
                                    <tr v-if="!getLoading && courses.length < 1">
                                        <td colspan="6">No record at the moment</td>
                                    </tr>
                                    <tr v-for="course in courses" :key="course.id">
                                        <td>{{course.name}}</td>
                                        <td>{{course.code}}</td>
                                        <td>{{course.semester === "1" ? "1st Semester" : "2nd Semester"}}</td>
                                        <td>{{course.weightage}}</td>
                                        <td>{{course.isElective == 1 ? "True" : "False"}}</td>
                                        <td>
                                            <span v-bind:class="{ 'label':true, 'label-success':(course.status == 1), 'label-failure':(course.status == 0)}">{{course.status == 1 ? "Active" : "Inactive"}}</span>
                                        </td>
                                        <td>
                                            <div class="btn-group">
                                                <button type="button" @click="viewLecturers(course)" class="btn btn-default btn-sm" data-target="#view_lecturer" data-toggle="modal"><span data-toggle="tooltip" data-placement="top" title="View Lecturer"><i class="fa fa-eye"></i></span></button>
                                                <nuxt-link type="button" :to="'/get-started/courses/edit/'+ subRouteId+'_'+course.id" class="btn btn-default btn-sm" data-toggle="tooltip" data-placement="top" title="Edit Record"><i class="fa fa-pencil"></i></nuxt-link>
                                                <span v-permission="'Delete programme'" data-placement="top" data-toggle="tooltip" title="Delete Record">
                                                    <a href="#delete_course" @click="setId(course.id)"  class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="pg-trash"></i></a>
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <Pagination
                                v-bind:pagination="pagination"
                                v-on:click.native="viewCoursesUnderProgram(pagination.current_page)"
                                :offset="4">
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END CONTAINER FLUID -->

        </div>
        <!-- Delete Faculty Modal -->
        <div class="modal fade SlideUp" id="delete_course" tabindex="-1" role="dialog" aria-hidden="true">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                <i class="pg-close"></i>
            </button>
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="text-left p-b-5"><span class="semi-bold">Delete Course Information</span></h5>
                    </div>
                    <div class="modal-body">
                        <form class="full-width" @submit.prevent="deleteCourse">
                            <div class="row">
                                <h5 class="text-left p-b-5"><span class="semi-bold">Are you sure you want to delete this record?</span></h5>
                                <div class="col-lg-12 m-t-10">
                                    <button type="submit" v-if="!deleteLoading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Confirm</button>
                                    <button type="submit" v-if="deleteLoading" disabled class="btn btn-primary btn-lg btn-large fs-16 semi-bold"><i class="fa fa-delete"></i>Deleting</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
    </div>
</template>
<script>
import Pagination from '~/components/Pagination'
export default {
    name: "Programs",
    layout: "main",
    middleware: "",
    components: {
        Pagination
    },
    data() {
      return {
        getLoading: true,
        loading: false,
        searchloading: false,
        IsPermitted: true,
        deleteLoading: false,
        downloading: false,
        editLoading: false,
        importResponse: {},
        courses: [],
        levels: [],
        routeId: 0,
        file: "",
        lecturers: [],
        lecturerLoading: false,
        lecturerModalLabel: {},
        subRouteId: '',
        err_level_id: "",
        err_program_id: "",
        pagination: {
          total: 0,
          per_page: 2,
          from: 1,
          to: 0,
          current_page: 1
        },
        model: {
          name: "",
          id: 0,
          status: 1,
          abbreviation: "",
          search_level: "",
          import_level: "",
          search_semester: "",
          search_course_name: ""
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
        if(this.$laravel.hasPermission('View programme')){
            this.viewCoursesUnderProgram(this.pagination.current_page)
        }else{
            this.IsPermitted = false
            this.getLoading = false
            this.$router.push(
                decodeURIComponent(
                  this.$route.query.redirect || "/dashboard"
                )
            );
            this.$toast.error("Not Permitted to access this page! Contact the admin.", { icon: "times" });
        }
        this.subRouteId = this.$route.params.id
        this.routeId = (this.$route.params.id).split('_')[2] + '_' + (this.$route.params.id).split('_')[3]
        this.getLevels()
    },

    methods:{
        downloadCourseSampleFile(){
            this.downloading = true
            this.$store
                .dispatch('get-started/downloadCourseSampleFile')
                .then(res => {
                if(res != undefined){
                    if(res.success == true)    {
                        window.location = res.message
                        this.downloading = false
                        $('#upload_courses').modal('hide').data( 'bs.modal', null )
                        this.$toast.success('Download Successful!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
                    }

                }else{
                    this.downloading = false
                    alert("File Download Unsuccessful")
                }
            }).catch(err => {
            this.downloading = false
            })
        },
        uploadCourses(){
            this.loading = true
            this.file = this.$refs.myFiles.files[0];
            let programId = (this.$route.params.id).split('_')[0]
            let formData = new FormData();
            formData.append('file', this.file);
            formData.append('level_id', this.model.import_level)
            formData.append('program_id', programId)
            this.$store
                .dispatch('get-started/uploadCourses', formData)
                .then(res => {
                if(res != undefined){
                    if(res.success){
                        this.loading = false
                        this.importResponse = res
                        this.viewCoursesUnderProgram(1)
                        $('#upload_courses').modal('hide').data( 'bs.modal', null )
                        this.$toast.success(res.message, {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
                    }else{
                        this.loading = false
                        this.err_level_id = res.response.data.message.level_id
                        this.err_program_id = res.response.data.message.program_id
                        this.ErrMsg = "Error Processing Request!"
                    }
                }else{
                    this.loading = false
                    alert("File Upload Unsuccessful")
                    this.ErrMsg = "Error Processing Request!"
                }
            }).catch(err => {
            this.loading = false
            })
        },
        refresh() {
            this.model.search_level = ""
            this.model.search_semester = ""
            this.model.search_course_name = ""
            this.viewCoursesUnderProgram(1)
        },
        setId(id){
            this.model.id = id
        },
        deleteCourse(){
            this.deleteLoading = true
            this.$store
                .dispatch('get-started/deleteCourse', this.model.id)
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                    this.deleteLoading = false
                    this.viewCoursesUnderProgram(1)
                    $( '#delete_course' ).modal( 'hide' ).data( 'bs.modal', null );
                    this.loading = false
                    }else{
                    this.deleteLoading = false
                    this.loading = false
                    this.ErrMsg = "Error Processing Request!"
                    }
                }else{
                    this.loading = false
                    this.ErrMsg = "Error Processing Request!"
                }

            }).catch(err => {
            this.loading = false
            })
        },
        submitEditedCourse(){
            this.editLoading = true
            let bodyFormData = new Object();
            let payload = {}
            bodyFormData.name = this.model.edit_name
            // bodyFormData.prefix = this.model.edit_prefix
            bodyFormData.status = this.model.edit_status
            bodyFormData.department_id = this.model.edit_department_id
            bodyFormData.duration = this.model.edit_length_of_study
            payload.id = this.model.edit_program_id
            payload.bodyFormData = bodyFormData
            this.$store
            .dispatch('get-started/updateProgram', payload)
            .then(res => {
            if(res != undefined){
                if(res.status == true){
                    this.editLoading = false
                    this.getProgramsByDepartmentId()
                    $('#edit_program').modal('hide').data( 'bs.modal', null )
                    this.$toast.success('Record Edited Successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});

                }else{
                this.editLoading = false
                this.ErrMsg = "Error Processing Request!"
                }
            }else{
                this.loading = false
                this.ErrMsg = "Error Processing Request!"
            }
            }).catch(err => {
                this.loading = false
            })
        },
        populateFields(program){
          this.model.edit_department_id = program.department_id
          this.model.edit_program_id = program.id
          this.model.edit_name = program.name
        //   this.model.edit_prefix = program.prefix
          this.model.edit_length_of_study = program.duration
        //   this.model.edit_faculty_id = program.faculty_id
          this.model.edit_status = program.status
        },
        getLevels(){
            this.$store
                .dispatch('get-started/getLevels', false)
                .then(res => {
                if(res != undefined){
                    if(res.status){
                        this.levels = res.data
                    }
                }
                }).catch(err => {
            })
        },
        searchCourse(){
            this.searchloading = true
            let programId = (this.$route.params.id).split('_')[0]
            let payload = {}
            payload.page = 1
            payload.programId = programId
            payload.code = ""
            payload.course_name = this.model.search_course_name
            payload.semester = this.model.search_semester
            payload.level = this.model.search_level
            this.$store
                .dispatch('get-started/viewCoursesUnderProgram', payload)
                .then(res => {
                if(res != undefined){
                    if(res.success == true){
                        this.courses = res.data.data
                        this.pagination = res.data
                        this.searchloading = false
                    }else{
                        this.searchloading = false
                        this.ErrMsg = "Error Processing Request!"
                    }
                }else{
                    this.searchloading = false
                    this.ErrMsg = "Error Processing Request!"
                }
                }).catch(err => {
                    this.searchloading = false
                })
        },
        viewLecturers(payload){
            this.lecturerModalLabel = {}
            this.lecturers = []
            this.lecturerLoading = true
            this.lecturerModalLabel.course_name = payload.name
            this.lecturerModalLabel.course_code = payload.code
            this.$store
                .dispatch('get-started/viewLecturers', payload.id)
                .then(res => {
                if(res != undefined){
                    if(res.success == true){
                        this.lecturerLoading = false
                        this.lecturers = res.data
                    }else{
                        this.lecturerLoading = false
                        this.ErrMsg = "Error Processing Request!"
                    }
                }else{
                    this.lecturerLoading = false
                    this.ErrMsg = "Error Processing Request!"
                }
                }).catch(err => {
                    this.lecturerLoading = false
            })
        },
        viewCoursesUnderProgram(page) {
            if(this.$laravel.hasPermission('View programme')){
            this.getLoading = true
            let programId = (this.$route.params.id).split('_')[0]
            let payload = {}
            payload.page = page
            payload.programId = programId
            payload.code = ""
            payload.course_name = ""
            payload.semester = ""
            payload.level = ""
            this.$store
                .dispatch('get-started/viewCoursesUnderProgram', payload)
                .then(res => {
                if(res != undefined){
                    if(res.success == true){
                        this.courses = res.data.data
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
                }else{
                    this.IsPermitted = false
                    this.getLoading = false
                }
            },
    }
}
</script>
<style scoped>
    .breadcrumb {
    background-color: #ffffff !important;;
}
</style>
