<template>
  <div class="content sm-gutter">
    <!-- START BREADCRUMBS -->
    <div class="bg-white">
      <div class="container p-l-5">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
          <li class="breadcrumb-item"><a href="#">Utilities</a></li>
          <li class="breadcrumb-item active">Bypass utility</li>
        </ol>
      </div>
    </div>
    <!-- END BREADCRUMBS -->

    <!-- START CONTAINER FLUID -->
    <div class="container sm-padding-10 p-t-20 p-b-20">
      <div class="row">
        <div class="col-md-12">
          <div class="card card-default">
            <div class="card-header  separator">
              <h3 class="text-primary no-margin p-b-10">Bypass Utility</h3>
            </div>
            <div class="card-body">
              <form class="p-4">
                <div class="row">
                  <div class="form-group col-md-12">
                    <label>Select CSV file to upload</label>
                    <div class="custom-file">
                      <input type="file" ref="myFiles" class="custom-file-input" id="customFileLang" lang="es" required>
                      <label class="custom-file-label" for="customFileLang">Select File</label>
                    </div>
                  </div>
                  <div class="form-group col-md-6">
                    <label>College</label>
                    <select class="form-control">
                      <option value="" disabled selected>Select your option</option>
                    </select>
                  </div>
                  <div class="form-group col-md-6">
                    <label>Department</label>
                    <select class="form-control">
                      <option value="" disabled selected>Select your option</option>
                    </select>
                  </div>
                  <div class="form-group col-md-6">
                    <label>Registration Step</label>
                    <select class="form-control" required>
                      <option value="" disabled selected>Select your option</option>
                      <option value="accommodation">Accommodation</option>
                      <option value="acceptance-fee">Acceptance Fee</option>
                    </select>
                  </div>
                  <div class="form-group col-md-6">
                    <label>Entry Mode</label>
                    <select class="form-control" required>
                      <option value="" disabled selected>Select your option</option>
                      <option value="PUTME">PUTME</option>
                      <option value="DE">Direct Entry</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <hr/>
                    <button class="pull-right sm-pull-reset btn btn-default m-t-5 m-r-10"><i class="fa fa-arrow-down"></i> &nbsp; Download Sample CSV</button>
                    <button type="button" class="btn btn-primary m-t-5 m-r-10"><i class="fa fa-upload"></i> &nbsp; Uploading</button>
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
  layout: 'main',
  data() {
    return {

    }
  },
  methods: {
    getCollege() {

    },
    getDepartmentByCollege() {

    }
  },
  mounted() {

  }
}
</script>
