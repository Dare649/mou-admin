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
    <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0" >
      <h3  class="text-primary m-t-30">{{ (id === 'new') ? 'Add' : 'Edit'}} Lecturer</h3>
      <hr />
      <template v-if="loading">     
        Content Loading... Please Wait
      </template>
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
                  <div class="fs-11">USER DETAILS</div>
                  <div class="row">
                    <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>User Type</label>
                              <select disabled class="form-control" data-placeholder="Semester" v-model="formData.user_type"  required>
                                  <option value="">Select Type</option>
                                  <option value="LECTURER">LECTURER</option>
                              </select>
                          </div>
                      </div>
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>User Title</label>
                              <select class="form-control" data-placeholder="Semester" v-model="formData.profile.title"  required>
                                  <option value="">Select Title</option>
                                  <option value="Mr">Mr</option>
                                  <option value="Mrs">Mrs</option>
                                  <option value="Master">Master</option>
                                  <option value="Miss">Miss</option>
                              </select>
                          </div>
                      </div>
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>User Gender</label>
                              <select class="form-control" data-placeholder="Semester" v-model="formData.gender"  required>
                                  <option value="">Select Gender</option>
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                              </select>
                          </div>
                      </div>                     
                  </div>
                  <div class="row">
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>User Name</label>
                              <input type="text" class="form-control" v-model="formData.name" required>
                          </div>
                      </div>
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Password</label>
                              <input type="password" class="form-control" v-model="formData.password" required>
                          </div>
                      </div>
                     <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Confirm Password</label>
                              <input type="password" class="form-control" v-model="formData.confirm_password" required>
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
                                <select class="form-control" @change="getDepartmentByCollege($event)" data-placeholder="Semester" v-model="formData.profile.college_id"  required>
                                    <option value="">Select College</option>
                                    <option v-for="college in colleges" :value="college.id"  :key="college.id">{{college.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group form-group-default required">
                                <label>Department</label>
                                <select class="form-control" data-placeholder="Semester" v-model="formData.profile.department_id"  required>
                                    <option value="">Select Department</option>
                                    <option v-for="department in departments" :value="department.id" :key="department.id">{{department.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group form-group-default required">
                                <label>Marital Status</label>
                                <select class="form-control" data-placeholder="Semester" v-model="formData.marital_status"  required>
                                    <option value="">Select Gender</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Divorced">Divorced</option>
                                </select>
                            </div>
                        </div>                     
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Country</label>
                              <select class="form-control" data-placeholder="Semester" @change="getStatesByCountry" v-model="formData.profile.country_id"  required>
                                  <option value="">Select Country</option>
                                  <option v-for="country in countries" :value="country.id" :key="country.id">{{country.name}}</option>
                              </select>
                          </div>
                      </div>
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>State</label>
                              <select class="form-control" data-placeholder="Semester" @change="getLgaByState" v-model="formData.profile.state_id" required>
                                  <option value="">Select State</option>
                                  <option v-for="state in states" :value="state.id" :key="state.id">{{state.name}}</option>
                              </select>
                          </div>
                      </div>
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>LGA</label>
                              <select class="form-control" data-placeholder="Semester" v-model="formData.profile.lga_id"  required>
                                  <option value="">Select LGA</option>
                                  <option v-for="lga in lgas" :value="lga.id">{{lga.name}}</option>
                              </select>
                          </div>
                      </div>                     
                  </div>
                  <div class="row">
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Geo Political Zone</label>
                              <input type="text" class="form-control" v-model="formData.profile.geo_political_zone" required>
                          </div>
                      </div>  
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Rank</label>
                              <input type="text" class="form-control" v-model="formData.profile.rank" required>
                          </div>
                      </div>
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Email</label>
                              <input type="email" class="form-control" v-model="formData.email" required>
                          </div>
                      </div>
                     
                  </div>
                  <div class="row">
                      
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Contact Number</label>
                              <input type="tel" class="form-control" v-model="formData.phone" required>
                          </div>
                      </div>
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Joining Date</label>
                              <input type="date" class="form-control" v-model="formData.date_employed" required>
                          </div>
                      </div> 
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Date of Birth</label>
                              <input type="date" class="form-control" v-model="formData.dob" required>
                          </div>
                      </div>                     
                  </div>
                  <div class="row">
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Residential Address</label>
                              <textarea type="text" class="form-control" v-model="formData.address" required></textarea>
                          </div>
                      </div>              
                      
                  </div>
                  <hr class="col-md-12"/>
                  <div class="fs-11">NEXT OF KIN INFORMATION</div>
                  <div class="row">
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Full Name</label>
                              <input type="text" class="form-control" v-model="formData.kin.name" required>
                          </div>
                      </div>  
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Email Address</label>
                              <input type="text" class="form-control" v-model="formData.kin.email" required>
                          </div>
                      </div>
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Relationship</label>
                              <input type="text" class="form-control" v-model="formData.kin.relationship" required>
                          </div>
                      </div>                     
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Residential Address</label>
                              <textarea type="text" class="form-control" v-model="formData.kin.address" required></textarea>
                          </div>
                      </div>                      
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Phone Number</label>
                              <input type="tel" class="form-control" v-model="formData.kin.phone" required>
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
                              <input type="text" class="form-control" v-model="input.highest_qualification" required>
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
                              <input type="text" class="form-control" v-model="input.organisation" required>
                          </div>
                      </div> 
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                                <label>Country</label>
                                <select class="form-control" data-placeholder="Semester" required v-model="input.country">
                                    <option value="">Select Country</option>
                                    <option v-for="country in countries" :value="country.id" :key="country.id">{{country.name}}</option>
                                </select>
                            </div>
                      </div> 
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>From Date</label>
                              <input type="text" class="form-control" v-model="input.from_year" required>
                          </div>
                      </div>  
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>To Date</label>
                              <input type="text" class="form-control" v-model="input.to_year" required>
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
                              <input type="date" class="form-control" v-model="input.date_of_first_appointment" required>
                          </div>
                      </div>  
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Present Appointment Date</label>
                              <input type="date" class="form-control" v-model="input.date_of_present_appointment" required>
                          </div>
                      </div>  
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Confirmation Date</label>
                              <input type="date" class="form-control" v-model="input.date_of_confirmation" required>
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
                              <input type="date" class="form-control" v-model="input.dob" required>
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
                              <textarea type="text" class="form-control" v-model="input.address" required></textarea>
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
                              <label>Child Name</label>
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
                              <input type="date" class="form-control" v-model="input.dob" required>
                          </div>
                      </div>  
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Remarks</label>
                              <input type="text" class="form-control" v-model="input.remark" required>
                          </div>
                      </div>  
                      <div class="col-md-4">
                          <div class="form-group form-group-default required">
                              <label>Present Address</label>
                              <textarea type="text" class="form-control" v-model="input.address" required></textarea>
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
                <button v-if="!submitting" class="btn btn-primary btn-cons btn-animated from-left fa fa-cog pull-right" id="submitForm" type="button">
                  <span>Finish</span>
                </button>
                <button disabled v-if="submitting" class="btn btn-primary btn-cons btn-animated from-left fa fa-cog pull-right" id="submitForm" type="button">
                  <span>Submitting</span>
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
    colleges: [],
    departments: [],
    countries: [],
    lecturer: {},
    states: [],
    submitting: false,
    editLoading: false,
    loading: false,
    lgas: [],
    inputs: [{    
            highest_qualification: '',
            institution: '',
            subjects: ''
        }],
    spouses: [{
      name: "",
      birth_place: "",
      dob: "",
      occupation: "",
      address: ""
    }],
    children: [{
      name: "",
      birth_place: "",
      dob: "",
      remark: "",
      address: ""
    }],
    promotions: [{
      old_position: "",
      new_position: "",
      promotion_date: "",
      comments: "",
      date_of_first_appointment: "",
      date_of_present_appointment: "",
      date_of_confirmation: "",
      grade_level: ""
    }],
    employments: [{
      job_title: "",
      organisation: "",
      country: "",
      from_year: "",
      to_year: ""
    }],
    formData: {
      user_type: "LECTURER",
      name: "",
      password: "",
      confirm_password: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      gender: "",
      phone: "",
      date_employed: "",
      dob: "",
      address: "",
      marital_status: "",
      country: "",
      email: "",
      kin: {
        email: "",
        name: "",
        phone: "",
        relationship: "",
        address: ""
      },
      profile: {
        title: "",
        college_id: "",
        department_id: "",
        country_id: "",
        state_id: "",
        lga_id: "",
        rank: "",
        geo_political_zone: "Southern"
      }
    }
  }),
  methods: {
    add () {
    this.inputs.push({
        highest_qualification: '',
        institution: '',
        subjects: ''
    })
    },
    remove (index) {
          this.inputs.splice(index, 1)
      },
    addChild () {
      this.children.push({
        name: "",
        birth_place: "",
        dob: "",
        remark: "",
        address: ""
      })
    },
    removeChild (index) {
        this.children.splice(index, 1)
    },
    addSpouse () {
        this.spouses.push({
          name: "",
          birth_place: "",
          dob: "",
          occupation: "",
          address: ""
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
        date_of_first_appointment: "",
        date_of_present_appointment: "",
        date_of_confirmation: "",
        grade_level: ""
      })
    },
    removePromotion (index) {
      this.promotions.splice(index, 1)
    },
    addEmployment () {
      this.employments.push({
          job_title: '',
          organisation: '',
          country: '',
          from_year: '',
          to_year: ''
      })
    },
    removeEmployment (index) {
      this.employments.splice(index, 1)
    },
    getDepartmentByCollege(e) {
      let id = e.target.value
      this.$store.dispatch('utility/getDepartmentByFaculty', id)
        .then(res =>{
          this.departments = res.data
        }).catch(err =>{
          this.$toast.error(err)
      })
    },
    getDepartmentByCollegeID(id) {
      this.$store.dispatch('utility/getDepartmentByFaculty', id)
        .then(res =>{
          this.departments = res.data
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
    getCountries() {
      this.$store.dispatch('utility/getCountries')
        .then(res =>{
          this.countries = res.data
        }).catch(err =>{
          this.$toast.error(err)
      })
    },
    getStatesByCountry() {
      this.$store.dispatch('utility/getStateByCountry', this.formData.profile.country_id)
        .then(res =>{
          this.states = res.data
        }).catch(err =>{
          this.$toast.error(err)
      })
    },
    submitRecord(){     
            this.loading = true
            let bodyFormData = new FormData();
            bodyFormData.set('id', this.id.split('_')[1])
            bodyFormData.set('name', this.formData.name)
            bodyFormData.set('first_name', this.formData.first_name)
            bodyFormData.set('last_name', this.formData.last_name)
            bodyFormData.set('email', this.formData.email)
            bodyFormData.set('phone', this.formData.phone)
            bodyFormData.set('address', this.formData.address)
            bodyFormData.set('marital_status', this.formData.marital_status)
            bodyFormData.set('gender', this.formData.gender)
            bodyFormData.set('dob', this.formData.dob)
            bodyFormData.set('date_employed', this.formData.date_employed)
            bodyFormData.set('password', this.formData.password)
            bodyFormData.set('password_confirmation', this.formData.confirm_password)
            bodyFormData.set('nok_name', this.formData.kin.name)
            bodyFormData.set('nok_email', this.formData.kin.email)
            bodyFormData.set('nok_address', this.formData.kin.address)
            bodyFormData.set('nok_relationship', this.formData.kin.relationship)
            bodyFormData.set('nok_phone', this.formData.phone)
            bodyFormData.set('title', this.formData.profile.title)
            bodyFormData.set('rank', this.formData.profile.rank)
            bodyFormData.set('college_id', this.formData.profile.college_id)
            bodyFormData.set('department_id', this.formData.profile.department_id)
            bodyFormData.set('country_id', this.formData.profile.country_id)
            bodyFormData.set('state_id', this.formData.profile.state_id)
            bodyFormData.set('lga_id', this.formData.profile.lga_id)
            bodyFormData.set('geo_political_zone', this.formData.profile.geo_political_zone)

            for(var i = 0; i < this.inputs.length; i++)
            {
              bodyFormData.set('education['+i+']'+'[highest_qualification]', this.inputs[i].highest_qualification)
              bodyFormData.set('education['+i+']'+'[institution]', this.inputs[i].institution)
              bodyFormData.set('education['+i+']'+'[subjects]', this.inputs[i].subjects)
            }
            

            for(var i = 0; i < this.employments.length; i++)
            {
              bodyFormData.set('employment['+i+']'+'[job_title]', this.employments[i].job_title)
              bodyFormData.set('employment['+i+']'+'[organisation]', this.employments[i].organisation)
              bodyFormData.set('employment['+i+']'+'[country]', this.employments[i].country)
              bodyFormData.set('employment['+i+']'+'[from_year]', this.employments[i].from_year)
              bodyFormData.set('employment['+i+']'+'[to_year]', this.employments[i].to_year)
            }
            
            for(var i = 0; i < this.promotions.length; i++)
            {
              bodyFormData.set('promotion['+i+']'+'[old_position]', this.promotions[i].old_position)
              bodyFormData.set('promotion['+i+']'+'[new_position]', this.promotions[i].new_position)
              bodyFormData.set('promotion['+i+']'+'[promotion_date]', this.promotions[i].promotion_date)
              bodyFormData.set('promotion['+i+']'+'[comments]', this.promotions[i].comments)
              bodyFormData.set('promotion['+i+']'+'[date_of_first_appointment]', this.promotions[i].date_of_first_appointment)
              bodyFormData.set('promotion['+i+']'+'[date_of_present_appointment]', this.promotions[i].date_of_present_appointment)
              bodyFormData.set('promotion['+i+']'+'[date_of_confirmation]', this.promotions[i].date_of_confirmation)
              bodyFormData.set('promotion['+i+']'+'[grade_level]', this.promotions[i].grade_level)
            }
            
            for(var i = 0; i < this.spouses.length; i++)
            {
              bodyFormData.set('spouse['+i+']'+'[name]', this.spouses[i].name)
              bodyFormData.set('spouse['+i+']'+'[birth_place]', this.spouses[i].birth_place)
              bodyFormData.set('spouse['+i+']'+'[dob]', this.spouses[i].dob)
              bodyFormData.set('spouse['+i+']'+'[occupation]', this.spouses[i].occupation)
              bodyFormData.set('spouse['+i+']'+'[address]', this.spouses[i].address)
            }
        
            for(var i = 0; i < this.children.length; i++)
            {
              bodyFormData.set('children['+i+']'+'[name]', this.children[i].name)
              bodyFormData.set('children['+i+']'+'[birth_place]', this.children[i].birth_place)
              bodyFormData.set('children['+i+']'+'[dob]', this.children[i].dob)
              bodyFormData.set('children['+i+']'+'[remark]', this.children[i].remark)
              bodyFormData.set('children['+i+']'+'[address]', this.children[i].address)
            }
            
            if(this.id === 'new'){
              this.submitting = true
              this.$store
                .dispatch('get-started/createLecturer', bodyFormData)
                .then(res => {
                if(res != undefined){
                    if(res.status){
                        this.$router.push(
                            decodeURIComponent(
                            this.$route.query.redirect || '/personnel/lecturers'
                            )
                        );
                        this.$toast.success("Record successfully added!", { icon: "times" });
                        this.submitting = false
                    }else{
                        this.submitting = false
                        this.ErrMsg = "Error Processing Request!"
                    }
                }else{
                    this.submitting = false
                    this.ErrMsg = "Error Processing Request!"
                }
                }).catch(err => {
                this.loading = false
                })
            }else{
              this.submitting = true
              this.$store
                .dispatch('get-started/updateLecturer', bodyFormData)
                .then(res => {
                if(res != undefined){
                    if(res.status){
                        this.$router.push(
                            decodeURIComponent(
                            this.$route.query.redirect || '/personnel/lecturers'
                            )
                        );
                        this.$toast.success("Record successfully updated!", { icon: "times" });
                        this.submitting = false
                    }else{
                        this.submitting = false
                        this.ErrMsg = "Error Processing Request!"
                    }
                }else{
                    this.submitting = false
                    this.ErrMsg = "Error Processing Request!"
                }
                }).catch(err => {
                this.submitting = false
                })
            }
    },
    getLgaByState() {
      this.$store.dispatch('utility/getLgaByState', this.formData.profile.state_id)
        .then(res =>{
          this.lgas = res.data
        }).catch(err =>{
        this.$toast.error(err)
      })
    },   
    propChanger(arrays, value) {
      for (var i in arrays) {
        var keys = Object.keys(arrays[i])
        keys.forEach(element => {    
          if (element == value) {
              arrays[i][element] = this.$moment(arrays[i][element]).format('YYYY-MM-DD');
          }
        });  
      }
    },
    populator(){
      this.formData = this.lecturer
      this.formData.date_employed = this.$moment(this.lecturer.date_employed).format('YYYY-MM-DD')
      this.formData.dob = this.$moment(this.lecturer.dob).format('YYYY-MM-DD')
      this.getDepartmentByCollegeID(this.lecturer.profile.college_id)
      this.getStatesByCountry()
      this.getLgaByState()

      var educational_details = JSON.parse(this.lecturer.profile.educational_details)
      if(educational_details.length > 0){
        this.inputs = educational_details
      }else{
        this.add()
        this.remove(1)
      }

      var employment_details = JSON.parse(this.lecturer.profile.employment_details)
      if(employment_details.length > 0){
        this.employments = employment_details
      }else{
        this.addEmployment()
        this.removeEmployment(1)
      }

      var promotion_details = JSON.parse(this.lecturer.profile.promotion_details)
      if(promotion_details.length > 0){
        this.propChanger(promotion_details, 'promotion_date')
        this.propChanger(promotion_details, 'date_of_first_appointment')
        this.propChanger(promotion_details, 'date_of_present_appointment')
        this.propChanger(promotion_details, 'date_of_confirmation')
        this.promotions = promotion_details
      }else{
        this.addPromotion()
        this.removePromotion(1)
      }

      var spouse_details = JSON.parse(this.lecturer.profile.spouse_details)
      if(spouse_details.length > 0){
        this.propChanger(spouse_details, 'dob')
        this.spouses = spouse_details
      }else{
        this.addSpouse()
        this.removeSpouse(1)
      }
      
      var children_details = JSON.parse(this.lecturer.profile.children_details)
      if(children_details.length > 0){
        this.propChanger(children_details, 'dob')
        this.children = children_details
      }else{
        this.addChild()
        this.removeChild(1)
      }
    },
    getLecturerDetails(id) {  
      this.loading = true
      let numId = id.split('_')[1]  
      this.$store
          .dispatch('get-started/getSingleLecturer', numId)
          .then(res => {
          if(res != undefined){
              if(res.status){
                  this.lecturer = res.data
                  this.populator()
                  this.loading = false
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
    }
  },
  mounted() {
    if (!process.server) {
        const script1 = document.createElement('script')
        script1.type = 'text/javascript'
        script1.src = '/pages/js/pages.min.js'
        document.head.appendChild(script1)
    }
    this.id = this.$route.params.id;
    this.getColleges()
    this.getCountries()
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
