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
                <ValidationObserver class=" full-width" v-slot="{ handleSubmit, reset, invalid }">
                    <form class="row" @submit.prevent="handleSubmit(submitForm)" @reset.prevent="reset">
                        <div class="col-lg-12 m-b-10">
                            <label>Slip Quantity</label>
                            <ValidationProvider rules="required" v-slot="{ errors }">
                              <input type="text" v-model="formData.slip_quantity" placeholder="Slip Quantity" class="form-control">
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
                        <div class="col-lg-6 m-b-10">
                            <label>Slip Number Length</label>
                            <ValidationProvider rules="required" v-slot="{ errors }">
                              <input type="text" v-model="formData.slip_length" placeholder="Slip Number Length" class="form-control">
                              <small class="error">{{ errors[0] }}</small>
                            </ValidationProvider>
                        </div>
                        <div class="col-lg-6 m-b-10">
                            <label>Slip Format</label>
                            <Select2 v-model="formData.slip_format" :options="slipFormatOptions" />
                        </div>
                        <div class="col-lg-12 m-t-10">
                          <label>Fee Type</label>
                          <Select2 v-model="formData.fee_type" :options="feeTypes" />
                        </div>
                        <div class="col-lg-12 m-t-10">
                            <button
                              id="generateBtn"
                              type="submit"
                              class="btn btn-primary btn-lg btn-large fs-16 semi-bold"
                              :disabled="invalid">Generate Slip</button>
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
    props: ['feeTypes'],
    data: () => ({
      formData: {
        slip_amount: '',
        slip_quantity: '',
        slip_length: '',
        slip_format: 'varchar',
        fee_type: 1,
        session_id: ''
      },
      slipFormatOptions: [
        {id: 'varchar', text: 'Varchar'},
        {id: 'integer', text: 'Integer Only'},
        {id: 'char', text: 'Char'}
      ],
      serviceType: ''
    }),
    methods: {
      submitForm() {
        $('#generateBtn').attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i> Generating...');
        let $url = 'api/putme-sessions/late-fees-slip/auto-generate';
        if(this.serviceType === 'dues') {
          $url = 'api/putme-sessions/student-union-dues/auto-generate'
        }
        this.$axios.post($url, this.formData).then(res => {
          $('#generateBtn').attr('disabled', false).html('Generate Slip');

          if(res.data.status) {
            $('#auto_slip').modal('hide');
            this.$swal({
              position: 'top-end',
              icon: 'success',
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500
            })
            this.formData = {
              slip_amount: '',
              slip_quantity: '',
              slip_length: '',
              slip_format: '',
              fee_type: '',
              session_id: ''
            }
          }
        }).catch(err => {
          $('#generateBtn').attr('disabled', false).html('Generate Slip');
          this.$toast.error('Something went wrong.', {position: 'top-center', fullWidth: false, theme: 'bubble'});
          console.log(err)
        })
      }
    },
    mounted() {
      this.formData.session_id = this.$route.params.putmeId;

      this.$nuxt.$on('open:modal', (type) => {
        this.serviceType = type;
      })
    }
  }
</script>
<style>
  .select2 {
    width: 100% !important;
  }
</style>
