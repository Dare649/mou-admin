import Vue from 'vue';
import Pagination from '../components/Pagination';
import { VclTable } from 'vue-content-loading';
import DatePicker from 'vue2-datepicker';
import Vueditor from 'vueditor'
import { ValidationProvider, extend, ValidationObserver } from "vee-validate";
import { required, email } from 'vee-validate/dist/rules';
import Select2 from 'v-select2-component';
import 'sweetalert2/dist/sweetalert2.min.css';
// Add the required rule
extend('required', {
    ...required,
    message: 'This field is required'
});
import 'vueditor/dist/style/vueditor.min.css'
import 'vue2-datepicker/index.css';

let config = {
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
    fontSize: ['12px', '14px', '16px', '18px', '0.8rem', '1.0rem', '1.2rem', '1.5rem', '2.0rem'],
    uploadUrl: ''
};

Vue.use(Vueditor, config);

Vue.use(DatePicker);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('vcl-table', VclTable);
Vue.component('pagination', Pagination);
Vue.component('Select2', Select2);
