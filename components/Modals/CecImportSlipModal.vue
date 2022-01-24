<template>
    <!-- Import Record (CSV) Modal -->
<div class="modal fade SlideUp" id="import_record" tabindex="-1" role="dialog" aria-hidden="true">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        <i class="pg-close"></i>
    </button>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="text-left p-b-5"><span class="semi-bold">Import UTME SUG Dues Record (CSV)</span></h5>
            </div>
            <div class="modal-body">
                <div class="row">
                  <div class="col-lg-12 m-b-10">
                    <div class="custom-file">
                      <input type="file" ref="file" class="custom-file-input" id="customFileLang" lang="es">
                      <label class="custom-file-label" for="customFileLang">Select File</label>
                    </div>
                  </div>
                  <div class="col-lg-12 m-b-10">
                    <label>Fee Type</label>
                    <Select2 v-model="formData.fee_type" :options="feeTypes" />
                  </div>
                  <div class="col-lg-12 m-b-10">
                    <label>Entry mode</label>
                    <Select2 v-model="formData.entry_mode" :options="entryModes" />
                  </div>
                  <div class="col-lg-12 m-b-10">
                    <label>Session</label>
                    <Select2 v-model="formData.session_id" :options="sessions" />
                  </div>
                  <div class="col-lg-12">
                      <button type="button" @click="importSugDues" id="importBtn" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Import Record</button>
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
<script>
export default {
  props: ['feeTypes', 'entryModes', 'sessions'],
  data() {
    return {
      formData: {
        session_id: '',
        cec_session_id: '',
        fee_type: 1,
        entry_mode: ''
      }
    }
  },
  methods: {
    importSugDues() {
      $("#importBtn").attr('disabled', true).html('Importing...');
      let data = new FormData()
      data.append('file', this.$refs.file.files[0])
      data.append('session_id', this.formData.session_id)
      data.append('cec_session_id', this.formData.cec_session_id)
      data.append('fee_type', this.formData.fee_type)
      data.append('entry_mode', this.formData.entry_mode)
      this.$store.dispatch('cec/importCecSug', data)
        .then(res =>{
          $("#importBtn").attr('disabled', false).html('Import Record');
          if(res.data.status) {
            this.$toast.success(res.data.message)
            this.clearForm()
            $('#import_record').modal('hide')
            return
          }
          this.$toast.error(res.data.message)
        }).catch(err =>{
        $("#importBtn").attr('disabled', false).html('Import Record');
        this.$toast.error(err)
      })
    },
    clearForm() {
      const input = this.$refs.file;
      input.type = 'text';
      input.type = 'file';
      this.formData.fee_type = ''
    }
  },
  mounted() {
    this.formData.cec_session_id = this.$route.params.cecId;
  }
}
</script>
<style>
.select2 {
  width: 100% !important;
}
</style>
