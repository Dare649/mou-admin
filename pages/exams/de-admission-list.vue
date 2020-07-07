<template>

        <div class="content sm-gutter">
        <!-- START BREADCRUMBS -->
            <div class="bg-white">
                <div class="container p-l-5">
                    <ol class="breadcrumb breadcrumb-alt">
                        <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                        <li class="breadcrumb-item"><a href="#">Exams</a></li>
                        <li class="breadcrumb-item active">DE Admission List</li>
                    </ol>
                </div>
            </div>
            <!-- END BREADCRUMBS -->

            <!-- START JUMBOTRON -->
            <div class="jumbotron" data-pages="parallax" data-scroll-element=".page-container">
                <div class=" container p-l-0 p-r-0   container-fixed-lg sm-p-l-0 sm-p-r-0">
                    <div class="inner">
                        <!-- START BREADCRUMB -->
                        <div class="row">
                            <div class="col-md-10 offset-md-1">
                                <!-- START card -->
                                <div class="card card-transparent text-center">
                                    <div class="card-header ">
                                        <div class="card-title">DE STUDENTS ONLY UPLOAD</div>
                                    </div>
                                    <div class="card-body">
                                        <h6 class="semi-bold">1. Admin will first Get CSV from "GET CSV" button in "Download Prefilled CSV File" section.</h6>
                                        <h6 class="semi-bold">2. Import the Admission List from "IMPORT" button in "Upload Prefilled CSV File" section.</h6>
                                        <h6 class="semi-bold">3. Download admission list using the "Download Prefilled CSV File" section.</h6>
                                    </div>
                                </div>
                                <!-- END card -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END JUMBOTRON -->

            <!-- START CONTAINER FLUID -->
            <div class="container sm-padding-10 p-t-20 p-b-20">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card card-default">
                            <div class="card-header  separator">
                                <h3 class="text-primary no-margin p-b-10">Upload DE Admission List</h3>
                            </div>
                            <div class="card-body">
                                <form class="p-4">
                                    <div class="row">
                                      <div class="form-group col-md-4">
                                          <label>Select CSV file to upload</label>
                                          <div class="custom-file">
                                              <input type="file" ref="myFiles" class="custom-file-input" id="customFileLang" lang="es" required>
                                              <label class="custom-file-label" for="customFileLang">Select File</label>
                                          </div>
                                      </div>
                                      <div class="form-group col-md-4">
                                        <label>Select Department</label>
                                        <select class="form-control" required>
                                            <option value="" disabled selected>Select your option</option>
                                        </select>
                                      </div>
                                      <div class="form-group col-md-4">
                                        <label>Select Programme</label>
                                        <select class="form-control" required>
                                            <option value="" disabled selected>Select your option</option>
                                        </select>
                                      </div>
                                    </div>
                                    <div class="row">
                                      <div class="form-group col-md-6">
                                        <label>Select Category</label>
                                        <select class="form-control" required>
                                            <option value="" disabled selected>Select your option</option>
                                        </select>
                                      </div>
                                      <div class="form-group col-md-6">
                                        <label>Overwrite existing marks</label>
                                        <select class="form-control" required>
                                            <option value="" disabled selected>Select your option</option>
                                            <option value="1">YES</option>
                                            <option value="0">NO</option>
                                        </select>
                                      </div>
                                    </div>
                                    <div class="row">
                                      <div class="col-md-12">
                                          <hr/>
                                          <button class="pull-right sm-pull-reset btn btn-default m-t-5 m-r-10"><i class="fa fa-arrow-down"></i> &nbsp; Download Sample CSV</button>
                                          <button type="button"  class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Import Record</button>
                                      </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="card card-default">
                            <div class="card-header  separator">
                                <h3 class="text-primary no-margin p-b-10">Download DE Admission List</h3>
                            </div>
                            <div class="card-body">
                                <form class="p-4">
                                    <div class="row">
                                      <div class="form-group col-md-4">
                                          <label>Select Academic Session</label>
                                          <select class="form-control">
                                              <option value="" selected>Select your option</option>
                                          </select>
                                      </div>
                                      <div class="form-group col-md-4">
                                          <label>Select Department</label>
                                          <select class="form-control">
                                              <option value="" selected>Select your option</option>
                                          </select>
                                      </div>
                                      <div class="form-group col-md-4">
                                          <label>Select Category</label>
                                          <select class="form-control">
                                              <option value="" selected>Select your option</option>
                                          </select>
                                      </div>
                                    </div>
                                    <div class="row">
                                      <div class="col-md-12">
                                        <hr/>
                                        <button type="button" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Get CSV</button>
                                      </div>
                                    </div>
                                </form>
                            </div>
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
