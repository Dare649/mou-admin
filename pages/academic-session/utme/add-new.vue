<template>
    <!-- START PAGE CONTENT -->
        <div class="content sm-gutter">
            <!-- START BREADCRUMBS -->
            <div class="bg-white">
                <div class="container p-l-5">
                    <ol class="breadcrumb breadcrumb-alt">
                        <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
                        <li class="breadcrumb-item"><a href="#">Academic Session</a></li>
                        <li class="breadcrumb-item"><nuxt-link to="/academic-session/utme">PUTME</nuxt-link></li>
                        <li class="breadcrumb-item active">Add New</li>
                    </ol>
                </div>
            </div>
            <!-- END BREADCRUMBS -->

            <!-- START CONTAINER FLUID -->
            <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
                <h3 class="text-primary m-t-30">Post UME Options</h3>
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
                                    <form style="width: 100%" class="" role="form">
                                        <div class="row p-2">
                                            <div class="col-md-6">
                                                <ValidationProvider rules="required" v-slot="{ errors }">
                                                    <div class="form-group form-group-default required" :class="{'has-error' : errors.length}">
                                                        <label>UME Exam Name</label>
                                                        <input type="text" v-model="formData.session_name" class="form-control" required>
                                                        <small class="error">{{ errors[0] }}</small>
                                                    </div>
                                                </ValidationProvider>
                                                <ValidationProvider rules="required" v-slot="{ errors }">
                                                    <div class="form-group form-group-default input-group required" :class="{'has-error' : errors.length}">
                                                        <div class="form-input-group">
                                                            <label>UME Registration Start Date</label>
                                                            <date-picker v-model="formData.ume_reg_start_date" format="DD/MM/YYYY" value-type="format" type="date" input-class="form-control" placeholder="Pick a date">
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
                                                <ValidationProvider rules="required" v-slot="{ errors }">
                                                    <div class="form-group form-group-default input-group required" :class="{'has-error' : errors.length}">
                                                        <div class="form-input-group">
                                                            <label>Result Date</label>
                                                            <date-picker v-model="formData.result_date" format="DD/MM/YYYY" value-type="format" type="date" input-class="form-control" placeholder="Pick a date">
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
                                                <ValidationProvider rules="required" v-slot="{ errors }">
                                                    <div class="form-group form-group-default input-group required" :class="{'has-error' : errors.length}">
                                                        <div class="form-input-group">
                                                            <label>Last Date for Acceptance Fees</label>
                                                            <date-picker v-model="formData.last_acceptance_date" format="DD/MM/YYYY" value-type="format" type="date" input-class="form-control" placeholder="Pick a date">
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
                                                <ValidationProvider rules="required" v-slot="{ errors }">
                                                    <div class="form-group form-group-default input-group required" :class="{'has-error' : errors.length}">
                                                        <div class="form-input-group">
                                                            <label>Last Date for Depositing School Fees</label>
                                                            <date-picker v-model="formData.last_date_fee_deposit" format="DD/MM/YYYY" value-type="format" type="date" input-class="form-control" placeholder="Pick a date">
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
                                                            <label>Exam Date and Time</label>
                                                            <date-picker v-model="formData.exam_date" format="DD/MM/YYYY HH:mm" value-type="format" type="datetime" input-class="form-control" placeholder="Pick a date">
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
                                                <ValidationProvider rules="required" v-slot="{ errors }">
                                                    <div class="form-group form-group-default input-group required" :class="{'has-error' : errors.length}">
                                                        <div class="form-input-group">
                                                            <label>UME Registration End Date</label>
                                                            <date-picker v-model="formData.ume_reg_end_date" format="DD/MM/YYYY" value-type="format" type="date" input-class="form-control" placeholder="Pick a date">
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
                                                <ValidationProvider rules="required" v-slot="{ errors }">
                                                    <div class="form-group  form-group-default required" :class="{'has-error' : errors.length}">
                                                        <label>Acceptance</label>
                                                        <input type="text" v-model="formData.acceptance_fee" class="form-control"  required>
                                                        <small class="error">{{ errors[0] }}</small>
                                                    </div>
                                                </ValidationProvider>
                                                <ValidationProvider rules="required" v-slot="{ errors }">
                                                    <div class="form-group form-group-default input-group required" :class="{'has-error' : errors.length}">
                                                        <div class="form-input-group">
                                                            <label>Last Date for Uploading Documents</label>
                                                            <date-picker v-model="formData.last_date_doc_upload" format="DD/MM/YYYY" value-type="format" type="date" input-class="form-control" placeholder="Pick a date">
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
                                                <ValidationProvider rules="required" v-slot="{ errors }">
                                                    <div class="form-group form-group-default required " :class="{'has-error' : errors.length}">
                                                        <label>Supplementary Fees</label>
                                                        <input type="text" v-model="formData.supplementary_fees" class="form-control">
                                                        <small class="error">{{ errors[0] }}</small>
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
                                    <form style="width: 100%" role="form">
                                        <div class="row ">
                                            <div class="col-md-6">
                                                <ValidationProvider rules="required" v-slot="{ errors }">
                                                    <div class="form-group form-group-default input-group required" :class="{'has-error' : errors.length}">
                                                        <div class="form-input-group">
                                                            <label>Supplementary List Publish Date</label>
                                                            <date-picker v-model="formData.supp_list_publish_date" value-type="format" format="DD/MM/YYYY" type="date" input-class="form-control" placeholder="Pick a date">
                                                                <template v-slot:icon-calendar>
                                                                    <div></div>
                                                                </template>
                                                            </date-picker>
                                                            <small class="ml-2 error">{{ errors[0] }}</small>
                                                        </div>
                                                        <div class="input-group-append">
                                                            <span class="input-group-text"><i class="pg-calender"></i></span>
                                                        </div>
                                                    </div>
                                                </ValidationProvider>
                                                <ValidationProvider rules="required" v-slot="{ errors }">
                                                    <div class="form-group  form-group-default required" :class="{'has-error' : errors.length}" >
                                                        <label>Acceptance Processing Fee</label>
                                                        <input type="email" v-model="formData.acceptance_processing_fee" class="form-control"  required>
                                                        <small class="error">{{ errors[0] }}</small>
                                                    </div>
                                                </ValidationProvider>
                                                <ValidationProvider rules="required" v-slot="{ errors }">
                                                    <div class="form-group  form-group-default required" :class="{'has-error' : errors.length}">
                                                        <label>Late Fee Amount for Regular Students</label>
                                                        <input type="email" v-model="formData.late_fees_amount" class="form-control"  required>
                                                        <small class="error">{{ errors[0] }}</small>
                                                    </div>
                                                </ValidationProvider>
                                                <ValidationProvider rules="required" v-slot="{ errors }">
                                                    <div class="form-group form-group-default input-group required" :class="{'has-error' : errors.length}">
                                                        <div class="form-input-group">
                                                            <label>Last Date for Acceptance Fees</label>
                                                            <date-picker v-model="formData.last_acceptance_date" format="DD/MM/YYYY" value-type="format" type="date" input-class="form-control" placeholder="Pick a date">
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
                                                <ValidationProvider rules="required" v-slot="{ errors }">
                                                    <div class="form-group form-group-default input-group required" :class="{'has-error' : errors.length}">
                                                        <div class="form-input-group">
                                                            <label>Late Fees Start Date for Old Returning Students</label>
                                                            <date-picker v-model="formData.late_fee_start_date" format="DD/MM/YYYY" value-type="format" type="date" input-class="form-control" placeholder="Pick a date">
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
                                                <ValidationProvider rules="required" v-slot="{ errors }">
                                                    <div class="form-group  form-group-default required" :class="{'has-error' : errors.length}">
                                                        <label>Late Fees Amount for Old Returning Student</label>
                                                        <input v-model="formData.late_fee_returning_stud" type="text" class="form-control" placeholder="PUTME/Returning Students" required>
                                                        <small class="error">{{ errors[0] }}</small>
                                                    </div>
                                                </ValidationProvider>
                                                <ValidationProvider rules="required" v-slot="{ errors }">
                                                    <div class="form-group  form-group-default required" :class="{'has-error' : errors.length}">
                                                        <label>PUTME Registration Fees Amount</label>
                                                        <input v-model="formData.putme_registration_fee" type="text" class="form-control"  required>
                                                        <small class="error">{{ errors[0] }}</small>
                                                    </div>
                                                </ValidationProvider>
                                            </div>
                                            <div class="col-md-6">
                                                <ValidationProvider rules="required" v-slot="{ errors }">
                                                    <div class="form-group form-group-default input-group required" :class="{'has-error' : errors.length}">
                                                        <div class="form-input-group">
                                                            <label>Last Date for Supplementary</label>
                                                            <date-picker v-model="formData.supp_fee_late_date" format="DD/MM/YYYY" value-type="format" type="date" input-class="form-control" placeholder="Pick a date">
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
                                                <ValidationProvider rules="required" v-slot="{ errors }">
                                                <div class="form-group form-group-default input-group required" :class="{'has-error' : errors.length}">
                                                    <div class="form-input-group">
                                                        <label>Last Date for Re-validation (Old Student Returning)</label>
                                                        <date-picker v-model="formData.date_validating_old_students" type="date" value-type="format"  input-class="form-control" placeholder="Pick a date">
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
                                                <ValidationProvider rules="required" v-slot="{ errors }">
                                                    <div class="form-group form-group-default required" :class="{'has-error' : errors.length}">
                                                        <label>PUTME Late Fee Due for Regular Students</label>
                                                        <input type="text" v-model="formData.putme_late_fees" class="form-control" placeholder="In Days" required>
                                                        <small class="error">{{ errors[0] }}</small>
                                                    </div>
                                                </ValidationProvider>
                                                <ValidationProvider rules="required" v-slot="{ errors }">
                                                    <div class="form-group form-group-default input-group required" :class="{'has-error' : errors.length}">
                                                        <div class="form-input-group">
                                                            <label>Late Fees End Date for Old Student Returning</label>
                                                            <date-picker v-model="formData.late_fee_end_date" format="DD/MM/YYYY" value-type="format" type="date" input-class="form-control" placeholder="Pick a date">
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
                                                <ValidationProvider rules="required" v-slot="{ errors }">
                                                    <div class="form-group  form-group-default required" :class="{'has-error' : errors.length}">
                                                        <label>Course Registration Fees Amount (Pre-School)</label>
                                                        <input type="text" class="form-control" v-model="formData.course_registration_fee"  required>
                                                        <small class="error">{{ errors[0] }}</small>
                                                    </div>
                                                </ValidationProvider>
                                                <ValidationProvider rules="required" v-slot="{ errors }">
                                                    <div class="form-group  form-group-default required" :class="{'has-error' : errors.length}">
                                                        <label>Matriculation Year</label>
                                                        <input type="text" v-model="formData.matriculation_year" class="form-control" placeholder="e.g 2020" required>
                                                        <small class="error">{{ errors[0] }}</small>
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
                                    <form class="full-width" role="form">
                                        <div class="col-md-12">
                                            <h6 class="semi-bold">UME Instructions</h6>
                                            <div class="summernote-wrapper">
                                                <div class="summernote" id="ume_instructions">Type here...</div>
                                            </div>
                                        </div>
                                        <div class="col-md-12 m-t-15">
                                            <h6 class="semi-bold">Exam Venue</h6>
                                            <div class="summernote-wrapper">
                                                <div class="summernote" id="exam-venue">Type here...</div>
                                            </div>
                                        </div>
                                        <div class="col-md-12 m-t-15">
                                            <h6 class="semi-bold">Acceptance Fee Instruction</h6>
                                            <div class="summernote-wrapper">
                                                <div class="summernote" id="acceptance-fee">Type here...</div>
                                            </div>
                                        </div>
                                        <div class="col-md-12 m-t-15">
                                            <h6 class="semi-bold">Document Upload Instructions</h6>
                                            <div class="summernote-wrapper">
                                                <div class="summernote" id="upload-instructions">Type here...</div>
                                            </div>
                                        </div>
                                        <div class="col-md-12 m-t-15">
                                            <h6 class="semi-bold">School Fees Instructions</h6>
                                            <div class="summernote-wrapper">
                                                <div class="summernote" id="fees-instructions">Type here...</div>
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
                session_name: '',
                exam_date: '',
                ume_reg_start_date: '',
                ume_reg_end_date: '',
                result_date: '',
                acceptance_fee: '',
                last_acceptance_date: '',
                last_date_doc_upload: '',
                last_date_fee_deposit: '',
                supplementary_fees: '',
                supp_list_publish_date: '',
                supp_fee_late_date: '',
                acceptance_processing_fee: '',
                date_validating_old_students: '',
                late_fee_returning_stud: '',
                putme_late_fees: '',
                late_fee_start_date: '',
                late_fee_end_date: '',
                late_fees_amount: '',
                course_registration_fee: '',
                putme_registration_fee: '',
                matriculation_year: '',
                ume_instruction: '',
                exam_venue: '',
                acceptance_fee_instructions: '',
                document_upload_instructions: '',
                school_fees_instruction: ''
            },
            umeInstructions: null,
            examVenue: null,
            acceptanceFeeInstruction: null,
            uploadInstruction: null,
            schoolFeesInstruction: null
        }
    },
    methods: {
        async submitForm() {
            $('#submitForm').attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i> Processing...');

            let form1Status = await this.$refs.step1.validate();
            let form2Status = await this.$refs.step2.validate();
            let form3Status = await this.$refs.step3.validate();

            this.formData.ume_instruction = this.umeInstructions.getContent();
            this.formData.exam_venue = this.examVenue.getContent();
            this.formData.acceptance_fee_instructions = this.acceptanceFeeInstruction.getContent();
            this.formData.document_upload_instructions = this.uploadInstruction.getContent();
            this.formData.school_fees_instruction = this.schoolFeesInstruction.getContent();


            if(!form1Status || !form2Status || !form3Status) {
                this.$toast.error('Incomplete form. Please make sure all required fields have been filled.', {position: 'top-center', fullWidth: false, theme: 'bubble'});
                return;
            }

            this.$axios.post('api/putme-sessions', this.formData).then(res => {
                $('#submitForm').attr('disabled', false).html('Finish');
                if(res.data.status) {
                    // reset forms
                    this.$refs.step1.reset();
                    this.$refs.step2.reset();
                    this.$refs.step3.reset();
                    // show notification
                    this.$toast.success('Academic session was created successfully.')
                    this.$router.push(decodeURIComponent(this.$route.query.redirect || "/academic-session/utme"));
                } else {
                    this.$toast.error('Oops! Something went wrong. Please try again.', {position: 'top-center', fullWidth: false, theme: 'bubble'});
                }
            }).catch(err => {
                $('#submitForm').attr('disabled', false).html('Finish');
                this.$toast.error('Oops! Something went wrong. Please try again.', {position: 'top-center', fullWidth: false, theme: 'bubble'});
            });
        }
    },
    mounted() {
        this.umeInstructions = createEditor('#ume_instructions', this.config)
        this.examVenue = createEditor('#exam-venue', this.config)
        this.acceptanceFeeInstruction = createEditor('#acceptance-fee', this.config)
        this.uploadInstruction = createEditor('#upload-instructions', this.config)
        this.schoolFeesInstruction = createEditor('#fees-instructions', this.config)

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
