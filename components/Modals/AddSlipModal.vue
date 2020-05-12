<template>
    <!-- Add Slip Modal -->
<div class="modal fade SlideUp" id="add_slip" tabindex="-1" role="dialog" aria-hidden="true">
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
                        <label>Slip Number</label>
                        <input type="text" placeholder="Slip Number" class="form-control">
                    </div>
                    <div class="col-lg-12 m-t-10">
                        <button type="button" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Add Slip</button>
                    </div>
                </form>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
</template>
