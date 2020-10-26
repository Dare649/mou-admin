<template>
  <div>
          <!-- Delete Faculty Modal -->
        <div class="modal fade SlideUp" id="delete_lecturer" tabindex="-1" role="dialog" aria-hidden="true">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                <i class="pg-close"></i>
            </button>
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="text-left p-b-5"><span class="semi-bold">Delete Lecturer Information</span></h5>
                    </div>
                    <div class="modal-body">
                        <form class="full-width" @submit.prevent="deleteLecturer">
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
        <div class="modal fade SlideUp" id="view_lecturer" tabindex="-1" role="dialog" aria-hidden="true">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                <i class="pg-close"></i>
            </button>

            <div class="modal-dialog modal-lg" style="width: 1100px;">

                <div class="modal-content">
                    <div style="text-align:center; font-size:24px;" v-if="lecturerLoading">
                        <i class="fa fa-spinner fa-spin fa-3x fa-fw"  aria-hidden="true"></i>
                    </div>
                    <div class="modal-header" v-if="!lecturerLoading">
                        <!-- <h5 class="text-left p-b-5"><span class="semi-bold">{{lecturerModalLabel.course_name+ ' (' + lecturerModalLabel.course_code+')'}} Lecturer(s)</span></h5> -->
                    </div>

                    <div class="modal-body jamb_view" v-if="!lecturerLoading">
                      <div class="fs-11">USER DETAILS</div>
                        <table class="table table-striped table-bordered">
                            <tr>
                                <th>User Name:</th>
                                <td>{{lecturer.name}}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{{lecturer.email}}</td>
                            </tr>
                            <tr>
                                <th>Full name:</th>
                                <td>{{lecturer.first_name + ' ' + lecturer.last_name}}</td>
                            </tr>
                            <tr>
                                <th>Contact Phone:</th>
                                <td>{{lecturer.phone}}</td>
                            </tr>
                            <tr>
                                <th>Gender:</th>
                                <td>{{lecturer.gender == 'male' ? 'Male' : 'Female'}}</td>
                            </tr>
                            <tr>
                                <th>Address:</th>
                                <td>{{lecturer.address}}</td>
                            </tr>
                            <tr>
                                <th>Marital Status:</th>
                                <td>{{lecturer.marital_status}}</td>
                            </tr>
                            <tr>
                                <th>Role:</th>
                                <td>{{lecturer.role}}</td>
                            </tr>
                            <tr>
                                <th>Status:</th>
                                <td>{{lecturer.status == 1 ? "Active" : "Inactive"}}</td>
                            </tr>
                            </table>

                            <div class="fs-11">NEXT OF KIN INFORMATION</div>
                            <table class="table table-striped table-bordered">
                              <tr v-if="lecturer.kin != null">
                                  <th>Full Name:</th>
                                  <td v-if="lecturer.kin != null">{{lecturer.kin.name}}</td>
                              </tr>
                              <tr v-if="lecturer.kin != null">
                                  <th>Email</th>
                                  <td >{{lecturer.kin.email}}</td>
                              </tr>
                              <tr v-if="lecturer.kin != null">
                                  <th>Contact Phone:</th>
                                  <td>{{lecturer.kin.phone}}</td>
                              </tr>
                              <tr v-if="lecturer.kin != null">
                                  <th>Gender:</th>
                                  <td>{{lecturer.gender == 'male' ? 'Male' : 'Female'}}</td>
                              </tr>
                              <tr v-if="lecturer.kin != null">
                                  <th>Address:</th>
                                  <td>{{lecturer.kin.address}}</td>
                              </tr>
                              <tr v-if="lecturer.kin != null">
                                  <th>Relationship:</th>
                                  <td>{{lecturer.kin.relationship}}</td>
                              </tr>
                            </table>
                            <div class="fs-11">PROFILE</div>
                            <table class="table table-striped table-bordered">
                              <tr v-if="lecturer.profile != null">
                                  <th>User Title:</th>
                                  <td >{{lecturer.profile.title}}</td>
                              </tr>
                              <tr v-if="lecturer.profile != null">
                                  <th>User Rank:</th>
                                  <td>{{lecturer.profile.rank}}</td>
                              </tr>
                              <tr v-if="lecturer.profile != null">
                                  <th>Geo Political Zone:</th>
                                  <td>{{lecturer.profile.geo_political_zone}}</td>
                              </tr>
                            </table>
                            <div class="fs-11">EDUCATIONAL DETAILS</div>
                            <table class="table table-condensed">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Qualification</th>
                                        <th>Institution</th>
                                        <th>Subjects</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    <template v-if="lecturer.profile != null">
                                      <tr v-for="(edu, index) in JSON.parse(lecturer.profile.educational_details)" :key="edu.id">
                                          <td>{{index + 1}}</td>
                                          <td>{{edu.highest_qualification}}</td>
                                          <td>{{edu.institution}}</td>
                                          <td>{{edu.subjects}}</td>
                                      </tr>
                                    </template>
                                </tbody>
                            </table>
                            <div class="fs-11">PROMOTION DETAILS</div>
                            <table class="table table-condensed">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Old Position</th>
                                        <th>New Position</th>
                                        <th>Promotion Date</th>
                                        <th>Comments</th>
                                        <th>Date of First Appointment</th>
                                        <th>Date of Present Appointment</th>
                                        <th>Date of Confirmation</th>
                                        <th>Grade Level</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    <template v-if="lecturer.profile != null">
                                      <tr v-for="(pro, index) in JSON.parse(lecturer.profile.promotion_details)" :key="pro.id">
                                          <td>{{index + 1}}</td>
                                          <td>{{pro.old_position}}</td>
                                          <td>{{pro.new_position}}</td>
                                          <td>{{pro.promotion_date}}</td>

                                          <td>{{pro.comments}}</td>
                                          <td>{{pro.date_of_first_appointment}}</td>
                                          <td>{{pro.date_of_present_appointment}}</td>
                                          <td>{{pro.date_of_confirmation}}</td>
                                          <td>{{pro.grade_level}}</td>
                                      </tr>
                                    </template>
                                </tbody>
                            </table>
                             <div class="fs-11">SPOUSE DETAILS</div>
                            <table class="table table-condensed">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Full Name</th>
                                        <th>Birth Place</th>
                                        <th>Birth Date</th>
                                        <th>Occupation</th>
                                        <th>Address</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    <template v-if="lecturer.profile != null">
                                      <tr v-for="(spouse, index) in JSON.parse(lecturer.profile.spouse_details)" :key="spouse.id">
                                          <td>{{index + 1}}</td>
                                          <td>{{spouse.name}}</td>
                                          <td>{{spouse.birth_place}}</td>
                                          <td>{{spouse.dob}}</td>
                                          <td>{{spouse.occupation}}</td>
                                          <td>{{spouse.address}}</td>
                                      </tr>
                                    </template>
                                </tbody>
                            </table>
                            <div class="fs-11">CHILDREN DETAILS</div>
                            <table class="table table-condensed">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Full Name</th>
                                        <th>Birth Place</th>
                                        <th>Birth Date</th>
                                        <th>Remarks</th>
                                        <th>Address</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    <template v-if="lecturer.profile != null">
                                      <tr v-for="(child, index) in JSON.parse(lecturer.profile.children_details)" :key="child.id">
                                          <td>{{index + 1}}</td>
                                          <td>{{child.name}}</td>
                                          <td>{{child.birth_place}}</td>
                                          <td>{{child.dob}}</td>
                                          <td>{{child.remark}}</td>
                                          <td>{{child.address}}</td>
                                      </tr>
                                    </template>
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
     <div class="modal fade SlideUp" id="upload_lecturers" tabindex="-1" role="dialog" aria-hidden="true">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
          <i class="pg-close"></i>
      </button>
      <div class="modal-dialog modal-lg">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="text-left p-b-5"><span class="semi-bold">Upload Lecturers</span></h5>
              </div>
              <div class="modal-body">
                  <div class="row">
                      <div class="col-lg-12 m-b-10">
                          <!-- <label>Level</label>
                          <select class="form-control" v-model="model.import_level">
                              <option value="">Select Level</option>
                              <option :value="level.id" v-for="level in levels" :key="level.id">{{level.name}}</option>
                          </select> -->
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
                          <button type="button" @click="uploadLecturers" v-if="!loading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Upload Record</button>
                          <button type="button" disabled v-if="loading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Uploading</button>
                      </div>
                      <div class="col-lg-12 m-t-15">
                          <div class="dd-placeholder p-1">
                              <h5 class="pull-left sm-pull-reset"><i class="fa fa-file-excel-o p-l-10"></i> Sample File</h5>
                              <button v-if="!downloading" @click="downloadLecturerSampleFile()" class="pull-right sm-pull-reset btn btn-default m-t-5 m-r-10"><i class="fa fa-arrow-down"></i> &nbsp; Download</button>
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

    <div class="content sm-gutter">
      <!-- START BREADCRUMBS -->
      <div class="bg-white">
        <div class="container p-l-5">
          <ol class="breadcrumb breadcrumb-alt">
            <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
            <li class="breadcrumb-item"><a href="#">Personnel</a></li>
            <li class="breadcrumb-item active">Lecturers</li>
          </ol>
        </div>
      </div>
      <!-- END BREADCRUMBS -->

      <!-- START CONTAINER FLUID -->
      <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
        <div class="card card-default">
          <div class="card-header">
            <h3 class="text-primary no-margin pull-left sm-pull-reset">Lecturers Management</h3>
            <div class="pull-right sm-pull-reset">
              <button v-permission="'View state'" type="button" class="btn btn-success btn-sm"><i class="fa fa-refresh"></i>&nbsp; Refresh </button>
              <nuxt-link to="/personnel/lecturers/form/new" class="btn btn-primary btn-sm"><i class="fa fa-plus"></i> &nbsp; <strong>Create New Lecturer</strong></nuxt-link>
              <button v-permission="'Upload subject'" type="button" class="btn btn-warning btn-sm" data-target="#upload_lecturers" data-toggle="modal"><i class="fa fa-arrow-up"></i> &nbsp; <strong>Upload Lecturers</strong></button>
              <button v-permission="'Export subject'" type="button" class="btn btn-success btn-sm" data-target="#export_subjects" data-toggle="modal"><i class="fa fa-file-excel-o"></i> &nbsp; <strong>Export to Excel</strong></button>
            </div>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-striped table-condensed" id="basicTable">
                <thead>
                  <th style="width:15%">Username</th>
                  <th style="width:25%">Name</th>
                  <th style="width:15%">Gender</th>
                  <th style="width:20%">Email</th>
                  <th style="width:10%">Status</th>
                  <th style="width:15%">Action</th>
                </thead>
                <tbody>
                  <template v-if="lecturers.length > 0 && loading">
                    <tr v-for="lecturer in lecturers" :key="lecturer.id">
                      <td> {{lecturer.name}} </td>
                      <td> {{(lecturer.first_name + ' ' + lecturer.last_name).toUpperCase()}} </td>
                      <td> {{lecturer.gender == 'male' ? 'Male' : 'Female'}} </td>
                      <td> {{lecturer.email}} </td>
                      <td> 
                        <span v-bind:class="{ 'label':true, 'label-success':(lecturer.status == 1), 'label-failure':(lecturer.status == 0)}">{{lecturer.status == 1 ? "Active" : "Inactive"}}</span>
                      </td>
                      <td>
                        <div class="btn-group">
                            <button type="button" @click="viewLecturer(lecturer)" class="btn btn-default btn-sm" data-target="#view_lecturer" data-toggle="modal"><span data-toggle="tooltip" data-placement="top" title="View Record Details"><i class="fa fa-eye"></i></span></button>
                            <nuxt-link type="button" :to="'/personnel/lecturers/form/edit'+'_'+ lecturer.id" class="btn btn-default btn-sm" data-toggle="tooltip" data-placement="top" title="Edit Record"><i class="fa fa-pencil"></i></nuxt-link>
                            <span v-permission="'Delete programme'" data-placement="top" data-toggle="tooltip" title="Delete Record">
                                <a href="#delete_lecturer" @click="setId(lecturer.id)"  class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="pg-trash"></i></a>
                            </span>
                        </div>
                      </td>
                    </tr>
                  </template>
                  <template v-if="!lecturers.length < 1 && !loading">
                    <tr class="text-center" v-if="!lecturers.length && !loading">
                      <td colspan="6">No result found</td>
                    </tr>
                  </template>
                  <template v-if="!loading">
                    <tr class="text-center">
                      <td colspan="6">Loading...Please wait!</td>
                    </tr>
                  </template>
                </tbody>
              </table>
              <pagination
                v-bind:pagination="pagination"
                v-on:click.native="getLecturers(pagination.current_page)"
                :offset="4">
              </pagination>
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
  name: 'Lecturers',
  layout: 'main',
  components: {
    Pagination
  },
  data: () => ({
    loading: true,
    lecturers: [],
    lecturer: {},
    downloading: false,
    err_level_id: "",
    err_program_id: "",
    importResponse: {},
    lecturerLoading: false,
    deleteLoading: false,
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
    pagination: {
      total: 0,
      per_page: 2,
      from: 1,
      to: 0,
      current_page: 1
    }
  }),
  methods: {
      setId(id){
          this.model.id = id
      },
     viewLecturer(payload){
            this.lecturer = {}
            this.lecturerLoading = true
            this.$store
                .dispatch('get-started/getLecturer', payload.id)
                .then(res => {
                if(res != undefined){
                    if(res.status){
                        this.lecturerLoading = false
                        this.lecturer = res.data
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
    downloadLecturerSampleFile(){
        this.downloading = true
        this.$store
            .dispatch('get-started/downloadLecturerSampleFile')
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
    uploadLecturers(){
        this.loading = true
        this.file = this.$refs.myFiles.files[0];
        let formData = new FormData();
        formData.append('file', this.file);
        formData.append('level_id', this.model.import_level)
        formData.append('program_id', programId)
        this.$store
            .dispatch('get-started/uploadLecturers', formData)
            .then(res => {
            if(res != undefined){
                if(res.success){
                    this.loading = false
                    this.importResponse = res
                    this.getLecturers(1)
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
    deleteLecturer(){
        this.deleteLoading = true
        this.$store
            .dispatch('get-started/deleteLecturer', this.model.id)
            .then(res => {
            if(res != undefined){
                if(res.status == true){
                this.deleteLoading = false
                this.getLecturers(1)
                $( '#delete_lecturer' ).modal( 'hide' ).data( 'bs.modal', null );
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
    getLecturers(page){
        if(this.$laravel.hasPermission('View Lecturer')){
          this.loading = false
          this.lecturers= []
          let payload = {}
          payload.page = page
          payload.type = 'LECTURER'
          this.$store
            .dispatch('get-started/getFullLecturers', payload)
            .then(res => {
              console.log(res)
              if(res != undefined){
                if(res.status){ 
                this.loading = true
                this.lecturers = res.data.data
                this.pagination = res.data
                }else{
                  this.loading = true
                  this.ErrMsg = "Error Fetching data!"
                }
              }else{
                this.loading = true
                this.ErrMsg = "Error Fetching data!"
              }
            }).catch(err => {
              this.loading = true
          })
        }else{
            this.loading = true
             this.$router.push(
                decodeURIComponent(
                  this.$route.query.redirect || "/dashboard"
                )
            );
            this.$toast.error("Not Permitted to access this page! Contact the admin.", { icon: "times" });
        }
    },
  },
  mounted() {
    if (!process.server) {
        const script1 = document.createElement('script')
        script1.type = 'text/javascript'
        script1.src = '/pages/js/pages.min.js'
        document.head.appendChild(script1)
    }
    this.getLecturers(this.pagination.current_page)
  }
}
</script>
