<template>
  <div class="content sm-gutter">
    <!-- START BREADCRUMBS -->
    <div class="bg-white">
      <div class="container p-l-5">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
          <li class="breadcrumb-item"><a href="#">CMS</a></li>
          <li class="breadcrumb-item active">News</li>
        </ol>
      </div>
    </div>
    <!-- END BREADCRUMBS -->

    <div class="modal fade SlideUp" id="add-news" tabindex="-1" role="dialog" aria-hidden="true">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        <i class="pg-close"></i>
      </button>
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="text-left p-b-5"><span class="semi-bold">Create News</span></h5>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveNews">
              <div class="row">
                <div class="col-lg-12 m-b-10">
                  <input type="text" placeholder="Title" v-model="saveData.title" class="form-control input-lg" id="icon-filter" name="icon-filter">
                </div>
                <div class="col-md-12 m-t-15">
                  <div class="summernote-wrapper">
                    <div class="summernote" id="description">Type here...</div>
                  </div>
                </div>
                <div class="col-lg-12 m-b-10">
                  <select v-model="saveData.status" class="form-control">
                    <option value="">Select Status</option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
                <br />
                <div class="col-lg-12">
                  <br />
                  <button type="submit" id="addBtn" class="btn btn-primary btn-lg btn-large fs-16 semi-bold">Add Record</button>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>

    <!-- START CONTAINER FLUID -->
    <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
      <div class="card card-default">
        <div class="card-header">
          <div class="card-title text-primary">News</div>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-4">
              <label>Title:</label>
              <input type="text" v-model="formData.title" class="form-control" placeholder="Enter title" />
            </div>
            <div class="col-md-4">
              <label>From Date:</label>
              <input type="date" v-model="formData.from_date" class="form-control" />
            </div>
            <div class="col-md-4">
              <label>To Date:</label>
              <input type="date" v-model="formData.to_date"  class="form-control" />
            </div>

          </div>
          <div class="row m-t-20">
            <div class="col-md-2">
              <button type="button" @click="getNews(1)" class="btn btn-primary btn-block">&nbsp;Search Record</button>
            </div>
            <div class="col-md-2">
              <button type="submit" id="exportBtn" class="btn btn-danger btn-block">&nbsp;Export to Excel</button>
            </div>
          </div>
        </div>
      </div>
      <div class="card card-default">
        <div class="card-header separator">
          <h3 class="text-primary no-margin pull-left sm-pull-reset">News Info</h3>
          <div class="pull-right sm-pull-reset">
            <button type="button" @click="newsModal" class="btn btn-danger btn-sm">&nbsp; Create News </button>
            <button type="button" @click="refresh" id="refreshBtn" class="btn btn-success btn-sm">&nbsp; Refresh </button>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-striped table-condensed" id="basicTable">
              <thead>
              <tr>
                <th></th>
                <th style="width: 20%;">Title</th>
                <th>Date posted</th>
                <th>Posted by</th>
                <th>Status</th>
                <th style="width: 8%;">Action</th>
              </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td colspan="6">Loading...please wait</td>
                </tr>
                <tr v-if="!loading && news.length < 1">
                  <td colspan="6">No records at the moment</td>
                </tr>
                <tr v-if="!loading && news.length > 0" v-for="app in news" :key="app.id">
                  <td>
                    <img width="50" height="50" v-if="app.image_url === '' || app.image_url === null" src="/assets/img/avatar.png" class="img-responsive">
                    <img width="50" height="50" v-else :src="app.image_url" class="img-responsive">
                  </td>
                  <td>{{ app.title }}</td>
                  <td>{{ $moment(app.created_at).format('DD-MM-YYYY') }}</td>
                  <td>{{ app.user.name }}</td>
                  <td v-if="app.status === 1">Active</td>
                  <td v-if="app.status === 0">Inactive</td>
                  <td>
                    <div class="btn-group">
                      <span data-placement="top" data-toggle="tooltip" title="Edit">
                        <a href="javascript:;" @click="editNews(app)" class="btn btn-default btn-sm" role="button"><i class="fa fa-edit"></i></a>
                      </span>
                      <span data-placement="top" data-toggle="tooltip" title="View News">
                        <a href="javascript:;" class="btn btn-default btn-sm" role="button"><i class="fa fa-eye"></i></a>
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <Pagination
              v-bind:pagination="pagination"
              v-on:click.native="getNews(pagination.current_page)"
              :offset="4">
            </Pagination>
          </div>
        </div>
      </div>
    </div>
    <!-- END CONTAINER FLUID -->
  </div>
