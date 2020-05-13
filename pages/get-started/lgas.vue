<template>
    <div>
      <!-- Add Faculty Modal -->
      <div class="modal fade SlideUp" id="add_state" tabindex="-1" role="dialog" aria-hidden="true">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
              <i class="pg-close"></i>
          </button>
          <div class="modal-dialog modal-lg">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="text-left p-b-5"><span class="semi-bold">Add New LGA</span></h5>
                  </div>
                  <div class="modal-body">
                      <div class="row">
                          <div class="col-lg-12 m-b-10">
                              <select class="form-control input-lg">
                                <option>--Select Country--</option>
                                <option>Nigeria</option>
                                <option>Ghana</option>
                              </select>
                          </div>
                           <div class="col-lg-12 m-b-10">
                              <select class="form-control input-lg">
                                <option>--Select State--</option>
                                <option>Abia</option>
                                <option>Oyo</option>
                              </select>
                          </div>
                          <div class="col-lg-12 m-b-10">
                              <input type="text" placeholder="LGA Name" class="form-control input-lg" id="icon-filter" name="icon-filter">
                          </div>
                          <div class="col-lg-12 m-b-10">
                              <input type="text" placeholder="LGA Abbreviation" class="form-control input-lg" id="icon-filter" name="icon-filter">
                          </div>
                          
                          <div class="col-lg-12">
                              <button type="button" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Add Record</button>
                          </div>
                      </div>
                  </div>
                  <div class="modal-footer">
                  </div>
              </div>
              <!-- /.modal-content -->
          </div>
          <!-- /.modal-dialog -->
      </div>

      <!-- Upload Faculty Modal -->
      <div class="modal fade SlideUp" id="upload_state" tabindex="-1" role="dialog" aria-hidden="true">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
              <i class="pg-close"></i>
          </button>
          <div class="modal-dialog modal-lg">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="text-left p-b-5"><span class="semi-bold">Upload LGAs</span></h5>
                  </div>
                  <div class="modal-body">
                      <div class="row">
                          <div class="col-lg-12 m-b-10">
                              <input type="text" placeholder="File Caption" class="form-control input-lg" id="icon-filter" name="icon-filter">
                          </div>
                          <div class="col-lg-12 m-b-10">
                              <div class="custom-file">
                                  <input type="file" class="custom-file-input" id="customFileLang" lang="es">
                                  <label class="custom-file-label" for="customFileLang">Select File</label>
                              </div>
                          </div>
                          <div class="col-lg-12">
                              <button type="button" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Upload Record</button>
                          </div>
                          <div class="col-lg-12 m-t-15">
                              <div class="dd-placeholder p-1">
                                  <h5 class="pull-left sm-pull-reset"><i class="fa fa-file-excel-o p-l-10"></i> Sample File</h5>
                                  <button class="pull-right sm-pull-reset btn btn-default m-t-5 m-r-10"><i class="fa fa-arrow-down"></i> &nbsp; Download</button>
                                  <div class="clearfix"></div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="modal-footer">
                  </div>
              </div>
              <!-- /.modal-content -->
          </div>
          <!-- /.modal-dialog -->
      </div>

      
          
              <!-- START PAGE CONTENT -->
              <div class="content sm-gutter">
                  <!-- START BREADCRUMBS -->
                  <div class="bg-white">
                      <div class="container p-l-5">
                          <ol class="breadcrumb breadcrumb-alt">
                              <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                              <li class="breadcrumb-item"><a href="#">Get Started</a></li>
                              <li class="breadcrumb-item active">LGAs</li>
                          </ol>
                      </div>
                  </div>
                  <!-- END BREADCRUMBS -->
                  <!-- START CONTAINER FLUID -->
                  <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
                      <div class="card card-default">
                          <div class="card-header">
                              <h3 class="text-primary no-margin pull-left sm-pull-reset">LGA Management</h3>
                              <div class="pull-right sm-pull-reset">
                                  <button type="button" class="btn btn-primary btn-sm" data-target="#add_state" data-toggle="modal"><i class="fa fa-plus"></i> &nbsp; <strong>Add New LGA</strong></button>
                                  <button type="button" class="btn btn-warning btn-sm" data-target="#upload_state" data-toggle="modal"><i class="fa fa-arrow-up"></i> &nbsp; <strong>Upload LGAs</strong></button>
                              </div>
                              <div class="clearfix"></div>
                          </div>
                          <div class="card-body">
                              <div class="table-responsive">
                                  <table class="table table-striped table-condensed" id="basicTable">
                                      <thead>
                                        <th style="width:20%">Country Name</th>
                                        <th style="width:20%">State Name</th>
                                        <th style="width:20%">LGA Name</th>
                                        <th style="width:20%">LGA Abbrev</th>
                                        
                                        <th style="width:20%">Action</th>
                                      </thead>
                                      <tbody>
                                      <tr>                               
                                          <td>Nigeria</td>       
                                          <td>Oyo</td>
                                          <td>Akinyele</td>
                                          <td>AK</td>
                                          <td>
                                              <div class="btn-group">
                                                  <button type="button" class="btn btn-default btn-sm"><i class="fa fa-pencil"></i></button>
                                                  <button type="button" class="btn btn-default btn-sm"><i class="pg-trash"></i></button>
                                              </div>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td>Nigeria</td>       
                                          <td>Oyo</td>
                                          <td>Lagelu</td>
                                          <td>LG</td>
                                          <td>
                                              <div class="btn-group">
                                                  <button type="button" class="btn btn-default btn-sm"><i class="fa fa-pencil"></i></button>
                                                  <button type="button" class="btn btn-default btn-sm"><i class="pg-trash"></i></button>
                                              </div>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td>Nigeria</td>       
                                          <td>Oyo</td>
                                          <td>Ibadan North</td>
                                          <td>IN</td>
                                          <td>
                                              <div class="btn-group">
                                                  <button type="button" class="btn btn-default btn-sm"><i class="fa fa-pencil"></i></button>
                                                  <button type="button" class="btn btn-default btn-sm"><i class="pg-trash"></i></button>
                                              </div>
                                          </td>
                                      </tr>
                                      </tbody>
                                  </table>
                                  <ul class="pagination m-t-20">
                                      <li class="page-item disabled">
                                          <a class="page-link" href="#" tabindex="-1">Previous</a>
                                      </li>
                                      <li class="page-item"><a class="page-link" href="#">1</a></li>
                                      <li class="page-item active">
                                          <a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
                                      </li>
                                      <li class="page-item"><a class="page-link" href="#">3</a></li>
                                      <li class="page-item">
                                          <a class="page-link" href="#">Next</a>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
                  <!-- END CONTAINER FLUID -->
              </div>
              <!-- END PAGE CONTENT -->
              <!-- START COPYRIGHT -->
              <!-- END COPYRIGHT -->
          
      
    </div>
</template>
<script>
export default {
  name: "LGAs",
  layout: "main",
  middleware: "auth",
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