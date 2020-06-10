<template>
  <!-- START PAGE CONTENT -->
  <div class="content sm-gutter">
    <!-- START BREADCRUMBS -->
    <div class="bg-white">
      <div class="container p-l-5">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
          <li class="breadcrumb-item"><nuxt-link to="/academic-session/utme">Academic Session</nuxt-link></li>
          <li class="breadcrumb-item"><nuxt-link :to="`/academic-session/utme/${id}`">PUTME Options</nuxt-link></li>
          <li class="breadcrumb-item active">Student Union Dues</li>
        </ol>
      </div>
    </div>
    <!-- END BREADCRUMBS -->


    <!-- START CONTAINER FLUID -->
    <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
      <div class="card card-default">
        <div class="card-header  ">
          <div class="card-title text-primary">Search Slip Number</div>
        </div>
        <div class="card-body">
          <form class="row" style="width: 100%">
            <div class="col-md-10">
              <input type="text" class="form-control" placeholder="Slip Number" required>
            </div>
            <div class="col-md-2">
              <button type="submit" class="btn btn-primary btn-block">Search Record</button>
            </div>
          </form>
        </div>
      </div>
      <div class="card card-default">
        <div class="card-header ">
          <h3 class="text-primary no-margin pull-left sm-pull-reset">Student Union Dues</h3>
          <div class="pull-right sm-pull-reset">
            <button type="button" class="btn btn-primary btn-sm"  @click="openModal('add_slip')"><i class="fa fa-plus"></i> &nbsp; <strong>Add Slip</strong></button>
            <button type="button" class="btn btn-info btn-sm" @click="downloadSampleCSV"><i class="fa fa-cloud-download"></i> &nbsp; <strong>Download Sample CSV</strong></button>
            <button type="button" class="btn btn-warning btn-sm" data-target="#import_record" data-toggle="modal"><i class="fa fa-arrow-down"></i> &nbsp; <strong>Import Record</strong></button>
            <button type="button" class="btn btn-default btn-sm" @click="openModal('auto_slip')"><i class="fa fa-check"></i> &nbsp; <strong>Auto Generate Slip</strong></button>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-striped table-condensed" id="basicTable">
              <thead>
              <th style="width:50%">Slip Number</th>
              <th style="width:30%">Used</th>
              <th style="width:20%">Action</th>
              </thead>
              <tbody>
              <template v-if="slips.length && !loading">

                <tr v-for="slip in slips">
                  <td>{{ slip.slip_number}}</td>
                  <td>{{ (slip.status === 0) ? 'No' : 'Yes'}}</td>
                  <td>
                    <div class="btn-group">
                      <span data-placement="top" data-toggle="tooltip" title="Edit Record">
                        <button type="button" class="btn btn-default btn-sm" role="button" @click="openModal('add_slip', slip)"><i class="fa fa-pencil"></i></button>
                      </span>
                      <button
                        type="button"
                        @click="deleteRecord($event, slip.id)"
                        class="btn btn-default btn-sm"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Delete Record"><i class="pg-trash"></i></button>
                    </div>
                  </td>
                </tr>
              </template>
              <template v-if="!slips.length && !loading">
                <tr class="text-center">
                  <td colspan="3">No result found</td>
                </tr>
              </template>
              </tbody>
            </table>
            <pagination
              v-bind:pagination="pagination"
              v-on:click.native="getSlips(pagination.current_page)"
              :offset="4">
            </pagination>
          </div>
          <vcl-table :columns="3" v-if="loading" />
        </div>
      </div>
    </div>
    <!-- END CONTAINER FLUID -->
    <add-slip-modal :feeTypes="feeTypes" />
    <auto-generate-slip-modal :feeTypes="feeTypes" />
    <import-slip-modal />
  </div>
  <!-- END PAGE CONTENT -->
</template>
<script>
  import AddSlipModal from '~/components/Modals/AddSlipModal'
  import AutoGenerateSlipModal from '~/components/Modals/AutoGenerateSlipModal'
  import ImportSlipModal from '~/components/Modals/ImportSlipModal'
  export default {
    layout: 'main',
    components: {
      AddSlipModal,
      AutoGenerateSlipModal,
      ImportSlipModal
    },
    data: () => ({
      slips: [],
      id: null,
      loading: true,
      pagination: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      feeType: 'new',
      feeTypes: []
    }),
    methods: {
      downloadSampleCSV() {
        this.$axios.get('api/putme-sessions/student-union-dues/sample').then(res => {
          if (res.data.success) {
            window.location.href = res.data.message;
          }
        })
      },
      getSlips(page) {
        this.$axios.get(`api/putme-sessions/student-union-dues?session_id=${this.id}&slug=${this.feeType}`).then(res => {
          this.loading = false
          this.slips = res.data.data.data;
          this.pagination = res.data.data;
        })
      },
      getFeeTypes() {
        this.$axios.get('api/utilities/fees-type').then(res => {
          if (res.data.status) {
            res.data.data.map(type => {
              this.feeTypes.push({
                id: type.id,
                text: type.slug
              })
            });
          }
        })
      },
      deleteRecord(e, id) {
        const vm = this;
        this.$swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            this.$axios.delete(`api/putme-sessions/student-union-dues/${id}`).then(res => {
              if (res.data.status) {
                $(e.target).closest('tr').remove();
                this.$swal({
                  position: 'bottom-end',
                  icon: 'success',
                  title: 'Slip has been deleted!',
                  showConfirmButton: false,
                  timer: 1500
                })
              }
            })

          }
        })
      },
      openModal(modal, slip = '') {
        $('#' + modal).modal('show');
        setTimeout(() => {
          this.$nuxt.$emit('open:modal', 'dues', slip);
        }, 200)

      }
    },
    mounted() {
      this.id = this.$route.params.putmeId;
      this.getSlips(1);

      this.getFeeTypes()
    }
  }
</script>