</template>
<script>
import Pagination from '~/components/Pagination'
import {createEditor} from "vueditor";

export default {
  layout: 'main',
  components: {
    Pagination
  },
  data: () => ({
    loading: true,
    news: [],
    formData: {
      title: '',
      from: '',
      to: '',
      page: ''
    },
    saveData: {
      title: '',
      description: '',
      status: '',
      id: ''
    },
    pagination: {
      total: 0,
      per_page: 2,
      from: 1,
      to: 0,
      current_page: 1
    },
    description: null,
    config: {
      toolbar: [
        'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider',
        'bold', 'italic', 'underline', 'strikeThrough', 'links', 'divider', 'subscript', 'superscript',
        'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', '|', 'indent', 'outdent',
        'insertOrderedList', 'insertUnorderedList', '|', 'picture', 'tables', '|', 'switchView'
      ],
      fontName: [
        {val: 'arial black'},
        {val: 'times new roman'},
        {val: 'Courier New'}
      ],
      fontSize: [
        '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px'
      ],
    }
  }),
  methods: {
    saveNews() {
      this.saveData.description = this.description.getContent();
      if(this.saveData.id === '') {
        $('#addBtn').attr('disabled', true).html('Adding....')
        this.$store.dispatch('news/saveNews', this.saveData)
          .then(res => {
            $('#addBtn').attr('disabled', false).html('Add Record')
            if (res.data.status) {
              this.$toast.success(res.data.message)
              this.getNews()
              this.clearForm()
              return
            }

            this.$toast.error(res.data.message)
          }).catch(err => {
          $('#addBtn').attr('disabled', false).html('Add Record')
          this.$toast.error('An error occurred')
        })
      }else{
        $('#addBtn').attr('disabled', true).html('Updating....')
        this.$store.dispatch('news/updateNews', this.saveData)
          .then(res => {
            $('#addBtn').attr('disabled', false).html('Add Record')
            if (res.data.status) {
              this.$toast.success(res.data.message)
              this.getNews()
              this.clearForm()
              return
            }

            this.$toast.error(res.data.message)
          }).catch(err => {
          $('#addBtn').attr('disabled', false).html('Add Record')
          this.$toast.error('An error occurred')
        })
      }
    },
    getNews(page) {
      this.loading = true
      this.formData.page = page
      this.$store.dispatch('news/getAllNews', this.formData)
        .then(res =>{
          if(res.data.status) {
            this.news = res.data.data.data
            this.pagination = res.data.data
            this.loading = false
            return
          }

          this.$toast.error(res.data.message)
        }).catch(err =>{
          this.$toast.error(err)
        })
    },
    editNews(news) {
      this.saveData = {
        title: news.title,
        status: news.status,
        id: news.id
      }
      this.description.setContent(news.description)
      $('#add-news').modal()
    },
    clearForm() {
      this.saveData = {
        title: '',
        status: '',
        id: ''
      }
      this.description.setContent('')
      $('#add-news').modal('hide')
    },
    refresh() {
      this.formData = {
        title: '',
        from: '',
        to: ''
      }
      this.getNews(1)
    },
    newsModal() {
      $('#add-news').modal()
    }
  },
  mounted() {
    this.getNews(1)
    this.description = createEditor('#description', this.config)
  }
}
</script>
