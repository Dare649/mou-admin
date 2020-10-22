<template>
  <div class="content sm-gutter">
    <!-- START BREADCRUMBS -->
    <div class="bg-white">
      <div class="container p-l-5">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
          <li class="breadcrumb-item"><a href="#">Personnel</a></li>
          <li class="breadcrumb-item"><nuxt-link to="/personnel/lecturers">Lecturer</nuxt-link></li>
          <li class="breadcrumb-item active">{{ (id === 'new') ? 'Add New' : 'Edit Details'}}</li>
        </ol>
      </div>
    </div>
    <!-- END BREADCRUMBS -->

    <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
      <h3 class="text-primary m-t-30">{{ (id === 'new') ? 'Add' : 'Edit'}} Lecturer</h3>
      <hr />
      <div id="rootwizard" class="m-t-20 m-b-20">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs nav-tabs-linetriangle nav-tabs-separator nav-stack-sm" role="tablist" data-init-reponsive-tabs="dropdownfx">
          <li class="nav-item">
            <a class="fs-11 active" data-toggle="tab" href="#step1" data-target="#step1" role="tab"><i class="fa fa-paper-plane tab-icon"></i> <span>User Details</span></a>
          </li>
          <li class="nav-item">
            <a class="fs-11" data-toggle="tab" href="#step2" data-target="#step2" role="tab"><i class="fa fa-paper-plane tab-icon"></i> <span>Educational Details</span></a>
          </li>
          <li class="nav-item">
            <a class="fs-11" data-toggle="tab" href="#step3" data-target="#step3" role="tab"><i class="fa fa-paper-plane tab-icon"></i> <span>Employment Details</span></a>
          </li>
          <li class="nav-item">
            <a class="fs-11" data-toggle="tab" href="#step4" data-target="#step4" role="tab"><i class="fa fa-paper-plane tab-icon"></i> <span>Promotion Details</span></a>
          </li>
          <li class="nav-item">
            <a class="fs-11" data-toggle="tab" href="#step5" data-target="#step5" role="tab"><i class="fa fa-paper-plane tab-icon"></i> <span>Spouse Details</span></a>
          </li>
          <li class="nav-item">
            <a class="fs-11" data-toggle="tab" href="#step6" data-target="#step6" role="tab"><i class="fa fa-paper-plane tab-icon"></i> <span>Children's Details</span></a>
          </li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content">
          <div class="tab-pane padding-20 sm-no-padding active slide-left" id="step1">
            <div class="row row-same-height">
              <ValidationObserver ref="step1" class=" full-width">
                <form style="width: 100%" class="" role="form" v-if="formData">
                    <div class="row">
                      <div class="col-md-4">
                            <div class="form-group form-group-default required">
                                <label>User Type</label>
                                <select class="form-control" data-placeholder="Semester" v-model="formData.user_type"  required>
                                    <option value="">Select Type</option>
                                    <option value="1">1st Semester</option>
                                    <option value="2">2nd Semester</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group form-group-default required">
                                <label>User Title</label>
                                <select class="form-control" data-placeholder="Semester"  required>
                                    <option value="">Select Title</option>
                                    <option value="1">Mr</option>
                                    <option value="2">Mrs</option>
                                    <option value="3">Master</option>
                                    <option value="4">Miss</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group form-group-default required">
                                <label>User Gender</label>
                                <select class="form-control" data-placeholder="Semester"  required>
                                    <option value="">Select Gender</option>
                                    <option value="1">Male</option>
                                    <option value="2">Female</option>
                                </select>
                            </div>
                        </div>                     
                    </div>

                    <div class="row">
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>User Name</label>
                              <input type="text" class="form-control" v-model="formData.username" required>
                          </div>
                      </div>
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Password</label>
                              <input type="text" class="form-control" v-model="formData.password" required>
                          </div>
                      </div>
                     <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Confirm Password</label>
                              <input type="text" class="form-control" v-model="formData.confirm_password" required>
                          </div>
                      </div>
                  </div>

                  <div class="row">
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Last Name</label>
                              <input type="text" class="form-control" v-model="formData.last_name" required>
                          </div>
                      </div>
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>First Name</label>
                              <input type="text" class="form-control" v-model="formData.first_name" required>
                          </div>
                      </div>
                     <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Middle Name</label>
                              <input type="text" class="form-control" v-model="formData.middle_name" required>
                          </div>
                      </div>
                  </div>

                  <div class="row">
                      <div class="col-md-4">
                            <div class="form-group form-group-default required">
                                <label>College</label>
                                <select class="form-control" data-placeholder="Semester" v-model="formData.college"  required>
                                    <option value="">Select College</option>
                                    
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group form-group-default required">
                                <label>Department</label>
                                <select class="form-control" data-placeholder="Semester"  required>
                                    <option value="">Select Department</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group form-group-default required">
                                <label>Marital Status</label>
                                <select class="form-control" data-placeholder="Semester"  required>
                                    <option value="">Select Gender</option>
                                    <option value="1">Single</option>
                                    <option value="2">Married</option>
                                    <option value="3">Divorced</option>
                                </select>
                            </div>
                        </div>                     
                    </div>

                    <div class="row">
                      <div class="col-md-4">
                            <div class="form-group form-group-default required">
                                <label>Country</label>
                                <select class="form-control" data-placeholder="Semester" v-model="formData.country"  required>
                                    <option value="">Select Country</option>
                                    
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group form-group-default required">
                                <label>State</label>
                                <select class="form-control" data-placeholder="Semester"  required>
                                    <option value="">Select State</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group form-group-default required">
                                <label>LGA</label>
                                <select class="form-control" data-placeholder="Semester"  required>
                                    <option value="">Select LGA</option>
                                    <option value="1">Male</option>
                                    <option value="2">Female</option>
                                </select>
                            </div>
                        </div>                     
                    </div>

                    <div class="row">
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Geo Political Zone</label>
                              <input type="text" class="form-control" v-model="formData.geo_political_zone" required>
                          </div>
                      </div>  
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Rank</label>
                              <input type="text" class="form-control" v-model="formData.username" required>
                          </div>
                      </div>
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Email</label>
                              <input type="text" class="form-control" v-model="formData.password" required>
                          </div>
                      </div>
                     
                  </div>

                  <div class="row">
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Residential Address</label>
                              <textarea type="text" class="form-control" v-model="formData.res_address" required></textarea>
                          </div>
                      </div>  
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Contact Number</label>
                              <input type="number" class="form-control" v-model="formData.number" required>
                          </div>
                      </div>
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Email</label>
                              <input type="text" class="form-control" v-model="formData.password" required>
                          </div>
                      </div>
                     
                  </div>

                  <div class="row">
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Residential Address</label>
                              <input type="date" class="form-control" v-model="formData.res_address" required>
                          </div>
                      </div>  
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Contact Number</label>
                              <input type="date" class="form-control" v-model="formData.number" required>
                          </div>
                      </div> 
                  </div>
                </form>
              </ValidationObserver>
            </div>
          </div>
          <div class="tab-pane slide-left padding-20 sm-no-padding" id="step2">
            <div class="row row-same-height p-2">
              <ValidationObserver ref="step2" class=" full-width">
                <form style="width: 100%" role="form" v-if="formData">
                   <div class="row" v-for="(input,k) in inputs" :key="k">
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Highest Qualification with date <br/> (Format: DegreeName(DD-MM-YYYY) <br/> E.g PhD(21-04-2010))</label>
                              <input type="text" class="form-control" v-model="input.qualification" required>
                          </div>
                      </div>  
                      <div class="col-md-3">
                          <div class="form-group form-group-default required">
                              <label>Institution Attended</label>
                              <input type="text" class="form-control" v-model="input.institution" required>
                          </div>
                      </div> 
                      <div class="col-md-3">
                          <div class="form-group form-group-default required">
                              <label>Subjects</label>
                              <input type="text" class="form-control" v-model="input.subjects" required>
                          </div>
                      </div> 
                      <div class="col-md-1" v-show="k || ( !k && inputs.length > 1)">
                          <span @click="remove(k)">
                              <div class="btn btn-info btn-lg btn-large fs-16 semi-bold btn-block" ><i class="fa fa-minus" ></i></div>                                                
                          </span>                                                                                                          
                      </div>
                      <div class="col-md-1" v-show="k == inputs.length-1">
                          <span @click="add(k)">
                              <div class="btn btn-info btn-lg btn-large fs-16 semi-bold btn-block" ><i class="fa fa-plus"></i></div>  
                          </span>  
                      </div>
                  </div>
                </form>
              </ValidationObserver>
            </div>
          </div>
          <div class="tab-pane slide-left padding-20 sm-no-padding" id="step3">
            <div class="row row-same-height">
              <ValidationObserver ref="step3" class=" full-width">
                <form class="full-width" role="form" v-if="formData">
                    <div class="row" v-for="(input,k) in employments" :key="k">
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Job Tittle</label>
                              <input type="text" class="form-control" v-model="input.job_title" required>
                          </div>
                      </div>  
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Organization</label>
                              <input type="text" class="form-control" v-model="input.organization" required>
                          </div>
                      </div> 
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                                <label>LGA</label>
                                <select class="form-control" data-placeholder="Semester" v-model="input.country"  required>
                                    <option value="">Select Country</option>
                                </select>
                            </div>
                      </div> 
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>From Date</label>
                              <input type="date" class="form-control" v-model="input.from_date" required>
                          </div>
                      </div>  
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>To Date</label>
                              <input type="date" class="form-control" v-model="input.to_date" required>
                          </div>
                      </div>  
                      <div class="col-md-1" v-show="k || ( !k && employments.length > 1)">
                          <span @click="removeEmployment(k)">
                              <div class="btn btn-info btn-lg btn-large fs-16 semi-bold btn-block" ><i class="fa fa-minus" ></i></div>                                                
                          </span>                                                                                                          
                      </div>
                      <div class="col-md-1" v-show="k == employments.length-1">
                          <span @click="addEmployment(k)">
                              <div class="btn btn-info btn-lg btn-large fs-16 semi-bold btn-block" ><i class="fa fa-plus"></i></div>  
                          </span>  
                      </div>
                    <hr class="col-md-12"/>
                  </div>
                  
                </form>
              </ValidationObserver>
            </div>
          </div>

          <div class="tab-pane slide-left padding-20 sm-no-padding" id="step4">
            <div class="row row-same-height">
              <ValidationObserver ref="step4" class=" full-width">
                <form class="full-width" role="form" v-if="formData">
                          <div class="row" v-for="(input,k) in promotions" :key="k">
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>old Position</label>
                              <input type="text" class="form-control" v-model="input.old_position" required>
                          </div>
                      </div>  
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>New Position</label>
                              <input type="text" class="form-control" v-model="input.new_position" required>
                          </div>
                      </div> 
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Grade Level (CONUASS II)</label>
                              <input type="text" class="form-control" v-model="input.grade_level" required>
                          </div>
                      </div>
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Comments</label>
                              <input type="text" class="form-control" v-model="input.comments" required>
                          </div>
                      </div>
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Promotion Date</label>
                              <input type="date" class="form-control" v-model="input.promotion_date" required>
                          </div>
                      </div>  
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>First Appointment Date</label>
                              <input type="date" class="form-control" v-model="input.first_appointment_date" required>
                          </div>
                      </div>  
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Present Appointment Date</label>
                              <input type="date" class="form-control" v-model="input.present_appointment_date" required>
                          </div>
                      </div>  
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Confirmation Date</label>
                              <input type="date" class="form-control" v-model="input.confirmation_date" required>
                          </div>
                      </div>  
                      <div class="col-md-1" v-show="k || ( !k && promotions.length > 1)">
                          <span @click="removePromotion(k)">
                              <div class="btn btn-info btn-lg btn-large fs-16 semi-bold btn-block" ><i class="fa fa-minus" ></i></div>                                                
                          </span>                                                                                                          
                      </div>
                      <div class="col-md-1" v-show="k == promotions.length-1">
                          <span @click="addPromotion(k)">
                              <div class="btn btn-info btn-lg btn-large fs-16 semi-bold btn-block" ><i class="fa fa-plus"></i></div>  
                          </span>  
                      </div>
                    <hr class="col-md-12"/>
                  </div>
                </form>
              </ValidationObserver>
            </div>
          </div>

          <div class="tab-pane slide-left padding-20 sm-no-padding" id="step5">
            <div class="row row-same-height">
              <ValidationObserver ref="step5" class=" full-width">
                <form class="full-width" role="form" v-if="formData">
                  <div class="row" v-for="(input,k) in spouses" :key="k">
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Spouse Name</label>
                              <input type="text" class="form-control" v-model="input.name" required>
                          </div>
                      </div>  
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Birth Place</label>
                              <input type="text" class="form-control" v-model="input.birth_place" required>
                          </div>
                      </div> 
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Birth Date</label>
                              <input type="date" class="form-control" v-model="input.birth_date" required>
                          </div>
                      </div>  
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Occupation</label>
                              <input type="text" class="form-control" v-model="input.occupation" required>
                          </div>
                      </div>  
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Present Address</label>
                              <textarea type="text" class="form-control" v-model="input.present_address" required></textarea>
                          </div>
                      </div> 
                      <div class="col-md-1" v-show="k || ( !k && spouses.length > 1)">
                          <span @click="removeSpouse(k)">
                              <div class="btn btn-info btn-lg btn-large fs-16 semi-bold btn-block" ><i class="fa fa-minus" ></i></div>                                                
                          </span>                                                                                                          
                      </div>
                      <div class="col-md-1" v-show="k == spouses.length-1">
                          <span @click="addSpouse(k)">
                              <div class="btn btn-info btn-lg btn-large fs-16 semi-bold btn-block" ><i class="fa fa-plus"></i></div>  
                          </span>  
                      </div>
                    <hr class="col-md-12"/>
                  </div>
                </form>
              </ValidationObserver>
            </div>
          </div>

          <div class="tab-pane slide-left padding-20 sm-no-padding" id="step6">
            <div class="row row-same-height">
              <ValidationObserver ref="step6" class=" full-width">
                <form class="full-width" role="form" v-if="formData">
                  <div class="row" v-for="(input,k) in children" :key="k">
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Spouse Name</label>
                              <input type="text" class="form-control" v-model="input.name" required>
                          </div>
                      </div>  
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Birth Place</label>
                              <input type="text" class="form-control" v-model="input.birth_place" required>
                          </div>
                      </div> 
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Birth Date</label>
                              <input type="date" class="form-control" v-model="input.birth_date" required>
                          </div>
                      </div>  
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Remarks</label>
                              <input type="text" class="form-control" v-model="input.remarks" required>
                          </div>
                      </div>  
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Present Address</label>
                              <textarea type="text" class="form-control" v-model="input.present_address" required></textarea>
                          </div>
                      </div> 
                      <div class="col-md-1" v-show="k || ( !k && children.length > 1)">
                          <span @click="removeChild(k)">
                              <div class="btn btn-info btn-lg btn-large fs-16 semi-bold btn-block" ><i class="fa fa-minus" ></i></div>                                                
                          </span>                                                                                                          
                      </div>
                      <div class="col-md-1" v-show="k == children.length-1">
                          <span @click="addChild(k)">
                              <div class="btn btn-info btn-lg btn-large fs-16 semi-bold btn-block" ><i class="fa fa-plus"></i></div>  
                          </span>  
                      </div>
                    <hr class="col-md-12"/>
                  </div>
                </form>
              </ValidationObserver>
            </div>
          </div>

          <div class="padding-20 sm-padding-5 sm-m-b-20 sm-m-t-20 bg-white clearfix">
            <ul class="pager wizard no-style">
              <li class="next">
                <button class="btn btn-primary btn-cons btn-animated from-left fa fa-truck pull-right" type="button">
                  <span>Next</span>
                </button>
              </li>
              <li class="next finish hidden" @click="submitRecord">
                <button class="btn btn-primary btn-cons btn-animated from-left fa fa-cog pull-right" id="submitForm" type="button">
                  <span>Finish</span>
                </button>
              </li>
              <li class="previous first hidden">
                <button class="btn btn-default btn-cons btn-animated from-left fa fa-cog pull-right" type="button">
                  <span>First</span>
                </button>
              </li>
              <li class="previous">
                <button class="btn btn-default btn-cons pull-right" type="button">
                  <span>Previous</span>
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createEditor } from 'vueditor';

