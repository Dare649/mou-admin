<template>
    <!-- START PAGE CONTENT -->
        <div class="content sm-gutter">
            <!-- START BREADCRUMBS -->
            <div class="bg-white">
                <div class="container p-l-5">
                    <ol class="breadcrumb breadcrumb-alt">
                        <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                        <li class="breadcrumb-item"><a href="#">Get Started</a></li>
                        <li class="breadcrumb-item active">Academic Session</li>
                    </ol>
                </div>
            </div>
            <!-- END BREADCRUMBS -->

            <!-- START CONTAINER FLUID -->
            <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
                <h3 class="text-primary m-t-30">Post UME Options</h3><hr/>
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
                                <form style="width: 100%" class="" role="form">
                                    <div class="row p-2">
                                        <div class="col-md-6">
                                            <div class="form-group form-group-default required">
                                                <label>UME Exam Name</label>
                                                <input type="text" class="form-control" required>
                                            </div>
                                            <div class="form-group form-group-default input-group required">
                                                <div class="form-input-group">
                                                    <label>UME Registration Start Date</label>
                                                    <input type="text" class="form-control" placeholder="Pick a date" id="datepicker-component2" required>
                                                </div>
                                                <div class="input-group-append ">
                                                    <span class="input-group-text"><i class="pg-calender"></i></span>
                                                </div>
                                            </div>
                                            <div class="form-group form-group-default input-group required">
                                                <div class="form-input-group">
                                                    <label>Result Date and Time</label>
                                                    <input value="06/05/2016 1:30 PM" type="text" class="form-control date_time" placeholder="Pick a date"  required>
                                                </div>
                                                <div class="input-group-append ">
                                                    <span class="input-group-text"><i class="pg-calender"></i></span>
                                                </div>
                                            </div>

                                            <div class="form-group form-group-default input-group required">
                                                <div class="form-input-group">
                                                    <label>Last Date for Acceptance Fees</label>
                                                    <input type="text" class="form-control" placeholder="Pick a date" id="datepicker-component2" required>
                                                </div>
                                                <div class="input-group-append ">
                                                    <span class="input-group-text"><i class="pg-calender"></i></span>
                                                </div>
                                            </div>
                                            <div class="form-group form-group-default input-group required">
                                                <div class="form-input-group">
                                                    <label>Last Date for Depositing School Fees</label>
                                                    <input type="text" class="form-control" placeholder="Pick a date" id="datepicker-component2 required">
                                                </div>
                                                <div class="input-group-append ">
                                                    <span class="input-group-text"><i class="pg-calender"></i></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group form-group-default input-group required">
                                                <div class="form-input-group">
                                                    <label>Exam Date and Time</label>
                                                    <input type="text" class="form-control date_time" placeholder="Pick a date"  required>
                                                </div>
                                                <div class="input-group-append ">
                                                    <span class="input-group-text"><i class="pg-calender"></i></span>
                                                </div>
                                            </div>

                                            <div class="form-group form-group-default input-group required">
                                                <div class="form-input-group">
                                                    <label>UME Registration End Date</label>
                                                    <input type="text" class="form-control" placeholder="Pick a date" id="datepicker-component2" required>
                                                </div>
                                                <div class="input-group-append ">
                                                    <span class="input-group-text"><i class="pg-calender"></i></span>
                                                </div>
                                            </div>
                                            <div class="form-group  form-group-default required">
                                                <label>Acceptancce</label>
                                                <input type="text" class="form-control"  required>
                                            </div>
                                            <div class="form-group form-group-default input-group required">
                                                <div class="form-input-group">
                                                    <label>Last Date for Uploading Documents</label>
                                                    <input type="text" class="form-control" placeholder="Pick a date" id="datepicker-component2" required>
                                                </div>
                                                <div class="input-group-append ">
                                                    <span class="input-group-text"><i class="pg-calender"></i></span>
                                                </div>
                                            </div>
                                            <div class="form-group form-group-default required ">
                                                <label>Supplementary Fees</label>
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="tab-pane slide-left padding-20 sm-no-padding" id="step2">
                            <div class="row row-same-height p-2">
                                <form style="width: 100%" role="form">
                                    <div class="row ">
                                        <div class="col-md-6">
                                            <div class="form-group form-group-default input-group required">
                                                <div class="form-input-group">
                                                    <label>Supplementary List Publish Date</label>
                                                    <input type="text"  class="form-control" placeholder="Pick a date" id="datepicker-component2" required>
                                                </div>
                                                <div class="input-group-append">
                                                    <span class="input-group-text"><i class="pg-calender"></i></span>
                                                </div>
                                            </div>
                                            <div class="form-group  form-group-default required">
                                                <label>Acceptance Processing Fee</label>
                                                <input type="email" class="form-control"  required>
                                            </div>
                                            <div class="form-group  form-group-default required">
                                                <label>Late Fee Amount for Regular Students</label>
                                                <input type="email" class="form-control"  required>
                                            </div>
                                            <div class="form-group form-group-default input-group required">
                                                <div class="form-input-group">
                                                    <label>Last Date for Acceptance Fees</label>
                                                    <input type="text" class="form-control" placeholder="Pick a date" id="datepicker-component2" required>
                                                </div>
                                                <div class="input-group-append ">
                                                    <span class="input-group-text"><i class="pg-calender"></i></span>
                                                </div>
                                            </div>
                                            <div class="form-group form-group-default input-group required">
                                                <div class="form-input-group">
                                                    <label>Late Fees Start Date for Old Returning Students</label>
                                                    <input type="text" class="form-control" placeholder="Pick a date" id="datepicker-component2" required>
                                                </div>
                                                <div class="input-group-append ">
                                                    <span class="input-group-text"><i class="pg-calender"></i></span>
                                                </div>
                                            </div>
                                            <div class="form-group  form-group-default required">
                                                <label>Late Fees Amount for Old Returning Student</label>
                                                <input type="text" class="form-control" placeholder="PUTME/Returning Students" required>
                                            </div>
                                            <div class="form-group  form-group-default required">
                                                <label>PUTME Registration Fees Amount</label>
                                                <input type="text" class="form-control"  required>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group form-group-default input-group required">
                                                <div class="form-input-group">
                                                    <label>Last Date for Supplementary</label>
                                                    <input type="text" class="form-control" placeholder="Pick a date" id="datepicker-component2" required>
                                                </div>
                                                <div class="input-group-append ">
                                                    <span class="input-group-text"><i class="pg-calender"></i></span>
                                                </div>
                                            </div>
                                            <div class="form-group form-group-default input-group required">
                                                <div class="form-input-group">
                                                    <label>Last Date for Re-validation (Old Student Returning)</label>
                                                    <input type="text" class="form-control" placeholder="Pick a date" id="datepicker-component2" required>
                                                </div>
                                                <div class="input-group-append ">
                                                    <span class="input-group-text"><i class="pg-calender"></i></span>
                                                </div>
                                            </div>
                                            <div class="form-group form-group-default required">
                                                <label>PUTME Late Fee Due for Regular Students</label>
                                                <input type="text" class="form-control" placeholder="In Days" required>
                                            </div>
                                            <div class="form-group form-group-default input-group required">
                                                <div class="form-input-group">
                                                    <label>Late Fees End Date for Old Student Returning</label>
                                                    <input type="text" class="form-control" placeholder="Pick a date" id="datepicker-component2" required>
                                                </div>
                                                <div class="input-group-append ">
                                                    <span class="input-group-text"><i class="pg-calender"></i></span>
                                                </div>
                                            </div>
                                            <div class="form-group  form-group-default required">
                                                <label>Course Registration Fees Amount (Pre-School)</label>
                                                <input type="text" class="form-control"  required>
                                            </div>
                                            <div class="form-group  form-group-default required">
                                                <label>Matriculation Year</label>
                                                <input type="text" class="form-control" placeholder="e.g 2020" required>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="tab-pane slide-left padding-20 sm-no-padding" id="step3">
                            <div class="row row-same-height">
                                <form class="full-width" role="form">
                                    <div class="col-md-12">
                                        <h6 class="semi-bold">UME Instructions</h6>
                                        <div class="summernote-wrapper">
                                            <div class="summernote">Type here...</div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 m-t-15">
                                        <h6 class="semi-bold">Exam Venue</h6>
                                        <div class="summernote-wrapper">
                                            <div class="summernote">Type here...</div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 m-t-15">
                                        <h6 class="semi-bold">Acceptance Fee Instruction</h6>
                                        <div class="summernote-wrapper">
                                            <div class="summernote">Type here...</div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 m-t-15">
                                        <h6 class="semi-bold">Document Upload Instructions</h6>
                                        <div class="summernote-wrapper">
                                            <div class="summernote">Type here...</div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 m-t-15">
                                        <h6 class="semi-bold">School Fees Instructions</h6>
                                        <div class="summernote-wrapper">
                                            <div class="summernote">Type here...</div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div class="padding-20 sm-padding-5 sm-m-b-20 sm-m-t-20 bg-white clearfix">
                            <ul class="pager wizard no-style">
                                <li class="next">
                                    <button class="btn btn-primary btn-cons btn-animated from-left fa fa-truck pull-right" type="button">
                                        <span>Next</span>
                                    </button>
                                </li>
                                <li class="next finish hidden">
                                    <button class="btn btn-primary btn-cons btn-animated from-left fa fa-cog pull-right" type="button">
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
export default {
    layout: 'main'
}
</script>