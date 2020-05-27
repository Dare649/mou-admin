<template>

        <div class="content sm-gutter">
        <!-- START BREADCRUMBS -->
            <div class="bg-white">
                <div class="container p-l-5">
                    <ol class="breadcrumb breadcrumb-alt">
                        <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                        <li class="breadcrumb-item"><a href="#">JAMB</a></li>
                        <li class="breadcrumb-item active">PUTME Result Upload</li>
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
                                        <div class="card-title">Process</div>
                                    </div>
                                    <div class="card-body">
                                        <h6 class="semi-bold">1. Admin will first Get CSV from "GET CSV" button in "Download Prefilled CSV File" section.</h6>
                                        <h6 class="semi-bold">2. Import the Jamb Results from "IMPORT" button in "Upload Prefilled CSV File" section.</h6>
                                        <h6 class="semi-bold">3. Admin can check Report to view scores uploaded from "CHECK REPORT" button in "Download Prefilled CSV File" section.</h6>
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
                    <div class="col-md-6">
                        <div class="card card-default">
                            <div class="card-header  separator">
                                <h3 class="text-primary no-margin p-b-10">Download Prefilled CSV File</h3>
                            </div>
                            <div class="card-body">
                                <form class="p-4">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-group m-b-10">
                                                <label>First Choice Department</label>
                                                <select class="full-width" data-init-plugin="select2">
                                                    <option value="" disabled selected>Select your option</option>
                                                    <option value="M">M</option>
                                                    <option value="F">F</option>
                                                </select>
                                            </div>
                                            <div class="form-group m-b-10">
                                                <label>Select Result Year</label>
                                                <select class="full-width" data-init-plugin="select2">
                                                    <option value="" disabled selected>Select your option</option>
                                                    <option value="M">M</option>
                                                    <option value="F">F</option>
                                                </select>
                                            </div>
                                            <div class="form-group m-b-10">
                                                <label>Select Exam</label>
                                                <select class="full-width" data-init-plugin="select2">
                                                    <option value="" disabled selected>Select your option</option>
                                                    <option value="M">M</option>
                                                    <option value="F">F</option>
                                                </select>
                                            </div>
                                            <div class="m-t-30">
                                                <hr/>
                                                <button type="button" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Get CSV</button>
                                                <button type="button" class="btn btn-default btn-lg btn-large fs-16 semi-bold">Check Report</button>
                                            </div>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card card-default">
                            <div class="card-header  separator">
                                <h3 class="text-primary no-margin p-b-10">Upload Prefilled CSV File</h3>
                            </div>
                            <div class="card-body">
                                <form class="p-4">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-group m-b-10">
                                                <label>Select CSV file to upload</label>
                                                <div class="custom-file">
                                                    <input type="file" class="custom-file-input" id="customFileLang" lang="es">
                                                    <label class="custom-file-label" for="customFileLang">Select File</label>
                                                </div>
                                            </div>
                                            <div class="form-group m-b-10">
                                                <label>Overwrite existing marks</label>
                                                <select class="full-width" data-init-plugin="select2">
                                                    <option value="" disabled selected>Select your option</option>
                                                    <option value="M">YES</option>
                                                    <option value="F">No</option>
                                                </select>
                                            </div>
                                            <div class="m-t-30">
                                                <hr/>
                                                <button type="button" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Import Record</button>
                                            </div>
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
  name: "Jamb",
  layout: "main",
  middleware: "",
  components: {

  },
  mounted: function() {
      if (!process.server) {
        const script1 = document.createElement('script')
        script1.type = 'text/javascript'
        script1.src = '/pages/js/pages.min.js'

        document.head.appendChild(script1)
      }
    }
}
</script>
<style scoped>
.breadcrumb {
    background-color: #ffffff !important;;
}
</style>
