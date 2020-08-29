<template>
    <!-- Import Record (CSV) Modal -->
<div class="modal fade SlideUp" id="import_record" tabindex="-1" role="dialog" aria-hidden="true">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        <i class="pg-close"></i>
    </button>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="text-left p-b-5"><span class="semi-bold">Import Record (CSV)</span></h5>
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
  props: ['feeTypes'],
  data() {
    return {
      formData: {
        session_id: '',
        fee_type: 1
      }
    }
  },
  methods: {
    importSugDues() {
      $("#importBtn").attr('disabled', true).html('Importing...');
      this.data = new FormData()
      this.data.append('file', this.$refs.file.files[0])
      this.data.append('session_id', this.formData.session_id)
      this.data.append('fee_type', this.formData.fee_type)
      this.$store.dispatch('academic-session/importPutmeSug', this.data)
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
    this.formData.session_id = this.$route.params.putmeId;
  }
}
</script>
<style>
.select2 {
  width: 100% !important;
}
</style>
