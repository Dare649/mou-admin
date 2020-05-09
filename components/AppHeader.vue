<template>
    <div class="header p-r-0 bg-primary">
        <div class="header-inner header-md-height">
            <a href="#" class="btn-link toggle-sidebar d-lg-none pg pg-menu text-white" data-toggle="horizontal-menu"></a>
            <div class="">
                <div class="brand inline no-border d-sm-inline-block">
                    <img src="/assets/img/mou_logo.png" alt="logo" data-src="/assets/img/mou_logo.png" data-src-retina="/assets/img/mou_logo.png" height="40">
                </div>
            </div>
            <div class="d-flex align-items-center">
                <!-- START User Info-->
                <div class="pull-left p-r-10 fs-14 font-heading d-lg-inline-block d-none text-white">
                    <span class="semi-bold">Caroline</span> <span class="">Uche</span>
                </div>
                <div class="dropdown pull-right">
                    <button class="profile-dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="thumbnail-wrapper d32 circular inline sm-m-r-5">
                    <img src="/assets/img/profiles/avatar.png" alt="" data-src="/assets/img/profiles/avatar.png" data-src-retina="/assets/img/profiles/avatar.png" width="32" height="32">
                    </span>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right profile-dropdown" role="menu">
                        <a href="#" class="dropdown-item"><i class="fa fa-user"></i> Profile</a>
                        <a href="#" class="dropdown-item"><i class="pg-settings_small"></i> Settings</a>
                        <a href="#" class="dropdown-item"><i class="fa fa-envelope"></i> Feedback</a>
                        <a href="#" class="dropdown-item"><i class="pg-power"></i>Logout</a>
                        <div class="dropdown-divider"></div>
                        <span class="dropdown-item fs-12 hint-text">Last visited<br />on Friday at 5:27PM</span>
                    </div>
                </div>
                <!-- END User Info-->
                <!--            <a href="#" class="header-icon pg pg-alt_menu btn-link m-l-10 sm-no-margin d-inline-block" data-toggle="quickview" data-toggle-element="#quickview"></a>-->
            </div>
        </div>
        <div class="bg-white">
            <div class="container p-l-0">
                <div class="menu-bar header-sm-height" data-pages-init='horizontal-menu' data-hide-extra-li="-1">
                    <a href="#" class="btn-link toggle-sidebar d-lg-none pg pg-close" data-toggle="horizontal-menu">
                    </a>
                    <ul>
                        <li><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
                        <li>
                            <a href="javascript:;"><span class="title">Get Started</span><span class=" arrow"></span></a>
                            <ul>
                                <li>
                                    <nuxt-link to="/get-started/faculties">Faculties(JAMB)</nuxt-link>
                                </li>
                                <li><nuxt-link to="/get-started/subjects-jamb">Subject(JAMB)</nuxt-link></li>
                                <li><nuxt-link to="/get-started/departments">Departments</nuxt-link></li>
                                <li><a href="#">Create Exams</a></li>
                                <li><nuxt-link to="/get-started/countries">Countries</nuxt-link></li>
                                <li><nuxt-link to="/get-started/states">States</nuxt-link></li>
                                <li><nuxt-link to="/get-started/lgas">LGAs</nuxt-link></li>
                                <li><nuxt-link to="/get-started/religion-management">Religions</nuxt-link></li>
                                <li><a href="get_jamb_result.php">Upload Jamb Results</a></li>
                                <li><a href="#">Custom Message</a></li>
                                <li><nuxt-link to="/get-started/acadamic-session">Acadamic Session</nuxt-link></li>

                            </ul>
                        </li>
                        <li><a href="#"><span class="title">Personnel</span></a></li>
                        <li class="<?php echo $jamb; ?>">
                            <a href="javascript:;"><span class="title">JAMB</span><span class=" arrow"></span></a>
                            <ul class="">
                                <li><nuxt-link to="/dashboard/jamb-results">JAMB Result</nuxt-link></li>
                                <li><nuxt-link to="/dashboard/jamb-de">JAMB Direct Entry</nuxt-link></li>
                            </ul>
                        </li>
                        <li><a href="#"><span class="title">Exams</span></a></li>
                        <li><a href="#"><span class="title">Hostel Management</span></a></li>
                        <li><a href="#"><span class="title">CMS</span></a></li>
                        <li><a href="#"><span class="title">Reports</span></a></li>
                        <li><a href="#"><span class="title">Misc</span></a></li>
                        <li><a href="#"><span class="title">Transaction Logs</span></a></li>
                        <li><a href="#"><span class="title">Scripts</span></a></li>
                        <li>
                            <a href="javascript:;"><span class="title">Results</span>
                                <span class=" arrow"></span></a>
                            <ul class="">
                                <li class="">
                                    <a href="#">Basic Tables</a>
                                </li>
                                <li class="">
                                    <a href="#">Data Tables</a>
                                </li>
                            </ul>
                        </li>
                        <li><a href="#"><span class="title">Audit Trail</span></a></li>
                        <li><a href="#"><span class="title">PUTME/DE Utilities</span></a></li>
                        <li><a href="#"><span class="title">CEC Utilities</span></a></li>
                        <li><a href="#"><span class="title">PG Utilities</span></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
