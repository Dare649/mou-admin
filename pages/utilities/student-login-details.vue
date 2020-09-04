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
          <form style="width: 100%">
            <div class="row">
              <div class="col-md-5">
                <input type="text" class="form-control" placeholder="Reg/ Matriculation Number" required>
              </div>
              <div class="col-md-5">
                <select class="form-control">
                  <option value="" selected>Entry Mode</option>
                  <option value="JAMB">PUTME</option>
                  <option value="DE">Direct Entry</option>
                </select>
              </div>
              <div class="col-md-2">
                <button type="submit" class="btn btn-primary btn-block">Search Record</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="card card-default">
        <div class="card-header separator">
          <h3 class="text-primary no-margin pull-left sm-pull-reset">Student Login Details</h3>
          <div class="pull-right sm-pull-reset">
            <button type="button" class="btn btn-success btn-sm"><i class="fa fa-refresh"></i>&nbsp; Refresh </button>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-striped table-condensed" id="basicTable">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Matric No.</th>
                  <th>Reg No.</th>
                  <th>Name</th>
                  <th>Reg Date</th>
                  <th>Entry Mode</th>
                  <th style="width:8%">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td>RTYS7892</td>
                  <td>YU78sa</td>
                  <td>Chinedu Rowland</td>
                  <td>15/08/2020</td>
                  <td>PUTME</td>
                  <td>
                    <div class="btn-group">
                      <span data-placement="top" data-toggle="tooltip" title="View Details">
                        <a href="#view_jamb_result" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-eye"></i></a>
                      </span>
                      <span data-placement="top" data-toggle="tooltip" title="Edit Bio Data Form">
                        <a href="#" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-edit"></i></a>
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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

  },
  mounted() {

  }
}
</script>
