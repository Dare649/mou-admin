<template>
    <div>
        <!-- Import JAMB Result Modal -->
<div class="modal fade SlideUp" id="import_jamb_result" tabindex="-1" role="dialog" aria-hidden="true">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        <i class="pg-close"></i>
    </button>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="text-left p-b-5"><span class="semi-bold">Import JAMB Result - UTME</span></h5>
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
                        <button type="button" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Import Record</button>
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
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<!-- Export JAMB Result Modal -->
<div class="modal fade SlideUp" id="export_jamb_result" tabindex="-1" role="dialog" aria-hidden="true">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        <i class="pg-close"></i>
    </button>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="text-left p-b-5"><span class="semi-bold">Edit JAMB Result</span></h5>
            </div>
            <div class="modal-body">
                <div class="row">
                    <form class="full-width">
                        <div class="col-lg-12 m-b-10">
                            <select class="full-width" data-init-plugin="select2">
                                <option value="" disabled selected>Jamb Result Year</option>
                                <option value="10">2010</option>
                                <option value="11">2011</option>
                            </select>
                        </div>
                        <div class="col-lg-12 m-b-10">
                            <select class="full-width" data-init-plugin="select2">
                                <option value="" disabled selected>Jamb Entry Mode</option>
                                <option value="10">Direct Entry</option>
                                <option value="11">PUTME</option>
                            </select>
                        </div>
                        <div class="col-lg-12">
                            <button type="button" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Export Record</button>
                        </div>
                    </form>
                    <div class="col-lg-12 m-t-15">
                        <div class="dd-placeholder p-1">
                            <h5 class="pull-left sm-pull-reset"><i class="fa fa-file-excel-o p-l-10"></i> Sample File</h5>
                            <button class="pull-right sm-pull-reset btn btn-default m-t-5 m-r-10"><i class="fa fa-arrow-down"></i> &nbsp; Download</button>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<!-- Edit JAMB Result Modal -->
<div class="modal fade SlideUp" id="edit_jamb_result" tabindex="-1" role="dialog" aria-hidden="true">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        <i class="pg-close"></i>
    </button>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="text-left p-b-5"><span class="semi-bold">Edit JAMB Result</span></h5>
            </div>
            <div class="modal-body">
                <form class="full-width">
                    <div class="row">
                        <div class="col-lg-12 m-b-10">
                            <input type="text" placeholder="Reg. Number" class="form-control">
                        </div>
                        <div class="col-lg-12 m-b-10">
                            <input type="text" placeholder="Name" class="form-control">
                        </div>
                        <div class="col-lg-6 m-b-10">
                            <select class="full-width" data-init-plugin="select2">
                                <option value="" disabled selected>Select your option</option>
                                <option value="M">M</option>
                                <option value="F">F</option>
                            </select>
                        </div>
                        <div class="col-lg-6 m-b-10">
                            <input type="text" placeholder="Result Year" class="form-control">
                        </div>
                        <div class="col-lg-12 m-t-10">
                            <button type="button" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Save Changes</button>
                        </div>
                    </div>
                </form>
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
                        <li class="breadcrumb-item"><a href="#">JAMB</a></li>
                        <li class="breadcrumb-item active">JAMB Result - UTME</li>
                    </ol>
                </div>
            </div>
            <!-- END BREADCRUMBS -->


            <!-- START CONTAINER FLUID -->
            <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
                <div class="card card-default">
                    <div class="card-header  ">
                        <div class="card-title text-primary">Search JAMB Result</div>
                    </div>
                    <div class="card-body">
                        <form class="row" style="width: 100%">
                            <div class="col-md-10">
                                <input type="text" class="form-control" placeholder="Registration Number" required>
                            </div>
                            <div class="col-md-2">
                                <button type="submit" class="btn btn-primary btn-block">Submit Record</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="card card-default">
                    <div class="card-header  separator">
                        <h3 class="text-primary no-margin pull-left sm-pull-reset">JAMB Result</h3>
                        <div class="pull-right sm-pull-reset">
                            <button type="button" class="btn btn-primary btn-sm" data-target="#import_jamb_result" data-toggle="modal"><i class="fa fa-arrow-down"></i> &nbsp; <strong>Import Results from CSV</strong></button>
                            <button type="button" class="btn btn-warning btn-sm" data-target="#export_jamb_result" data-toggle="modal"><i class="fa fa-arrow-up"></i> &nbsp; <strong>Export Results into CSV</strong></button>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-condensed" id="basicTable">
                                <thead>
                                <th style="width:20%">Reg Number</th>
                                <th style="width:40%">Name</th>
                                <th style="width:10%">Gender</th>
                                <th style="width:18%">Result Year</th>
                                <th style="width:12%">Action</th>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>PG/APP/2019/0013821</td>
                                    <td>UMOH ANIEKAN EFFIONG</td>
                                    <td>M</td>
                                    <td>2020</td>
                                    <td>
                                        <div class="btn-group">
                                            <span data-placement="top" data-toggle="tooltip" title="Edit Record">
                                                <a href="#edit_jamb_result" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-pencil"></i></a>
                                            </span>
                                            <button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-placement="top" title="Delete Record"><i class="pg-trash"></i></button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>PG/APP/2019/0013821</td>
                                    <td>UMOH ANIEKAN EFFIONG</td>
                                    <td>M</td>
                                    <td>2020</td>
                                    <td>
                                        <div class="btn-group">
                                            <span data-placement="top" data-toggle="tooltip" title="Edit Record">
                                                <a href="#edit_jamb_result" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-pencil"></i></a>
                                            </span>
                                            <button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-placement="top" title="Delete Record"><i class="pg-trash"></i></button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>PG/APP/2019/0013821</td>
                                    <td>UMOH ANIEKAN EFFIONG</td>
                                    <td>M</td>
                                    <td>2020</td>
                                    <td>
                                        <div class="btn-group">
                                            <span data-placement="top" data-toggle="tooltip" title="Edit Record">
                                                <a href="#edit_jamb_result" class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-pencil"></i></a>
                                            </span>
                                            <button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-placement="top" title="Delete Record"><i class="pg-trash"></i></button>
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

    </div>
</template>
<script>
export default {
  name: "Jamb-Results",
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
