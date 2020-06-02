<template>
    <div >
      <!-- Add Faculty Modal -->
      <div class="modal fade SlideUp" id="add_country" tabindex="-1" role="dialog" aria-hidden="true">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
              <i class="pg-close"></i>
          </button>
          <div class="modal-dialog modal-lg">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="text-left p-b-5"><span class="semi-bold">Add New Country</span></h5>
                  </div>
                  <div class="modal-body">
                      <div class="row">
                          <div class="col-lg-12 m-b-10">
                              <input type="text" v-model="model.name" placeholder="Country Name" class="form-control input-lg" id="icon-filte7r" name="icon-filter">
                          </div>
                          <div class="col-lg-12 m-b-10">
                              <input type="text" v-model="model.abbreviation" placeholder="Country Abbreviation" class="form-control input-lg" id="icon-filter1" name="icon-filter">
                          </div>
                          <div class="col-lg-12 m-b-10">
                              <input type="text" v-model="model.phone_code" placeholder="Country Phone Code" class="form-control input-lg" id="icon-filter2" name="icon-filter">
                          </div>
                          <div class="col-lg-12 m-b-10">
                              <input type="text" v-model="model.capital" placeholder="Country Capital City" class="form-control input-lg" id="icon-filter3" name="icon-filter">
                          </div>
                          <div class="col-lg-12 m-b-10">
                              <input type="text" v-model="model.currency" placeholder="Country Currency Code" class="form-control input-lg" id="icon-filter4" name="icon-filter">
                          </div>
                          <div class="col-lg-12">
                              <button type="button" @click="createCountry()" v-if="!loading" class="btn btn-success btn-lg btn-large fs-16 semi-bold">Add Record</button>
                              <button type="button" disabled v-if="loading"  class="btn btn-success btn-lg btn-large fs-16 semi-bold">Adding Record</button>
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

      <!-- Export Countries Modal -->
      <div class="modal fade SlideUp" id="export_countries" tabindex="-1" role="dialog" aria-hidden="true">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
              <i class="pg-close"></i>
          </button>
          <div class="modal-dialog modal-lg">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="text-left p-b-5"><span class="semi-bold">Export Countries</span></h5>
                  </div>
                  <div class="modal-body">
                      <div class="row">
                          <div class="col-lg-12">
                            <h6 class="text-left p-b-5"><span class="semi-bold">Click confirm to export all the countries to an excel file.</span></h6>
                          </div>
                          <div class="col-lg-12">
                              <button type="button" v-if="!exportLoading"  @click="exportCountries()" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Confirm</button>
                              <button type="button" disabled v-if="exportLoading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Downloading</button>
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

      <!-- Upload Faculty Modal -->
      <div class="modal fade SlideUp" id="upload_country" tabindex="-1" role="dialog" aria-hidden="true">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
              <i class="pg-close"></i>
          </button>
          <div class="modal-dialog modal-lg">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="text-left p-b-5"><span class="semi-bold">Upload Countries</span></h5>
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
                              <button type="button" @click="uploadCountries()" v-if="!loading"  class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Upload Record</button>
                              <button type="button" disabled v-if="loading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Uploading</button>
                          </div>
                          <div class="col-lg-12 m-t-15">
                              <div class="dd-placeholder p-1">
                                  <h5 class="pull-left sm-pull-reset"><i class="fa fa-file-excel-o p-l-10"></i> Sample File</h5>
                                  <button v-if="!downloading" @click="downloadCountrySampleFile()" class="pull-right sm-pull-reset btn btn-default m-t-5 m-r-10"><i class="fa fa-arrow-down"></i> &nbsp; Download</button>
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

        <!-- Edit Country Modal -->
        <div class="modal fade SlideUp" id="edit_country" tabindex="-1" role="dialog" aria-hidden="true">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                <i class="pg-close"></i>
            </button>
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="text-left p-b-5"><span class="semi-bold">Edit Country Information</span></h5>
                    </div>
                    <div class="modal-body">
                        <form class="full-width" @submit.prevent="submitEditedCountry">
                            <div class="row">
                                <div class="col-lg-12 m-b-10">
                                    <input type="text" v-model="model.edit_name" placeholder="Country Name" class="form-control">
                                </div>
                                <div class="col-lg-12 m-b-10">
                                    <input type="text" placeholder="Abbreviation" v-model="model.edit_abbreviation" class="form-control">
                                </div>
                                <div class="col-lg-12 m-b-10">
                                    <input type="text" placeholder="Phone Code" v-model="model.edit_phone_code" class="form-control">
                                </div>
                                <div class="col-lg-12 m-b-10">
                                    <input type="text" placeholder="Capital" v-model="model.edit_capital" class="form-control">
                                </div>
                                <div class="col-lg-12 m-b-10">
                                    <input type="text" placeholder="Currency Code" v-model="model.edit_currency" class="form-control">
                                </div>
                                <div class="col-lg-12 m-t-10">
                                    <button type="submit" v-if="!editLoading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Save Changes</button>
                                    <button type="submit" v-if="editLoading" disabled class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Submitting</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>

                <!-- Delete Country Modal -->
                <div class="modal fade SlideUp" id="delete_country" tabindex="-1" role="dialog" aria-hidden="true">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        <i class="pg-close"></i>
                    </button>
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="text-left p-b-5"><span class="semi-bold">Delete Country Information</span></h5>
                            </div>
                            <div class="modal-body">
                                <form class="full-width" @submit.prevent="deleteCountry">
                                    <div class="row">
                                        <h5 class="text-left p-b-5"><span class="semi-bold">Are you sure you want to delete this record?</span></h5>
                                        <div class="col-lg-12 m-t-10">
                                            <button type="submit" v-if="!deleteLoading" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Confirm</button>
                                            <button type="submit" v-if="deleteLoading" disabled class="btn btn-primary btn-lg btn-large fs-16 semi-bold"><i class="fa fa-delete"></i>Deleting</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <!-- /.modal-content -->
                    </div>
                    <!-- /.modal-dialog -->
                </div>

              <!-- START PAGE CONTENT -->
              <div class="content sm-gutter">
                  <!-- START BREADCRUMBS -->
                  <div class="bg-white">
                      <div class="container p-l-5">
                          <ol class="breadcrumb breadcrumb-alt">
                              <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                              <li class="breadcrumb-item"><a href="#">Get Started</a></li>
                              <li class="breadcrumb-item active">Countries</li>
                          </ol>
                      </div>
                  </div>
                  <!-- END BREADCRUMBS -->
                  <!-- START CONTAINER FLUID -->
                  <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
                      <div class="card card-default">
                          <div class="card-header">
                              <h3 class="text-primary no-margin pull-left sm-pull-reset">Country Management</h3>
                              <div class="pull-right sm-pull-reset">
                                  <button type="button" @click="refresh()" class="btn btn-success btn-sm"><i class="fa fa-refresh"></i>&nbsp; Refresh </button>
                                  <button type="button" class="btn btn-primary btn-sm" data-target="#add_country" data-toggle="modal"><i class="fa fa-plus"></i> &nbsp; <strong>Add New Country</strong></button>
                                  <button type="button" class="btn btn-warning btn-sm" data-target="#upload_country" data-toggle="modal"><i class="fa fa-arrow-up"></i> &nbsp; <strong>Upload Countries</strong></button>
                                  <button type="button" class="btn btn-success btn-sm" data-target="#export_countries" data-toggle="modal"><i class="fa fa-file-excel-o"></i> &nbsp; <strong>Export to Excel</strong></button>
                              </div>
                              <div class="clearfix"></div>
                          </div>

                          <div class="card-body">

                                <div class="overflow-auto">
                                    <!-- User Interface controls -->
                            <!-- <b-row>
                                <b-col lg="6" class="my-1">
                                        <b-form-group
                                        label="Filter"
                                        label-cols-sm="3"
                                        label-align-sm="right"
                                        label-size="sm"
                                        label-for="filterInput"
                                        class="mb-0"
                                        >
                                        <b-input-group size="lg">
                                            <b-form-input
                                            v-model="filter"
                                            type="search"
                                            id="filterInput"
                                            placeholder="Type to Search"
                                            >
                                        </b-form-input>
                                        <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                                        </b-input-group>
                                        </b-form-group>
                                    </b-col>

                                <b-col sm="5" md="6" class="my-1">
                                    <b-form-group
                                    label="Per page"
                                    label-cols-sm="6"
                                    label-cols-md="4"
                                    label-cols-lg="3"
                                    label-align-sm="right"
                                    label-size="sm"
                                    label-for="perPageSelect"
                                    class="mb-0"
                                    >
                                    <b-form-select
                                        v-model="perPage"
                                        id="perPageSelect"
                                        size="lg"
                                        :options="pageOptions"
                                    ></b-form-select>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                                    <b-table
                                        id="counries-table"
                                        :items="countries"
                                        :per-page="perPage"
                                        :fields="fields"
                                        @filtered="onFiltered"
                                        :filter="filter"
                                        :current-page="currentPage"
                                        small
                                    >
                                    <template slot="title" slot-scope="data">
                                        {{ data.item.name }}
                                    </template>
                                    <template slot="description" slot-scope="data">
                                        {{ data.item.iso2 }}
                                    </template>

                                    <template slot="date" slot-scope="data">
                                        {{ data.item.capital }}
                                    </template>
                                    <template slot="date" slot-scope="data">
                                        {{ data.item.phone_code }}
                                    </template>
                                    <template slot="date" slot-scope="data">
                                        {{ data.item.currency }}
                                    </template>
                                    <template slot="public" slot-scope="data">
                                        <i v-if="data.item.flag === 0" title="Unpublished" class="fa fa-circle false" aria-hidden="true"></i>
                                        <i v-else title="Published" class="fa fa-circle true" aria-hidden="true"></i>
                                    </template>
                                    <template slot="actions" slot-scope="data">
                                         <span data-placement="top" data-toggle="tooltip" title="Link to States">
                                                    <nuxt-link :to="'/get-started/states/' + data.item.id" ><button type="button" class="btn btn-default btn-sm"><i class="fa fa-link"></i></button></nuxt-link>
                                                  </span>
                                                  <span data-placement="top" @click="populateFields(data.item)" data-toggle="tooltip" title="Edit Record">
                                                        <a href="#edit_country"  class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-pencil"></i></a>
                                                  </span>
                                                  <span data-placement="top" @click="setId(data.item.id)" data-toggle="tooltip" title="Delete Record">
                                                      <a href="#delete_country"  class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="pg-trash"></i></a>
                                                  </span>
                                    </template>
                                    </b-table>
                                    <b-pagination
                                        v-model="currentPage"
                                        :total-rows="rows"
                                        :per-page="perPage"
                                        first-text="First"
                                        prev-text="Prev"
                                        next-text="Next"
                                        last-text="Last"
                                        aria-controls="counries-table"
                                    ></b-pagination> -->
                                </div>
                              <div class="table-responsive">
                                  <span style="float:left; margin-bottom:5px;">
                                  <input class="form-control col-lg-24" id="inputSearch" type="text" placeholder="Search..">
                                  </span>
                                  <table class="table table-striped table-condensed" id="countryTable">
                                      <thead style="text-align:center;">
                                        <th style="width:15%;">Abbreviation</th>
                                        <th style="width:20%">Name</th>
                                        <th style="width:20%">Capital</th>
                                        <th style="width:15%">Tel Code</th>
                                        <th style="width:10%">Currency</th>
                                        <th style="width:20%">Action</th>
                                      </thead>
                                      <tbody style="text-align:center;">
                                        <tr :key="country.id" :id="country.id" v-for="country in countries">
                                            <td>{{country.iso2}}</td>
                                            <td>{{country.name}}</td>
                                            <td>{{country.capital}}</td>
                                            <td>{{country.phone_code}}</td>
                                            <td>{{country.currency}}</td>
                                            <td>
                                                <div class="btn-group">
                                                    <span data-placement="top" data-toggle="tooltip" title="Link to States">
                                                      <nuxt-link :to="'/get-started/states/' + country.id" ><button type="button" class="btn btn-default btn-sm"><i class="fa fa-link"></i></button></nuxt-link>
                                                    </span>
                                                    <span data-placement="top" @click="populateFields(country)" data-toggle="tooltip" title="Edit Record">
                                                          <a href="#edit_country"  class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="fa fa-pencil"></i></a>
                                                    </span>
                                                    <span data-placement="top" @click="setId(country.id)" data-toggle="tooltip" title="Delete Record">
                                                        <a href="#delete_country"  class="btn btn-default btn-sm" role="button" data-toggle="modal"><i class="pg-trash"></i></a>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                      </tbody>
                                  </table>
                                  <Pagination
                                    v-bind:pagination="pagination"
                                    v-on:click.native="getCountries(pagination.current_page)"
                                    :offset="4">
                                  </Pagination>
                              </div>
                          </div>
                      </div>
                  </div>
                  <!-- END CONTAINER FLUID -->
              </div>
              <!-- END PAGE CONTENT -->
              <!-- START COPYRIGHT -->
              <!-- END COPYRIGHT -->
          </div>


