<template>
  <div class="content sm-gutter">
    <!-- START BREADCRUMBS -->
    <div class="bg-white">
      <div class="container p-l-5">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
          <li class="breadcrumb-item"><a href="#">Utilities</a></li>
          <li class="breadcrumb-item active">Student Utilities</li>
        </ol>
      </div>
    </div>
    <!-- END BREADCRUMBS -->

    <!-- START CONTAINER FLUID -->
    <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
      <div class="card card-default">
        <div class="card-header">
          <div class="card-title text-primary">Student Utilities</div>
        </div>
        <div class="card-body">
          <form style="width: 100%" @submit.prevent="getAllStudents(1)">
            <div class="row">
              <div class="col-md-5">
                <input type="text" v-model="formData.jamb_number" class="form-control" placeholder="Jamb Reg Number" />
              </div>
              <div class="col-md-5">
                <input type="text" v-model="formData.matric_number" class="form-control" placeholder="Matriculation Number" />
              </div>
              <div class="col-md-2">
                <button type="submit" id="searchBtn" class="btn btn-primary btn-block">Search Record</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="card card-default">
        <div class="card-header separator">
          <h3 class="text-primary no-margin pull-left sm-pull-reset">Student Details</h3>
          <div class="pull-right sm-pull-reset">
            <button type="button" @click="refreshStudents" class="btn btn-success btn-sm"><i class="fa fa-refresh"></i>&nbsp; Refresh </button>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-striped table-condensed" id="basicTable">
              <thead>
                <tr>
                  <th style="width: 8%;">Image</th>
                  <th style="width:22%;">Matric No.</th>
                  <th>Reg No.</th>
                  <th style="width:25%;">Name</th>
                  <th>Phone</th>
                  <th style="">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="loading"><td colspan="7">Loading...Please wait</td></tr>
                <tr v-if="!loading && students.length < 1"><td colspan="7">No records at the moment</td></tr>
                <tr v-if="!loading && students.length > 0" v-for="student in students">
                  <td v-if="student.photo === null || student.photo === ''">
                    <img src="/assets/img/avatar.png" width="50px" height="50px"/>
                  </td>
                  <td v-else>
                    <img :src="student.photo" width="50px" height="50px" />
                  </td>
                  <td>{{student.matriculation_number}}</td>
                  <td>{{student.jamb_number}}</td>
                  <td>{{student.firstname}} {{student.lastname}}</td>
                  <td>{{student.phone1}}</td>
                  <td>
                    <div class="btn-group">
                      <span data-placement="top" data-toggle="tooltip" title="View Login Details">
                        <a href="javascript:;" @click="viewLoginDetails(student)" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-eye"></i></a>
                      </span>
                      <span data-placement="top" data-toggle="tooltip" title="Edit Bio Data Form">
                        <a href="javascript:;" @click="bioDataForm(student)" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-edit"></i></a>
                      </span>
                      <span data-placement="top" data-toggle="tooltip" title="Change Level">
                        <a href="javascript:;" @click="changeLevel(student)" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-address-book-o"></i></a>
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <Pagination
              v-bind:pagination="pagination"
              v-on:click.native="getAllStudents(pagination.current_page)"
              :offset="4">
            </Pagination>
          </div>
        </div>
      </div>
    </div>
    <!-- END CONTAINER FLUID -->

    <!-- LOGIN MODAL STARTS HERE -->
    <div class="modal fade SlideUp" id="view_login_details" tabindex="-1" role="dialog" aria-hidden="true">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        <i class="pg-close"></i>
      </button>
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="text-left p-b-5"><span class="semi-bold">STUDENT LOGIN DETAILS</span></h5>
          </div>
          <div class="modal-body jamb_view">
            <h5 >{{loginData.name}}</h5>
            <ul class="info">
              <li>
                <small>Matric Number:</small> <br />
                <span>{{loginData.matriculation_number}}</span>
              </li>
              <li>
                <small>Jamb Reg. No:</small> <br />
                <span>{{loginData.jamb_number}}</span>
              </li>
              <div class="clearfix"></div>
            </ul>

            <table class="table table-striped table-bordered">
              <tr>
                <th>Username:</th>
                <td>{{loginData.username}}</td>
              </tr>
              <tr>
                <th>Password:</th>
                <td>{{loginData.password}}</td>
              </tr>
            </table>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <!-- LOGIN MODAL ENDS HERE -->

    <div class="modal fade SlideUp" id="edit_bio_data" tabindex="-1" role="dialog" aria-hidden="true">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        <i class="pg-close"></i>
      </button>
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="text-left p-b-5"><span class="semi-bold">EDIT STUDENT BIO-DATA</span></h5>
          </div>
          <div class="modal-body">
            <form class="full-width" @submit.prevent="editBioData">
              <div class="row">
                <div class="col-md-6">
                  <label>Matriculation No.:</label>
                  <input type="text" readonly v-model="bioData.matriculation_number" class="form-control" />
                </div>
                <div class="col-md-6">
                  <label>Jamb Reg. No.</label>
                  <input type="text" v-model="bioData.jamb_number" readonly class="form-control" />
                </div>
              </div>
              <div class="row m-t-5">
                <div class="col-md-6">
                  <label>First Name:</label>
                  <input type="text" v-model="bioData.firstname" class="form-control" />
                </div>
                <div class="col-md-6">
                  <label>Last Name:</label>
                  <input type="text" v-model="bioData.lastname" class="form-control" />
                </div>
              </div>
              <div class="row m-t-5">
                <div class="col-md-6">
                  <label>Middle Name:</label>
                  <input type="text" v-model="bioData.middlename" class="form-control" />
                </div>
                <div class="col-md-6">
                  <label>Photo.</label>
                  <input type="file" ref="file" class="form-control" />
                </div>
              </div>
              <div class="row m-t-5">
                <div class="col-md-6">
                  <label>Address:</label>
                  <input type="text" v-model="bioData.address" class="form-control" />
                </div>
                <div class="col-md-6">
                  <label>Country:</label>
                  <select class="form-control" @change="getStatesByCountry" v-model="bioData.country_id">
                    <option value="" selected>Select</option>
                    <option v-for="country in countries" :value="country.id">{{country.name}}</option>
                  </select>
                </div>
              </div>
              <div class="row m-t-5">
                <div class="col-md-6">
                  <label>State:</label>
                  <select class="form-control" @change="getLgaByState" v-model="bioData.state_id">
                    <option value="" selected>Select</option>
                    <option v-for="state in states" :value="state.id">{{state.name}}</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label>LGA:</label>
                  <select class="form-control" v-model="bioData.lga_id">
                    <option value="" selected>Select</option>
                    <option v-for="lga in lgas" :value="lga.id">{{lga.name}}</option>
                  </select>
                </div>
              </div>
              <div class="row m-t-5">
                <div class="col-md-6">
                  <label>College:</label>
                  <select class="form-control" @change="getDepartments" v-model="bioData.faculty_id">
                    <option value="" selected>Select</option>
                    <option v-for="college in colleges" :value="college.id">{{college.name}}</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label>Department:</label>
                  <select class="form-control" @change="getPrograms" v-model="bioData.department_id">
                    <option value="" selected>Select</option>
                    <option v-for="department in departments" :value="department.id">{{department.name}}</option>
                  </select>
                </div>
              </div>
              <div class="row m-t-5">
                <div class="col-md-12">
                  <label>Program:</label>
                  <select class="form-control" v-model="bioData.program_id">
                    <option value="" selected>Select</option>
                    <option v-for="program in programs" :value="program.id">{{program.name}}</option>
                  </select>
                </div>
              </div>
              <div class="row m-t-5">
                <div class="col-md-6">
                  <label>Email:</label>
                  <input type="email" v-model="bioData.email" class="form-control" />
                </div>
                <div class="col-md-6">
                  <label>DOB:</label>
                  <input type="date" v-model="bioData.dob" class="form-control" />
                </div>
              </div>
              <div class="row m-t-5">
                <div class="col-md-6">
                  <label>Gender:</label>
                  <select class="form-control" v-model="bioData.gender">
                    <option value="" selected>Select</option>
                    <option value="F">Female</option>
                    <option value="M">Male</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label>Marital Status:</label>
                  <select class="form-control" v-model="bioData.marital_status">
                    <option value="" selected>Select</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                  </select>
                </div>
              </div>
              <div class="row m-t-5">
                <div class="col-md-6">
                  <label>Phone 1:</label>
                  <input type="text" v-model="bioData.phone1" class="form-control" />
                </div>
                <div class="col-md-6">
                  <label>Phone 2:</label>
                  <input type="text" v-model="bioData.phone2" class="form-control" />
                </div>
              </div>
              <div class="row m-t-5">
                <div class="col-md-4">
                  <label>Username:</label>
                  <input type="text" v-model="bioData.username" class="form-control" />
                </div>
                <div class="col-md-4">
                  <label>Password:</label>
                  <input type="password" v-model="bioData.password" class="form-control" />
                </div>
                <div class="col-md-4">
                  <label>Password Confirmation:</label>
                  <input type="password" v-model="bioData.password_confirmation" class="form-control" />
                </div>
              </div>
              <hr />
              <div class="row m-t-5">
                <div class="col-md-4">
                  <label>Parent Name:</label>
                  <input type="text" v-model="bioData.parent_name" class="form-control" />
                </div>
                <div class="col-md-4">
                  <label>Parent Email:</label>
                  <input type="email" v-model="bioData.parent_email" class="form-control" />
                </div>
                <div class="col-md-4">
                  <label>Parent Phone:</label>
                  <input type="text" v-model="bioData.parent_phone" class="form-control" />
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-lg-12 m-t-10">
                  <button type="submit" id="submitBtn" class="btn btn-primary btn-sm">Save Changes</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>

    <div class="modal fade SlideUp" id="student-level" tabindex="-1" role="dialog" aria-hidden="true">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        <i class="pg-close"></i>
      </button>
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="text-left p-b-5"><span class="semi-bold">STUDENT LEVEL CHANGE</span></h5>
          </div>
          <div class="modal-body jamb_view">
            <h5 >{{ levelData.name }}</h5>
            <ul class="info">
              <li>
                <small>Matric. Number:</small> <br />
                <span>{{ levelData.matriculation_number }}</span>
              </li>
              <li>
                <small>Jamb Reg. No:</small> <br />
                <span>{{ levelData.jamb_number }}</span>
              </li>
              <li>
                <small>Current Level:</small> <br />
                <span>{{ levelData.level }}</span>
              </li>
              <div class="clearfix"></div>
            </ul>
            <br />
            <form class="full-width" @submit.prevent="changeStudentLevel">
              <div class="row">
                <div class="col-md-12">
                  <label>New Level:</label>
                  <select class="form-control" required v-model="levelData.level_id">
                    <option value="" selected>Select</option>
                    <option value="1">100</option>
                    <option value="2">200</option>
                    <option value="3">300</option>
                    <option value="4">400</option>
                    <option value="5">500</option>
                    <option value="6">600</option>
                  </select>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-lg-12 m-t-10">
                  <button type="submit" id="changeLevelBtn" class="btn btn-primary btn-sm">Save Changes</button>
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
  layout: 'main',
  components: {
    Pagination
  },
  data() {
    return {
      loading: true,
      levelData: {
        name: '',
        matriculation_number: '',
        jamb_number: '',
        level: '',
        level_id: '',
        student_id: ''
      },
      formData: {
        matric_number: '',
        jamb_number: ''
      },
      loginData: {
        username: '',
        password: '',
        name: '',
        jamb_number: '',
        matriculation_number: ''
      },
      bioData: {
        address: '',
        country_id: '',
        dob: '',
        email: '',
        firstname: '',
        middlename: '',
        lastname: '',
        jamb_number: '',
        lga_id : '',
        password: '',
        password_confirmation: '',
        gender: '',
        marital_status: '',
        matriculation_number: '',
        parent_email: '',
        parent_name: '',
        parent_phone: '',
        phone1: '',
        phone2: '',
        photo: '',
        state_id: '',
        username: '',
        faculty_id: '',
        department_id: '',
        program_id: ''
      },
      pagination: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      students: [],
      countries: [],
      states: [],
      lgas: [],
      colleges: [],
      departments: [],
      programs: []
    }
  },
  methods: {
    searchData() {

    },
    editBioData() {
      if(confirm('Do you want to update this student\'s biodata for?')){
        $('#submitBtn').attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i> Saving...');
        this.data = new FormData()
        this.data.append('photo', this.$refs.file.files[0])
        this.data.append('address', this.bioData.address)
        this.data.append('country_id', this.bioData.country_id)
        this.data.append('dob', this.bioData.dob)
        this.data.append('email', this.bioData.email)
        this.data.append('firstname', this.bioData.firstname)
        this.data.append('middlename', this.bioData.middlename);
        this.data.append('lastname', this.bioData.lastname)
        this.data.append('jamb_number', this.bioData.jamb_number)
        this.data.append('lga_id', this.bioData.lga_id)
        this.data.append('password', this.bioData.password)
        this.data.append('password_confirmation', this.bioData.password_confirmation)
        this.data.append('gender', this.bioData.gender)
        this.data.append('marital_status', this.bioData.marital_status)
        this.data.append('matriculation_number', this.bioData.matriculation_number)
        this.data.append('parent_email', this.bioData.parent_email)
        this.data.append('parent_name', this.bioData.parent_name)
        this.data.append('parent_phone', this.bioData.parent_phone)
        this.data.append('phone1', this.bioData.phone1)
        this.data.append('phone2', this.bioData.phone2)
        this.data.append('state_id', this.bioData.state_id)
        this.data.append('username', this.bioData.username)
        this.data.append('faculty_id', this.bioData.faculty_id)
        this.data.append('department_id', this.bioData.department_id)
        this.data.append('program_id', this.bioData.program_id)

        this.$store.dispatch('student/updateBioData', this.data)
          .then(res => {
            $('#submitBtn').attr('disabled', false).html('Save Changes');
            if(res.data.status) {
              this.$toast.success('Student bio-data was successfully updated')
              this.getAllStudents(this.pagination.current_page)
              this.clearFormData()
              $('#edit_bio_data').modal('hide')
              return
            }

            this.$toast.error(res.data.message)
          }).catch(err =>{
          $('#submitBtn').attr('disabled', false).html('Save Changes');
            this.$toast.error(err)
        })
      }
    },
    clearFormData() {
      const input = this.$refs.file;
      input.type = 'text';
      input.type = 'file';
      this.bioData = {
        address: '',
        country_id: '',
        dob: '',
        email: '',
        firstname: '',
        middlename: '',
        lastname: '',
        jamb_number: '',
        lga_id : '',
        password: '',
        password_confirmation: '',
        gender: '',
        marital_status: '',
        matriculation_number: '',
        parent_email: '',
        parent_name: '',
        parent_phone: '',
        phone1: '',
        phone2: '',
        state_id: '',
        username: '',
        faculty_id: '',
        department_id: '',
        program_id: ''
      }
    },
    getAllStudents(page) {
      this.students = []
      this.loading = true
      this.formData.page = page
      this.$store.dispatch('student/getAllStudents', this.formData)
        .then(res =>{
          this.students = res.data.data.data
          this.pagination = res.data.data
          this.loading = false
        }).catch(err =>{
        this.loading = false
        this.$toast.error(err)
      })
    },
    viewLoginDetails(student) {
      this.loginData.name = student.firstname + ' ' + student.lastname
      this.loginData.matriculation_number = student.matriculation_number
      this.loginData.jamb_number = student.jamb_number
      this.loginData.username = student.username
      this.loginData.password = student.password
      $("#view_login_details").modal()
    },
    bioDataForm(student) {
      this.bioData.country_id = student.country_id
      this.bioData.state_id = student.state_id
      this.bioData.lga_id = student.lga_id
      this.bioData.matriculation_number = student.matriculation_number
      this.bioData.firstname = student.firstname
      this.bioData.lastname = student.lastname
      this.bioData.middlename = student.middlename
      this.bioData.jamb_number = student.jamb_number
      this.bioData.state_id = student.state_id
      this.bioData.gender = student.gender
      this.bioData.marital_status = student.marital_status
      this.bioData.username = student.username
      this.bioData.phone2 = student.phone2
      this.bioData.phone1 = student.phone1
      this.bioData.parent_name = student.parent_name
      this.bioData.parent_email = student.parent_email
      this.bioData.parent_phone = student.parent_phone
      this.bioData.address = student.address
      this.bioData.dob = student.dob
      this.bioData.email = student.email
      this.bioData.faculty_id = student.faculty_id
      this.bioData.department_id = student.department_id
      this.bioData.program_id = student.program_id
      this.getDepartments()
      this.getPrograms()
      this.getLgaByState()
      this.getStatesByCountry()

      $('#edit_bio_data').modal()
    },
    changeLevel(student) {
      this.levelData = {
        name: student.firstname + ' ' + student.lastname + ' ' + student.middlename,
        matriculation_number: student.matriculation_number,
        level: student.level.name,
        jamb_number: student.jamb_number,
        level_id: '',
        student_id: student.id
      }
      $('#student-level').modal()
    },
    changeStudentLevel () {
      $('#changeLevelBtn').attr('disabled', true).html('Changing..please wait')
      this.$store.dispatch('student/changeStudentLevel', this.levelData)
        .then(res =>{
          $('#changeLevelBtn').attr('disabled', false).html('Save Changes')
          if(res.data.success) {
            this.$toast.success(res.data.message)
            $('#student-level').modal('hide')
            this.getAllStudents(this.pagination.current_page)
            return
          }

          this.$toast.error(res.data.message)
        }).catch(err =>{
          $('#changeLevelBtn').attr('disabled', false).html('Save Changes')
          this.$toast.error('An error occurred')
        })
    },
    refreshStudents() {
      this.formData.matric_number = ''
      this.formData.jamb_number = ''
      this.getAllStudents(1)
    },
    getCountries() {
      this.$store.dispatch('utility/getCountries')
        .then(res =>{
          this.countries = res.data
        }).catch(err =>{
          this.$toast.error(err)
      })
    },
    getStatesByCountry() {
      this.$store.dispatch('utility/getStateByCountry', this.bioData.country_id)
        .then(res =>{
          this.states = res.data
        }).catch(err =>{
          this.$toast.error(err)
      })
    },
    getLgaByState() {
      this.$store.dispatch('utility/getLgaByState', this.bioData.state_id)
        .then(res =>{
          this.lgas = res.data
        }).catch(err =>{
        this.$toast.error(err)
      })
    },
    getColleges() {
      this.$store.dispatch('utility/getFaculties')
        .then(res =>{
          this.colleges = res.data
        }).catch(err =>{
        this.$toast.error(err)
      })
    },
    getDepartments() {
      this.$store.dispatch('utility/getDepartmentByFaculty', this.bioData.faculty_id)
        .then(res =>{
          this.departments = res.data
        }).catch(err =>{
        this.$toast.error(err)
      })
    },
    getPrograms() {
      this.$store.dispatch('utility/getProgramByDept', this.bioData.department_id)
        .then(res =>{
          this.programs = res.data.data
        }).catch(err =>{
        this.$toast.error(err)
      })
    }
  },
  mounted() {
    this.getCountries()
    this.getColleges()
    this.getAllStudents(this.pagination.current_page)
  }
}
</script>
