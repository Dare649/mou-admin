<template>
  <div class="content sm-gutter">
    <!-- START BREADCRUMBS -->
    <div class="bg-white">
      <div class="container p-l-5">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
          <li class="breadcrumb-item"><a href="#">Utilities</a></li>
          <li class="breadcrumb-item active">PUTME Student Upload</li>
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
              <li>Row: {{item.row}} ---- <span>Attribute: {{item.attribute}}</span> ---- <span >Messages: {{item.message}}</span></li>
            </ul>
            <a :href="response.error_file" target="_blank" download>Click here to download error file</a>
            </p>
          </div>
          <div class="alert alert-success">
            <strong>Audit Trail Performed.</strong>
            <p>File Successfully Imported: {{response.count}} Records Imported</p>
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
              <h3 class="text-primary no-margin p-b-10">Registered PUTME Students Upload</h3>
            </div>
            <div class="card-body">
              <form class="p-4" @submit.prevent="importRecord">
                <div class="row">
                  <div class="form-group col-md-6">
                    <label>Select Session</label>
                    <select required class="form-control" v-model="formData.academic_session_name">
                      <option value="" disabled selected>Select your option</option>
                      <option value="2009/2010">2009/2010</option>
                      <option value="2010/2011">2010/2011</option>
                      <option value="2011/2012">2011/2012</option>
                      <option value="2012/2013">2012/2013</option>
                      <option value="2013/2014">2013/2014</option>
                      <option value="2014/2015">2014/2015</option>
                      <option value="2015/2016">2015/2016</option>
                      <option value="2016/2017">2016/2017</option>
                      <option value="2017/2018">2017/2018</option>
                      <option value="2018/2019">2018/2019</option>
                      <option value="2019/2020">2019/2020</option>
                      <option value="2020/2021">2020/2021</option>
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
  layout: "main",
  data: () => ({
    loading: false,
    formData: {
      academic_session_name: ''
    },
    response: {},
  }),
  methods: {
    importRecord() {
      $('#submitBtn').attr('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> Uploading')
      this.loading = true
      let data = new FormData()
      data.append('file', this.$refs.file.files[0])
      data.append('academic_session_name', this.formData.academic_session_name)
      this.$store.dispatch('putme/importRegisteredPUTME', data)
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
  },
  mounted() {

  }
}
</script>
