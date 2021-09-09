<template>
  <!-- START PAGE CONTENT -->
  <div class="content sm-gutter">
    <!-- START BREADCRUMBS -->
    <div class="bg-white">
      <div class="container p-l-5">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
          <li class="breadcrumb-item"><a href="#">Academic Session</a></li>
          <li class="breadcrumb-item"><nuxt-link to="/academic-session/pg">PG</nuxt-link></li>
          <li class="breadcrumb-item active">{{ (id === 'new') ? 'Add New' : 'Edit Details'}}</li>
        </ol>
      </div>
    </div>
    <!-- END BREADCRUMBS -->

    <!-- START CONTAINER FLUID -->
    <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
      <h3 class="text-primary m-t-30">PG Options</h3>
      <hr />
      <div id="rootwizard" class="m-t-20 m-b-20">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs nav-tabs-linetriangle nav-tabs-separator nav-stack-sm" role="tablist" data-init-reponsive-tabs="dropdownfx">
          <li class="nav-item">
            <a class="fs-15 active" data-toggle="tab" href="#step1" data-target="#step1" role="tab"><i class="fa fa-paper-plane tab-icon"></i> <span>Step 1</span></a>
          </li>
          <li class="nav-item">
            <a class="fs-15" data-toggle="tab" href="#step2" data-target="#step2" role="tab"><i class="fa fa-paper-plane tab-icon"></i> <span>Step 2</span></a>
          </li>
          <li class="nav-item">
            <a class="fs-15" data-toggle="tab" href="#step3" data-target="#step3" role="tab"><i class="fa fa-paper-plane tab-icon"></i> <span>Step 3</span></a>
          </li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content">
          <div class="tab-pane padding-20 sm-no-padding active slide-left" id="step1">
            <div class="row row-same-height">
              <ValidationObserver ref="step1" class=" full-width">
                <form style="width: 100%" class="" role="form" v-if="formData">
                  <div class="row p-2">
                    <div class="col-md-6">
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <div class="form-group form-group-default required" :class="{'has-error' : errors.length}">
                          <label>PG Exam Name</label>
                          <input type="text" v-model="formData.pg_session_name" class="form-control" required>
                          <small class="error">{{ errors[0] }}</small>
                        </div>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-6">
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <div class="form-group form-group-default required" :class="{'has-error' : errors.length}">
                          <label>Acceptance Processing Fee</label>
                          <input type="text" v-model="formData.acceptance_processing_fees" class="form-control" required>
                          <small class="error">{{ errors[0] }}</small>
                        </div>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-md-6">
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <div class="form-group form-group-default input-group required" :class="{'has-error' : errors.length}">
                          <div class="form-input-group">
                            <label>Admin Fee Start Date</label>
                            <date-picker v-model="formData.admin_fees_start_date" format="DD/MM/YYYY" value-type="format" type="date" input-class="form-control" placeholder="Pick a date">
                              <template v-slot:icon-calendar>
                                <div></div>
                              </template>
                            </date-picker>
                            <small class="ml-2 error">{{ errors[0] }}</small>
                          </div>
                          <div class="input-group-append ">
                            <span class="input-group-text"><i class="pg-calender"></i></span>
                          </div>
                        </div>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-6">
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <div class="form-group form-group-default input-group required" :class="{'has-error' : errors.length}">
                          <div class="form-input-group">
                            <label>Admin Fee End Date</label>
                            <date-picker v-model="formData.admin_fees_end_date" format="DD/MM/YYYY" value-type="format" type="date" input-class="form-control" placeholder="Pick a date">
                              <template v-slot:icon-calendar>
                                <div></div>
                              </template>
                            </date-picker>
                            <small class="ml-2 error">{{ errors[0] }}</small>
                          </div>
                          <div class="input-group-append ">
                            <span class="input-group-text"><i class="pg-calender"></i></span>
                          </div>
                        </div>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-md-4">
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <div class="form-group form-group-default required" :class="{'has-error' : errors.length}">
                          <label>Acceptance Fee</label>
                          <input type="text" v-model="formData.acceptance_fee" class="form-control" required>
                          <small class="error">{{ errors[0] }}</small>
                        </div>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-4">
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <div class="form-group form-group-default required" :class="{'has-error' : errors.length}">
                          <label>PG Registration Fee</label>
                          <input type="text" v-model="formData.putme_registration_fee" class="form-control" required>
                          <small class="error">{{ errors[0] }}</small>
                        </div>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-4">
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <div class="form-group form-group-default input-group required" :class="{'has-error' : errors.length}">
                          <div class="form-input-group">
                            <label>Last Date for Acceptance Fee</label>
                            <date-picker v-model="formData.last_date_acceptance_fee" format="DD/MM/YYYY" value-type="format" type="date" input-class="form-control" placeholder="Pick a date">
                              <template v-slot:icon-calendar>
                                <div></div>
                              </template>
                            </date-picker>
                            <small class="ml-2 error">{{ errors[0] }}</small>
                          </div>
                          <div class="input-group-append ">
                            <span class="input-group-text"><i class="pg-calender"></i></span>
                          </div>
                        </div>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-md-6">
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <div class="form-group form-group-default input-group required" :class="{'has-error' : errors.length}">
                          <div class="form-input-group">
                            <label>Supplementary List Date</label>
                            <date-picker v-model="formData.supplementary_list_date" format="DD/MM/YYYY" value-type="format" type="date" input-class="form-control" placeholder="Pick a date">
                              <template v-slot:icon-calendar>
                                <div></div>
                              </template>
                            </date-picker>
                            <small class="ml-2 error">{{ errors[0] }}</small>
                          </div>
                          <div class="input-group-append ">
                            <span class="input-group-text"><i class="pg-calender"></i></span>
                          </div>
                        </div>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-6">
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <div class="form-group form-group-default input-group required" :class="{'has-error' : errors.length}">
                          <div class="form-input-group">
                            <label>Last Date for Supplementary List</label>
                            <date-picker v-model="formData.supplementary_list_last_date" format="DD/MM/YYYY" value-type="format" type="date" input-class="form-control" placeholder="Pick a date">
                              <template v-slot:icon-calendar>
                                <div></div>
                              </template>
                            </date-picker>
                            <small class="ml-2 error">{{ errors[0] }}</small>
                          </div>
                          <div class="input-group-append ">
                            <span class="input-group-text"><i class="pg-calender"></i></span>
                          </div>
                        </div>
                      </ValidationProvider>
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
                  <div class="row p-2">
                    <div class="col-md-6">
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <div class="form-group form-group-default required" :class="{'has-error' : errors.length}">
                          <label>Late Fees Amount</label>
                          <input type="text" v-model="formData.late_fees_amount" class="form-control" required>
                          <small class="error">{{ errors[0] }}</small>
                        </div>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-6">
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <div class="form-group form-group-default required" :class="{'has-error' : errors.length}">
                          <label>Late Fees Amount (Returning)</label>
                          <input type="text" v-model="formData.late_fees_amount_returning" class="form-control" required>
                          <small class="error">{{ errors[0] }}</small>
                        </div>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-md-6">
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <div class="form-group form-group-default required" :class="{'has-error' : errors.length}">
                          <label>Late Fees Due</label>
                          <input type="text" v-model="formData.pg_late_fees_due" class="form-control" required>
                          <small class="error">{{ errors[0] }}</small>
                        </div>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-6">
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <div class="form-group form-group-default input-group required" :class="{'has-error' : errors.length}">
                          <div class="form-input-group">
                            <label>Late Fee Date</label>
                            <date-picker v-model="formData.late_fees_date" format="DD/MM/YYYY" value-type="format" type="date" input-class="form-control" placeholder="Pick a date">
                              <template v-slot:icon-calendar>
                                <div></div>
                              </template>
                            </date-picker>
                            <small class="ml-2 error">{{ errors[0] }}</small>
                          </div>
                          <div class="input-group-append ">
                            <span class="input-group-text"><i class="pg-calender"></i></span>
                          </div>
                        </div>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-md-6">
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <div class="form-group form-group-default input-group required" :class="{'has-error' : errors.length}">
                          <div class="form-input-group">
                            <label>Late Fee Start Date (Returning)</label>
                            <date-picker v-model="formData.late_fees_start_date_returning" format="DD/MM/YYYY" value-type="format" type="date" input-class="form-control" placeholder="Pick a date">
                              <template v-slot:icon-calendar>
                                <div></div>
                              </template>
                            </date-picker>
                            <small class="ml-2 error">{{ errors[0] }}</small>
                          </div>
                          <div class="input-group-append ">
                            <span class="input-group-text"><i class="pg-calender"></i></span>
                          </div>
                        </div>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-6">
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <div class="form-group form-group-default input-group required" :class="{'has-error' : errors.length}">
                          <div class="form-input-group">
                            <label>Late Fee End Date (Returning)</label>
                            <date-picker v-model="formData.late_fees_end_date_returning" format="DD/MM/YYYY" value-type="format" type="date" input-class="form-control" placeholder="Pick a date">
                              <template v-slot:icon-calendar>
                                <div></div>
                              </template>
                            </date-picker>
                            <small class="ml-2 error">{{ errors[0] }}</small>
                          </div>
                          <div class="input-group-append ">
                            <span class="input-group-text"><i class="pg-calender"></i></span>
                          </div>
                        </div>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-md-6">
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <div class="form-group form-group-default required" :class="{'has-error' : errors.length}">
                          <label>Course Registration Fee</label>
                          <input type="text" v-model="formData.course_registration_fee" class="form-control" required>
                          <small class="error">{{ errors[0] }}</small>
                        </div>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-6">
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <div class="form-group form-group-default required" :class="{'has-error' : errors.length}">
                          <label>Registration Admin Fees</label>
                          <input type="text" v-model="formData.pg_reg_admin_fees" class="form-control" required>
                          <small class="error">{{ errors[0] }}</small>
                        </div>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-md-6">
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <div class="form-group form-group-default required" :class="{'has-error' : errors.length}">
                          <label>Matriculation Year</label>
                          <input type="text" v-model="formData.matriculation_year" class="form-control" required>
                          <small class="error">{{ errors[0] }}</small>
                        </div>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-6">
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <div class="form-group form-group-default input-group required" :class="{'has-error' : errors.length}">
                          <div class="form-input-group">
                            <label>Last date for school fees</label>
                            <date-picker v-model="formData.last_date_depositing_school_fees" format="DD/MM/YYYY" value-type="format" type="date" input-class="form-control" placeholder="Pick a date">
                              <template v-slot:icon-calendar>
                                <div></div>
                              </template>
                            </date-picker>
                            <small class="ml-2 error">{{ errors[0] }}</small>
                          </div>
                          <div class="input-group-append ">
                            <span class="input-group-text"><i class="pg-calender"></i></span>
                          </div>
                        </div>
                      </ValidationProvider>
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
                  <div class="col-md-12">
                    <h6 class="semi-bold">Admin Fees Instructions</h6>
                    <div class="summernote-wrapper">
                      <div class="summernote" id="admin_fees_instruction">Type here...</div>
                    </div>
                  </div>
                  <div class="col-md-12 m-t-15">
                    <h6 class="semi-bold">School Fees Venue</h6>
                    <div class="summernote-wrapper">
                      <div class="summernote" id="school_fees_instruction">Type here...</div>
                    </div>
                  </div>
                  <div class="col-md-12 m-t-15">
                    <h6 class="semi-bold">Acceptance Fee Instruction</h6>
                    <div class="summernote-wrapper">
                      <div class="summernote" id="acceptance-fee">Type here...</div>
                    </div>
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
              <li class="next finish hidden" @click="submitForm">
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
    <!-- END CONTAINER FLUID -->
  </div>
