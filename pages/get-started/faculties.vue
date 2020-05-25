<template>
    <div>
        <!-- START PAGE CONTENT -->
        <div class="content sm-gutter">
            <!-- START BREADCRUMBS -->
            <div class="bg-white">
                <div class="container p-l-5">
                    <ol class="breadcrumb breadcrumb-alt">
                        <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                        <li class="breadcrumb-item"><a href="#">Get Started</a></li>
                        <li class="breadcrumb-item active">Faculties (JAMB)</li>
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
                                            You can manage the JAMB Faculties existing in the university.
                                        </h5>
                                        <h6 class="semi-bold"><span class="text-primary">NOTE:</span> You are requested to specify Spellings/Abbreviations as the Faculties List provided in JAMB or some other list as this Spellings/Abbreviations will be matched against the JAMB results.</h6>
                                    </div>
                                </div>
                                <!-- END card -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END JUMBOTRON -->

            <!-- Export Countries Modal -->
            <div class="modal fade SlideUp" id="export_faculties" tabindex="-1" role="dialog" aria-hidden="true">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    <i class="pg-close"></i>
                </button>
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="text-left p-b-5"><span class="semi-bold">Export Faculties</span></h5>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-lg-12">
                                    <h6 class="text-left p-b-5"><span class="semi-bold">Click confirm to export all the faculties to an excel file.</span></h6>
                                </div>
                                <div class="col-lg-12">
                                    <button type="button" v-if="!exportLoading"  @click="exportFaculties()" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Confirm</button>
                                    <button type="button" disabled v-if="exportLoading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Downloading</button>
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

            <!-- START CONTAINER FLUID -->
            <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
                <div class="card card-default">
                    <div class="card-header">
                        <h3 class="text-primary no-margin pull-left sm-pull-reset">Faculty Management</h3>
                        <div class="pull-right sm-pull-reset">
                            <button type="button" class="btn btn-primary btn-sm" data-target="#add_o_faculty" data-toggle="modal"><i class="fa fa-plus"></i> &nbsp; <strong>Add New Faculty</strong></button>
                            <button type="button" class="btn btn-warning btn-sm" data-target="#upload_o_faculty" data-toggle="modal"><i class="fa fa-arrow-up"></i> &nbsp; <strong>Upload Faculty</strong></button>
                            <button type="button" class="btn btn-success btn-sm" data-target="#export_faculties" data-toggle="modal"><i class="fa fa-file-excel-o"></i> &nbsp; <strong>Export to Excel</strong></button>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-condensed" id="basicTable">
                                <thead>
                                    <th style="width:20%">Faculty Abbreviation</th>
                                    <th style="width:40%">Faculty Name</th>
                                    <th style="width:20%">Status</th>
                                    <th style="width:20%">Action</th>
                                </thead>
                                <tbody>
                                    <tr v-for="faculty in faculties" :key="faculty.id">
                                        <td>{{faculty.prefix}}</td>
                                        <td>{{faculty.name}}</td>
                                        <td>
                                            <span style="background-color: green; color: white; margin: 5px; padding: 4px;" v-if="faculty.status == 1">Active</span>
                                            <span style="background-color: red; color: white; margin: 5px; padding: 4px;" v-if="faculty.status == 0">Inactive</span>
                                        </td>
                                        <td>
                                            <div class="btn-group">
                                                <span data-placement="top" data-toggle="tooltip" title="Link to Department">
                                                    <nuxt-link :to="'/get-started/departments/' + faculty.id" ><button type="button" class="btn btn-default btn-sm"><i class="fa fa-link"></i></button></nuxt-link>
                                                </span>
                                                <span data-placement="top" @click="populateFields(faculty)" data-toggle="tooltip" title="Edit Record">
                                                    <a href="#edit_faculty"  class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-pencil"></i></a>
                                                </span>
                                                <span data-placement="top" @click="setId(faculty.id)" data-toggle="tooltip" title="Delete Record">
                                                    <a href="#delete_faculty"  class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="pg-trash"></i></a>              
                                                </span>
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
        <!-- Edit Faculty Modal -->
        <div class="modal fade SlideUp" id="edit_faculty" tabindex="-1" role="dialog" aria-hidden="true">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                <i class="pg-close"></i>
            </button>
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="text-left p-b-5"><span class="semi-bold">Edit Faculty Information</span></h5>
                    </div>
                    <div class="modal-body">
                        <form class="full-width" @submit.prevent="submitEditedFaculty">
                            <div class="row">
                                <div class="col-lg-12 m-b-10">
                                    <input type="text" v-model="model.edit_name" placeholder="Faculty Name" class="form-control">
                                </div>
                                <div class="col-lg-12 m-b-10">
                                    <input type="text" placeholder="Prefix" v-model="model.edit_prefix" class="form-control">
                                </div>
                                <div class="col-lg-12 m-b-10">
                                    <input v-model="model.edit_status" type="radio" name="exampleRadios" id="exampleRadios1" value="1" checked>
                                    <label for="exampleRadios1">
                                        Activate Faculty
                                    </label>
                                </div>

                                <div class="col-lg-12 m-b-10">
                                    <input v-model="model.edit_status" type="radio" name="exampleRadios" id="exampleRadios2" value="0">
                                    <label for="exampleRadios2">
                                        Deactivate Faculty
                                    </label>
                                </div>
                                <div class="col-lg-12 m-t-10">
                                    <button type="submit" v-if="!editLoading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Save Changes</button>
                                    <button type="submit" v-if="editLoading" disabled class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Submitting</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>

        <!-- Delete Faculty Modal -->
        <div class="modal fade SlideUp" id="delete_faculty" tabindex="-1" role="dialog" aria-hidden="true">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                <i class="pg-close"></i>
            </button>
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="text-left p-b-5"><span class="semi-bold">Delete Faculty Information</span></h5>
                    </div>
                    <div class="modal-body">
                        <form class="full-width" @submit.prevent="deleteFaculty">
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

        <faculty-form></faculty-form>
        <upload-faculty></upload-faculty>
    </div>
