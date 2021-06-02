<template>
  <div class="content sm-gutter">
    <!-- START BREADCRUMBS -->
    <div class="bg-white">
      <div class="container p-l-5">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
          <li class="breadcrumb-item"><a href="#">CMS</a></li>
          <li class="breadcrumb-item"><nuxt-link to="/cms/news">News</nuxt-link></li>
          <li class="breadcrumb-item active">{{ (id === 'new') ? 'Add New' : 'Edit Details'}}</li>
        </ol>
      </div>
    </div>
    <!-- END BREADCRUMBS -->

    <!-- START CONTAINER FLUID -->
    <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
      <h3 class="text-primary m-t-30">News</h3>
      <hr />

    </div>
  </div>
</template>
<script>
import {createEditor} from "vueditor";

export default {
  layout: 'main',
  data: () => ({
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
    },
    id: '',
    formData: {
      title: '',
      description: ''
    },
    description: null
  }),
  methods: {
    getNews(id) {

    }
  },
  mounted() {
    this.id = this.$route.params.id;

    if (this.id !== 'new') {
      this.getNews(this.id);
    }
    if(this.formData) {
      this.description = createEditor('#description', this.config)
    }
  }
}
</script>
