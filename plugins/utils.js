import Vue from 'vue';

Vue.mixin({
    methods: {
        parseDate(str, format){
            return this.$moment(str).format(format);
        },
        numberFormat (number) {
            let n = parseFloat(number);
            return parseFloat(n.toFixed(2)).toLocaleString();
        },
    }
})