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
                        <li class="breadcrumb-item active">Add Course</li>
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
            <div class="container sm-padding-10 p-t-20 p-l-10 p-r-10">
                <div class="card card-default">
                    <div class="card-header  separator">
                        <h3 class="text-primary no-margin pull-left sm-pull-reset" v-if="routeId != 0">Add New Course:- {{routeId.split('_')[1]}}</h3>
                        <div class="pull-right sm-pull-reset">
                            <nuxt-link :to="'/get-started/courses/'+routeId" class="btn btn-default btn-sm"><i class="fa fa-arrow-left"></i> &nbsp; <strong>Back to Courses</strong></nuxt-link>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="card-body">
                        <form class="m-t-20" role="form">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group form-group-default required">
                                        <label>Course Name</label>
                                        <input type="text" class="form-control" v-model="model.name" required>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group form-group-default required">
                                        <label>Course Abbreviation</label>
                                        <input type="text" class="form-control" v-model="model.code" required>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group form-group-default required">
                                        <label>Semester</label>
                                        <select class="form-control" data-placeholder="Semester" v-model="model.semester" required>
                                            <option value="">Select</option>
                                            <option value="1">1st Semester</option>
                                            <option value="2">2nd Semester</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group form-group-default required">
                                        <label>Credits (Weightage)</label>
                                        <input type="text" class="form-control" v-model="model.weight_age" required>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group form-group-default required">
                                        <label>Status</label>
                                        <select class="form-control" data-placeholder="Status" v-model="model.status" required>
                                            <option value="">Select</option>
                                            <option value="1">Active</option>
                                            <option value="0">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group form-group-default required">
                                        <label>Mark as Prerequisite Course</label>
                                        <select class="form-control" data-placeholder="Mark as Prerequisite Course" v-model="model.isPrerequisite" required>
                                            <option value="">Select</option>
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group form-group-default required">
                                        <label>Mark as Elective Course</label>
                                        <select class="form-control" data-placeholder="Mark as Elective Course" v-model="model.isElective" required>
                                            <option value="">Select</option>
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group form-group-default required">
                                        <label>Applicable to PGD MASTERS M.A PHIL</label>
                                        <select class="form-control" data-placeholder="Applicable to PGD MASTERS M.A PHIL" v-model="model.isApplicableToPgMscPhil" required>
                                            <option value="">Select</option>
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                    </div>
                                </div>
                                <!-- <div class="col-md-4">
                                    <div class="form-group form-group-default form-group-default-select2 required">
                                        <label>Elective Course Group</label>
                                        <select class="full-width" data-placeholder="Elective Course Group" data-init-plugin="select2">
                                            <option value="AK">Select</option>
                                            <option value="HI">Hawaii</option>
                                        </select>
                                    </div>
                                </div> -->
                                <div class="col-md-4">
                                    <div class="form-group form-group-default required">
                                        <label>Applicable to MSP</label>
                                        <select class="form-control" data-placeholder="Applicable to MSP" v-model="model.isApplicableToMsp" required>
                                            <option value="">Select</option>
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group form-group-default required">
                                        <label>Applicable to POST UTME</label>
                                        <select class="form-control" data-placeholder="Applicable to POST UTME" v-model="model.isApplicableToPutme" required>
                                            <option value="">Select</option>
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group form-group-default required">
                                        <label>Applicable to DE 2nd Year</label>
                                        <select class="form-control" data-placeholder="Applicable to DE 2nd Year" v-model="model.isApplicableToDe_2ndYear" required>
                                            <option value="">Select</option>
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group form-group-default required">
                                        <label>Applicable to BSC</label>
                                        <select class="form-control" data-placeholder="Applicable to BSC" v-model="model.isApplicableToBsc" required>
                                            <option value="">Select</option>
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group form-group-default required">
                                        <label>Applicable to BSC (Direct Entry)</label>
                                        <select class="form-control" data-placeholder="Applicable to BSC (Direct Entry)" v-model="model.isApplicableToBscDe" required>
                                            <option value="">Select</option>
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group form-group-default required">
                                        <label>Applicable to ND</label>
                                        <select class="form-control" data-placeholder="Applicable to ND" v-model="model.isApplicableToNd" required>
                                            <option value="">Select</option>
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group form-group-default required">
                                        <label>Applicable to Pre-Degree</label>
                                        <select class="form-control" data-placeholder="Applicable to Pre-Degree" v-model="model.isApplicableToPreDegree" required>
                                            <option value="">Select</option>
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group form-group-default required">
                                        <label>Applicable to MSC</label>
                                        <select class="form-control" data-placeholder="Applicable to MSC" v-model="model.isApplicableToMsc" required>
                                            <option value="">Select</option>
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group form-group-default required">
                                        <label>Applicable to PHD</label>
                                        <select class="form-control" data-placeholder="Applicable to PHD" v-model="model.isApplicableToPhd" required>
                                            <option value="">Select</option>
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group form-group-default required">
                                        <label>Applicable to PDG</label>
                                        <select class="form-control" data-placeholder="Applicable to PGD" v-model="model.isApplicableToPgd" required>
                                            <option value="">Select</option>
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group form-group-default required">
                                        <label>Applicable to PGD MASTERS M.ED</label>
                                        <select class="form-control" data-placeholder="Applicable to PGD MASTERS M.ED" v-model="model.isApplicableToPgMscEd" required>
                                            <option value="">Select</option>
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group form-group-default required">
                                        <label>Applicable to PGD MASTERS M.ENG</label>
                                        <select class="form-control" data-placeholder="Applicable to PGD MASTERS M.ENG" v-model="model.isApplicableToPgMscEng" required>
                                            <option value="">Select</option>
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group form-group-default required">
                                        <label>Applicable to PGD MASTERS MBA</label>
                                        <select class="form-control" data-placeholder="Applicable to PGD MASTERS MBA" v-model="model.isApplicableToPgMscMba" required>
                                            <option value="">Select</option>
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group form-group-default required">
                                        <label>Level</label>
                                        <select class="form-control" v-model="model.level_id">
                                            <option value= 0>Select Level</option>
                                            <option :value="level.id" v-for="level in levels" :key="level.id">{{level.name}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group form-group-default required">
                                        <label>Program's Specialization</label>
                                        <select class="form-control" v-model="model.level_id">
                                            <option value= 0>Select Program's Specialization</option>
                                            <option :value="level.id" v-for="level in levels" :key="level.id">{{level.name}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4"></div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <h3 class="sub_text">Lecturer</h3>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="row" v-for="(input,k) in inputs" :key="k">
                                        <div class="col-md-5">
                                            <div class="form-group form-group-default required">
                                                <label>Lecturer</label>
                                                <select class="form-control" data-placeholder="Semester" v-model="input.name">
                                                    <option value="">Select Lecturer</option>
                                                    <option v-for="lecturer in lecturers" :key="lecturer.id" :value="lecturer.id"> {{lecturer.name}} </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-5">
                                            <div class="form-group form-group-default required">
                                                <label>Participation %age</label>
                                                <input type="text" v-model="input.party" class="form-control">                                            
                                            </div>
                                        </div>
                                        <div class="col-md-1" v-show="k || ( !k && inputs.length > 1)">
                                            <span @click="remove(k)">
                                                <div class="btn btn-info btn-lg btn-large fs-16 semi-bold btn-block" ><i class="fa fa-minus" ></i></div>                                                
                                            </span>                                                                                                          
                                        </div>
                                        <div class="col-md-1" v-show="k == inputs.length-1 && ( inputs.length < 3)">
                                            <span @click="add(k)">
                                                <div class="btn btn-info btn-lg btn-large fs-16 semi-bold btn-block" ><i class="fa fa-plus"></i></div>  
                                            </span>  
                                        </div>
                                    </div>
                                    
                                   
                                </div>
                                <!-- <div class="col-md-1">
                                    <span >
                                        <div class="btn btn-info btn-lg btn-large fs-16 semi-bold btn-block" ><i class="fa fa-plus"></i></div>
                                    </span>                                    
                                    
                                </div> -->
                            </div>
                            
                        </form>
                    </div>
                    <div class="card-footer">
                        <div class="float-right">
                            <button type="button" class="btn btn-default btn-lg btn-large fs-16 semi-bold">Cancel</button>
                            <button type="button" @click="createCourse()" v-if="!loading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Add Record</button>
                            <button type="button" disabled v-if="loading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Adding</button>
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
        lecturerAddCount: 1,
        IsPermitted: true,
        downloading: false,
        exportLoading: false,
        deleteLoading: false,
        editLoading: false,
        programs: [],
        levels: [],
        routeId: 0,
        subRouteId: '',
        file: "",
        lecturers: [],
        inputs: [{
            name: '',
            party: ''
        }],
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
          status: '',
          program_id: 0,
          code: "",
          level_id: 0,
          semester: "",
          weight_age: "",
          isPrerequisite: "",
          isElective: "",
          electiveGroupId: 0,
          isApplicableToMsp: "",
          isApplicableToPutme: "",
          isApplicableToDe_2ndYear: "",
          isApplicableToBsc: "",
          isApplicableToNd: "",
          isApplicableToPreDegree: "",
          isApplicableToMsc: "",
          isApplicableToPhd: "",
          isApplicableToPgd: "",
          isApplicableToPgMscEd: "",
          isApplicableToPgMscEng: "",
          isApplicableToPgMscMba: "",
          isApplicableToPgMscPhil: "",
          isApplicableToBscDe: ""
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
        // if(this.$laravel.hasPermission('View programme')){
        //     this.getProgramsByDepartmentId(this.pagination.current_page)
        // }else{
        //     this.IsPermitted = false
        //     this.getLoading = false
        //     this.$router.push(
        //         decodeURIComponent(
        //           this.$route.query.redirect || "/dashboard"
        //         )
        //     );
        //     this.$toast.error("Not Permitted to access this page! Contact the admin.", { icon: "times" });
        // }
        // this.subRouteId = this.$route.params.id
        this.getLecturers()
        this.routeId = this.$route.params.id
        this.getLevels()
    },

    methods:{
        add () {
        this.inputs.push({
            name: '',
            party: ''
        })
        },

        remove (index) {
            this.inputs.splice(index, 1)
        },
        setId(id){
            this.model.id = id
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
        createCourse(){
            this.loading = true
            let program_id = (this.$route.params.id).split('_')[0]
            let bodyFormData = new FormData();
            bodyFormData.set('program_id', program_id)
            bodyFormData.set('name', this.model.name)
            bodyFormData.set('code', this.model.code)
            bodyFormData.set('level_id', this.model.level_id)
            bodyFormData.set('semester', this.model.semester)
            bodyFormData.set('weight_age', this.model.weight_age)
            bodyFormData.set('status', this.model.status)
            bodyFormData.set('isPrerequisite', this.model.isPrerequisite)
            bodyFormData.set('isElective', this.model.isElective)
            bodyFormData.set('electiveGroupId', this.model.electiveGroupId)
            bodyFormData.set('isApplicableToMsp', this.model.isApplicableToMsp)
            bodyFormData.set('isApplicableToPutme', this.model.isApplicableToPutme)
            bodyFormData.set('isApplicableToDe_2ndYear', this.model.isApplicableToDe_2ndYear)
            bodyFormData.set('isApplicableToBsc', this.model.isApplicableToBsc)          
            bodyFormData.set('isApplicableToNd', this.model.isApplicableToNd)
            bodyFormData.set('isApplicableToPreDegree', this.model.isApplicableToPreDegree)
            bodyFormData.set('isApplicableToPhd', this.model.isApplicableToPhd)
            bodyFormData.set('isApplicableToPgMscEd', this.model.isApplicableToPgMscEd)
            bodyFormData.set('isApplicableToPgMscEng', this.model.isApplicableToPgMscEng)
            bodyFormData.set('isApplicableToPgMscMba', this.model.isApplicableToPgMscMba)
            bodyFormData.set('isApplicableToPgMscPhil', this.model.isApplicableToPgMscPhil)
            bodyFormData.set('isApplicableToBscDe', this.model.isApplicableToBscDe)
            bodyFormData.set('isApplicableToMsc', this.model.isApplicableToMsc)
            bodyFormData.set('isApplicableToPgd', this.model.isApplicableToPgd)
            
            for(var i = 0; i < this.inputs.length; i++)
            {
                bodyFormData.set('lecturers['+this.inputs[i].name+']', this.inputs[i].party)
            }
            
            this.$store
            .dispatch('get-started/createCourse', bodyFormData)
            .then(res => {
            if(res != undefined){
                if(res.success == true){
                    this.$router.push(
                        decodeURIComponent(
                        this.$route.query.redirect || '/get-started/courses/'+ this.routeId
                        )
                    );
                    this.$toast.success("Record successfully added!", { icon: "times" });
                    this.addloading = false
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
        getLecturers() {
            //if(this.$laravel.hasPermission('View programme')){
            this.$store
                .dispatch('get-started/getLecturers', false)
                .then(res => {
                if(res != undefined){
                    if(res.success == true){
                        this.lecturers = res.data.data
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
                // }else{
                //     this.IsPermitted = false
                //     this.getLoading = false
                // }
        }
    }
}
</script>
<style scoped>
    .breadcrumb {
    background-color: #ffffff !important;;
}
</style>
