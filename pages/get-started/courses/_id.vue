<template>
    <div>
        <!-- Course Lecturers -->
        <div class="modal fade SlideUp" id="view_lecturer" tabindex="-1" role="dialog" aria-hidden="true">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                <i class="pg-close"></i>
            </button>
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="text-left p-b-5"><span class="semi-bold">ABF 202 Lecturer(s)</span></h5>
                    </div>
                    <div class="modal-body">
                        <table class="table table-striped table-condensed" id="basicTable">
                            <tbody>
                                <tr>
                                    <td>Lecturer 1</td>
                                    <td>Benejamin Chindedu Okeleke</td>
                                </tr>
                                <tr>
                                    <td>Lecturer 2</td>
                                    <td>Caroline Uche</td>
                                </tr>
                                <tr>
                                    <td>Lecturer 3</td>
                                    <td>Chinyere Ebirika</td>
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
                                            <input type="text" placeholder="Registration Number" class="form-control" id="icon-filter" name="icon-filter">
                                        </div>
                                        <div class="col-lg-4">
                                            <label>Semester</label>
                                            <select class="form-control">
                                                <option value="BAE">B.Sc. Agricultural Education</option>
                                                <option value="CND">CEC - National Diploma</option>
                                                <option value="CPD">CEC - Pre-Degree</option>
                                            </select>
                                        </div>
                                        <div class="col-lg-4">
                                            <label>Entry Mode</label>
                                            <select class="form-control">
                                                <option value="BAE">B.Sc. Agricultural Education</option>
                                                <option value="CND">CEC - National Diploma</option>
                                                <option value="CPD">CEC - Pre-Degree</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-lg-2 m-t-30 m-b-10">
                                    <button type="button" class="btn btn-primary btn-block m-t-15"><i class="fa fa-search"></i> Search Record</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="card card-default">
                    <div class="card-header  separator">
                        <h3 class="text-primary no-margin pull-left sm-pull-reset">Courses</h3>
                        <div class="pull-right sm-pull-reset">
                            <nuxt-link to="/get-started/courses/add_course" class="btn btn-primary btn-sm"><i class="fa fa-plus"></i> &nbsp; <strong>Add New Course</strong></nuxt-link>
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
                                    <tr>
                                        <td>AgricBusiness Finance</td>
                                        <td>ABF 202</td>
                                        <td>2</td>
                                        <td>3</td>
                                        <td>Yes</td>
                                        <td>
                                            <span class="label label-success">Active</span>
                                        </td>
                                        <td>
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-default btn-sm" data-target="#view_lecturer" data-toggle="modal"><span data-toggle="tooltip" data-placement="top" title="View Lecturer"><i class="fa fa-eye"></i></span></button>
                                                <button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-placement="top" title="Edit Record"><i class="fa fa-pencil"></i></button>
                                                <button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-placement="top" title="Delete Record"><span ><i class="fa fa-trash"></i></span></button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Crop Science</td>
                                        <td>CPS 203</td>
                                        <td>2</td>
                                        <td>2</td>
                                        <td>No</td>
                                        <td>
                                            <span class="label label-danger">Inactive</span>
                                        </td>
                                        <td>
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-default btn-sm" data-target="#view_lecturer" data-toggle="modal"><span data-toggle="tooltip" data-placement="top" title="View Lecturer"><i class="fa fa-eye"></i></span></button>
                                                <button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-placement="top" title="Edit Record"><i class="fa fa-pencil"></i></button>
                                                <button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-placement="top" title="Delete Record"><span ><i class="fa fa-trash"></i></span></button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <ul class="pagination m-t-20">
                                <li class="page-item disabled">
                                    <a class="page-link" href="#" tabindex="-1">Previous</a>
                                </li>
                                <li class="page-item"><a class="page-link" href="#">1</a></li>
                                <li class="page-item active">
                                    <a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
                                </li>
                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                <li class="page-item">
                                    <a class="page-link" href="#">Next</a>
                                </li>
                            </ul>
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
        IsPermitted: true,
        downloading: false,
        exportLoading: false,
        deleteLoading: false,
        editLoading: false,
        programs: [],
        routeId: 0,
        subRouteId: '',
        file: "",
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
          length_of_study: 4,
          department_status: "",
          edit_prefix: "",
          edit_length_of_study: "",
          edit_status: "",
          edit_department_id: "",
          edit_name: "",
          edit_program_id: "",
          edit_faculty_id: ""
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
            this.getProgramsByDepartmentId(this.pagination.current_page)
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
        this.routeId = (this.$route.params.id).split("_")[0]
    },

    methods:{
        setId(id){
            this.model.id = id
        },
        downloadProgramSampleFile(){
            this.downloading = true
            this.$store
                .dispatch('get-started/downloadProgramSampleFile')
                .then(res => {
                if(res != undefined){
                    if(res.success == true)    {
                        window.location = res.message
                        this.downloading = false
                        $('#upload_o_program').modal('hide').data( 'bs.modal', null )
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
        uploadPrograms(){
            this.loading = true
            this.file = this.$refs.myFiles.files[0];
            let formData = new FormData();
            formData.append('file', this.file);
            this.$store
                .dispatch('get-started/uploadPrograms', formData)
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                        this.loading = false
                        this.getProgramsByDepartmentId()
                        $('#upload_o_department').modal('hide').data( 'bs.modal', null )
                        this.$toast.success(res.message, {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
                    }else{
                        this.loading = false
                        alert("File Upload Unsuccessful")
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
        createProgram(){
            this.loading = true
            let departmentId = (this.$route.params.id).split('_')[1]
            let facultyId = (this.$route.params.id).split('_')[0]
            let bodyFormData = new FormData();
            bodyFormData.set('department_id', departmentId)
            //bodyFormData.set('faculty_id', facultyId)
            bodyFormData.set('name', this.model.name)
            //bodyFormData.set('prefix', this.model.abbreviation)
            bodyFormData.set('duration', this.model.length_of_study)
            bodyFormData.set('status', this.model.status)
            this.$store
            .dispatch('get-started/createProgram', bodyFormData)
            .then(res => {
            if(res != undefined){
                if(res.status == true){
                    this.getProgramsByDepartmentId()
                    this.loading = false
                    $('#add_department').modal('hide').data( 'bs.modal', null )
                    this.model = {}
                }else{
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
        deleteProgram(){
            this.deleteLoading = true
            this.$store
                .dispatch('get-started/deleteProgram', this.model.id)
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                    this.deleteLoading = false
                    this.getProgramsByDepartmentId()
                    $( '#delete_department' ).modal( 'hide' ).data( 'bs.modal', null );
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
        submitEditedProgram(){
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
        exportPrograms(){
            this.exportLoading = true
            this.$store
                .dispatch('get-started/exportPrograms')
                .then(res => {
                if(res != undefined){
                    this.loading = false
                    var fileURL = window.URL.createObjectURL(new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}));
                    var fileLink = document.createElement('a');

                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', 'programs.xlsx');
                    document.body.appendChild(fileLink);

                    fileLink.click();
                    this.exportLoading = false
                    $( '#export_programs' ).modal( 'hide' ).data( 'bs.modal', null )
                    this.$toast.success('Record Exported to Excel Successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
                }else{
                    this.exportLoading = false
                    alert("File Downloaded Unsuccessful")
                }
            }).catch(err => {
            this.exportLoading = false
            })
        },
        getProgramsByDepartmentId(page) {
            if(this.$laravel.hasPermission('View programme')){
            let departmentId = (this.$route.params.id).split("_")[1]
            let payload = {}
            payload.page = page
            payload.departmentId = departmentId
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
