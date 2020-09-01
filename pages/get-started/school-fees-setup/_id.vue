<template>
  <div>

    <div class="modal fade SlideUp" id="add_school_fees" tabindex="-1" role="dialog" aria-hidden="true">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        <i class="pg-close"></i>
      </button>
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="text-left p-b-5"><span class="semi-bold">School Fees Setup - Program Name</span></h5>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-lg-6 m-b-10">
                <input type="text" class="form-control" placeholder="Name" />
              </div>
              <div class="col-lg-6 m-b-10">
                <select class="form-control">
                  <option value="" selected>Select Academic Session</option>
                </select>
              </div>
              <div class="col-lg-6 m-b-10">
                <input type="text" class="form-control" placeholder="School Fees Amount" />
              </div>
              <div class="col-lg-6 m-b-10">
                <input type="text" class="form-control" placeholder="School Fees Amount Returning " />
              </div>
              <div class="col-lg-6 m-b-10">
                <input type="text" class="form-control" placeholder="New Hostel Fees" />
              </div>
              <div class="col-lg-6 m-b-10">
                <input type="text" class="form-control" placeholder="Old Hostel Fees" />
              </div>
              <div class="col-lg-6 m-b-10">
                <input type="text" class="form-control" placeholder="Extra Year Fees" />
              </div>
              <div class="col-lg-6 m-b-10">
                <input type="text" class="form-control" placeholder="Level" />
              </div>
              <div class="col-lg-6 m-b-10">
                <select class="form-control">
                  <option value="" selected>Semester</option>
                  <option value="1">1st Semester</option>
                  <option value="2">2nd Semester</option>
                </select>
              </div>
              <div class="col-lg-6 m-b-10">
                <select class="form-control">
                  <option value="" selected>Entry Mode</option>
                  <option value="putme">PUTME</option>
                  <option value="direct-entry">Direct Entry</option>
                </select>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-lg-12">
                <button type="button" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Save Record</button>
              </div>
            </div>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>


    <div class="modal fade SlideUp" id="import_school_fees" tabindex="-1" role="dialog" aria-hidden="true">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        <i class="pg-close"></i>
      </button>
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="text-left p-b-5"><span class="semi-bold">Import Schol Fees - Program Name</span></h5>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-lg-6 m-b-10">
                <select class="form-control">
                  <option value="" selected>Select Academic Session</option>
                </select>
              </div>
              <div class="col-lg-6 m-b-10">
                <select class="form-control">
                  <option value="" selected>Entry Mode</option>
                  <option value="putme">PUTME</option>
                  <option value="direct-entry">Direct Entry</option>
                </select>
              </div>
              <div class="col-lg-12 m-b-10">
                <input type="file" class="form-control" ref="file" />
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-lg-6">
                <button type="button" class="btn btn-primary m-t-5 m-r-10">Import Record</button>
              </div>
              <div class="col-lg-6">
                <button class="pull-right sm-pull-reset btn btn-default m-t-5 m-r-10">
                  <i class="fa fa-arrow-down"></i> &nbsp; Download Sample
                </button>
              </div>
            </div>
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
            <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
            <li class="breadcrumb-item">Get Started</li>
            <li class="breadcrumb-item"><nuxt-link :to="'/get-started/departments/'" >Departments</nuxt-link></li>
            <li class="breadcrumb-item">Programs</li>
            <li class="breadcrumb-item active">School Fees Setup</li>
          </ol>
        </div>
      </div>
      <!-- END BREADCRUMBS -->

      <!-- START CONTAINER FLUID -->
      <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
        <div class="card card-default">
          <div class="card-header">
            <div class="card-title text-primary">Search Record</div>
          </div>
          <div class="card-body">
            <form style="width: 100%">
              <div class="row">
                <div class="col-md-5">
                  <input type="text" class="form-control" placeholder="Setup Name" required />
                </div>
                <div class="col-md-5">
                  <select class="form-control">
                    <option value="" selected>Session</option>
                    <option value="2012">2012</option>
                    <option value="2013">2013</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                  </select>
                </div>
                <div class="col-md-2">
                  <button type="button" class="btn btn-primary btn-block">Search Record</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="card card-default">
          <div class="card-header">
            <h3 class="text-primary no-margin pull-left sm-pull-reset">School Fees Setup Management</h3>
            <div class="pull-right sm-pull-reset">
              <nuxt-link :to="'/get-started/program/'" > <button type="button" class="btn btn-primary btn-sm"> <i class="fa fa-step-backward" aria-hidden="true"></i></button>&nbsp;&nbsp;</nuxt-link>
              <button type="button" class="btn btn-primary btn-sm" data-target="#add_school_fees" data-toggle="modal"><i class="fa fa-plus"></i>&nbsp;<strong>New School Fees Setup</strong></button>
              <button type="button" class="btn btn-warning btn-sm" data-target="#import_school_fees" data-toggle="modal"><i class="fa fa-upload"></i>&nbsp;<strong>Import School Fees</strong></button>
              <button type="button" class="btn btn-dark btn-sm" data-toggle="modal"><i class="fa fa-download"></i>&nbsp;<strong>Export Record</strong></button>
            </div>
            <div class="clearfix"></div>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-striped table-condensed" id="basicTable">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Returning</th>
                    <th>New hostel</th>
                    <th>Old hostel</th>
                    <th>Level</th>
                    <th style="width: 17%;">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="loading">
                    <td colspan="7">Loading....please wait</td>
                  </tr>
                  <tr v-if="!loading && setups.length < 1">
                    <td colspan="7">No record at the moment</td>
                  </tr>
                  <tr v-if="!loading && setups.length > 0">
                    <td>Year 1 school</td>
                    <td>6500</td>
                    <td>0</td>
                    <td>5000</td>
                    <td>1000</td>
                    <td>100</td>
                    <td>
                      <a href="" class="btn btn-default btn-sm" title="View details" role="button" data-toggle="modal"><i class="fa fa-eye"></i></a>
                      <a href=""  class="btn btn-default btn-sm" title="Edit details" role="button" data-toggle="modal"><i class="fa fa-pencil"></i></a>
                      <a href="" class="btn btn-default btn-sm" title="Delete detail" role="button" data-toggle="modal"><i class="pg-trash"></i></a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <Pagination
                v-bind:pagination="pagination"
                v-on:click.native="getSchoolFeesById(pagination.current_page)"
                :offset="4">
              </Pagination>
            </div>
          </div>
        </div>
      </div>
      <!-- END CONTAINER FLUID -->
    </div>
  </div>
</template>
<script>
import Pagination from '~/components/Pagination'

export default {
  name: "schoolfees",
  layout: "main",
  components: {
    Pagination
  },
  data() {
    return {
      setups: [],
      loading: true,
      pagination: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
    }
  },
  methods: {
    getSchoolFeesById(page) {
      this.loading = false
    },
    searchSetup() {

    }
  },
  mounted() {
    this.getSchoolFeesById(1)
  }
}
</script>
