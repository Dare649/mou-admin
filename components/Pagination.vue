<template>
    <ul class="pagination m-t-20">
      <li v-if="pagination.current_page > 1" class="page-item page-item previous">
        <a href="#" aria-label="Previous" class="page-link" v-on:click.prevent="changePage(pagination.current_page - 1)">
            <span aria-hidden="true">Previous</span>
        </a>
      </li>
      <li v-for="(page, i) in pagesNumber" class="page-item" :key="i" :class="{'active': page == pagination.current_page}">
          <a href="#" v-on:click.prevent="changePage(page)" class="page-link">{{ page }}</a>
      </li>
      <li v-if="pagination.current_page < pagination.last_page" class="page-item next">
        <a href="#" aria-label="Next" class="page-link" v-on:click.prevent="changePage(pagination.current_page + 1)">
          <span aria-hidden="true">Next</span>
        </a>
      </li>
    </ul>
</template>

<script>
  export default{
    props: {
      pagination: {
          type: Object,
          required: true
      },
      offset: {
          type: Number,
          default: 4
      }
    },
    computed: {
      pagesNumber: function () {
        if (!this.pagination.to) {
          return [];
        }
        var from = this.pagination.current_page - this.offset;
        if (from < 1) {
          from = 1;
        }
        var to = from + (this.offset * 2);
        if (to >= this.pagination.last_page) {
          to = this.pagination.last_page;
        }
        var pagesArray = [];
        for (from = 1; from <= to; from++) {
          pagesArray.push(from);
        }
          return pagesArray;
      }
    },
    methods : {
      changePage: function (page) {
        this.pagination.current_page = page;
      }
    }
  }
</script>
