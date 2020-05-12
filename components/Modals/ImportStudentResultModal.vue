<template>
    <!-- Import Record (CSV) Modal -->
<div class="modal fade SlideUp" id="upload_csv" tabindex="-1" role="dialog" aria-hidden="true">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        <i class="pg-close"></i>
    </button>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="text-left p-b-5"><span class="semi-bold">Upload Prefilled CSV File</span></h5>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-12 m-b-10">
                        <label>Select CSV file to upload</label>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="customFileLang" lang="es">
                            <label class="custom-file-label" for="customFileLang">Select File</label>
                        </div>
                    </div>
                    <div class="col-lg-12 m-b-10">
                        <label>Overwrite existing marks</label>
                        <select class="full-width" data-init-plugin="select2">
                            <option value="YS">Yes</option>
                            <option value="NO">No</option>
                        </select>
                    </div>
                    <div class="col-lg-12">
                        <button type="button" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Import Record</button>
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
