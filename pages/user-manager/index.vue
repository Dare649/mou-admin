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
                        <li class="breadcrumb-item active">Users</li>
                    </ol>
                </div>
            </div>
            <!-- END BREADCRUMBS -->
            <!-- START CONTAINER FLUID -->
            <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
                <div class="card card-default">
                    <div class="card-header  separator">
                        <h3 class="text-primary no-margin pull-left sm-pull-reset">Users</h3>
                        <div class="pull-right sm-pull-reset">
                            <button type="button" disabled class="btn btn-primary btn-sm" data-target="#add_role" data-toggle="modal"><i class="fa fa-plus"></i> &nbsp; <strong>Add New User</strong></button>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-condensed" id="basicTable">
                                <thead>
                                <th style="width:30%">Name</th>
                                <th style="width:30%">Description</th>
                                <th style="width:20%">Status</th>
                                <th style="width:20%">Action</th>
                                </thead>
                                <tbody>
                                    <tr v-if="getLoading">
                                        <td colspan="4">Loading....Please wait.</td>
                                    </tr>
                                    <tr v-if="!getLoading && users.length < 1">
                                        <td colspan="4">No record at the moment... Please insert new record</td>
                                    </tr>
                                    <tr v-for="user in users" :key="user.id">
                                        <td>{{user.name}}</td>
                                        <td>{{user.email}}</td>
                                        <td><strong>{{user.name}}</strong></td>
                                        <td>
                                            <div class="btn-group">
                                                <span data-placement="top" data-toggle="tooltip" title="Edit Role">
                                                    <a href="#" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-pencil"></i></a>
                                                </span>
                                                
                                                <!-- <span data-placement="top" data-toggle="tooltip" title="Manage Permission">
                                                    <a href="#manage_permission" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-cog"></i></a>
                                                </span>
                                                <button type="button" class="btn btn-default btn-sm" data-placement="top" data-toggle="tooltip" title="Delete Record"><i class="pg-trash"></i></button> -->
                                            </div>
                                            <div class="btn-group open">
                                                <a class="btn btn-primary" href="#"><i class="fa fa-cog"></i></a>
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
        <!-- Edit Role -->
            <div class="modal fade SlideUp" id="edit_role" tabindex="-1" role="dialog" aria-hidden="true">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    <i class="pg-close"></i>
                </button>
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="text-left p-b-5"><span class="semi-bold">Edit Role</span></h5>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="row">
                                    <div class="col-lg-12 m-b-10">
                                        <input type="text" placeholder="Name" class="form-control" id="icon-filter" name="icon-filter">
                                    </div>
                                    <div class="col-lg-12 m-b-10">
                                        <input type="text" placeholder="Description" class="form-control" id="icon-filter" name="icon-filter">
                                    </div>
                                    <div class="col-lg-12 m-b-10">
                                        <select class="full-width" data-init-plugin="select2">
                                            <option value="" disabled selected>Status</option>
                                            <option value="M">M</option>
                                            <option value="F">F</option>
                                        </select>
                                    </div>
                                    <div class="col-lg-12">
                                        <button type="button" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Add Record</button>
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
                            <form>
                                <div class="row">
                                    <div class="col-lg-12 m-b-10">
                                        <input type="text" placeholder="Name" class="form-control" id="icon-filter" name="icon-filter">
                                    </div>
                                    <div class="col-lg-12 m-b-10">
                                        <input type="text" placeholder="Description" class="form-control" id="icon-filter" name="icon-filter">
                                    </div>
                                    <div class="col-lg-12 m-b-10">
                                        <select class="full-width" data-init-plugin="select2">
                                            <option value="" disabled selected>Status</option>
                                            <option value="M">M</option>
                                            <option value="F">F</option>
                                        </select>
                                    </div>
                                    <div class="col-lg-12">
                                        <button type="button" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Add Record</button>
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
                            <h5 class="text-left p-b-5"><span class="semi-bold">Manage Permissions: {{currentUserSelected}}</span></h5>
                            <span @click="selectAll()">
                                <input type="checkbox" :value="permissions" v-model="checked" id="all">
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

            <div class="modal fade SlideUp" id="assign_admin_role" tabindex="-1" role="dialog" aria-hidden="true">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    <i class="pg-close"></i>
                </button>
                <div class="modal-dialog" style="width: 1280px">
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
                            <span @click="selectAllRoles()">
                                <input type="checkbox" :value="roles" v-model="checked" id="all">
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
                                                <input type="checkbox" v-bind:id="'role'+role.id" :value="role.id" v-model="selectedRoles">
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
            subjects: [],
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
        selectAllRoles(){
            if(this.checked){
                this.permis.checked = false
            }else{
                this.permis.checked = true
            }
        },
        updateUserRoles(){
            this.updateLoading = true
            let bodyFormData = new FormData();
            bodyFormData.set('user_id', this.model.user_id)
            if(this.selectedRoles.length != 0){
                for(var i=0; i<this.selectedRoles.length; i++){
                    bodyFormData.append('roles[]', this.selectedRoles[i])
                }
            }else{
                bodyFormData.append('roles[]', this.selectedRoles)
            }
            this.$store
                .dispatch('roles/updateUserRoles', bodyFormData)
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                        this.populateRoleCheckboxes(this.user)
                        this.updateLoading = false
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
            for(var i=0; i<this.selectedPermissions.length; i++){
                bodyFormData.append('permissions[]', this.selectedPermissions[i])
            }
            this.$store
                .dispatch('roles/updateUserPermissions', bodyFormData)
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                        this.populatePermissionCheckboxes(this.user)
                        this.updateLoading = false
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
        deleteSubject(){
            this.deleteLoading = true
            this.$store
                .dispatch('get-started/deleteSubject', this.model.id)
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                    this.deleteLoading = false
                    this.getSubjects()
                    $( '#delete_subject' ).modal( 'hide' ).data( 'bs.modal', null );
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
        submitEditedSubject(){
            this.editLoading = true
            let bodyFormData = new Object();
            let payload = {}
            bodyFormData.name = this.model.edit_name
            bodyFormData.prefix = this.model.edit_prefix
            bodyFormData.status = this.model.edit_status
            payload.id = this.model.edit_id
            payload.bodyFormData = bodyFormData
            this.$store
            .dispatch('get-started/updateSubject', payload)
            .then(res => {
            if(res != undefined){
                if(res.status == true){
                    this.editLoading = false
                    this.getSubjects()
                    $('#edit_subject').modal('hide').data( 'bs.modal', null )
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
        createSubject(){
            this.loading = true
            let bodyFormData = new FormData();
            bodyFormData.set('name', this.model.name)
            bodyFormData.set('prefix', this.model.prefix)
            bodyFormData.set('status', this.model.status)
            this.$store
            .dispatch('get-started/createSubject', bodyFormData)
            .then(res => {
            if(res != undefined){
                if(res.status == true){
                    this.getSubjects()
                    this.loading = false
                    $('#add_o_subject').modal('hide').data( 'bs.modal', null )
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
        getAllUsers(page){
            //if(this.$laravel.hasPermission('View subject')){
            this.getLoading = true
            this.$store
                .dispatch('roles/getAllUsers', page)
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                        this.getLoading = false
                        this.users = res.data.data
                        this.pagination = res.data
                        //console.log(this.countries)
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
    mounted: function() {
        if (!process.server) {
            const script1 = document.createElement('script')
            script1.type = 'text/javascript'
            script1.src = '/pages/js/pages.min.js'
            document.head.appendChild(script1)
        }
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