</template>
<script>
import { createEditor } from 'vueditor';
export default {
  layout: 'main',
  data() {
    return {
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
      formData: {
        pg_session_name: '',
        admin_fees_start_date: '',
        admin_fees_end_date: '',
        acceptance_fee: '',
        putme_registration_fee: '',
        last_date_acceptance_fee: '',
        last_date_depositing_school_fees: '',
        supplementary_list_date: '',
        supplementary_list_last_date: '',
        acceptance_processing_fees: '',
        late_fees_amount: '',
        pg_late_fees_due: '',
        late_fees_date: '',
        late_fees_start_date_returning: '',
        late_fees_end_date_returning: '',
        late_fees_amount_returning: '',
        course_registration_fee: '',
        pg_reg_admin_fees: '',
        matriculation_year: '',
        admin_fees_instruction: '',
        school_fees_instruction: '',
        acceptance_fees_instruction: '',
      },
      adminFeesInstruction: null,
      acceptanceFeeInstruction: null,
      schoolFeesInstruction: null,
      id: 'new',
    }
  },
  methods: {
    async submitForm() {
      $('#submitForm').attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i> Processing...');

      let form1Status = await this.$refs.step1.validate();
      let form2Status = await this.$refs.step2.validate();
      let form3Status = await this.$refs.step3.validate();

      this.formData.admin_fees_instruction = this.adminFeeInstruction.getContent();
      this.formData.acceptance_fees_instruction = this.acceptanceFeeInstruction.getContent();
      this.formData.school_fees_instruction = this.schoolFeesInstruction.getContent();


      if(!form1Status || !form2Status || !form3Status) {
        $('#submitForm').attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i> Processing...');
        this.$toast.error('Incomplete form. Please make sure all required fields have been filled.', {position: 'top-center', fullWidth: false, theme: 'bubble'});
        return;
      }
      if(this.id === 'new') {

        this.$axios.post('api/pg-sessions', this.formData).then(res => {
          $('#submitForm').attr('disabled', false).html('Finish');
          if(res.data.status) {
            // reset forms
            this.$refs.step1.reset();
            this.$refs.step2.reset();
            this.$refs.step3.reset();
            // show notification
            this.$toast.success(res.data.message)
            this.$router.push(decodeURIComponent(this.$route.query.redirect || "/academic-session/direct-entry"))
          } else {
            this.$toast.error('Oops! Something went wrong. Please try again.', {position: 'top-center', fullWidth: false, theme: 'bubble'});
          }
        }).catch(err => {
          $('#submitForm').attr('disabled', false).html('Finish');
          this.$toast.error('Oops! Something went wrong. Please try again.', {position: 'top-center', fullWidth: false, theme: 'bubble'});
        });
      } else {
        this.$axios.put('api/pg-sessions/' + this.id, this.formData).then(res => {
          $('#submitForm').attr('disabled', false).html('Finish');
          if(res.data.status) {
            // reset forms
            this.$refs.step1.reset();
            this.$refs.step2.reset();
            this.$refs.step3.reset();
            // show notification
            this.$toast.success(res.data.message)
            this.$router.push(decodeURIComponent(this.$route.query.redirect || "/academic-session/direct-entry"))
          } else {
            this.$toast.error('Oops! Something went wrong. Please try again.', {position: 'top-center', fullWidth: false, theme: 'bubble'});
          }
        }).catch(err => {
          $('#submitForm').attr('disabled', false).html('Finish');
          this.$toast.error('Oops! Something went wrong. Please try again.', {position: 'top-center', fullWidth: false, theme: 'bubble'});
        });
      }
    },
    getPgSession(id) {
      this.$axios.get(`api/pg-sessions/${id}`).then(res => {
        const session = res.data.data;
        this.formData = {
          pg_session_name: session.pg_session_name,
          admin_fees_start_date: this.$moment(session.admin_fees_start_date).format('DD/MM/YYYY'),
          admin_fees_end_date: this.$moment(session.admin_fees_end_date).format('DD/MM/YYYY'),
          acceptance_fee: session.acceptance_fee,
          last_date_acceptance_fee: this.$moment(session.last_date_acceptance_fee).format('DD/MM/YYYY'),
          last_date_depositing_school_fees: this.$moment(session.last_date_depositing_school_fees).format('DD/MM/YYYY'),
          supplementary_list_date: this.$moment(session.supplementary_list_date).format('DD/MM/YYY'),
          supplementary_list_last_date: this.$moment(session.supplementary_list_last_date).format('DD/MM/YYYY'),
          acceptance_processing_fees: session.acceptance_processing_fees,
          late_fees_amount: this.$moment(session.late_fee_end_date).format('DD/MM/YYYY'),
          pg_late_fees_due: session.pg_late_fees_due,
          putme_registration_fee: session.putme_registration_fee,
          late_fees_date: this.$moment(session.late_fees_date).format('DD/MM/YYYY'),
          late_fees_start_date_returning: this.$moment(session.late_fees_start_date_returning).format('DD/MM/YYYY'),
          late_fees_end_date_returning: this.$moment(session.late_fees_end_date_returning).format('DD/MM/YYYY'),
          late_fees_amount_returning: session.late_fees_amount_returning,
          course_registration_fee: session.course_registration_fee,
          pg_reg_admin_fees: session.pg_reg_admin_fees,
          matriculation_year: session.matriculation_year,
          admin_fees_instruction: session.admin_fees_instruction,
          school_fees_instruction: session.school_fees_instruction,
          acceptance_fee_instructions: session.acceptance_fees_instruction,
        }
        this.adminFeeInstruction.setContent(session.admin_fees_instruction);
        this.acceptanceFeeInstruction.setContent(session.acceptance_fees_instruction);
        this.schoolFeesInstruction.setContent(session.school_fees_instruction)
      })
    }
  },
  mounted() {
    this.id = this.$route.params.id;

    if (this.id !== 'new') {
      this.getPgSession(this.id);
    }
    if(this.formData) {
      this.adminFeeInstruction      = createEditor('#admin_fees_instruction', this.config)
      this.schoolFeesInstruction    = createEditor('#school_fees_instruction', this.config)
      this.acceptanceFeeInstruction = createEditor('#acceptance-fee', this.config)
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
  },
}
</script>
<style>
.mx-datepicker {
  width: 100% !important;
}
</style>
