<template>
  <div class="content sm-gutter">
    <!-- START BREADCRUMBS -->
    <div class="bg-white">
      <div class="container p-l-5">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item"><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
          <li class="breadcrumb-item"><a href="#">Personnel</a></li>
          <li class="breadcrumb-item"><nuxt-link to="/personnel/lecturers">Lecturer</nuxt-link></li>
          <li class="breadcrumb-item active">{{ (id === 'new') ? 'Add New' : 'Edit Details'}}</li>
        </ol>
      </div>
    </div>
    <!-- END BREADCRUMBS -->

    <div class="container sm-padding-10 p-t-20 p-l-0 p-r-0">
      <h3 class="text-primary m-t-30">{{ (id === 'new') ? 'Add' : 'Edit'}} Lecturer</h3>
      <hr />
      <div id="rootwizard" class="m-t-20 m-b-20">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs nav-tabs-linetriangle nav-tabs-separator nav-stack-sm" role="tablist" data-init-reponsive-tabs="dropdownfx">
          <li class="nav-item">
            <a class="fs-15 active" data-toggle="tab" href="#step1" data-target="#step1" role="tab"><i class="fa fa-paper-plane tab-icon"></i> <span>User Details</span></a>
          </li>
          <li class="nav-item">
            <a class="fs-15" data-toggle="tab" href="#step2" data-target="#step2" role="tab"><i class="fa fa-paper-plane tab-icon"></i> <span>Educational Details</span></a>
          </li>
          <li class="nav-item">
            <a class="fs-15" data-toggle="tab" href="#step3" data-target="#step3" role="tab"><i class="fa fa-paper-plane tab-icon"></i> <span>Employment Details</span></a>
          </li>
          <li class="nav-item">
            <a class="fs-15" data-toggle="tab" href="#step4" data-target="#step4" role="tab"><i class="fa fa-paper-plane tab-icon"></i> <span>Promotion Details</span></a>
          </li>
          <li class="nav-item">
            <a class="fs-15" data-toggle="tab" href="#step5" data-target="#step5" role="tab"><i class="fa fa-paper-plane tab-icon"></i> <span>Spouse Details</span></a>
          </li>
          <li class="nav-item">
            <a class="fs-15" data-toggle="tab" href="#step6" data-target="#step6" role="tab"><i class="fa fa-paper-plane tab-icon"></i> <span>Children's Details</span></a>
          </li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content">
          <div class="tab-pane padding-20 sm-no-padding active slide-left" id="step1">
            <div class="row row-same-height">
              <ValidationObserver ref="step1" class=" full-width">
                <form style="width: 100%" class="" role="form" v-if="formData">

                </form>
              </ValidationObserver>
            </div>
          </div>
          <div class="tab-pane slide-left padding-20 sm-no-padding" id="step2">
            <div class="row row-same-height p-2">
              <ValidationObserver ref="step2" class=" full-width">
                <form style="width: 100%" role="form" v-if="formData">

                </form>
              </ValidationObserver>
            </div>
          </div>
          <div class="tab-pane slide-left padding-20 sm-no-padding" id="step3">
            <div class="row row-same-height">
              <ValidationObserver ref="step3" class=" full-width">
                <form class="full-width" role="form" v-if="formData">

                </form>
              </ValidationObserver>
            </div>
          </div>

          <div class="tab-pane slide-left padding-20 sm-no-padding" id="step4">
            <div class="row row-same-height">
              <ValidationObserver ref="step4" class=" full-width">
                <form class="full-width" role="form" v-if="formData">

                </form>
              </ValidationObserver>
            </div>
          </div>

          <div class="tab-pane slide-left padding-20 sm-no-padding" id="step5">
            <div class="row row-same-height">
              <ValidationObserver ref="step5" class=" full-width">
                <form class="full-width" role="form" v-if="formData">

                </form>
              </ValidationObserver>
            </div>
          </div>

          <div class="tab-pane slide-left padding-20 sm-no-padding" id="step6">
            <div class="row row-same-height">
              <ValidationObserver ref="step6" class=" full-width">
                <form class="full-width" role="form" v-if="formData">

                </form>
              </ValidationObserver>
            </div>
          </div>

          <div class="padding-20 sm-padding-5 sm-m-b-20 sm-m-t-20 bg-white clearfix">
            <ul class="pager wizard no-style">
              <li class="next">
                <button class="btn btn-primary btn-cons btn-animated from-left fa fa-truck pull-right" type="button">
                  <span>Next</span>
                </button>
              </li>
              <li class="next finish hidden" @click="submitRecord">
                <button class="btn btn-primary btn-cons btn-animated from-left fa fa-cog pull-right" id="submitForm" type="button">
                  <span>Finish</span>
                </button>
              </li>
              <li class="previous first hidden">
                <button class="btn btn-default btn-cons btn-animated from-left fa fa-cog pull-right" type="button">
                  <span>First</span>
                </button>
              </li>
              <li class="previous">
                <button class="btn btn-default btn-cons pull-right" type="button">
                  <span>Previous</span>
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createEditor } from 'vueditor';

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

    }
  }),
  methods: {
    submitRecord() {

    },
    getLecturerDetails(id) {

    }
  },
  mounted() {
    this.id = this.$route.params.id;

    if (this.id !== 'new') {
      this.getLecturerDetails(this.id);
    }

    const vm = this;
    $(document).ready(function() {
      $('#rootwizard').bootstrapWizard({
        onTabShow: function(tab, navigation, index) {
          var $total = navigation.find('li').length;
          var $current = index + 1;

          // If it's the last tab then hide the last button and show the finish instead
          if ($current >= $total) {
            $('#rootwizard').find('.pager .next').hide();
            $('#rootwizard').find('.pager .finish').show().removeClass('disabled hidden');
          } else {
            $('#rootwizard').find('.pager .next').show();
            $('#rootwizard').find('.pager .finish').hide();
          }

          var li = navigation.find('li a.active').parent();

          var btnNext = $('#rootwizard').find('.pager .next').find('button');
          var btnPrev = $('#rootwizard').find('.pager .previous').find('button');

          // remove fontAwesome icon classes
          function removeIcons(btn) {
            btn.removeClass(function(index, css) {
              return (css.match(/(^|\s)fa-\S+/g) || []).join(' ');
            });
          }

          if ($current > 1 && $current < $total) {

            let nextIcon = li.next().find('.fa');
            let nextIconClass = nextIcon.attr('class').match(/fa-[\w-]*/).join();

            removeIcons(btnNext);
            btnNext.addClass(nextIconClass + ' btn-animated from-left fa');

            let prevIcon = li.prev().find('.fa');
            let prevIconClass = prevIcon.attr('class').match(/fa-[\w-]*/).join();

            removeIcons(btnPrev);
            btnPrev.addClass(prevIconClass + ' btn-animated from-left fa');
          } else if ($current == 1) {
            // remove classes needed for button animations from previous button
            btnPrev.removeClass('btn-animated from-left fa');
            removeIcons(btnPrev);
          } else {
            // remove classes needed for button animations from next button
            btnNext.removeClass('btn-animated from-left fa');
            removeIcons(btnNext);
          }
        },
        onNext: async (tab, navigation, index) => {
          let $status = false;
          if(index === 1) {
            $status = await vm.$refs.step1.validate();
          } else if (index === 2) {
            $status = await vm.$refs.step2.validate();
          }
          return $status;
        },
        onPrevious: (tab, navigation, index) => {
          // console.log("Showing previous tab");
        },
        onInit: () => {
          $('#rootwizard ul').removeClass('nav-pills');
        }

      });

    });
  }
}
</script>