</template>
<script>
import FacultyForm from '../../components/Modals/FacultyFormModal';
import UploadFaculty from '../../components/Modals/UploadFacultyModal';
export default {
    name: "States",
    layout: "main",
    middleware: "",
    components: {
        FacultyForm,
        UploadFaculty
    },
    data() {
      return { 
        addloading: false,
        downloading: false,
        loading: false,
        deleteLoading: false,
        editLoading: false,
        exportLoading: false,
        faculties: [],
        file: "",
        model: {
          id: 0,
          edit_faculty_id: 0,
          edit_prefix: "",
          edit_status: "",
          edit_name: ""
        },
      }
    },
    methods: {
        exportFaculties(){
            this.exportLoading = true
            this.$store
                .dispatch('get-started/exportFaculties')
                .then(res => {
                if(res != undefined){         
                    this.loading = false
                    var fileURL = window.URL.createObjectURL(new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}));
                    var fileLink = document.createElement('a');

                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', 'faculties.xlsx');
                    document.body.appendChild(fileLink);

                    fileLink.click();   
                    this.exportLoading = false 
                    $( '#export_faculties' ).modal( 'hide' ).data( 'bs.modal', null )
                    this.$toast.success('Record Exported to Excel Successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});      
                }else{
                    this.exportLoading = false 
                    alert("File Downloaded Unsuccessful")
                }      
            }).catch(err => {
            this.exportLoading = false 
            })
        },
        setId(id){
          this.model.id = id
        },
        deleteFaculty(){
            this.deleteLoading = true
            this.$store
                .dispatch('get-started/deleteFaculty', this.model.id)
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                    this.deleteLoading = false
                    this.getFaculties()
                    $( '#delete_faculty' ).modal( 'hide' ).data( 'bs.modal', null );  
                    this.loading = false
                    }else{
                    this.deleteLoading = false
                    this.loading = false
                    this.ErrMsg = "Error Logging in!"
                    }
                }else{
                    this.loading = false
                    this.ErrMsg = "Error Logging in!"
                }    
                
            }).catch(err => {
            this.loading = false
            })
        },
        submitEditedFaculty(){
            this.editLoading = true
            let bodyFormData = new Object();
            let payload = {}
                bodyFormData.name = this.model.edit_name    
                bodyFormData.prefix = this.model.edit_prefix
                bodyFormData.status = this.model.edit_status
                payload.id = this.model.edit_faculty_id
                payload.bodyFormData = bodyFormData
            this.$store
            .dispatch('get-started/updateFaculty', payload)
            .then(res => {
            if(res != undefined){
                if(res.status == true){
                    this.editLoading = false
                    this.getFaculties()
                    $('#edit_faculty').modal('hide').data( 'bs.modal', null )          
                    this.$toast.success('Record Edited Successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});  

                }else{
                this.editLoading = false
                this.ErrMsg = "Error Logging in!"
                }
            }else{
                this.loading = false
                this.ErrMsg = "Error Logging in!"
            }      
            }).catch(err => {
                this.loading = false
            })
        },
        populateFields(faculty){
          this.model.edit_faculty_id = faculty.id
          this.model.edit_name = faculty.name
          this.model.edit_prefix = faculty.prefix
          this.model.edit_status = faculty.status
        },
        getFaculties(){
            this.$store
                .dispatch('get-started/getFaculties')
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                        this.getloading = false
                        this.faculties = res.data
                        //console.log(this.countries)
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

    },
    mounted: function() {
        if (!process.server) {
            const script1 = document.createElement('script')       
            script1.type = 'text/javascript'
            script1.src = '/pages/js/pages.min.js'        
            document.head.appendChild(script1)        
        }
        this.getFaculties()
    }
}
</script>
<style scoped>
    .breadcrumb {
    background-color: #ffffff !important;;
}
</style>