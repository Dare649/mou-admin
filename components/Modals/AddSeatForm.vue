<template>
    <!-- Edit JAMB Result Modal -->
<div class="modal fade SlideUp" id="add_seat" tabindex="-1" role="dialog" aria-hidden="true">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        <i class="pg-close"></i>
    </button>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="text-left p-b-5"><span class="semi-bold">Add Seats to Program</span></h5>
            </div>
            <div class="modal-body">
                <form class="row">
                    <div class="col-lg-12 m-b-10">
                        <label>Select Program</label>
                        <select class="full-width" data-init-plugin="select2">
                            <optgroup label="Agricultural Science Education">
                                <option value="BAE">B.Sc. Agricultural Education</option>
                                <option value="CND">CEC - National Diploma</option>
                                <option value="CPD">CEC - Pre-Degree</option>
                                <option value="PGD">Post Graduation Diploma in Education</option>
                                <option value="DOP">Doctor of Philosophy</option>
                                <option value="MOE">Masters of Education</option>
                            </optgroup>
                            <optgroup label="Biology Education">
                                <option value="BBE">B.Sc. Biology Education</option>
                                <option value="CEN">CEC - National Diploma</option>
                                <option value="PRE">CEC - Pre-Degree</option>
                            </optgroup>
                        </select>
                    </div>
                    <div class="col-lg-12 m-b-10">
                        <label>Total Seats</label>
                        <input type="text" placeholder="Total Seats" class="form-control">
                    </div>
                    <div class="col-lg-12 m-t-10">
                        <button type="button" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Add Record</button>
                    </div>
                </form>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

</template>
