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

            <div class="modal fade SlideUp" id="manage_role" tabindex="-1" role="dialog" aria-hidden="true">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    <i class="pg-close"></i>
                </button>
                <div class="modal-dialog" style="width: 95%">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="text-left p-b-5"><span class="semi-bold">Manage Roles: {{currentUserSelected}}</span></h5>
                            <span >
                                <input type="checkbox" v-bind:value="roles" v-model="selectAllRoles" id="all">
                                <label for="all">Select all</label>
                            </span>
                        </div>

                        <div class="modal-body">
                            <div style="text-align:center; font-size:24px;" v-if="roleLoading">
                                <i class="fa fa-spinner fa-spin fa-3x fa-fw" aria-hidden="true"></i>
                            </div>
                            <form v-if="!roleLoading">
                                <div class="row" >
                                    <div class="col-lg-3 m-b-10" v-for="role in roles" :key="role.id">
                                        <div class="text-body mb-10">
                                            <!-- <h6 class="font-weight-bold">Faculties</h6> -->
                                            <div class="checkbox check-primary mt-0 mb-0 pl-2">
                                                <input type="checkbox" :value="role.id" v-model="selectedRoles">
                                                <label :for="'role'+role.id">{{role.name}}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <button type="button" v-if="!updateLoading" @click="updateUserRoles()" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Save Changes</button>
                                    <button type="button" disabled v-if="updateLoading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Updating</button>
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
                    <div class="card-header">
                        <h3 class="text-primary no-margin pull-left sm-pull-reset">Admin users</h3>
                        <div class="pull-right sm-pull-reset">
                          <button type="button" class="btn btn-primary btn-sm" @click="addPersonnel"><i class="fa fa-plus"></i> &nbsp; <strong>Add New Admin</strong></button>
                          <button type="button" class="btn btn-warning btn-sm" data-target="#upload_personnel" data-toggle="modal"><i class="fa fa-arrow-up"></i> &nbsp; <strong>Upload Admins</strong></button>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-condensed" id="basicTable">
                                <thead>
                                  <th>First Name</th>
                                  <th>Last Name</th>
                                  <th style="width:25%">Email</th>
                                  <th>Phone</th>
                                  <th>Status</th>
                                  <th style="width:20%">Action</th>
                                </thead>
                                <tbody>
                                    <tr v-if="getLoading">
                                        <td colspan="6">Loading....Please wait.</td>
                                    </tr>
                                    <tr v-if="!getLoading && users.length < 1">
                                        <td colspan="6">No record at the moment... Please insert new record</td>
                                    </tr>
                                    <tr v-else v-for="user in users" :key="user.id">
                                        <td>{{user.first_name}}</td>
                                        <td>{{user.last_name}}</td>
                                        <td>{{user.email}}</td>
                                        <td>{{user.phone}}</td>
                                        <td>
                                          <span style="background-color: green; color: white; margin: 5px; padding: 4px;" v-if="user.status == 1">Active</span>
                                          <span style="background-color: red; color: white; margin: 5px; padding: 4px;" v-if="user.status == 0">Inactive</span>
                                        </td>
                                        <td>
                                          <div class="btn-group">
                                              <span data-placement="top" data-toggle="tooltip" title="Edit Role">
                                                  <a href="javascript:;" @click="editUser(user)" title="Edit User" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-pencil"></i></a>
                                              </span>
                                          </div>
                                          <div class="btn-group open">
                                              <a class="btn btn-primary" href="javascript:;"><i class="fa fa-cog"></i></a>
                                              <a class="btn btn-primary dropdown-toggle" data-toggle="dropdown" href="#">
                                              </a>
                                              <ul class="dropdown-menu">
                                                  <li><a href="#manage_role" @click="populateRoleCheckboxes(user)" role="button" data-toggle="modal"><i class="fa fa-lock"></i> Roles</a></li>
                                                  <li><a href="#manage_permission" @click="populatePermissionCheckboxes(user)" role="button" data-toggle="modal"><i class="fa fa-lock"></i> Permissions</a></li>
                                                  <li class="divider"></li>
                                                  <li><a href="#assign_admin_role" @click="setUserName(user)" role="button" data-toggle="modal"><i class="fa fa-unlock"></i> Make admin</a></li>
                                              </ul>
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
            IsPermitted: true,
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
              edit_name: ""
            },
        }
    },
    methods: {
        setPermissions(){
            this.$laravel.setPermissions(this.$auth.user.user_permissions);
        },
        setRoles(){
            this.$laravel.setRoles(this.$auth.user.user_roles);
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
      submitUser() {
        if(this.addData.id === '') {
          //create
          this.createUser()
        }else{
          //edit
          this.editUserInfo()
        }
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
      createUser() {
        $('#createUserBtn').attr('disabled', true).html('Adding Record....');
        this.addData.name = this.addData.first_name+' '+this.addData.last_name
        this.$store.dispatch('users/createUser', this.addData)
          .then(res =>{
            if(res.data.status) {
              $('#createUserBtn').attr('disabled', false).html('Add Record');
              this.$toast.success(res.data.message)
              this.getAllUsers(this.pagination.current_page)
              $('#add_personnel').modal('hide')
            }
          }).catch(err =>{
            $('#createUserBtn').attr('disabled', false).html('Add Record');
            this.$toast.error(err)
          })
      },
      editUserInfo() {
        $('#createUserBtn').attr('disabled', true).html('Updating....');
        this.addData.name = this.addData.first_name+' '+this.addData.last_name
        this.$store.dispatch('users/updateUser', this.addData)
          .then(res =>{
            if(res.data.status) {
              $('#createUserBtn').attr('disabled', false).html('Add Record');
              this.$toast.success(res.data.message)
              this.getAllUsers(this.pagination.current_page)
              $('#add_personnel').modal('hide')
              this.update = false
            }
          }).catch(err =>{
            $('#createUserBtn').attr('disabled', false).html('Add Record');
            this.$toast.error(err)
          })
      },
      editUser(user) {
        this.update = true
        this.addData.first_name = user.first_name
        this.addData.last_name = user.last_name
        this.addData.email = user.email
        this.addData.phone = user.phone
        this.addData.marital_status = user.marital_status,
        this.addData.gender = user.gender
        this.addData.dob = user.dob
        this.addData.date_employed = user.date_employed
        this.addData.id = user.id
        this.addData.nok_name = user.kin.name
        this.addData.nok_email = user.kin.email
        this.addData.nok_phone = user.kin.phone
        this.addData.nok_relationship = user.kin.relationship
        this.addData.nok_address = user.kin.address
        this.addData.nok_id = user.kin.id
        $('#add_personnel').modal()
      },
      setUserName(user){
          this.currentUserSelected = user.name
      },
      populatePermissionCheckboxes(user){
          this.selectedPermissions = []
          this.model.user_id = user.id
          this.currentUserSelected = user.name
          this.user = user
          this.getAllPermissions(this.pagination.current_page);
          this.getUserPermissions(user.id)
      },
      getAllPermissions(){
          this.permissionLoading = true
          this.$store
            .dispatch('permissions/getPermissions')
            .then(res => {
            if(res != undefined){
                if(res.status == true){
                    this.permissionLoading = false
                    this.permissions = res.data
                }else{
                    this.permissionLoading = false
                    this.ErrMsg = "Error fetching data!"
                }
            }else{
                this.permissionLoading = false
                this.ErrMsg = "Error fetching data!"
            }
        }).catch(err => {
            this.permissionLoading = false
        })
      },
      populateRoleCheckboxes(user){
          this.selectedRoles = []
          this.model.user_id = user.id
          this.currentUserSelected = user.name
          this.user = user
          this.getRoles(this.pagination.current_page);
          this.getUserRoles(user.id)
      },
      selectAll(){
          if(this.checked){
              this.permis.checked = false
          }else{
              this.permis.checked = true
          }
      },
    //   selectAllRoles(Roles){
    //       if(this.checked){
    //            this.selectedRoles = []
    //         }else{
    //             for(var i=0; i<Roles.length; i++){
    //                 this.selectedRoles.push(Roles[i].id)
    //             }
    //         }
    //   },
      updateUserRoles(){
          this.updateLoading = true
          let bodyFormData = new FormData();
          bodyFormData.set('user_id', this.model.user_id)
          if(this.selectedRoles.length != 0){
            for(var i=0; i < this.selectedRoles.length; i++){
                bodyFormData.append('roles[]', this.selectedRoles[i])
            }
          } else {
            bodyFormData.append('roles[]', this.selectedRoles)
          }
          this.$store
              .dispatch('roles/updateUserRoles', bodyFormData)
              .then(res => {
              if(res != undefined){
                  if(res.status == true){
                      this.populateRoleCheckboxes(this.user)
                      this.autoUpdateUserDetails()
                      $('#manage_role').modal('hide')
                      this.updateLoading = false
                      location.reload()
                  }else{
                      this.updateLoading = false
                      this.ErrMsg = "Error Creating Record!"
                  }
              }else{

                  this.updateLoading = false
                  this.ErrMsg = "Error Processing Request!"
              }
          }).catch(err => {
          this.updateLoading = false
          })
      },
      updateUserPermissions(){
          this.updateLoading = true
          let bodyFormData = new FormData();
          bodyFormData.set('user_id', this.model.user_id)
          if(this.selectedPermissions.length != 0){
            for(var i=0; i<this.selectedPermissions.length; i++){
                bodyFormData.append('permissions[]', this.selectedPermissions[i])
            }
          } else {
            bodyFormData.append('permissions[]', this.selectedPermissions)
          }
          this.$store
              .dispatch('roles/updateUserPermissions', bodyFormData)
              .then(res => {
              if(res != undefined){
                  if(res.status == true){
                      this.populatePermissionCheckboxes(this.user)
                      this.autoUpdateUserDetails()
                      $('#manage_permission').modal('hide')
                      this.updateLoading = false
                      location.reload()
                  }else{
                      this.updateLoading = false
                      this.ErrMsg = "Error Creating Record!"
                  }
              }else{

                  this.updateLoading = false
                  this.ErrMsg = "Error Processing Request!"
              }
          }).catch(err => {
          this.updateLoading = false
          })
      },
      getUserPermissions(id){
          var req = {}
          req.id = id
          this.$store
              .dispatch('permissions/getUserPermissions', req)
              .then(res => {
              if(res != undefined){
                  if(res.status == true){
                      for(var i=0; i<res.data.length; i++){
                          this.selectedPermissions.push(res.data[i].id)
                      }
                  }else{
                      this.ErrMsg = "Error Fetching data!"
                  }
              }else{
                  this.ErrMsg = "Error Fetching data!"
              }
          }).catch(err => {
          })
      },
      getUserRoles(id){
          var req = {}
          req.id = id
          this.$store
              .dispatch('roles/getUserRoles', req)
              .then(res => {
              if(res != undefined){
                  if(res.status == true){
                      for(var i=0; i<res.data.length; i++){
                          this.selectedRoles.push(res.data[i].id)
                      }
                  }else{
                      this.ErrMsg = "Error Fetching data!"
                  }
              }else{
                  this.ErrMsg = "Error Fetching data!"
              }
          }).catch(err => {
          })
      },
      getRoles(page){
          this.roleLoading = true
          let req = {}
          req.page = page
          req.pager = false
          this.$store
              .dispatch('roles/getRoles', req)
              .then(res => {
              if(res != undefined){
                  if(res.status == true){
                      this.roleLoading = false
                      this.roles = res.data
                  }else{
                      this.roleLoading = false
                      this.ErrMsg = "Error Fetching data!"
                  }
              }else{
                  this.roleLoading = false
                  this.ErrMsg = "Error Fetching data!"
              }
          }).catch(err => {
              this.roleLoading = false
          })
      },
      setId(id){
        this.model.id = id
      },
      populateFields(request){
        this.model.edit_id = request.id
        this.model.edit_name = request.name
        this.model.edit_prefix = request.prefix
        this.model.edit_status = request.status
      },
      getAllUsers(page){
          this.getLoading = true
          this.$store
              .dispatch('roles/getAllUsers', page)
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
        this.getRoles(this.pagination.current_page);
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
