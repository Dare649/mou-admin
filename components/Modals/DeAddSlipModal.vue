<template>
  <!-- Auto Generate Slip Modal -->
  <div class="modal fade SlideUp" id="add_slip" tabindex="-1" role="dialog" aria-hidden="true">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
      <i class="pg-close"></i>
    </button>
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="text-left p-b-5"><span class="semi-bold">Add Slip</span></h5>
        </div>
        <div class="modal-body">
          <ValidationObserver class=" full-width" v-slot="{ handleSubmit, reset, invalid }">
            <form class="row" @submit.prevent="handleSubmit(submitForm)" @reset.prevent="reset">
              <div class="col-lg-12 m-b-10">
                <label>Slip Number</label>
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <input type="text" v-model="formData.slip_number" placeholder="Slip Number" class="form-control">
                  <small class="error">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div class="col-lg-12 m-b-10">
                <label>Slip Amount</label>
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <input type="text" v-model="formData.slip_amount" placeholder="Slip Amount" class="form-control">
                  <small class="error">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div class="col-lg-12 m-t-10">
                <label>Fee Type</label>
                <Select2 v-model="formData.fee_type" :options="feeTypes" />
              </div>
              <div class="col-lg-12 m-t-10">
                <button
                  id="addSlipBtn"
                  type="submit"
                  class="btn btn-primary btn-lg btn-large fs-16 semi-bold"
                  :disabled="invalid">Add Slip</button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
</template>
<script>
export default {
  props: ['feeTypes', 'queryType'],
  data: () => ({
    formData: {
      slip_amount: '',
      slip_number: '',
      status: 0,
      fee_type: '',
      session_id: ''
    },
    id: '',
    serviceType: ''
  }),
  methods: {
    async submitForm() {
      $('#addSlipBtn').attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i> Saving...');
      if(this.id) {
        let $url = `api/${this.queryType}/late-fees-slip/${this.id}`;
        if(this.serviceType === 'dues') {
          $url = `api/${this.queryType}/student-union-dues/${this.id}`;
        }
        await this.$axios.put($url, this.formData).then(res =>{
          $('#addSlipBtn').attr('disabled', false).html('Add Slip');
          if (res.data.status) {
            $('#add_slip').modal('hide');

            this.$swal({
              position: 'top-end',
              icon: 'success',
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500
            })

            this.formData.slip_number = '';
            this.formData.slip_amount = '';
            this.formData.fee_type = '';
          } else {
            this.$toast.error(res.data.message, {position: 'top-center', fullWidth: false, theme: 'bubble'});
          }
        }).catch(err =>{
          $('#addSlipBtn').attr('disabled', false).html('Add Slip');
          this.$toast.error(err)
        })
      } else {

        let $url = `api/${this.queryType}/late-fees-slip`;
        if(this.serviceType === 'dues') {
          $url = `api/${this.queryType}/student-union-dues`;
        }
        await this.$axios.post($url, this.formData).then(res =>{
          if (res.data.status) {
            $('#add_slip').modal('hide');

            this.$swal({
              position: 'top-end',
              icon: 'success',
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500
            })

            this.formData.slip_number = '';
            this.formData.slip_amount = '';
            this.formData.fee_type = '';
          } else {
            this.$toast.error(res.data.message, {position: 'top-center', fullWidth: false, theme: 'bubble'});
          }
        }).catch(err =>{
          $('#addSlipBtn').attr('disabled', false).html('Add Slip');
          this.$toast.error(err)
        })
      }
    }
  },
  mounted() {
    this.formData.session_id = this.$route.params.deId;

    this.$nuxt.$on('open:modal', (type, slip) => {
      this.serviceType = type;
      if (slip) {
        this.formData.slip_number = slip.slip_number;
        this.formData.slip_amount = slip.slip_amount;
        this.formData.fee_type = slip.school_fee_type_id;
        this.id = slip.id;
      }
    })
  }
}
</script>
<style>
.select2 {
  width: 100% !important;
}
</style>
