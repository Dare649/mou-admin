<template>
    <!-- Auto Generate Slip Modal -->
<div class="modal fade SlideUp" id="auto_slip" tabindex="-1" role="dialog" aria-hidden="true">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        <i class="pg-close"></i>
    </button>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="text-left p-b-5"><span class="semi-bold">Auto Generate Slip</span></h5>
            </div>
            <div class="modal-body">
                <form class="row">
                    <div class="col-lg-12 m-b-10">
                        <label>Slip Quantity</label>
                        <input type="text" placeholder="Slip Quantity" class="form-control">
                    </div>
                    <div class="col-lg-12 m-b-10">
                        <label>Slip Amount</label>
                        <input type="text" placeholder="Slip Amount" class="form-control">
                    </div>
                    <div class="col-lg-6 m-b-10">
                        <label>Slip Number Length</label>
                        <input type="text" placeholder="Slip Number Length" class="form-control">
                    </div>
                    <div class="col-lg-6 m-b-10">
                        <label>Slip Format</label>
                        <select class="full-width" data-init-plugin="select2">
                            <option value="VC">VarChar</option>
                            <option value="IO">Integer Only</option>
                            <option value="CO">Char Only</option>
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
