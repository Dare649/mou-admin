<template>
  <div class="content sm-gutter">
    <!-- START BREADCRUMBS -->
    <div class="bg-white">
      <div class="container p-l-5">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
          <li class="breadcrumb-item"><a href="#">Utilities</a></li>
          <li class="breadcrumb-item active">Import returning students</li>
        </ol>
      </div>
    </div>
    <!-- END BREADCRUMBS -->

    <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0" v-if="response.success">
      <div class="card card-default">
        <div class="card-body">
          <div class="alert alert-danger" v-if="response.errors.length > 0">
            <strong>The Following Errors Occurred:</strong>
            <p>
              <ul v-for="item in response.errors" :key="response[item]">
                <li>Row: {{ item.row }} ---- <span>Attribute: {{ item.attribute }}</span> ---- <span >Messages: {{ item.message }}</span></li>
              </ul>
              <a :href="response.error_file" target="_blank" download>Click here to download error file</a>
            </p>
          </div>
          <div class="alert alert-success">
            <strong>Audit Trail Performed.</strong>
            <p>File Successfully Imported: {{ response.count }} Records Imported</p>
          </div>
        </div>
      </div>
    </div>

    <!-- START CONTAINER FLUID -->
    <div class="container sm-padding-10 p-t-20 p-b-20">
      <div class="row">
        <div class="col-md-12">
          <div class="card card-default">
            <div class="card-header  separator">
              <h3 class="text-primary no-margin p-b-10">Import returning student</h3>
            </div>
            <div class="card-body">
              <form class="p-4" @submit.prevent="importDetails">
                <div class="row">
                  <div class="form-group col-md-6">
                    <label>Select Mode</label>
                    <select required class="form-control" v-model="formData.entry_mode">
                      <option value="" disabled selected>Select your option</option>
                      <option value="PUTME/DE">PUTME/ DE</option>
                      <option value="PG">PG</option>
                      <option value="CEC">CEC</option>
                    </select>
                  </div>
                  <div class="form-group col-md-6">
                    <label>Select Excel file to upload</label>
                    <div class="custom-file">
                      <input type="file" ref="file" class="custom-file-input" id="customFileLang" lang="es" required>
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
    response: {},
    formData: {
      entry_mode: ''
    }
  }),
  methods: {
    importDetails () {
      $('#submitBtn').attr('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> Uploading')
      this.loading = true
      let data = new FormData()
      data.append('file', this.$refs.file.files[0])
      data.append('entry_mode', this.formData.entry_mode)
      this.$store.dispatch('utility/importReturningStudents', data)
        .then(res =>{
          $('#submitBtn').attr('disabled', false).html('<i class="fa fa-upload"></i> &nbsp; Upload')
          if(res.data.success) {
            this.response = res.data
            this.loading = false
            return
          }
          this.$toast.error('An error occurred')
        }).catch(err =>{
        $('#submitBtn').attr('disabled', false).html('<i class="fa fa-upload"></i> &nbsp; Upload')
          this.$toast.error(err)
          this.loading = false
        })
    }
  }
}
</script>
