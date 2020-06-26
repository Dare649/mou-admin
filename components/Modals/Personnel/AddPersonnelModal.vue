<template>
  <div class="modal fade SlideUp" id="add_personnel" tabindex="-1" role="dialog" aria-hidden="true">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        <i class="pg-close"></i>
    </button>
    <div class="modal-dialog modal-xlg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="text-left p-b-5"><span class="semi-bold">Add New Addmin</span></h5>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-6 m-b-10">
                        <input type="text" placeholder="First Name" class="form-control">
                    </div>
                    <div class="col-lg-6 m-b-10">
                        <input type="text" placeholder="Last Name" class="form-control">
                    </div>
                    <div class="col-lg-6 m-b-10">
                        <input type="text" placeholder="Username" class="form-control">
                    </div>
                    <div class="col-lg-6 m-b-10">
                        <input type="password" placeholder="Password" class="form-control">
                    </div>
                    <div class="col-lg-6 m-b-10">
                        <input type="text" placeholder="Address" class="form-control">
                    </div>
                    <div class="col-lg-6 m-b-10">
                        <input type="text" placeholder="Phone Number" class="form-control">
                    </div>
                    <div class="col-lg-6 m-b-10">
                        <input type="text" placeholder="Email Address" class="form-control">
                    </div>
                    <div class="col-lg-6 m-b-10">
                        <select class="full-width" data-init-plugin="select2">
                            <option value="" disabled selected>Marital Status</option>
                            <option value="M">M</option>
                            <option value="F">F</option>
                        </select>
                    </div>
                    <div class="col-lg-6 m-b-10">
                        <input type="text" placeholder="Date of Birth (dd/mm/yyyy)" class="form-control">
                    </div>
                    <div class="col-lg-6 m-b-10">
                        <select class="full-width" data-init-plugin="select2">
                            <option value="" disabled selected>Gender</option>
                            <option value="M">M</option>
                            <option value="F">F</option>
                        </select>
                    </div>
                    <div class="col-lg-6 m-b-10">
                        <input type="text" placeholder="Date Joined (dd/mm/yyyy)" class="form-control">
                    </div>
                    <div class="col-lg-6 m-b-10">
                        <select class="full-width" data-init-plugin="select2">
                            <option value="" disabled selected>Role</option>
                            <option value="M">M</option>
                            <option value="F">F</option>
                        </select>
                    </div>
                    <div class="col-lg-12">
                        <h6>Next of Kin</h6>
                        <hr>
                    </div>
                    <div class="col-lg-12 m-b-10">
                        <input type="text" placeholder="Name" class="form-control">
                    </div>
                    <div class="col-lg-6 m-b-10">
                        <input type="text" placeholder="Relationship" class="form-control">
                    </div>
                    <div class="col-lg-6 m-b-10">
                        <input type="text" placeholder="Email Address" class="form-control">
                    </div>
                    <div class="col-lg-6 m-b-10">
                        <input type="text" placeholder="Phone Number" class="form-control">
                    </div>
                    <div class="col-lg-6 m-b-10">
                        <input type="text" placeholder="Address" class="form-control">
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
</template>
