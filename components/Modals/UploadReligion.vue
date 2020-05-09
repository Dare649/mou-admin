<template>
    <div class="modal fade SlideUp" id="upload_religion" tabindex="-1" role="dialog" aria-hidden="true">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        <i class="pg-close"></i>
    </button>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="text-left p-b-5"><span class="semi-bold">Upload Religions</span></h5>
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
</template>
