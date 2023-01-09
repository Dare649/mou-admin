<template>

  <div class="content sm-gutter" >
    <!-- START BREADCRUMBS -->
    <div class="bg-white">
      <div class="container p-l-5">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
          <li class="breadcrumb-item"><a href="#">Utilities</a></li>
          <li class="breadcrumb-item active">Change student levels</li>
        </ol>
      </div>
    </div>
    <!-- END BREADCRUMBS -->

    <!-- START JUMBOTRON -->
    <div class="jumbotron" data-pages="parallax" data-scroll-element=".page-container">
      <div class=" container p-l-0 p-r-0   container-fixed-lg sm-p-l-0 sm-p-r-0">
        <div class="inner">
          <!-- START BREADCRUMB -->
          <div class="row">
            <div class="col-md-12">
              <!-- START card -->
              <div class="card card-transparent text-center">
                <div class="card-header ">
                  <div class="card-title">DESCRIPTION</div>
                </div>
                <div class="card-body">
                  <h6 class="semi-bold">This section allows you change the levels of all students at the end of an academic year.</h6>
                </div>
              </div>
              <!-- END card -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END JUMBOTRON -->

    <div class="modal fade SlideUp" id="changeLevels" tabindex="-1" role="dialog" aria-hidden="true">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        <i class="pg-close"></i>
      </button>
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="text-left p-b-5"><span class="semi-bold">SELECT</span></h5>
          </div>
          <div class="modal-body">
            <div class="row">
              <form class="full-width" @submit.prevent="submit">
                <div class="col-lg-12 m-b-10">
                  <select class="form-control" v-model="formData.program">
                    <option value="" selected>All</option>
                    <option value="REGULAR">REGULAR</option>
                    <option value="CEC">CEC</option>
                    <option value="PG">PG</option>
                  </select>
                </div>
                <div class="col-lg-12">
                  <button type="submit" id="submitBtn" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>

    <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
      <div class="card card-default">
        <div class="card-header">
          <div class="card-title text-primary">Change levels</div>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <button type="button" @click="openModal" id="changeBtn" class="btn btn-primary btn-block">Change All Levels</button>
            </div>
            <div class="col-md-6">
              <button type="button" @click="revertAllChanges" id="revertBtn" class="btn btn-danger btn-block">Revert All Levels</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  name: "ChangeLevels",
  layout: "main",
  components: {

  },
  data() {
    return {
      formData: {
        program: ''
      }
    }
  },
  methods: {
    openModal() {
      $('#changeLevels').modal()
    },
    submit() {
      if(confirm('Are you sure you want to change the level of all students?')) {
        $('#submitBtn').attr('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> Changing....please wait')
        this.$store.dispatch('student/changeAllStudentLevels', this.formData)
          .then(res =>{
            $('#submitBtn').attr('disabled', false).html('Change All Levels')
            if(res.data.status) {
              $('#changeLevels').modal('hide')
              this.$toast.success(res.data.message)
              return
            }

            this.$toast.error(res.data.message)
          }).catch(err =>{
            this.$toast.error(err)
            $('#submitBtn').attr('disabled', false).html('Change All Levels')
        })
      }
    },
    revertAllChanges() {
      if(confirm('Are you sure you want to revert recent changes?')) {
        $('#revertBtn').attr('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> Reverting....please wait')
        this.$store.dispatch('student/revertChanges')
          .then(res =>{
            $('#revertBtn').attr('disabled', false).html('Revert All Levels')
            if(res.data.status) {
              this.$toast.success(res.data.message)
              return
            }

            this.$toast.error(res.data.message)
          }).catch(err =>{
          this.$toast.error(err)
          $('#revertBtn').attr('disabled', false).html('Revert All Levels')
        })
      }
    }
  },
  mounted: function() {}
}
</script>
<style scoped>
.breadcrumb {
  background-color: #ffffff !important;;
}
</style>