export default {
  layout: 'main',
  data: () => ({
    config: {
      toolbar: [
        'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider',
        'bold', 'italic', 'underline', 'strikeThrough', 'links', 'divider', 'subscript', 'superscript',
        'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', '|', 'indent', 'outdent',
        'insertOrderedList', 'insertUnorderedList', '|', 'picture', 'tables', '|', 'switchView'
      ],
      fontName: [
        {val: 'arial black'},
        {val: 'times new roman'},
        {val: 'Courier New'}
      ],
      fontSize: [
        '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px'
      ],
    },
    id: '',
    inputs: [{
            name: '',
            party: ''
        }],
    spouses: [{
      name: "",
      birth_place: "",
      birth_date: "",
      occupation: "",
      present_address: ""
    }],
    children: [{
      name: "",
      birth_place: "",
      birth_date: "",
      remarks: "",
      present_address: ""
    }],
    promotions: [{
      old_position: "",
      new_position: "",
      promotion_date: "",
      comments: "",
      first_appointment_date: "",
      present_appointment_date: "",
      confirmation_date: "",
      grade_level: ""
    }],
    employments: [{
      job_title: "",
      organization: "",
      country: "",
      from_date: "",
      to_date: ""
    }],
    formData: {
      user_type: "",
      username: "",
      password: "",
      confirm_password: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      college: "",
      country: ""
    }
  }),
  methods: {
        add () {
        this.inputs.push({
            name: '',
            party: ''
        })
        },
        remove (index) {
            this.inputs.splice(index, 1)
        },
        addChild () {
          this.children.push({
            name: "",
            birth_place: "",
            birth_date: "",
            remarks: "",
            present_address: ""
          })
        },
        removeChild (index) {
            this.children.splice(index, 1)
        },
        addSpouse () {
          this.spouses.push({
            name: "",
            birth_place: "",
            birth_date: "",
            occupation: "",
            present_address: ""
          })
        },
        removeSpouse (index) {
          this.spouses.splice(index, 1)
        },
        addPromotion () {
          this.promotions.push({
            old_position: "",
            new_position: "",
            promotion_date: "",
            comments: "",
            first_appointment_date: "",
            present_appointment_date: "",
            confirmation_date: "",
            grade_level: ""
          })
        },
        removePromotion (index) {
          this.promotions.splice(index, 1)
        },
        addEmployment () {
          this.employments.push({
              job_title: '',
              organization: '',
              country: '',
              from_date: '',
              to_date: ''
          })
        },
        removeEmployment (index) {
          this.employments.splice(index, 1)
        },
    submitRecord() {

    },
    getLecturerDetails(id) {

    }
  },
  mounted() {
    this.id = this.$route.params.id;

    if (this.id !== 'new') {
      this.getLecturerDetails(this.id);
    }

    const vm = this;
    $(document).ready(function() {
      $('#rootwizard').bootstrapWizard({
        onTabShow: function(tab, navigation, index) {
          var $total = navigation.find('li').length;
          var $current = index + 1;

          // If it's the last tab then hide the last button and show the finish instead
          if ($current >= $total) {
            $('#rootwizard').find('.pager .next').hide();
            $('#rootwizard').find('.pager .finish').show().removeClass('disabled hidden');
          } else {
            $('#rootwizard').find('.pager .next').show();
            $('#rootwizard').find('.pager .finish').hide();
          }

          var li = navigation.find('li a.active').parent();

          var btnNext = $('#rootwizard').find('.pager .next').find('button');
          var btnPrev = $('#rootwizard').find('.pager .previous').find('button');

          // remove fontAwesome icon classes
          function removeIcons(btn) {
            btn.removeClass(function(index, css) {
              return (css.match(/(^|\s)fa-\S+/g) || []).join(' ');
            });
          }

          if ($current > 1 && $current < $total) {

            let nextIcon = li.next().find('.fa');
            let nextIconClass = nextIcon.attr('class').match(/fa-[\w-]*/).join();

            removeIcons(btnNext);
            btnNext.addClass(nextIconClass + ' btn-animated from-left fa');

            let prevIcon = li.prev().find('.fa');
            let prevIconClass = prevIcon.attr('class').match(/fa-[\w-]*/).join();

            removeIcons(btnPrev);
            btnPrev.addClass(prevIconClass + ' btn-animated from-left fa');
          } else if ($current == 1) {
            // remove classes needed for button animations from previous button
            btnPrev.removeClass('btn-animated from-left fa');
            removeIcons(btnPrev);
          } else {
            // remove classes needed for button animations from next button
            btnNext.removeClass('btn-animated from-left fa');
            removeIcons(btnNext);
          }
        },
        onNext: async (tab, navigation, index) => {
          let $status = false;
          if(index === 1) {
            $status = await vm.$refs.step1.validate();
          } else if (index === 2) {
            $status = await vm.$refs.step2.validate();
          }
          return $status;
        },
        onPrevious: (tab, navigation, index) => {
          // console.log("Showing previous tab");
        },
        onInit: () => {
          $('#rootwizard ul').removeClass('nav-pills');
        }

      });

    });
  }
}
</script>
