<template>
    <!-- Add Faculty Modal -->
    <div class="modal fade SlideUp" id="add_o_faculty" tabindex="-1" role="dialog" aria-hidden="true">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
            <i class="pg-close"></i>
        </button>
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="text-left p-b-5"><span class="semi-bold">Add New Our Faculty</span></h5>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-12 m-b-10">
                            <input type="text" v-model="model.name" placeholder="Faculty Name" class="form-control input-lg" id="icon-filter" name="icon-filter">
                        </div>
                        <div class="col-lg-12 m-b-10">
                            <input type="text" v-model="model.prefix" placeholder="Faculty Abbreviation" class="form-control input-lg" id="icon-filter" name="icon-filter">
                        </div>
                        <div class="col-lg-12 m-b-10">
                            <input v-model="model.status" type="radio" name="exampleRadios" id="exampleRadios1" value="1" checked>
                            <label for="exampleRadios1">
                                Activate Faculty
                            </label>
                        </div>

                        <div class="col-lg-12 m-b-10">
                            <input v-model="model.status" type="radio" name="exampleRadios" id="exampleRadios2" value="0">
                            <label for="exampleRadios2">
                                Deactivate Faculty
                            </label>
                        </div>
                        <div class="col-lg-12">
                            <button type="button" v-if="!loading" @click="createFaculty()" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Add Record</button>
                            <button type="button" v-if="loading" disabled class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Adding Record</button>
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
        file: "",
        model: {
          name: "",
          id: 0,
          prefix: "",
          status: "",
          edit_prefix: "",
          edit_status: "",
          edit_name: ""
        },
      }
    },
    methods: {
        getFaculties(){
            this.$store
            .dispatch('get-started/getFaculties')
            .then(res => {
            if(res != undefined){
                if(res.status == true){
                    this.getloading = false
                    this.faculties = res.data
                    //console.log(this.countries)
                    }else{
                        this.getloading = false
                        this.ErrMsg = "Error Fetching data!"
                    }
                }else{
                    this.getloading = false
                    this.ErrMsg = "Error Fetching data!"
                }      
            }).catch(err => {
                this.getloading = false
            })
        },
        createFaculty(){
            this.loading = true
            let bodyFormData = new FormData();
            bodyFormData.set('name', this.model.name)
            bodyFormData.set('prefix', this.model.prefix)
            bodyFormData.set('status', this.model.status)
            this.$store
            .dispatch('get-started/createFaculty', bodyFormData)
            .then(res => {
            if(res != undefined){
                if(res.status == true){
                    this.getFaculties()
                    this.loading = false
                    $('#add_o_faculty').modal('hide').data( 'bs.modal', null ) 
                    this.model = {}
                }else{
                    this.loading = false
                    this.ErrMsg = "Error Creating Record!"
                }
            }else{
                this.loading = false
                this.ErrMsg = "Error Logging in!"
            }      
            }).catch(err => {
            this.loading = false
            })
        },
    }
}
</script>