</template>
<script>
import Pagination from '~/components/Pagination'

export default {
  name: "Countries",
  layout: "main",
  middleware: "auth",
  components: {
    Pagination
  },
  data() {
      return {
        pagination: {
            total: 0,
            per_page: 2,
            from: 1,
            to: 0,
            current_page: 1
        },
        addloading: false,
        downloading: false,
        loading: false,
        deleteLoading: false,
        editLoading: false,
        exportLoading: false,
        countries: [],
        file: "",
        model: {
          name: "",
          id: 0,
          abbreviation: "",
          phone_code: "",
          currency: "",
          capital: "",
          edit_abbreviation: "",
          edit_capital: "",
          edit_name: "",
          edit_phone_code: "",
          edit_country_id: 0,
          edit_currency: ""
        },
      }
    },
    computed: {
      rows() {
        return this.countries.length
      }
    },
  methods: {
      setId(id){
          this.model.id = id
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      refresh(){
          this.getCountries()
      },
      exportCountries(){
          this.exportLoading = true
          this.$store
            .dispatch('get-started/exportCountries')
            .then(res => {
            if(res != undefined){
                this.loading = false
                var fileURL = window.URL.createObjectURL(new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}));
                var fileLink = document.createElement('a');

                fileLink.href = fileURL;
                fileLink.setAttribute('download', 'countries.xlsx');
                document.body.appendChild(fileLink);

                fileLink.click();
                this.exportLoading = false
                $( '#export_countries' ).modal( 'hide' ).data( 'bs.modal', null )
                this.$toast.success('Record Exported to Excel Successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
            }else{
                this.exportLoading = false
                alert("File Downloaded Unsuccessful")
            }
        }).catch(err => {
          this.exportLoading = false
        })
      },
      downloadCountrySampleFile(){
          this.downloading = true
          this.$store
            .dispatch('get-started/downloadCountrySampleFile')
            .then(res => {
            if(res != undefined){
                if(res.success == true)    {
                    window.location = res.message
                    this.downloading = false
                    $('#upload_country').modal('hide').data( 'bs.modal', null )
                    this.$toast.success('Download Successful!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
                }
            }else{
                this.downloading = false
                alert("File Downloaded Unsuccessful")
            }
        }).catch(err => {
          this.downloading = false
        })
      },
      uploadCountries(){
        this.loading = true
        this.file = this.$refs.myFiles.files[0];
        let formData = new FormData();
        formData.append('file', this.file);
          this.$store
            .dispatch('get-started/uploadCountries', formData)
            .then(res => {
            if(res != undefined){
                if(res.status == true){
                    this.loading = false
                    this.getCountries()
                    $('#upload_country').modal('hide').data( 'bs.modal', null )
                    this.$toast.success(res.message, {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});
                }else{
                    this.loading = false
                    alert("File Upload Unsuccessful")
                    this.ErrMsg = "Error Logging in!"
                }
            }else{
                this.loading = false
                alert("File Upload Unsuccessful")
                this.ErrMsg = "Error Logging in!"
            }
        }).catch(err => {
          this.loading = false
        })
      },
      deleteCountry(){
          this.deleteLoading = true
          this.$store
            .dispatch('get-started/deleteCountry', this.model.id)
            .then(res => {
            if(res != undefined){
                if(res.success == true){
                this.deleteLoading = false
                this.getCountries()
                $( '#delete_country' ).modal( 'hide' ).data( 'bs.modal', null );
                this.loading = false
                }else{
                this.deleteLoading = false
                this.loading = false
                this.ErrMsg = "Error Logging in!"
                }
            }else{
                this.loading = false
                this.ErrMsg = "Error Logging in!"
            }

        }).catch(err => {
          this.loading = false
        })
      },
      populateFields(country){
          this.model.edit_country_id = country.id
          this.model.edit_abbreviation = country.iso2
          this.model.edit_name = country.name
          this.model.edit_phone_code = country.phone_code
          this.model.edit_capital = country.capital
          this.model.edit_currency = country.currency
      },
      submitEditedCountry(){
        this.editLoading = true
        let bodyFormData = new Object();
        bodyFormData.name = this.model.edit_name
        bodyFormData.code = this.model.edit_abbreviation
        bodyFormData.id = this.model.edit_country_id
        // bodyFormData.set('iso3', this.model.password)
        bodyFormData.phone_code = this.model.edit_phone_code
        bodyFormData.capital = this.model.edit_capital
        bodyFormData.currency = this.model.edit_currency
        this.$store
        .dispatch('get-started/updateCountry', bodyFormData)
        .then(res => {
          if(res != undefined){
            if(res.success == true){
                this.editLoading = false
                this.getCountries()
                $('#edit_country').modal('hide').data( 'bs.modal', null )
                this.$toast.success('Record Edited Successfully!', {icon: "fingerprints", hideAfter: 3000, showHideTransition: 'fade', allowToastClose: true});

            }else{
              this.editLoading = false
              this.ErrMsg = "Error Logging in!"
            }
          }else{
            this.loading = false
            this.ErrMsg = "Error Logging in!"
          }
        }).catch(err => {
          this.loading = false
        })
      },
      getCountries(page){
        this.$store
        .dispatch('get-started/getCountries', page)
        .then(res => {
          if(res != undefined){
            if(res.status == true){
            this.getloading = false
            this.countries = res.data.data
            this.pagination = res.data
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
      createCountry(){
        this.loading = true
        let bodyFormData = new FormData();
        bodyFormData.set('name', this.model.name)
        bodyFormData.set('iso2', this.model.abbreviation)
        // bodyFormData.set('iso3', this.model.password)
        bodyFormData.set('phone_code', this.model.phone_code)
        bodyFormData.set('capital', this.model.capital)
        bodyFormData.set('currency', this.model.currency)
        this.$store
        .dispatch('get-started/createCountry', bodyFormData)
        .then(res => {
          if(res != undefined){
            if(res.success == true){
                this.getCountries()
                this.loading = false
                $('#add_country').modal('hide').data( 'bs.modal', null )
                this.model = {}
            }else{
              this.loading = false
              this.ErrMsg = "Error Logging in!"
            }
          }else{
            this.loading = false
            this.ErrMsg = "Error Logging in!"
          }
        }).catch(err => {
          this.loading = false
        })
      },
      searchTable(){
           $(document).ready(function(){
            $("#inputSearch").on("keyup", function() {
                var value = $(this).val().toLowerCase();
                $("#countryTable tr").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });
            });
      }
  },
  mounted: function() {
      if (!process.server) {
        const script1 = document.createElement('script')
        script1.type = 'text/javascript'
        script1.src = '/pages/js/pages.min.js'
        document.head.appendChild(script1)
      }
      this.searchTable()
      this.getCountries()
    }
}
</script>
<style scoped>
    .breadcrumb {
    background-color: #ffffff !important;;
}
body {
    font-size: 14px !important;
}
</style>
