<template>
    <div>
        <!-- START PAGE CONTENT -->
        <div class="content sm-gutter">
            <!-- START BREADCRUMBS -->
            <div class="bg-white">
                <div class="container p-l-5">
                    <ol class="breadcrumb breadcrumb-alt">
                        <li class="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                        <li class="breadcrumb-item"><a href="#">Get Started</a></li>
                        <li class="breadcrumb-item active">Admin users</li>
                    </ol>
                </div>
            </div>
            <!-- END BREADCRUMBS -->
            <div class="modal fade SlideUp" id="assign_admin_role" tabindex="-1" role="dialog" aria-hidden="true">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    <i class="pg-close"></i>
                </button>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="text-left p-b-5"><span class="semi-bold">Please click confirm to make <strong>{{currentUserSelected}}</strong> an admin</span></h5>
                        </div>
                        <div class="modal-body">
                            <div class="col-lg-12">
                                <button type="button" disabled v-if="!makeAdminLoading" @click="makeAdmin()" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Confirm</button>
                                <button type="button" v-if="makeAdminLoading" disabled class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Submitting</button>
                            </div>
                        </div>
                    </div>
                    <!-- /.modal-content -->
                </div>
                <!-- /.modal-dialog -->
            </div>

             <!-- Edit JAMB Result Modal -->
        <div class="modal fade SlideUp" id="edit_jamb_result" tabindex="-1" role="dialog" aria-hidden="true">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                <i class="pg-close"></i>
            </button>
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="text-left p-b-5"><span class="semi-bold">Edit JAMB Result</span></h5>
                    </div>
                    <div class="modal-body">
                        <form class="full-width" @submit.prevent="submitEditedJambResut">
                            <div class="row">
                                <div class="col-lg-6 m-b-10">
                                    <select class="full-width form-control" required="required" v-model="model.edit_marital_status">
                                        <option value="" disabled>Marital Status</option>
                                        <option value="Married">Married</option>
                                        <option value="Single">Single</option>
                                        <option value="Divorced">Divorced</option>
                                    </select>
                                </div>
                                <div class="form-group m-b-10">
                                    <select class="form-control" v-model="model.edit_faculty_id" @change="populateDepartments($event)">
                                        <option value="" selected>Select your option</option>
                                        <option v-for="faculty in faculties" :key="faculty.id" :value="faculty.id">{{faculty.name}}</option>
                                    </select>
                                </div>
                                <div class="form-group m-b-10">
                                    <select class="form-control" v-model="model.edit_department_id">
                                        <option value="" selected>Select your option</option>
                                        <option v-for="department in departments" :key="department.id" :value="department.id">{{department.name}}</option>
                                    </select>
                                </div>
                                <div class="col-lg-6 m-b-10">
                                    <input type="number" placeholder="Phone Number" v-model="model.edit_phone_number" class="form-control">
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
            <!-- START CONTAINER FLUID -->
            <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
                <div class="card card-default">
                    <div class="card-header  separator">
                        <h3 class="text-primary no-margin pull-left sm-pull-reset">PUTME Students</h3>
                        <!-- <div class="pull-right sm-pull-reset">
                          <button type="button" class="btn btn-primary btn-sm" @click="addPersonnel"><i class="fa fa-plus"></i> &nbsp; <strong>Add New Admin</strong></button>
                          <button type="button" class="btn btn-warning btn-sm" data-target="#upload_personnel" data-toggle="modal"><i class="fa fa-arrow-up"></i> &nbsp; <strong>Upload Admins</strong></button>
                        </div> -->
                        <div class="clearfix"></div>
                    </div>
                    <div class="card-header">
                        <form @submit.prevent="searchFaculty">
                            <div class="input-group col-lg-4" >
                                <input type="text" class="form-control" v-model="searchItem" placeholder="Search">
                                <div class="input-group-btn">
                                <button class="btn btn-default" type="submit">
                                    <i class="fa fa-search"></i>
                                </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-condensed" id="basicTable">
                                <thead>
                                  <th>REG Number</th>
                                  <th>Screening ID</th>
                                  <th style="width:20%">Email</th>
                                  <th>Phone</th>
                                  <th>Type</th>
                                  <th style="width:16%">Status</th>
                                  <th style="width:18%">Action</th>
                                </thead>
                                <tbody>
                                    <tr v-if="getLoading">
                                        <td colspan="6">Loading....Please wait.</td>
                                    </tr>
                                    <tr v-if="!getLoading && users.length < 1">
                                        <td colspan="6">No record at the moment... Please insert new record</td>
                                    </tr>
                                    <tr v-else v-for="user in users" :key="user.id">
                                        <td>{{user.registration_number}}</td>
                                        <td>{{user.screening_id}}</td>
                                        <td>{{user.email}}</td>
                                        <td>{{user.primary_phone}}</td>
                                        <td>{{user.type}}</td>
                                        <td>
                                          <span style="background-color: green; color: white; margin: 5px; padding: 4px;" v-if="user.status == 1">Completed</span>
                                          <span style="background-color: red; color: white; margin: 5px; padding: 4px;" v-if="user.status == 0">Not Completed</span>
                                        </td>
                                        <td>
                                          <div class="btn-group">
                                              <span data-placement="top" data-toggle="tooltip" @click="populateFields(user)" title="Edit User">
                                                  <a href="#edit_jamb_result" title="Edit Student Info" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-pencil"></i></a>
                                              </span>
                                          </div>
                                          <div class="btn-group">
                                              <span data-placement="top" @click="showDetails(user.registration_number)" data-toggle="tooltip" title="View User Details">
                                                  <a href="#view_jamb_result" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-eye"></i></a>
                                              </span>
                                          </div>
                                          <div class="btn-group">
                                              <span data-placement="top" data-toggle="tooltip" title="Edit Role">
                                                  <a href="javascript:;" @click="exportOlevel(user.registration_number)" title="Download Olevel Result" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-download"></i></a>
                                              </span>
                                          </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <Pagination
                              v-bind:pagination="pagination"
                              v-on:click.native="getAllUsers(pagination.current_page)"
                              :offset="4">
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END CONTAINER FLUID -->
        </div>


            <!--  -->
            <div class="modal fade SlideUp" id="manage_permission" tabindex="-1" role="dialog" aria-hidden="true">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    <i class="pg-close"></i>
                </button>
                <div class="modal-dialog" style="width: 95%">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="text-left p-b-5"><span class="semi-bold">Manage Permissions: {{currentUserSelected}}</span></h5>
                            <span>
                                <input type="checkbox" v-model="selectAllPermissions" >
                                <label for="all">Select all</label>
                            </span>
                        </div>

                        <div class="modal-body">
                            <div style="text-align:center; font-size:24px;" v-if="permissionLoading">
                                <i class="fa fa-spinner fa-spin fa-3x fa-fw" aria-hidden="true"></i>
                            </div>
                            <form v-if="!permissionLoading">
                                <div class="row" >
                                    <div class="col-lg-3 m-b-10" v-for="permission in permissions" :key="permission.id">
                                        <div class="text-body mb-10">
                                            <!-- <h6 class="font-weight-bold">Faculties</h6> -->
                                            <div class="checkbox check-primary mt-0 mb-0 pl-2">
                                                <input type="checkbox" :value="permission.id" v-model="selectedPermissions">
                                                <label :for="'permission'+permission.id">{{permission.name}}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <button type="button" v-if="!updateLoading" @click="updateUserPermissions()" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Save Changes</button>
                                    <button type="button" disabled v-if="updateLoading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Updating</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <!-- /.modal-content -->
                </div>
                <!-- /.modal-dialog -->
            </div>


            <!-- /.ADD NEW ADMIN USER -->
            <div class="modal fade SlideUp" id="add_personnel" tabindex="-1" role="dialog" aria-hidden="true">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                  <i class="pg-close"></i>
              </button>
              <div class="modal-dialog modal-xlg">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="text-left p-b-5"><span class="semi-bold">ADD NEW ADMIN USER</span></h5>
                      </div>
                      <div class="modal-body">
                        <form @submit.prevent="submitUser">
                          <div class="row">
                              <div class="col-lg-6 m-b-10">
                                <label>First name:</label>
                                <input type="text" placeholder="First Name" required="required" v-model="addData.first_name" class="form-control">
                              </div>
                              <div class="col-lg-6 m-b-10">
                                <label>Last name:</label>
                                <input type="text" placeholder="Last Name" required="required" v-model="addData.last_name" class="form-control">
                              </div>
                              <div class="col-lg-6 m-b-10">
                                <label>Password:</label>
                                <input type="password" placeholder="Password" required="required" v-model="addData.password" class="form-control">
                              </div>
                              <div class="col-lg-6 m-b-10">
                                <label>Confirm Password:</label>
                                <input type="password" placeholder="Confirm Password" required="required" v-model="addData.password_confirmation" class="form-control">
                              </div>
                              <div class="col-lg-12 m-b-10">
                                <label>Address:</label>
                                <input type="text" placeholder="Address" required="required" v-model="addData.address" class="form-control">
                              </div>
                              <div class="col-lg-6 m-b-10">
                                <label>Phone No:</label>
                                <input type="text" placeholder="Phone Number" required="required" v-model="addData.phone" class="form-control">
                              </div>
                              <div class="col-lg-6 m-b-10" v-if="update">
                                <label>Email address:</label>
                                <input type="text" placeholder="Email Address" readonly required="required" v-model="addData.email" class="form-control">
                              </div>
                              <div class="col-lg-6 m-b-10" v-else>
                                <label>Email address:</label>
                                <input type="text" placeholder="Email Address" required="required" v-model="addData.email" class="form-control">
                              </div>
                              <div class="col-lg-6 m-b-10">
                                <label>Marital Status:</label>
                                <select class="full-width form-control" required="required" v-model="addData.marital_status">
                                    <option value="" disabled>Marital Status</option>
                                    <option value="Married">Married</option>
                                    <option value="Single">Single</option>
                                    <option value="Divorced">Divorced</option>
                                </select>
                              </div>
                              <div class="col-lg-6 m-b-10">
                                  <label>Date of Birth:</label>
                                  <input type="date" v-model="addData.dob" required="required" placeholder="Date of Birth (dd/mm/yyyy)" class="form-control">
                              </div>
                              <div class="col-lg-6 m-b-10">
                                <label>Gender:</label>
                                <select class="full-width form-control" required="required" v-model="addData.gender">
                                    <option value="" disabled>Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                              </div>
                              <div class="col-lg-6 m-b-10">
                                <label>Date Employed:</label>
                                <input type="date" required="required" v-model="addData.date_employed" placeholder="Date Joined (dd/mm/yyyy)" class="form-control">
                              </div>
                              <div class="col-lg-12">
                                  <h6>NEXT OF KIN DETAILS</h6>
                                  <hr>
                              </div>
                              <div class="col-lg-12 m-b-10">
                                  <input type="text" required="required" v-model="addData.nok_name" placeholder="Name" class="form-control">
                              </div>
                              <div class="col-lg-6 m-b-10">
                                  <input type="text" required="required" v-model="addData.nok_relationship" placeholder="Relationship" class="form-control">
                              </div>
                              <div class="col-lg-6 m-b-10">
                                  <input type="text" required="required" v-model="addData.nok_email" placeholder="Email Address" class="form-control">
                              </div>
                              <div class="col-lg-6 m-b-10">
                                  <input type="text" required="required" v-model="addData.nok_phone" placeholder="Phone Number" class="form-control">
                              </div>
                              <div class="col-lg-6 m-b-10">
                                  <input type="text" v-model="addData.nok_address" placeholder="Address" class="form-control">
                              </div>

                              <div class="col-lg-12">
                                  <button type="submit" id="createUserBtn" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Add Record</button>
                              </div>
                          </div>
                        </form>
                      </div>
                      <div class="modal-footer">
                      </div>
                  </div>
                  <!-- /.modal-content -->
              </div>
              <!-- /.modal-dialog -->
            </div>
            <!-- /.ADD ADMIN USER ENDS HERE -->
            <div class="modal fade SlideUp" id="view_jamb_result" tabindex="-1" role="dialog" aria-hidden="true">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    <i class="pg-close"></i>
                </button>
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="text-left p-b-5"><span class="semi-bold">View PUMTE Details</span></h5>
                        </div>
                        <div class="modal-body jamb_view">
                            <h5 v-if="putmeDetails.jamb_result != null">{{putmeDetails.screening_id}} :- {{putmeDetails.jamb_result.name}} </h5>
                            <ul>
                                <li>
                                    <small>Reg. Number</small><br />
                                    <span>{{putmeDetails.registration_number}}</span>
                                </li>
                                <li>
                                    <small>Type</small> <br />
                                    <span>{{putmeDetails.type}}</span>
                                </li>
                                <li>
                                    <small>DOB</small><br />
                                    <span>{{putmeDetails.dob}}</span>
                                </li>
                            <li>
                                <small>LGA:</small><br />
                                <span v-if="putmeDetails.lga != null">{{putmeDetails.lga.name}}</span>
                            </li>
                                <li>
                                <small>State:</small> <br />
                                <span v-if="putmeDetails.state != null">{{putmeDetails.state.name}}</span>
                                </li>
                                <div class="clearfix"></div>
                            </ul>

                            <table class="table table-striped table-bordered">
                            <tr>
                                <th>Country:</th>
                                <td v-if="putmeDetails.country != null">{{putmeDetails.country.name}}</td>
                            </tr>
                            <tr>
                                <th>Marital Status:</th>
                                <td v-if="putmeDetails != null">{{putmeDetails.marital_status}}</td>
                            </tr>
                            <tr>
                                <th>Department:</th>
                                <td v-if="putmeDetails.department != null">{{putmeDetails.department.name}}</td>
                            </tr>
                            <tr>
                                <th>Faculty:</th>
                                <td v-if="putmeDetails.faculty != null">{{putmeDetails.faculty.name}}</td>
                            </tr>
                            </table>
                            <table class="table table-striped table-bordered">
                                <tr>
                                    <th>Email:</th>
                                    <td>{{putmeDetails.email}}</td>
                                </tr>
                                <tr>
                                    <th>Payment Status:</th>
                                    <td>{{putmeDetails.payment_status}}</td>
                                </tr>
                                <tr>
                                    <th>Passport</th>
                                    <td><img :src="putmeDetails.photo" width="100px" height="100px"/></td>
                                </tr>
                            </table>
                            <table class="table table-striped table-bordered">
                                <tr v-if="putmeDetails.jamb_result != null">
                                    <th>1st Choice Institution:</th>
                                    <td>{{putmeDetails.jamb_result.university1}}</td>
                                </tr>
                                <tr v-if="putmeDetails.jamb_result != null">
                                    <th>2nd Choice Institution:</th>
                                    <td>{{putmeDetails.jamb_result.university2}}</td>
                                </tr>
                                <tr v-if="putmeDetails.jamb_result != null">
                                    <th>1st Choice Department:</th>
                                    <td>{{putmeDetails.jamb_result.department.name}}</td>
                                </tr>
                                <tr v-if="putmeDetails.jamb_result != null">
                                    <th>1st Choice Faculty:</th>
                                    <td>{{putmeDetails.jamb_result.faculty.name}}</td>
                                </tr>
                                <tr v-if="putmeDetails.jamb_result != null">
                                    <th>2nd Choice Department:</th>
                                    <td>{{putmeDetails.jamb_result.department.name}}</td>
                                </tr>
                                <tr v-if="putmeDetails.jamb_result != null">
                                    <th>2nd Choice Faculty:</th>
                                    <td>{{putmeDetails.jamb_result.faculty.name}}</td>
                                </tr>
                            </table>
                                <table class="table table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Subject</th>
                                            <th>Mark</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="putmeDetails.jamb_result != null">
                                            <td>{{putmeDetails.jamb_result.subject1.name}}</td>
                                            <td>{{putmeDetails.jamb_result.mark1}}</td>
                                        </tr>
                                        <tr v-if="putmeDetails.jamb_result != null">
                                            <td>{{putmeDetails.jamb_result.subject2.name}}</td>
                                            <td>{{putmeDetails.jamb_result.mark2}}</td>
                                        </tr>
                                        <tr v-if="putmeDetails.jamb_result != null">
                                            <td>{{putmeDetails.jamb_result.subject3.name}}</td>
                                            <td>{{putmeDetails.jamb_result.mark3}}</td>
                                        </tr>
                                        <tr v-if="putmeDetails.jamb_result != null">
                                            <td>{{putmeDetails.jamb_result.subject4.name}}</td>
                                            <td>{{putmeDetails.jamb_result.mark4}}</td>
                                        </tr>
                                        <tr>
                                        <td><b>TOTAL</b></td>
                                        <td v-if="putmeDetails.jamb_result != null">{{ (putmeDetails.jamb_result.mark1 + putmeDetails.jamb_result.mark2 + putmeDetails.jamb_result.mark3 + putmeDetails.jamb_result.mark4) }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                        </div>
                    </div>
                    <!-- /.modal-content -->
                </div>
                <!-- /.modal-dialog -->
            </div>
            <!-- /.UPLOAD ADMIN USER -->
            <div class="modal fade SlideUp" id="upload_personnel" tabindex="-1" role="dialog" aria-hidden="true">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                  <i class="pg-close"></i>
              </button>
              <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="text-left p-b-5"><span class="semi-bold">UPLOAD ADMIN USER</span></h5>
                      </div>
                      <div class="modal-body">
                          <div class="row">
                              <div class="col-lg-12 m-b-10">
                                  <div class="custom-file">
                                      <input type="file" class="custom-file-input" id="customFileLang" lang="es">
                                      <label class="custom-file-label" for="customFileLang">Select File</label>
                                  </div>
                              </div>
                              <div class="col-lg-12">
                                  <button type="button" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Upload Record</button>
                              </div>
                              <div class="col-lg-12 m-t-15">
                                  <div class="dd-placeholder p-1">
                                      <h5 class="pull-left sm-pull-reset"><i class="fa fa-file-excel-o p-l-10"></i> Sample File</h5>
                                      <button class="pull-right sm-pull-reset btn btn-default m-t-5 m-r-10"><i class="fa fa-arrow-down"></i> &nbsp; Download</button>
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
            <!-- /.UPLOAD ADMIN USER ENDS HERE -->
    </div>
</template>
<script>
import Pagination from '~/components/Pagination'

export default {
    name: "roles",
    layout: "main",
    middleware: "auth",
    components: {
      Pagination
    },
    computed: {
        selectAllPermissions: {
            get: function () {
                return this.permissions ? this.selectedPermissions.length == this.permissions.length : false;
            },
            set: function (value) {
                var selectedPermissions = [];
                if (value) {
                    this.permissions.forEach(function (permission) {
                        selectedPermissions.push(permission.id);
                    });
                }
                this.selectedPermissions = selectedPermissions;
            }
        },
        selectAllRoles: {
            get: function () {
                return this.roles ? this.selectedRoles.length == this.roles.length : false;
            },
            set: function (value) {
                var selectedRoles = [];
                if (value) {
                    this.roles.forEach(function (role) {
                        selectedRoles.push(role.id);
                    });
                }
                this.selectedRoles = selectedRoles;
            }
        }
    },
    data(){
        return {
            putmeDetails: {},
            subjects: [],
            update: false,
            permissions: [],
            currentUserSelected: "",
            updateLoading: false,
            user_permissions: [],
            addloading: false,
            permissionLoading: false,
            checked: false,
            downloading: false,
            loading: false,
            searchItem: "",
            IsPermitted: true,
            departments: [],
            faculties:[],
            makeAdminLoading: false,
            deleteLoading: false,
            editLoading: false,
            getLoading: true,
            exportLoading: false,
            selectedPermissions: [],
            roleLoading: false,
            users:[],
            roles: [],
            selectedRoles: [],
            addData: {
              name: '',
              first_name: '',
              last_name: '',
              email: '',
              phone: '',
              address: '',
              marital_status: '',
              gender: '',
              dob: '',
              date_employed: '',
              password: '',
              password_confirmation: '',
              nok_name: '',
              nok_email: '',
              nok_phone: '',
              nok_relationship: '',
              nok_address: '',
              id: '',
              nok_id: ''
            },
            permis: {
              checked: false
            },
            file: "",
            user:{},
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
                user_id: 0,
                edit_name: "",
                edit_sex: "",
                edit_name: "",
                edit_state_id: "",
                edit_lga_id: "",
                edit_university1:"",
                edit_faculty_id1:"",
                edit_faculty_id2:"",
                edit_department_id:"",
                edit_university1:"",
                edit_university2:"",
                edit_department_id2:"",
                edit_phone_number: "",
                edit_country_id: 0
            },
        }
    },
    methods: {
        submitEditedPUTMEStudent(){
            this.editLoading = true
            let bodyFormData = new Object();
            bodyFormData.id = this.model.id
            this.$store
                .dispatch('get-started/updateJambResult', bodyFormData)
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                        this.editLoading = false
                        this.getJambResults()
                        $('#edit_jamb_result').modal('hide').data( 'bs.modal', null )
                        this.$toast.success('Record Edited Successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});

                    }else{
                    this.editLoading = false
                    }
                }else{
                    this.loading = false
                }
            }).catch(err => {
                this.loading = false
            })
        },
        showDetails(registration_number){  
            this.putmeDetails = {}
            this.$store
                .dispatch('get-started/getPUTMERegistrationDetails', registration_number)
                .then(res => {
                if(res != undefined){
                    if(res.data.status == true){
                        this.getLoading = false
                        this.putmeDetails = res.data
                    }else{
                        this.getLoading = false
                        this.ErrMsg = "Error Fetching data!"
                    }
                }else{
                    this.getLoading = false
                    this.ErrMsg = "Error Fetching data!"
                }
            }).catch(err => {
                this.getLoading = false
            })
        },
        getFaculties(page){
            this.$store
                .dispatch('get-started/getFaculties', page)
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                        this.getloading = false
                        this.faculties = res.data.data
                        this.pagination = res.data
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
        getDepartmentsByFacultyId(page, Id) {
            let facultyId = Id
            let payload = {}
            payload.facultyId = facultyId
            payload.page = page
            this.$store
                .dispatch('get-started/getDepartmentsByFacultyId', payload)
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                        this.departments = res.data.data
                    }else{
                        this.ErrMsg = "Error Logging in!"
                    }
                }else{
                    this.ErrMsg = "Error Logging in!"
                }
            }).catch(err => {
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
        autoUpdateUserDetails(){
            this.$store
                .dispatch('get-started/getUserDetails')
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                        this.$auth.setUser(res.data)
                        this.setPermissions()
                        this.setRoles()
                    }else{
                        this.ErrMsg = "Error Fetching data!"
                    }
                }else{
                    this.ErrMsg = "Error Fetching data!"
                }
            }).catch(err => {
            })
        
        },
        exportOlevel(reg_no){
            this.exportLoading = true
            this.$store
                .dispatch('get-started/exportOLevel', reg_no)
                .then(res => {
            if(res != undefined){
                this.exportLoading = false
                this.$toast.success('Record Exported to Excel Successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
            }else{
                this.exportLoading = false
                alert("File Downloaded Unsuccessful")
            }
                }).catch(err => {
                    this.exportLoading = false
                    this.$toast.error('An error occurred please contact the administrator' + err)
            })
        },
        addPersonnel() {
            this.update = false
            this.addData.first_name = ''
            this.addData.last_name = ''
            this.addData.email = ''
            this.addData.phone = ''
            this.addData.marital_status = ''
            this.addData.gender = ''
            this.addData.address = ''
            this.addData.dob = ''
            this.addData.date_employed = ''
            this.addData.id = ''
            this.addData.password = ''
            this.addData.password_confirmation = ''
            this.addData.nok_name = ''
            this.addData.nok_email = ''
            this.addData.nok_phone = ''
            this.addData.nok_relationship = ''
            this.addData.nok_address = ''
            this.addData.nok_id = ''
            $('#add_personnel').modal()
        },
        setUserName(user){
            this.currentUserSelected = user.name
        },
        selectAll(){
            if(this.checked){
                this.permis.checked = false
            }else{
                this.permis.checked = true
            }
        }, 
        setId(id){
            this.model.id = id
        },
        populateFields(jamb){
            console.log(jamb)
            this.model.id = jamb.id
            this.model.edit_marital_status = jamb.marital_status
            this.model.edit_phone_number = jamb.primary_phone
            this.model.edit_department_id = jamb.department_id
            
            this.model.edit_registration_number = jamb.registration_number
        },
        getAllUsers(page){
            this.getLoading = true
            let payload = {}
            payload.page = page
            payload.registration_number = ""
            payload.type = ""
            payload.screening_id = ""
            this.$store
                .dispatch('get-started/getPUTMERegistrations', payload)
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                        this.getLoading = false
                        this.users = res.data.data
                        this.pagination = res.data
                    }else{
                        this.getLoading = false
                        this.ErrMsg = "Error Fetching data!"
                    }
                }else{
                    this.getLoading = false
                    this.ErrMsg = "Error Fetching data!"
                }
            }).catch(err => {
                this.getLoading = false
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
        this.getFaculties()
        this.getAllUsers(this.pagination.current_page)
    }
}
</script>
<style scoped>
.breadcrumb {
    background-color: #ffffff !important;;
}
.dropdown-menu.show {
    display: block !important;
}

.modal-dialog {
    max-width: 95% !important;
    margin: 1.75rem auto;
}
</style>
