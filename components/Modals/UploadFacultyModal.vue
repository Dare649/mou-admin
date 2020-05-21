<template>
    <!-- Upload Faculty Modal -->
    <div class="modal fade SlideUp" id="upload_o_faculty" tabindex="-1" role="dialog" aria-hidden="true">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
            <i class="pg-close"></i>
        </button>
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="text-left p-b-5"><span class="semi-bold">Upload Our New Faculty</span></h5>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-12 m-b-10">
                            <input type="text" placeholder="File Caption" class="form-control input-lg" id="icon-filter" name="icon-filter">
                        </div>
                        <div class="col-lg-12 m-b-10">
                            <div class="custom-file">
                                <input type="file" ref="myFiles" class="custom-file-input" id="customFileLang" lang="es">
                                <label class="custom-file-label" for="customFileLang">Select File</label>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <button type="button" @click="uploadFaculties()" v-if="!loading"  class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Upload Record</button>
                            <button type="button" disabled v-if="loading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Uploading</button>
                        </div>
                        <div class="col-lg-12 m-t-15">
                            <div class="dd-placeholder p-1">
                                <h5 class="pull-left sm-pull-reset"><i class="fa fa-file-excel-o p-l-10"></i> Sample File</h5>
                                <button v-if="!downloading" @click="downloadFacultySampleFile()" class="pull-right sm-pull-reset btn btn-default m-t-5 m-r-10"><i class="fa fa-arrow-down"></i> &nbsp; Download</button>
                                  <button disabled v-if="downloading" class="pull-right sm-pull-reset btn btn-default m-t-5 m-r-10"><i class="fa fa-arrow-down"></i>&nbsp; Downloading</button>
                                <div class="clearfix"></div>
                            </div>
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
    data() {
      return { 
        addloading: false,
        downloading: false,
        loading: false,
        deleteLoading: false,
        editLoading: false,
        exportLoading: false,
        faculties: [],
        file: ""
      }
    },
    methods: {
        uploadFaculties(){
            this.loading = true
            this.file = this.$refs.myFiles.files[0];
            let formData = new FormData();
            formData.append('file', this.file);
            this.$store
                .dispatch('get-started/uploadFaculties', formData)
                .then(res => {
                if(res != undefined){
                    if(res.status == true){
                        this.loading = false
                        //this.getFaculties()
                        $('#upload_o_faculty').modal('hide').data( 'bs.modal', null )          
                        this.$toast.success(res.message, {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});  
                    }else{
                        this.loading = false
                        alert("File Upload Unsuccessful")
                        this.ErrMsg = "Error Logging in!"
                    }
                }else{
                    this.loading = false
                    console.log(res)
                    alert("File Upload Unsuccessful")
                    this.ErrMsg = "Error Logging in!"
                }      
            }).catch(err => {
            this.loading = false
            })
        },
        downloadFacultySampleFile(){
          this.downloading = true
          this.$store
            .dispatch('get-started/downloadFacultySampleFile')
            .then(res => {
            if(res != undefined){     
                if(res.success == true)    {
                    window.location = res.message
                    this.downloading = false
                    $('#upload_o_faculty').modal('hide').data( 'bs.modal', null )          
                    this.$toast.success('Download Successful!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});  
                }
                     
            }else{
                this.downloading = false
                alert("File Download Unsuccessful")
            }      
        }).catch(err => {
          this.downloading = false
        })
      },
    }
}
</script>
