<template>
    <!-- Auto Generate Slip Modal -->
<div class="modal fade SlideUp" id="download_csv" tabindex="-1" role="dialog" aria-hidden="true">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        <i class="pg-close"></i>
    </button>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="text-left p-b-5"><span class="semi-bold">Download Results</span></h5>
            </div>
            <div class="modal-body">
                <form class="row">
                    <div class="col-lg-6 m-b-10">
                        <label>First Choice Department</label>
                        <select class="full-width" data-init-plugin="select2">
                            <option value="VC">VarChar</option>
                            <option value="IO">Integer Only</option>
                            <option value="CO">Char Only</option>
                        </select>
                    </div>
                    <div class="col-lg-6 m-b-10">
                        <label>Select Result Year</label>
                        <select class="full-width" data-init-plugin="select2">
                            <option value="20">2020</option>
                            <option value="21">2021</option>
                            <option value="22">2022</option>
                        </select>
                    </div>
                    <div class="col-lg-6 m-b-10">
                        <label>Select Exams</label>
                        <select class="full-width" data-init-plugin="select2">
                            <option value="P0">Post PUTME 2020</option>
                            <option value="P1">Post PUTME 2021</option>
                            <option value="P2">Post PUTME 2022</option>
                        </select>
                    </div>
                    <div class="col-lg-12 m-t-10">
                        <button type="button" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Generate Slip</button>
                    </div>
                </form>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

</template>
