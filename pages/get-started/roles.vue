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
                        <li class="breadcrumb-item active">Roles</li>
                    </ol>
                </div>
            </div>
            <!-- END BREADCRUMBS -->
            <!-- START CONTAINER FLUID -->
            <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
                <div class="card card-default">
                    <div class="card-header">
                        <h3 class="text-primary no-margin pull-left sm-pull-reset">Roles</h3>
                        <div class="pull-right sm-pull-reset">
                            <button type="button" class="btn btn-primary btn-sm" data-target="#add_role" data-toggle="modal"><i class="fa fa-plus"></i> &nbsp; <strong>Add New Role</strong></button>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-condensed" id="basicTable">
                                <thead>
                                <th style="width:50%">Name</th>
                                <th style="width:30%">Guard Name</th>
                                <th style="width:20%">Action</th>
                                </thead>
                                <tbody>
                                  <tr v-if="getLoading">
                                    <td colspan="4">Loading....Please wait.</td>
                                  </tr>
                                  <tr v-if="!getLoading && roles.length < 1">
                                    <td colspan="4">No record at the moment... Please insert new record</td>
                                  </tr>
                                  <!-- <tr v-if="!IsPermitted">
                                    <td colspan="4" style="color: red; font-size:18px;"><i class="fa fa-warning"></i>&nbsp; Not Permitted to view this records!</td>
                                  </tr> -->
                                  <tr v-else v-for="role in roles" :key="role.id">
                                      <td>{{role.name}}</td>
                                      <td>{{role.guard_name}}</td>
                                      <td>
                                          <div class="btn-group">
                                              <span data-placement="top" @click="populateFields(role)" data-toggle="tooltip" title="Edit Record">
                                                  <a href="#edit_role"  class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-pencil"></i></a>
                                              </span>
                                              <!-- <span data-placement="top" @click="setId(role.id)" data-toggle="tooltip" title="Delete Record">
                                                  <a href="#delete_role"  class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-user-times"></i></a>
                                              </span> -->
                                              <span data-placement="top" @click="populatePermissionCheckboxes(role)" data-toggle="tooltip" title="Manage Permissions">
                                                <a href="#manage_permission" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-cog"></i></a>
                                             </span>
                                             <span data-placement="top" @click="populateUsersRoleView(role)" data-toggle="tooltip" title="View Users">
                                                <a href="#users_role" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-users" aria-hidden="true"></i></a>
                                             </span>
                                          </div>
                                      </td>
                                  </tr>
                                </tbody>
                            </table>
                            <Pagination
                              v-bind:pagination="pagination"
                              v-on:click.native="getSubjects(pagination.current_page)"
                              :offset="4">
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END CONTAINER FLUID -->
        </div>
        <!-- Edit Role -->
            <!-- Edit Modal -->
        <div class="modal fade SlideUp" id="edit_role" tabindex="-1" role="dialog" aria-hidden="true">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                <i class="pg-close"></i>
            </button>
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="text-left p-b-5"><span class="semi-bold">Edit Information</span></h5>
                    </div>
                    <div class="modal-body">
                        <form class="full-width" @submit.prevent="submitEditedRole">
                            <div class="row">
                                <div class="col-lg-12 m-b-10">
                                    <input type="text" v-model="model.edit_name" placeholder="Name" class="form-control">
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

            <!-- Add Role -->
            <div class="modal fade SlideUp" id="add_role" tabindex="-1" role="dialog" aria-hidden="true">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    <i class="pg-close"></i>
                </button>
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="text-left p-b-5"><span class="semi-bold">Add New Role</span></h5>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-lg-12 m-b-10">
                                    <input type="text" v-model="model.name" placeholder="Name" class="form-control input-lg" id="icon-filter" name="icon-filter">
                                </div>
                                <!-- <div class="col-lg-12 m-b-10">
                                    <input type="text" v-model="model.guard_name" placeholder="Guard Name" class="form-control input-lg" id="icon-filter" name="icon-filter">
                                </div> -->
                                <div class="col-lg-12">
                                    <button type="button" v-if="!loading" @click="createRole()" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Add Record</button>
                                    <button type="button" v-if="loading" disabled class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Adding Record</button>
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

            <!-- Add Role -->
            <div class="modal fade SlideUp" id="users_role" tabindex="-1" role="dialog" aria-hidden="true">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    <i class="pg-close"></i>
                </button>
                <div class="modal-dialog" style="width: 95%">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="text-left p-b-5"><span class="semi-bold">View Role Users: {{assignedUserRoles.name}}</span></h5>
                        </div>

                        <div class="modal-body">
                            <div style="text-align:center; font-size:24px;" v-if="usersRoleLoading">
                                <i class="fa fa-spinner fa-spin fa-3x fa-fw" aria-hidden="true"></i>
                            </div>
                            <form v-if="!usersRoleLoading">
                                <div class="row" >
                                    <div class="col-lg-3 m-b-10" v-for="usersrole in assignedUserRoles.users" :key="usersrole.id">
                                        <div class="text-body mb-10">
                                            <!-- <h6 class="font-weight-bold">Faculties</h6> -->
                                            <div class="checkbox check-primary mt-0 mb-0 pl-2"  >
                                                <span><i class="fa fa-check" aria-hidden="true"></i> <label :for="'permission'+usersrole.id" >{{usersrole.name}}</label></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <!-- /.modal-content -->
                </div>
                <!-- /.modal-dialog -->
            </div>
            <!-- Add Role -->
            <div class="modal fade SlideUp" id="manage_permission" tabindex="-1" role="dialog" aria-hidden="true">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    <i class="pg-close"></i>
                </button>
                <div class="modal-dialog" style="width: 95%">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="text-left p-b-5"><span class="semi-bold">Manage Permission</span></h5>
                            <span>
                                <input type="checkbox" :value="permissions" v-model="selectAllPermissions">
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
                                            <div class="checkbox check-primary mt-0 mb-0 pl-2"  >
                                                <input type="checkbox" v-bind:id="'permission'+permission.id" :value="permission.id" v-model="selectedPermissions">
                                                <label :for="'permission'+permission.id" >{{permission.name}}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <button type="button" v-if="!updateLoading" @click="updateRolePermissions()" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Save Changes</button>
                                    <button type="button" v-if="updateLoading" disabled class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Updating</button>
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
// import SubjectForm from '../../components/Modals/SubjectFormModal';
// import UploadSubjects from '../../components/Modals/UploadSubjectsModal';
export default {
    name: "roles",
    layout: "main",
    middleware: "auth",
    components: {
        // SubjectForm,
        // UploadSubjects
        Pagination
    },
    data(){
        return {
            addloading: false,
            downloading: false,
            loading: false,
            IsPermitted: true,
            deleteLoading: false,
            editLoading: false,
            updateLoading: false,
            permissions: [],
            selectedPermissions:[],
            assignedUserRoles: [],
            getLoading: true,
            exportLoading: false,
            usersRoleLoading: false,
            permissionLoading: false,
            checked: false,
            file: "",
            roles:[],
            role:{},
            assignLoading: false,
            role_id: 0,
            permis: {
                checked: false
            },
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
              role_id: 0,
              edit_name: "",
              edit_id: 0
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
        populateUsersRoleView(role){
            this.assignedUserRoles = []
            this.model.role_id = role.id
            this.role = role

            this.getRoleUsers(role.id)
        },
        populatePermissionCheckboxes(role){
            this.selectedPermissions = []
            this.model.role_id = role.id
            this.role = role

            this.getRolePermissions(role.id)
            this.getAllPermissions();
        },
        updateRolePermissions(){
            this.updateLoading = true
            let bodyFormData = new FormData();
            bodyFormData.set('role_id', this.model.role_id)
            if(this.selectedPermissions.length != 0){
                for(var i=0; i<this.selectedPermissions.length; i++){
                    bodyFormData.append('permissions[]', this.selectedPermissions[i])
            }
            }else{
                bodyFormData.append('permissions[]', this.selectedPermissions)
            }
            this.$store
            .dispatch('roles/updateRolePermissions', bodyFormData)
            .then(res => {
            if(res != undefined){
                if(res.status == true){
                    this.populatePermissionCheckboxes(this.role)
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
        getRolePermissions(id){
            this.$store
                .dispatch('roles/getRolePermissions', id)
                .then(res => {
                    if(res != undefined){
                        if(res.status == true){
                            for(var i=0; i<res.data.length; i++){
                                this.selectedPermissions.push(res.data[i].id)
                            }
                        }else{
                            this.ErrMsg = "Error fetching data!"
                        }
                    }else{
                        this.ErrMsg = "Error fetching data!"
                    }
            }).catch(err => {
            })
        },
        getRoleUsers(id){
            this.usersRoleLoading = true
            this.$store
                .dispatch('roles/getRoleUsers', id)
                .then(res => {
                    if(res != undefined){
                        if(res.status == true){
                            this.assignedUserRoles = res.data
                            this.usersRoleLoading = false
                        }else{
                            this.ErrMsg = "Error fetching data!"
                            this.usersRoleLoading = false
                        }
                    }else{
                        this.ErrMsg = "Error fetching data!"
                        this.usersRoleLoading = false
                    }
            }).catch(err => {
                this.usersRoleLoading = false
            })
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
        submitEditedRole(){
            this.editLoading = true
            let bodyFormData = new Object();
            let payload = {}
            bodyFormData.role_name = this.model.edit_name
            payload.id = this.model.edit_id
            payload.bodyFormData = bodyFormData
            this.$store
            .dispatch('roles/updateRole', payload)
            .then(res => {
            if(res != undefined){
                if(res.status == true){
                    this.editLoading = false
                    this.getRoles(this.pagination.current_page)
                    $('#edit_role').modal('hide').data( 'bs.modal', null )
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
        createRole(){
            this.loading = true
            let bodyFormData = new FormData();
            bodyFormData.set('role_name', this.model.name)
            //bodyFormData.set('guard_name', this.model.guard_name)
            this.$store
            .dispatch('roles/createRole', bodyFormData)
            .then(res => {
            if(res != undefined){
                if(res.status == true){
                    this.getRoles()
                    this.loading = false
                    $('#add_role').modal('hide')
                    this.model = {}
                }else{
                    this.loading = false
                    this.ErrMsg = "Error Creating Record!"
                }
            }else{
                this.loading = false
                this.ErrMsg = "Error Processing Request!"
            }
            }).catch(err => {
            this.loading = false
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
        uploadSubjects(){
            this.loading = true
            this.file = this.$refs.myFiles.files[0];
            let formData = new FormData();
            formData.append('file', this.file);
            this.$store
                .dispatch('get-started/uploadSubjects', formData)
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                        this.loading = false
                        this.getSubjects()
                        $('#upload_subjects').modal('hide').data( 'bs.modal', null )
                        this.$toast.success(res.message, {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
                    }else{
                        this.loading = false
                        alert("File Upload Unsuccessful")
                        this.ErrMsg = "Error Logging in!"
                    }
                }else{
                    this.loading = false
                    console.log(res)
                    alert("File Upload Unsuccessful")
                    this.ErrMsg = "Error Logging in!"
                }
            }).catch(err => {
            this.loading = false
            })
        },
        exportSubjects(){
            this.exportLoading = true
            this.$store
                .dispatch('get-started/exportSubjects')
                .then(res => {
                if(res != undefined){
                    this.loading = false
                    var fileURL = window.URL.createObjectURL(new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}));
                    var fileLink = document.createElement('a');

                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', 'subjects.xlsx');
                    document.body.appendChild(fileLink);

                    fileLink.click();

                    $( '#export_subjects' ).modal( 'hide' ).data( 'bs.modal', null )
                    this.exportLoading = false
                    this.$toast.success('Record Exported to Excel Successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
                }else{
                    this.exportLoading = false
                    alert("File Downloaded Unsuccessful")
                }
            }).catch(err => {
            this.exportLoading = false
            })
        },
        downloadSubjectSampleFile(){
            this.downloading = true
            this.$store
                .dispatch('get-started/downloadSubjectSampleFile')
                .then(res => {
                if(res != undefined){
                    if(res.success == true)    {
                        window.location = res.message
                        this.downloading = false
                        $('#upload_subject').modal('hide').data( 'bs.modal', null )
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
        getRoles(page){
            //if(this.$laravel.hasPermission('View subject')){
            let req = {}
            req.page = page
            req.pager = true
            this.getLoading = true
            this.$store
                .dispatch('roles/getRoles', req)
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                        this.getLoading = false
                        this.roles = res.data
                        this.pagination = res
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
            // }else{
            //     this.IsPermitted = false
            //     this.getLoading = false
            //     this.$router.push(
            //     decodeURIComponent(
            //         this.$route.query.redirect || "/dashboard"
            //     )
            // );
            // this.$toast.error("Not Permitted to access this page! Contact the admin.", { icon: "times" });
            // }
        }
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
        }
    },
    mounted: function() {
        if (!process.server) {
            const script1 = document.createElement('script')
            script1.type = 'text/javascript'
            script1.src = '/pages/js/pages.min.js'
            document.head.appendChild(script1)
        }
        this.getRoles(this.pagination.current_page)
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
