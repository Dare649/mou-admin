<template>
  <div class="content sm-gutter">
    <!-- START BREADCRUMBS -->
    <div class="bg-white">
      <div class="container p-l-5">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
          <li class="breadcrumb-item"><a href="#">Utilities</a></li>
          <li class="breadcrumb-item active">Import Images</li>
        </ol>
      </div>
    </div>
    <!-- END BREADCRUMBS -->

    <!-- START CONTAINER FLUID -->
    <div class="container sm-padding-10 p-t-20 p-b-20">
      <div class="row">
        <div class="col-md-12">
          <div class="card card-default">
            <div class="card-header  separator">
              <h3 class="text-primary no-margin p-b-10">Import PUTME Images</h3>
            </div>
            <div class="card-body">
              <form enctype="multipart/form-data" class="p-4" @submit.prevent="submit">
                <div class="row">
                  <div class="form-group col-md-12">
                    <label>Select Images to upload</label>
                    <div class="custom-file">
                      <input type="file" ref="file" multiple="multiple" class="custom-file-input" id="customFileLang" lang="es" required>
                      <label class="custom-file-label" for="customFileLang">Select File</label>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <hr/>
                    <button id="submitBtn" type="submit" class="btn btn-primary m-t-5 m-r-10"><i class="fa fa-upload"></i> &nbsp; Upload</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
    <!-- END CONTAINER FLUID -->
  </div>
</template>
<script>
export default {
  layout: 'main',
  data: () => ({
    images: []
  }),
  methods: {
    submit() {
      $('#submitBtn').attr('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> &nbsp; Uploading');
      let data = new FormData();
      for( let i = 0; i < this.$refs.file.files.length; i++ ){
        let file = this.$refs.file.files[i];
        data.append('images[' + i + ']', file)
      }

      this.$store.dispatch('utility/importPutmeImages', data)
        .then(res =>{
          $('#submitBtn').attr('disabled', false).html('<i class="fa fa-upload"></i> &nbsp; Upload');
          if(res.data.status) {
            this.$refs.file.value = null;
            this.$toast.success('Message: ' + res.data.message.message + ' ----- Uploaded successfully:' + res.data.message.count)
            return
          }

          this.$toast.error(res.data.message)
        }).catch(err =>{
        $('#submitBtn').attr('disabled', false).html('<i class="fa fa-upload"></i> &nbsp; Upload');
          this.$toast.error('An error occurred')
      })
    }
  },
  mounted() {

  }
}
</script>
